# Fan Fiction Fantasy Stars (website)

This folder is the whole website. Follow the four steps below, in order. Nothing here needs coding.

## Step 1. Set up the database (Supabase, about 3 minutes)
1. Open your Supabase project, then click **SQL Editor** on the left, then **New query**.
2. Open `supabase/schema.sql` from this folder, copy everything, paste it into the query box, and press **Run**. You should see "Success".
3. Click **Authentication**, then **Sign In / Providers**, then **Email**. Turn **Confirm email** OFF and press **Save**. (This lets friends sign up with just an email and password, with no email to wait for. You can turn it back on later.)

## Step 2. Put the code on GitHub (about 3 minutes)
1. On github.com open your empty `fffs-game` repository and click **uploading an existing file**.
2. Drag in everything from this folder (the folders `src`, `supabase`, `tests` and the loose files). Do not upload any folder named `node_modules` or `dist`.
3. Press **Commit changes**.

## Step 3. Publish the website (Vercel, about 2 minutes)
1. On vercel.com click **Add New**, then **Project**, and pick `fffs-game`.
2. Leave every setting as it is (Vercel detects "Vite" by itself) and press **Deploy**.
3. When it finishes you get a web address like `fffs-game.vercel.app`. That is your game.

## Step 4. Create the commissioner account
Open the address and choose **Create an account**. The very first account becomes the commissioner (owner). Everyone after that is a regular manager. Send friends the address.

## What is in the folder
- `src/League.jsx` is the game itself.
- `src/claudeShim.js` connects the game to the database.
- `src/main.jsx` is the sign in screen.
- `supabase/schema.sql` creates the database tables and safety rules.
- `tests/shim.test.mjs` checks the database connector (`node tests/shim.test.mjs`).
