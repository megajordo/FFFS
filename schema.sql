-- Fan Fiction Fantasy Stars: database setup.
-- Paste this whole file into Supabase > SQL Editor > New query, then press Run. It is safe to run twice.

-- 1. People. One row per signed-up user. The very first person to sign up becomes the owner (commissioner).
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  is_owner boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name, is_owner)
  values (
    new.id,
    new.email,
    coalesce(nullif(new.raw_user_meta_data->>'name', ''), split_part(new.email, '@', 1)),
    not exists (select 1 from public.profiles)
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. The game's shared documents (league state, seats, logs, invites, feedback).
create table if not exists public.docs (
  path text primary key,
  collection text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid()
);
create index if not exists docs_collection_idx on public.docs (collection);

create or replace function public.docs_touch() returns trigger language plpgsql as $$
begin
  new.collection := split_part(new.path, '/', 1);
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end $$;
drop trigger if exists docs_touch_trg on public.docs;
create trigger docs_touch_trg before insert or update on public.docs
  for each row execute function public.docs_touch();

-- 3. Short locks so two people never save the same document at the same instant.
create table if not exists public.leases (
  path text primary key,
  holder text not null,
  expires_at timestamptz not null
);

create or replace function public.acquire_lease(p_path text, p_holder text, p_ttl_ms int)
returns jsonb language plpgsql security definer set search_path = public as $$
declare cur public.leases;
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  insert into public.leases (path, holder, expires_at)
  values (p_path, p_holder, now() + make_interval(secs => p_ttl_ms / 1000.0))
  on conflict (path) do update
    set holder = excluded.holder, expires_at = excluded.expires_at
    where public.leases.expires_at < now() or public.leases.holder = excluded.holder
  returning * into cur;
  if cur.path is not null then
    return jsonb_build_object('acquired', true, 'expiresAt', cur.expires_at);
  end if;
  select * into cur from public.leases where path = p_path;
  return jsonb_build_object('acquired', false, 'expiresAt', cur.expires_at);
end $$;

-- 4. Safety rules (who may read and write what).
create or replace function public.is_owner() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select is_owner from public.profiles where id = auth.uid()), false)
$$;

alter table public.profiles enable row level security;
alter table public.docs enable row level security;
alter table public.leases enable row level security;

drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select to authenticated using (true);
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid() and is_owner = (select p.is_owner from public.profiles p where p.id = auth.uid()));

drop policy if exists docs_read on public.docs;
create policy docs_read on public.docs for select to authenticated
  using (split_part(path, '/', 1) <> 'review' or public.is_owner());

-- Everyone signed in can write game documents, except invites, which only the owner can change.
drop policy if exists docs_write_ins on public.docs;
create policy docs_write_ins on public.docs for insert to authenticated
  with check (split_part(path, '/', 1) not in ('inv', 'review') or public.is_owner());
drop policy if exists docs_write_upd on public.docs;
create policy docs_write_upd on public.docs for update to authenticated
  using (split_part(path, '/', 1) not in ('inv', 'review') or public.is_owner())
  with check (split_part(path, '/', 1) not in ('inv', 'review') or public.is_owner());
drop policy if exists docs_write_del on public.docs;
create policy docs_write_del on public.docs for delete to authenticated
  using (split_part(path, '/', 1) not in ('inv', 'review') or public.is_owner());

-- leases are only touched through acquire_lease, so no direct policies are needed.

-- 5. Live updates: tell the website when a document changes.
do $$ begin
  alter publication supabase_realtime add table public.docs;
exception when duplicate_object then null; when undefined_object then null; end $$;
