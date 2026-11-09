import React, { useState, useEffect, useMemo, useRef } from "react";
import { Trophy, Users, Zap, ChevronRight, ChevronLeft, Play, RotateCcw, Shuffle, Mic, Radio, Calendar, ListOrdered, ArrowLeftRight, Settings, Download, Upload, Search, Check, X, Crown, Swords, FastForward, RefreshCw, Save, UserPlus, Undo2, Volume2, VolumeX, Star, BookOpen } from "lucide-react";

const TEAMS = [{name:"Egypt",division:"Classic Division",conference:"Penned Conference",players:[{n:"Scorpion King",hi:75,hf:"6.3",w:225,st:12,co:16,dx:12,wi:12,it:12,ch:14,at:16,rg:8,rn:8,lk:8,tt:118,star:false},{n:"Osiris",hi:90,hf:"7.5",w:350,st:20,co:18,dx:10,wi:20,it:20,ch:18,at:16,rg:16,rn:20,lk:14,tt:172,star:false},{n:"Anubis",hi:96,hf:"8.0",w:380,st:20,co:18,dx:14,wi:20,it:18,ch:16,at:18,rg:16,rn:18,lk:14,tt:172,star:false},{n:"Imhotep",hi:68,hf:"5.7",w:150,st:6,co:10,dx:10,wi:20,it:20,ch:14,at:10,rg:18,rn:16,lk:18,tt:142,star:false},{n:"The Sphinx",hi:240,hf:"20.0",w:25000,st:18,co:20,dx:6,wi:18,it:20,ch:16,at:16,rg:20,rn:16,lk:14,tt:164,star:false},{n:"Cleopatra",hi:64,hf:"5.3",w:120,st:4,co:8,dx:10,wi:18,it:20,ch:20,at:6,rg:10,rn:4,lk:16,tt:116,star:false},{n:"King Tut",hi:66,hf:"5.5",w:135,st:4,co:8,dx:10,wi:12,it:14,ch:14,at:6,rg:6,rn:4,lk:12,tt:90,star:false},{n:"Pharaoh Ramses II",hi:68,hf:"5.7",w:175,st:10,co:16,dx:10,wi:18,it:16,ch:20,at:14,rg:12,rn:12,lk:14,tt:142,star:false},{n:"Ra",hi:96,hf:"8.0",w:450,st:20,co:20,dx:16,wi:20,it:20,ch:20,at:20,rg:20,rn:20,lk:20,tt:196,star:true},{n:"Horus",hi:84,hf:"7.0",w:350,st:20,co:18,dx:18,wi:18,it:18,ch:18,at:20,rg:20,rn:18,lk:18,tt:186,star:false},{n:"Set",hi:102,hf:"8.5",w:500,st:20,co:20,dx:18,wi:16,it:16,ch:18,at:20,rg:20,rn:18,lk:16,tt:182,star:false}]},{name:"Ancient Greek",division:"Classic Division",conference:"Penned Conference",players:[{n:"Hercules",hi:77,hf:"6.4",w:325,st:18,co:18,dx:12,wi:12,it:12,ch:14,at:20,rg:8,rn:14,lk:12,tt:140,star:false},{n:"Zeus",hi:108,hf:"9.0",w:500,st:20,co:20,dx:16,wi:20,it:20,ch:20,at:20,rg:20,rn:20,lk:18,tt:194,star:true},{n:"Hades",hi:84,hf:"7.0",w:420,st:20,co:20,dx:12,wi:18,it:18,ch:14,at:18,rg:16,rn:18,lk:14,tt:168,star:false},{n:"Achilles",hi:74,hf:"6.2",w:220,st:14,co:16,dx:18,wi:14,it:14,ch:18,at:20,rg:12,rn:14,lk:12,tt:152,star:false},{n:"Odysseus",hi:71,hf:"5.9",w:195,st:10,co:16,dx:14,wi:20,it:20,ch:18,at:16,rg:14,rn:10,lk:18,tt:156,star:false},{n:"Perseus",hi:73,hf:"6.1",w:205,st:14,co:16,dx:16,wi:16,it:14,ch:16,at:18,rg:12,rn:12,lk:16,tt:150,star:false},{n:"Atlas",hi:600,hf:"50.0",w:200000,st:18,co:20,dx:8,wi:14,it:12,ch:10,at:18,rg:10,rn:14,lk:10,tt:134,star:false},{n:"Apollo",hi:74,hf:"6.2",w:190,st:16,co:18,dx:16,wi:20,it:20,ch:20,at:18,rg:20,rn:18,lk:18,tt:184,star:false},{n:"Athena",hi:72,hf:"6.0",w:180,st:16,co:18,dx:18,wi:20,it:20,ch:20,at:18,rg:18,rn:18,lk:16,tt:182,star:false},{n:"Ares",hi:77,hf:"6.4",w:500,st:20,co:18,dx:12,wi:10,it:12,ch:14,at:20,rg:12,rn:16,lk:10,tt:144,star:false},{n:"Poseidon",hi:88,hf:"7.3",w:460,st:20,co:20,dx:14,wi:18,it:18,ch:16,at:20,rg:20,rn:18,lk:14,tt:178,star:false}]},{name:"Mythical Creatures",division:"Classic Division",conference:"Penned Conference",players:[{n:"Medusa",hi:66,hf:"5.5",w:140,st:8,co:14,dx:16,wi:14,it:12,ch:10,at:18,rg:16,rn:8,lk:12,tt:128,star:true},{n:"Golem",hi:96,hf:"8.0",w:2000,st:20,co:20,dx:4,wi:8,it:6,ch:4,at:20,rg:6,rn:18,lk:6,tt:112,star:false},{n:"Kraken",hi:2400,hf:"200.0",w:10000000,st:18,co:20,dx:6,wi:4,it:4,ch:2,at:20,rg:12,rn:10,lk:10,tt:106,star:false},{n:"Oni",hi:84,hf:"7.0",w:500,st:18,co:18,dx:12,wi:14,it:10,ch:10,at:20,rg:12,rn:14,lk:10,tt:138,star:false},{n:"Centaur",hi:84,hf:"7.0",w:700,st:16,co:18,dx:18,wi:16,it:12,ch:14,at:18,rg:18,rn:8,lk:14,tt:152,star:false},{n:"Minotaur",hi:96,hf:"8.0",w:900,st:14,co:16,dx:10,wi:6,it:6,ch:4,at:18,rg:4,rn:8,lk:6,tt:92,star:false},{n:"Cyclopes",hi:180,hf:"15.0",w:5000,st:16,co:16,dx:8,wi:6,it:6,ch:4,at:18,rg:8,rn:8,lk:6,tt:96,star:false},{n:"Yeti",hi:108,hf:"9.0",w:900,st:16,co:20,dx:10,wi:12,it:8,ch:6,at:18,rg:8,rn:14,lk:10,tt:122,star:false},{n:"Sasquatch",hi:96,hf:"8.0",w:800,st:10,co:14,dx:12,wi:8,it:6,ch:4,at:14,rg:4,rn:8,lk:8,tt:88,star:false},{n:"Loch Ness Monster",hi:2160,hf:"180.0",w:2200000,st:16,co:18,dx:10,wi:8,it:6,ch:6,at:18,rg:8,rn:14,lk:20,tt:124,star:false},{n:"Mothman",hi:78,hf:"6.5",w:160,st:8,co:14,dx:20,wi:18,it:14,ch:8,at:16,rg:20,rn:10,lk:18,tt:146,star:false}]},{name:"Folk Heroes",division:"Classic Division",conference:"Penned Conference",players:[{n:"Paul Bunyan",hi:756,hf:"63.0",w:100000,st:20,co:16,dx:10,wi:10,it:10,ch:14,at:18,rg:10,rn:8,lk:12,tt:128,star:false},{n:"Pecos Bill",hi:84,hf:"7.0",w:350,st:18,co:16,dx:18,wi:10,it:8,ch:16,at:18,rg:14,rn:10,lk:18,tt:146,star:false},{n:"John Henry",hi:76,hf:"6.3",w:250,st:10,co:14,dx:14,wi:12,it:10,ch:16,at:20,rg:6,rn:12,lk:16,tt:130,star:false},{n:"Johnny Appleseed",hi:70,hf:"5.8",w:165,st:6,co:10,dx:12,wi:18,it:16,ch:18,at:8,rg:8,rn:8,lk:20,tt:124,star:false},{n:"Annie Oakley",hi:65,hf:"5.4",w:110,st:4,co:10,dx:20,wi:16,it:14,ch:18,at:16,rg:20,rn:6,lk:18,tt:142,star:false},{n:"Davy Crockett",hi:68,hf:"5.7",w:190,st:10,co:14,dx:16,wi:16,it:12,ch:18,at:16,rg:18,rn:8,lk:14,tt:142,star:false},{n:"Calamity Jane",hi:69,hf:"5.8",w:150,st:8,co:14,dx:16,wi:14,it:10,ch:18,at:16,rg:18,rn:8,lk:14,tt:136,star:false},{n:"Wyatt Earp",hi:74,hf:"6.2",w:180,st:10,co:14,dx:16,wi:18,it:14,ch:18,at:18,rg:20,rn:8,lk:12,tt:148,star:false},{n:"Buffalo Bill Cody",hi:72,hf:"6.0",w:190,st:8,co:14,dx:16,wi:16,it:14,ch:20,at:16,rg:20,rn:8,lk:14,tt:146,star:false},{n:"Uncle Sam",hi:78,hf:"6.5",w:240,st:14,co:18,dx:10,wi:14,it:14,ch:20,at:16,rg:16,rn:10,lk:16,tt:148,star:true},{n:"Rip Van Winkle",hi:72,hf:"6.0",w:170,st:6,co:12,dx:8,wi:16,it:12,ch:14,at:6,rg:6,rn:20,lk:18,tt:118,star:false}]},{name:"Middle Earth",division:"Lit Division",conference:"Penned Conference",players:[{n:"Gandalf the White",hi:71,hf:"5.9",w:185,st:20,co:16,dx:10,wi:20,it:20,ch:20,at:14,rg:16,rn:10,lk:18,tt:164,star:true},{n:"Aragorn",hi:74,hf:"6.2",w:210,st:8,co:16,dx:12,wi:16,it:14,ch:18,at:16,rg:10,rn:8,lk:16,tt:134,star:false},{n:"Gimli",hi:54,hf:"4.5",w:310,st:16,co:20,dx:10,wi:14,it:12,ch:14,at:18,rg:8,rn:10,lk:14,tt:136,star:false},{n:"Legolas",hi:72,hf:"6.0",w:165,st:8,co:14,dx:16,wi:16,it:16,ch:16,at:16,rg:20,rn:8,lk:14,tt:144,star:false},{n:"Sauron",hi:108,hf:"9.0",w:2000,st:20,co:20,dx:8,wi:16,it:20,ch:14,at:18,rg:16,rn:14,lk:10,tt:156,star:false},{n:"Durin's Bane",hi:180,hf:"15.0",w:2813,st:18,co:18,dx:6,wi:8,it:6,ch:4,at:20,rg:10,rn:10,lk:8,tt:108,star:false},{n:"Smaug",hi:720,hf:"60.0",w:175000,st:18,co:20,dx:14,wi:14,it:16,ch:12,at:20,rg:18,rn:12,lk:14,tt:158,star:false},{n:"Tom Bombadil",hi:60,hf:"5.0",w:180,st:10,co:18,dx:12,wi:20,it:20,ch:20,at:20,rg:20,rn:20,lk:20,tt:180,star:false},{n:"Treebeard (Ent)",hi:840,hf:"70.0",w:100000,st:16,co:20,dx:4,wi:18,it:16,ch:14,at:16,rg:10,rn:14,lk:10,tt:138,star:false},{n:"Boromir",hi:74,hf:"6.2",w:240,st:12,co:18,dx:14,wi:14,it:12,ch:16,at:18,rg:8,rn:8,lk:12,tt:132,star:false},{n:"Elrond",hi:72,hf:"6.0",w:180,st:10,co:16,dx:12,wi:20,it:20,ch:20,at:14,rg:18,rn:10,lk:16,tt:156,star:false}]},{name:"Protagonists",division:"Lit Division",conference:"Penned Conference",players:[{n:"King Arthur",hi:72,hf:"6.0",w:200,st:12,co:18,dx:12,wi:18,it:16,ch:20,at:16,rg:10,rn:10,lk:18,tt:150,star:true},{n:"Merlin",hi:70,hf:"5.8",w:160,st:12,co:14,dx:8,wi:20,it:20,ch:18,at:12,rg:18,rn:10,lk:14,tt:146,star:false},{n:"Mr Hyde",hi:78,hf:"6.5",w:350,st:20,co:16,dx:10,wi:4,it:6,ch:4,at:16,rg:4,rn:10,lk:6,tt:96,star:false},{n:"Gilgamesh",hi:76,hf:"6.3",w:240,st:16,co:18,dx:14,wi:16,it:16,ch:18,at:20,rg:10,rn:16,lk:16,tt:160,star:false},{n:"Dorian Gray",hi:72,hf:"6.0",w:165,st:6,co:18,dx:14,wi:16,it:18,ch:20,at:10,rg:8,rn:20,lk:18,tt:148,star:false},{n:"Robin Hood",hi:70,hf:"5.8",w:165,st:10,co:14,dx:18,wi:16,it:14,ch:18,at:16,rg:20,rn:6,lk:16,tt:148,star:false},{n:"Don Quixote",hi:72,hf:"6.0",w:155,st:2,co:8,dx:8,wi:4,it:12,ch:14,at:8,rg:6,rn:4,lk:18,tt:84,star:false},{n:"Sherlock Holmes",hi:73,hf:"6.1",w:165,st:4,co:10,dx:10,wi:18,it:20,ch:14,at:10,rg:8,rn:4,lk:12,tt:110,star:false},{n:"James Bond",hi:72,hf:"6.0",w:185,st:12,co:16,dx:18,wi:16,it:16,ch:20,at:18,rg:16,rn:8,lk:18,tt:158,star:false},{n:"Beowulf",hi:78,hf:"6.5",w:240,st:20,co:20,dx:14,wi:14,it:10,ch:14,at:20,rg:8,rn:16,lk:16,tt:152,star:false},{n:"Van Helsing",hi:74,hf:"6.2",w:190,st:14,co:16,dx:16,wi:18,it:18,ch:14,at:18,rg:16,rn:8,lk:14,tt:152,star:false}]},{name:"Hogwarts",division:"Lit Division",conference:"Penned Conference",players:[{n:"Harry Potter",hi:69,hf:"5.8",w:155,st:12,co:14,dx:10,wi:14,it:16,ch:16,at:10,rg:16,rn:6,lk:16,tt:130,star:false},{n:"Hermione Granger",hi:65,hf:"5.4",w:125,st:8,co:12,dx:10,wi:18,it:20,ch:16,at:12,rg:18,rn:6,lk:12,tt:132,star:false},{n:"Rubeus Hagrid",hi:102,hf:"8.5",w:289,st:12,co:14,dx:8,wi:10,it:10,ch:14,at:12,rg:6,rn:8,lk:10,tt:104,star:false},{n:"Albus Dumbledore",hi:72,hf:"6.0",w:170,st:12,co:16,dx:12,wi:20,it:20,ch:20,at:18,rg:20,rn:10,lk:14,tt:162,star:true},{n:"Sirius Black",hi:72,hf:"6.0",w:180,st:12,co:14,dx:14,wi:16,it:16,ch:18,at:16,rg:16,rn:8,lk:12,tt:142,star:false},{n:"Ron Weasley",hi:75,hf:"6.3",w:190,st:10,co:12,dx:10,wi:12,it:10,ch:16,at:10,rg:14,rn:6,lk:16,tt:116,star:false},{n:"Severus Snape",hi:75,hf:"6.3",w:175,st:10,co:14,dx:12,wi:18,it:20,ch:12,at:16,rg:20,rn:8,lk:10,tt:140,star:false},{n:"Dobby",hi:36,hf:"3.0",w:28,st:10,co:8,dx:12,wi:14,it:12,ch:16,at:8,rg:12,rn:6,lk:14,tt:112,star:false},{n:"Mad-Eye Moody",hi:75,hf:"6.3",w:210,st:14,co:18,dx:12,wi:20,it:16,ch:10,at:18,rg:18,rn:8,lk:8,tt:142,star:false},{n:"Newt Scamander",hi:72,hf:"6.0",w:165,st:8,co:12,dx:12,wi:18,it:18,ch:16,at:10,rg:18,rn:8,lk:14,tt:134,star:false},{n:"Lord Voldemort",hi:74,hf:"6.2",w:185,st:14,co:18,dx:16,wi:18,it:20,ch:14,at:20,rg:20,rn:20,lk:8,tt:168,star:false}]},{name:"Far Far Away",division:"Lit Division",conference:"Penned Conference",players:[{n:"Big Bad Wolf",hi:72,hf:"6.0",w:250,st:16,co:16,dx:18,wi:10,it:10,ch:14,at:18,rg:10,rn:10,lk:14,tt:136,star:false},{n:"Shrek",hi:84,hf:"7.0",w:450,st:18,co:16,dx:8,wi:12,it:10,ch:12,at:14,rg:4,rn:8,lk:16,tt:118,star:true},{n:"Pied Piper",hi:68,hf:"5.7",w:150,st:6,co:10,dx:14,wi:18,it:16,ch:20,at:10,rg:20,rn:8,lk:16,tt:138,star:false},{n:"Puss in Boots",hi:36,hf:"3.0",w:25,st:8,co:10,dx:20,wi:14,it:12,ch:20,at:18,rg:12,rn:6,lk:18,tt:138,star:false},{n:"Rumpelstiltskin",hi:48,hf:"4.0",w:60,st:6,co:8,dx:14,wi:20,it:20,ch:18,at:12,rg:18,rn:14,lk:20,tt:150,star:false},{n:"Jack Frost",hi:66,hf:"5.5",w:140,st:10,co:16,dx:18,wi:14,it:14,ch:16,at:16,rg:20,rn:18,lk:16,tt:158,star:false},{n:"Mother Goose",hi:66,hf:"5.5",w:145,st:4,co:10,dx:8,wi:20,it:18,ch:20,at:8,rg:18,rn:12,lk:20,tt:138,star:false},{n:"Pinocchio",hi:54,hf:"4.5",w:100,st:6,co:12,dx:14,wi:12,it:10,ch:18,at:10,rg:8,rn:10,lk:20,tt:120,star:false},{n:"Thumbelina",hi:4,hf:"0.3",w:1,st:2,co:6,dx:20,wi:18,it:16,ch:16,at:8,rg:18,rn:8,lk:18,tt:130,star:false},{n:"The Ugly Duckling",hi:30,hf:"2.5",w:20,st:4,co:8,dx:12,wi:14,it:10,ch:16,at:6,rg:8,rn:16,lk:20,tt:114,star:false},{n:"The Gingerbread Man",hi:36,hf:"3.0",w:15,st:4,co:8,dx:20,wi:10,it:8,ch:16,at:10,rg:6,rn:12,lk:20,tt:114,star:false}]},{name:"Justice League",division:"DC Division",conference:"Penned Conference",players:[{n:"Batman",hi:74,hf:"6.2",w:210,st:10,co:18,dx:14,wi:18,it:20,ch:14,at:16,rg:14,rn:8,lk:14,tt:146,star:false},{n:"Superman",hi:75,hf:"6.3",w:235,st:20,co:20,dx:20,wi:18,it:16,ch:18,at:20,rg:18,rn:18,lk:16,tt:184,star:true},{n:"Wonder woman",hi:72,hf:"6.0",w:165,st:18,co:18,dx:16,wi:14,it:14,ch:20,at:18,rg:16,rn:16,lk:16,tt:166,star:false},{n:"Green Lantern",hi:74,hf:"6.2",w:200,st:18,co:18,dx:16,wi:14,it:16,ch:16,at:16,rg:20,rn:10,lk:12,tt:156,star:false},{n:"Aquaman",hi:73,hf:"6.1",w:325,st:14,co:18,dx:16,wi:14,it:14,ch:16,at:16,rg:12,rn:12,lk:12,tt:144,star:false},{n:"Martian Manhunter",hi:79,hf:"6.6",w:300,st:20,co:18,dx:16,wi:18,it:20,ch:14,at:18,rg:16,rn:16,lk:12,tt:168,star:false},{n:"Apache Chief",hi:600,hf:"50.0",w:85000,st:14,co:16,dx:10,wi:12,it:10,ch:12,at:16,rg:10,rn:8,lk:12,tt:120,star:false},{n:"Plastic Man",hi:73,hf:"6.1",w:178,st:12,co:16,dx:14,wi:12,it:12,ch:16,at:12,rg:10,rn:14,lk:14,tt:132,star:false},{n:"Cyborg",hi:77,hf:"6.4",w:385,st:14,co:18,dx:14,wi:14,it:18,ch:12,at:16,rg:16,rn:10,lk:10,tt:142,star:false},{n:"The Flash",hi:72,hf:"6.0",w:195,st:16,co:14,dx:20,wi:14,it:16,ch:16,at:16,rg:10,rn:14,lk:14,tt:150,star:false},{n:"Shazaam",hi:72,hf:"6.0",w:215,st:18,co:18,dx:18,wi:16,it:14,ch:16,at:18,rg:14,rn:12,lk:14,tt:158,star:false}]},{name:"Batman Villains",division:"DC Division",conference:"Penned Conference",players:[{n:"Joker",hi:72,hf:"6.0",w:160,st:10,co:10,dx:10,wi:8,it:16,ch:20,at:12,rg:10,rn:8,lk:20,tt:124,star:true},{n:"Bane",hi:80,hf:"6.7",w:350,st:20,co:18,dx:10,wi:14,it:16,ch:10,at:16,rg:6,rn:8,lk:8,tt:126,star:false},{n:"Penguin",hi:65,hf:"5.4",w:175,st:8,co:12,dx:10,wi:14,it:18,ch:16,at:12,rg:10,rn:8,lk:16,tt:124,star:false},{n:"Catwoman",hi:67,hf:"5.6",w:125,st:10,co:12,dx:20,wi:16,it:14,ch:18,at:16,rg:10,rn:8,lk:18,tt:142,star:false},{n:"Riddler",hi:72,hf:"6.0",w:180,st:6,co:10,dx:10,wi:16,it:20,ch:14,at:10,rg:14,rn:6,lk:12,tt:118,star:false},{n:"Poison Ivy",hi:68,hf:"5.7",w:130,st:8,co:16,dx:14,wi:16,it:16,ch:18,at:16,rg:20,rn:18,lk:14,tt:156,star:false},{n:"Mr. Freeze",hi:70,hf:"5.8",w:200,st:14,co:18,dx:10,wi:14,it:20,ch:10,at:18,rg:20,rn:12,lk:8,tt:144,star:false},{n:"Scarecrow",hi:75,hf:"6.3",w:165,st:6,co:10,dx:12,wi:20,it:18,ch:12,at:14,rg:18,rn:6,lk:10,tt:126,star:false},{n:"Two-Face",hi:72,hf:"6.0",w:190,st:10,co:14,dx:12,wi:12,it:14,ch:14,at:16,rg:12,rn:8,lk:20,tt:132,star:false},{n:"Harley Quinn",hi:65,hf:"5.4",w:125,st:12,co:14,dx:18,wi:14,it:12,ch:18,at:16,rg:12,rn:10,lk:20,tt:146,star:false},{n:"Clayface",hi:96,hf:"8.0",w:1000,st:20,co:20,dx:14,wi:12,it:12,ch:10,at:20,rg:18,rn:20,lk:10,tt:156,star:false}]},{name:"DC Villains",division:"DC Division",conference:"Penned Conference",players:[{n:"Lex Luthor",hi:74,hf:"6.2",w:210,st:14,co:14,dx:8,wi:18,it:20,ch:16,at:12,rg:14,rn:4,lk:10,tt:130,star:true},{n:"Brainiac",hi:79,hf:"6.6",w:300,st:16,co:16,dx:12,wi:20,it:20,ch:10,at:18,rg:20,rn:16,lk:8,tt:156,star:false},{n:"Darkseid",hi:105,hf:"8.8",w:1815,st:20,co:20,dx:8,wi:18,it:18,ch:10,at:20,rg:18,rn:14,lk:12,tt:158,star:false},{n:"Deathstroke",hi:77,hf:"6.4",w:235,st:16,co:18,dx:18,wi:14,it:16,ch:10,at:18,rg:10,rn:12,lk:14,tt:146,star:false},{n:"Sinestro",hi:79,hf:"6.6",w:180,st:14,co:16,dx:14,wi:18,it:18,ch:16,at:18,rg:20,rn:12,lk:10,tt:156,star:false},{n:"Killer Croc",hi:89,hf:"7.4",w:686,st:10,co:18,dx:12,wi:6,it:6,ch:4,at:16,rg:4,rn:10,lk:6,tt:92,star:false},{n:"Doomsday",hi:101,hf:"8.4",w:900,st:18,co:20,dx:12,wi:4,it:4,ch:2,at:20,rg:8,rn:20,lk:8,tt:116,star:false},{n:"Lobo",hi:90,hf:"7.5",w:315,st:16,co:18,dx:12,wi:8,it:10,ch:8,at:18,rg:10,rn:18,lk:8,tt:126,star:false},{n:"Gorilla Grodd",hi:84,hf:"7.0",w:600,st:18,co:18,dx:10,wi:18,it:20,ch:12,at:18,rg:16,rn:10,lk:8,tt:148,star:false},{n:"Professor Zoom",hi:72,hf:"6.0",w:180,st:12,co:14,dx:20,wi:18,it:18,ch:12,at:18,rg:14,rn:18,lk:10,tt:154,star:false},{n:"General Zod",hi:76,hf:"6.3",w:250,st:20,co:20,dx:18,wi:14,it:14,ch:14,at:20,rg:18,rn:18,lk:10,tt:166,star:false}]},{name:"DC Heroes",division:"DC Division",conference:"Penned Conference",players:[{n:"Green Arrow",hi:73,hf:"6.1",w:195,st:8,co:14,dx:12,wi:16,it:14,ch:14,at:16,rg:20,rn:6,lk:10,tt:130,star:false},{n:"The Atom",hi:6,hf:"0.5",w:3,st:4,co:6,dx:18,wi:16,it:18,ch:12,at:12,rg:16,rn:4,lk:14,tt:120,star:false},{n:"Constantine",hi:74,hf:"6.2",w:180,st:6,co:10,dx:12,wi:18,it:18,ch:20,at:12,rg:18,rn:6,lk:16,tt:136,star:false},{n:"Deadshot",hi:73,hf:"6.1",w:195,st:8,co:14,dx:12,wi:14,it:14,ch:10,at:18,rg:20,rn:4,lk:8,tt:122,star:false},{n:"Doctor Fate",hi:75,hf:"6.3",w:210,st:18,co:18,dx:12,wi:20,it:20,ch:18,at:18,rg:20,rn:18,lk:14,tt:176,star:false},{n:"Black Adam",hi:75,hf:"6.3",w:250,st:20,co:20,dx:18,wi:16,it:14,ch:16,at:20,rg:18,rn:18,lk:12,tt:172,star:false},{n:"Hawkman",hi:73,hf:"6.1",w:195,st:10,co:16,dx:16,wi:14,it:14,ch:12,at:16,rg:12,rn:8,lk:8,tt:126,star:false},{n:"Swamp Thing",hi:84,hf:"7.0",w:500,st:16,co:18,dx:6,wi:16,it:14,ch:8,at:14,rg:10,rn:20,lk:10,tt:132,star:false},{n:"Nightwing",hi:71,hf:"5.9",w:175,st:8,co:14,dx:18,wi:16,it:16,ch:18,at:18,rg:14,rn:6,lk:12,tt:140,star:true},{n:"Supergirl",hi:66,hf:"5.5",w:125,st:20,co:20,dx:18,wi:14,it:12,ch:18,at:20,rg:20,rn:20,lk:14,tt:176,star:false},{n:"King Shark",hi:89,hf:"7.4",w:550,st:10,co:18,dx:14,wi:6,it:6,ch:4,at:16,rg:4,rn:10,lk:8,tt:96,star:false}]},{name:"Avengers",division:"Marvel Division",conference:"Penned Conference",players:[{n:"Captain America",hi:74,hf:"6.2",w:240,st:12,co:18,dx:16,wi:18,it:14,ch:20,at:16,rg:12,rn:12,lk:18,tt:156,star:true},{n:"Ironman",hi:73,hf:"6.1",w:225,st:16,co:18,dx:16,wi:16,it:20,ch:18,at:16,rg:18,rn:8,lk:14,tt:160,star:false},{n:"Thor",hi:78,hf:"6.5",w:640,st:20,co:20,dx:14,wi:14,it:14,ch:16,at:20,rg:16,rn:16,lk:14,tt:164,star:false},{n:"Black Widow",hi:65,hf:"5.4",w:132,st:12,co:14,dx:20,wi:16,it:16,ch:18,at:18,rg:14,rn:8,lk:16,tt:152,star:false},{n:"Hawkeye",hi:75,hf:"6.3",w:230,st:6,co:12,dx:12,wi:16,it:14,ch:14,at:16,rg:18,rn:4,lk:10,tt:122,star:false},{n:"The Incredible Hulk",hi:96,hf:"8.0",w:1400,st:18,co:20,dx:12,wi:6,it:8,ch:6,at:20,rg:8,rn:18,lk:16,tt:132,star:false},{n:"Spiderman",hi:70,hf:"5.8",w:167,st:14,co:16,dx:18,wi:16,it:18,ch:16,at:18,rg:14,rn:10,lk:16,tt:156,star:false},{n:"Dr. Strange",hi:74,hf:"6.2",w:185,st:20,co:16,dx:10,wi:20,it:20,ch:16,at:14,rg:18,rn:10,lk:14,tt:158,star:false},{n:"Black Panther",hi:72,hf:"6.0",w:200,st:12,co:18,dx:16,wi:16,it:16,ch:16,at:18,rg:12,rn:10,lk:12,tt:146,star:false},{n:"Ant-man",hi:72,hf:"6.0",w:190,st:10,co:12,dx:12,wi:12,it:16,ch:14,at:12,rg:10,rn:6,lk:10,tt:114,star:false},{n:"Vision",hi:75,hf:"6.3",w:300,st:18,co:18,dx:16,wi:18,it:18,ch:14,at:16,rg:16,rn:12,lk:10,tt:156,star:false}]},{name:"X-men",division:"Marvel Division",conference:"Penned Conference",players:[{n:"Professor Xavier",hi:68,hf:"5.7",w:190,st:6,co:12,dx:8,wi:20,it:20,ch:16,at:18,rg:20,rn:6,lk:10,tt:136,star:true},{n:"Wolverine",hi:63,hf:"5.3",w:300,st:14,co:20,dx:14,wi:14,it:12,ch:10,at:18,rg:4,rn:20,lk:14,tt:140,star:false},{n:"Beast (Hank McCoy)",hi:71,hf:"5.9",w:355,st:12,co:16,dx:14,wi:16,it:20,ch:14,at:16,rg:6,rn:10,lk:10,tt:134,star:false},{n:"Cyclops",hi:75,hf:"6.3",w:195,st:12,co:14,dx:14,wi:16,it:14,ch:14,at:18,rg:20,rn:6,lk:12,tt:140,star:false},{n:"Jean Grey",hi:67,hf:"5.6",w:115,st:8,co:12,dx:12,wi:18,it:20,ch:16,at:20,rg:20,rn:8,lk:12,tt:146,star:false},{n:"Storm",hi:70,hf:"5.8",w:127,st:10,co:14,dx:16,wi:18,it:16,ch:18,at:18,rg:20,rn:8,lk:12,tt:150,star:false},{n:"Colossus",hi:78,hf:"6.5",w:500,st:14,co:20,dx:8,wi:12,it:12,ch:12,at:18,rg:6,rn:10,lk:8,tt:120,star:false},{n:"Rogue",hi:68,hf:"5.7",w:120,st:18,co:18,dx:14,wi:14,it:12,ch:14,at:18,rg:10,rn:10,lk:14,tt:142,star:false},{n:"Nightcrawler",hi:69,hf:"5.8",w:161,st:12,co:14,dx:18,wi:14,it:14,ch:16,at:14,rg:10,rn:8,lk:12,tt:132,star:false},{n:"Gambit",hi:74,hf:"6.2",w:185,st:12,co:12,dx:14,wi:14,it:14,ch:18,at:16,rg:14,rn:6,lk:10,tt:130,star:false},{n:"Deadpool",hi:74,hf:"6.2",w:210,st:12,co:16,dx:14,wi:8,it:10,ch:18,at:18,rg:10,rn:20,lk:20,tt:146,star:false}]},{name:"Marvel Heroes",division:"Marvel Division",conference:"Penned Conference",players:[{n:"Ghost Rider",hi:74,hf:"6.2",w:220,st:18,co:18,dx:14,wi:10,it:10,ch:12,at:18,rg:12,rn:18,lk:12,tt:142,star:false},{n:"Daredevil",hi:72,hf:"6.0",w:200,st:8,co:14,dx:16,wi:16,it:14,ch:14,at:16,rg:6,rn:8,lk:12,tt:124,star:false},{n:"Silver Surfer",hi:74,hf:"6.2",w:225,st:20,co:20,dx:20,wi:18,it:18,ch:16,at:20,rg:20,rn:18,lk:10,tt:180,star:false},{n:"Punisher",hi:73,hf:"6.1",w:200,st:8,co:14,dx:12,wi:14,it:14,ch:10,at:16,rg:16,rn:6,lk:10,tt:120,star:false},{n:"Star-Lord",hi:74,hf:"6.2",w:185,st:10,co:12,dx:16,wi:14,it:16,ch:18,at:14,rg:18,rn:6,lk:14,tt:138,star:false},{n:"Groot",hi:276,hf:"23.0",w:8200,st:14,co:18,dx:6,wi:10,it:6,ch:12,at:14,rg:8,rn:18,lk:12,tt:118,star:false},{n:"Rocket Raccoon",hi:37,hf:"3.1",w:55,st:8,co:12,dx:14,wi:12,it:18,ch:14,at:14,rg:18,rn:6,lk:12,tt:128,star:false},{n:"Mr. Fantastic",hi:73,hf:"6.1",w:185,st:12,co:12,dx:10,wi:16,it:20,ch:14,at:12,rg:12,rn:8,lk:10,tt:126,star:true},{n:"Human Torch",hi:70,hf:"5.8",w:175,st:12,co:14,dx:16,wi:14,it:14,ch:16,at:18,rg:20,rn:10,lk:12,tt:146,star:false},{n:"Thing (Ben Grimm)",hi:72,hf:"6.0",w:500,st:14,co:20,dx:8,wi:12,it:12,ch:10,at:18,rg:6,rn:10,lk:10,tt:120,star:false},{n:"Invisible Woman",hi:68,hf:"5.7",w:125,st:8,co:14,dx:14,wi:18,it:16,ch:18,at:18,rg:20,rn:12,lk:12,tt:150,star:false}]},{name:"Marvel Villains",division:"Marvel Division",conference:"Penned Conference",players:[{n:"Dr. Doom",hi:74,hf:"6.2",w:225,st:18,co:18,dx:10,wi:16,it:20,ch:14,at:16,rg:16,rn:10,lk:12,tt:150,star:false},{n:"Thanos",hi:79,hf:"6.6",w:985,st:20,co:20,dx:10,wi:18,it:18,ch:12,at:20,rg:18,rn:14,lk:12,tt:162,star:true},{n:"Ultron",hi:72,hf:"6.0",w:575,st:18,co:20,dx:14,wi:14,it:20,ch:10,at:18,rg:16,rn:14,lk:10,tt:154,star:false},{n:"Magneto",hi:74,hf:"6.2",w:190,st:20,co:18,dx:12,wi:18,it:20,ch:16,at:16,rg:18,rn:8,lk:12,tt:158,star:false},{n:"Venom",hi:75,hf:"6.3",w:580,st:14,co:18,dx:14,wi:8,it:10,ch:8,at:18,rg:8,rn:16,lk:10,tt:124,star:false},{n:"Loki",hi:76,hf:"6.3",w:525,st:18,co:14,dx:12,wi:14,it:20,ch:18,at:16,rg:14,rn:10,lk:12,tt:148,star:false},{n:"Apocalypse",hi:84,hf:"7.0",w:700,st:20,co:20,dx:10,wi:14,it:16,ch:12,at:20,rg:16,rn:16,lk:10,tt:154,star:false},{n:"Juggernaut",hi:113,hf:"9.4",w:1900,st:16,co:20,dx:10,wi:6,it:8,ch:6,at:20,rg:6,rn:12,lk:10,tt:114,star:false},{n:"Dr. Octopus",hi:69,hf:"5.8",w:245,st:12,co:14,dx:10,wi:12,it:20,ch:10,at:14,rg:12,rn:6,lk:10,tt:120,star:false},{n:"Winter Soldier",hi:73,hf:"6.1",w:260,st:10,co:16,dx:14,wi:12,it:14,ch:10,at:16,rg:16,rn:8,lk:10,tt:126,star:false},{n:"Scarlet Witch",hi:65,hf:"5.4",w:132,st:8,co:14,dx:14,wi:18,it:18,ch:16,at:20,rg:20,rn:10,lk:16,tt:154,star:false}]},{name:"Disney Characters",division:"Animated Division",conference:"Filmed Conference",players:[{n:"Mickey Mouse",hi:27,hf:"2.3",w:23,st:6,co:8,dx:10,wi:12,it:12,ch:20,at:6,rg:6,rn:6,lk:18,tt:104,star:true},{n:"The Genie",hi:144,hf:"12.0",w:1000,st:20,co:16,dx:16,wi:14,it:16,ch:20,at:16,rg:20,rn:20,lk:18,tt:176,star:false},{n:"Elsa",hi:67,hf:"5.6",w:120,st:6,co:12,dx:10,wi:18,it:16,ch:18,at:18,rg:20,rn:10,lk:14,tt:142,star:false},{n:"Maui",hi:84,hf:"7.0",w:450,st:14,co:16,dx:12,wi:14,it:14,ch:18,at:16,rg:10,rn:10,lk:14,tt:138,star:false},{n:"Simba",hi:108,hf:"9.0",w:643,st:8,co:16,dx:8,wi:12,it:10,ch:14,at:16,rg:4,rn:8,lk:14,tt:110,star:false},{n:"Stitch",hi:36,hf:"3.0",w:22,st:14,co:18,dx:18,wi:12,it:14,ch:16,at:18,rg:12,rn:14,lk:16,tt:152,star:false},{n:"Mulan",hi:65,hf:"5.4",w:125,st:10,co:14,dx:18,wi:16,it:14,ch:16,at:18,rg:12,rn:6,lk:14,tt:138,star:false},{n:"Wreck-it Ralph",hi:108,hf:"9.0",w:643,st:8,co:16,dx:8,wi:12,it:10,ch:14,at:16,rg:4,rn:8,lk:14,tt:110,star:false},{n:"Peter Pan",hi:63,hf:"5.3",w:90,st:10,co:8,dx:18,wi:14,it:12,ch:20,at:10,rg:10,rn:8,lk:16,tt:126,star:false},{n:"Beast",hi:96,hf:"8.0",w:600,st:8,co:16,dx:10,wi:12,it:12,ch:10,at:14,rg:4,rn:10,lk:14,tt:110,star:false},{n:"Tarzan",hi:74,hf:"6.2",w:190,st:18,co:18,dx:18,wi:16,it:12,ch:16,at:18,rg:8,rn:10,lk:18,tt:152,star:false}]},{name:"Dragonball",division:"Animated Division",conference:"Filmed Conference",players:[{n:"Goku",hi:69,hf:"5.8",w:137,st:20,co:18,dx:20,wi:12,it:10,ch:14,at:20,rg:14,rn:16,lk:14,tt:158,star:true},{n:"Vegeta",hi:65,hf:"5.4",w:123,st:20,co:18,dx:20,wi:12,it:12,ch:10,at:20,rg:14,rn:14,lk:12,tt:152,star:false},{n:"Gohan",hi:69,hf:"5.8",w:145,st:18,co:18,dx:18,wi:16,it:16,ch:16,at:20,rg:16,rn:14,lk:14,tt:166,star:false},{n:"Piccolo",hi:74,hf:"6.2",w:220,st:18,co:20,dx:16,wi:18,it:16,ch:12,at:18,rg:18,rn:18,lk:10,tt:164,star:false},{n:"Frieza",hi:60,hf:"5.0",w:55,st:20,co:18,dx:20,wi:18,it:20,ch:14,at:20,rg:20,rn:20,lk:12,tt:182,star:false},{n:"Trunks",hi:67,hf:"5.6",w:132,st:18,co:16,dx:18,wi:14,it:16,ch:16,at:18,rg:16,rn:10,lk:14,tt:156,star:false},{n:"Krillin",hi:60,hf:"5.0",w:115,st:14,co:14,dx:18,wi:16,it:16,ch:14,at:16,rg:16,rn:8,lk:16,tt:148,star:false},{n:"Majin Buu",hi:57,hf:"4.8",w:120,st:20,co:20,dx:16,wi:10,it:8,ch:12,at:20,rg:18,rn:20,lk:16,tt:160,star:false},{n:"Cell",hi:84,hf:"7.0",w:260,st:20,co:20,dx:18,wi:16,it:20,ch:14,at:20,rg:20,rn:20,lk:10,tt:178,star:false},{n:"Android 18",hi:67,hf:"5.6",w:132,st:16,co:18,dx:20,wi:16,it:16,ch:16,at:18,rg:18,rn:14,lk:12,tt:164,star:false},{n:"Tien Shinhan",hi:73,hf:"6.1",w:165,st:16,co:16,dx:18,wi:18,it:14,ch:10,at:18,rg:18,rn:8,lk:12,tt:148,star:false}]},{name:"Looney Tunes",division:"Animated Division",conference:"Filmed Conference",players:[{n:"Bugs Bunny",hi:44,hf:"3.7",w:35,st:14,co:10,dx:16,wi:18,it:16,ch:20,at:10,rg:10,rn:10,lk:20,tt:144,star:true},{n:"Daffy Duck",hi:30,hf:"2.5",w:8,st:6,co:12,dx:16,wi:6,it:14,ch:18,at:16,rg:20,rn:8,lk:20,tt:136,star:false},{n:"Porky Pig",hi:36,hf:"3.0",w:80,st:6,co:12,dx:10,wi:12,it:10,ch:18,at:6,rg:4,rn:10,lk:18,tt:106,star:false},{n:"Foghorn Leghorn",hi:60,hf:"5.0",w:180,st:14,co:16,dx:10,wi:8,it:6,ch:18,at:16,rg:4,rn:10,lk:16,tt:118,star:false},{n:"Wile E. Coyote",hi:46,hf:"3.8",w:35,st:8,co:6,dx:14,wi:4,it:14,ch:8,at:6,rg:12,rn:20,lk:20,tt:112,star:false},{n:"Roadrunner",hi:24,hf:"2.0",w:8,st:6,co:6,dx:20,wi:10,it:8,ch:12,at:4,rg:4,rn:10,lk:20,tt:100,star:false},{n:"Yosemite Sam",hi:48,hf:"4.0",w:75,st:12,co:10,dx:14,wi:6,it:8,ch:18,at:12,rg:16,rn:8,lk:18,tt:122,star:false},{n:"Marvin the Martian",hi:36,hf:"3.0",w:30,st:16,co:14,dx:12,wi:12,it:18,ch:10,at:12,rg:20,rn:6,lk:14,tt:134,star:false},{n:"Tasmanian Devil",hi:44,hf:"3.7",w:130,st:18,co:14,dx:16,wi:4,it:4,ch:8,at:14,rg:4,rn:8,lk:10,tt:100,star:false},{n:"Elmer Fudd",hi:42,hf:"3.5",w:70,st:10,co:10,dx:10,wi:8,it:8,ch:12,at:10,rg:16,rn:8,lk:16,tt:108,star:false},{n:"Speedy Gonzales",hi:24,hf:"2.0",w:20,st:6,co:6,dx:20,wi:12,it:12,ch:16,at:6,rg:6,rn:6,lk:16,tt:106,star:false}]},{name:"Cartoons",division:"Animated Division",conference:"Filmed Conference",players:[{n:"Kung Fu Panda (Po)",hi:75,hf:"6.3",w:260,st:18,co:20,dx:14,wi:16,it:12,ch:20,at:20,rg:8,rn:16,lk:18,tt:162,star:false},{n:"Popeye",hi:66,hf:"5.5",w:158,st:14,co:16,dx:12,wi:10,it:10,ch:12,at:18,rg:8,rn:12,lk:16,tt:128,star:false},{n:"He-Man",hi:72,hf:"6.0",w:220,st:20,co:20,dx:18,wi:16,it:12,ch:18,at:20,rg:8,rn:16,lk:16,tt:164,star:false},{n:"Inspector Gadget",hi:72,hf:"6.0",w:200,st:10,co:12,dx:10,wi:6,it:8,ch:12,at:10,rg:12,rn:6,lk:14,tt:100,star:false},{n:"Mighty Mouse",hi:6,hf:"0.5",w:1,st:16,co:14,dx:18,wi:10,it:10,ch:14,at:16,rg:8,rn:10,lk:14,tt:130,star:false},{n:"Kim Possible",hi:64,hf:"5.3",w:115,st:8,co:12,dx:20,wi:16,it:16,ch:18,at:14,rg:8,rn:8,lk:16,tt:136,star:false},{n:"Leonardo",hi:62,hf:"5.2",w:180,st:8,co:16,dx:16,wi:16,it:14,ch:14,at:16,rg:8,rn:8,lk:12,tt:128,star:false},{n:"Michelangelo",hi:62,hf:"5.2",w:180,st:8,co:16,dx:16,wi:10,it:10,ch:18,at:14,rg:8,rn:8,lk:12,tt:120,star:false},{n:"Donatello",hi:62,hf:"5.2",w:180,st:8,co:16,dx:14,wi:14,it:20,ch:12,at:14,rg:10,rn:8,lk:10,tt:126,star:false},{n:"Raphael",hi:62,hf:"5.2",w:180,st:8,co:16,dx:16,wi:10,it:10,ch:12,at:16,rg:8,rn:8,lk:10,tt:114,star:false},{n:"Captain Planet",hi:76,hf:"6.3",w:210,st:20,co:16,dx:18,wi:16,it:14,ch:18,at:16,rg:18,rn:16,lk:16,tt:168,star:true}]},{name:"Movie Monsters",division:"Entertainment Division",conference:"Filmed Conference",players:[{n:"Count Dracula",hi:74,hf:"6.2",w:190,st:16,co:16,dx:14,wi:16,it:18,ch:18,at:16,rg:10,rn:14,lk:12,tt:150,star:true},{n:"Frankenstein's Monster",hi:96,hf:"8.0",w:500,st:8,co:16,dx:6,wi:6,it:6,ch:4,at:14,rg:4,rn:14,lk:8,tt:86,star:false},{n:"The Headless Horseman",hi:78,hf:"6.5",w:220,st:14,co:16,dx:16,wi:8,it:6,ch:4,at:16,rg:10,rn:14,lk:14,tt:118,star:false},{n:"Stay Puft Marshmallow Man",hi:1344,hf:"112.0",w:3870000,st:14,co:16,dx:4,wi:2,it:2,ch:6,at:16,rg:8,rn:8,lk:12,tt:88,star:false},{n:"Pennywise",hi:78,hf:"6.5",w:180,st:10,co:14,dx:14,wi:18,it:18,ch:20,at:20,rg:20,rn:20,lk:18,tt:172,star:false},{n:"Freddy Krueger",hi:69,hf:"5.8",w:175,st:16,co:16,dx:10,wi:14,it:14,ch:14,at:14,rg:8,rn:18,lk:14,tt:138,star:false},{n:"Jason Voorhees",hi:77,hf:"6.4",w:260,st:12,co:18,dx:8,wi:4,it:4,ch:2,at:16,rg:4,rn:18,lk:14,tt:100,star:false},{n:"Godzilla",hi:4728,hf:"394.0",w:99000000,st:20,co:20,dx:6,wi:6,it:6,ch:6,at:20,rg:14,rn:20,lk:14,tt:132,star:false},{n:"King Kong",hi:720,hf:"60.0",w:100000,st:14,co:18,dx:10,wi:8,it:8,ch:8,at:18,rg:8,rn:10,lk:14,tt:116,star:false},{n:"Wolf-man",hi:84,hf:"7.0",w:400,st:10,co:16,dx:16,wi:8,it:6,ch:4,at:16,rg:4,rn:14,lk:8,tt:102,star:false},{n:"Beetlejuice",hi:69,hf:"5.8",w:160,st:14,co:14,dx:10,wi:6,it:12,ch:18,at:10,rg:10,rn:12,lk:14,tt:120,star:false}]},{name:"WWE",division:"Entertainment Division",conference:"Filmed Conference",players:[{n:"The Undertaker",hi:82,hf:"6.8",w:309,st:18,co:20,dx:10,wi:16,it:14,ch:20,at:20,rg:8,rn:16,lk:18,tt:160,star:false},{n:"John Cena",hi:73,hf:"6.1",w:251,st:18,co:18,dx:16,wi:14,it:14,ch:20,at:18,rg:6,rn:12,lk:18,tt:154,star:false},{n:"Hulk Hogan",hi:76,hf:"6.3",w:302,st:18,co:18,dx:10,wi:14,it:12,ch:20,at:18,rg:4,rn:14,lk:18,tt:146,star:true},{n:"Andre the Giant",hi:86,hf:"7.2",w:500,st:6,co:16,dx:8,wi:10,it:8,ch:16,at:14,rg:4,rn:8,lk:12,tt:102,star:false},{n:"The Ultimate Warrior",hi:74,hf:"6.2",w:280,st:20,co:18,dx:14,wi:8,it:8,ch:18,at:20,rg:4,rn:12,lk:14,tt:136,star:false},{n:"Ric Flair",hi:73,hf:"6.1",w:243,st:10,co:14,dx:12,wi:18,it:16,ch:20,at:14,rg:4,rn:12,lk:20,tt:140,star:false},{n:"Stone Cold Steve Austin",hi:74,hf:"6.2",w:252,st:18,co:20,dx:12,wi:16,it:14,ch:20,at:20,rg:4,rn:16,lk:16,tt:156,star:false},{n:"The Rock",hi:77,hf:"6.4",w:260,st:18,co:18,dx:14,wi:16,it:16,ch:20,at:18,rg:6,rn:12,lk:18,tt:156,star:false},{n:"Macho Man Randy Savage",hi:71,hf:"5.9",w:237,st:16,co:16,dx:16,wi:12,it:10,ch:20,at:18,rg:6,rn:12,lk:18,tt:144,star:false},{n:"Triple H",hi:76,hf:"6.3",w:255,st:18,co:18,dx:12,wi:18,it:16,ch:18,at:20,rg:4,rn:14,lk:14,tt:152,star:false},{n:"Kane",hi:81,hf:"6.8",w:323,st:20,co:20,dx:8,wi:12,it:10,ch:16,at:20,rg:4,rn:16,lk:12,tt:138,star:false}]},{name:"Movie Heroes",division:"Entertainment Division",conference:"Filmed Conference",players:[{n:"Indiana Jones",hi:73,hf:"6.1",w:185,st:4,co:14,dx:12,wi:16,it:18,ch:16,at:14,rg:12,rn:8,lk:20,tt:134,star:false},{n:"Neo",hi:73,hf:"6.1",w:185,st:16,co:18,dx:18,wi:16,it:18,ch:14,at:16,rg:12,rn:10,lk:16,tt:154,star:false},{n:"Leonidas",hi:74,hf:"6.2",w:220,st:16,co:20,dx:14,wi:16,it:12,ch:14,at:18,rg:14,rn:18,lk:8,tt:150,star:true},{n:"Falcor",hi:720,hf:"60.0",w:20000,st:16,co:14,dx:16,wi:18,it:16,ch:20,at:12,rg:14,rn:12,lk:16,tt:154,star:false},{n:"Rocky Balboa",hi:71,hf:"5.9",w:220,st:6,co:12,dx:10,wi:12,it:10,ch:16,at:12,rg:4,rn:12,lk:16,tt:110,star:false},{n:"Rambo",hi:70,hf:"5.8",w:200,st:8,co:14,dx:12,wi:12,it:12,ch:10,at:16,rg:16,rn:8,lk:14,tt:122,star:false},{n:"Zorro",hi:72,hf:"6.0",w:185,st:6,co:14,dx:14,wi:16,it:14,ch:18,at:14,rg:10,rn:6,lk:10,tt:122,star:false},{n:"Forrest Gump",hi:73,hf:"6.1",w:190,st:8,co:18,dx:10,wi:12,it:8,ch:16,at:18,rg:8,rn:10,lk:6,tt:114,star:false},{n:"Beatrix Kiddo",hi:66,hf:"5.5",w:115,st:8,co:14,dx:18,wi:14,it:12,ch:12,at:18,rg:14,rn:18,lk:6,tt:134,star:false},{n:"John Wick",hi:73,hf:"6.1",w:185,st:8,co:16,dx:14,wi:16,it:14,ch:12,at:18,rg:16,rn:8,lk:18,tt:140,star:false},{n:"William Wallace",hi:78,hf:"6.5",w:230,st:16,co:20,dx:12,wi:16,it:10,ch:18,at:16,rg:14,rn:18,lk:8,tt:148,star:false}]},{name:"Commercial Mascots",division:"Entertainment Division",conference:"Filmed Conference",players:[{n:"Ronald McDonald",hi:72,hf:"6.0",w:190,st:8,co:12,dx:14,wi:12,it:14,ch:20,at:10,rg:14,rn:8,lk:18,tt:130,star:true},{n:"Burger King",hi:78,hf:"6.5",w:250,st:12,co:16,dx:10,wi:10,it:12,ch:18,at:14,rg:10,rn:10,lk:16,tt:128,star:false},{n:"Energizer Bunny",hi:48,hf:"4.0",w:70,st:8,co:20,dx:20,wi:8,it:6,ch:16,at:12,rg:8,rn:20,lk:20,tt:138,star:false},{n:"Jolly Green Giant",hi:336,hf:"28.0",w:2500,st:20,co:20,dx:6,wi:12,it:10,ch:18,at:18,rg:12,rn:14,lk:14,tt:144,star:false},{n:"Kool-Aid Man",hi:78,hf:"6.5",w:880,st:8,co:18,dx:8,wi:6,it:4,ch:18,at:14,rg:6,rn:10,lk:20,tt:112,star:false},{n:"Lucky the Leprechaun",hi:36,hf:"3.0",w:65,st:4,co:8,dx:18,wi:16,it:14,ch:18,at:8,rg:16,rn:10,lk:20,tt:132,star:false},{n:"Tony the Tiger",hi:84,hf:"7.0",w:350,st:18,co:18,dx:16,wi:10,it:10,ch:20,at:18,rg:8,rn:12,lk:14,tt:144,star:false},{n:"Mr. Clean",hi:72,hf:"6.0",w:210,st:18,co:20,dx:10,wi:12,it:12,ch:18,at:16,rg:10,rn:18,lk:14,tt:148,star:false},{n:"GEICO Gecko",hi:24,hf:"2.0",w:12,st:4,co:8,dx:18,wi:14,it:16,ch:20,at:6,rg:14,rn:8,lk:18,tt:126,star:false},{n:"Mr. Peanut",hi:60,hf:"5.0",w:140,st:6,co:12,dx:12,wi:16,it:18,ch:20,at:8,rg:14,rn:8,lk:20,tt:134,star:false},{n:"Chester Cheetah",hi:72,hf:"6.0",w:180,st:10,co:12,dx:20,wi:10,it:12,ch:20,at:12,rg:10,rn:8,lk:10,tt:124,star:false}]},{name:"Aliens",division:"Space Division",conference:"Filmed Conference",players:[{n:"Xenomorph",hi:84,hf:"7.0",w:350,st:16,co:18,dx:18,wi:8,it:10,ch:4,at:18,rg:8,rn:14,lk:12,tt:126,star:false},{n:"Predator",hi:87,hf:"7.3",w:440,st:12,co:18,dx:14,wi:14,it:14,ch:6,at:18,rg:16,rn:10,lk:8,tt:130,star:false},{n:"E.T.",hi:42,hf:"3.5",w:70,st:4,co:2,dx:10,wi:18,it:16,ch:18,at:4,rg:14,rn:8,lk:16,tt:110,star:false},{n:"Dalek",hi:72,hf:"6.0",w:350,st:18,co:20,dx:4,wi:18,it:20,ch:6,at:20,rg:20,rn:10,lk:10,tt:146,star:false},{n:"Alf",hi:40,hf:"3.3",w:45,st:6,co:10,dx:12,wi:10,it:14,ch:20,at:6,rg:4,rn:8,lk:18,tt:108,star:false},{n:"Na'vi",hi:108,hf:"9.0",w:250,st:14,co:16,dx:14,wi:14,it:10,ch:14,at:14,rg:8,rn:10,lk:12,tt:126,star:false},{n:"Zoidberg",hi:60,hf:"5.0",w:130,st:8,co:12,dx:14,wi:8,it:8,ch:14,at:10,rg:6,rn:12,lk:18,tt:110,star:false},{n:"Invader Zim",hi:48,hf:"4.0",w:70,st:6,co:10,dx:16,wi:14,it:18,ch:12,at:8,rg:14,rn:8,lk:16,tt:122,star:false},{n:"Ben 10",hi:60,hf:"5.0",w:110,st:12,co:14,dx:16,wi:14,it:16,ch:18,at:20,rg:20,rn:14,lk:16,tt:160,star:false},{n:"Cthulhu",hi:1200,hf:"100.0",w:10000000,st:20,co:20,dx:12,wi:20,it:20,ch:18,at:20,rg:20,rn:20,lk:16,tt:186,star:true},{n:"Blue Meanie",hi:72,hf:"6.0",w:180,st:10,co:14,dx:14,wi:8,it:10,ch:16,at:14,rg:12,rn:10,lk:16,tt:124,star:false}]},{name:"Star Wars",division:"Space Division",conference:"Filmed Conference",players:[{n:"Darth Vader",hi:79,hf:"6.6",w:330,st:16,co:18,dx:10,wi:14,it:18,ch:14,at:18,rg:16,rn:8,lk:12,tt:144,star:false},{n:"Yoda",hi:26,hf:"2.2",w:38,st:20,co:18,dx:12,wi:20,it:20,ch:18,at:16,rg:14,rn:12,lk:16,tt:166,star:true},{n:"Luke Skywalker",hi:70,hf:"5.8",w:170,st:10,co:14,dx:16,wi:18,it:16,ch:18,at:18,rg:18,rn:8,lk:16,tt:152,star:false},{n:"Han Solo",hi:72,hf:"6.0",w:176,st:8,co:14,dx:14,wi:14,it:16,ch:20,at:14,rg:16,rn:6,lk:18,tt:140,star:false},{n:"Chewbacca",hi:87,hf:"7.3",w:440,st:6,co:14,dx:10,wi:12,it:12,ch:10,at:14,rg:12,rn:8,lk:12,tt:110,star:false},{n:"Obi-Wan Kenobi",hi:71,hf:"5.9",w:181,st:10,co:16,dx:16,wi:20,it:18,ch:18,at:18,rg:16,rn:10,lk:14,tt:156,star:false},{n:"Mace Windu",hi:75,hf:"6.3",w:185,st:12,co:18,dx:18,wi:18,it:16,ch:16,at:20,rg:16,rn:10,lk:12,tt:156,star:false},{n:"Boba Fett",hi:72,hf:"6.0",w:200,st:8,co:16,dx:14,wi:14,it:14,ch:10,at:14,rg:18,rn:6,lk:12,tt:126,star:false},{n:"Jar Jar Binks",hi:77,hf:"6.4",w:190,st:6,co:10,dx:8,wi:6,it:6,ch:14,at:6,rg:4,rn:4,lk:20,tt:84,star:false},{n:"General Grievous",hi:85,hf:"7.1",w:1590,st:18,co:18,dx:18,wi:8,it:10,ch:6,at:20,rg:10,rn:12,lk:8,tt:128,star:false},{n:"Kylo Ren",hi:74,hf:"6.2",w:190,st:14,co:16,dx:16,wi:14,it:14,ch:16,at:18,rg:16,rn:8,lk:10,tt:142,star:false}]},{name:"Star Trek",division:"Space Division",conference:"Filmed Conference",players:[{n:"Captain Jean-Luc Picard",hi:70,hf:"5.8",w:175,st:6,co:10,dx:8,wi:20,it:18,ch:20,at:8,rg:10,rn:4,lk:18,tt:122,star:false},{n:"Spock",hi:72,hf:"6.0",w:180,st:8,co:12,dx:10,wi:20,it:20,ch:10,at:10,rg:16,rn:8,lk:16,tt:130,star:false},{n:"Benjamin Sisko",hi:74,hf:"6.2",w:200,st:12,co:16,dx:12,wi:18,it:16,ch:20,at:14,rg:14,rn:8,lk:16,tt:146,star:false},{n:"Captain James T. Kirk",hi:69,hf:"5.8",w:170,st:10,co:14,dx:16,wi:16,it:14,ch:20,at:14,rg:10,rn:6,lk:18,tt:138,star:true},{n:"Worf",hi:78,hf:"6.5",w:230,st:18,co:20,dx:14,wi:12,it:10,ch:12,at:18,rg:8,rn:10,lk:10,tt:132,star:false},{n:"Data",hi:74,hf:"6.2",w:190,st:20,co:20,dx:18,wi:16,it:20,ch:8,at:18,rg:14,rn:20,lk:12,tt:166,star:false},{n:"Odo",hi:74,hf:"6.2",w:190,st:16,co:18,dx:16,wi:18,it:18,ch:12,at:16,rg:12,rn:20,lk:14,tt:160,star:false},{n:"Seven of Nine",hi:71,hf:"5.9",w:170,st:16,co:18,dx:16,wi:18,it:20,ch:12,at:18,rg:14,rn:16,lk:10,tt:158,star:false},{n:"Leonard \"Bones\" McCoy",hi:70,hf:"5.8",w:165,st:6,co:10,dx:8,wi:18,it:20,ch:14,at:6,rg:8,rn:8,lk:16,tt:114,star:false},{n:"Montgomery \"Scotty\" Scott",hi:68,hf:"5.7",w:180,st:8,co:12,dx:8,wi:16,it:20,ch:16,at:8,rg:18,rn:6,lk:14,tt:126,star:false},{n:"Kang",hi:78,hf:"6.5",w:240,st:18,co:20,dx:14,wi:14,it:12,ch:16,at:18,rg:10,rn:10,lk:12,tt:144,star:false}]},{name:"Robots",division:"Space Division",conference:"Filmed Conference",players:[{n:"T-800",hi:76,hf:"6.3",w:400,st:18,co:20,dx:10,wi:14,it:16,ch:6,at:18,rg:18,rn:10,lk:10,tt:140,star:false},{n:"Iron Giant",hi:600,hf:"50.0",w:50000,st:16,co:20,dx:8,wi:12,it:10,ch:12,at:18,rg:16,rn:10,lk:16,tt:138,star:false},{n:"T-1000",hi:73,hf:"6.1",w:350,st:14,co:20,dx:14,wi:10,it:12,ch:8,at:16,rg:8,rn:20,lk:10,tt:132,star:false},{n:"Robo-Cop",hi:76,hf:"6.3",w:800,st:10,co:20,dx:8,wi:14,it:14,ch:8,at:16,rg:16,rn:8,lk:14,tt:128,star:false},{n:"Megazord",hi:1560,hf:"130.0",w:172000,st:18,co:20,dx:6,wi:10,it:10,ch:10,at:18,rg:14,rn:6,lk:14,tt:126,star:false},{n:"Megatron",hi:264,hf:"22.0",w:90000,st:18,co:20,dx:12,wi:14,it:18,ch:12,at:20,rg:18,rn:10,lk:12,tt:154,star:false},{n:"Optimus Prime",hi:264,hf:"22.0",w:50000,st:18,co:20,dx:12,wi:18,it:18,ch:18,at:18,rg:16,rn:12,lk:18,tt:168,star:true},{n:"Bender Bending Rodriguez",hi:72,hf:"6.0",w:500,st:8,co:16,dx:10,wi:4,it:12,ch:14,at:12,rg:8,rn:10,lk:16,tt:110,star:false},{n:"Voltron",hi:2400,hf:"200.0",w:9000000,st:20,co:20,dx:8,wi:12,it:12,ch:12,at:20,rg:18,rn:8,lk:12,tt:142,star:false},{n:"Baymax",hi:72,hf:"6.0",w:1100,st:12,co:20,dx:6,wi:18,it:16,ch:18,at:8,rg:6,rn:18,lk:14,tt:136,star:false},{n:"Mega Man",hi:52,hf:"4.3",w:230,st:14,co:16,dx:14,wi:12,it:16,ch:12,at:16,rg:16,rn:8,lk:12,tt:136,star:false}]},{name:"Video Games",division:"Console Division",conference:"Filmed Conference",players:[{n:"Link",hi:67,hf:"5.6",w:150,st:12,co:16,dx:14,wi:16,it:14,ch:14,at:16,rg:14,rn:10,lk:14,tt:140,star:false},{n:"Princess Zelda",hi:65,hf:"5.4",w:115,st:8,co:12,dx:10,wi:20,it:18,ch:18,at:14,rg:20,rn:14,lk:16,tt:150,star:true},{n:"Donkey Kong",hi:61,hf:"5.1",w:800,st:16,co:16,dx:10,wi:8,it:8,ch:12,at:16,rg:6,rn:8,lk:12,tt:112,star:false},{n:"Diddy Kong",hi:48,hf:"4.0",w:61,st:10,co:10,dx:18,wi:10,it:10,ch:14,at:10,rg:8,rn:6,lk:12,tt:108,star:false},{n:"Star Fox",hi:68,hf:"5.7",w:140,st:10,co:12,dx:20,wi:16,it:18,ch:16,at:14,rg:20,rn:8,lk:14,tt:148,star:false},{n:"Little Mac",hi:67,hf:"5.6",w:107,st:8,co:12,dx:18,wi:12,it:10,ch:12,at:16,rg:4,rn:8,lk:14,tt:114,star:false},{n:"Laura Croft",hi:67,hf:"5.6",w:121,st:12,co:16,dx:20,wi:18,it:18,ch:16,at:18,rg:20,rn:8,lk:16,tt:130,star:false},{n:"Earthworm Jim",hi:60,hf:"5.0",w:40,st:10,co:12,dx:12,wi:8,it:8,ch:10,at:14,rg:16,rn:8,lk:16,tt:114,star:false},{n:"Master Chief",hi:86,hf:"7.2",w:450,st:10,co:20,dx:14,wi:16,it:16,ch:12,at:18,rg:18,rn:12,lk:18,tt:154,star:false},{n:"Kratos",hi:76,hf:"6.3",w:284,st:16,co:20,dx:12,wi:14,it:12,ch:10,at:20,rg:10,rn:14,lk:12,tt:140,star:false},{n:"Crash Bandicoot",hi:60,hf:"5.0",w:138,st:6,co:12,dx:16,wi:8,it:8,ch:14,at:12,rg:8,rn:8,lk:14,tt:106,star:false}]},{name:"Mushroom Kingdom",division:"Console Division",conference:"Filmed Conference",players:[{n:"Mario Mario",hi:61,hf:"5.1",w:198,st:10,co:12,dx:14,wi:12,it:12,ch:16,at:12,rg:8,rn:8,lk:16,tt:120,star:false},{n:"Luigi Mario",hi:69,hf:"5.8",w:170,st:8,co:10,dx:14,wi:12,it:12,ch:14,at:10,rg:8,rn:6,lk:14,tt:108,star:false},{n:"Captain Toad",hi:30,hf:"2.5",w:55,st:4,co:10,dx:6,wi:14,it:12,ch:14,at:6,rg:6,rn:4,lk:12,tt:88,star:false},{n:"Princess Peach",hi:65,hf:"5.4",w:110,st:8,co:12,dx:14,wi:16,it:14,ch:20,at:12,rg:14,rn:10,lk:18,tt:138,star:true},{n:"Daisy",hi:65,hf:"5.4",w:112,st:10,co:14,dx:16,wi:12,it:10,ch:18,at:14,rg:12,rn:10,lk:16,tt:132,star:false},{n:"Yoshi",hi:42,hf:"3.5",w:130,st:8,co:12,dx:16,wi:10,it:8,ch:16,at:10,rg:8,rn:8,lk:14,tt:110,star:false},{n:"Bowser",hi:104,hf:"8.7",w:1400,st:14,co:20,dx:8,wi:8,it:10,ch:10,at:18,rg:10,rn:12,lk:14,tt:124,star:false},{n:"Bowser Jr.",hi:55,hf:"4.6",w:130,st:10,co:14,dx:14,wi:10,it:16,ch:12,at:14,rg:14,rn:10,lk:14,tt:128,star:false},{n:"Wario",hi:67,hf:"5.6",w:308,st:6,co:14,dx:8,wi:6,it:6,ch:6,at:14,rg:4,rn:8,lk:10,tt:82,star:false},{n:"Waluigi",hi:91,hf:"7.6",w:152,st:4,co:8,dx:14,wi:6,it:6,ch:8,at:8,rg:6,rn:4,lk:10,tt:74,star:false},{n:"Rosalina",hi:75,hf:"6.3",w:150,st:10,co:16,dx:12,wi:20,it:20,ch:18,at:16,rg:20,rn:18,lk:18,tt:168,star:false}]},{name:"Pokemon",division:"Console Division",conference:"Filmed Conference",players:[{n:"Pikachu",hi:16,hf:"1.3",w:13,st:12,co:10,dx:16,wi:10,it:10,ch:18,at:12,rg:12,rn:6,lk:14,tt:120,star:false},{n:"Charizard",hi:67,hf:"5.6",w:199,st:16,co:16,dx:14,wi:10,it:10,ch:14,at:18,rg:18,rn:10,lk:12,tt:138,star:false},{n:"Mewtwo",hi:79,hf:"6.6",w:269,st:18,co:18,dx:18,wi:20,it:20,ch:12,at:20,rg:20,rn:18,lk:10,tt:174,star:true},{n:"Greninja",hi:59,hf:"4.9",w:88,st:12,co:12,dx:20,wi:14,it:14,ch:12,at:18,rg:16,rn:8,lk:14,tt:140,star:false},{n:"Squirtle",hi:20,hf:"1.7",w:20,st:6,co:10,dx:12,wi:12,it:10,ch:16,at:10,rg:14,rn:8,lk:14,tt:112,star:false},{n:"Mr. Mime",hi:51,hf:"4.3",w:120,st:10,co:14,dx:10,wi:12,it:14,ch:14,at:8,rg:12,rn:4,lk:6,tt:104,star:false},{n:"Jigglypuff",hi:20,hf:"1.7",w:12,st:4,co:10,dx:12,wi:14,it:12,ch:20,at:8,rg:14,rn:8,lk:16,tt:118,star:false},{n:"Lucario",hi:47,hf:"3.9",w:119,st:16,co:14,dx:18,wi:16,it:16,ch:14,at:18,rg:16,rn:10,lk:12,tt:150,star:false},{n:"Hawlucha",hi:31,hf:"2.6",w:47,st:10,co:12,dx:20,wi:12,it:8,ch:16,at:16,rg:10,rn:8,lk:14,tt:126,star:false},{n:"Eevee",hi:12,hf:"1.0",w:14,st:6,co:10,dx:14,wi:12,it:10,ch:18,at:8,rg:10,rn:6,lk:18,tt:112,star:false},{n:"Machamp",hi:63,hf:"5.3",w:287,st:10,co:14,dx:10,wi:8,it:8,ch:8,at:18,rg:6,rn:8,lk:6,tt:96,star:false}]},{name:"Super Smash Bros",division:"Console Division",conference:"Filmed Conference",players:[{n:"Kirby",hi:8,hf:"0.7",w:9,st:14,co:14,dx:12,wi:10,it:10,ch:18,at:14,rg:10,rn:12,lk:14,tt:128,star:false},{n:"Banjo & Kazooie",hi:42,hf:"3.5",w:100,st:12,co:16,dx:14,wi:10,it:10,ch:18,at:16,rg:10,rn:8,lk:16,tt:130,star:false},{n:"Cloud Strife",hi:68,hf:"5.7",w:173,st:18,co:18,dx:16,wi:14,it:12,ch:14,at:20,rg:10,rn:10,lk:12,tt:144,star:false},{n:"Samus",hi:74,hf:"6.2",w:198,st:16,co:18,dx:16,wi:16,it:18,ch:14,at:18,rg:20,rn:14,lk:12,tt:162,star:false},{n:"Minecraft Steve",hi:72,hf:"6.0",w:180,st:16,co:20,dx:10,wi:10,it:14,ch:8,at:18,rg:14,rn:10,lk:16,tt:136,star:false},{n:"Ness",hi:54,hf:"4.5",w:85,st:8,co:12,dx:14,wi:18,it:18,ch:16,at:14,rg:20,rn:10,lk:14,tt:144,star:false},{n:"Pac-Man",hi:12,hf:"1.0",w:10,st:6,co:8,dx:14,wi:8,it:8,ch:14,at:8,rg:6,rn:6,lk:12,tt:90,star:false},{n:"Sora",hi:64,hf:"5.3",w:125,st:14,co:16,dx:18,wi:16,it:14,ch:18,at:18,rg:16,rn:12,lk:16,tt:158,star:false},{n:"Solid Snake",hi:73,hf:"6.1",w:185,st:6,co:16,dx:14,wi:18,it:18,ch:12,at:18,rg:18,rn:10,lk:18,tt:148,star:false},{n:"Captain Falcon",hi:74,hf:"6.2",w:198,st:16,co:18,dx:18,wi:12,it:12,ch:20,at:18,rg:8,rn:10,lk:14,tt:146,star:true},{n:"Sephiroth",hi:79,hf:"6.6",w:123,st:18,co:16,dx:18,wi:18,it:18,ch:16,at:20,rg:20,rn:16,lk:10,tt:170,star:false}]}];

const THEME = {
  bg: "#12151B", panel: "#1A1F28", panel2: "#20262F", border: "#2B3240", borderLight: "#394253",
  text: "#EDEFF3", textMuted: "#8B93A5", textFaint: "#5C6579",
  gold: "#D9A82B", goldDim: "#8A6E22", teal: "#39A896", red: "#C1554D", purple: "#9D7FE0",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');`;

const EVENTS_DB = [{"name":"Alliance Island","category":"Social","competitors":5,"description":"A social-survival competition where contestants form alliances, complete challenges, negotiate votes, and attempt to survive weekly eliminations.","archetype":"round","primary":["ch","wi"],"secondary":["it","lk"],"actions":[{"l":"Alliance formed","p":2,"h":null},{"l":"challenge contribution","p":2,"h":10},{"l":"immunity win","p":15,"h":null},{"l":"successful vote prediction","p":5,"h":null},{"l":"eliminating target","p":8,"h":null},{"l":"surviving vote","p":3,"h":null}],"weights":{"str":5,"con":5,"dex":5,"wis":20,"int":15,"cha":40,"lck":10}},{"name":"Battle Bots","category":"Combat","competitors":4,"description":"Contestants control customized combat robots and attempt to damage, disable, immobilize, or destroy opposing machines.","archetype":"battlefield","primary":["at","rn"],"secondary":["dx","co"],"actions":[{"l":"Damage","p":1,"h":null},{"l":"weapon hit","p":3,"h":null},{"l":"component destroyed","p":5,"h":null},{"l":"immobilization","p":10,"h":null},{"l":"KO","p":15,"h":null},{"l":"match win","p":10,"h":null}],"weights":{"str":15,"con":10,"dex":15,"wis":15,"int":30,"cha":0,"lck":15}},{"name":"Charades","category":"Performance","competitors":4,"description":"Contestants silently act out clues while teammates attempt to identify them against a time limit.","archetype":"round","primary":["ch","it"],"secondary":["dx","lk"],"actions":[{"l":"Correct guess","p":5,"h":null},{"l":"consecutive guess","p":2,"h":null},{"l":"difficult clue","p":5,"h":null},{"l":"fastest solve","p":5,"h":null}],"weights":{"str":0,"con":0,"dex":15,"wis":20,"int":15,"cha":40,"lck":10}},{"name":"Chess Boxing","category":"Intellectual","competitors":4,"description":"Contestants alternate between chess rounds and boxing rounds, with victory possible through checkmate, knockout, or technical victory.","archetype":"duel","primary":["it","st"],"secondary":["wi","co"],"actions":[{"l":"Chess piece captured","p":1,"h":null},{"l":"check","p":3,"h":null},{"l":"tactical sequence","p":5,"h":null},{"l":"boxing strike","p":1,"h":null},{"l":"knockdown","p":8,"h":null},{"l":"checkmate/KO","p":20,"h":null}],"weights":{"str":15,"con":15,"dex":15,"wis":20,"int":20,"cha":0,"lck":15}},{"name":"Escape Room Gauntlet","category":"Intellectual","competitors":4,"description":"Teams race through multiple puzzle rooms, solving clues and unlocking doors before time expires.","archetype":"round","primary":["it","wi"],"secondary":["dx","lk"],"actions":[{"l":"Puzzle solved","p":5,"h":null},{"l":"difficult puzzle","p":8,"h":null},{"l":"clue discovered","p":2,"h":null},{"l":"room cleared","p":10,"h":null},{"l":"full escape","p":20,"h":null}],"weights":{"str":5,"con":5,"dex":10,"wis":20,"int":40,"cha":5,"lck":15}},{"name":"Fashion Runway Showdown","category":"Performance","competitors":4,"description":"Contestants design and present outfits based on a theme, with judges scoring creativity, style, construction, and presentation.","archetype":"round","primary":["ch","it"],"secondary":["dx","lk"],"actions":[{"l":"Category scores","p":1,"h":10},{"l":"theme match","p":5,"h":null},{"l":"runway performance","p":5,"h":null},{"l":"overall win","p":20,"h":null}],"weights":{"str":0,"con":0,"dex":10,"wis":15,"int":15,"cha":45,"lck":15}},{"name":"Giant Jenga","category":"Strength","competitors":4,"description":"Contestants remove giant blocks from an increasingly unstable tower and place them on top without causing collapse.","archetype":"duel","primary":["dx","co"],"secondary":["wi","lk"],"actions":[{"l":"Successful removal","p":2,"h":null},{"l":"difficult block","p":4,"h":null},{"l":"successful placement","p":3,"h":null},{"l":"tower height milestone","p":5,"h":null},{"l":"collapse","p":-10,"h":null}],"weights":{"str":5,"con":5,"dex":30,"wis":20,"int":15,"cha":0,"lck":25}},{"name":"Go-Kart Racing","category":"Racing","competitors":4,"description":"Drivers race around a closed circuit while managing speed, corners, overtaking, hazards, and vehicle control.","archetype":"race","primary":["dx","it"],"secondary":["at","lk"],"actions":[{"l":"Lap completed","p":2,"h":null},{"l":"clean overtake","p":3,"h":null},{"l":"fastest lap","p":10,"h":null},{"l":"position gained","p":3,"h":null},{"l":"race win","p":20,"h":null}],"weights":{"str":10,"con":10,"dex":35,"wis":15,"int":10,"cha":0,"lck":20}},{"name":"Hot Dog Eating Contest","category":"Performance","competitors":4,"description":"Contestants compete to consume as many hot dogs as possible within a strict time limit.","archetype":"hotdog_custom","primary":["co","rg"],"secondary":["st","lk"],"actions":[{"l":"Hot dog consumed","p":1,"h":null},{"l":"streak","p":2,"h":null},{"l":"record bonus","p":10,"h":null},{"l":"victory","p":20,"h":null}],"weights":{"str":10,"con":40,"dex":5,"wis":5,"int":0,"cha":0,"lck":40}},{"name":"Ice Road Truckers","category":"Racing","competitors":7,"description":"Drivers transport valuable cargo across dangerous frozen roads while managing speed, vehicle stability, and hazards.","archetype":"race","primary":["dx","wi"],"secondary":["co","lk"],"actions":[{"l":"Distance","p":1,"h":null},{"l":"checkpoint","p":5,"h":null},{"l":"cargo delivered","p":15,"h":null},{"l":"hazard avoided","p":3,"h":null},{"l":"crash","p":-10,"h":null}],"weights":{"str":15,"con":25,"dex":15,"wis":20,"int":15,"cha":0,"lck":10}},{"name":"Iron Chef","category":"Performance","competitors":4,"description":"Teams prepare a multi-course meal using a secret ingredient while judges score taste, creativity, technique, and presentation.","archetype":"round","primary":["it","ch"],"secondary":["dx","lk"],"actions":[{"l":"Course completed","p":5,"h":null},{"l":"technique","p":1,"h":5},{"l":"presentation","p":1,"h":5},{"l":"best dish","p":10,"h":null},{"l":"overall win","p":20,"h":null}],"weights":{"str":5,"con":10,"dex":20,"wis":15,"int":25,"cha":15,"lck":10}},{"name":"Karaoke Showdown","category":"Performance","competitors":4,"description":"Contestants perform songs judged on vocal performance, entertainment value, stage presence, and audience reaction.","archetype":"round","primary":["ch","dx"],"secondary":["it","lk"],"actions":[{"l":"Vocal score","p":1,"h":10},{"l":"stage presence","p":1,"h":10},{"l":"crowd reaction","p":5,"h":null},{"l":"perfect performance","p":10,"h":null}],"weights":{"str":0,"con":5,"dex":10,"wis":10,"int":5,"cha":50,"lck":20}},{"name":"Lego Masters Challenge","category":"Performance","competitors":4,"description":"Contestants construct Lego creations under a themed prompt and time limit, judged on creativity, engineering, and presentation.","archetype":"round","primary":["it","dx"],"secondary":["wi","lk"],"actions":[{"l":"Build milestone","p":3,"h":null},{"l":"creative feature","p":5,"h":null},{"l":"functional feature","p":5,"h":null},{"l":"judging score","p":1,"h":10},{"l":"win","p":20,"h":null}],"weights":{"str":5,"con":5,"dex":20,"wis":15,"int":35,"cha":5,"lck":15}},{"name":"Master Builder Challenge","category":"Performance","competitors":4,"description":"Contestants construct a specified structure under a strict deadline while being judged on stability, accuracy, and design.","archetype":"round","primary":["it","dx"],"secondary":["wi","lk"],"actions":[{"l":"Component completed","p":2,"h":null},{"l":"stability","p":5,"h":null},{"l":"accuracy","p":5,"h":null},{"l":"design bonus","p":5,"h":null},{"l":"win","p":20,"h":null}],"weights":{"str":10,"con":10,"dex":15,"wis":15,"int":35,"cha":5,"lck":10}},{"name":"Mecha Arena","category":"Combat","competitors":4,"description":"Giant robots or vehicles fight in an arena using weapons, armor, movement, and special systems.","archetype":"battlefield","primary":["at","rn"],"secondary":["dx","co"],"actions":[{"l":"Damage","p":1,"h":null},{"l":"system disabled","p":5,"h":null},{"l":"critical hit","p":5,"h":null},{"l":"KO","p":15,"h":null},{"l":"victory","p":20,"h":null}],"weights":{"str":20,"con":15,"dex":15,"wis":10,"int":25,"cha":0,"lck":15}},{"name":"Mock Trial","category":"Social","competitors":4,"description":"Prosecution and defense teams present arguments, examine witnesses, introduce evidence, and attempt to convince a jury.","archetype":"round","primary":["ch","it"],"secondary":["wi","lk"],"actions":[{"l":"Strong argument","p":3,"h":null},{"l":"evidence","p":5,"h":null},{"l":"successful objection","p":3,"h":null},{"l":"witness examination","p":4,"h":null},{"l":"verdict win","p":20,"h":null}],"weights":{"str":0,"con":0,"dex":0,"wis":20,"int":25,"cha":45,"lck":10}},{"name":"Monopoly","category":"Intellectual","competitors":4,"description":"Contestants buy, trade, develop, and manage properties while attempting to maximize wealth and bankrupt rivals.","archetype":"round","primary":["it","ch"],"secondary":["wi","lk"],"actions":[{"l":"Property acquired","p":2,"h":null},{"l":"rent collected","p":1,"h":null},{"l":"monopoly completed","p":10,"h":null},{"l":"opponent bankrupt","p":15,"h":null},{"l":"wealth milestone","p":5,"h":null}],"weights":{"str":0,"con":0,"dex":0,"wis":25,"int":25,"cha":20,"lck":30}},{"name":"Mousetrap","category":"Intellectual","competitors":4,"description":"Contestants build and activate increasingly elaborate chain-reaction machines to accomplish a designated objective.","archetype":"round","primary":["it","dx"],"secondary":["wi","lk"],"actions":[{"l":"Component placed","p":2,"h":null},{"l":"mechanism activated","p":5,"h":null},{"l":"chain reaction","p":10,"h":null},{"l":"objective completed","p":15,"h":null}],"weights":{"str":5,"con":5,"dex":25,"wis":20,"int":30,"cha":0,"lck":15}},{"name":"Naked & Afraid","category":"Survival","competitors":4,"description":"Contestants survive in a hostile wilderness with minimal equipment while securing shelter, water, food, and safety.","archetype":"round","primary":["wi","co"],"secondary":["it","lk"],"actions":[{"l":"Shelter","p":5,"h":null},{"l":"food","p":3,"h":null},{"l":"water","p":5,"h":null},{"l":"successful hunt","p":8,"h":null},{"l":"survival milestone","p":10,"h":null}],"weights":{"str":15,"con":25,"dex":15,"wis":25,"int":10,"cha":0,"lck":10}},{"name":"Operation","category":"Dexterity","competitors":4,"description":"Contestants perform delicate precision tasks under time pressure while avoiding mistakes that trigger penalties.","archetype":"duel","primary":["dx","wi"],"secondary":["it","lk"],"actions":[{"l":"Successful extraction","p":5,"h":null},{"l":"precision streak","p":3,"h":null},{"l":"difficult extraction","p":8,"h":null},{"l":"perfect round","p":10,"h":null}],"weights":{"str":0,"con":5,"dex":40,"wis":20,"int":10,"cha":0,"lck":25}},{"name":"Race to the Moon","category":"Racing","competitors":5,"description":"Managers select contestants to participate in a multi-stage race representing the construction, launch, and journey to the moon.","archetype":"race","primary":["it","at"],"secondary":["wi","lk"],"actions":[{"l":"Stage completed","p":5,"h":null},{"l":"milestone","p":5,"h":null},{"l":"first to moon","p":25,"h":null},{"l":"setback","p":-3,"h":null}],"weights":{"str":15,"con":20,"dex":25,"wis":10,"int":10,"cha":0,"lck":20}},{"name":"Relay Race","category":"Sport","competitors":4,"description":"Teams compete in a four-leg race requiring speed, stamina, handoff precision, and teamwork.","archetype":"race","primary":["dx","co"],"secondary":["st","lk"],"actions":[{"l":"Distance","p":1,"h":null},{"l":"clean handoff","p":3,"h":null},{"l":"position gained","p":3,"h":null},{"l":"fastest leg","p":5,"h":null},{"l":"team win","p":15,"h":null}],"weights":{"str":10,"con":15,"dex":40,"wis":10,"int":5,"cha":0,"lck":20}},{"name":"Shark Tank","category":"Social","competitors":4,"description":"Contestants pitch businesses or money-making schemes to a panel of investors who evaluate their ideas and negotiate deals.","archetype":"sharktank_custom","primary":["ch","it"],"secondary":["wi","lk"],"actions":[{"l":"Pitch category","p":1,"h":10},{"l":"investor interest","p":5,"h":null},{"l":"deal secured","p":10,"h":null},{"l":"best valuation","p":10,"h":null}],"weights":{"str":0,"con":0,"dex":0,"wis":20,"int":30,"cha":40,"lck":10}},{"name":"Talent Show Takedown","category":"Performance","competitors":4,"description":"Teams submit performers for a variety competition where singing, magic, comedy, stunts, and unusual talents are judged.","archetype":"round","primary":["ch","dx"],"secondary":["it","lk"],"actions":[{"l":"Performance score","p":1,"h":10},{"l":"audience reaction","p":5,"h":null},{"l":"originality","p":5,"h":null},{"l":"win","p":20,"h":null}],"weights":{"str":0,"con":5,"dex":10,"wis":10,"int":10,"cha":50,"lck":15}},{"name":"The Amazing Race","category":"Adventure","competitors":4,"description":"Teams travel between in-universe locations completing navigation, physical, puzzle, and cultural challenges.","archetype":"round","primary":["dx","it"],"secondary":["wi","lk"],"actions":[{"l":"Checkpoint","p":5,"h":null},{"l":"clue solved","p":3,"h":null},{"l":"detour completed","p":5,"h":null},{"l":"leg win","p":15,"h":null},{"l":"overall win","p":25,"h":null}],"weights":{"str":10,"con":15,"dex":20,"wis":20,"int":15,"cha":5,"lck":15}},{"name":"Train Heist","category":"Adventure","competitors":7,"description":"Teams infiltrate a moving train, overcome security, steal cargo, and escape before reaching its destination.","archetype":"round","primary":["dx","it"],"secondary":["ch","lk"],"actions":[{"l":"Security bypass","p":5,"h":null},{"l":"cargo","p":5,"h":null},{"l":"guard defeated","p":4,"h":null},{"l":"alarm avoided","p":5,"h":null},{"l":"escape","p":20,"h":null}],"weights":{"str":10,"con":10,"dex":20,"wis":20,"int":20,"cha":5,"lck":15}},{"name":"Wizard's Duel","category":"Combat","competitors":4,"description":"Ranked magical combat tournament where contestants use offensive spells, defensive magic, counters, and magical strategy.","archetype":"duel","primary":["it","wi"],"secondary":["at","lk"],"actions":[{"l":"Spell hit","p":2,"h":null},{"l":"counterspell","p":4,"h":null},{"l":"shield","p":2,"h":null},{"l":"critical spell","p":5,"h":null},{"l":"knockout","p":15,"h":null},{"l":"match win","p":10,"h":null}],"weights":{"str":5,"con":5,"dex":15,"wis":20,"int":30,"cha":5,"lck":20}},{"name":"Basketball","category":"Sport","competitors":5,"description":"Managers select a starting five whose players accumulate points, rebounds, assists, steals, blocks, and other basketball statistics.","archetype":"basketball_custom","primary":["at","dx"],"secondary":["wi","it"],"actions":[{"l":"Point","p":1,"h":null},{"l":"rebound","p":2,"h":null},{"l":"assist","p":3,"h":null},{"l":"steal","p":4,"h":null},{"l":"block","p":4,"h":null},{"l":"3PT +2 bonus","p":2,"h":null},{"l":"turnover","p":-2,"h":null}],"weights":{"str":15,"con":15,"dex":30,"wis":10,"int":10,"cha":5,"lck":15}},{"name":"Battle of the Bands","category":"Performance","competitors":7,"description":"Teams assemble musical lineups and compete through judged performances based on musical skill, stage presence, and audience reaction.","archetype":"bandbattle_custom","primary":["ch","dx"],"secondary":["it","wi"],"actions":[{"l":"Performance category","p":1,"h":10},{"l":"successful solo","p":5,"h":null},{"l":"crowd reaction","p":5,"h":null},{"l":"perfect performance","p":10,"h":null}],"weights":{"str":0,"con":5,"dex":10,"wis":10,"int":10,"cha":45,"lck":20}},{"name":"Dance Off","category":"Performance","competitors":5,"description":"Contestants perform choreographed dances judged on technical ability, creativity, timing, and stage presence.","archetype":"round","primary":["dx","ch"],"secondary":["co","lk"],"actions":[{"l":"Technique","p":1,"h":10},{"l":"creativity","p":1,"h":10},{"l":"performance","p":1,"h":10},{"l":"perfect routine","p":15,"h":null}],"weights":{"str":5,"con":10,"dex":35,"wis":10,"int":5,"cha":25,"lck":10}},{"name":"Demolition Derby","category":"Combat","competitors":5,"description":"Drivers attempt to damage or disable opposing vehicles while keeping their own vehicle operational.","archetype":"battlefield","primary":["st","co"],"secondary":["dx","lk"],"actions":[{"l":"Damage","p":2,"h":null},{"l":"collision","p":3,"h":null},{"l":"vehicle disabled","p":10,"h":null},{"l":"final survivor","p":20,"h":null}],"weights":{"str":25,"con":25,"dex":10,"wis":5,"int":10,"cha":0,"lck":25}},{"name":"Family Feud","category":"Social","competitors":5,"description":"Teams attempt to identify the most popular survey answers and steal points after opponents strike out.","archetype":"feud_custom","primary":["ch","it"],"secondary":["wi","lk"],"actions":[{"l":"Correct answer","p":3,"h":null},{"l":"top answer","p":5,"h":null},{"l":"steal","p":8,"h":null},{"l":"winning round","p":10,"h":null}],"weights":{"str":0,"con":0,"dex":0,"wis":15,"int":20,"cha":45,"lck":20}},{"name":"Fear Factor","category":"Survival","competitors":5,"description":"Contestants face escalating challenges involving fear, endurance, discomfort, and psychological pressure.","archetype":"round","primary":["co","wi"],"secondary":["st","lk"],"actions":[{"l":"Challenge completed","p":10,"h":null},{"l":"speed bonus","p":5,"h":null},{"l":"perfect challenge","p":10,"h":null},{"l":"quitting","p":-10,"h":null}],"weights":{"str":15,"con":30,"dex":10,"wis":20,"int":5,"cha":0,"lck":20}},{"name":"Global Guts","category":"Sport","competitors":5,"description":"Managers select competitors for multiple athletic events culminating in a race through the Aggro Crag.","archetype":"guts_custom","primary":["dx","st"],"secondary":["co","lk"],"actions":[{"l":"Event placement points","p":2,"h":null},{"l":"obstacle cleared","p":2,"h":null},{"l":"final checkpoint","p":5,"h":null},{"l":"Aggro Crag completion","p":15,"h":null}],"weights":{"str":15,"con":20,"dex":30,"wis":10,"int":5,"cha":0,"lck":20}},{"name":"Haunted House Gauntlet","category":"Survival","competitors":5,"description":"Contestants spend the night navigating a haunted environment while completing objectives and resisting fear.","archetype":"round","primary":["wi","co"],"secondary":["dx","lk"],"actions":[{"l":"Objective","p":5,"h":null},{"l":"scare resisted","p":3,"h":null},{"l":"room cleared","p":5,"h":null},{"l":"artifact recovered","p":10,"h":null},{"l":"escape","p":15,"h":null}],"weights":{"str":10,"con":15,"dex":15,"wis":25,"int":5,"cha":5,"lck":25}},{"name":"Heist Night","category":"Adventure","competitors":7,"description":"Crews plan and execute a fictional vault robbery, dividing roles between infiltration, security, technology, deception, and escape.","archetype":"round","primary":["dx","it"],"secondary":["ch","lk"],"actions":[{"l":"Security bypass","p":5,"h":null},{"l":"loot acquired","p":5,"h":null},{"l":"alarm avoided","p":5,"h":null},{"l":"major objective","p":10,"h":null},{"l":"successful escape","p":20,"h":null}],"weights":{"str":5,"con":5,"dex":15,"wis":20,"int":25,"cha":15,"lck":15}},{"name":"Ninja Warrior","category":"Racing","competitors":6,"description":"Contestants run an individual obstacle course against the clock, with each obstacle testing speed, balance, strength, and agility.","archetype":"ninjawarrior_custom","primary":["dx","st"],"secondary":["co","lk"],"actions":[{"l":"Obstacle","p":3,"h":null},{"l":"checkpoint","p":5,"h":null},{"l":"difficult obstacle","p":5,"h":null},{"l":"course completion","p":20,"h":null},{"l":"fastest time","p":10,"h":null}],"weights":{"str":15,"con":20,"dex":35,"wis":10,"int":5,"cha":0,"lck":15}},{"name":"Roast Battle","category":"Performance","competitors":6,"description":"Contestants face off in insult-comedy rounds judged on creativity, timing, originality, and audience reaction.","archetype":"roastbattle_custom","primary":["ch","it"],"secondary":["wi","lk"],"actions":[{"l":"Successful roast","p":3,"h":null},{"l":"knockout line","p":8,"h":null},{"l":"crowd reaction","p":3,"h":null},{"l":"round win","p":5,"h":null}],"weights":{"str":0,"con":0,"dex":5,"wis":15,"int":20,"cha":45,"lck":15}},{"name":"Saw","category":"Survival","competitors":5,"description":"Contestants navigate fictional deadly traps and moral puzzles where survival depends on intelligence, courage, speed, and difficult choices.","archetype":"round","primary":["it","co"],"secondary":["dx","lk"],"actions":[{"l":"Puzzle solved","p":5,"h":null},{"l":"trap escaped","p":8,"h":null},{"l":"survivor rescued","p":5,"h":null},{"l":"major challenge","p":10,"h":null},{"l":"escape","p":25,"h":null}],"weights":{"str":10,"con":20,"dex":10,"wis":25,"int":20,"cha":0,"lck":15}},{"name":"American Gladiators","category":"Combat","competitors":7,"description":"Contestants face a gauntlet of strength, agility, balance, and combat challenges against arena gladiators.","archetype":"race","primary":["st","dx"],"secondary":["co","lk"],"actions":[{"l":"Obstacle cleared","p":3,"h":null},{"l":"Event won","p":1,"h":null},{"l":"gladiator defeated","p":8,"h":null},{"l":"finish","p":15,"h":null},{"l":"fastest time","p":10,"h":null}],"weights":{"str":25,"con":20,"dex":25,"wis":5,"int":5,"cha":0,"lck":20}},{"name":"Archery Tournament","category":"Sport","competitors":6,"description":"Contestants fire a fixed number of arrows at targets of increasing distance and difficulty, with accuracy determining their score.","archetype":"duel","primary":["dx","wi"],"secondary":["it","lk"],"actions":[{"l":"Target hit","p":2,"h":null},{"l":"outer ring","p":3,"h":null},{"l":"inner ring","p":5,"h":null},{"l":"bullseye","p":10,"h":null},{"l":"perfect round","p":15,"h":null}],"weights":{"str":10,"con":10,"dex":35,"wis":15,"int":10,"cha":0,"lck":20}},{"name":"Beach Volleyball","category":"Sport","competitors":5,"description":"Teams compete in beach volleyball using serves, digs, spikes, blocks, saves, and strategic positioning.","archetype":"boxscore","primary":["dx","co"],"secondary":["at","lk"],"actions":[{"l":"Ace","p":4,"h":null},{"l":"kill","p":4,"h":null},{"l":"dig","p":2,"h":null},{"l":"block","p":4,"h":null},{"l":"save","p":3,"h":null},{"l":"assist","p":2,"h":null},{"l":"winning point","p":3,"h":null}],"weights":{"str":15,"con":15,"dex":30,"wis":10,"int":10,"cha":5,"lck":15}},{"name":"Beer Pong","category":"Sport","competitors":6,"description":"Teams compete in precision throwing matches, attempting to eliminate opposing cups while defending their own.","archetype":"duel","primary":["dx","lk"],"secondary":["ch","it"],"actions":[{"l":"Cup hit","p":3,"h":null},{"l":"consecutive hit","p":2,"h":null},{"l":"sink final cup","p":10,"h":null},{"l":"trick shot","p":5,"h":null}],"weights":{"str":5,"con":5,"dex":35,"wis":15,"int":10,"cha":5,"lck":25}},{"name":"Boxing/MMA Rumble","category":"Combat","competitors":6,"description":"A 1v1 elimination tournament where managers submit fighters for each round and losers are eliminated.","archetype":"boxing_custom","primary":["at","dx"],"secondary":["co","lk"],"actions":[{"l":"Significant strike","p":1,"h":null},{"l":"takedown","p":3,"h":null},{"l":"combo","p":3,"h":null},{"l":"knockdown","p":8,"h":null},{"l":"submission","p":10,"h":null},{"l":"KO","p":15,"h":null},{"l":"win","p":10,"h":null}],"weights":{"str":25,"con":25,"dex":20,"wis":10,"int":5,"cha":0,"lck":15}},{"name":"Carnival Games","category":"Sport","competitors":6,"description":"Contestants compete across several carnival-style skill games testing aim, timing, strength, and coordination.","archetype":"round","primary":["dx","lk"],"secondary":["it","ch"],"actions":[{"l":"Each game has its own scoring","p":2,"h":null},{"l":"top score","p":10,"h":null},{"l":"perfect game","p":15,"h":null},{"l":"overall win","p":20,"h":null}],"weights":{"str":10,"con":5,"dex":25,"wis":10,"int":10,"cha":0,"lck":40}},{"name":"Corn Hole","category":"Sport","competitors":6,"description":"Contestants throw bean bags at raised boards, scoring for bags on the board and bags through the hole.","archetype":"duel","primary":["dx","lk"],"secondary":["st","it"],"actions":[{"l":"Board","p":1,"h":null},{"l":"hole","p":3,"h":null},{"l":"consecutive hole shots","p":2,"h":null},{"l":"round win","p":5,"h":null}],"weights":{"str":5,"con":5,"dex":35,"wis":15,"int":10,"cha":0,"lck":30}},{"name":"Dodgeball Blitz","category":"Sport","competitors":6,"description":"Teams compete in rapid elimination dodgeball matches where players throw, dodge, catch, and revive teammates.","archetype":"dodgeball_custom","primary":["dx","at"],"secondary":["co","lk"],"actions":[{"l":"Hit","p":3,"h":null},{"l":"catch","p":5,"h":null},{"l":"dodge streak","p":3,"h":null},{"l":"elimination","p":5,"h":null},{"l":"final player","p":10,"h":null}],"weights":{"str":15,"con":10,"dex":35,"wis":10,"int":5,"cha":0,"lck":25}},{"name":"Log Rolling Tournament","category":"Sport","competitors":6,"description":"Contestants balance on a rotating log and attempt to force opponents into the water while maintaining their own footing.","archetype":"duel","primary":["dx","co"],"secondary":["st","lk"],"actions":[{"l":"Opponent knock-off","p":10,"h":null},{"l":"balance streak","p":3,"h":null},{"l":"dodge","p":2,"h":null},{"l":"tournament win","p":20,"h":null}],"weights":{"str":25,"con":25,"dex":25,"wis":10,"int":0,"cha":0,"lck":15}},{"name":"Olympic Figure Skating","category":"Sport","competitors":6,"description":"Skaters perform a choreographed routine judged on technical difficulty, execution, artistry, and overall presentation.","archetype":"round","primary":["dx","ch"],"secondary":["co","lk"],"actions":[{"l":"Jump landed","p":3,"h":null},{"l":"spin","p":2,"h":null},{"l":"combination","p":5,"h":null},{"l":"artistry","p":1,"h":10},{"l":"clean routine","p":10,"h":null}],"weights":{"str":5,"con":10,"dex":35,"wis":15,"int":10,"cha":15,"lck":10}},{"name":"Paintball Tournament","category":"Combat","competitors":6,"description":"Teams battle through tactical arenas using cover, movement, accuracy, communication, and objective control.","archetype":"battlefield","primary":["dx","at"],"secondary":["wi","lk"],"actions":[{"l":"Hit","p":3,"h":null},{"l":"elimination","p":5,"h":null},{"l":"objective","p":5,"h":null},{"l":"flag capture","p":10,"h":null},{"l":"survival","p":3,"h":null}],"weights":{"str":10,"con":10,"dex":25,"wis":20,"int":15,"cha":0,"lck":20}},{"name":"Space Battle","category":"Combat","competitors":6,"description":"Starships engage in zero-gravity dogfights requiring piloting, targeting, weapons management, and tactical decision-making.","archetype":"battlefield","primary":["at","rn"],"secondary":["dx","lk"],"actions":[{"l":"Enemy hit","p":2,"h":null},{"l":"ship disabled","p":8,"h":null},{"l":"assist","p":4,"h":null},{"l":"missile evasion","p":3,"h":null},{"l":"ship destroyed","p":15,"h":null}],"weights":{"str":10,"con":10,"dex":25,"wis":20,"int":20,"cha":0,"lck":15}},{"name":"Spelling Bee","category":"Intellectual","competitors":7,"description":"Contestants face progressively harder spelling and vocabulary challenges until only the strongest spellers remain.","archetype":"round","primary":["it","wi"],"secondary":["ch","lk"],"actions":[{"l":"Correct word","p":3,"h":null},{"l":"difficult word","p":5,"h":null},{"l":"streak","p":3,"h":null},{"l":"championship word","p":10,"h":null}],"weights":{"str":0,"con":0,"dex":5,"wis":25,"int":40,"cha":0,"lck":30}},{"name":"Sumo Tournament","category":"Strength","competitors":6,"description":"Contestants attempt to force opponents outside the ring or cause them to touch the ground with anything other than their feet.","archetype":"duel","primary":["st","co"],"secondary":["dx","lk"],"actions":[{"l":"Ring-out","p":10,"h":null},{"l":"throw","p":8,"h":null},{"l":"successful counter","p":5,"h":null},{"l":"tournament win","p":20,"h":null}],"weights":{"str":40,"con":30,"dex":15,"wis":5,"int":0,"cha":0,"lck":10}},{"name":"The Floor Is Lava","category":"Racing","competitors":6,"description":"Contestants navigate an obstacle environment without touching the ground while collecting checkpoints and reaching the finish.","archetype":"race","primary":["dx","lk"],"secondary":["co","st"],"actions":[{"l":"Platform","p":2,"h":null},{"l":"checkpoint","p":5,"h":null},{"l":"difficult crossing","p":5,"h":null},{"l":"finish","p":15,"h":null},{"l":"fall","p":-5,"h":null}],"weights":{"str":10,"con":15,"dex":35,"wis":15,"int":5,"cha":0,"lck":20}},{"name":"Towering Inferno","category":"Adventure","competitors":7,"description":"Teams enter a burning high-rise to rescue trapped civilians, retrieve objectives, and escape before the building becomes impassable.","archetype":"inferno_custom","primary":["co","wi"],"secondary":["dx","rg"],"actions":[{"l":"Civilian rescued","p":5,"h":null},{"l":"floor cleared","p":3,"h":null},{"l":"objective","p":5,"h":null},{"l":"teammate rescued","p":5,"h":null},{"l":"successful escape","p":20,"h":null}],"weights":{"str":15,"con":20,"dex":15,"wis":20,"int":15,"cha":5,"lck":10}},{"name":"Treasure Hunt","category":"Adventure","competitors":5,"description":"Contestants search a large environment for hidden clues, solve riddles, locate objects, and ultimately recover the treasure.","archetype":"round","primary":["it","wi"],"secondary":["dx","lk"],"actions":[{"l":"Clue","p":3,"h":null},{"l":"puzzle","p":5,"h":null},{"l":"item","p":3,"h":null},{"l":"major clue","p":8,"h":null},{"l":"treasure","p":20,"h":null}],"weights":{"str":5,"con":5,"dex":15,"wis":25,"int":25,"cha":5,"lck":20}},{"name":"Trivia Titans","category":"Intellectual","competitors":6,"description":"Teams compete through multiple rounds of general knowledge, specialized knowledge, and FFFS lore questions.","archetype":"trivia_custom","primary":["it","wi"],"secondary":["ch","lk"],"actions":[{"l":"Correct answer","p":3,"h":null},{"l":"difficult answer","p":5,"h":null},{"l":"streak","p":3,"h":null},{"l":"bonus round","p":10,"h":null}],"weights":{"str":0,"con":0,"dex":5,"wis":25,"int":45,"cha":5,"lck":20}},{"name":"Underwater Search & Rescue","category":"Adventure","competitors":7,"description":"Teams dive into a submerged environment to locate survivors, recover equipment, and safely return to the surface.","archetype":"round","primary":["dx","co"],"secondary":["rg","lk"],"actions":[{"l":"Item recovered","p":3,"h":null},{"l":"survivor","p":8,"h":null},{"l":"difficult rescue","p":10,"h":null},{"l":"successful return","p":10,"h":null}],"weights":{"str":15,"con":25,"dex":20,"wis":20,"int":10,"cha":0,"lck":10}},{"name":"Wipeout","category":"Racing","competitors":6,"description":"Contestants navigate oversized obstacles requiring balance, timing, agility, and endurance while racing against the clock.","archetype":"race","primary":["dx","co"],"secondary":["st","lk"],"actions":[{"l":"Obstacle","p":3,"h":null},{"l":"checkpoint","p":5,"h":null},{"l":"difficult obstacle","p":5,"h":null},{"l":"finish","p":15,"h":null},{"l":"fastest time","p":10,"h":null}],"weights":{"str":10,"con":20,"dex":35,"wis":10,"int":5,"cha":0,"lck":20}},{"name":"Arm Wrestling Tournament","category":"Strength","competitors":7,"description":"Single-elimination strength tournament where contestants battle one-on-one until one competitor remains.","archetype":"duel","primary":["st","co"],"secondary":["lk","dx"],"actions":[{"l":"Match win","p":10,"h":null},{"l":"opponent pinned","p":5,"h":null},{"l":"tournament win","p":20,"h":null},{"l":"upset victory","p":5,"h":null}],"weights":{"str":55,"con":25,"dex":10,"wis":0,"int":0,"cha":0,"lck":10}},{"name":"Hollywood Squares","category":"Social","competitors":11,"description":"Contestants use celebrity-style panels to answer questions and claim squares on a giant tic-tac-toe board.","archetype":"hollywoodsquares_custom","primary":["it","ch"],"secondary":["wi","lk"],"actions":[{"l":"Correct answer","p":3,"h":null},{"l":"square claimed","p":2,"h":null},{"l":"three-in-row","p":10,"h":null},{"l":"winning round","p":10,"h":null}],"weights":{"str":0,"con":0,"dex":0,"wis":20,"int":25,"cha":35,"lck":20}},{"name":"Kaiju Defense","category":"Combat","competitors":5,"description":"A giant monster attacks a city while contestants defend infrastructure, rescue civilians, and attempt to repel the creature.","archetype":"round","primary":["at","wi"],"secondary":["rn","co"],"actions":[{"l":"Damage to Kaiju","p":2,"h":null},{"l":"civilian rescued","p":5,"h":null},{"l":"structure defended","p":5,"h":null},{"l":"evacuation","p":5,"h":null},{"l":"Kaiju defeated","p":25,"h":null}],"weights":{"str":25,"con":25,"dex":10,"wis":15,"int":10,"cha":5,"lck":10}},{"name":"Laser Tag","category":"Combat","competitors":7,"description":"Teams battle in a futuristic arena using cover, positioning, accuracy, and battlefield objectives.","archetype":"battlefield","primary":["dx","at"],"secondary":["rn","lk"],"actions":[{"l":"Hit","p":2,"h":null},{"l":"elimination","p":5,"h":null},{"l":"objective","p":5,"h":null},{"l":"streak","p":5,"h":null},{"l":"winning team","p":10,"h":null}],"weights":{"str":10,"con":10,"dex":25,"wis":20,"int":15,"cha":0,"lck":20}},{"name":"The Great Migration","category":"Racing","competitors":5,"description":"Contestants undertake a massive endurance journey across varied terrain while managing stamina, resources, and environmental hazards.","archetype":"race","primary":["co","rg"],"secondary":["wi","lk"],"actions":[{"l":"Distance","p":1,"h":null},{"l":"checkpoint","p":5,"h":null},{"l":"hazard survived","p":3,"h":null},{"l":"final destination","p":20,"h":null}],"weights":{"str":15,"con":30,"dex":20,"wis":15,"int":5,"cha":0,"lck":15}},{"name":"Baseball","category":"Sport","competitors":11,"description":"Managers select a starting lineup and accumulate traditional offensive and defensive statistics during a simulated baseball game.","archetype":"boxscore","primary":["at","dx"],"secondary":["st","lk"],"actions":[{"l":"Single","p":3,"h":null},{"l":"double","p":5,"h":null},{"l":"triple","p":8,"h":null},{"l":"HR","p":12,"h":null},{"l":"RBI","p":4,"h":null},{"l":"run","p":4,"h":null},{"l":"walk","p":2,"h":null},{"l":"stolen base","p":4,"h":null},{"l":"strikeout","p":-2,"h":null},{"l":"error","p":-3,"h":null},{"l":"pitched strikeout","p":1,"h":null},{"l":"team win","p":1,"h":null}],"weights":{"str":10,"con":10,"dex":25,"wis":10,"int":15,"cha":5,"lck":25}},{"name":"Fencing Tournament","category":"Combat","competitors":7,"description":"Contestants compete in precision one-on-one fencing matches using speed, timing, positioning, and technique.","archetype":"duel","primary":["dx","wi"],"secondary":["at","lk"],"actions":[{"l":"Touch","p":3,"h":null},{"l":"counterattack","p":4,"h":null},{"l":"clean round","p":5,"h":null},{"l":"match win","p":10,"h":null}],"weights":{"str":10,"con":10,"dex":40,"wis":20,"int":5,"cha":0,"lck":15}},{"name":"Hide & Seek","category":"Social","competitors":11,"description":"One contestant searches while the others use an obstacle-filled environment to remain hidden until time expires.","archetype":"round","primary":["wi","dx"],"secondary":["it","lk"],"actions":[{"l":"Player found","p":5,"h":null},{"l":"final hider","p":15,"h":null},{"l":"hiding checkpoint","p":3,"h":null},{"l":"successful escape","p":5,"h":null}],"weights":{"str":5,"con":5,"dex":25,"wis":25,"int":10,"cha":5,"lck":25}},{"name":"Royal Rumble","category":"Combat","competitors":11,"description":"Contestants enter a battle arena at intervals and attempt to eliminate opponents by throwing them out of the designated area.","archetype":"battlefield","primary":["st","at"],"secondary":["co","lk"],"actions":[{"l":"Elimination","p":8,"h":null},{"l":"survival +2 per minute","p":2,"h":null},{"l":"final 5","p":5,"h":null},{"l":"final 3","p":10,"h":null},{"l":"victory","p":25,"h":null}],"weights":{"str":20,"con":20,"dex":20,"wis":10,"int":5,"cha":0,"lck":25}},{"name":"Street Fighter Tournament","category":"Combat","competitors":11,"description":"Fighters compete in 1v1 matches using martial arts, combos, special techniques, counters, and tactical positioning.","archetype":"duel","primary":["dx","at"],"secondary":["co","lk"],"actions":[{"l":"Strike","p":1,"h":null},{"l":"combo","p":3,"h":null},{"l":"counter","p":3,"h":null},{"l":"special move","p":4,"h":null},{"l":"knockdown","p":6,"h":null},{"l":"KO","p":15,"h":null}],"weights":{"str":20,"con":20,"dex":25,"wis":15,"int":5,"cha":0,"lck":15}},{"name":"Track & Field Events","category":"Sport","competitors":11,"description":"Each team competes across 11 athletic disciplines testing speed, strength, jumping, throwing, and endurance against another team, one-vs-one, head-to-head. Each teammate competes at least once and in no more than one event: 100-meter dash, long jump, shot put, high jump, 400-meter run, 110-meter hurdles, discus throw, pole vault, javelin throw, 1500-meter run, and the 3000-meter steeplechase. Each event is scored individually: +2 event points, +8 event win, +10 overall team win.","archetype":"trackfield_custom","primary":["st","dx"],"secondary":["co","lk"],"actions":[{"l":"Event points","p":2,"h":null},{"l":"Event win","p":8,"h":null},{"l":"Overall team win","p":10,"h":null}],"weights":{"str":15,"con":20,"dex":30,"wis":10,"int":5,"cha":0,"lck":20}},{"name":"Weakest Link","category":"Intellectual","competitors":7,"description":"Contestants answer questions individually while building a shared prize pool and voting to eliminate the weakest performer.","archetype":"round","primary":["it","ch"],"secondary":["wi","lk"],"actions":[{"l":"Correct answer","p":3,"h":null},{"l":"streak","p":3,"h":null},{"l":"banked money","p":5,"h":null},{"l":"successful elimination vote","p":3,"h":null},{"l":"final win","p":20,"h":null}],"weights":{"str":0,"con":0,"dex":0,"wis":25,"int":30,"cha":25,"lck":20}},{"name":"Battle Royale","category":"Combat","competitors":11,"description":"All contestants enter a shrinking combat arena where they fight, evade, loot, and survive until only one remains.","archetype":"battleroyale_custom","primary":["at","dx"],"secondary":["co","lk"],"actions":[{"l":"Damage","p":1,"h":null},{"l":"elimination","p":10,"h":null},{"l":"loot","p":2,"h":null},{"l":"final 5","p":10,"h":null},{"l":"final 3","p":15,"h":null},{"l":"victory","p":25,"h":null}],"weights":{"str":20,"con":20,"dex":20,"wis":10,"int":10,"cha":0,"lck":20}},{"name":"Capture the Flag","category":"Survival","competitors":11,"description":"Two teams of 11 each guard 3 flags. Steal and carry home all 3 enemy flags to win a match; best of 3 matches. Eliminated players respawn each round, captains pick offense and defense, dropped flags stay on the course, and time of possession is tracked for every carrier. Time-stop and universe-destroying powers are banned.","archetype":"captureflag_custom","primary":["dx","wi"],"secondary":["st","lk"],"actions":[{"l":"Enemy elimination","p":3,"h":null},{"l":"Flag steal","p":10,"h":null},{"l":"Flag return","p":15,"h":null},{"l":"Winning capture","p":10,"h":null},{"l":"Time of possession (per second)","p":0.01,"h":null}],"weights":{"str":10,"con":10,"dex":25,"wis":20,"int":15,"cha":5,"lck":15}},{"name":"Cricket","category":"Sport","competitors":11,"description":"Teams compete through batting, bowling, and fielding, accumulating runs while attempting to dismiss opposing batsmen.","archetype":"boxscore","primary":["dx","st"],"secondary":["at","lk"],"actions":[{"l":"Run","p":1,"h":null},{"l":"boundary","p":4,"h":null},{"l":"six","p":6,"h":null},{"l":"wicket","p":8,"h":null},{"l":"catch","p":5,"h":null},{"l":"run-out","p":6,"h":null}],"weights":{"str":10,"con":15,"dex":20,"wis":15,"int":15,"cha":5,"lck":20}},{"name":"Football","category":"Sport","competitors":11,"description":"Both sides of the ball: 11 players per team play offense and defense. Passing, rushing, receiving, kicking, tackles, sacks, turnovers and special teams all score fantasy points.","archetype":"football_custom","primary":["it","at"],"secondary":["dx","st"],"actions":[{"l":"Reception","p":1,"h":null},{"l":"Passing yard","p":0.04,"h":null},{"l":"Passing TD","p":4,"h":null},{"l":"Interception thrown","p":-2,"h":null},{"l":"Rushing / receiving yard","p":0.1,"h":null},{"l":"Rushing / receiving TD","p":6,"h":null},{"l":"2-point conversion","p":2,"h":null},{"l":"Fumble lost","p":-2,"h":null},{"l":"Sack","p":1,"h":null},{"l":"Interception caught","p":2,"h":null},{"l":"Fumble recovery","p":2,"h":null},{"l":"Defensive safety","p":2,"h":null},{"l":"Blocked kick","p":2,"h":null},{"l":"Defensive / special teams TD","p":6,"h":null},{"l":"Solo tackle","p":1.5,"h":null},{"l":"Assisted tackle","p":0.75,"h":null},{"l":"Tackle for loss","p":2.5,"h":null}],"weights":{"str":20,"con":20,"dex":20,"wis":15,"int":10,"cha":0,"lck":15}},{"name":"Gladiator Arena","category":"Combat","competitors":11,"description":"Contestants enter an Ancient Roman arena and face five rounds of increasingly difficult armed combatants.","archetype":"battlefield","primary":["at","dx"],"secondary":["co","lk"],"actions":[{"l":"Enemy defeated","p":5,"h":null},{"l":"damage","p":1,"h":null},{"l":"weapon disarm","p":5,"h":null},{"l":"round cleared","p":8,"h":null},{"l":"final victory","p":25,"h":null}],"weights":{"str":25,"con":25,"dex":20,"wis":10,"int":5,"cha":0,"lck":15}},{"name":"Grand Prix Showdown","category":"Racing","competitors":11,"description":"Contestants compete in a high-speed motorcycle race across a dangerous desert course filled with hazards and opponents.","archetype":"race","primary":["dx","at"],"secondary":["it","lk"],"actions":[{"l":"Distance","p":1,"h":null},{"l":"overtake","p":3,"h":null},{"l":"hazard cleared","p":3,"h":null},{"l":"opponent passed","p":3,"h":null},{"l":"finish","p":15,"h":null},{"l":"victory","p":20,"h":null}],"weights":{"str":15,"con":15,"dex":35,"wis":15,"int":5,"cha":0,"lck":15}},{"name":"High Stakes Poker Night","category":"Social","competitors":11,"description":"Contestants compete in a poker tournament where bluffing, betting, probability, and risk management determine success.","archetype":"round","primary":["ch","lk"],"secondary":["wi","it"],"actions":[{"l":"Winning hand","p":5,"h":null},{"l":"major pot","p":10,"h":null},{"l":"successful bluff","p":8,"h":null},{"l":"elimination","p":10,"h":null},{"l":"tournament win","p":25,"h":null}],"weights":{"str":0,"con":0,"dex":0,"wis":25,"int":15,"cha":20,"lck":40}},{"name":"Legends of the Hidden Temple","category":"Adventure","competitors":11,"description":"Teams navigate physical challenges, solve temple puzzles, retrieve artifacts, and survive a final temple run.","archetype":"round","primary":["dx","it"],"secondary":["st","lk"],"actions":[{"l":"Puzzle","p":5,"h":null},{"l":"obstacle","p":3,"h":null},{"l":"artifact","p":10,"h":null},{"l":"temple room","p":5,"h":null},{"l":"final escape","p":20,"h":null}],"weights":{"str":10,"con":15,"dex":20,"wis":20,"int":15,"cha":0,"lck":20}},{"name":"Prison Break","category":"Adventure","competitors":11,"description":"Teams escape a heavily guarded prison by solving puzzles, avoiding guards, finding equipment, and reaching extraction.","archetype":"round","primary":["dx","it"],"secondary":["wi","lk"],"actions":[{"l":"Guard bypass","p":4,"h":null},{"l":"puzzle","p":5,"h":null},{"l":"equipment","p":3,"h":null},{"l":"teammate rescued","p":5,"h":null},{"l":"escape","p":20,"h":null}],"weights":{"str":10,"con":10,"dex":20,"wis":20,"int":20,"cha":5,"lck":15}},{"name":"Siege Defense","category":"Survival","competitors":11,"description":"Contestants defend a fortress through escalating waves of attackers while managing resources, positioning, and defensive systems.","archetype":"round","primary":["at","wi"],"secondary":["rn","co"],"actions":[{"l":"Enemy defeated","p":2,"h":null},{"l":"structure defended","p":5,"h":null},{"l":"wave survived","p":5,"h":null},{"l":"boss defeated","p":10,"h":null}],"weights":{"str":20,"con":20,"dex":10,"wis":20,"int":20,"cha":0,"lck":10}},{"name":"Soccer","category":"Sport","competitors":11,"description":"Managers select an 11-player lineup and accumulate traditional soccer statistics through goals, assists, saves, tackles, and defensive actions.","archetype":"boxscore","primary":["dx","wi"],"secondary":["at","lk"],"actions":[{"l":"Goal","p":8,"h":null},{"l":"assist","p":5,"h":null},{"l":"shot on target","p":2,"h":null},{"l":"tackle","p":2,"h":null},{"l":"interception","p":2,"h":null},{"l":"save","p":4,"h":null},{"l":"clean sheet","p":5,"h":null}],"weights":{"str":10,"con":10,"dex":25,"wis":15,"int":15,"cha":5,"lck":20}},{"name":"Squid Games","category":"Survival","competitors":11,"description":"Contestants progress through a sequence of escalating elimination games where survival, strategy, speed, and luck determine advancement.","archetype":"battlefield","primary":["lk","dx"],"secondary":["wi","co"],"actions":[{"l":"Round survived","p":5,"h":null},{"l":"objective","p":5,"h":null},{"l":"elimination","p":10,"h":null},{"l":"final round","p":15,"h":null},{"l":"overall win","p":30,"h":null}],"weights":{"str":15,"con":20,"dex":20,"wis":15,"int":5,"cha":0,"lck":25}},{"name":"The Apprentice","category":"Social","competitors":11,"description":"Teams compete in business challenges involving sales, marketing, negotiation, leadership, and resource management.","archetype":"round","primary":["ch","it"],"secondary":["wi","lk"],"actions":[{"l":"Sale","p":3,"h":null},{"l":"profit +1 per $","p":2,"h":null},{"l":"successful pitch","p":5,"h":null},{"l":"negotiation","p":5,"h":null},{"l":"challenge win","p":15,"h":null}],"weights":{"str":0,"con":0,"dex":0,"wis":25,"int":25,"cha":40,"lck":10}},{"name":"Tug of War","category":"Strength","competitors":11,"description":"Teams compete in a pure strength contest where opposing sides attempt to pull the other across a designated line.","archetype":"duel","primary":["st","co"],"secondary":["lk","dx"],"actions":[{"l":"Strength clash won","p":5,"h":null},{"l":"opponent pulled","p":5,"h":null},{"l":"team victory","p":15,"h":null}],"weights":{"str":55,"con":25,"dex":5,"wis":0,"int":0,"cha":0,"lck":15}},{"name":"Zombie Outbreak Containment","category":"Survival","competitors":11,"description":"Teams enter an infected zone, rescue survivors, secure objectives, eliminate zombies, and prevent the outbreak from spreading.","archetype":"round","primary":["at","wi"],"secondary":["co","lk"],"actions":[{"l":"Zombie","p":2,"h":null},{"l":"survivor","p":5,"h":null},{"l":"zone secured","p":8,"h":null},{"l":"outbreak contained","p":15,"h":null},{"l":"civilian death","p":-5,"h":null}],"weights":{"str":20,"con":20,"dex":15,"wis":20,"int":10,"cha":0,"lck":15}}];


// ---- rules revision 2: Battle Bots, Chess Boxing, American Gladiators ----
(function () {
  const set = (name, o) => { const e = EVENTS_DB.find((x) => x.name === name); if (!e) throw new Error("missing event " + name); Object.assign(e, o); };
  set("Battle Bots", { archetype: "battlebots_custom", competitors: 4, description: "Contestants control customized combat robots and attempt to damage, disable, immobilize, or destroy opposing machines. Robots are built to resemble, and have the abilities of, the player controlling them. Robots fight within a defined arena until one is immobilized, disabled, or judged the winner. No external interference. Super abilities may temporarily enhance one weapon, movement system, shield, or repair action, but cannot instantly destroy an opponent. Four on four battle royale, one to thirty minutes.",
    actions: [{ l: "Damage", p: 1, h: null }, { l: "Weapon hit", p: 3, h: null }, { l: "Component destroyed", p: 5, h: null }, { l: "Immobilization", p: 10, h: null }, { l: "Knockout of an opponent", p: 15, h: null }, { l: "Judges decision match win", p: 10, h: null }], fixed: { catastrophe: 3 } });
  set("Chess Boxing", { archetype: "chessboxing_custom", competitors: 4, description: "Contestants alternate between chess rounds and boxing rounds, with victory possible through checkmate, knockout, resignation, or a referee decision. Seven rounds alternate chess, boxing, chess, boxing, chess, boxing, chess, one on one, head to head. Super abilities may enhance one chess decision or one boxing exchange, but cannot create an automatic checkmate or knockout.",
    actions: [{ l: "Chess piece captured", p: 1, h: null }, { l: "Check", p: 3, h: null }, { l: "Punch block", p: 0.5, h: null }, { l: "Boxing strike", p: 1, h: null }, { l: "Knockdown", p: 8, h: null }, { l: "Checkmate or KO", p: 20, h: null }] });
  set("American Gladiators", { archetype: "gladiators_custom", competitors: 5, description: "Contestants face a gauntlet of strength, agility, balance, and combat challenges against arena gladiators. The five events are Assault, Joust, Powerball, Pyramid, and finally the Eliminator. Each round has a defined opponent and survival condition. Super abilities may enhance one attack, defense, movement, or weapon interaction per round but cannot automatically defeat the round's opponent. One on one, head to head, and every team member must compete once. The team captain selects which member goes into which event.",
    actions: [{ l: "Obstacle cleared", p: 3, h: null }, { l: "Event won", p: 1, h: null }, { l: "Gladiator defeated", p: 8, h: null }, { l: "Finish", p: 15, h: null }, { l: "Fastest time", p: 10, h: null }] });
})();

// ---- rules revision 3: Corn Hole, Haunted House Gauntlet ----
(function () {
  const set = (name, o) => { const e = EVENTS_DB.find((x) => x.name === name); if (!e) throw new Error("missing event " + name); Object.assign(e, o); };
  set("Corn Hole", { archetype: "cornhole_custom", rank: "B", category: "Sport", competitors: 6, description: "Contestants throw bean bags at raised boards, scoring for bags on the board and bags through the hole. Two on two, in doubles teams. Games go first to 21, win by 2, and every match is best of three games. A cornhole is a bag that goes through the hole and is worth 3 points. A woody is a bag that lands and stays on top of the board, or hangs in the hole or off the edge without touching the ground, and is worth 1 point. A bag that misses the board or touches the ground is worth 0. Contestants throw a fixed number of bags from behind the foul line. Super abilities may improve one throw or provide one controlled reroll, but cannot automatically score a hole in one.",
    actions: [{ l: "Woody", p: 1, h: null }, { l: "Cornhole", p: 3, h: null }, { l: "Game win", p: 5, h: null }, { l: "Match win", p: 5, h: null }] });
  set("Haunted House Gauntlet", { archetype: "hauntedhouse_custom", rank: "D", category: "Survival", competitors: 5, description: "Contestants spend the night navigating a haunted environment while completing objectives and resisting fear. The objectives are to turn on the power source, solve the murder mystery, clear the area of supernatural disturbances, recover the artifacts, locate the safe house, and stay the whole night. A contestant touched by a ghost is paralyzed by fear and counts as frightened, and a frightened contestant must return to the safe house for five minutes before returning to the event. Whichever team has the most survivors wins, and the tiebreak goes to the team with the most artifacts. Super abilities may reduce one fear effect, reveal one nearby objective, or provide one temporary defensive advantage, but cannot skip the entire course. Individual timed challenge, sixty minutes.",
    actions: [{ l: "Clue found", p: 1, h: null }, { l: "Objective complete", p: 5, h: null }, { l: "Scare resisted", p: 3, h: null }, { l: "Room cleared", p: 5, h: null }, { l: "Stay whole night", p: 15, h: null }, { l: "Frightened", p: -2, h: null }], fixed: { catastrophe: 3 } });
})();

// ---- rules revision 4: Alliance Island becomes a sixty day tribe-and-jury game ----
(function () {
  const set = (name, o) => { const e = EVENTS_DB.find((x) => x.name === name); if (!e) throw new Error("missing event " + name); Object.assign(e, o); };
  set("Alliance Island", { archetype: "allianceisland_custom", competitors: 7, category: "Social", primary: ["ch", "wi"], secondary: ["it", "co"],
    description: "Sixty days on an island. A host brings two tribes together to compete in challenges for supplies, and the losing tribe must vote one of its own members out at tribal council. Castaways form alliances, hunt for hidden immunity idols, and aim to outlast the rest. When nine castaways remain the tribes merge, and every challenge becomes an individual fight for immunity, which makes the winner safe from the vote that night. This continues until two castaways are left. The final two plead their case to a jury made up of the last seven castaways voted out, and the jury crowns the Sole Survivor.",
    actions: [{ l: "Challenge contribution", p: 2, h: null }, { l: "Tribe wins supplies", p: 3, h: null }, { l: "Alliance formed", p: 2, h: null }, { l: "Idol found", p: 4, h: null }, { l: "Survive tribal council", p: 3, h: null }, { l: "Orchestrate a vote", p: 4, h: null }, { l: "Make the merge", p: 5, h: null }, { l: "Individual immunity", p: 10, h: null }, { l: "Jury seat", p: 3, h: null }, { l: "Final two", p: 8, h: null }, { l: "Jury vote", p: 3, h: null }, { l: "Sole Survivor", p: 15, h: null }],
    weights: { str: 8, con: 12, dex: 8, wis: 20, int: 15, cha: 30, lck: 7 } });
})();
// ---- rules revision: Naked & Afraid, Arm Wrestling Tournament, Track & Field Events, Prison Break ----
(function () {
  const set = (name, o) => { const e = EVENTS_DB.find((x) => x.name === name); if (!e) throw new Error("missing event " + name); Object.assign(e, o); };
  set("Naked & Afraid", { archetype: "nakedafraid_custom", description: "Contestants survive in a hostile wilderness with minimal equipment while securing shelter, water, food, and safety. An 11 day, 10 night event with a task to complete each day. If a team fails the daily task, that team must eliminate one player from its own team.", weights: { str: 15, con: 25, dex: 15, wis: 25, int: 10, cha: 0, lck: 10 }, fixed: { participation: 2.5, catastrophe: 5 },
    actions: [{ l: "Build/Maintain Shelter/Tools", p: 5, h: null }, { l: "Gather/Cook Food", p: 3, h: null }, { l: "Find Drinking Water", p: 5, h: null }, { l: "Successful hunt", p: 8, h: null }, { l: "Successful Fire Build/Resupply", p: 3, h: null }, { l: "Survival milestone, complete daily task", p: 10, h: null }] });
  set("Arm Wrestling Tournament", { archetype: "armwrestle_custom", description: "Single-elimination strength event where contestants battle one-on-one until one competitor remains. Each match is best of three. Never a match between teammates. If no opponents remain to compete, the remaining team wins.", weights: { str: 55, con: 25, dex: 18, wis: 0, int: 0, cha: 0, lck: 2 }, fixed: { participation: 3, catastrophe: 5 },
    actions: [{ l: "Match win", p: 5, h: null }, { l: "Opponent pinned", p: 5, h: null }, { l: "Event win, not eliminated", p: 10, h: null }] });
  set("Track & Field Events", { description: "Each team competes across 11 athletic disciplines testing speed, strength, jumping, throwing, and endurance against another team, one-vs-one, head-to-head. Team captains select which teammate runs which event, putting the best suited athlete in each. Each teammate must compete at least once and in no more than one event: 100-meter dash, long jump, shot put, high jump, 400-meter run, 110-meter hurdles, discus throw, pole vault, javelin throw, 1500-meter run, and 3000-meter steeplechase. Each event is scored individually: 2 points for competing and 8 points for the event win.", weights: { str: 20, con: 20, dex: 30, wis: 10, int: 10, cha: 0, lck: 10 }, fixed: { participation: 0, catastrophe: 5 },
    actions: [{ l: "Competing in event, participation", p: 2, h: null }, { l: "Event win", p: 8, h: null }, { l: "Overall team win, each teammate", p: 10, h: null }] });
  set("Prison Break", { archetype: "prisonbreak_custom", description: "Teams, locked up individually, escape a heavily guarded prison by any means possible: avoiding guards, taking out potential threats, creating distractions and diversions, finding equipment, digging, climbing, and reaching an extraction point for an eventual escape. Individuals can use one instance of their ability once freed from their cells. Once an alarm has been sounded, more guards become present.", weights: { str: 10, con: 10, dex: 20, wis: 20, int: 20, cha: 5, lck: 15 }, fixed: { participation: 3, catastrophe: 5 },
    actions: [{ l: "Guard bypass/incapacitate/evade", p: 4, h: null }, { l: "Escape cell", p: 5, h: null }, { l: "Equipment gather/craft", p: 3, h: null }, { l: "Teammate rescued", p: 5, h: null }, { l: "Escape prison", p: 20, h: null }, { l: "Alarm sounded", p: -4, h: null }] });
})();

const CUSTOM_ARCHETYPES = new Set(["football_custom", "basketball_custom", "guts_custom", "trivia_custom", "battleroyale_custom", "bandbattle_custom", "hotdog_custom", "inferno_custom", "dodgeball_custom", "feud_custom", "sharktank_custom", "boxing_custom", "roastbattle_custom", "ninjawarrior_custom", "hollywoodsquares_custom", "captureflag_custom", "trackfield_custom", "nakedafraid_custom", "armwrestle_custom", "prisonbreak_custom", "battlebots_custom", "chessboxing_custom", "gladiators_custom", "cornhole_custom", "hauntedhouse_custom", "allianceisland_custom"]);

const DURATIONS = [
  { key: "short", label: "Short", note: "Quick sim, fewer plays" },
  { key: "medium", label: "Medium", note: "Standard length" },
  { key: "long", label: "Long", note: "Extended, more variance" },
];

// ============================= RNG HELPERS =============================
function rnd() { return Math.random(); }
function luckShift(luck) {
  const bias = (luck - 11) / 9;
  return (rnd() - 0.5) * 0.4 + bias * 0.25;
}
function weightedPick(items, weightFn) {
  const weights = items.map((it) => Math.max(0.01, weightFn(it)));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rnd() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

// ============================= BER (BASE EVENT RATING) =============================
function computeBER(p, w) {
  return (p.st * w.str + p.co * w.con + p.dx * w.dex + p.wi * w.wis + p.it * w.int + p.ch * w.cha + p.lk * w.lck) / 100;
}
function finalPerformance(p, w) {
  const ber = computeBER(p, w);
  const randomRoll = (rnd() - 0.5) * 4 + luckShift(p.lk) * 3;
  return ber + randomRoll;
}

// ============================= SHARED STAT HELPERS =============================
// RULE: every competitor who takes part banks participation points (1.0-3.0). Nobody finishes at 0.
// The ONLY way to finish at or below zero is a catastrophe (knockout, disqualification, equipment
// disaster...), which voids participation credit and applies a heavy penalty.
const r1 = (x) => Math.round(x * 10) / 10;

const CATASTROPHE_TABLE = [
  { id: "ko", text: "is knocked unconscious and carried off", penalty: [7, 12] },
  { id: "dq", text: "is disqualified for a flagrant rules violation", penalty: [8, 14] },
  { id: "gear", text: "suffers a catastrophic equipment failure", penalty: [6, 10] },
  { id: "collapse", text: "collapses from total exhaustion and is pulled from the event", penalty: [6, 10] },
  { id: "freeze", text: "freezes completely on the biggest stage and walks off", penalty: [5, 9] },
  { id: "blunder", text: "makes a legendary, game-changing blunder", penalty: [6, 11] },
];
// per-attempt chance, scaled so a typical competitor has roughly a 1.5-5% chance across the whole event
let FIXED = null; // per-event overrides: { participation, catastrophe }
function catastropheChance(p, attempts) {
  const base = Math.max(0.008, Math.min(0.05, 0.016 + (11 - p.lk) * 0.0018 + (11 - p.co) * 0.0012));
  return base / Math.max(1, attempts || 1);
}
// Applies a catastrophe to box[p.n]. `label` / `penalty` may be supplied by the event (e.g. "crash", -10).
function markCatastrophe(box, p, label, penalty) {
  const b = box[p.n];
  if (!b || b.catastrophe) return null;
  const c = CATASTROPHE_TABLE[Math.floor(rnd() * CATASTROPHE_TABLE.length)];
  const pen = FIXED && FIXED.catastrophe != null ? FIXED.catastrophe : penalty != null ? Math.abs(penalty) : c.penalty[0] + rnd() * (c.penalty[1] - c.penalty[0]);
  b.catastrophe = label || c.text;
  b.penalty = -r1(pen);
  b.fp += b.penalty;
  return { text: label || c.text, penalty: b.penalty };
}
// Called at the very end of every engine: bank participation, floor ordinary performances, round numbers.
function finishBox(box, roster) {
  roster.forEach((p) => {
    const b = box[p.n];
    if (!b) return;
    if (b.catastrophe) {
      b.participation = 0;
    } else {
      const part = FIXED && FIXED.participation != null ? FIXED.participation : r1(1 + ((p.co + p.wi) / 44) * 1.2 + rnd() * 0.8);
      b.participation = part;
      const earned = b.fp;
      b.fp = earned + part;
      if (b.fp < part) { b.fp = part; b.floored = true; }
    }
    b.fp = r1(b.fp);
    Object.keys(b).forEach((k) => { if (typeof b[k] === "number" && k !== "fp") b[k] = Math.round(b[k] * 100) / 100; });
  });
  return box;
}
function fpSum(box, team) { return r1(team.reduce((s, p) => s + (box[p.n] ? box[p.n].fp : 0), 0)); }
function newBox(players, proto) {
  const box = {};
  players.forEach((p) => (box[p.n] = { ...JSON.parse(JSON.stringify(proto || {})), fp: 0 }));
  return box;
}
function bump(box, name, key, n, pts) {
  const b = box[name];
  if (!b) return 0;
  b[key] = (b[key] || 0) + (n == null ? 1 : n);
  b.fp += pts || 0;
  return b[key];
}
function sleep(ms) { return new Promise((res) => setTimeout(res, ms)); }
// make sure every log line has a plain-English `text` the announcers (or the fallback script) can lean on
function ensureText(l) {
  if (l.text) return l;
  const who = l.player || l.qb || l.rb || l.kicker || "";
  const bits = [who, l.type].filter(Boolean).join(" ");
  const out = { ...l };
  out.text = (bits + (l.victim ? ` (victim: ${l.victim})` : "") + (l.target ? ` (target: ${l.target})` : "")).trim() || "a big moment";
  return out;
}


// ============================= FOOTBALL =============================
// Scoring (per master events doc): passing/rushing/receiving yard +0.1; reception +1; TD +6; INT -3; fumble -2; FG +3

// ============================= BASKETBALL =============================
// Scoring (per master events doc): point +1; rebound +2; assist +3; steal +4; block +4; 3PT bonus +2 (on top of the 3 points); turnover -2

// ============================= GLOBAL GUTS =============================
// Scoring (per master events doc): obstacle cleared +2; final checkpoint +5; Aggro Crag completion +15 (plus a station-placement bonus)
// ============================= GLOBAL GUTS =============================
// Real GUTS structure: four randomly-drawn events (one from each escalating round pool),
// capped by the Aggro Crag. Competitors run in the order the manager selected them (1-5).
const GUTS_POOLS = [
  [ // Event 1 — intro-level
    { n: "Obstacle Course Dash", d: "Classic all-in-one course: hurdles, crawl, climb, balance, sprint finish", w: { dx: 1.0, st: 0.6, co: 0.5 } },
    { n: "Basic Training", d: "Military-style course of cargo nets, rope climbs, low crawls and walls", w: { st: 1.0, co: 0.8, dx: 0.5 } },
    { n: "Sprint Relay", d: "Back-and-forth sprinting with handoffs and checkpoints", w: { dx: 1.2, co: 0.5 } },
    { n: "Shuttle Run", d: "Short burst sprints retrieving objects across short distances", w: { dx: 1.2, st: 0.4 } },
    { n: "Track Bike", d: "Traditional bike race around the track — pure speed, no gimmicks", w: { dx: 1.0, co: 0.7, st: 0.4 } },
    { n: "Scooter Dash", d: "Fast-paced scooter race with quick turns and tight control sections", w: { dx: 1.3, lk: 0.3 } },
    { n: "Treadmill Sprint", d: "High-speed treadmill run testing raw speed and pace", w: { dx: 1.0, co: 0.9 } },
    { n: "Cargo Net Climb", d: "Straightforward vertical net climb", w: { st: 1.2, dx: 0.5 } },
    { n: "Ladder Ascend", d: "Fixed ladder climbed as fast as possible — pure upper-body speed", w: { st: 1.1, dx: 0.6 } },
    { n: "Platform Balance", d: "Simple balance platforms over a short distance", w: { dx: 1.2, wi: 0.4 } },
    { n: "Log Jam", d: "Crossing stationary and lightly moving logs", w: { dx: 1.1, co: 0.4 } },
    { n: "Tightrope Traverse", d: "Straight-line tightrope walk — pure control under pressure", w: { dx: 1.3, wi: 0.5 } },
    { n: "Elastic Sports", d: "Bungee cords drag competitors back as they fight toward the goal", w: { st: 1.1, co: 0.7 } },
    { n: "Target Toss", d: "Throwing accuracy challenge", w: { dx: 1.0, wi: 0.6 } },
    { n: "Ring Toss Challenge", d: "Precision tosses into targets — low strain, high focus", w: { dx: 1.0, wi: 0.7, lk: 0.4 } },
  ],
  [ // Event 2 — water and grip enter
    { n: "Downhill Dash", d: "Fast descent course with obstacles and control elements", w: { dx: 1.1, co: 0.6 } },
    { n: "End Zone Run", d: "Football-style run — grab objects and score in the end zone", w: { st: 0.9, dx: 1.0 } },
    { n: "Slalom Run", d: "Weaving through cones at speed", w: { dx: 1.3, co: 0.4 } },
    { n: "Roller Race", d: "Rolling along an unstable resistance track requiring rhythm and balance", w: { dx: 1.0, co: 0.8 } },
    { n: "Pool Crossing", d: "Swim or platform crossing — water enters the equation", w: { co: 1.0, dx: 0.8 } },
    { n: "Hydro Dash", d: "Fast movement across a wet surface where footing matters", w: { dx: 1.1, co: 0.7 } },
    { n: "Slip Track", d: "Running a slick, wet lane where traction is the challenge", w: { dx: 1.2, lk: 0.5 } },
    { n: "Rope Climb Challenge", d: "Classic rope climb — grip strength and technique", w: { st: 1.3, co: 0.6 } },
    { n: "Balance Beam Blitz", d: "Narrow beam with movement and timing pressure", w: { dx: 1.3, wi: 0.4 } },
    { n: "Rolling Thunder", d: "Spinning logs force constant reactive adjustments", w: { dx: 1.2, co: 0.6 } },
    { n: "Tug of Force", d: "Head-to-head pulling challenge — raw strength and positioning", w: { st: 1.5, co: 0.8 } },
    { n: "Ball Blitz", d: "Fast throwing and collection of balls into targets under time pressure", w: { dx: 1.1, st: 0.5 } },
    { n: "Monkey Bars Extreme", d: "Overhead bar traverse — grip strength and endurance", w: { st: 1.2, co: 0.8 } },
    { n: "Ring Swing Traverse", d: "Swinging between rings across gaps", w: { st: 1.1, dx: 0.9 } },
  ],
  [ // Event 3 — height, water jets, disorientation
    { n: "Target Run", d: "Run the course, stop to hit targets, then continue", w: { dx: 1.0, wi: 0.8 } },
    { n: "Skybike", d: "Suspended bike race high above the arena — endurance plus nerve", w: { co: 1.1, dx: 0.8, wi: 0.5 } },
    { n: "Water Gauntlet", d: "Crossing a pool while powerful jets blast you sideways", w: { st: 1.0, co: 1.0, dx: 0.6 } },
    { n: "Water Wall Climb", d: "Vertical climb with water rushing down over the holds", w: { st: 1.3, co: 0.9 } },
    { n: "Rock Wall Sprint", d: "Timed climb with route choices and technical holds", w: { st: 1.1, dx: 0.8, it: 0.4 } },
    { n: "Vertical Limit", d: "Tall endurance climb where pacing and stamina decide it", w: { co: 1.4, st: 0.9 } },
    { n: "Spiral of Doom", d: "Rotating structure — balance while completely disoriented", w: { dx: 1.2, co: 0.7, wi: 0.5 } },
    { n: "Spin Cycle", d: "Spinning platform challenge that wrecks equilibrium", w: { dx: 1.1, co: 0.8 } },
    { n: "Twister Run", d: "Running course with wind and rotation effects", w: { dx: 1.1, st: 0.6, co: 0.6 } },
    { n: "Weighted Carry", d: "Hauling heavy objects across a course", w: { st: 1.5, co: 1.0 } },
    { n: "Cannonball Run", d: "Launching and carrying objects across timed obstacles", w: { st: 1.2, dx: 0.8 } },
    { n: "Target Shoot", d: "Moving accuracy challenge at added distance", w: { rg: 1.0, dx: 0.9, wi: 0.5 } },
    { n: "Hang Tough", d: "Suspended ring-hanging endurance battle — grip fatigue decides everything", w: { co: 1.4, st: 1.0 } },
    { n: "Overhead Ladder", d: "Moving across an overhead ladder under heavy fatigue", w: { st: 1.2, co: 1.0 } },
  ],
  [ // Event 4 — pre-Crag chaos
    { n: "Water Gauntlet", d: "Late-stage jet chaos designed to shake up the standings", w: { st: 1.0, co: 1.1, lk: 0.5 } },
    { n: "Water Wall Climb", d: "High-fatigue version where endurance decides it", w: { st: 1.2, co: 1.2 } },
    { n: "Vertical Limit", d: "A draining endurance climb right before the final", w: { co: 1.5, st: 0.9 } },
    { n: "Rope Climb Challenge", d: "High-fatigue rope climb where grip failure is a real risk", w: { st: 1.3, co: 1.0 } },
    { n: "Dizzy Dash", d: "High-intensity disorientation run with competitors heavily impaired", w: { dx: 1.1, co: 0.9, lk: 0.6 } },
    { n: "Spiral of Doom", d: "Brutal late-stage rotation with tighter paths", w: { dx: 1.2, co: 0.9 } },
    { n: "Rolling Thunder", d: "Fatigue-breaker logs where balance failures are common", w: { dx: 1.2, co: 0.8 } },
    { n: "Rocket Launch", d: "Explosive launch-and-grab requiring power and timing", w: { st: 1.3, dx: 0.9 } },
    { n: "Swing Shot", d: "Swinging to reach distant targets — momentum control under stress", w: { st: 1.0, dx: 1.1 } },
    { n: "Trampoline Grab", d: "High jump timing with precise mid-air control", w: { dx: 1.3, st: 0.7 } },
    { n: "High Ball Capture", d: "Catching objects at peak height and speed", w: { dx: 1.2, st: 0.6, lk: 0.4 } },
  ],
];

// ============================= TRIVIA TITANS =============================
// Scoring (per master events doc): correct answer +3; difficult answer +5; streak +3; bonus round +10

// ============================= BATTLE ROYALE =============================
// Scoring (per master events doc): damage +1; elimination +10; loot +2; final 5 +10; final 3 +15; victory +25 (bonuses stack as you advance further)
// ============================= BATTLE ROYALE =============================
// TEAM-BASED squad warfare, not a free-for-all. Teammates fight together and never
// intentionally target each other. Rare exceptions: accidental friendly fire in the chaos,
// and — very rarely — a genuinely treacherous character turning on their own squad.
// Scoring: damage +1; elimination +10; loot +2; final 5 +10; final 3 +15; victory +25

// ============================= GENERIC EVENT ENGINES (BER-driven) =============================





// ============================= BATTLE OF THE BANDS =============================
const BAND_ROLES = [
  { key: "LeadVocals", label: "Lead Vocals", fit: (p) => p.ch * 2 + p.lk },
  { key: "LeadGuitar", label: "Lead Guitar", fit: (p) => p.dx * 2 + p.ch },
  { key: "RhythmGuitar", label: "Rhythm Guitar", fit: (p) => p.dx * 1.5 + p.co },
  { key: "Bass", label: "Bass", fit: (p) => p.co * 1.5 + p.st },
  { key: "Drums", label: "Drums", fit: (p) => p.st * 1.5 + p.co },
  { key: "Keys", label: "Keys / Synth", fit: (p) => p.it * 2 + p.wi },
  { key: "Backup", label: "Backup Vocals & Stage Presence", fit: (p) => p.ch + p.dx },
];
function assignBandRoles(players) {
  const pool = [...players];
  const roles = {};
  BAND_ROLES.slice(0, -1).forEach((r) => {
    const sorted = [...pool].sort((a, b) => r.fit(b) - r.fit(a));
    const picked = sorted[0];
    pool.splice(pool.indexOf(picked), 1);
    roles[r.key] = picked;
  });
  roles[BAND_ROLES[BAND_ROLES.length - 1].key] = pool[0];
  return roles;
}
function musicalGenreOf(p) {
  const genres = { st: "Metal/Rock", co: "Punk", dx: "Funk/Jazz", wi: "Folk/Soul", it: "Prog/Electronic", ch: "Pop" };
  let best = "ch", bestVal = -1;
  Object.keys(genres).forEach((k) => { if (p[k] > bestVal) { bestVal = p[k]; best = k; } });
  return genres[best];
}
// Scoring (per master events doc): judge win +10; crowd favorite +5; flawless performance +3; missed note -1; technical failure -3; performance flop -5
// Scored across three dimensions — Musical Talent, Appearance, Wow Factor — plus a band-chemistry modifier from clashing/blending musical genres across all 7 roles.

// ============================= HOT DOG EATING CONTEST =============================

// ============================= TOWERING INFERNO =============================

// ============================= DODGEBALL BLITZ =============================

// ============================= FAMILY FEUD =============================

// ============================= SHARK TANK =============================

// ============================= BOXING (bespoke) =============================

// ============================= ROAST BATTLE =============================

// ============================= HOLLYWOOD SQUARES =============================
// 11 per side: 9 celebrities fill the tic-tac-toe board, 2 are the contestants.
// Contestants play against the OPPOSING team's board. A square gives a true-or-false
// statement (sometimes an honest one, sometimes a deliberate bluff to bait a wrong call).
// The contestant must judge it. Correct call claims the square; wrong call gives it away.
// Scoring: correct answer +3; square claimed +2; three-in-row +10; winning round +10

// ============================= NINJA WARRIOR =============================

// ============================= FOOTBALL (full offense + defense scoring sheet) =============================
// Reception 1.0 | Pass yd 0.04 | Pass TD 4 | INT thrown -2 | Rush/Rec yd 0.1 | Rush/Rec TD 6 | 2-pt conv 2 | Fumble lost -2
// Sack 1 | INT caught 2 | Fumble recovery 2 | Safety 2 | Blocked kick 2 | Def/ST TD 6 | Solo tackle 1.5 | Assisted tackle 0.75 | TFL 2.5
// (Kicking carried over from the original sheet: field goal +3, extra point +1.)
// All 11 players play both ways: offense by the lineup slots, defense auto-assigned (4 DL, 3 LB, 4 DB) by attributes.
const FB_SCORING = [
  { label: "Reception", pts: 1 }, { label: "Passing yard", pts: 0.04 }, { label: "Passing TD", pts: 4 }, { label: "Interception thrown", pts: -2 },
  { label: "Rushing / receiving yard", pts: 0.1 }, { label: "Rushing / receiving TD", pts: 6 }, { label: "2-point conversion", pts: 2 }, { label: "Fumble lost", pts: -2 },
  { label: "Sack", pts: 1 }, { label: "Interception caught", pts: 2 }, { label: "Fumble recovery", pts: 2 }, { label: "Defensive safety", pts: 2 }, { label: "Blocked kick", pts: 2 },
  { label: "Defensive / special teams TD", pts: 6 }, { label: "Solo tackle", pts: 1.5 }, { label: "Assisted tackle", pts: 0.75 }, { label: "Tackle for loss", pts: 2.5 },
  { label: "Field goal made (original sheet)", pts: 3 }, { label: "Extra point made (original sheet)", pts: 1 },
  { label: "Participation (everyone who plays)", pts: "1.0-3.0" }, { label: "Catastrophe (injury / ejection)", pts: "-5 to -14" },
];
const FB_COLUMNS = [
  { k: "passCmp", label: "Cmp", g: "Passing", tip: "Completions" }, { k: "passAtt", label: "Att", g: "Passing", tip: "Pass attempts" },
  { k: "passYd", label: "Pass Yd", g: "Passing", tip: "0.04 FP per yard" }, { k: "passTD", label: "Pass TD", g: "Passing", tip: "+4 FP each" },
  { k: "int", label: "INT", g: "Passing", tip: "Interceptions thrown, -2 FP each" }, { k: "sacked", label: "Sacked", g: "Passing", tip: "Times sacked" },
  { k: "rushAtt", label: "Car", g: "Rushing", tip: "Carries" }, { k: "rushYd", label: "Rush Yd", g: "Rushing", tip: "0.1 FP per yard" },
  { k: "rushTD", label: "Rush TD", g: "Rushing", tip: "+6 FP each" }, { k: "fumLost", label: "Fum Lost", g: "Rushing", tip: "-2 FP each" },
  { k: "tgt", label: "Tgt", g: "Receiving", tip: "Targets" }, { k: "rec", label: "Rec", g: "Receiving", tip: "+1 FP per reception" },
  { k: "recYd", label: "Rec Yd", g: "Receiving", tip: "0.1 FP per yard" }, { k: "recTD", label: "Rec TD", g: "Receiving", tip: "+6 FP each" },
  { k: "twoPt", label: "2PT", g: "Receiving", tip: "Two-point conversions, +2 FP each" }, { k: "longPlay", label: "Long", g: "Receiving", tip: "Longest play of the game (yards)" },
  { k: "solo", label: "Solo", g: "Defense", tip: "Solo tackles, 1.5 FP each" }, { k: "ast", label: "Ast", g: "Defense", tip: "Assisted tackles, 0.75 FP each" },
  { k: "tfl", label: "TFL", g: "Defense", tip: "Tackles for loss, 2.5 FP each" }, { k: "sacks", label: "Sack", g: "Defense", tip: "+1 FP each" },
  { k: "defInt", label: "Def INT", g: "Defense", tip: "Interceptions caught, +2 FP each" }, { k: "fumRec", label: "Fum Rec", g: "Defense", tip: "+2 FP each" },
  { k: "safeties", label: "Safety", g: "Defense", tip: "+2 FP each" }, { k: "blk", label: "Blk", g: "Defense", tip: "Blocked kicks, +2 FP each" },
  { k: "defTD", label: "Def/ST TD", g: "Defense", tip: "+6 FP each" },
  { k: "fgMade", label: "FGM", g: "Kicking", tip: "Field goals made, +3 FP each" }, { k: "fgAtt", label: "FGA", g: "Kicking", tip: "Field goals attempted" },
  { k: "xpMade", label: "XP", g: "Kicking", tip: "Extra points, +1 FP each" },
  { k: "participation", label: "Part.", g: "All", tip: "Participation credit" },
];
function fbDefenseRoles(players) {
  const pool = [...players];
  const take = (n, fit) => { const s = [...pool].sort((a, b) => fit(b) - fit(a)).slice(0, n); s.forEach((p) => pool.splice(pool.indexOf(p), 1)); return s; };
  const DL = take(4, (p) => p.st + p.co);
  const LB = take(3, (p) => p.st + p.dx + p.wi);
  return { DL, LB, DB: pool };
}
function fbFp(b) {
  return b.passYd * 0.04 + b.passTD * 4 - b.int * 2 + (b.rushYd + b.recYd) * 0.1 + (b.rushTD + b.recTD) * 6 + b.rec * 1 + b.twoPt * 2 - b.fumLost * 2
    + b.sacks * 1 + b.defInt * 2 + b.fumRec * 2 + b.safeties * 2 + b.blk * 2 + b.defTD * 6 + b.solo * 1.5 + b.ast * 0.75 + b.tfl * 2.5 + b.fgMade * 3 + b.xpMade * 1;
}
function mmss(sec) { const m = Math.floor(sec / 60), s = Math.round(sec % 60); return `${m}:${String(s).padStart(2, "0")}`; }

function simFootball(teamA, teamB, roles, duration) {
  const drivesPer = duration === "short" ? 7 : duration === "long" ? 16 : 11;
  const roster = [...teamA, ...teamB];
  const proto = { passCmp: 0, passAtt: 0, passYd: 0, passTD: 0, int: 0, sacked: 0, rushAtt: 0, rushYd: 0, rushTD: 0, fumLost: 0, tgt: 0, rec: 0, recYd: 0, recTD: 0, twoPt: 0, longPlay: 0,
    solo: 0, ast: 0, tfl: 0, sacks: 0, defInt: 0, fumRec: 0, safeties: 0, blk: 0, defTD: 0, fgMade: 0, fgAtt: 0, xpMade: 0, role: "" };
  const box = newBox(roster, proto);
  const side = { A: { team: teamA, r: roles.A, d: fbDefenseRoles(teamA) }, B: { team: teamB, r: roles.B, d: fbDefenseRoles(teamB) } };
  ["A", "B"].forEach((s) => {
    const r = side[s].r;
    box[r.QB.n].role = "QB";
    r.OL.forEach((p) => (box[p.n].role = "OL"));
    r.RB.forEach((p) => (box[p.n].role = "RB"));
    r.WR.forEach((p) => (box[p.n].role = "WR"));
    box[r.TE.n].role = "TE";
    const k = r.Kicker; if (k && box[k.n]) box[k.n].role = (box[k.n].role ? box[k.n].role + "/" : "") + "K";
  });
  const out = {}; // players removed by catastrophe
  const score = { A: 0, B: 0 };
  const tm = { A: { plays: 0, yds: 0, pass: 0, rush: 0, to: 0, sacks: 0, firsts: 0, top: 0, pts: 0 }, B: { plays: 0, yds: 0, pass: 0, rush: 0, to: 0, sacks: 0, firsts: 0, top: 0, pts: 0 } };
  const log = [];
  const opp = (s) => (s === "A" ? "B" : "A");
  const live = (arr) => { const a = arr.filter((p) => !out[p.n]); return a.length ? a : arr; };
  const lineOf = (n) => {
    const b = box[n]; const bits = [];
    if (b.passAtt) bits.push(`${b.passCmp} of ${b.passAtt} for ${b.passYd} yards${b.passTD ? `, ${b.passTD} TD` : ""}${b.int ? `, ${b.int} INT` : ""}`);
    if (b.rushAtt) bits.push(`${b.rushAtt} carries for ${b.rushYd} yards${b.rushTD ? `, ${b.rushTD} TD` : ""}`);
    if (b.rec) bits.push(`${b.rec} catches for ${b.recYd} yards${b.recTD ? `, ${b.recTD} TD` : ""}`);
    if (b.sacks) bits.push(`${b.sacks} sack${b.sacks > 1 ? "s" : ""}`);
    if (b.defInt) bits.push(`${b.defInt} interception${b.defInt > 1 ? "s" : ""}`);
    return bits.join("; ");
  };
  function qbOf(s) { const q = side[s].r.QB; if (!out[q.n]) return q; const alt = live([side[s].r.TE, ...side[s].r.WR, ...side[s].r.RB]).find((p) => !out[p.n]); return alt || q; }
  function passBlock(s) { const r = side[s].r; const o = live(r.OL).concat(live([r.TE])); return o.reduce((t, p) => t + p.st + p.co, 0) / (o.length * 2); }
  function qbQuality(s) { const q = qbOf(s); return (q.it + q.at + q.rn) / 3; }
  function runQuality(s) { const rb = live(side[s].r.RB); return rb.reduce((t, p) => t + p.st + p.dx + p.co, 0) / (rb.length * 3); }
  function recvQuality(s) { const r = live([...side[s].r.WR, side[s].r.TE]); return r.reduce((t, p) => t + p.dx + p.ch + p.rn, 0) / (r.length * 3); }
  function coverage(s) { const d = live(side[s].d.DB).concat(live(side[s].d.LB)); return d.reduce((t, p) => t + p.dx + p.rn + p.wi, 0) / (d.length * 3); }
  function passRush(s) { const d = live(side[s].d.DL).concat(live(side[s].d.LB)); return d.reduce((t, p) => t + p.st + p.co, 0) / (d.length * 2); }
  function runStop(s) { const d = live([...side[s].d.DL, ...side[s].d.LB]); return d.reduce((t, p) => t + p.st + p.co + p.dx, 0) / (d.length * 3); }
  const pickDef = (s, wDL, wLB, wDB) => weightedPick(live([...side[s].d.DL, ...side[s].d.LB, ...side[s].d.DB]), (p) => {
    const grp = side[s].d.DL.includes(p) ? wDL : side[s].d.LB.includes(p) ? wLB : wDB;
    return grp * (p.st + p.co + p.dx + 4);
  });
  function tackle(defSide, wDL, wLB, wDB, loss, yardsTxt) {
    const first = pickDef(defSide, wDL, wLB, wDB);
    let who;
    if (rnd() < 0.62) { bump(box, first.n, "solo", 1, 0); who = { solo: first.n }; }
    else {
      let second = pickDef(defSide, wDL, wLB, wDB), g = 0;
      while (second.n === first.n && g++ < 5) second = pickDef(defSide, wDL, wLB, wDB);
      bump(box, first.n, "ast", 1, 0); bump(box, second.n, "ast", 1, 0);
      who = { ast: [first.n, second.n] };
    }
    if (loss) bump(box, first.n, "tfl", 1, 0);
    return { first, who };
  }
  function tackleText(t) { return t.who.solo ? `tackled by ${t.who.solo}` : `brought down by ${t.who.ast[0]} and ${t.who.ast[1]}`; }
  function addScore(s, pts) { score[s] += pts; tm[s].pts += pts; }
  function extraPoint(s, scorer, passer) {
    const k = side[s].r.Kicker && !out[side[s].r.Kicker.n] ? side[s].r.Kicker : live(side[s].team)[0];
    if (rnd() < 0.1) {
      const good = rnd() < 0.5 + (qbQuality(s) - 11) / 60;
      if (good) { addScore(s, 2); bump(box, scorer.n, "twoPt", 1, 0); if (passer && passer.n !== scorer.n) bump(box, passer.n, "twoPt", 1, 0); }
      log.push({ side: s, type: good ? "twoPtGood" : "twoPtFail", player: scorer.n, text: `Two-point try by {${s}}: ${good ? scorer.n + " gets in. It is good for two!" : "stuffed at the line. No good."}` });
      return;
    }
    const blocked = rnd() < 0.012;
    if (blocked) {
      const bl = pickDef(opp(s), 3, 1, 0.3); bump(box, bl.n, "blk", 1, 0);
      log.push({ side: opp(s), type: "blockedKick", player: bl.n, text: `The extra point is BLOCKED by ${bl.n}!` });
      return;
    }
    const good = rnd() < 0.94 + (k.at - 11) / 300;
    if (good) { bump(box, k.n, "xpMade", 1, 0); addScore(s, 1); }
  }
  function startDrive(s, spot, driveNo, label) {
    let down = 1, dist = 10, plays = 0, yds = 0, secs = 0, result = null, pass = 0, rush = 0;
    const startSpot = spot;
    let gain;
    while (!result && plays < 16) {
      const O = side[s], dsd = opp(s);
      if (down === 4 && !(dist <= 2 && spot >= 55 && rnd() < 0.5) && !(dist <= 4 && spot >= 40 && spot < 55 && rnd() < 0.2)) {
        // fourth-down decision
        const k = O.r.Kicker && !out[O.r.Kicker.n] ? O.r.Kicker : live(O.team)[0];
        const fgDist = 100 - spot + 17;
        if (fgDist <= 56) {
          secs += 8;
          box[k.n].fgAtt++;
          if (rnd() < 0.03) {
            const bl = pickDef(dsd, 3, 1, 0.3); bump(box, bl.n, "blk", 1, 0);
            log.push({ side: dsd, type: "blockedKick", player: bl.n, victim: k.n, text: `Drive ${driveNo}: ${k.n} lines up from ${fgDist} yards and ${bl.n} BLOCKS the field goal!` });
            tm[s].top += secs; return { result: "blockedFG", spot, plays, yds, secs, next: dsd, nextSpot: clamp(100 - spot, 1, 70) };
          }
          const made = rnd() < clamp(0.92 - (fgDist - 30) * 0.012 + (k.at - 11) / 80 + luckShift(k.lk) * 0.15, 0.2, 0.97);
          if (made) {
            box[k.n].fgMade++; addScore(s, 3);
            log.push({ side: s, type: "fgMade", player: k.n, yards: fgDist, text: `Drive ${driveNo}: ${k.n} drills a ${fgDist}-yard field goal! It splits the uprights. That is field goal number ${box[k.n].fgMade} for ${k.n}.` });
            tm[s].top += secs; return { result: "fieldgoal", spot, plays, yds, secs, next: dsd, nextSpot: 25 };
          }
          log.push({ side: s, type: "fgMiss", player: k.n, yards: fgDist, text: `Drive ${driveNo}: ${k.n} tries a ${fgDist}-yard field goal and it is NO GOOD, wide of the post.` });
          tm[s].top += secs; return { result: "missedFG", spot, plays, yds, secs, next: dsd, nextSpot: clamp(100 - spot, 1, 70) };
        }
        secs += 8;
        const pnt = 36 + Math.floor(rnd() * 16);
        const retTD = rnd() < 0.012;
        if (rnd() < 0.025) {
          const bl = pickDef(dsd, 3, 1, 0.3); bump(box, bl.n, "blk", 1, 0);
          log.push({ side: dsd, type: "blockedKick", player: bl.n, text: `Drive ${driveNo}: the punt is BLOCKED by ${bl.n}!` });
          tm[s].top += secs; return { result: "blockedPunt", spot, plays, yds, secs, next: dsd, nextSpot: clamp(100 - spot, 1, 70) };
        }
        if (retTD) {
          const ret = pickDef(dsd, 0, 0, 1);
          bump(box, ret.n, "defTD", 1, 0); addScore(dsd, 6); extraPoint(dsd, ret, null);
          log.push({ side: dsd, type: "stTD", player: ret.n, text: `Drive ${driveNo}: the punt goes to ${ret.n}, who finds a seam and takes it ALL THE WAY for a special teams touchdown!` });
          tm[s].top += secs; return { result: "puntReturnTD", spot, plays, yds, secs, next: s, nextSpot: 25 };
        }
        tm[s].top += secs;
        return { result: "punt", spot, plays, yds, secs, next: dsd, nextSpot: clamp(100 - (spot + pnt), 8, 40) };
      }

      const qb = qbOf(s);
      const passW = qbQuality(s) + recvQuality(s) - 4, runW = runQuality(s) * 1.6;
      const isPass = rnd() < clamp(passW / (passW + runW) + (dist > 7 ? 0.12 : -0.04), 0.3, 0.72);
      plays++; tm[s].plays++;
      const sit = `${["", "1st", "2nd", "3rd", "4th"][down]} and ${dist >= 100 - spot ? "goal" : dist}`;
      if (isPass) {
        box[qb.n].passAtt++;
        const sackP = clamp(0.065 + (passRush(dsd) - passBlock(s)) / 150, 0.02, 0.17);
        if (rnd() < sackP) {
          const sacker = pickDef(dsd, 3, 1.6, 0.3);
          const loss = 4 + Math.floor(rnd() * 6);
          bump(box, sacker.n, "sacks", 1, 0); bump(box, qb.n, "sacked", 1, 0);
          tm[dsd].sacks++; secs += 26;
          const safe = spot - loss <= 0;
          spot -= loss; yds -= loss; tm[s].yds -= loss; tm[s].pass -= loss;
          log.push({ side: dsd, type: "sack", player: sacker.n, victim: qb.n, yards: -loss, text: `Drive ${driveNo}, ${sit}: SACK! ${sacker.n} drops ${qb.n} for a loss of ${loss}${safe ? " — in the end zone!" : ""}. ${sacker.n} now has ${box[sacker.n].sacks} sack${box[sacker.n].sacks > 1 ? "s" : ""}.` });
          if (safe) {
            bump(box, sacker.n, "safeties", 1, 0); addScore(dsd, 2);
            log.push({ side: dsd, type: "safety", player: sacker.n, text: `SAFETY! ${sacker.n} takes down ${qb.n} in the end zone. Two points for {${dsd}}!` });
            tm[s].top += secs; return { result: "safety", spot: 35, plays, yds, secs, next: dsd, nextSpot: 35 };
          }
          down++; dist += loss;
        } else {
          const coverP = coverage(dsd), recvQ = recvQuality(s);
          const intP = clamp(0.03 + (coverP - qbQuality(s)) / 220, 0.008, 0.075);
          const compP = clamp(0.6 + (qbQuality(s) - coverP) / 55 + (recvQ - coverP) / 90, 0.36, 0.86);
          const target = weightedPick(live([...O.r.WR, O.r.TE, ...O.r.RB]), (p) => {
            const isRB = O.r.RB.includes(p);
            return (p.dx + p.ch + p.rn + 5) * (isRB ? 0.45 : 1);
          });
          bump(box, target.n, "tgt", 1, 0);
          if (rnd() < intP) {
            const dfn = pickDef(dsd, 0.2, 2, 4);
            bump(box, qb.n, "int", 1, 0); bump(box, dfn.n, "defInt", 1, 0);
            tm[s].to++; secs += 14;
            const tdRet = rnd() < 0.07;
            const retYds = tdRet ? 100 - Math.max(0, 100 - spot - 10) : Math.floor(rnd() * 30);
            if (tdRet) {
              bump(box, dfn.n, "defTD", 1, 0); addScore(dsd, 6); extraPoint(dsd, dfn, null);
              log.push({ side: dsd, type: "defTD", player: dfn.n, victim: qb.n, text: `Drive ${driveNo}, ${sit}: ${qb.n} throws it right to ${dfn.n}, who takes it all the way back for a PICK-SIX! Touchdown {${dsd}}!` });
              tm[s].top += secs; return { result: "pickSix", spot, plays, yds, secs, next: dsd, nextSpot: 25 };
            }
            log.push({ side: dsd, type: "int", player: dfn.n, victim: qb.n, text: `Drive ${driveNo}, ${sit}: ${qb.n} throws toward ${target.n} and ${dfn.n} PICKS IT OFF! That is interception number ${box[dfn.n].defInt} for ${dfn.n} and number ${box[qb.n].int} for ${qb.n}.` });
            tm[s].top += secs;
            return { result: "interception", spot, plays, yds, secs, next: dsd, nextSpot: clamp(100 - spot + retYds, 1, 60) };
          }
          if (rnd() < compP) {
            const big = rnd() < 0.12;
            gain = Math.max(1, Math.round(2 + rnd() * 11 + (big ? 14 + rnd() * 32 : 0) + (target.dx + target.ch - 20) / 8));
            const td = spot + gain >= 100;
            if (td) gain = 100 - spot;
            box[qb.n].passCmp++; box[qb.n].passYd += gain; box[target.n].rec++; box[target.n].recYd += gain;
            tm[s].yds += gain; tm[s].pass += gain; yds += gain; pass += gain; secs += 31;
            box[target.n].longPlay = Math.max(box[target.n].longPlay, gain); box[qb.n].longPlay = Math.max(box[qb.n].longPlay, gain);
            if (td) {
              box[qb.n].passTD++; box[target.n].recTD++; addScore(s, 6);
              log.push({ side: s, type: "passTD", player: qb.n, target: target.n, yards: gain, qbLine: lineOf(qb.n), recLine: lineOf(target.n),
                text: `Drive ${driveNo}, ${sit}: TOUCHDOWN! ${qb.n} finds ${target.n} for ${gain} yards! ${qb.n} is ${lineOf(qb.n)}; ${target.n} has ${lineOf(target.n)}.` });
              extraPoint(s, target, qb);
              tm[s].top += secs; return { result: "touchdown", spot: 100, plays, yds, secs, next: dsd, nextSpot: 25 };
            }
            const t = tackle(dsd, 0.3, 2, 3, false);
            if (gain >= 18) log.push({ side: s, type: "bigPass", player: qb.n, target: target.n, yards: gain, recLine: lineOf(target.n), text: `Drive ${driveNo}, ${sit}: ${qb.n} hits ${target.n} for ${gain} yards, ${tackleText(t)}. ${target.n} now has ${lineOf(target.n)}.` });
            spot += gain;
            if (gain >= dist) { tm[s].firsts++; down = 1; dist = Math.min(10, 100 - spot); } else { down++; dist -= gain; }
          } else {
            secs += 9;
            down++;
          }
        }
      } else {
        const rb = weightedPick(live(O.r.RB.concat(rnd() < 0.08 ? [qb] : [])), (p) => p.st + p.dx + p.co);
        const rq = runQuality(s), rs = runStop(dsd);
        const big = rnd() < 0.07;
        gain = Math.round(1 + rnd() * 5 + (rq - rs) / 4 + (big ? 9 + rnd() * 28 : 0) - (rnd() < 0.16 ? 4 + rnd() * 4 : 0));
        const fumP = clamp(0.012 + (11 - rb.co) * 0.0012, 0.004, 0.03);
        box[rb.n].rushAtt++;
        const fumbled = rnd() < fumP;
        const td = spot + gain >= 100;
        if (td) gain = 100 - spot;
        if (spot + gain <= 0 && gain < 0) {
          const t = tackle(dsd, 3, 2, 0.5, true);
          bump(box, t.first.n, "safeties", 1, 0); addScore(dsd, 2);
          box[rb.n].rushYd += gain; yds += gain; tm[s].yds += gain; tm[s].rush += gain; secs += 33;
          log.push({ side: dsd, type: "safety", player: t.first.n, victim: rb.n, text: `SAFETY! ${rb.n} is stopped in the end zone by ${t.first.n}. Two points for {${dsd}}!` });
          tm[s].top += secs; return { result: "safety", spot, plays, yds, secs, next: dsd, nextSpot: 35 };
        }
        box[rb.n].rushYd += gain; yds += gain; tm[s].yds += gain; tm[s].rush += gain; rush += gain; secs += 36;
        box[rb.n].longPlay = Math.max(box[rb.n].longPlay, gain);
        if (fumbled) {
          const recovered = rnd() < 0.5;
          const rec = recovered ? pickDef(dsd, 1, 1.5, 1) : weightedPick(live(side[s].team), (p) => p.dx + 2);
          bump(box, rec.n, "fumRec", 1, 0);
          if (recovered) {
            bump(box, rb.n, "fumLost", 1, 0); tm[s].to++;
            const tdRet = rnd() < 0.08;
            if (tdRet) {
              bump(box, rec.n, "defTD", 1, 0); addScore(dsd, 6); extraPoint(dsd, rec, null);
              log.push({ side: dsd, type: "defTD", player: rec.n, victim: rb.n, text: `Drive ${driveNo}, ${sit}: ${rb.n} FUMBLES and ${rec.n} scoops it up and RUNS IT BACK FOR A TOUCHDOWN!` });
              tm[s].top += secs; return { result: "fumbleTD", spot, plays, yds, secs, next: dsd, nextSpot: 25 };
            }
            log.push({ side: dsd, type: "fumble", player: rec.n, victim: rb.n, text: `Drive ${driveNo}, ${sit}: ${rb.n} coughs it up after ${gain} yards and ${rec.n} pounces on the loose ball! That is fumble number ${box[rb.n].fumLost} lost by ${rb.n}.` });
            tm[s].top += secs; return { result: "fumble", spot: spot + Math.max(0, gain), plays, yds, secs, next: dsd, nextSpot: clamp(100 - (spot + Math.max(0, gain)), 1, 70) };
          }
          log.push({ side: s, type: "fumbleRecovered", player: rec.n, victim: rb.n, text: `Drive ${driveNo}, ${sit}: ${rb.n} fumbles but ${rec.n} falls on it for {${s}}. Phew!` });
        }
        if (td) {
          box[rb.n].rushTD++; addScore(s, 6);
          log.push({ side: s, type: "rushTD", player: rb.n, yards: gain, runLine: lineOf(rb.n), text: `Drive ${driveNo}, ${sit}: TOUCHDOWN! ${rb.n} punches it in from ${gain} yards out! ${rb.n}: ${lineOf(rb.n)}.` });
          extraPoint(s, rb, null);
          tm[s].top += secs; return { result: "touchdown", spot: 100, plays, yds, secs, next: dsd, nextSpot: 25 };
        }
        const t = tackle(dsd, 2, 3, 1.2, gain < 0);
        if (gain < 0) log.push({ side: dsd, type: "tfl", player: t.first.n, victim: rb.n, yards: gain, text: `Drive ${driveNo}, ${sit}: TACKLE FOR LOSS! ${t.first.n} meets ${rb.n} in the backfield for ${gain} yards. That is tackle for loss number ${box[t.first.n].tfl} for ${t.first.n}.` });
        else if (gain >= 15) log.push({ side: s, type: "bigRun", player: rb.n, yards: gain, runLine: lineOf(rb.n), text: `Drive ${driveNo}, ${sit}: ${rb.n} rips off ${gain} yards, ${tackleText(t)}. ${rb.n} is up to ${lineOf(rb.n)}.` });
        spot += gain;
        if (gain >= dist) { tm[s].firsts++; down = 1; dist = Math.min(10, 100 - spot); } else { down++; dist -= gain; }
      }
      if (spot <= 0) spot = 1;
      if (down > 4) {
        log.push({ side: dsd, type: "turnoverOnDowns", text: `Drive ${driveNo}: {${s}} goes for it on fourth down and is STOPPED short. Turnover on downs!` });
        tm[s].to++; tm[s].top += secs;
        return { result: "turnoverOnDowns", spot, plays, yds, secs, next: dsd, nextSpot: clamp(100 - spot, 1, 70) };
      }
    }
    tm[s].top += secs;
    return { result: "stalled", spot, plays, yds, secs, next: opp(s), nextSpot: clamp(100 - spot, 1, 70) };
  }

  // catastrophes: a player is knocked out of the game (they stop playing and their score takes the hit)
  const catRoll = (driveNo) => {
    roster.forEach((p) => {
      if (out[p.n]) return;
      if (rnd() < catastropheChance(p, drivesPer * 2) * 0.45) {
        const c = markCatastrophe(box, p, rnd() < 0.5 ? "suffers a devastating injury and is carried off the field" : "is ejected for a flagrant personal foul");
        out[p.n] = true;
        const s = teamA.includes(p) ? "A" : "B";
        log.push({ side: s, type: "catastrophe", player: p.n, pts: c.penalty, text: `DISASTER on drive ${driveNo}: ${p.n} ${c.text}! That costs ${Math.abs(c.penalty)} fantasy points and ${p.n} is done for the day.` });
      }
    });
  };

  let poss = rnd() < 0.5 ? "A" : "B";
  let spot = 25, driveNo = 0;
  for (let d = 0; d < drivesPer * 2; d++) {
    driveNo++;
    catRoll(driveNo);
    const r = startDrive(poss, spot, driveNo);
    const nm = poss;
    log.push({ side: nm, type: "drive", text: `Drive ${driveNo} summary: {${nm}} runs ${r.plays} plays for ${Math.max(0, r.yds)} yards in ${mmss(r.secs)}, and it ends in ${({ touchdown: "a touchdown", fieldgoal: "a field goal", missedFG: "a missed field goal", blockedFG: "a blocked field goal", interception: "an interception", fumble: "a lost fumble", punt: "a punt", safety: "a safety", pickSix: "a pick-six for the defense", fumbleTD: "a fumble returned for a touchdown", puntReturnTD: "a punt returned for a touchdown", blockedPunt: "a blocked punt", stalled: "a stalled drive" })[r.result] || r.result}. Score: {A} ${score.A}, {B} ${score.B}.`, driveNo, score: `${score.A}-${score.B}` });
    poss = r.next; spot = r.nextSpot;
  }
  // overtime if tied
  if (score.A === score.B) {
    const s = rnd() < 0.5 ? "A" : "B";
    const k = side[s].r.Kicker && !out[side[s].r.Kicker.n] ? side[s].r.Kicker : live(side[s].team)[0];
    box[k.n].fgAtt++; box[k.n].fgMade++; addScore(s, 3);
    log.push({ side: s, type: "fgMade", player: k.n, yards: 38, text: `OVERTIME! ${k.n} nails a 38-yard field goal to win it for {${s}}!` });
  }
  roster.forEach((p) => { const b = box[p.n]; b.fp = fbFp(b); });
  finishBox(box, roster);
  roster.forEach((p) => { ["passYd", "rushYd", "recYd"].forEach((k) => (box[p.n][k] = Math.round(box[p.n][k]))); });
  const winnerTeam = score.A > score.B ? "A" : "B";
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  const ts = (s) => [
    { label: "Total yards", value: tm[s].yds }, { label: "Pass yards", value: tm[s].pass }, { label: "Rush yards", value: tm[s].rush },
    { label: "Plays", value: tm[s].plays }, { label: "First downs", value: tm[s].firsts }, { label: "Turnovers", value: tm[s].to }, { label: "Sacks", value: tm[s].sacks },
    { label: "Time of possession", value: mmss(tm[s].top) },
  ];
  return {
    box, log, finalScore: { A: score.A, B: score.B }, gameScore: { A: score.A, B: score.B }, scoreA: fa, scoreB: fb, winnerTeam,
    columns: FB_COLUMNS, teamStats: { A: ts("A"), B: ts("B") }, resultLine: `Final: ${score.A} to ${score.B}`, scoringKey: FB_SCORING,
  };
}

// ============================= GENERIC EVENT ENGINES (action ledger, BER-driven) =============================
// Every scoring action in an event's rules becomes a COLUMN in the box score. Every log line that is called by
// the announcers is created at the same moment the stat is credited, so box score and commentary cannot drift.
// Everybody competes (each player attempts something every round) and everybody banks participation points.
const ORD_WORDS = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"];
function ordinal(n) { return n < ORD_WORDS.length ? ORD_WORDS[n] : n + "th"; }
function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
function sideOfFn(teamA) { const set = new Set(teamA.map((p) => p.n)); return (p) => (set.has(p.n) ? "A" : "B"); }

const LABEL_FIX = {
  "Each game has its own scoring": "Game points",
  "Each event scored individually": "Event points",
  "survival +2 per minute": "Minutes survived",
  "profit +1 per $": "Profit points",
  "Category scores": "Category score",
};
function prepActions(actions) {
  const seen = {};
  const list = actions.map((a) => {
    let l = LABEL_FIX[a.l] || a.l;
    l = l.charAt(0).toUpperCase() + l.slice(1);
    let p = a.p;
    if (a.l === "profit +1 per $") p = 1;
    if (a.l === "survival +2 per minute") p = 2;
    let k = l;
    if (seen[k]) k = l + " (2)";
    seen[k] = true;
    return { k, l, p, raw: a.l };
  });
  const sorted = [...list].sort((a, b) => b.p - a.p);
  const finale = sorted[0];
  const pos = list.filter((a) => a.p > 0 && a !== finale);
  const neg = list.filter((a) => a.p < 0);
  return {
    list, finale, neg, pos,
    common: pos.filter((a) => a.p < 3), mid: pos.filter((a) => a.p >= 3 && a.p < 8), mile: pos.filter((a) => a.p >= 8),
  };
}
function actionColumns(acts, extras) {
  const cols = acts.list.map((a) => ({ k: a.k, label: a.k, tip: `${a.p > 0 ? "+" : ""}${a.p} FP each` }));
  return [...cols, ...(extras || []), { k: "participation", label: "Part.", tip: "Participation credit (every competitor banks 1-3 FP unless catastrophe strikes)" }];
}
function scoringKeyOf(acts) {
  return [...acts.list.map((a) => ({ label: a.k, pts: a.p })), { label: "Participation (everyone who plays)", pts: "1.0-3.0" }, { label: "Catastrophe (KO / DQ / disaster)", pts: "-5 to -14" }];
}
function protoOf(acts, extra) { const o = { ...(extra || {}) }; acts.list.forEach((a) => (o[a.k] = 0)); return o; }
function pickWeighted(arr, wfn) { return weightedPick(arr, wfn); }
function lowFirst(arr) { return pickWeighted(arr, (a) => 1 / (1 + Math.max(0, a.p))); }

function finishGeneric(box, roster, teamA, teamB) {
  finishBox(box, roster);
  const scoreA = fpSum(box, teamA), scoreB = fpSum(box, teamB);
  return { scoreA, scoreB };
}
function crown(box, who, act, n) { bump(box, who.n, act.k, n || 1, act.p * (n || 1)); box[who.n].fp = r1(box[who.n].fp); }
function winnerBySum(scoreA, scoreB) { return scoreA === scoreB ? (rnd() < 0.5 ? "A" : "B") : scoreA > scoreB ? "A" : "B"; }

// ---------------------------------------------------------------- ROUND ENGINE
function simRoundEngine(teamA, teamB, config, duration) {
  const acts = prepActions(config.actions);
  const w = config.weights;
  const roster = [...teamA, ...teamB];
  const sideOf = sideOfFn(teamA);
  const rounds = duration === "short" ? 3 : duration === "long" ? 7 : 5;
  const roundWinAct = acts.pos.find((a) => /win|victory/i.test(a.l));
  const pool = { common: acts.common.filter((a) => a !== roundWinAct), mid: acts.mid.filter((a) => a !== roundWinAct), mile: acts.mile.filter((a) => a !== roundWinAct) };
  if (!pool.common.length && !pool.mid.length && !pool.mile.length) pool.common = [acts.finale];
  const box = newBox(roster, protoOf(acts, { attempts: 0, successes: 0, successPct: 0, bestStreak: 0, rating: 0 }));
  const st = {}; roster.forEach((p) => (st[p.n] = { out: false, streak: 0, perfSum: 0 }));
  const log = [];
  const roundsWon = { A: 0, B: 0 };
  function pickAct(perf) {
    const q = clamp((perf - 7) / 13, 0, 1);
    const buckets = [];
    if (pool.common.length) buckets.push(["c", 6]);
    if (pool.mid.length) buckets.push(["m", 2.5 + q * 3]);
    if (pool.mile.length) buckets.push(["l", 0.4 + q * 2.2]);
    const b = weightedPick(buckets, (x) => x[1])[0];
    const arr = b === "c" ? pool.common : b === "m" ? pool.mid : pool.mile;
    return arr[Math.floor(rnd() * arr.length)];
  }
  const maxLen = Math.max(teamA.length, teamB.length);
  const order = [];
  for (let i = 0; i < maxLen; i++) { if (teamA[i]) order.push(teamA[i]); if (teamB[i]) order.push(teamB[i]); }

  for (let r = 1; r <= rounds; r++) {
    const pts = { A: 0, B: 0 };
    const top = { A: null, B: null };
    order.forEach((p) => {
      const s = st[p.n];
      if (s.out) return;
      const side = sideOf(p), b = box[p.n];
      const perf = finalPerformance(p, w);
      b.attempts++; s.perfSum += perf;
      if (rnd() < catastropheChance(p, rounds)) {
        const c = markCatastrophe(box, p);
        s.out = true; s.streak = 0; pts[side] += c.penalty;
        log.push({ side, round: r, player: p.n, outcome: "catastrophe", pts: c.penalty, type: "catastrophe", text: `Round ${r}: DISASTER — ${p.n} ${c.text}! That costs ${Math.abs(c.penalty)} fantasy points and ${p.n} is done for the day.` });
        return;
      }
      const prob = clamp(0.42 + (perf - 11) / 24, 0.14, 0.93);
      if (rnd() < prob) {
        const act = pickAct(perf);
        const n = bump(box, p.n, act.k, 1, act.p);
        b.successes++; s.streak++; b.bestStreak = Math.max(b.bestStreak, s.streak);
        pts[side] += act.p;
        if (!top[side] || act.p > top[side].p) top[side] = { p: act.p, who: p };
        log.push({ side, round: r, player: p.n, action: act.l, pts: act.p, nth: n, runFp: r1(b.fp), outcome: "success", type: act.l,
          text: `Round ${r}: ${p.n} — ${act.l} (+${act.p})${n > 1 ? `, their ${ordinal(n)} ${act.l.toLowerCase()} of the event` : ""}` });
      } else {
        s.streak = 0;
        if (acts.neg.length && rnd() < 0.35) {
          const ng = acts.neg[Math.floor(rnd() * acts.neg.length)];
          if (Math.abs(ng.p) >= 8) {
            b[ng.k] += 1;
            const c = markCatastrophe(box, p, `suffers a catastrophe: ${ng.l.toLowerCase()}`, Math.abs(ng.p));
            s.out = true; pts[side] += c.penalty;
            log.push({ side, round: r, player: p.n, action: ng.l, pts: c.penalty, outcome: "catastrophe", type: "catastrophe", text: `Round ${r}: DISASTER — ${p.n} ${c.text} (${c.penalty} fantasy points)` });
          } else {
            const n = bump(box, p.n, ng.k, 1, ng.p);
            pts[side] += ng.p;
            log.push({ side, round: r, player: p.n, action: ng.l, pts: ng.p, nth: n, runFp: r1(b.fp), outcome: "mishap", type: ng.l, text: `Round ${r}: ${p.n} — ${ng.l} (${ng.p})` });
          }
        } else {
          log.push({ side, round: r, player: p.n, pts: 0, outcome: "setback", type: "setback", text: `Round ${r}: ${p.n} comes up empty on this attempt` });
        }
      }
    });
    const rw = pts.A === pts.B ? (rnd() < 0.5 ? "A" : "B") : pts.A > pts.B ? "A" : "B";
    roundsWon[rw]++;
    const loser = rw === "A" ? "B" : "A";
    if (roundWinAct) {
      const who = top[rw] ? top[rw].who : weightedPick((rw === "A" ? teamA : teamB).filter((p) => !st[p.n].out).concat(rw === "A" ? teamA : teamB).slice(0, 1), () => 1);
      if (who && !box[who.n].catastrophe) {
        const n = bump(box, who.n, roundWinAct.k, 1, roundWinAct.p);
        log.push({ side: rw, round: r, player: who.n, action: roundWinAct.l, pts: roundWinAct.p, nth: n, runFp: r1(box[who.n].fp), outcome: "roundWin", type: "roundWin", text: `Round ${r} goes to {${rw}} ${pts[rw]} to ${pts[loser]}, and ${who.n} banks ${roundWinAct.l} (+${roundWinAct.p})` });
      }
    } else {
      log.push({ side: rw, round: r, outcome: "roundEnd", type: "roundEnd", text: `End of round ${r}: {${rw}} takes it ${pts[rw]} to ${pts[loser]}` });
    }
  }
  Object.keys(box).forEach((n) => {
    const b = box[n];
    b.successPct = b.attempts ? Math.round((b.successes / b.attempts) * 100) : 0;
    b.rating = b.attempts ? r1(st[n].perfSum / b.attempts) : 0;
  });
  const { scoreA, scoreB } = finishGeneric(box, roster, teamA, teamB);
  const leadSide = winnerBySum(scoreA, scoreB);
  const leadTeam = (leadSide === "A" ? teamA : teamB).filter((p) => !box[p.n].catastrophe);
  const closer = [...(leadTeam.length ? leadTeam : (leadSide === "A" ? teamA : teamB))].sort((a, b) => box[b.n].rating - box[a.n].rating)[0];
  crown(box, closer, acts.finale);
  log.push({ side: leadSide, player: closer.n, action: acts.finale.l, pts: acts.finale.p, runFp: box[closer.n].fp, outcome: "finale", type: "finale", text: `FINISH: ${closer.n} delivers the decisive ${acts.finale.l} (+${acts.finale.p}) to seal it for {${leadSide}}` });
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  return {
    box, log, scoreA: fa, scoreB: fb, winnerTeam: fa === fb ? leadSide : fa > fb ? "A" : "B",
    columns: actionColumns(acts, [{ k: "attempts", label: "Att", tip: "Attempts" }, { k: "successPct", label: "Succ%", tip: "Success rate" }, { k: "bestStreak", label: "Streak", tip: "Longest run of successes" }, { k: "rating", label: "Rtg", tip: "Average performance rating (BER + roll)" }]),
    teamStats: { A: [{ label: "Rounds won", value: roundsWon.A }, { label: "Success rate", value: pct(teamA, box) }], B: [{ label: "Rounds won", value: roundsWon.B }, { label: "Success rate", value: pct(teamB, box) }] },
    resultLine: `Rounds won: ${roundsWon.A} to ${roundsWon.B}`, scoringKey: scoringKeyOf(acts),
  };
}
function pct(team, box) {
  const a = team.reduce((s, p) => s + (box[p.n].attempts || 0), 0), b = team.reduce((s, p) => s + (box[p.n].successes || 0), 0);
  return (a ? Math.round((b / a) * 100) : 0) + "%";
}

// ---------------------------------------------------------------- DUEL ENGINE (head-to-head bouts)
function simDuel(teamA, teamB, config, duration) {
  const acts = prepActions(config.actions);
  const w = config.weights;
  const roster = [...teamA, ...teamB];
  const n = Math.min(teamA.length, teamB.length);
  const bouts = duration === "short" ? 1 : duration === "long" ? 3 : 2;
  const EXCH = 5;
  const byP = (arr) => [...arr].sort((a, b) => b.p - a.p);
  const tourneyAct = byP(acts.pos.filter((a) => /tournament|overall|championship|team (victory|win)/i.test(a.l)))[0] || (/tournament|overall|championship|team (victory|win)/i.test(acts.finale.l) ? acts.finale : null);
  const upsetAct = acts.pos.find((a) => /upset/i.test(a.l));
  const streakAct = acts.pos.find((a) => /streak|clean|perfect|consecutive|sweep/i.test(a.l));
  const specials = [tourneyAct, upsetAct, streakAct].filter(Boolean);
  const allPos = [...acts.pos, acts.finale];
  const restPos = allPos.filter((a) => !specials.includes(a));
  const winLike = byP(restPos.filter((a) => /(match|bout|round|game|set)\s*win|\bwin\b|victory/i.test(a.l)));
  const koLike = byP(restPos.filter((a) => /\bko\b|knockout|checkmate|pinned|ring-out|knockdown|disarm|collapse|takedown/i.test(a.l)));
  const boutWinAct = winLike[0] || koLike[0] || byP(restPos)[0] || acts.finale;
  const koAct = winLike[0] ? koLike.find((a) => a !== boutWinAct) : null;
  let exchPool = restPos.filter((a) => a !== boutWinAct && a !== koAct);
  if (!exchPool.length) exchPool = restPos.length ? restPos : [acts.finale];
  const box = newBox(roster, protoOf(acts, { boutsW: 0, boutsL: 0, exchW: 0, margin: 0, rating: 0, attempts: 0 }));
  const out = {};
  const log = [];
  const sideOf = sideOfFn(teamA);
  const berOf = (p) => computeBER(p, w);
  let winsA = 0, winsB = 0;
  const margins = {}; roster.forEach((p) => (margins[p.n] = 0));
  const perfSum = {}; roster.forEach((p) => (perfSum[p.n] = 0));
  const attempts = {}; roster.forEach((p) => (attempts[p.n] = 0));
  for (let bo = 1; bo <= bouts; bo++) {
    for (let i = 0; i < n; i++) {
      const a = teamA[i], d = teamB[i];
      if (out[a.n] || out[d.n]) continue;
      let ea = 0, ed = 0, sumA = 0, sumD = 0, forfeit = null;
      for (let e = 1; e <= EXCH && !forfeit; e++) {
        const pa = finalPerformance(a, w), pd = finalPerformance(d, w);
        sumA += pa; sumD += pd; perfSum[a.n] += pa; perfSum[d.n] += pd; attempts[a.n]++; attempts[d.n]++;
        [[a, d], [d, a]].forEach(([x, y]) => {
          if (forfeit) return;
          if (rnd() < catastropheChance(x, bouts * EXCH)) {
            const c = markCatastrophe(box, x);
            out[x.n] = true; forfeit = x;
            log.push({ side: sideOf(x), bout: bo, matchup: i + 1, player: x.n, victim: y.n, outcome: "catastrophe", type: "catastrophe", text: `Bout ${bo}, matchup ${i + 1}: DISASTER — ${x.n} ${c.text}! ${y.n} wins by forfeit (${x.n} loses ${Math.abs(c.penalty)} fantasy points).` });
          }
        });
        if (forfeit) break;
        const winP = pa >= pd ? a : d, loseP = pa >= pd ? d : a;
        if (pa >= pd) ea++; else ed++;
        const bigMargin = Math.abs(pa - pd) > 6;
        let act = bigMargin && acts.mile.some((m) => exchPool.includes(m)) && rnd() < 0.5 ? weightedPick(acts.mile.filter((m) => exchPool.includes(m)), () => 1) : lowFirst(exchPool);
        if (act.p > 4 && rnd() > Math.max(0.2, 4 / act.p)) act = lowFirst(exchPool);
        const cnt = bump(box, winP.n, act.k, 1, act.p);
        box[winP.n].exchW++;
        log.push({ side: sideOf(winP), bout: bo, matchup: i + 1, exchange: e, player: winP.n, victim: loseP.n, action: act.l, pts: act.p, nth: cnt, runFp: r1(box[winP.n].fp), outcome: "success", type: act.l,
          text: `Bout ${bo}, matchup ${i + 1}, exchange ${e}: ${winP.n} lands ${act.l} (+${act.p}) against ${loseP.n}${cnt > 1 ? `, their ${ordinal(cnt)} of the event` : ""}` });
        if (acts.neg.length && rnd() < 0.06) {
          const ng = acts.neg[Math.floor(rnd() * acts.neg.length)];
          if (Math.abs(ng.p) >= 8) {
            box[loseP.n][ng.k] += 1;
            const c = markCatastrophe(box, loseP, `suffers a catastrophe: ${ng.l.toLowerCase()}`, Math.abs(ng.p));
            out[loseP.n] = true; forfeit = loseP;
            log.push({ side: sideOf(loseP), bout: bo, matchup: i + 1, player: loseP.n, victim: winP.n, action: ng.l, pts: c.penalty, outcome: "catastrophe", type: "catastrophe", text: `Bout ${bo}, matchup ${i + 1}: DISASTER — ${loseP.n} ${c.text} (${c.penalty} fantasy points), handing the bout to ${winP.n}` });
          } else {
            const cn = bump(box, loseP.n, ng.k, 1, ng.p);
            log.push({ side: sideOf(loseP), bout: bo, matchup: i + 1, player: loseP.n, action: ng.l, pts: ng.p, nth: cn, runFp: r1(box[loseP.n].fp), outcome: "mishap", type: ng.l, text: `${loseP.n} commits a ${ng.l.toLowerCase()} (${ng.p})` });
          }
        }
      }
      let winner, loser, ew, el;
      if (forfeit) { loser = forfeit; winner = forfeit === a ? d : a; }
      else if (ea !== ed) { winner = ea > ed ? a : d; loser = winner === a ? d : a; }
      else { winner = sumA >= sumD ? a : d; loser = winner === a ? d : a; }
      ew = winner === a ? ea : ed; el = winner === a ? ed : ea;
      const margin = (winner === a ? sumA - sumD : sumD - sumA) / EXCH;
      if (sideOf(winner) === "A") winsA++; else winsB++;
      box[winner.n].boutsW++; box[loser.n].boutsL++;
      margins[winner.n] += margin; margins[loser.n] -= margin;
      bump(box, winner.n, boutWinAct.k, 1, boutWinAct.p);
      const extrasPaid = [];
      if (koAct && !forfeit && ew >= EXCH - 1) { bump(box, winner.n, koAct.k, 1, koAct.p); extrasPaid.push(`${koAct.l} (+${koAct.p})`); }
      if (streakAct && !forfeit && el === 0) { bump(box, winner.n, streakAct.k, 1, streakAct.p); extrasPaid.push(`${streakAct.l} (+${streakAct.p})`); }
      if (upsetAct && berOf(winner) < berOf(loser) - 1) { bump(box, winner.n, upsetAct.k, 1, upsetAct.p); extrasPaid.push(`${upsetAct.l} (+${upsetAct.p})`); }
      log.push({ side: sideOf(winner), bout: bo, matchup: i + 1, player: winner.n, victim: loser.n, action: boutWinAct.l, pts: boutWinAct.p, runFp: r1(box[winner.n].fp), outcome: "boutWin", type: "boutWin",
        text: `Bout ${bo}, matchup ${i + 1} final: ${winner.n} defeats ${loser.n} ${forfeit ? "by forfeit" : ew + " exchanges to " + el} and earns ${boutWinAct.l} (+${boutWinAct.p})${extrasPaid.length ? ", plus " + extrasPaid.join(" and ") : ""}` });
    }
  }
  roster.forEach((p) => {
    const b = box[p.n];
    b.attempts = attempts[p.n];
    b.rating = attempts[p.n] ? r1(perfSum[p.n] / attempts[p.n]) : 0;
    b.margin = r1(margins[p.n] / Math.max(1, b.boutsW + b.boutsL));
  });
  const { scoreA, scoreB } = finishGeneric(box, roster, teamA, teamB);
  let leadSide = winnerBySum(scoreA, scoreB);
  if (tourneyAct) {
    const leadTeam = (leadSide === "A" ? teamA : teamB).filter((p) => !box[p.n].catastrophe);
    const champ = [...(leadTeam.length ? leadTeam : (leadSide === "A" ? teamA : teamB))].sort((x, y) => (box[y.n].boutsW - box[x.n].boutsW) || (box[y.n].fp - box[x.n].fp))[0];
    crown(box, champ, tourneyAct);
    log.push({ side: leadSide, player: champ.n, action: tourneyAct.l, pts: tourneyAct.p, runFp: box[champ.n].fp, outcome: "finale", type: "finale", text: `CHAMPION: ${champ.n} takes the ${tourneyAct.l} (+${tourneyAct.p}) for {${leadSide}}` });
  } else log.push({ side: leadSide, outcome: "finale", type: "finale", text: `That is the last bout. {${leadSide}} takes it.` });
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  return {
    box, log, scoreA: fa, scoreB: fb, winnerTeam: fa === fb ? leadSide : fa > fb ? "A" : "B",
    columns: actionColumns(acts, [{ k: "boutsW", label: "W", tip: "Bouts won" }, { k: "boutsL", label: "L", tip: "Bouts lost" }, { k: "exchW", label: "Exch", tip: "Individual exchanges won" }, { k: "margin", label: "Margin", tip: "Average performance margin per bout (+ means dominant)" }, { k: "rating", label: "Rtg", tip: "Average performance rating" }]),
    teamStats: { A: [{ label: "Bouts won", value: winsA }], B: [{ label: "Bouts won", value: winsB }] },
    resultLine: `Bouts won: ${winsA} to ${winsB}`, scoringKey: scoringKeyOf(acts),
  };
}

// ---------------------------------------------------------------- RACE ENGINE (everyone on one course)
function simRace(teamA, teamB, config, duration) {
  const acts = prepActions(config.actions);
  const w = config.weights;
  const roster = [...teamA, ...teamB];
  const sideOf = sideOfFn(teamA);
  const stages = duration === "short" ? 3 : duration === "long" ? 6 : 4;
  const fin = acts.finale;
  const scope = /team (win|victory)/i.test(fin.l) ? "team" : /(win|victory|first|champion|overall)/i.test(fin.l) ? "winner" : "each";
  const find = (re) => acts.pos.find((a) => re.test(a.l));
  const passAct = find(/overtake|position gained|passed/i);
  const fastAct = find(/fastest/i);
  const stageWinAct = find(/(event|leg|stage|heat) (win|won)|event won/i);
  const pbAct = find(/personal best/i);
  const distAct = find(/^distance/i);
  const specials = [passAct, fastAct, stageWinAct, pbAct, distAct].filter(Boolean);
  let stepActs = acts.pos.filter((a) => !specials.includes(a));
  if (!stepActs.length) stepActs = distAct ? [distAct] : [fin];
  const box = newBox(roster, protoOf(acts, { place: 0, gained: 0, bestLeg: 0, rating: 0, stagesDone: 0 }));
  const cum = {}, dnf = {}, perfSum = {}, best = {};
  roster.forEach((p) => { cum[p.n] = 0; dnf[p.n] = false; perfSum[p.n] = 0; best[p.n] = -99; });
  const log = [];
  let prevRank = {};
  roster.forEach((p, i) => (prevRank[p.n] = i + 1));
  for (let s = 1; s <= stages; s++) {
    const stagePerf = {};
    roster.forEach((p) => {
      if (dnf[p.n]) return;
      const perf = finalPerformance(p, w);
      stagePerf[p.n] = perf; perfSum[p.n] += perf; best[p.n] = Math.max(best[p.n], perf);
      if (rnd() < catastropheChance(p, stages)) {
        const c = markCatastrophe(box, p);
        dnf[p.n] = true;
        log.push({ side: sideOf(p), stage: s, player: p.n, outcome: "catastrophe", type: "catastrophe", pts: c.penalty, text: `Stage ${s}: DISASTER — ${p.n} ${c.text} and is out of the race (${c.penalty} fantasy points)` });
        return;
      }
      let mishap = false;
      if (acts.neg.length && perf < 8.5 && rnd() < 0.35) {
        const ng = acts.neg[Math.floor(rnd() * acts.neg.length)];
        if (Math.abs(ng.p) >= 8) {
          box[p.n][ng.k] += 1;
          const c = markCatastrophe(box, p, `suffers a catastrophe: ${ng.l.toLowerCase()}`, Math.abs(ng.p));
          dnf[p.n] = true;
          log.push({ side: sideOf(p), stage: s, player: p.n, action: ng.l, outcome: "catastrophe", type: "catastrophe", pts: c.penalty, text: `Stage ${s}: DISASTER — ${p.n} ${c.text} (${c.penalty} fantasy points) and is out of the race` });
          return;
        }
        const cn = bump(box, p.n, ng.k, 1, ng.p);
        mishap = true; stagePerf[p.n] -= 3;
        log.push({ side: sideOf(p), stage: s, player: p.n, action: ng.l, pts: ng.p, nth: cn, runFp: r1(box[p.n].fp), outcome: "mishap", type: ng.l, text: `Stage ${s}: ${p.n} suffers a ${ng.l.toLowerCase()} (${ng.p})` });
      }
      cum[p.n] += stagePerf[p.n];
      if (!mishap || perf > 6) {
        const act = perf > 15 && stepActs.length > 1 ? weightedPick(stepActs, (a) => 1 + a.p) : lowFirst(stepActs);
        const cn = bump(box, p.n, act.k, 1, act.p); box[p.n].stagesDone++;
        if (stageWinAct == null || perf > 12 || rnd() < 0.2) log.push({ side: sideOf(p), stage: s, player: p.n, action: act.l, pts: act.p, nth: cn, runFp: r1(box[p.n].fp), outcome: "success", type: act.l, text: `Stage ${s}: ${p.n} — ${act.l} (+${act.p})${cn > 1 ? `, ${ordinal(cn)} of the race` : ""}` });
      }
      if (distAct) { const u = Math.max(1, Math.round(perf / 3)); bump(box, p.n, distAct.k, u, distAct.p * u); }
      if (pbAct && perfSum[p.n] / s + 3 < perf && s > 1) { bump(box, p.n, pbAct.k, 1, pbAct.p); log.push({ side: sideOf(p), stage: s, player: p.n, action: pbAct.l, pts: pbAct.p, outcome: "success", type: pbAct.l, text: `Stage ${s}: ${p.n} sets a ${pbAct.l.toLowerCase()} (+${pbAct.p})` }); }
    });
    const alive = roster.filter((p) => !dnf[p.n]).sort((a, b) => cum[b.n] - cum[a.n]);
    const rank = {}; alive.forEach((p, i) => (rank[p.n] = i + 1));
    if (stageWinAct && alive.length) {
      const sw = [...alive].sort((a, b) => (stagePerf[b.n] || -99) - (stagePerf[a.n] || -99))[0];
      bump(box, sw.n, stageWinAct.k, 1, stageWinAct.p);
      log.push({ side: sideOf(sw), stage: s, player: sw.n, action: stageWinAct.l, pts: stageWinAct.p, runFp: r1(box[sw.n].fp), outcome: "stageWin", type: "stageWin", text: `Stage ${s}: ${sw.n} wins the stage (${stageWinAct.l} +${stageWinAct.p})` });
    }
    alive.forEach((p) => {
      const g = Math.max(0, prevRank[p.n] - rank[p.n]);
      if (s > 1 && g > 0) {
        const credited = Math.min(g, 3);
        box[p.n].gained += g;
        if (passAct) bump(box, p.n, passAct.k, credited, passAct.p * credited);
        if (g >= 2) log.push({ side: sideOf(p), stage: s, player: p.n, gained: g, rank: rank[p.n], action: passAct ? passAct.l : "moves up", pts: passAct ? passAct.p * credited : 0, runFp: r1(box[p.n].fp), outcome: "pass", type: "pass", text: `Stage ${s}: ${p.n} charges up ${g} positions to ${ordinal(rank[p.n])} place${passAct ? ` (${passAct.l} x${credited}, +${passAct.p * credited})` : ""}` });
      }
    });
    prevRank = { ...prevRank, ...rank };
    if (alive.length) log.push({ side: sideOf(alive[0]), stage: s, player: alive[0].n, outcome: "leader", type: "leader", text: `After stage ${s}, ${alive[0].n} leads the field, with ${alive[1] ? alive[1].n : "nobody"} right behind` });
  }
  const finishers = roster.filter((p) => !dnf[p.n]).sort((a, b) => cum[b.n] - cum[a.n]);
  const finishOrder = [...finishers, ...roster.filter((p) => dnf[p.n])];
  finishOrder.forEach((p, i) => { box[p.n].place = dnf[p.n] ? 0 : i + 1; box[p.n].bestLeg = r1(best[p.n] < -50 ? 0 : best[p.n]); box[p.n].rating = r1(perfSum[p.n] / stages); });
  if (fastAct && finishers.length) {
    const useTotal = /time/i.test(fastAct.l) && !/lap|leg/i.test(fastAct.l);
    const f = useTotal ? finishers[0] : [...finishers].sort((a, b) => best[b.n] - best[a.n])[0];
    bump(box, f.n, fastAct.k, 1, fastAct.p);
    log.push({ side: sideOf(f), player: f.n, action: fastAct.l, pts: fastAct.p, runFp: r1(box[f.n].fp), outcome: "fastest", type: "fastest", text: `${f.n} posts the ${fastAct.l.toLowerCase()} (+${fastAct.p})` });
  }
  let teamWinSide = null;
  if (scope === "team") {
    const ta = teamA.reduce((s, p) => s + cum[p.n], 0), tb = teamB.reduce((s, p) => s + cum[p.n], 0);
    teamWinSide = ta >= tb ? "A" : "B";
    (teamWinSide === "A" ? teamA : teamB).filter((p) => !dnf[p.n]).forEach((p) => bump(box, p.n, fin.k, 1, fin.p));
    log.push({ side: teamWinSide, outcome: "finale", type: "finale", text: `The final totals are in: {${teamWinSide}} wins the ${fin.l.toLowerCase()} and every finisher on the team banks +${fin.p}` });
  } else if (scope === "winner") {
    const wnr = finishers[0];
    if (wnr) { bump(box, wnr.n, fin.k, 1, fin.p); log.push({ side: sideOf(wnr), player: wnr.n, action: fin.l, pts: fin.p, runFp: r1(box[wnr.n].fp), outcome: "finale", type: "finale", text: `${wnr.n} takes the checkered flag and the ${fin.l.toLowerCase()} (+${fin.p})` }); }
  } else {
    finishers.forEach((p, i) => bump(box, p.n, fin.k, 1, fin.p));
    finishOrder.slice(0, 3).forEach((p, i) => { if (!dnf[p.n]) log.push({ side: sideOf(p), player: p.n, place: i + 1, runFp: r1(box[p.n].fp), outcome: "finish", type: "finish", text: `${p.n} crosses the line in ${ordinal(i + 1)} place (${fin.l} +${fin.p})` }); });
  }
  finishGeneric(box, roster, teamA, teamB);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  const fin1 = finishers[0];
  return {
    box, log, scoreA: fa, scoreB: fb, winnerTeam: fa === fb ? (fin1 ? sideOf(fin1) : "A") : fa > fb ? "A" : "B", finishOrder: finishOrder.map((p) => p.n),
    columns: actionColumns(acts, [{ k: "place", label: "Place", tip: "Finishing position (0 = did not finish)" }, { k: "gained", label: "Pos+", tip: "Positions gained on the course" }, { k: "bestLeg", label: "Best leg", tip: "Best single-stage performance" }, { k: "rating", label: "Rtg", tip: "Average stage performance" }]),
    teamStats: { A: [{ label: "Finishers", value: teamA.filter((p) => !dnf[p.n]).length + "/" + teamA.length }, { label: "Best place", value: Math.min(...teamA.map((p) => box[p.n].place || 99)) === 99 ? "—" : Math.min(...teamA.map((p) => box[p.n].place || 99)) }], B: [{ label: "Finishers", value: teamB.filter((p) => !dnf[p.n]).length + "/" + teamB.length }, { label: "Best place", value: Math.min(...teamB.map((p) => box[p.n].place || 99)) === 99 ? "—" : Math.min(...teamB.map((p) => box[p.n].place || 99)) }] },
    resultLine: fin1 ? `Winner of the race: ${fin1.n}` : "No finishers", scoringKey: scoringKeyOf(acts),
  };
}

// ---------------------------------------------------------------- BATTLEFIELD ENGINE (team combat, enemies only)
function simBattlefieldGeneric(teamA, teamB, config, duration) {
  const acts = prepActions(config.actions);
  const w = config.weights;
  const roster = [...teamA, ...teamB];
  const sideOf = sideOfFn(teamA);
  const rounds = duration === "short" ? 6 : duration === "long" ? 14 : 9;
  const find = (re) => acts.pos.find((a) => re.test(a.l));
  const fin = acts.finale;
  const placeActs = acts.pos.filter((a) => /final (\d+)|top (\d+)/i.test(a.l));
  const elimAct = acts.pos.find((a) => /elimin|ko\b|destroyed|defeated|ring-out|knock/i.test(a.l) && !placeActs.includes(a) && a.p >= 5) || null;
  const critAct = acts.pos.find((a) => /critical|weapon hit|disabled|immobil|disarm|component|collision/i.test(a.l) && a !== elimAct);
  const assistAct = find(/assist/i);
  const survAct = find(/surviv|evasion|evade|streak/i);
  const objAct = find(/objective|flag capture/i);
  const dmgAct = acts.pos.filter((a) => /damage|^hit|enemy hit|enemy defeated|strike/i.test(a.l) && a !== elimAct && a !== critAct)[0];
  const specials = [elimAct, critAct, assistAct, survAct, objAct, dmgAct, ...placeActs].filter(Boolean);
  const finScope = /survivor/i.test(fin.l) ? "last" : "each";
  const winActs = [fin];
  const leftovers = acts.pos.filter((a) => !specials.includes(a) && a !== fin);
  const box = newBox(roster, protoOf(acts, { dmgDealt: 0, dmgTaken: 0, elims: 0, assists: 0, roundOut: 0, hpLeft: 0 }));
  const hp = {}, alive = {}, lastHitBy = {};
  roster.forEach((p) => { hp[p.n] = 60 + p.co * 3; alive[p.n] = true; lastHitBy[p.n] = []; });
  const log = [];
  const elimOrder = [];
  function livingOf(side) { return roster.filter((p) => alive[p.n] && sideOf(p) === side); }
  for (let r = 1; r <= rounds; r++) {
    const attackers = roster.filter((p) => alive[p.n]).sort(() => rnd() - 0.5);
    attackers.forEach((att) => {
      if (!alive[att.n]) return;
      const enemies = livingOf(sideOf(att) === "A" ? "B" : "A");
      if (!enemies.length) return;
      const b = box[att.n];
      const perf = finalPerformance(att, w);
      if (rnd() < catastropheChance(att, rounds)) {
        const c = markCatastrophe(box, att, "is taken out by a freak self-inflicted disaster");
        alive[att.n] = false; b.roundOut = r; elimOrder.push(att.n);
        log.push({ side: sideOf(att), round: r, player: att.n, outcome: "catastrophe", type: "catastrophe", pts: c.penalty, text: `Round ${r}: DISASTER — ${att.n} ${c.text} (${c.penalty} fantasy points)` });
        return;
      }
      const target = weightedPick(enemies, (t) => 1 / (Math.max(1, hp[t.n]) * 0.02 + finalPerformance(t, w) * 0.1 + 1));
      const tperf = finalPerformance(target, w);
      const hit = rnd() < clamp(0.62 + (perf - tperf) / 30, 0.25, 0.92);
      if (!hit) {
        if (survAct && rnd() < 0.5) { const n = bump(box, target.n, survAct.k, 1, survAct.p); log.push({ side: sideOf(target), round: r, player: target.n, victim: att.n, action: survAct.l, pts: survAct.p, nth: n, runFp: r1(box[target.n].fp), outcome: "success", type: survAct.l, text: `Round ${r}: ${target.n} evades ${att.n}'s attack (${survAct.l} +${survAct.p})` }); }
        return;
      }
      const dmg = Math.max(4, Math.round((perf * 1.9 - tperf * 0.5 + rnd() * 10) * 1.0));
      hp[target.n] -= dmg; b.dmgDealt += dmg; box[target.n].dmgTaken += dmg;
      lastHitBy[target.n].push({ n: att.n, r });
      let pts = 0;
      if (dmgAct) { pts += dmgAct.p; bump(box, att.n, dmgAct.k, 1, dmgAct.p); }
      const crit = critAct && dmg > 26 && rnd() < 0.7;
      if (crit) { bump(box, att.n, critAct.k, 1, critAct.p); pts += critAct.p; }
      if (!alive[target.n] || hp[target.n] > 0) {
        if (dmg >= 18 || crit) log.push({ side: sideOf(att), round: r, player: att.n, victim: target.n, damage: dmg, action: crit ? critAct.l : (dmgAct ? dmgAct.l : "hit"), pts, runFp: r1(b.fp), outcome: "hit", type: "hit", text: `Round ${r}: ${att.n} hits ${target.n} for ${dmg} damage${crit ? ` — ${critAct.l} (+${critAct.p})` : ""}; ${target.n} has ${Math.max(0, Math.round(hp[target.n]))} left` });
        return;
      }
      alive[target.n] = false; box[target.n].roundOut = r; elimOrder.push(target.n);
      b.elims++;
      let elimPts = 0;
      if (elimAct) { bump(box, att.n, elimAct.k, 1, elimAct.p); elimPts = elimAct.p; }
      const helpers = [...new Set(lastHitBy[target.n].filter((h) => h.n !== att.n && r - h.r <= 2 && alive[h.n]).map((h) => h.n))];
      let helperText = "";
      if (helpers.length) { const h = helpers[0]; box[h].assists++; if (assistAct) bump(box, h, assistAct.k, 1, assistAct.p); helperText = `, with ${h} credited for the assist${assistAct ? ` (+${assistAct.p})` : ""}`; }
      log.push({ side: sideOf(att), round: r, player: att.n, victim: target.n, damage: dmg, action: elimAct ? elimAct.l : "elimination", pts: pts + elimPts, runFp: r1(b.fp), nth: b.elims, outcome: "elimination", type: "elimination",
        text: `Round ${r}: ${att.n} finishes off ${target.n} (${elimAct ? elimAct.l + " +" + elimAct.p : "eliminated"})${helperText}${b.elims > 1 ? `. That is elimination number ${b.elims} for ${att.n}` : ""}` });
    });
    if (objAct && rnd() < 0.5) {
      const living = roster.filter((p) => alive[p.n]);
      if (living.length) {
        const who = weightedPick(living, (p) => p.wi + p.it + p.dx + 2);
        const n = bump(box, who.n, objAct.k, 1, objAct.p);
        log.push({ side: sideOf(who), round: r, player: who.n, action: objAct.l, pts: objAct.p, nth: n, runFp: r1(box[who.n].fp), outcome: "success", type: objAct.l, text: `Round ${r}: ${who.n} completes the ${objAct.l.toLowerCase()} (+${objAct.p})` });
      }
    }
    if (survAct && /surviv/i.test(survAct.l) && r % 3 === 0) {
      roster.filter((p) => alive[p.n]).forEach((p) => bump(box, p.n, survAct.k, 1, survAct.p));
    }
    if (livingOf("A").length === 0 || livingOf("B").length === 0) break;
  }
  const aliveA = livingOf("A"), aliveB = livingOf("B");
  const hpA = aliveA.reduce((s, p) => s + hp[p.n], 0), hpB = aliveB.reduce((s, p) => s + hp[p.n], 0);
  const winSide = aliveA.length === 0 ? "B" : aliveB.length === 0 ? "A" : (aliveA.length !== aliveB.length ? (aliveA.length > aliveB.length ? "A" : "B") : (hpA >= hpB ? "A" : "B"));
  const survivors = roster.filter((p) => alive[p.n]);
  const finishOrder = [...survivors.sort((a, b) => hp[b.n] - hp[a.n]).map((p) => p.n), ...[...elimOrder].reverse()];
  placeActs.forEach((pa) => {
    const m = pa.l.match(/(\d+)/); const N = m ? parseInt(m[1], 10) : 5;
    finishOrder.slice(0, N).forEach((nm) => { bump(box, nm, pa.k, 1, pa.p); });
    log.push({ side: sideOf(roster.find((p) => p.n === finishOrder[0])), outcome: "placement", type: "placement", text: `${pa.l}: ${finishOrder.slice(0, N).join(", ")} bank +${pa.p} each` });
  });
  roster.forEach((p) => { box[p.n].hpLeft = alive[p.n] ? Math.round(hp[p.n]) : 0; });
  const { scoreA, scoreB } = finishGeneric(box, roster, teamA, teamB);
  // victory payoff
  const winners = (winSide === "A" ? aliveA : aliveB);
  if (finScope === "last") {
    const lastP = finishOrder[0] ? roster.find((p) => p.n === finishOrder[0]) : null;
    if (lastP) { crown(box, lastP, fin); log.push({ side: sideOf(lastP), player: lastP.n, action: fin.l, pts: fin.p, runFp: box[lastP.n].fp, outcome: "finale", type: "finale", text: `${lastP.n} is the last one standing (${fin.l} +${fin.p})` }); }
  } else {
    winners.forEach((p) => crown(box, p, fin));
    log.push({ side: winSide, outcome: "finale", type: "finale", text: `{${winSide}} wins it with ${winners.length} left standing, and each survivor earns ${fin.l} (+${fin.p})` });
  }
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  const cols = actionColumns(acts, [{ k: "dmgDealt", label: "Dmg+", tip: "Damage dealt" }, { k: "dmgTaken", label: "Dmg-", tip: "Damage taken" }, { k: "elims", label: "Elims", tip: "Enemies eliminated" }, { k: "assists", label: "Ast", tip: "Assists on eliminations" }, { k: "roundOut", label: "Out rd", tip: "Round eliminated (0 = survived)" }, { k: "hpLeft", label: "HP left", tip: "Health remaining at the end" }]);
  return {
    box, log, scoreA: fa, scoreB: fb, winnerTeam: winSide, finishOrder, champion: finishOrder[0],
    columns: elimAct ? cols.filter((c) => c.k !== "elims") : cols,
    teamStats: { A: [{ label: "Survivors", value: aliveA.length + "/" + teamA.length }, { label: "Damage dealt", value: teamA.reduce((s, p) => s + box[p.n].dmgDealt, 0) }], B: [{ label: "Survivors", value: aliveB.length + "/" + teamB.length }, { label: "Damage dealt", value: teamB.reduce((s, p) => s + box[p.n].dmgDealt, 0) }] },
    resultLine: `Survivors: ${aliveA.length} to ${aliveB.length}`, scoringKey: scoringKeyOf(acts),
  };
}

// ---------------------------------------------------------------- BOXSCORE ENGINE (team sports)
const SPORT_SCORING = {
  "Soccer": { Goal: 1 },
  "Baseball": { Run: 1, HR: 1 },
  "Cricket": { Run: 1, Boundary: 4, Six: 6 },
  "Beach Volleyball": { Ace: 1, Kill: 1, Block: 1 },
};
function simBoxscoreGeneric(teamA, teamB, config, duration, eventName) {
  const acts = prepActions(config.actions);
  const w = config.weights;
  const roster = [...teamA, ...teamB];
  const sideOf = sideOfFn(teamA);
  const plays = duration === "short" ? 28 : duration === "long" ? 64 : 44;
  const scoring = SPORT_SCORING[eventName] || null;
  const all = [...acts.pos, acts.finale];
  const defRe = /tackle|interception|save|dig|block|catch|pitched strikeout|wicket|run-out/i;
  const teamRe = /team win|winning point|clean sheet/i;
  const assistAct = all.find((a) => /^assist/i.test(a.l));
  const defActs = all.filter((a) => defRe.test(a.l) && !(scoring && scoring[a.l.replace(/^./, (c) => c.toUpperCase())]));
  const teamActs = all.filter((a) => teamRe.test(a.l));
  const offActs = all.filter((a) => !defActs.includes(a) && !teamActs.includes(a) && a !== assistAct);
  const offPool = offActs.length ? offActs : all;
  const box = newBox(roster, protoOf(acts, { plays: 0, hits: 0, hitPct: 0, rating: 0 }));
  const gs = { A: 0, B: 0 };
  const log = [];
  const idx = { A: 0, B: 0 };
  const perfSum = {}; roster.forEach((p) => (perfSum[p.n] = 0));
  const outP = {};
  for (let i = 0; i < plays; i++) {
    const side = i % 2 === 0 ? "A" : "B";
    const off = (side === "A" ? teamA : teamB).filter((p) => !outP[p.n]);
    const def = (side === "A" ? teamB : teamA).filter((p) => !outP[p.n]);
    if (!off.length || !def.length) break;
    const actor = rnd() < 0.6 ? off[idx[side]++ % off.length] : weightedPick(off, (p) => Math.max(0.1, finalPerformance(p, w) + 10));
    const defender = weightedPick(def, (p) => Math.max(0.1, finalPerformance(p, w) + 10));
    const perf = finalPerformance(actor, w), dperf = finalPerformance(defender, w);
    const b = box[actor.n]; b.plays++; perfSum[actor.n] += perf;
    if (rnd() < catastropheChance(actor, plays / 2)) {
      const c = markCatastrophe(box, actor);
      outP[actor.n] = true;
      log.push({ side, player: actor.n, outcome: "catastrophe", type: "catastrophe", pts: c.penalty, text: `Play ${i + 1}: DISASTER — ${actor.n} ${c.text} (${c.penalty} fantasy points)` });
      continue;
    }
    const success = rnd() < clamp(0.42 + (perf - dperf) / 28 + (perf - 11) / 60, 0.15, 0.85);
    if (success) {
      const q = clamp((perf - 8) / 12, 0, 1);
      const roll = rnd();
      const sorted = [...offPool].sort((a, c) => a.p - c.p);
      const idxPick = roll < 0.62 - q * 0.2 ? 0 : roll < 0.92 - q * 0.1 ? Math.floor(sorted.length / 2) : sorted.length - 1;
      const act = sorted[Math.min(idxPick, sorted.length - 1)] || acts.finale;
      const nth = bump(box, actor.n, act.k, 1, act.p);
      b.hits++;
      let assistTxt = "";
      if (assistAct && act.p >= 3 && rnd() < 0.75) {
        const mates = off.filter((p) => p.n !== actor.n);
        if (mates.length) { const m = weightedPick(mates, (p) => p.wi + p.it + 2); bump(box, m.n, assistAct.k, 1, assistAct.p); assistTxt = `, set up by ${m.n} (${assistAct.l} +${assistAct.p})`; }
      }
      let scored = 0;
      if (scoring) { const key = Object.keys(scoring).find((k) => k.toLowerCase() === act.l.toLowerCase()); if (key) { scored = scoring[key]; gs[side] += scored; } if (/^hr$/i.test(act.l)) { /* home run also scores */ } }
      log.push({ side, play: i + 1, player: actor.n, action: act.l, pts: act.p, nth, runFp: r1(b.fp), scored, gameScore: scoring ? `${gs.A}-${gs.B}` : undefined, outcome: "success", type: act.l,
        text: `Play ${i + 1}: ${actor.n} — ${act.l} (+${act.p})${assistTxt}${nth > 1 ? `, their ${ordinal(nth)} ${act.l.toLowerCase()}` : ""}${scoring && scored ? `. It is now {A} ${gs.A}, {B} ${gs.B}`.replace("{A}", "{A}") : ""}` });
    } else {
      let did = false;
      if (defActs.length && rnd() < 0.7) {
        const da = lowFirst(defActs);
        const n = bump(box, defender.n, da.k, 1, da.p); box[defender.n].plays++; box[defender.n].hits++;
        did = true;
        log.push({ side: side === "A" ? "B" : "A", play: i + 1, player: defender.n, victim: actor.n, action: da.l, pts: da.p, nth: n, runFp: r1(box[defender.n].fp), outcome: "defense", type: da.l, text: `Play ${i + 1}: ${defender.n} shuts down ${actor.n} with a ${da.l.toLowerCase()} (+${da.p})${n > 1 ? `, their ${ordinal(n)}` : ""}` });
      }
      if (!did && acts.neg.length && rnd() < 0.45) {
        const ng = acts.neg[Math.floor(rnd() * acts.neg.length)];
        const n = bump(box, actor.n, ng.k, 1, ng.p);
        log.push({ side, play: i + 1, player: actor.n, action: ng.l, pts: ng.p, nth: n, runFp: r1(b.fp), outcome: "mishap", type: ng.l, text: `Play ${i + 1}: ${actor.n} — ${ng.l} (${ng.p})` });
      }
    }
  }
  roster.forEach((p) => { const b = box[p.n]; b.hitPct = b.plays ? Math.round((b.hits / b.plays) * 100) : 0; b.rating = b.plays ? r1(perfSum[p.n] / b.plays) : 0; });
  let winSide;
  if (scoring) winSide = gs.A === gs.B ? null : gs.A > gs.B ? "A" : "B";
  const { scoreA: pa0, scoreB: pb0 } = finishGeneric(box, roster, teamA, teamB);
  if (!winSide) winSide = winnerBySum(pa0, pb0);
  teamActs.forEach((ta) => {
    if (/clean sheet/i.test(ta.l)) {
      [["A", teamA, gs.B], ["B", teamB, gs.A]].forEach(([s, team, conceded]) => {
        if (conceded === 0) {
          [...team].sort((a, b) => b.co - a.co).slice(0, 4).forEach((p) => { if (!box[p.n].catastrophe) crown(box, p, ta); });
          log.push({ side: s, outcome: "cleanSheet", type: "cleanSheet", text: `{${s}} keeps a clean sheet; the back four bank ${ta.l} (+${ta.p})` });
        }
      });
    } else (winSide === "A" ? teamA : teamB).forEach((p) => { if (!box[p.n].catastrophe) crown(box, p, ta); });
  });
  log.push({ side: winSide, outcome: "finale", type: "finale", text: scoring ? `FINAL: {A} ${gs.A}, {B} ${gs.B}. {${winSide}} wins` : `That is the final play. {${winSide}} leads in fantasy points` });
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  return {
    box, log, scoreA: fa, scoreB: fb, winnerTeam: winSide, gameScore: scoring ? { A: gs.A, B: gs.B } : null,
    columns: actionColumns(acts, [{ k: "plays", label: "Plays", tip: "Plays involved in" }, { k: "hitPct", label: "Hit%", tip: "Share of plays that produced a positive result" }, { k: "rating", label: "Rtg", tip: "Average performance rating" }]),
    teamStats: { A: scoring ? [{ label: "Game score", value: gs.A }] : [], B: scoring ? [{ label: "Game score", value: gs.B }] : [] },
    resultLine: scoring ? `Game score: ${gs.A} to ${gs.B}` : "", scoringKey: scoringKeyOf(acts),
  };
}

// ============================= BASKETBALL =============================
// Scoring: point +1; rebound +2; assist +3; steal +4; block +4; 3PT bonus +2 (on top of the 3 points); turnover -2
const BB_COLUMNS = [
  { k: "pts", label: "PTS", tip: "Points scored, +1 FP each" }, { k: "fg2m", label: "2PM", tip: "Two-pointers made" }, { k: "fg2a", label: "2PA", tip: "Two-pointers attempted" },
  { k: "fg3m", label: "3PM", tip: "Threes made, +2 FP bonus each" }, { k: "fg3a", label: "3PA", tip: "Threes attempted" },
  { k: "reb", label: "REB", tip: "Rebounds, +2 FP each" }, { k: "oreb", label: "OREB", tip: "Offensive rebounds (included in REB)" },
  { k: "ast", label: "AST", tip: "Assists, +3 FP each" }, { k: "stl", label: "STL", tip: "Steals, +4 FP each" }, { k: "blk", label: "BLK", tip: "Blocks, +4 FP each" },
  { k: "tov", label: "TOV", tip: "Turnovers, -2 FP each" }, { k: "fgPct", label: "FG%", tip: "Field goal percentage" },
  { k: "participation", label: "Part.", tip: "Participation credit" },
];
function simBasketball(teamA, teamB, duration) {
  const poss = duration === "short" ? 70 : duration === "long" ? 130 : 100;
  const roster = [...teamA, ...teamB];
  const box = newBox(roster, { pts: 0, fg2m: 0, fg2a: 0, fg3m: 0, fg3a: 0, reb: 0, oreb: 0, ast: 0, stl: 0, blk: 0, tov: 0, fgPct: 0 });
  const log = [];
  const out = {};
  const score = { A: 0, B: 0 };
  const sideOf = sideOfFn(teamA);
  let since = 0, lead = null, leadChanges = 0, bigRun = { side: null, n: 0 };
  const act = (team) => { const a = team.filter((p) => !out[p.n]); return a.length ? a : team; };
  for (let i = 0; i < poss; i++) {
    const side = i % 2 === 0 ? "A" : "B";
    const offense = act(side === "A" ? teamA : teamB), defense = act(side === "A" ? teamB : teamA);
    // rare catastrophe
    const cand = offense[Math.floor(rnd() * offense.length)];
    if (!out[cand.n] && rnd() < catastropheChance(cand, poss / 2) * 0.5) {
      const c = markCatastrophe(box, cand, rnd() < 0.5 ? "goes down with a catastrophic injury" : "is ejected for a flagrant foul");
      out[cand.n] = true;
      log.push({ side, type: "catastrophe", player: cand.n, text: `Possession ${i + 1}: DISASTER — ${cand.n} ${c.text}! That costs ${Math.abs(c.penalty)} fantasy points and ${cand.n} is done for the night.` });
      continue;
    }
    const shooter = weightedPick(offense, (p) => p.at + p.dx + 3);
    const makeProb = 0.35 + (shooter.at + shooter.dx - 22) / 80 + luckShift(shooter.lk) * 0.15;
    const turnoverProb = Math.max(0.03, 0.16 - shooter.wi / 150);
    if (rnd() < turnoverProb) {
      const stealer = weightedPick(defense, (p) => p.dx + p.rn);
      box[shooter.n].tov++; box[stealer.n].stl++;
      log.push({ side: side === "A" ? "B" : "A", type: "steal", player: stealer.n, victim: shooter.n, nth: box[stealer.n].stl,
        text: `Possession ${i + 1}: ${stealer.n} STEALS it from ${shooter.n}! That is steal number ${box[stealer.n].stl} for ${stealer.n} and turnover number ${box[shooter.n].tov} for ${shooter.n}.` });
      continue;
    }
    const three = rnd() < 0.3;
    if (three) box[shooter.n].fg3a++; else box[shooter.n].fg2a++;
    if (rnd() < makeProb) {
      const val = three ? 3 : 2;
      box[shooter.n].pts += val; if (three) box[shooter.n].fg3m++; else box[shooter.n].fg2m++;
      score[side] += val;
      let assister = null;
      if (rnd() < 0.55) {
        const others = offense.filter((p) => p.n !== shooter.n);
        if (others.length) { const passer = weightedPick(others, (p) => p.wi + p.it + 2); box[passer.n].ast++; assister = passer.n; }
      }
      const curLead = score.A === score.B ? lead : score.A > score.B ? "A" : "B";
      if (curLead && lead && curLead !== lead) leadChanges++;
      lead = curLead;
      if (bigRun.side === side) bigRun.n += val; else bigRun = { side, n: val };
      since++;
      if (three || since >= 4 || box[shooter.n].pts >= 20 && box[shooter.n].pts - val < 20) {
        log.push({ side, type: three ? "make3" : "make2", player: shooter.n, assist: assister, shooterPts: box[shooter.n].pts, nth: three ? box[shooter.n].fg3m : box[shooter.n].fg2m,
          text: `Possession ${i + 1}: ${shooter.n} ${three ? `drains a THREE (his ${ordinal(box[shooter.n].fg3m)} of the night)` : "scores inside"}${assister ? `, set up by ${assister}` : ""}. ${shooter.n} has ${box[shooter.n].pts} points. It is {A} ${score.A}, {B} ${score.B}.` });
        since = 0;
      }
    } else {
      const orebChance = 0.28;
      const reboundOffense = rnd() < orebChance;
      const pool = reboundOffense ? offense : defense;
      const rebounder = weightedPick(pool, (p) => p.st + p.co + 2);
      box[rebounder.n].reb++; if (reboundOffense) box[rebounder.n].oreb++;
      if (!reboundOffense && rnd() < 0.2) {
        const blocker = weightedPick(defense, (p) => p.dx + p.rn);
        box[blocker.n].blk++;
        log.push({ side: side === "A" ? "B" : "A", type: "block", player: blocker.n, victim: shooter.n, nth: box[blocker.n].blk,
          text: `Possession ${i + 1}: ${blocker.n} SWATS ${shooter.n}'s shot into the third row! That is block number ${box[blocker.n].blk} for ${blocker.n}.` });
      }
    }
  }
  let overtime = false;
  if (score.A === score.B) { overtime = true; const s = rnd() < 0.5 ? "A" : "B"; const hero = weightedPick(act(s === "A" ? teamA : teamB), (p) => p.at + p.dx); box[hero.n].pts += 2; box[hero.n].fg2m++; box[hero.n].fg2a++; score[s] += 2; log.push({ side: s, type: "make2", player: hero.n, text: `OVERTIME: ${hero.n} hits the game-winning bucket for {${s}}! Final: {A} ${score.A}, {B} ${score.B}.` }); }
  roster.forEach((p) => {
    const b = box[p.n];
    b.fp = b.pts * 1 + b.reb * 2 + b.ast * 3 + b.stl * 4 + b.blk * 4 + b.fg3m * 2 - b.tov * 2;
    const att = b.fg2a + b.fg3a; b.fgPct = att ? Math.round(((b.fg2m + b.fg3m) / att) * 100) : 0;
    if (b.catastrophe) b.fp += b.penalty;
  });
  finishBox(box, roster);
  const sum = (team, k) => team.reduce((s, p) => s + box[p.n][k], 0);
  const ts = (team) => { const m = sum(team, "fg2m") + sum(team, "fg3m"), a = sum(team, "fg2a") + sum(team, "fg3a"); return [{ label: "FG", value: `${m}/${a} (${a ? Math.round((m / a) * 100) : 0}%)` }, { label: "3PT", value: `${sum(team, "fg3m")}/${sum(team, "fg3a")}` }, { label: "Rebounds", value: sum(team, "reb") }, { label: "Assists", value: sum(team, "ast") }, { label: "Turnovers", value: sum(team, "tov") }, { label: "Steals", value: sum(team, "stl") }, { label: "Blocks", value: sum(team, "blk") }]; };
  return {
    box, log, finalScore: { A: score.A, B: score.B }, gameScore: { A: score.A, B: score.B }, scoreA: fpSum(box, teamA), scoreB: fpSum(box, teamB), winnerTeam: score.A > score.B ? "A" : "B",
    columns: BB_COLUMNS, teamStats: { A: ts(teamA), B: ts(teamB) }, resultLine: `Final: ${score.A} to ${score.B}${overtime ? " (OT)" : ""} — ${leadChanges} lead changes`,
    scoringKey: [{ label: "Point", pts: 1 }, { label: "Rebound", pts: 2 }, { label: "Assist", pts: 3 }, { label: "Steal", pts: 4 }, { label: "Block", pts: 4 }, { label: "3PT bonus", pts: 2 }, { label: "Turnover", pts: -2 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe", pts: "-5 to -14" }],
  };
}

// ============================= GLOBAL GUTS =============================
// Four drawn events (one from each escalating pool) then the Aggro Crag. Competitors run in selection order (1-5).
// Scoring: event placement +4 win / +2 for the other runner; obstacle cleared +2; final checkpoint +5; Aggro Crag completion +15.
const GUTS_COLUMNS = [
  { k: "event", label: "Event", tip: "The event this competitor ran" }, { k: "result", label: "Result", tip: "W = won the head-to-head" },
  { k: "time", label: "Time (s)", tip: "Course time, lower is better" }, { k: "obstacles", label: "Obstacles", tip: "Obstacles cleared (of 6), +2 FP each" },
  { k: "finalCp", label: "Final CP", tip: "Reached the final checkpoint, +5 FP" }, { k: "placement", label: "Placement", tip: "Event placement points" },
  { k: "margin", label: "Margin (s)", tip: "Seconds ahead (+) or behind (-) the other runner" }, { k: "cragWins", label: "Crag", tip: "Aggro Crag completion, +15 FP" },
  { k: "cragPct", label: "Crag %", tip: "How high up the Crag they climbed" }, { k: "participation", label: "Part.", tip: "Participation credit" },
];
function gutsEventScore(p, w) {
  let s = 0;
  Object.entries(w).forEach(([k, mult]) => { s += (p[k] || 0) * mult; });
  return s + luckShift(p.lk) * 9 + rnd() * 7;
}
function simGuts(teamA5, teamB5, duration) {
  const roster = [...teamA5, ...teamB5];
  const box = newBox(roster, { event: "—", result: "—", time: 0, obstacles: 0, finalCp: 0, placement: 0, margin: 0, cragWins: 0, cragPct: 0 });
  let winsA = 0, winsB = 0;
  const log = [];
  const drawn = GUTS_POOLS.map((pool) => pool[Math.floor(rnd() * pool.length)]);
  const sideOf = sideOfFn(teamA5);
  const timeOf = (score) => r1(clamp(95 - score * 1.4 + rnd() * 1.5, 24, 130));
  drawn.forEach((ev, i) => {
    const a = teamA5[i], b = teamB5[i];
    if (!a || !b) return;
    let sa = gutsEventScore(a, ev.w), sb = gutsEventScore(b, ev.w);
    let cat = null;
    [[a, "A"], [b, "B"]].forEach(([p, s]) => { if (!cat && rnd() < catastropheChance(p, 5)) { cat = p; if (p === a) sa = -999; else sb = -999; } });
    const aWins = sa > sb;
    const winner = aWins ? a : b, loser = aWins ? b : a;
    const ts = { a: timeOf(sa < -900 ? 0 : sa), b: timeOf(sb < -900 ? 0 : sb) };
    let tw = aWins ? ts.a : ts.b, tl = aWins ? ts.b : ts.a;
    if (tl <= tw) tl = r1(tw + 0.6 + rnd() * 2);
    const margin = r1(tl - tw);
    const wObs = 5 + (rnd() < 0.5 ? 1 : 0), lObs = cat === loser ? Math.floor(rnd() * 3) : 2 + Math.floor(rnd() * 3);
    const bw = box[winner.n], bl = box[loser.n];
    bw.event = `R${i + 1}: ${ev.n}`; bl.event = `R${i + 1}: ${ev.n}`; bw.result = "W"; bl.result = "L";
    bw.time = tw; bl.time = cat === loser ? 0 : tl; bw.margin = margin; bl.margin = -margin;
    bw.obstacles = wObs; bl.obstacles = lObs; bw.finalCp = 1; bl.finalCp = lObs >= 6 || (lObs >= 5 && cat !== loser) ? 1 : 0;
    bw.placement = 4; bl.placement = 2;
    if (aWins) winsA++; else winsB++;
    const closeness = margin < 1.5 ? "in a photo finish" : margin > 9 ? "in a runaway" : "by a clear margin";
    if (cat) {
      const c = markCatastrophe(box, cat, "wipes out in a spectacular, painful crash and has to be helped off the course");
      log.push({ round: i + 1, event: ev.n, eventDesc: ev.d, side: sideOf(winner), player: winner.n, loser: loser.n, catastrophe: cat.n, type: "catastrophe",
        text: `Round ${i + 1} — ${ev.n}: DISASTER — ${cat.n} ${c.text}! (${c.penalty} fantasy points). ${winner.n} cruises through in ${tw} seconds.` });
    } else {
      log.push({ round: i + 1, event: ev.n, eventDesc: ev.d, side: sideOf(winner), player: winner.n, loser: loser.n, closeness, winnerTime: tw, loserTime: tl, winnerObstacles: wObs, loserObstacles: lObs, type: `Round ${i + 1} — ${ev.n}: ${winner.n} beats ${loser.n} ${closeness}`,
        text: `Round ${i + 1} — ${ev.n}: ${winner.n} beats ${loser.n} ${closeness}, ${tw} seconds to ${tl}. ${winner.n} clears ${wObs} of 6 obstacles; ${loser.n} clears ${lObs}.` });
    }
  });
  // Round 5: the Aggro Crag, climbed by the fifth selected competitor of each side
  const cragA = teamA5[4] || teamA5[teamA5.length - 1], cragB = teamB5[4] || teamB5[teamB5.length - 1];
  const cA = cragA.st * 1.2 + cragA.dx * 1.0 + cragA.co * 0.8 + luckShift(cragA.lk) * 12 + rnd() * 9;
  const cB = cragB.st * 1.2 + cragB.dx * 1.0 + cragB.co * 0.8 + luckShift(cragB.lk) * 12 + rnd() * 9;
  const cw = cA > cB ? cragA : cragB, cl = cA > cB ? cragB : cragA;
  const t5w = r1(70 + rnd() * 20), t5l = r1(t5w + 3 + rnd() * 14);
  const bw5 = box[cw.n], bl5 = box[cl.n];
  bw5.cragWins = 1; bw5.cragPct = 100; bl5.cragPct = Math.round(60 + rnd() * 35);
  bw5.result = bw5.result === "W" ? "W+C" : "C"; bl5.result = bl5.result;
  bw5.event = (bw5.event !== "—" ? bw5.event + " | " : "") + "Aggro Crag"; bl5.event = (bl5.event !== "—" ? bl5.event + " | " : "") + "Aggro Crag";
  if (cA > cB) winsA++; else winsB++;
  log.push({ round: 5, event: "The Aggro Crag", eventDesc: "The final climb up the glowing, smoking, radical rock itself", side: sideOf(cw), player: cw.n, loser: cl.n, winnerTime: t5w, loserPct: bl5.cragPct,
    type: `Round 5 — The Aggro Crag: ${cw.n} scales the Crag ahead of ${cl.n} and takes the piece of the rock`,
    text: `Round 5 — The Aggro Crag: ${cw.n} reaches the summit in ${t5w} seconds and takes the glowing piece of the rock (+15). ${cl.n} gets ${bl5.cragPct} percent of the way up.` });
  roster.forEach((p) => {
    const b = box[p.n];
    b.fp = b.placement + b.obstacles * 2 + b.finalCp * 5 + b.cragWins * 15 + (b.catastrophe ? b.penalty : 0);
  });
  finishBox(box, roster);
  const winnerTeam = winsA >= winsB ? "A" : "B";
  return {
    box, log, winsA, winsB, cragWinner: cw.n, winnerTeam, scoreA: fpSum(box, teamA5), scoreB: fpSum(box, teamB5), eventsDrawn: drawn.map((d) => d.n).concat(["The Aggro Crag"]),
    columns: GUTS_COLUMNS, teamStats: { A: [{ label: "Rounds won", value: winsA }], B: [{ label: "Rounds won", value: winsB }] },
    resultLine: `Rounds won: ${winsA} to ${winsB}${cw ? ` — Aggro Crag champion: ${cw.n}` : ""}`,
    scoringKey: [{ label: "Event placement (win / other runner)", pts: "4 / 2" }, { label: "Obstacle cleared", pts: 2 }, { label: "Final checkpoint", pts: 5 }, { label: "Aggro Crag completion", pts: 15 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (wipeout)", pts: "-5 to -14" }],
  };
}

// ============================= TRIVIA TITANS =============================
// Scoring: correct answer +3; difficult answer +5; streak +3 (every 3rd in a row); bonus round +10
const TRIVIA_CATS = ["history", "science", "mythology", "pop culture", "geography", "fandom lore", "literature", "technology"];
function simTrivia(teamA, teamB, duration) {
  const questions = duration === "short" ? 12 : duration === "long" ? 30 : 20;
  const roster = [...teamA, ...teamB];
  const box = newBox(roster, { answered: 0, correct: 0, wrong: 0, diffCorrect: 0, diffAsked: 0, bestStreak: 0, streakBonus: 0, bonusRound: 0, accuracy: 0, avgBuzz: 0 });
  const streak = {}, buzzSum = {}; roster.forEach((p) => { streak[p.n] = 0; buzzSum[p.n] = 0; });
  let correctA = 0, correctB = 0;
  const log = [];
  const idx = { A: 0, B: 0 };
  for (let q = 0; q < questions; q++) {
    const difficult = rnd() < 0.25;
    const category = TRIVIA_CATS[Math.floor(rnd() * TRIVIA_CATS.length)];
    ["A", "B"].forEach((side) => {
      const panel = side === "A" ? teamA : teamB;
      const ans = rnd() < 0.7 ? panel[idx[side]++ % panel.length] : weightedPick(panel, (p) => p.it + p.wi + 2);
      const b = box[ans.n];
      b.answered++; if (difficult) b.diffAsked++;
      const buzz = r1(clamp(8 - (ans.it + ans.wi) / 6 + rnd() * 3, 0.8, 9.5)); buzzSum[ans.n] += buzz;
      let prob = 0.4 + (ans.it * 0.7 + ans.wi * 0.3 - 15) / 45 + luckShift(ans.lk) * 0.15;
      if (difficult) prob -= 0.15;
      if (rnd() < clamp(prob, 0.05, 0.9)) {
        b.correct++; streak[ans.n]++; b.bestStreak = Math.max(b.bestStreak, streak[ans.n]);
        let pts = difficult ? 5 : 3; if (difficult) b.diffCorrect++;
        let streakHit = false;
        if (streak[ans.n] >= 3 && streak[ans.n] % 3 === 0) { pts += 3; b.streakBonus++; streakHit = true; }
        b.fp += pts;
        if (side === "A") correctA++; else correctB++;
        log.push({ side, type: "correct", player: ans.n, difficult, streakHit, category, question: q + 1, nth: b.correct, runFp: r1(b.fp), buzzSeconds: buzz,
          text: `Question ${q + 1} (${category}${difficult ? ", a DIFFICULT one" : ""}): ${ans.n} buzzes in after ${buzz} seconds and gets it RIGHT (+${pts}${streakHit ? ", streak bonus included" : ""}). That is correct answer number ${b.correct} for ${ans.n}.` });
      } else {
        b.wrong++; streak[ans.n] = 0;
        log.push({ side, type: "wrong", player: ans.n, difficult, category, question: q + 1, buzzSeconds: buzz, text: `Question ${q + 1} (${category}${difficult ? ", a DIFFICULT one" : ""}): ${ans.n} buzzes in after ${buzz} seconds and misses it.` });
      }
    });
  }
  const leadingSide = correctA === correctB ? (rnd() < 0.5 ? "A" : "B") : correctA > correctB ? "A" : "B";
  const panel = leadingSide === "A" ? teamA : teamB;
  const closer = weightedPick(panel, (p) => p.it + p.wi + p.lk);
  const bonusProb = 0.5 + (closer.it + closer.wi - 22) / 60 + luckShift(closer.lk) * 0.2;
  const bonusWon = rnd() < clamp(bonusProb, 0.2, 0.85);
  let winner;
  if (bonusWon) { box[closer.n].fp += 10; box[closer.n].bonusRound = 1; winner = leadingSide; } else winner = leadingSide === "A" ? "B" : "A";
  log.push({ side: leadingSide, type: "bonusRound", player: closer.n, won: bonusWon, text: `BONUS ROUND: ${closer.n} steps up for the winner-take-all question and ${bonusWon ? "NAILS it (+10), sealing the win for {" + leadingSide + "}" : "BLOWS it, handing the win to the other side"}.` });
  roster.forEach((p) => {
    const b = box[p.n];
    b.accuracy = b.answered ? Math.round((b.correct / b.answered) * 100) : 0;
    b.avgBuzz = b.answered ? r1(buzzSum[p.n] / b.answered) : 0;
    if (!b.catastrophe && rnd() < catastropheChance(p, 1) * 0.3) markCatastrophe(box, p, "has a total on-stage meltdown and storms off the set");
  });
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  return {
    box, correctA, correctB, winner, winnerTeam: winner, log, scoreA: fa, scoreB: fb,
    columns: [{ k: "answered", label: "Asked", tip: "Questions answered" }, { k: "correct", label: "Right", tip: "Correct answers, +3 FP each" }, { k: "wrong", label: "Wrong", tip: "Missed answers" }, { k: "diffCorrect", label: "Hard ✓", tip: "Difficult answers correct, +5 FP each" }, { k: "diffAsked", label: "Hard asked", tip: "Difficult questions faced" }, { k: "accuracy", label: "Acc%", tip: "Accuracy" }, { k: "bestStreak", label: "Best streak", tip: "Longest run of correct answers" }, { k: "streakBonus", label: "Streak bonus", tip: "+3 FP for every third in a row" }, { k: "avgBuzz", label: "Avg buzz (s)", tip: "Average time to buzz in" }, { k: "bonusRound", label: "Bonus", tip: "Bonus round won, +10 FP" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: [{ label: "Correct", value: correctA }], B: [{ label: "Correct", value: correctB }] }, resultLine: `Correct answers: ${correctA} to ${correctB}; bonus round ${bonusWon ? "won" : "lost"} by ${closer.n}`,
    scoringKey: [{ label: "Correct answer", pts: 3 }, { label: "Difficult answer", pts: 5 }, { label: "Streak (every 3rd in a row)", pts: 3 }, { label: "Bonus round", pts: 10 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (meltdown)", pts: "-5 to -14" }],
  };
}

// ============================= BATTLE ROYALE (squad based) =============================
// Teammates fight together and never target each other on purpose. Rare exceptions: accidental friendly fire,
// and (very rarely) a genuinely treacherous character turning on their own squad.
// Scoring: damage +1 per hit; elimination +10; assist +2; loot +2; final 5 +10; final 3 +15; victory +25; friendly fire -5
function betrayalChance(p) {
  const treachery = (20 - p.wi) * 0.5 + (20 - p.ch) * 0.5 + p.at * 0.2;
  return Math.max(0, Math.min(0.02, (treachery - 14) / 300));
}
const BR_COLUMNS = [
  { k: "hits", label: "Hits", tip: "Damaging hits landed, +1 FP each" }, { k: "dmgDealt", label: "Dmg+", tip: "Damage dealt" }, { k: "dmgTaken", label: "Dmg-", tip: "Damage taken" },
  { k: "elims", label: "Elims", tip: "Eliminations, +10 FP each" }, { k: "teamElims", label: "Enemy elims", tip: "Eliminations of opposing squad members" }, { k: "assists", label: "Ast", tip: "Assists, +2 FP each" },
  { k: "loot", label: "Loot", tip: "Supply drops, +2 FP each" }, { k: "friendlyFire", label: "FF", tip: "Accidental friendly-fire eliminations, -5 FP each" }, { k: "betrayals", label: "Betrayals", tip: "Intentional squad betrayals" },
  { k: "zoneDmg", label: "Zone dmg", tip: "Damage taken from the closing zone" }, { k: "roundOut", label: "Out rd", tip: "Round eliminated (0 = survived)" }, { k: "place", label: "Place", tip: "Final placement (final 5 +10, final 3 +15, victory +25)" },
  { k: "participation", label: "Part.", tip: "Participation credit" },
];
function simBattleRoyale(teamA11, teamB11, duration) {
  const rounds = duration === "short" ? 10 : duration === "long" ? 22 : 15;
  const all = [...teamA11, ...teamB11];
  const sideOf = sideOfFn(teamA11);
  const box = newBox(all, { hits: 0, dmgDealt: 0, dmgTaken: 0, elims: 0, teamElims: 0, assists: 0, loot: 0, friendlyFire: 0, betrayals: 0, zoneDmg: 0, roundOut: 0, place: 0 });
  const hp = {}, alive = {}, lastHit = {};
  all.forEach((p) => { hp[p.n] = 55 + p.co * 2.5; alive[p.n] = true; lastHit[p.n] = []; });
  const log = [];
  const eliminatedOrder = [];
  const living = (s) => all.filter((p) => alive[p.n] && (!s || sideOf(p) === s));
  function eliminate(victim, round, how) { alive[victim.n] = false; box[victim.n].roundOut = round; eliminatedOrder.push(victim.n); }
  let round = 0;
  while (round < rounds) {
    round++;
    if (living("A").length === 0 || living("B").length === 0) break;
    const order = [...living()].sort(() => rnd() - 0.5);
    order.forEach((att) => {
      if (!alive[att.n]) return;
      const myS = sideOf(att), enS = myS === "A" ? "B" : "A";
      const enemies = living(enS), allies = living(myS).filter((p) => p.n !== att.n);
      if (!enemies.length) return;
      const b = box[att.n];
      if (rnd() < catastropheChance(att, rounds)) {
        const c = markCatastrophe(box, att, "triggers their own trap and is taken out in a freak catastrophe");
        eliminate(att, round); log.push({ side: myS, round, type: "catastrophe", player: att.n, text: `Round ${round}: DISASTER — ${att.n} ${c.text} (${c.penalty} fantasy points).` });
        return;
      }
      if (rnd() < 0.12) {
        const heal = 12 + Math.floor(rnd() * 14);
        hp[att.n] = Math.min(55 + att.co * 2.5, hp[att.n] + heal); b.loot++; b.fp += 2;
        if (rnd() < 0.5) log.push({ side: myS, round, type: "loot", player: att.n, nth: b.loot, runFp: r1(b.fp), text: `Round ${round}: ${att.n} secures a supply drop (+2) and patches up. That is loot haul number ${b.loot} for ${att.n}.` });
        return;
      }
      const betray = allies.length > 0 && rnd() < betrayalChance(att);
      const misfire = !betray && allies.length > 0 && rnd() < 0.025;
      const pool = betray || misfire ? allies : enemies;
      const target = weightedPick(pool, (t) => 1 / (Math.max(1, hp[t.n]) * 0.03 + 1));
      const perf = finalPerformance(att, { str: 20, con: 20, dex: 20, wis: 10, int: 10, cha: 0, lck: 20 });
      const hit = betray || misfire || rnd() < clamp(0.62 + (perf - 11) / 28, 0.3, 0.92);
      if (!hit) return;
      const dmg = misfire ? 12 : Math.max(5, Math.round(perf * 1.6 + rnd() * 12));
      hp[target.n] -= dmg; b.dmgDealt += dmg; box[target.n].dmgTaken += dmg;
      lastHit[target.n].push({ n: att.n, r: round });
      if (!betray && !misfire) { b.hits++; b.fp += 1; }
      if (hp[target.n] > 0) return;
      eliminate(target, round);
      b.elims++;
      if (betray) {
        b.betrayals++; b.fp += 10;
        log.push({ side: myS, round, type: "BETRAYAL", player: att.n, victim: target.n, betrayal: true, text: `Round ${round}: BETRAYAL — ${att.n} turns on their own squad and eliminates ${target.n}!` });
      } else if (misfire) {
        b.friendlyFire++; b.fp -= 5;
        log.push({ side: myS, round, type: "accidentally friendly fire", player: att.n, victim: target.n, accidental: true, text: `Round ${round}: chaos in the crossfire — ${att.n} accidentally takes out teammate ${target.n} (-5).` });
      } else {
        b.teamElims++; b.fp += 10;
        const helpers = [...new Set(lastHit[target.n].filter((h) => h.n !== att.n && round - h.r <= 2 && alive[h.n] && sideOf(all.find((p) => p.n === h.n)) === myS).map((h) => h.n))];
        let ht = "";
        if (helpers.length) { const h = helpers[0]; box[h].assists++; box[h].fp += 2; ht = `, with squadmate ${h} credited for the assist`; }
        log.push({ side: myS, round, type: "elimination", player: att.n, victim: target.n, assist: helpers[0] || null, nth: b.elims, runFp: r1(b.fp),
          text: `Round ${round}: ${att.n} eliminates ${target.n}${ht}. That is elimination number ${b.elims} for ${att.n}; ${living("A").length} left for {A}, ${living("B").length} for {B}.` });
      }
    });
    // the closing zone hurts everyone after the midpoint
    if (round > rounds * 0.5) {
      const zd = 3 + Math.floor((round - rounds * 0.5) * 1.4);
      living().forEach((p) => {
        hp[p.n] -= zd; box[p.n].dmgTaken += zd; box[p.n].zoneDmg += zd;
        if (hp[p.n] <= 0) { eliminate(p, round); log.push({ side: sideOf(p), round, type: "zone", player: p.n, text: `Round ${round}: the closing zone claims ${p.n}, who is eliminated by the storm.` }); }
      });
    }
  }
  const aLeft = living("A"), bLeft = living("B");
  const survivors = living().sort((a, b) => hp[b.n] - hp[a.n]).map((p) => p.n);
  const finishOrder = [...survivors, ...[...eliminatedOrder].reverse()];
  finishOrder.forEach((n, i) => {
    const place = i + 1; box[n].place = place;
    if (place <= 5) box[n].fp += 10; if (place <= 3) box[n].fp += 15; if (place === 1) box[n].fp += 25;
  });
  let winnerTeam = aLeft.length > bLeft.length ? "A" : bLeft.length > aLeft.length ? "B" : null;
  if (!winnerTeam) {
    const ha = aLeft.reduce((s, p) => s + hp[p.n], 0), hb = bLeft.reduce((s, p) => s + hp[p.n], 0);
    winnerTeam = ha >= hb ? "A" : "B";
  }
  const winSquad = winnerTeam === "A" ? teamA11 : teamB11;
  winSquad.forEach((p) => { box[p.n].fp += 10 / winSquad.length; });
  all.forEach((p) => { if (box[p.n].catastrophe) { /* penalty already applied at the moment it happened */ } });
  log.push({ side: winnerTeam, type: "squad victory", player: null, text: `SQUAD VICTORY: {${winnerTeam}} holds the field with ${Math.max(aLeft.length, bLeft.length)} still standing; ${finishOrder[0]} is the last one up.` });
  finishBox(box, all);
  const fa = fpSum(box, teamA11), fb = fpSum(box, teamB11);
  const tsOf = (team, left) => [{ label: "Survivors", value: `${left.length}/${team.length}` }, { label: "Enemy elims", value: team.reduce((s, p) => s + box[p.n].teamElims, 0) }, { label: "Damage dealt", value: team.reduce((s, p) => s + box[p.n].dmgDealt, 0) }, { label: "Friendly fire", value: team.reduce((s, p) => s + box[p.n].friendlyFire, 0) }];
  return {
    box, log, finishOrder, scoreA: fa, scoreB: fb, champion: finishOrder[0], winnerTeam, survivorsA: aLeft.length, survivorsB: bLeft.length,
    columns: BR_COLUMNS, teamStats: { A: tsOf(teamA11, aLeft), B: tsOf(teamB11, bLeft) }, resultLine: `Survivors: ${aLeft.length} to ${bLeft.length} — last standing: ${finishOrder[0]}`,
    scoringKey: [{ label: "Damaging hit", pts: 1 }, { label: "Elimination", pts: 10 }, { label: "Assist", pts: 2 }, { label: "Loot / supply drop", pts: 2 }, { label: "Final 5", pts: 10 }, { label: "Final 3", pts: 15 }, { label: "Victory (last standing)", pts: 25 }, { label: "Squad victory (split)", pts: 10 }, { label: "Friendly fire", pts: -5 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe", pts: "-5 to -14" }],
  };
}

// ============================= BATTLE OF THE BANDS =============================
// Scored across Musical Talent, Appearance and Wow Factor plus a band-chemistry modifier across all 7 roles.
// Scoring: flawless performance +3; missed note -1; technical failure -3; lucky memorable moment +2; chemistry +4 / +5 / -3; judge win +10; crowd favorite +5
function simBattleOfTheBands(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB];
  const box = newBox(roster, { role: "", genre: "", musicalTalent: 0, appearance: 0, wowFactor: 0, setScore: 0, flawless: 0, missedNotes: 0, gearFailures: 0, improv: 0, showstoppers: 0, crowdFav: 0 });
  const log = [];
  const chem = {};
  function playSet(team, side) {
    const roles = assignBandRoles(team);
    const entries = Object.entries(roles);
    let total = 0, mvp = null, mvpScore = -Infinity;
    const genres = [];
    entries.forEach(([roleKey, p]) => {
      const roleLabel = BAND_ROLES.find((r) => r.key === roleKey).label;
      const talent = finalPerformance(p, weights);
      const appearance = (p.ch * 0.6 + p.lk * 0.4) / 4 + (rnd() - 0.5) * 3;
      const wow = luckShift(p.lk) * 8 + (rnd() < 0.15 ? 10 : 0);
      const genre = musicalGenreOf(p);
      genres.push(genre);
      const b = box[p.n];
      b.role = roleLabel; b.genre = genre; b.musicalTalent = r1(talent); b.appearance = r1(appearance); b.wowFactor = r1(wow);
      const combined = talent + appearance + wow;
      b.setScore = r1(combined);
      total += combined;
      if (combined > mvpScore) { mvpScore = combined; mvp = p; }
      const look = appearance > 6 ? "looking absolutely iconic up there" : appearance < 2 ? "with a stage look that is not landing" : "in decent stage form";
      if (rnd() < catastropheChance(p, 1) * 0.6) {
        const c = markCatastrophe(box, p, "freezes solid mid-song and walks off the stage");
        log.push({ side, player: p.n, role: roleLabel, genre, look, moment: "freezes solid mid-song and walks off the stage", crowd: "stunned silence", type: "catastrophe", text: `${p.n} on ${roleLabel}: DISASTER — ${c.text}! (${c.penalty} fantasy points)` });
        return;
      }
      if (talent > 16) {
        b.fp += 3; b.flawless++;
        log.push({ side, player: p.n, role: roleLabel, genre, look, moment: `rips a flawless ${genre} ${roleLabel} part`, crowd: "crowd is losing it", type: `${roleLabel} delivers a flawless ${genre} segment, ${look}`, text: `${p.n} on ${roleLabel}: a flawless ${genre} part (+3), ${look}. Talent rating ${r1(talent)}.` });
      } else if (talent < 4) {
        b.fp -= 1; b.missedNotes++;
        log.push({ side, player: p.n, role: roleLabel, genre, look, moment: `clams a note on the ${roleLabel} part`, crowd: "audience winces", type: `${roleLabel} misses a note, ${look}`, text: `${p.n} on ${roleLabel}: clams a note (-1), ${look}. Talent rating ${r1(talent)}.` });
      } else {
        log.push({ side, player: p.n, role: roleLabel, genre, look, moment: `holds down a steady ${genre} ${roleLabel} part`, crowd: "crowd nodding along", type: `${roleLabel} plays a steady ${genre} part, ${look}`, text: `${p.n} on ${roleLabel}: a steady ${genre} part, ${look}. Talent rating ${r1(talent)}.` });
      }
      if (wow > 12) { b.showstoppers++; log.push({ side, player: p.n, role: roleLabel, moment: "pulls off a jaw-dropping showstopper move mid-song", crowd: "place goes nuts", type: `${roleLabel} pulls off a huge wow-factor moment`, text: `${p.n} on ${roleLabel}: a jaw-dropping showstopper move, wow factor ${r1(wow)}.` }); }
      if (rnd() < 0.12) {
        if (p.lk >= 12) { b.fp += 2; b.improv++; log.push({ side, player: p.n, role: roleLabel, moment: "turns a near-disaster into an unforgettable improvised bit", type: "lucky memorable moment", text: `${p.n} on ${roleLabel}: turns a near-disaster into an unforgettable improvised bit (+2).` }); }
        else { b.fp -= 3; b.gearFailures++; log.push({ side, player: p.n, role: roleLabel, moment: "suffers a gear failure mid-song", crowd: "awkward pause", type: "technical failure", text: `${p.n} on ${roleLabel}: suffers a gear failure mid-song (-3).` }); }
      }
    });
    const uniqueGenres = new Set(genres).size;
    let chemLabel = "Neutral blend";
    if (uniqueGenres <= 2) {
      entries.forEach(([, p]) => (box[p.n].fp += 4)); chemLabel = "Cohesive (+4 each)";
      log.push({ side, type: `tight, cohesive ${genres[0]}-driven sound`, player: null, text: `Band chemistry: a tight, cohesive ${genres[0]}-driven sound; the whole band locks in together (+4 each).` });
    } else if (uniqueGenres >= 4) {
      const avgLuck = team.reduce((s, p) => s + p.lk, 0) / team.length;
      if (avgLuck > 12 && rnd() < 0.5) { entries.forEach(([, p]) => (box[p.n].fp += 5)); chemLabel = "Fusion (+5 each)"; log.push({ side, type: "wildly different styles somehow fuse into something original", player: null, text: "Band chemistry: wildly different styles somehow fuse into something original (+5 each)." }); }
      else { entries.forEach(([, p]) => (box[p.n].fp -= 3)); chemLabel = "Clash (-3 each)"; log.push({ side, type: "clashing styles leave the set feeling disjointed", player: null, text: "Band chemistry: clashing styles leave the set feeling disjointed (-3 each)." }); }
    }
    chem[side] = chemLabel;
    return { total, mvp, roles };
  }
  const setA = playSet(teamA, "A"), setB = playSet(teamB, "B");
  const judgeWinner = setA.total >= setB.total ? "A" : "B";
  (judgeWinner === "A" ? teamA : teamB).forEach((p) => (box[p.n].fp += 10));
  log.push({ side: judgeWinner, type: "judge win", player: null, text: `The judges' total: {A} ${r1(setA.total)}, {B} ${r1(setB.total)}. {${judgeWinner}} wins the judges' vote (+10 each).` });
  const crowdFav = judgeWinner === "A" ? setA.mvp : setB.mvp;
  box[crowdFav.n].fp += 5; box[crowdFav.n].crowdFav = 1;
  log.push({ side: judgeWinner, type: "crowd favorite", player: crowdFav.n, text: `${crowdFav.n} is voted crowd favorite of the night (+5).` });
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  return {
    box, log, winnerTeam: judgeWinner, scoreA: fa, scoreB: fb,
    columns: [{ k: "role", label: "Role", tip: "Band role" }, { k: "genre", label: "Genre", tip: "Musical style" }, { k: "musicalTalent", label: "Talent", tip: "Musical talent score" }, { k: "appearance", label: "Look", tip: "Appearance score" }, { k: "wowFactor", label: "Wow", tip: "Wow-factor score" }, { k: "setScore", label: "Set", tip: "Combined judge score" }, { k: "flawless", label: "Flawless", tip: "Flawless performances, +3 FP" }, { k: "showstoppers", label: "Showstop", tip: "Showstopper moments" }, { k: "improv", label: "Improv", tip: "Lucky memorable moments, +2 FP" }, { k: "missedNotes", label: "Missed", tip: "Missed notes, -1 FP" }, { k: "gearFailures", label: "Gear fail", tip: "Technical failures, -3 FP" }, { k: "crowdFav", label: "Crowd fav", tip: "+5 FP" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: [{ label: "Judges' score", value: r1(setA.total) }, { label: "Chemistry", value: chem.A }], B: [{ label: "Judges' score", value: r1(setB.total) }, { label: "Chemistry", value: chem.B }] },
    resultLine: `Judges' total: ${r1(setA.total)} to ${r1(setB.total)}`,
    scoringKey: [{ label: "Flawless performance", pts: 3 }, { label: "Missed note", pts: -1 }, { label: "Technical failure", pts: -3 }, { label: "Lucky memorable moment", pts: 2 }, { label: "Chemistry: cohesive / fusion / clash", pts: "+4 / +5 / -3" }, { label: "Judge win (each member)", pts: 10 }, { label: "Crowd favorite", pts: 5 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (freeze)", pts: "-5 to -14" }],
  };
}

// ============================= HOT DOG EATING CONTEST =============================
// Scoring: hot dog consumed +1; streak +2 (every 3 straight strong intervals); record bonus +10; victory +20
function simHotDogContest(teamA, teamB, weights, duration) {
  const intervals = duration === "short" ? 4 : duration === "long" ? 10 : 7;
  const roster = [...teamA, ...teamB];
  const box = newBox(roster, { hotdogs: 0, intervals: 0, pace: 0, bestInterval: 0, gags: 0, streakBonus: 0, record: 0, victory: 0 });
  const log = [];
  const sideOf = sideOfFn(teamA);
  roster.forEach((p) => {
    const side = sideOf(p), b = box[p.n];
    let streak = 0;
    for (let i = 1; i <= intervals; i++) {
      const perf = finalPerformance(p, weights);
      if (rnd() < catastropheChance(p, intervals) + (perf < 2 ? 0.1 : 0)) {
        const c = markCatastrophe(box, p, "loses the battle with the buns and has to forfeit");
        log.push({ side, interval: i, player: p.n, type: "vomits and forfeits", hotdogs: b.hotdogs, text: `Interval ${i}: DISASTER — ${p.n} ${c.text} with ${b.hotdogs} hot dogs down (${c.penalty} fantasy points)!` });
        return;
      }
      b.intervals++;
      const eaten = Math.max(0, Math.round(perf / 4));
      if (eaten === 0) { b.gags++; streak = 0; log.push({ side, interval: i, player: p.n, type: "failed bite attempt", hotdogs: b.hotdogs, text: `Interval ${i}: ${p.n} gags on a bite and gets nothing down. Still at ${b.hotdogs}.` }); continue; }
      b.hotdogs += eaten; b.fp += eaten; b.bestInterval = Math.max(b.bestInterval, eaten);
      if (eaten >= 3) streak++; else streak = 0;
      let bonusTxt = "";
      if (streak >= 3 && streak % 3 === 0) { b.fp += 2; b.streakBonus++; bonusTxt = " and a streak bonus (+2)"; }
      if (eaten >= 5 || bonusTxt || i === intervals) log.push({ side, interval: i, player: p.n, type: i === intervals ? `finishes with ${b.hotdogs} hot dogs` : "big interval", eaten, hotdogs: b.hotdogs, text: `Interval ${i}: ${p.n} puts away ${eaten} more${bonusTxt}, total ${b.hotdogs} hot dogs${i === intervals ? " at the final bell" : ""}.` });
    }
  });
  const eligible = roster.filter((p) => !box[p.n].catastrophe);
  const record = (eligible.length ? eligible : roster).reduce((best, p) => (box[p.n].hotdogs > box[best.n].hotdogs ? p : best), (eligible.length ? eligible : roster)[0]);
  box[record.n].fp += 10; box[record.n].record = 1;
  log.push({ side: sideOf(record), type: "sets the pace record", player: record.n, hotdogs: box[record.n].hotdogs, text: `${record.n} sets the pace record with ${box[record.n].hotdogs} hot dogs (+10)!` });
  const dogsA = teamA.reduce((s, p) => s + box[p.n].hotdogs, 0), dogsB = teamB.reduce((s, p) => s + box[p.n].hotdogs, 0);
  const winnerTeam = dogsA === dogsB ? sideOf(record) : dogsA > dogsB ? "A" : "B";
  const champ = [...(winnerTeam === "A" ? teamA : teamB)].filter((p) => !box[p.n].catastrophe).sort((a, b) => box[b.n].hotdogs - box[a.n].hotdogs)[0];
  if (champ) { box[champ.n].fp += 20; box[champ.n].victory = 1; log.push({ side: winnerTeam, type: "team victory", player: champ.n, text: `{${winnerTeam}} wins the team total, ${dogsA} to ${dogsB}, and ${champ.n} takes the victory bonus (+20).` }); }
  roster.forEach((p) => { const b = box[p.n]; b.pace = b.intervals ? r1(b.hotdogs / b.intervals) : 0; });
  finishBox(box, roster);
  return {
    box, log, winnerTeam, champion: record.n, scoreA: fpSum(box, teamA), scoreB: fpSum(box, teamB),
    columns: [{ k: "hotdogs", label: "Dogs", tip: "Hot dogs consumed, +1 FP each" }, { k: "pace", label: "Pace", tip: "Dogs per interval" }, { k: "bestInterval", label: "Best int.", tip: "Most dogs in a single interval" }, { k: "intervals", label: "Intervals", tip: "Intervals completed" }, { k: "gags", label: "Gags", tip: "Failed bites" }, { k: "streakBonus", label: "Streaks", tip: "+2 FP each" }, { k: "record", label: "Record", tip: "Record bonus +10 FP" }, { k: "victory", label: "Victory", tip: "Victory bonus +20 FP" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: [{ label: "Total dogs", value: dogsA }], B: [{ label: "Total dogs", value: dogsB }] }, resultLine: `Team total: ${dogsA} to ${dogsB} hot dogs`,
    scoringKey: [{ label: "Hot dog consumed", pts: 1 }, { label: "Streak (3 strong intervals in a row)", pts: 2 }, { label: "Record bonus", pts: 10 }, { label: "Victory", pts: 20 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (forfeit)", pts: "-5 to -14" }],
  };
}

// ============================= TOWERING INFERNO =============================
// Scoring: civilian rescued +5; floor cleared +3; objective +5; teammate rescued +5; successful escape +20
function simToweringInferno(teamA, teamB, weights, duration) {
  const floors = duration === "short" ? 6 : duration === "long" ? 14 : 10;
  const roster = [...teamA, ...teamB];
  const box = newBox(roster, { floors: 0, civilians: 0, objectives: 0, teamRescues: 0, escapes: 0, knockedOut: 0, led: 0, rating: 0 });
  const log = [];
  const OBJ = ["shuts off the gas main", "reroutes the sprinklers", "opens the jammed stairwell", "restores power to the elevator", "seals a burning vent"];
  const stats = {};
  function runTower(team, side) {
    const ko = {};
    let cleared = 0, saved = 0, lost = 0;
    const perfSum = {}; team.forEach((p) => (perfSum[p.n] = 0));
    const n = {}; team.forEach((p) => (n[p.n] = 0));
    for (let f = 1; f <= floors; f++) {
      // teammates carry out the knocked-out
      Object.keys(ko).forEach((name) => {
        const rescuers = team.filter((p) => !ko[p.n] && !box[p.n].catastrophe);
        if (rescuers.length && rnd() < 0.65) {
          const r = weightedPick(rescuers, (p) => p.st + p.co + 2);
          box[r.n].teamRescues++; box[r.n].fp += 5; delete ko[name];
          log.push({ side, floor: f, player: r.n, victim: name, type: "teammate rescued", nth: box[r.n].teamRescues, text: `Floor ${f}: ${r.n} hauls the unconscious ${name} out of the smoke (+5). That is teammate rescue number ${box[r.n].teamRescues} for ${r.n}.` });
        }
      });
      const active = team.filter((p) => !ko[p.n] && !box[p.n].catastrophe);
      if (!active.length) { log.push({ side, floor: f, type: "tower lost", text: `Floor ${f}: nobody is left on their feet for {${side}}; the floor goes up in flames.` }); lost += 2; continue; }
      const leader = weightedPick(active, (p) => Math.max(0.1, finalPerformance(p, weights) + 10));
      const perf = finalPerformance(leader, weights);
      perfSum[leader.n] += perf; n[leader.n]++; box[leader.n].led++;
      const civs = 1 + Math.floor(rnd() * 3);
      if (rnd() < catastropheChance(leader, floors)) {
        const c = markCatastrophe(box, leader, "is caught in a flashover and has to be pulled out of the tower");
        log.push({ side, floor: f, player: leader.n, type: "catastrophe", text: `Floor ${f}: DISASTER — ${leader.n} ${c.text} (${c.penalty} fantasy points).` });
        lost += civs; continue;
      }
      if (perf > 8) {
        const sv = Math.min(civs, 1 + Math.floor(perf / 9));
        box[leader.n].floors++; box[leader.n].fp += 3; box[leader.n].civilians += sv; box[leader.n].fp += sv * 5; cleared++; saved += sv; lost += civs - sv;
        let objTxt = "";
        if (rnd() < 0.3) { const o = weightedPick(active, (p) => p.it + p.wi + 2); box[o.n].objectives++; box[o.n].fp += 5; objTxt = ` ${o.n} ${OBJ[Math.floor(rnd() * OBJ.length)]} (+5).`; }
        log.push({ side, floor: f, player: leader.n, type: `clears floor ${f}, saves ${sv} civilian(s)`, saved: sv, runFp: r1(box[leader.n].fp), text: `Floor ${f}: ${leader.n} clears the floor (+3) and carries out ${sv} of ${civs} civilians (+${sv * 5}).${objTxt}` });
      } else if (perf < 0) {
        box[leader.n].knockedOut++; ko[leader.n] = true; lost += civs;
        log.push({ side, floor: f, player: leader.n, type: "knocked out by smoke/heat", text: `Floor ${f}: ${leader.n} is overcome by smoke and goes down! ${civs} civilian${civs > 1 ? "s" : ""} on the floor are lost.` });
      } else {
        const sv = rnd() < 0.5 ? 1 : 0;
        box[leader.n].civilians += sv; box[leader.n].fp += sv * 5; saved += sv; lost += civs - sv;
        log.push({ side, floor: f, player: leader.n, type: "civilian lost on this floor", text: `Floor ${f}: ${leader.n} cannot clear it in time; ${sv ? "one civilian is saved (+5) but" : "no one is saved and"} ${civs - sv} are lost.` });
      }
      if (rnd() < 0.1) log.push({ side, floor: f, type: "structural damage rattles the tower", player: null, text: `Floor ${f}: structural damage rattles the tower and everyone on {${side}} feels it.` });
    }
    // anyone still unconscious is left behind: a catastrophe
    Object.keys(ko).forEach((name) => {
      const p = team.find((x) => x.n === name);
      const c = markCatastrophe(box, p, "is left behind in the inferno");
      log.push({ side, type: "left behind", player: name, text: `${name} is never reached and is left behind in the inferno (${c.penalty} fantasy points).` });
    });
    const need = Math.ceil(floors * 0.7);
    const escaped = cleared >= need;
    if (escaped) {
      team.forEach((p) => { if (!box[p.n].catastrophe) { box[p.n].escapes = 1; box[p.n].fp += 20; } });
      log.push({ side, type: "full building clear — everyone escapes", player: null, text: `{${side}} clears ${cleared} of ${floors} floors and every survivor escapes the building (+20 each)!` });
    } else log.push({ side, type: "trapped", player: null, text: `{${side}} clears only ${cleared} of ${floors} floors (${need} needed) and the survivors are trapped; no escape bonus.` });
    team.forEach((p) => { box[p.n].rating = n[p.n] ? r1(perfSum[p.n] / n[p.n]) : 0; });
    return { cleared, saved, lost, escaped };
  }
  stats.A = runTower(teamA, "A"); stats.B = runTower(teamB, "B");
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  return {
    box, log, winnerTeam: fa >= fb ? "A" : "B", scoreA: fa, scoreB: fb,
    columns: [{ k: "floors", label: "Floors", tip: "Floors cleared as leader, +3 FP each" }, { k: "civilians", label: "Civilians", tip: "Civilians rescued, +5 FP each" }, { k: "objectives", label: "Objectives", tip: "+5 FP each" }, { k: "teamRescues", label: "Team rescues", tip: "Teammates carried out, +5 FP each" }, { k: "escapes", label: "Escape", tip: "Successful escape, +20 FP" }, { k: "led", label: "Led", tip: "Floors led" }, { k: "knockedOut", label: "KO'd", tip: "Times knocked out by smoke" }, { k: "rating", label: "Rtg", tip: "Average performance as floor leader" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: [{ label: "Floors cleared", value: `${stats.A.cleared}/${floors}` }, { label: "Civilians saved", value: stats.A.saved }, { label: "Civilians lost", value: stats.A.lost }, { label: "Escaped", value: stats.A.escaped ? "Yes" : "No" }], B: [{ label: "Floors cleared", value: `${stats.B.cleared}/${floors}` }, { label: "Civilians saved", value: stats.B.saved }, { label: "Civilians lost", value: stats.B.lost }, { label: "Escaped", value: stats.B.escaped ? "Yes" : "No" }] },
    resultLine: `Floors cleared: ${stats.A.cleared} to ${stats.B.cleared} of ${floors}`,
    scoringKey: [{ label: "Civilian rescued", pts: 5 }, { label: "Floor cleared", pts: 3 }, { label: "Objective", pts: 5 }, { label: "Teammate rescued", pts: 5 }, { label: "Successful escape (needs 70% of floors)", pts: 20 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (flashover / left behind)", pts: "-5 to -14" }],
  };
}

// ============================= DODGEBALL BLITZ =============================
// Scoring: hit +3; catch +5; dodge streak +3 (every 3 straight dodges); elimination +5; final player +10
function simDodgeballBlitz(teamA, teamB, weights, duration) {
  const volleys = duration === "short" ? 5 : duration === "long" ? 12 : 8;
  const roster = [...teamA, ...teamB];
  const sideOf = sideOfFn(teamA);
  const box = newBox(roster, { throws: 0, hits: 0, hitPct: 0, elims: 0, catches: 0, dodges: 0, bestDodgeStreak: 0, streakBonus: 0, timesOut: 0, revives: 0, roundOut: 0, finalPlayer: 0 });
  const alive = {}, dstreak = {};
  roster.forEach((p) => { alive[p.n] = true; dstreak[p.n] = 0; });
  const benchA = [], benchB = [];
  const log = [];
  const liveOf = (s) => roster.filter((p) => alive[p.n] && sideOf(p) === s);
  let v = 0;
  while (v < volleys && liveOf("A").length && liveOf("B").length) {
    v++;
    const order = roster.filter((p) => alive[p.n]).sort(() => rnd() - 0.5);
    order.forEach((th) => {
      if (!alive[th.n]) return;
      const s = sideOf(th), es = s === "A" ? "B" : "A";
      const targets = liveOf(es);
      if (!targets.length) return;
      if (rnd() < catastropheChance(th, volleys)) {
        const c = markCatastrophe(box, th, "takes a ball to the face and is knocked cold");
        alive[th.n] = false; box[th.n].roundOut = v; box[th.n].timesOut++; (s === "A" ? benchA : benchB).push(th);
        log.push({ side: s, round: v, player: th.n, type: "catastrophe", text: `Volley ${v}: DISASTER — ${th.n} ${c.text} (${c.penalty} fantasy points).` });
        return;
      }
      const tg = weightedPick(targets, (t) => 1 / (finalPerformance(t, weights) + 10));
      const tp = finalPerformance(th, weights), cp = finalPerformance(tg, weights);
      box[th.n].throws++;
      if (cp > tp - 2 && rnd() < 0.25) {
        box[tg.n].catches++; box[tg.n].fp += 5; alive[th.n] = false; box[th.n].timesOut++; box[th.n].roundOut = v; (s === "A" ? benchA : benchB).push(th);
        let rev = "";
        const bench = es === "A" ? benchA : benchB;
        const back = bench.find((p) => !box[p.n].catastrophe && !alive[p.n]);
        if (back) { alive[back.n] = true; bench.splice(bench.indexOf(back), 1); box[tg.n].revives++; rev = ` ${back.n} is brought back into the game!`; }
        dstreak[tg.n]++;
        log.push({ side: es, round: v, player: tg.n, victim: th.n, type: "catches it — thrower is out!", nth: box[tg.n].catches, runFp: r1(box[tg.n].fp), text: `Volley ${v}: ${tg.n} CATCHES ${th.n}'s throw (+5) and ${th.n} is out! That is catch number ${box[tg.n].catches} for ${tg.n}.${rev}` });
      } else if (tp > cp) {
        box[th.n].hits++; box[th.n].elims++; box[th.n].fp += 3 + 5; alive[tg.n] = false; box[tg.n].timesOut++; box[tg.n].roundOut = v; (es === "A" ? benchA : benchB).push(tg); dstreak[th.n] = Math.max(0, dstreak[th.n]);
        dstreak[tg.n] = 0;
        log.push({ side: s, round: v, player: th.n, victim: tg.n, type: "lands the hit — eliminated", nth: box[th.n].hits, runFp: r1(box[th.n].fp), text: `Volley ${v}: ${th.n} NAILS ${tg.n} (hit +3, elimination +5). That is hit number ${box[th.n].hits} for ${th.n}; ${liveOf("A").length} left for {A}, ${liveOf("B").length} for {B}.` });
      } else {
        box[tg.n].dodges++; dstreak[tg.n]++;
        box[tg.n].bestDodgeStreak = Math.max(box[tg.n].bestDodgeStreak, dstreak[tg.n]);
        let bt = "";
        if (dstreak[tg.n] % 3 === 0) { box[tg.n].fp += 3; box[tg.n].streakBonus++; bt = ` That is ${dstreak[tg.n]} dodges in a row (+3)!`; }
        if (bt || rnd() < 0.15) log.push({ side: es, round: v, player: tg.n, victim: th.n, type: "dodges the throw", runFp: r1(box[tg.n].fp), text: `Volley ${v}: ${tg.n} slips ${th.n}'s throw.${bt}` });
      }
    });
  }
  const la = liveOf("A").length, lb = liveOf("B").length;
  const winSide = la === lb ? ((teamA.reduce((s, p) => s + box[p.n].hits, 0) >= teamB.reduce((s, p) => s + box[p.n].hits, 0)) ? "A" : "B") : la > lb ? "A" : "B";
  const winners = liveOf(winSide);
  if (winners.length) {
    const fin = winners.length === 1 ? winners[0] : [...winners].sort((a, b) => box[b.n].fp - box[a.n].fp)[0];
    box[fin.n].fp += 10; box[fin.n].finalPlayer = 1;
    log.push({ side: winSide, round: v, player: fin.n, type: "last player standing", text: `${fin.n} is the final player on the court for {${winSide}} (+10)! {${winSide}} wins with ${winners.length} still standing.` });
  }
  roster.forEach((p) => { const b = box[p.n]; b.hitPct = b.throws ? Math.round((b.hits / b.throws) * 100) : 0; });
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  return {
    box, log, winnerTeam: winSide, scoreA: fa, scoreB: fb,
    columns: [{ k: "throws", label: "Throws", tip: "Throws attempted" }, { k: "hits", label: "Hits", tip: "Hits, +3 FP each" }, { k: "hitPct", label: "Hit%", tip: "Throw accuracy" }, { k: "elims", label: "Elims", tip: "Eliminations, +5 FP each" }, { k: "catches", label: "Catches", tip: "Catches, +5 FP each" }, { k: "dodges", label: "Dodges", tip: "Throws dodged" }, { k: "bestDodgeStreak", label: "Dodge streak", tip: "Longest dodge streak" }, { k: "streakBonus", label: "Streak bonus", tip: "+3 FP per 3 dodges in a row" }, { k: "revives", label: "Revives", tip: "Teammates brought back by catches" }, { k: "timesOut", label: "Times out", tip: "Times eliminated" }, { k: "roundOut", label: "Out vol.", tip: "Volley of final elimination (0 = survived)" }, { k: "finalPlayer", label: "Final", tip: "Final player bonus +10 FP" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: [{ label: "Players left", value: `${la}/${teamA.length}` }, { label: "Hits", value: teamA.reduce((s, p) => s + box[p.n].hits, 0) }, { label: "Catches", value: teamA.reduce((s, p) => s + box[p.n].catches, 0) }], B: [{ label: "Players left", value: `${lb}/${teamB.length}` }, { label: "Hits", value: teamB.reduce((s, p) => s + box[p.n].hits, 0) }, { label: "Catches", value: teamB.reduce((s, p) => s + box[p.n].catches, 0) }] },
    resultLine: `Players left standing: ${la} to ${lb}`,
    scoringKey: [{ label: "Hit", pts: 3 }, { label: "Catch", pts: 5 }, { label: "Dodge streak (every 3)", pts: 3 }, { label: "Elimination", pts: 5 }, { label: "Final player", pts: 10 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (knocked cold)", pts: "-5 to -14" }],
  };
}

// ============================= FAMILY FEUD =============================
// Scoring: correct answer +3; top answer +5 (on top); steal +8; winning round +10 (split across the team)
function simFamilyFeud(teamA, teamB, weights, duration) {
  const rounds = duration === "short" ? 4 : duration === "long" ? 8 : 6;
  const roster = [...teamA, ...teamB];
  const box = newBox(roster, { answers: 0, topAnswers: 0, strikes: 0, stealTries: 0, steals: 0, faceoffs: 0, faceoffsWon: 0, roundShare: 0 });
  const log = [];
  const idx = { A: 0, B: 0 };
  let wonA = 0, wonB = 0, boardsA = 0, boardsB = 0;
  const out = {};
  const nextOf = (team, side) => { const a = team.filter((p) => !out[p.n]); const pool = a.length ? a : team; return pool[idx[side]++ % pool.length]; };
  for (let r = 1; r <= rounds; r++) {
    const fa = nextOf(teamA, "A"), fb = nextOf(teamB, "B");
    box[fa.n].faceoffs++; box[fb.n].faceoffs++;
    const pa = finalPerformance(fa, weights), pb = finalPerformance(fb, weights);
    const ctrl = pa >= pb ? "A" : "B";
    const fw = ctrl === "A" ? fa : fb, fl = ctrl === "A" ? fb : fa;
    box[fw.n].faceoffsWon++;
    log.push({ side: ctrl, round: r, player: fw.n, victim: fl.n, type: "face-off", text: `Round ${r} face-off: ${fw.n} beats ${fl.n} to the buzzer and takes control for {${ctrl}}.` });
    const board = 4; let revealed = 0, strikes = 0, topSeen = false, resolved = false;
    const ctrlTeam = ctrl === "A" ? teamA : teamB;
    while (strikes < 3 && !resolved) {
      const ans = nextOf(ctrlTeam, ctrl);
      const perf = finalPerformance(ans, weights);
      if (rnd() < catastropheChance(ans, rounds * 3)) {
        const c = markCatastrophe(box, ans, "blurts out something so awful the host stops the show");
        out[ans.n] = true; strikes++;
        log.push({ side: ctrl, round: r, player: ans.n, type: "catastrophe", text: `Round ${r}: DISASTER — ${ans.n} ${c.text} (${c.penalty} fantasy points). That is a strike.` });
        continue;
      }
      if (perf > 9) {
        revealed++; box[ans.n].answers++; box[ans.n].fp += 3;
        let top = false;
        if (!topSeen && (perf > 16 || revealed === 1 && rnd() < 0.3)) { top = true; topSeen = true; box[ans.n].topAnswers++; box[ans.n].fp += 5; }
        log.push({ side: ctrl, round: r, player: ans.n, type: top ? "reveals the #1 answer" : "correct answer", nth: box[ans.n].answers, runFp: r1(box[ans.n].fp), text: `Round ${r}: ${ans.n} ${top ? "hits the #1 ANSWER (+3, +5 top answer)" : "finds a board answer (+3)"}. ${revealed} of ${board} revealed.` });
        if (revealed >= board) resolved = true;
      } else {
        strikes++; box[ans.n].strikes++;
        log.push({ side: ctrl, round: r, player: ans.n, type: `strike ${strikes}`, text: `Round ${r}: ${ans.n} gets a big red X! Strike ${strikes}.` });
      }
    }
    let roundWinner = ctrl;
    if (resolved) { if (ctrl === "A") boardsA++; else boardsB++; }
    else {
      const stealSide = ctrl === "A" ? "B" : "A";
      const st = nextOf(stealSide === "A" ? teamA : teamB, stealSide);
      box[st.n].stealTries++;
      const sp = finalPerformance(st, weights);
      if (sp > 8) { box[st.n].steals++; box[st.n].fp += 8; roundWinner = stealSide; log.push({ side: stealSide, round: r, player: st.n, type: "steals the round!", nth: box[st.n].steals, runFp: r1(box[st.n].fp), text: `Round ${r}: ${st.n} STEALS the round for {${stealSide}} (+8)!` }); }
      else log.push({ side: stealSide, round: r, player: st.n, type: "steal attempt fails", text: `Round ${r}: ${st.n} tries the steal and misses. {${ctrl}} keeps the round.` });
    }
    const wt = roundWinner === "A" ? teamA : teamB;
    wt.forEach((p) => { box[p.n].fp += 10 / wt.length; box[p.n].roundShare = r1(box[p.n].roundShare + 10 / wt.length); });
    if (roundWinner === "A") wonA++; else wonB++;
    log.push({ side: roundWinner, round: r, type: "round won", text: `Round ${r} goes to {${roundWinner}} (+10 split across the team). Rounds: {A} ${wonA}, {B} ${wonB}.` });
  }
  finishBox(box, roster);
  const fa2 = fpSum(box, teamA), fb2 = fpSum(box, teamB);
  return {
    box, log, winnerTeam: wonA === wonB ? (fa2 >= fb2 ? "A" : "B") : wonA > wonB ? "A" : "B", scoreA: fa2, scoreB: fb2,
    columns: [{ k: "faceoffs", label: "Face-offs", tip: "Face-offs played" }, { k: "faceoffsWon", label: "FO won", tip: "Face-offs won" }, { k: "answers", label: "Answers", tip: "Board answers found, +3 FP each" }, { k: "topAnswers", label: "Top ans.", tip: "#1 answers, +5 FP each" }, { k: "strikes", label: "Strikes", tip: "Strikes given" }, { k: "stealTries", label: "Steal tries", tip: "Steal attempts" }, { k: "steals", label: "Steals", tip: "Successful steals, +8 FP each" }, { k: "roundShare", label: "Round pts", tip: "Share of the +10 round-win bonus" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: [{ label: "Rounds won", value: wonA }, { label: "Boards cleared", value: boardsA }], B: [{ label: "Rounds won", value: wonB }, { label: "Boards cleared", value: boardsB }] },
    resultLine: `Rounds won: ${wonA} to ${wonB}`,
    scoringKey: [{ label: "Correct answer", pts: 3 }, { label: "Top answer (extra)", pts: 5 }, { label: "Steal", pts: 8 }, { label: "Winning round (split across team)", pts: 10 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (on-air disaster)", pts: "-5 to -14" }],
  };
}

// ============================= SHARK TANK =============================
// Scoring: pitch category +1 (clarity, product, numbers, charisma); investor interest +5 per shark; deal secured +10; best valuation +10
const SHARKS = ["the tech billionaire", "the retail queen", "the real-estate mogul", "the skeptical venture capitalist", "the celebrity entrepreneur"];
const PITCH_IDEAS = ["a self-sharpening sword subscription", "a pocket-sized portal for lost socks", "an enchanted travel mug that never cools", "a heroic-origin-story podcast network", "a bulletproof cape in six colors", "a magical meal-prep service", "a premium sidekick staffing app", "an armor-polishing robot vacuum", "a spellbook that auto-updates", "a lair-security smart doorbell", "a monster-friendly dating app", "a victory-lap fitness tracker"];
function simSharkTank(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB];
  const box = newBox(roster, { idea: "", categories: 0, interest: 0, offers: 0, deal: 0, valuationK: 0, bestVal: 0 });
  const log = [];
  const sideOf = sideOfFn(teamA);
  let dealsA = 0, dealsB = 0;
  const pitches = [];
  roster.forEach((p) => {
    const side = sideOf(p), b = box[p.n];
    b.idea = PITCH_IDEAS[Math.floor(rnd() * PITCH_IDEAS.length)];
    if (rnd() < catastropheChance(p, 1) * 0.7) {
      const c = markCatastrophe(box, p, "faints on stage mid-pitch and has to be carried out");
      log.push({ side, player: p.n, idea: b.idea, type: "catastrophe", text: `${p.n} pitches ${b.idea} and then DISASTER — ${p.n} ${c.text} (${c.penalty} fantasy points).` });
      return;
    }
    const perf = finalPerformance(p, weights);
    const cats = clamp(Math.round((perf - 4) / 3 + rnd()), 0, 4);
    b.categories = cats; b.fp += cats;
    const interested = SHARKS.filter(() => rnd() < clamp((perf - 6) / 16, 0.03, 0.85));
    b.interest = interested.length; b.fp += interested.length * 5;
    let outcome;
    if (interested.length > 0 && perf > 10) {
      b.deal = 1; b.offers = interested.length; b.fp += 10;
      b.valuationK = Math.round((150 + perf * 55 + interested.length * 120 + rnd() * 300) / 10) * 10;
      outcome = `${interested.length} shark${interested.length > 1 ? "s" : ""} circle${interested.length > 1 ? "" : "s"} and ${interested[0]} makes the deal at a $${b.valuationK}K valuation`;
      if (side === "A") dealsA++; else dealsB++;
      log.push({ side, player: p.n, idea: b.idea, interested: interested.length, sharks: interested, valuationK: b.valuationK, type: interested.length > 1 ? "multiple sharks jump in" : "secures the investment", runFp: r1(b.fp), text: `${p.n} pitches ${b.idea}: ${cats} of 4 categories (+${cats}), ${interested.length} shark${interested.length > 1 ? "s" : ""} show interest (+${interested.length * 5}) — ${interested.join(", ")} — and the deal is secured (+10) at a $${b.valuationK}K valuation.` });
    } else if (interested.length > 0) {
      log.push({ side, player: p.n, idea: b.idea, interested: interested.length, type: "pitch lands okay, no deal", text: `${p.n} pitches ${b.idea}: ${cats} of 4 categories, interest from ${interested.join(" and ")} (+${interested.length * 5}), but no one makes an offer.` });
    } else {
      log.push({ side, player: p.n, idea: b.idea, type: cats <= 1 ? "pitch rejected outright" : "fumbles a tough question", text: `${p.n} pitches ${b.idea}: ${cats} of 4 categories (+${cats}), no shark bites. ${SHARKS[Math.floor(rnd() * SHARKS.length)]} says 'I'm out.'` });
    }
    pitches.push(p);
  });
  const dealers = roster.filter((p) => box[p.n].deal);
  if (dealers.length) {
    const best = dealers.reduce((a, c) => (box[c.n].valuationK > box[a.n].valuationK ? c : a), dealers[0]);
    box[best.n].fp += 10; box[best.n].bestVal = 1;
    log.push({ side: sideOf(best), player: best.n, type: "best valuation", valuationK: box[best.n].valuationK, text: `${best.n} posts the BEST VALUATION of the night, $${box[best.n].valuationK}K (+10)!` });
  }
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  const raised = (team) => team.reduce((s, p) => s + box[p.n].valuationK, 0);
  return {
    box, log, winnerTeam: fa >= fb ? "A" : "B", scoreA: fa, scoreB: fb,
    columns: [{ k: "idea", label: "Pitch", tip: "What they pitched" }, { k: "categories", label: "Categories", tip: "Pitch categories scored of 4, +1 FP each" }, { k: "interest", label: "Interest", tip: "Sharks interested, +5 FP each" }, { k: "offers", label: "Offers", tip: "Offers on the table" }, { k: "deal", label: "Deal", tip: "Deal secured, +10 FP" }, { k: "valuationK", label: "Valuation ($K)", tip: "Company valuation in thousands" }, { k: "bestVal", label: "Best val.", tip: "Best valuation of the night, +10 FP" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: [{ label: "Deals", value: `${dealsA}/${teamA.length}` }, { label: "Valuation raised", value: `$${raised(teamA)}K` }], B: [{ label: "Deals", value: `${dealsB}/${teamB.length}` }, { label: "Valuation raised", value: `$${raised(teamB)}K` }] },
    resultLine: `Deals secured: ${dealsA} to ${dealsB}`,
    scoringKey: [{ label: "Pitch category (of 4)", pts: 1 }, { label: "Investor interest (per shark)", pts: 5 }, { label: "Deal secured", pts: 10 }, { label: "Best valuation", pts: 10 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (collapse on stage)", pts: "-5 to -14" }],
  };
}

// ============================= BOXING / MMA RUMBLE =============================
// Scoring: significant strike +1; takedown +3; combo +3; knockdown +8; submission +10; KO +15; win +10
function simBoxing(teamA, teamB, weights, duration) {
  const n = Math.min(teamA.length, teamB.length);
  const rounds = duration === "long" ? 5 : duration === "short" ? 3 : 4;
  const roster = [...teamA, ...teamB];
  const box = newBox(roster, { sigLanded: 0, sigThrown: 0, acc: 0, takedowns: 0, combos: 0, knockdowns: 0, subs: 0, kos: 0, roundsWon: 0, wins: 0, losses: 0, finish: "" });
  const log = [];
  let winsA = 0, winsB = 0;
  const out = {};
  for (let i = 0; i < n; i++) {
    const a = teamA[i], b = teamB[i];
    if (out[a.n] || out[b.n]) { const w = out[a.n] ? b : a; if (!out[w.n]) { box[w.n].wins++; box[w.n].fp += 10; box[w.n].finish = "walkover"; if (w === a) winsA++; else winsB++; log.push({ side: w === a ? "A" : "B", matchup: i + 1, player: w.n, type: "wins on the cards", text: `Matchup ${i + 1}: ${w.n} gets a walkover (+10).` }); } continue; }
    let ra = 0, rb = 0, dmgA = 0, dmgB = 0, finisher = null, how = null;
    for (let r = 1; r <= rounds && !finisher; r++) {
      const pa = finalPerformance(a, weights), pb = finalPerformance(b, weights);
      [[a, b, pa, pb, "A"], [b, a, pb, pa, "B"]].forEach(([x, y, px, py, s]) => {
        if (finisher) return;
        if (rnd() < catastropheChance(x, rounds)) {
          const c = markCatastrophe(box, x, "is disqualified for an illegal strike and ejected");
          out[x.n] = true; finisher = y; how = "dq";
          log.push({ side: s === "A" ? "B" : "A", round: r, matchup: i + 1, player: x.n, victim: y.n, type: "catastrophe", text: `Matchup ${i + 1}, round ${r}: DISASTER — ${x.n} ${c.text} (${c.penalty} fantasy points). ${y.n} wins.` });
          return;
        }
        const thrown = Math.max(6, Math.round(10 + px * 1.1 + rnd() * 6));
        const landed = clamp(Math.round(thrown * clamp(0.35 + (px - py) / 40, 0.15, 0.7)), 1, thrown);
        box[x.n].sigThrown += thrown; box[x.n].sigLanded += landed; box[x.n].fp += landed;
        const tds = px > py && rnd() < 0.3 ? 1 + (rnd() < 0.3 ? 1 : 0) : 0;
        const combos = px > py && rnd() < 0.45 ? 1 : 0;
        if (tds) { box[x.n].takedowns += tds; box[x.n].fp += tds * 3; }
        if (combos) { box[x.n].combos += combos; box[x.n].fp += combos * 3; }
        if (s === "A") dmgB += landed + tds * 3 + combos * 3; else dmgA += landed + tds * 3 + combos * 3;
        let kd = false;
        if (px - py > 9 && rnd() < 0.55) { kd = true; box[x.n].knockdowns++; box[x.n].fp += 8; if (s === "A") dmgB += 15; else dmgA += 15; }
        let ev = `${x.n} lands ${landed} of ${thrown} significant strikes (+${landed})${tds ? `, ${tds} takedown${tds > 1 ? "s" : ""} (+${tds * 3})` : ""}${combos ? ", a combo (+3)" : ""}`;
        if (kd) ev += `, and scores a KNOCKDOWN (+8)`;
        if (kd || tds || landed >= 14) log.push({ side: s, round: r, matchup: i + 1, player: x.n, victim: y.n, type: kd ? "scores a knockdown" : "dominates the round", runFp: r1(box[x.n].fp), text: `Matchup ${i + 1}, round ${r}: ${ev}. ${x.n} has ${box[x.n].sigLanded} landed so far.` });
        // finishes
        const ko = kd && px > 18 && rnd() < 0.65;
        const sub = !ko && tds && px - py > 7 && rnd() < 0.3;
        if (ko) { finisher = x; how = "ko"; box[x.n].kos++; box[x.n].fp += 15; log.push({ side: s, round: r, matchup: i + 1, player: x.n, victim: y.n, type: "KO!", text: `Matchup ${i + 1}, round ${r}: KNOCKOUT! ${x.n} ends it with a devastating finish (+15)!` }); }
        else if (sub) { finisher = x; how = "sub"; box[x.n].subs++; box[x.n].fp += 10; log.push({ side: s, round: r, matchup: i + 1, player: x.n, victim: y.n, type: "KO!", text: `Matchup ${i + 1}, round ${r}: SUBMISSION! ${y.n} taps to ${x.n} (+10)!` }); }
      });
      if (!finisher) { if (pa > pb) { ra++; box[a.n].roundsWon++; } else { rb++; box[b.n].roundsWon++; } }
    }
    const winner = finisher || (ra >= rb ? a : b);
    const loser = winner === a ? b : a;
    const ws = winner === a ? "A" : "B";
    box[winner.n].wins++; box[winner.n].fp += 10; box[loser.n].losses++;
    box[winner.n].finish = how === "ko" ? "KO" : how === "sub" ? "SUB" : how === "dq" ? "DQ" : "DEC"; box[loser.n].finish = box[loser.n].finish || "L";
    if (!how) log.push({ side: ws, matchup: i + 1, player: winner.n, victim: loser.n, type: "wins on the cards", text: `Matchup ${i + 1}: ${winner.n} wins on the cards over ${loser.n}, ${Math.max(ra, rb)} rounds to ${Math.min(ra, rb)} (+10).` });
    else log.push({ side: ws, matchup: i + 1, player: winner.n, victim: loser.n, type: "bout result", text: `Matchup ${i + 1} result: ${winner.n} defeats ${loser.n} by ${how === "ko" ? "knockout" : how === "sub" ? "submission" : "disqualification"} (+10 for the win).` });
    if (ws === "A") winsA++; else winsB++;
  }
  roster.forEach((p) => { const b = box[p.n]; b.acc = b.sigThrown ? Math.round((b.sigLanded / b.sigThrown) * 100) : 0; });
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  return {
    box, log, winnerTeam: winsA === winsB ? (fa >= fb ? "A" : "B") : winsA > winsB ? "A" : "B", scoreA: fa, scoreB: fb,
    columns: [{ k: "finish", label: "Result", tip: "How the bout ended" }, { k: "sigLanded", label: "Sig. landed", tip: "Significant strikes landed, +1 FP each" }, { k: "sigThrown", label: "Sig. thrown", tip: "Significant strikes thrown" }, { k: "acc", label: "Acc%", tip: "Strike accuracy" }, { k: "takedowns", label: "TD", tip: "Takedowns, +3 FP each" }, { k: "combos", label: "Combos", tip: "+3 FP each" }, { k: "knockdowns", label: "KD", tip: "Knockdowns, +8 FP each" }, { k: "subs", label: "Subs", tip: "Submissions, +10 FP each" }, { k: "kos", label: "KO", tip: "Knockouts, +15 FP each" }, { k: "roundsWon", label: "Rds won", tip: "Rounds won on the cards" }, { k: "wins", label: "W", tip: "Win, +10 FP" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: [{ label: "Bouts won", value: winsA }, { label: "Finishes", value: teamA.reduce((s, p) => s + box[p.n].kos + box[p.n].subs, 0) }], B: [{ label: "Bouts won", value: winsB }, { label: "Finishes", value: teamB.reduce((s, p) => s + box[p.n].kos + box[p.n].subs, 0) }] },
    resultLine: `Bouts won: ${winsA} to ${winsB}`,
    scoringKey: [{ label: "Significant strike", pts: 1 }, { label: "Takedown", pts: 3 }, { label: "Combo", pts: 3 }, { label: "Knockdown", pts: 8 }, { label: "Submission", pts: 10 }, { label: "KO", pts: 15 }, { label: "Win", pts: 10 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (DQ)", pts: "-5 to -14" }],
  };
}

// ============================= ROAST BATTLE =============================
// Scoring: successful roast +3; knockout line +8; crowd reaction +3; round win +5
function simRoastBattle(teamA, teamB, weights, duration) {
  const n = Math.min(teamA.length, teamB.length);
  const roster = [...teamA, ...teamB];
  const box = newBox(roster, { roasts: 0, landed: 0, bombs: 0, koLines: 0, crowdPops: 0, boos: 0, roundWins: 0, bestRating: 0 });
  const log = [];
  let winsA = 0, winsB = 0;
  const ANGLES = ["their appearance", "their famous catchphrase", "their origin story", "their track record of failure", "their costume", "their sidekick", "their most embarrassing defeat", "their ego", "their voice", "their questionable life choices"];
  for (let i = 0; i < n; i++) {
    const a = teamA[i], b = teamB[i];
    const tot = { A: 0, B: 0 };
    [1, 2].forEach((turn) => {
      [{ p: a, side: "A", target: b }, { p: b, side: "B", target: a }].forEach(({ p, side, target }) => {
        const bx = box[p.n];
        if (rnd() < catastropheChance(p, n * 2)) {
          const c = markCatastrophe(box, p, "gets booed off the stage and refuses to come back");
          log.push({ side, player: p.n, target: target.n, matchup: i + 1, type: "catastrophe", delivery: "freezes up and loses the room completely", crowd: "a wall of boos", text: `Matchup ${i + 1}: DISASTER — ${p.n} ${c.text} (${c.penalty} fantasy points).` });
          tot[side] -= 5; return;
        }
        const perf = finalPerformance(p, weights);
        bx.roasts++; if (perf > bx.bestRating) bx.bestRating = r1(perf);
        const angle = ANGLES[Math.floor(rnd() * ANGLES.length)];
        tot[side] += perf;
        if (perf > 15) {
          bx.landed++; bx.crowdPops++; bx.fp += 3 + 3;
          let ko = false;
          if (perf > 18.5) { ko = true; bx.koLines++; bx.fp += 8; }
          log.push({ side, player: p.n, target: target.n, angle, matchup: i + 1, delivery: ko ? "closes with a knockout line that ends the whole exchange" : "lands a brutal, perfectly-timed burn", crowd: ko ? "the room comes unglued" : "the room erupts", type: `roasts ${target.n} about ${angle} — the room erupts`, runFp: r1(bx.fp),
            text: `Matchup ${i + 1}, roast ${turn}: ${p.n} roasts ${target.n} about ${angle} and the room erupts (+3 roast, +3 crowd${ko ? ", +8 KNOCKOUT LINE" : ""}). That is landed roast number ${bx.landed} for ${p.n}.` });
        } else if (perf < 3) {
          bx.bombs++;
          log.push({ side, player: p.n, target: target.n, angle, matchup: i + 1, delivery: "swings at an easy target and whiffs completely", crowd: "dead silence, someone coughs", type: `bombs a joke about ${target.n} over ${angle} — dead silence`, text: `Matchup ${i + 1}, roast ${turn}: ${p.n} bombs a joke about ${target.n} over ${angle}. Dead silence.` });
        } else if (perf < 6) {
          bx.boos++;
          log.push({ side, player: p.n, target: target.n, angle, matchup: i + 1, delivery: "goes too far and loses the room", crowd: "audible boos", type: `takes a cheap shot at ${target.n} over ${angle} — crowd boos`, text: `Matchup ${i + 1}, roast ${turn}: ${p.n} takes a cheap shot at ${target.n} over ${angle} and the crowd boos.` });
        } else {
          bx.landed++; bx.fp += 3;
          log.push({ side, player: p.n, target: target.n, angle, matchup: i + 1, delivery: "gets a solid, respectable chuckle", crowd: "decent laughs", type: `works ${target.n} over ${angle} for a solid laugh`, runFp: r1(bx.fp), text: `Matchup ${i + 1}, roast ${turn}: ${p.n} works ${target.n} over ${angle} for a solid laugh (+3).` });
        }
      });
    });
    const winSide = tot.A >= tot.B ? "A" : "B";
    const winner = winSide === "A" ? a : b, loser = winSide === "A" ? b : a;
    box[winner.n].roundWins++; box[winner.n].fp += 5;
    log.push({ side: winSide, player: winner.n, target: loser.n, matchup: i + 1, delivery: Math.abs(tot.A - tot.B) > 10 ? "closes with a knockout line that ends the whole exchange" : "edges out a close back-and-forth", type: Math.abs(tot.A - tot.B) > 10 ? `absolutely destroys ${loser.n} — knockout line` : `narrowly wins the exchange over ${loser.n}`, text: `Matchup ${i + 1} result: ${winner.n} wins the exchange over ${loser.n} (round win +5), ${r1(Math.max(tot.A, tot.B))} to ${r1(Math.min(tot.A, tot.B))} on the room meter.` });
    if (winSide === "A") winsA++; else winsB++;
  }
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  return {
    box, log, winnerTeam: winsA === winsB ? (fa >= fb ? "A" : "B") : winsA > winsB ? "A" : "B", scoreA: fa, scoreB: fb,
    columns: [{ k: "roasts", label: "Roasts", tip: "Roasts delivered" }, { k: "landed", label: "Landed", tip: "Successful roasts, +3 FP each" }, { k: "crowdPops", label: "Crowd pops", tip: "Room-erupting reactions, +3 FP each" }, { k: "koLines", label: "KO lines", tip: "Knockout lines, +8 FP each" }, { k: "bombs", label: "Bombs", tip: "Jokes that died in silence" }, { k: "boos", label: "Boos", tip: "Cheap shots the crowd booed" }, { k: "roundWins", label: "Round W", tip: "Round wins, +5 FP each" }, { k: "bestRating", label: "Best roast", tip: "Best single-roast rating" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: [{ label: "Exchanges won", value: winsA }], B: [{ label: "Exchanges won", value: winsB }] }, resultLine: `Exchanges won: ${winsA} to ${winsB}`,
    scoringKey: [{ label: "Successful roast", pts: 3 }, { label: "Knockout line", pts: 8 }, { label: "Crowd reaction", pts: 3 }, { label: "Round win", pts: 5 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (booed off)", pts: "-5 to -14" }],
  };
}

// ============================= HOLLYWOOD SQUARES =============================
// 11 per side: 9 celebrities fill the tic-tac-toe board, 2 are the contestants. Contestants play against the OPPOSING
// team's board. Each square gives a true-or-false statement (honest or a deliberate bluff). A correct call claims the square.
// Scoring: correct answer +3; square claimed +2 (by contestant, or held by the celebrity who fooled them); three-in-row +10; winning round +10
function simHollywoodSquares(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB];
  const box = newBox(roster, { role: "", calls: 0, correct: 0, wrong: 0, squares: 0, statements: 0, bluffs: 0, fooled: 0, honest: 0, threeInRow: 0, roundShare: 0 });
  const log = [];
  function setup(team) {
    const sorted = [...team].sort((a, b) => (b.wi + b.it) - (a.wi + a.it));
    const contestants = sorted.slice(0, 2), celebrities = sorted.slice(2, 11);
    contestants.forEach((p) => (box[p.n].role = "Contestant"));
    celebrities.forEach((p) => (box[p.n].role = "Square"));
    return { contestants, celebrities };
  }
  const A = setup(teamA), B = setup(teamB);
  const WIN_LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  const tally = { A: { claimed: 0, held: 0 }, B: { claimed: 0, held: 0 } };
  function playBoard(contestants, celebrities, side, oppSide) {
    const claimed = Array(9).fill(null);
    let three = false;
    for (let turn = 0; turn < 9; turn++) {
      const open = claimed.map((c, i) => (c === null ? i : -1)).filter((i) => i >= 0);
      if (!open.length) break;
      const contestant = contestants[turn % contestants.length];
      const sq = open[Math.floor(rnd() * open.length)];
      const celeb = celebrities[sq % celebrities.length];
      const bluffing = rnd() < 0.45;
      const bq = finalPerformance(celeb, weights), rq = finalPerformance(contestant, weights);
      const correct = rq + (rnd() - 0.5) * 6 > bq;
      box[celeb.n].statements++; box[contestant.n].calls++;
      if (bluffing) box[celeb.n].bluffs++; else box[celeb.n].honest++;
      const st = bluffing ? "a deliberate bluff" : "an honest answer";
      if (correct) {
        claimed[sq] = "contestant"; tally[side].claimed++;
        box[contestant.n].correct++; box[contestant.n].squares++; box[contestant.n].fp += 5;
        log.push({ side, player: contestant.n, opponent: celeb.n, square: sq + 1, statementType: st, nth: box[contestant.n].correct, runFp: r1(box[contestant.n].fp), type: `${contestant.n} sees through ${celeb.n} giving ${st} and claims square ${sq + 1}`,
          text: `${contestant.n} reads ${celeb.n}'s statement on square ${sq + 1} (${st}) correctly and claims the square (+3 correct, +2 square). That is correct call number ${box[contestant.n].correct} for ${contestant.n}.` });
      } else {
        claimed[sq] = "square"; tally[side].held++;
        box[contestant.n].wrong++;
        box[celeb.n].squares++; box[celeb.n].fp += 2; if (bluffing) box[celeb.n].fooled++;
        log.push({ side: oppSide, player: celeb.n, opponent: contestant.n, square: sq + 1, statementType: st, nth: box[celeb.n].squares, runFp: r1(box[celeb.n].fp), type: `${celeb.n} baits ${contestant.n} into the wrong call and holds square ${sq + 1}`,
          text: `${celeb.n} delivers ${st} on square ${sq + 1}, ${contestant.n} calls it wrong, and ${celeb.n} holds the square (+2).` });
      }
      for (const line of WIN_LINES) {
        if (line.every((i) => claimed[i] === "contestant")) {
          three = true;
          contestants.forEach((p) => { box[p.n].fp += 5; box[p.n].threeInRow++; });
          log.push({ side, player: contestant.n, type: `${contestants.map((p) => p.n).join(" and ")} complete a three-in-a-row across squares ${line.map((i) => i + 1).join(", ")}`, text: `THREE IN A ROW! ${contestants.map((p) => p.n).join(" and ")} complete squares ${line.map((i) => i + 1).join(", ")} (+10 split between them).` });
          break;
        }
      }
      if (three) break;
    }
    return three;
  }
  const aWon = playBoard(A.contestants, B.celebrities, "A", "B");
  const bWon = playBoard(B.contestants, A.celebrities, "B", "A");
  const pre = { A: fpSum(box, teamA), B: fpSum(box, teamB) };
  let winnerTeam;
  if (aWon && !bWon) winnerTeam = "A"; else if (bWon && !aWon) winnerTeam = "B"; else winnerTeam = pre.A >= pre.B ? "A" : "B";
  const wt = winnerTeam === "A" ? teamA : teamB;
  wt.forEach((p) => { box[p.n].fp += 10 / wt.length; box[p.n].roundShare = r1(10 / wt.length); });
  log.push({ side: winnerTeam, player: null, type: "takes the round", text: `{${winnerTeam}} takes the round${(aWon && !bWon) || (bWon && !aWon) ? " with the only three-in-a-row" : " on points"} (+10 split across the team).` });
  roster.forEach((p) => { if (rnd() < catastropheChance(p, 1) * 0.4) markCatastrophe(box, p, "has a complete on-air meltdown and has to be replaced mid-show"); });
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  return {
    box, log, winnerTeam, scoreA: fa, scoreB: fb,
    columns: [{ k: "role", label: "Role", tip: "Contestant or celebrity square" }, { k: "calls", label: "Calls", tip: "True/false calls made" }, { k: "correct", label: "Correct", tip: "Correct calls, +3 FP each" }, { k: "wrong", label: "Wrong", tip: "Wrong calls" }, { k: "squares", label: "Squares", tip: "Squares claimed or held, +2 FP each" }, { k: "statements", label: "Statements", tip: "Statements delivered as a celebrity" }, { k: "bluffs", label: "Bluffs", tip: "Deliberate bluffs" }, { k: "fooled", label: "Fooled", tip: "Contestants successfully fooled" }, { k: "threeInRow", label: "3-in-row", tip: "Three-in-a-row, +10 split" }, { k: "roundShare", label: "Round pts", tip: "Share of the +10 winning-round bonus" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: [{ label: "Squares claimed", value: tally.A.claimed }, { label: "Squares held by celebs", value: tally.B.held }, { label: "Three-in-a-row", value: aWon ? "Yes" : "No" }], B: [{ label: "Squares claimed", value: tally.B.claimed }, { label: "Squares held by celebs", value: tally.A.held }, { label: "Three-in-a-row", value: bWon ? "Yes" : "No" }] },
    resultLine: `Three-in-a-row: ${aWon ? "first team" : "no"} / ${bWon ? "second team" : "no"}`,
    scoringKey: [{ label: "Correct answer", pts: 3 }, { label: "Square claimed / held", pts: 2 }, { label: "Three-in-a-row (split)", pts: 10 }, { label: "Winning round (split across team)", pts: 10 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (on-air meltdown)", pts: "-5 to -14" }],
  };
}

// ============================= NINJA WARRIOR =============================
// 8 obstacles, checkpoint after #4, difficult obstacles at 5, 7 and 8.
// Scoring: obstacle +3; difficult obstacle +5; checkpoint +5; course completion +20; fastest time +10
function simNinjaWarrior(teamA, teamB, weights) {
  const N = 8, HARD = [5, 7, 8], CP = 4;
  const roster = [...teamA, ...teamB];
  const sideOf = sideOfFn(teamA);
  const box = newBox(roster, { cleared: 0, hardCleared: 0, checkpoint: 0, stumbles: 0, fellAt: 0, completed: 0, time: 0, fastest: 0 });
  const log = [];
  const runs = roster.map((p) => {
    const b = box[p.n], side = sideOf(p);
    let t = 0, fell = false;
    for (let o = 1; o <= N; o++) {
      const hard = HARD.includes(o);
      const perf = finalPerformance(p, weights) - (hard ? 2.5 : 0);
      if (rnd() < catastropheChance(p, N)) {
        const c = markCatastrophe(box, p, "takes a brutal fall and has to be helped off the course");
        b.fellAt = o; fell = true;
        log.push({ side, player: p.n, obstacle: o, type: "catastrophe", text: `Obstacle ${o}: DISASTER — ${p.n} ${c.text} (${c.penalty} fantasy points).` });
        break;
      }
      if (perf > 15) {
        b.cleared++; b.fp += hard ? 5 : 3; if (hard) b.hardCleared++;
        t += r1(5.5 + (24 - perf) * 0.25 + rnd());
        if (perf > 21) log.push({ side, player: p.n, obstacle: o, type: "flashy style-point move", text: `Obstacle ${o}${hard ? " (a DIFFICULT one)" : ""}: ${p.n} flies through with a flashy style-point move (+${hard ? 5 : 3}).` });
        else if (hard || o === CP) log.push({ side, player: p.n, obstacle: o, type: "clears", runFp: r1(b.fp), text: `Obstacle ${o}${hard ? " (a DIFFICULT one)" : ""}: ${p.n} clears it (+${hard ? 5 : 3}). That is ${b.cleared} cleared so far.` });
        if (o === CP) { b.checkpoint = 1; b.fp += 5; log.push({ side, player: p.n, obstacle: o, type: "checkpoint", text: `${p.n} slaps the halfway checkpoint after ${r1(t)} seconds (+5)!` }); }
      } else if (perf > 8) {
        b.stumbles++; t += r1(9 + rnd() * 4);
        b.cleared++; b.fp += hard ? 5 : 3; if (hard) b.hardCleared++;
        if (o === CP) { b.checkpoint = 1; b.fp += 5; }
        log.push({ side, player: p.n, obstacle: o, type: `fails obstacle ${o}, resets`, text: `Obstacle ${o}${hard ? " (a DIFFICULT one)" : ""}: ${p.n} wobbles and nearly goes in, scrapes through the second attempt (+${hard ? 5 : 3}) but loses time.` });
      } else {
        b.fellAt = o; fell = true;
        log.push({ side, player: p.n, obstacle: o, type: `falls at obstacle ${o}`, text: `Obstacle ${o}${hard ? " (a DIFFICULT one)" : ""}: ${p.n} FALLS into the water after clearing ${b.cleared}.` });
        break;
      }
    }
    if (!fell && b.cleared >= N) { b.completed = 1; b.fp += 20; b.time = r1(t); log.push({ side, player: p.n, type: "completes the entire course!", text: `${p.n} COMPLETES the entire course in ${r1(t)} seconds (+20)!` }); }
    return { p, cleared: b.cleared, time: t, completed: b.completed };
  });
  const finishers = runs.filter((r) => r.completed).sort((a, b) => a.time - b.time);
  const fastest = finishers[0] || [...runs].filter((r) => !box[r.p.n].catastrophe).sort((a, b) => b.cleared - a.cleared)[0];
  if (fastest) {
    box[fastest.p.n].fp += 10; box[fastest.p.n].fastest = 1;
    log.push({ side: sideOf(fastest.p), player: fastest.p.n, type: "fastest time of the night", text: finishers.length ? `${fastest.p.n} posts the fastest time of the night, ${r1(fastest.time)} seconds (+10)!` : `Nobody finishes, so ${fastest.p.n} takes the fastest-run bonus (+10) for getting the farthest with ${fastest.cleared} obstacles.` });
  }
  finishBox(box, roster);
  const order = [...runs].sort((a, b) => (b.completed - a.completed) || (b.cleared - a.cleared) || (a.time - b.time)).map((r) => r.p.n);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  const comp = (team) => team.filter((p) => box[p.n].completed).length;
  return {
    box, log, finishOrder: order, scoreA: fa, scoreB: fb, winnerTeam: fa >= fb ? "A" : "B",
    columns: [{ k: "cleared", label: "Cleared", tip: "Obstacles cleared of 8" }, { k: "hardCleared", label: "Hard ✓", tip: "Difficult obstacles cleared (5, 7, 8), +5 FP each" }, { k: "checkpoint", label: "Checkpoint", tip: "Halfway checkpoint, +5 FP" }, { k: "stumbles", label: "Stumbles", tip: "Near-falls that cost time" }, { k: "fellAt", label: "Fell at", tip: "Obstacle where the run ended (0 = none)" }, { k: "completed", label: "Complete", tip: "Course completion, +20 FP" }, { k: "time", label: "Time (s)", tip: "Course time for finishers" }, { k: "fastest", label: "Fastest", tip: "+10 FP" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: [{ label: "Course completions", value: comp(teamA) }, { label: "Obstacles cleared", value: teamA.reduce((s, p) => s + box[p.n].cleared, 0) }], B: [{ label: "Course completions", value: comp(teamB) }, { label: "Obstacles cleared", value: teamB.reduce((s, p) => s + box[p.n].cleared, 0) }] },
    resultLine: `Course completions: ${comp(teamA)} to ${comp(teamB)}`,
    scoringKey: [{ label: "Obstacle", pts: 3 }, { label: "Difficult obstacle (5, 7, 8)", pts: 5 }, { label: "Checkpoint (after #4)", pts: 5 }, { label: "Course completion", pts: 20 }, { label: "Fastest time", pts: 10 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (injury fall)", pts: "-5 to -14" }],
  };
}

// ============================= CAPTURE THE FLAG =============================
// 11 v 11. Each team guards 3 flags and must steal and return all 3 enemy flags to win a match. Best of 3 matches.
// Eliminated players respawn at the start of the next round. Captains pick offense/defense every round.
// All combat is legal except time-stop and universe-destroying powers (doing it = disqualification).
// A dropped flag stays on the course until it is picked up and carried home, or sent back to its stand by a defender.
// Scoring: enemy elimination +3; flag steal +10; flag return +15; winning capture +10; time of possession +0.01 per second.
const CTF_COLUMNS = [
  { k: "role", label: "Role", tip: "Most-used assignment (OFF / DEF)" },
  { k: "top", label: "TOP", fmt: "mmss", tip: "Time of possession while carrying a flag, +0.01 FP per second" },
  { k: "elims", label: "Elims", tip: "Enemies eliminated, +3 FP each" }, { k: "deaths", label: "Elim'd", tip: "Times eliminated" },
  { k: "steals", label: "Steals", tip: "Flags stolen off the enemy stand, +10 FP each" }, { k: "returns", label: "Returns", tip: "Flags carried home and scored, +15 FP each" },
  { k: "recoveries", label: "Recoveries", tip: "Dropped flags sent back to their stand by a defender, +15 FP each" }, { k: "winCaps", label: "Win caps", tip: "Match-winning captures, +10 FP each" },
  { k: "carrierKills", label: "Carrier kills", tip: "Enemy flag carriers eliminated" }, { k: "supers", label: "Supers", tip: "Super ability used (one temporary advantage per match)" },
  { k: "participation", label: "Part.", tip: "Participation credit" },
];
const CTF_KEY = [{ label: "Enemy elimination", pts: 3 }, { label: "Flag steal", pts: 10 }, { label: "Flag return (carry home, or send your dropped flag back)", pts: 15 }, { label: "Winning capture", pts: 10 }, { label: "Time of possession (per second)", pts: 0.01 }, { label: "Participation", pts: "1.0-3.0" }, { label: "Catastrophe (banned power DQ / injury)", pts: "-5 to -14" }];

function simCaptureFlag(teamA, teamB, weights, duration) {
  const W = weights;
  const roster = [...teamA, ...teamB];
  const sideOf = sideOfFn(teamA);
  const teams = { A: teamA, B: teamB };
  const roundsPerMatch = duration === "short" ? 5 : duration === "long" ? 9 : 7;
  const TICK = 15, TICKS = 5;
  const box = newBox(roster, { role: "", top: 0, elims: 0, deaths: 0, steals: 0, returns: 0, recoveries: 0, winCaps: 0, carrierKills: 0, supers: 0, offRounds: 0, defRounds: 0 });
  const out = {};
  const log = [];
  const wins = { A: 0, B: 0 };
  const teamTop = { A: 0, B: 0 }, teamElims = { A: 0, B: 0 }, teamCaps = { A: 0, B: 0 }, teamSupers = { A: 0, B: 0 };
  const matchLines = [];
  let clockSeconds = 0;
  const opp = (s) => (s === "A" ? "B" : "A");
  const perfCache = {};
  const perf = (p) => finalPerformance(p, W);

  function playMatch(mNo) {
    const flags = { A: [1, 2, 3].map((id) => ({ id, owner: "A", state: "home", by: null, ticks: 0 })), B: [1, 2, 3].map((id) => ({ id, owner: "B", state: "home", by: null, ticks: 0 })) };
    const supersUsed = {}; roster.forEach((p) => (supersUsed[p.n] = false));
    const dead = {};
    const capturedBy = { A: 0, B: 0 }; // flags captured BY side
    const mTop = { A: 0, B: 0 };
    let matchWinner = null, winCapBy = null;
    const tag = `Match ${mNo}`;
    function aliveOf(s) { return teams[s].filter((p) => !out[p.n] && !dead[p.n]); }
    function fight(a, d, ctx) {
      let pa = perf(a), pd = perf(d);
      [[a, "pa"], [d, "pd"]].forEach(([p, w]) => {
        const foe = p === a ? pd : pa;
        if (!supersUsed[p.n] && foe > (p === a ? pa : pd) && rnd() < 0.35) {
          supersUsed[p.n] = true; box[p.n].supers++; teamSupers[sideOf(p)]++;
          if (p === a) pa += 4; else pd += 4;
          if (rnd() < 0.55) log.push({ side: sideOf(p), match: mNo, round: ctx.round, player: p.n, victim: p === a ? d.n : a.n, type: "super", text: `${tag}, round ${ctx.round}: ${p.n} unleashes a super ability for one temporary edge against ${p === a ? d.n : a.n}.` });
        }
      });
      const pw = 1 / (1 + Math.exp(-(pa - pd) / 3.2));
      return rnd() < pw ? a : d;
    }
    function eliminate(winner, loser, ctx) {
      dead[loser.n] = true; box[loser.n].deaths++;
      box[winner.n].elims++; box[winner.n].fp += 0; teamElims[sideOf(winner)]++;
      const carried = Object.values(flags).flat().filter((f) => f.state === "carried" && f.by === loser.n);
      carried.forEach((f) => { f.state = "dropped"; f.by = null; box[winner.n].carrierKills++; });
      if (carried.length) {
        log.push({ side: sideOf(winner), match: mNo, round: ctx.round, player: winner.n, victim: loser.n, type: "drop", nth: box[winner.n].elims, text: `${tag}, round ${ctx.round}: ${winner.n} eliminates flag carrier ${loser.n}! The flag is DROPPED on the course and anyone can grab it. That is elimination number ${box[winner.n].elims} for ${winner.n}.` });
      } else if (rnd() < 0.5 || box[winner.n].elims % 3 === 0) {
        log.push({ side: sideOf(winner), match: mNo, round: ctx.round, player: winner.n, victim: loser.n, type: "elim", nth: box[winner.n].elims, text: `${tag}, round ${ctx.round}: ${winner.n} eliminates ${loser.n} (+3). That is elimination number ${box[winner.n].elims} for ${winner.n}.` });
      }
    }
    for (let r = 1; r <= roundsPerMatch && !matchWinner; r++) {
      // respawn
      Object.keys(dead).forEach((k) => delete dead[k]);
      const ctx = { round: r };
      // catastrophes: attempting a banned power or a crushing injury
      roster.forEach((p) => {
        if (out[p.n]) return;
        if (rnd() < catastropheChance(p, roundsPerMatch * 2) * 0.7) {
          const ban = rnd() < 0.5;
          const c = markCatastrophe(box, p, ban ? "tries to freeze time (a banned power) and is disqualified from the event" : "is knocked unconscious by a crushing blow and carried off the course");
          out[p.n] = true;
          Object.values(flags).flat().forEach((f) => { if (f.state === "carried" && f.by === p.n) { f.state = "dropped"; f.by = null; } });
          log.push({ side: sideOf(p), match: mNo, round: r, player: p.n, type: "catastrophe", text: `${tag}, round ${r}: DISASTER — ${p.n} ${c.text}! (${c.penalty} fantasy points)` });
        }
      });
      // captains pick offense and defense
      const assign = {};
      ["A", "B"].forEach((s) => {
        const al = aliveOf(s);
        const cap = [...teams[s]].filter((p) => !out[p.n]).sort((a, b) => (b.wi + b.ch + b.it) - (a.wi + a.ch + a.it))[0];
        const trailing = capturedBy[s] < capturedBy[opp(s)];
        const offN = clamp(Math.round(al.length * (0.45 + (trailing ? 0.15 : 0) + ((cap ? cap.wi : 11) - 11) * 0.008)), Math.min(2, al.length), Math.max(2, al.length - 2));
        const ranked = [...al].sort((a, b) => (b.dx * 1.2 + b.st * 0.5 + b.ch * 0.3 + b.lk * 0.3) - (a.dx * 1.2 + a.st * 0.5 + a.ch * 0.3 + a.lk * 0.3));
        assign[s] = { off: ranked.slice(0, offN).map((p) => p.n), def: ranked.slice(offN).map((p) => p.n) };
        assign[s].off.forEach((n) => box[n].offRounds++); assign[s].def.forEach((n) => box[n].defRounds++);
        if (r === 1 || trailing) log.push({ side: s, match: mNo, round: r, player: cap ? cap.n : null, type: "captains", text: `${tag}, round ${r}: captain ${cap ? cap.n : "?"} sends ${offN} to attack and keeps ${al.length - offN} home to guard for {${s}}.` });
      });
      for (let t = 1; t <= TICKS && !matchWinner; t++) {
        clockSeconds += TICK;
        const engaged = {};
        // 1. carriers push for home
        ["A", "B"].forEach((owner) => {
          flags[owner].filter((f) => f.state === "carried").forEach((f) => {
            const c = roster.find((p) => p.n === f.by);
            if (!c || dead[c.n] || out[c.n]) return;
            const cs = sideOf(c);
            f.ticks++;
            const defs = aliveOf(owner).filter((d) => !engaged[d.n]);
            const escorts = aliveOf(cs).filter((p) => p.n !== c.n && assign[cs].off.includes(p.n)).length;
            if (defs.length && rnd() < clamp(0.8 - escorts * 0.05, 0.35, 0.85)) {
              const d = weightedPick(defs, (x) => x.wi + x.dx + 4);
              engaged[d.n] = true;
              const w = fight(c, d, ctx);
              if (w === c) eliminate(c, d, ctx); else { eliminate(d, c, ctx); return; }
            }
            // time of possession for this tick
            const full = f.ticks > 1 ? TICK : TICK * 0.55;
            box[c.n].top += full; mTop[cs] += full; teamTop[cs] += full;
            if (f.ticks >= 2 && !dead[c.n]) {
              f.state = "captured"; capturedBy[cs]++; teamCaps[cs]++;
              box[c.n].returns++; box[c.n].fp += 15;
              const last = capturedBy[cs] >= 3;
              if (last) { box[c.n].winCaps++; box[c.n].fp += 10; matchWinner = cs; winCapBy = c.n; }
              log.push({ side: cs, match: mNo, round: r, player: c.n, type: last ? "winCap" : "score", nth: box[c.n].returns, runFp: r1(box[c.n].fp + 0), topNow: Math.round(box[c.n].top), text: `${tag}, round ${r}: ${c.n} carries the flag HOME for {${cs}} (+15)${last ? ` and it is the THIRD flag: WINNING CAPTURE (+10)!` : `! That is capture ${capturedBy[cs]} of 3 for {${cs}}.`} ${c.n} has held flags for ${Math.round(box[c.n].top)} seconds in total.` });
            }
          });
        });
        if (matchWinner) break;
        // 2. dropped flags: teammates of the thief pick them up, or defenders send them back
        ["A", "B"].forEach((owner) => {
          flags[owner].filter((f) => f.state === "dropped").forEach((f) => {
            const thieves = aliveOf(opp(owner)).filter((p) => !engaged[p.n] && !Object.values(flags).flat().some((g) => g.state === "carried" && g.by === p.n));
            const defs = aliveOf(owner).filter((p) => !engaged[p.n]);
            const defFirst = rnd() < 0.5;
            const tryDef = () => { if (defs.length && rnd() < 0.65) { const d = weightedPick(defs, (x) => x.dx + x.st + 3); engaged[d.n] = true; f.state = "home"; f.by = null; f.ticks = 0; box[d.n].recoveries++; box[d.n].fp += 15; log.push({ side: owner, match: mNo, round: r, player: d.n, type: "recover", nth: box[d.n].recoveries, runFp: r1(box[d.n].fp), text: `${tag}, round ${r}: ${d.n} gets to the dropped flag first and sends it back to its stand for {${owner}} (+15)!` }); return true; } return false; };
            const tryThief = () => { if (thieves.length && rnd() < 0.6) { const th = weightedPick(thieves, (x) => x.dx + x.wi + 3); engaged[th.n] = true; f.state = "carried"; f.by = th.n; f.ticks = Math.max(1, f.ticks); log.push({ side: sideOf(th), match: mNo, round: r, player: th.n, type: "pickup", text: `${tag}, round ${r}: ${th.n} scoops up the dropped flag and keeps the run going for {${sideOf(th)}}!` }); box[th.n].top += TICK * 0.5; mTop[sideOf(th)] += TICK * 0.5; teamTop[sideOf(th)] += TICK * 0.5; return true; } return false; };
            if (defFirst) { if (!tryDef()) tryThief(); } else { if (!tryThief()) tryDef(); }
          });
        });
        // 3. infiltration: attackers try to get past the guards and steal
        ["A", "B"].forEach((s) => {
          const es = opp(s);
          const attackers = assign[s].off.map((n) => roster.find((p) => p.n === n)).filter((p) => p && !dead[p.n] && !out[p.n] && !Object.values(flags).flat().some((g) => g.state === "carried" && g.by === p.n));
          attackers.sort(() => rnd() - 0.5).forEach((a) => {
            if (dead[a.n]) return;
            const home = flags[es].filter((f) => f.state === "home");
            if (!home.length) return;
            const defs = aliveOf(es).filter((d) => !engaged[d.n]);
            let alive = true;
            if (defs.length) {
              const d = weightedPick(defs, (x) => x.wi + x.dx + (assign[es].def.includes(x.n) ? 6 : 0) + 3);
              engaged[d.n] = true;
              const w = fight(a, d, ctx);
              if (w === a) eliminate(a, d, ctx); else { eliminate(d, a, ctx); alive = false; }
            }
            if (alive && rnd() < clamp(0.5 + (perf(a) - 11) / 28, 0.25, 0.85)) {
              const f = flags[es].find((x) => x.state === "home");
              if (!f) return;
              f.state = "carried"; f.by = a.n; f.ticks = 0;
              box[a.n].steals++; box[a.n].fp += 10; box[a.n].top += TICK * 0.5; mTop[s] += TICK * 0.5; teamTop[s] += TICK * 0.5;
              log.push({ side: s, match: mNo, round: r, player: a.n, type: "steal", nth: box[a.n].steals, runFp: r1(box[a.n].fp), text: `${tag}, round ${r}: ${a.n} slips through and STEALS one of {${es}}'s flags (+10)! That is steal number ${box[a.n].steals} for ${a.n}.` });
            }
          });
        });
      }
    }
    if (!matchWinner) {
      if (capturedBy.A !== capturedBy.B) matchWinner = capturedBy.A > capturedBy.B ? "A" : "B";
      else if (Math.round(mTop.A) !== Math.round(mTop.B)) matchWinner = mTop.A > mTop.B ? "A" : "B";
      else matchWinner = rnd() < 0.5 ? "A" : "B";
      log.push({ side: matchWinner, match: mNo, type: "timeout", text: `${tag}: time expires with the flags at {A} ${capturedBy.A}, {B} ${capturedBy.B}. {${matchWinner}} takes it on ${capturedBy.A !== capturedBy.B ? "flags captured" : "time of possession"}.` });
    }
    wins[matchWinner]++;
    const line = { n: mNo, winner: matchWinner, flagsA: capturedBy.A, flagsB: capturedBy.B, topA: Math.round(mTop.A), topB: Math.round(mTop.B), winCapBy };
    matchLines.push(line);
    log.push({ side: matchWinner, match: mNo, type: "matchEnd", text: `${tag} goes to {${matchWinner}}, ${capturedBy.A} flags to ${capturedBy.B}. Time of possession: {A} ${mmss(mTop.A)}, {B} ${mmss(mTop.B)}. Series: {A} ${wins.A}, {B} ${wins.B}.` });
  }
  let mNo = 0;
  while (wins.A < 2 && wins.B < 2 && mNo < 3) { mNo++; playMatch(mNo); }
  const winnerTeam = wins.A > wins.B ? "A" : "B";
  log.push({ side: winnerTeam, type: "seriesEnd", text: `SERIES: {${winnerTeam}} wins the best-of-three, ${Math.max(wins.A, wins.B)} matches to ${Math.min(wins.A, wins.B)}.` });
  roster.forEach((p) => {
    const b = box[p.n];
    b.top = Math.round(b.top);
    b.role = b.offRounds >= b.defRounds ? "OFF" : "DEF";
    b.fp = b.elims * 3 + b.steals * 10 + b.returns * 15 + b.recoveries * 15 + b.winCaps * 10 + b.top * 0.01 + (b.catastrophe ? b.penalty : 0);
  });
  finishBox(box, roster);
  const sumK = (team, k) => team.reduce((s, p) => s + box[p.n][k], 0);
  const ts = (s, team) => [{ label: "Matches won", value: wins[s] }, { label: "Flags returned", value: teamCaps[s] }, { label: "Time of possession", value: mmss(teamTop[s]) }, { label: "Eliminations", value: teamElims[s] }, { label: "Steals", value: sumK(team, "steals") }, { label: "Recoveries", value: sumK(team, "recoveries") }, { label: "Supers used", value: teamSupers[s] }];
  return {
    box, log, scoreA: fpSum(box, teamA), scoreB: fpSum(box, teamB), winnerTeam, gameScore: { A: wins.A, B: wins.B },
    columns: CTF_COLUMNS, teamStats: { A: ts("A", teamA), B: ts("B", teamB) },
    resultLine: `Series ${wins.A}-${wins.B}: ` + matchLines.map((m) => `Match ${m.n} to ${m.winner === "A" ? "first" : "second"} team (${m.flagsA}-${m.flagsB} flags)`).join("; ") + ` — game clock ${mmss(clockSeconds)}`,
    scoringKey: CTF_KEY, matchLines,
  };
}

// ============================= TRACK & FIELD EVENTS =============================
// Two 11-player teams, one-vs-one, across 11 disciplines. Every teammate competes in exactly one event.
// Scoring: event points +2 (competed), event win +8, overall team win +10 (every member of the winning team),
// participation 1.0-3.0, catastrophe -5 to -14 (voids participation).
const TF_EVENTS = [
  { id: "100m", name: "100-meter dash", kind: "time", base: 11.2, slope: 0.02, floor: 8.6, w: { str: 25, con: 10, dex: 45, wis: 5, int: 0, cha: 0, lck: 15 }, verb: "explodes down the straight", cat: ["jumps the gun twice and is disqualified", "pulls up with a hamstring at 40 meters"] },
  { id: "LJ", name: "long jump", kind: "dist", base: 6.0, slope: 0.28, floor: 4.0, w: { str: 25, con: 10, dex: 40, wis: 5, int: 0, cha: 0, lck: 20 }, verb: "launches off the board", cat: ["fouls on all three attempts and registers no mark", "lands awkwardly and wrecks an ankle"] },
  { id: "SP", name: "shot put", kind: "dist", base: 15.0, slope: 0.9, floor: 8.0, w: { str: 60, con: 10, dex: 15, wis: 5, int: 0, cha: 0, lck: 10 }, verb: "spins and heaves the shot", cat: ["steps out of the circle on every throw and registers no mark", "drops the shot on their own foot"] },
  { id: "HJ", name: "high jump", kind: "height", base: 1.9, slope: 0.05, floor: 1.4, w: { str: 15, con: 10, dex: 45, wis: 15, int: 0, cha: 0, lck: 15 }, verb: "attacks the bar", cat: ["misses the opening height three times and is out", "clips the bar, tumbles, and cannot continue"] },
  { id: "400m", name: "400-meter run", kind: "time", base: 52.0, slope: 0.02, floor: 40.0, w: { str: 15, con: 35, dex: 25, wis: 10, int: 0, cha: 0, lck: 15 }, verb: "hits the final bend", cat: ["drifts out of the lane and is disqualified", "tightens up completely and stumbles off the track"] },
  { id: "110H", name: "110-meter hurdles", kind: "time", base: 15.5, slope: 0.02, floor: 11.0, w: { str: 15, con: 15, dex: 40, wis: 15, int: 0, cha: 0, lck: 15 }, verb: "clears hurdle after hurdle", cat: ["crashes through the fourth hurdle and is disqualified", "clips a hurdle and goes down hard"] },
  { id: "DT", name: "discus throw", kind: "dist", base: 45.0, slope: 2.8, floor: 25.0, w: { str: 40, con: 5, dex: 30, wis: 15, int: 0, cha: 0, lck: 10 }, verb: "whirls and releases the disc", cat: ["throws into the cage on every attempt and registers no mark", "slips in the ring and falls out of it injured"] },
  { id: "PV", name: "pole vault", kind: "height", base: 4.8, slope: 0.12, floor: 3.2, w: { str: 20, con: 5, dex: 35, wis: 20, int: 10, cha: 0, lck: 10 }, verb: "plants and drives skyward", cat: ["snaps the pole mid-vault and is carried off", "fails all three attempts at the opening height"] },
  { id: "JT", name: "javelin throw", kind: "dist", base: 60.0, slope: 3.6, floor: 35.0, w: { str: 30, con: 5, dex: 30, wis: 20, int: 10, cha: 0, lck: 5 }, verb: "unleashes the spear", cat: ["fouls on every throw and registers no mark", "tweaks an elbow on the release and is done for the day"] },
  { id: "1500m", name: "1500-meter run", kind: "time", base: 250.0, slope: 0.018, floor: 190.0, w: { str: 5, con: 50, dex: 10, wis: 20, int: 0, cha: 0, lck: 15 }, verb: "kicks for home", cat: ["collapses from exhaustion on the final lap", "is tripped up in the pack and cannot get back up"] },
  { id: "SC", name: "3000-meter steeplechase", kind: "time", base: 585.0, slope: 0.018, floor: 440.0, w: { str: 10, con: 40, dex: 25, wis: 15, int: 0, cha: 0, lck: 10 }, verb: "attacks the barriers and the water jump", cat: ["face-plants into the water jump and cannot continue", "collapses from exhaustion before the final lap"] },
];
function tfAssign(players, rng) {
  const n = players.length, cost = players.map((p) => TF_EVENTS.map((e) => computeBER(p, e.w)));
  let perm = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  const total = (pm) => pm.reduce((s, ev, pi) => s + cost[pi][ev], 0);
  let improved = true, guard = 0;
  while (improved && guard++ < 50) {
    improved = false;
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
      const before = cost[a][perm[a]] + cost[b][perm[b]], after = cost[a][perm[b]] + cost[b][perm[a]];
      if (after > before + 1e-9) { [perm[a], perm[b]] = [perm[b], perm[a]]; improved = true; }
    }
  }
  return perm; // perm[playerIdx] = event index
}
function tfMark(ev, perf) {
  const x = Math.max(1, Math.min(26, perf)) - 10;
  if (ev.kind === "time") return Math.max(ev.floor, ev.base * (1 - ev.slope * x));
  return Math.max(ev.floor, ev.base + ev.slope * x);
}
function tfFmt(ev, v) {
  if (ev.kind === "time") {
    if (v >= 60) { const m = Math.floor(v / 60), s = v - m * 60; return `${m}:${s < 10 ? "0" : ""}${s.toFixed(2)}`; }
    return `${v.toFixed(2)} s`;
  }
  return `${v.toFixed(2)} m`;
}
function simTrackAndField(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB], sideOf = sideOfFn(teamA);
  const box = newBox(roster, { event: "", mark: "", oppMark: "", result: "", margin: 0, evPts: 0, evWin: 0, teamWin: 0, pb: 0 });
  const log = [];
  const permA = tfAssign(teamA, rnd), permB = tfAssign(teamB, rnd);
  const atEvent = (team, perm, ei) => team[perm.indexOf(ei)];
  let winsA = 0, winsB = 0, marginSum = 0;
  const detail = [];
  log.push({ type: "intro", side: undefined, text: `Welcome to the meet! {A} against {B}, eleven events, one competitor each, and everybody on the track or in the pit exactly once. Each event is worth two points for competing and eight for the win, and the team that takes the most events earns ten points for every teammate.` });
  TF_EVENTS.forEach((ev, ei) => {
    const a = atEvent(teamA, permA, ei), b = atEvent(teamB, permB, ei);
    const perf = {}, dq = {};
    [a, b].forEach((p) => { perf[p.n] = finalPerformance(p, ev.w); dq[p.n] = rnd() < catastropheChance(p, 0.7); });
    let winner, loser, noContest = false;
    if (dq[a.n] && dq[b.n]) { noContest = true; winner = perf[a.n] >= perf[b.n] ? a : b; loser = winner === a ? b : a; }
    else if (dq[a.n]) { winner = b; loser = a; } else if (dq[b.n]) { winner = a; loser = b; }
    else { winner = perf[a.n] === perf[b.n] ? (rnd() < 0.5 ? a : b) : perf[a.n] > perf[b.n] ? a : b; loser = winner === a ? b : a; }
    [a, b].forEach((p) => { box[p.n].event = ev.name; });
    // catastrophes
    [a, b].forEach((p) => {
      if (!dq[p.n]) return;
      const label = ev.cat[Math.floor(rnd() * ev.cat.length)];
      const c = markCatastrophe(box, p, label);
      box[p.n].result = "DQ"; box[p.n].mark = "no mark";
      log.push({ side: sideOf(p), type: "catastrophe", event: ev.name, eventNo: ei + 1, player: p.n, text: `Event ${ei + 1}, ${ev.name}: DISASTER — ${p.n} ${c.text}! That costs ${Math.abs(c.penalty)} fantasy points.` });
    });
    const okA = !dq[a.n], okB = !dq[b.n];
    const mk = {};
    [a, b].forEach((p) => { if (!dq[p.n]) mk[p.n] = Math.round(tfMark(ev, perf[p.n]) * 100) / 100; });
    if (okA && okB) { // keep displayed marks strictly ordered
      const better = ev.kind === "time" ? (x, y) => x < y : (x, y) => x > y;
      if (!better(mk[winner.n], mk[loser.n])) mk[winner.n] = Math.round((mk[loser.n] + (ev.kind === "time" ? -0.01 : 0.01)) * 100) / 100;
    }
    [a, b].forEach((p) => {
      const bb = box[p.n];
      if (dq[p.n]) return;
      bb.mark = tfFmt(ev, mk[p.n]); bb.evPts = 2; bb.fp += 2;
      bb.oppMark = dq[p === a ? b.n : a.n] ? "no mark" : tfFmt(ev, mk[p === a ? b.n : a.n]);
    });
    if (!noContest) {
      box[winner.n].evWin = 1; box[winner.n].fp += 8; box[winner.n].result = "W";
      if (!dq[loser.n]) box[loser.n].result = "L";
      if (winner === a) winsA++; else winsB++;
    } else { [a, b].forEach((p) => (box[p.n].result = "DQ")); }
    const gap = (okA && okB) ? Math.abs(perf[a.n] - perf[b.n]) : 99;
    [a, b].forEach((p) => { const o = p === a ? b : a; box[p.n].margin = (okA && okB) ? Math.round((perf[p.n] - perf[o.n]) * 10) / 10 : 0; });
    marginSum += (okA && okB) ? (perf[a.n] - perf[b.n]) : 0;
    const tally = `{A} ${winsA}, {B} ${winsB}`;
    const wSide = sideOf(winner);
    let text;
    if (noContest) text = `Event ${ei + 1}, ${ev.name}: both ${a.n} and ${b.n} are disqualified, so nobody takes the event. Score stays ${tally}.`;
    else if (dq[loser.n]) text = `Event ${ei + 1}, ${ev.name}: ${winner.n} ${ev.verb} and wins by default with ${tfFmt(ev, mk[winner.n])}. Score: ${tally}.`;
    else {
      const flavor = gap < 0.8 ? "in a photo finish" : gap < 2 ? "narrowly" : gap < 4 ? "comfortably" : "in a rout";
      text = `Event ${ei + 1}, ${ev.name}: ${winner.n} ${ev.verb} and beats ${loser.n} ${flavor}, ${tfFmt(ev, mk[winner.n])} to ${tfFmt(ev, mk[loser.n])}. Score: ${tally}.`;
    }
    log.push({ side: noContest ? undefined : wSide, type: noContest ? "noContest" : "eventWin", event: ev.name, eventNo: ei + 1, player: noContest ? undefined : winner.n, victim: noContest ? undefined : loser.n, winnerMark: dq[winner.n] ? undefined : tfFmt(ev, mk[winner.n]), loserMark: dq[loser.n] ? undefined : tfFmt(ev, mk[loser.n]), teamWinsA: winsA, teamWinsB: winsB, text });
    detail.push({ ev: ev.name, a: a.n, b: b.n, w: noContest ? null : winner.n });
  });
  let winnerTeam = winsA === winsB ? (marginSum >= 0 ? "A" : "B") : winsA > winsB ? "A" : "B";
  (winnerTeam === "A" ? teamA : teamB).forEach((p) => { const b = box[p.n]; if (!b.catastrophe) { b.fp += 10; b.teamWin = 1; } });
  const winners = winnerTeam === "A" ? teamA : teamB;
  log.push({ side: winnerTeam, type: "finale", text: `Final result: {${winnerTeam}} wins the meet ${winnerTeam === "A" ? winsA : winsB} events to ${winnerTeam === "A" ? winsB : winsA}! Every teammate who finished banks the ten point team win bonus.` });
  finishBox(box, roster);
  roster.forEach((p) => { box[p.n].participation = box[p.n].catastrophe ? 0 : box[p.n].evPts; });
  const mvp = [...roster].sort((x, y) => box[y.n].fp - box[x.n].fp)[0];
  const stats = (team, w) => [{ label: "Events won", value: w }, { label: "Competed", value: team.filter((p) => !box[p.n].catastrophe).length + "/" + team.length }];
  return {
    box, log, winnerTeam, scoreA: fpSum(box, teamA), scoreB: fpSum(box, teamB), champion: mvp.n,
    columns: [{ k: "event", label: "Event", tip: "The one discipline this competitor ran" }, { k: "mark", label: "Mark", tip: "Result: time or distance/height" }, { k: "oppMark", label: "Opp. mark", tip: "Head-to-head opponent's mark" }, { k: "result", label: "Res.", tip: "W win, L loss, DQ disqualified" }, { k: "margin", label: "Margin", tip: "Performance rating edge over the opponent" }, { k: "evPts", label: "Evt pts", tip: "+2 for competing in the event" }, { k: "evWin", label: "Evt win", tip: "+8 for winning the event" }, { k: "teamWin", label: "Team win", tip: "+10 for being on the winning team" }, { k: "participation", label: "Part.", tip: "Participation credit" }],
    teamStats: { A: stats(teamA, winsA), B: stats(teamB, winsB) },
    resultLine: `${winnerTeam === "A" ? "{A}" : "{B}"} wins the meet, ${winnerTeam === "A" ? winsA : winsB} events to ${winnerTeam === "A" ? winsB : winsA}`,
    scoringKey: [{ label: "Competing in event, participation", pts: 2 }, { label: "Event win", pts: 8 }, { label: "Overall team win, each teammate", pts: 10 }, { label: "Catastrophe, DQ or fouls out or KO or injury", pts: -5 }],
    eventDetail: detail,
  };
}

// ============================= NAKED & AFRAID / ARM WRESTLING / PRISON BREAK =============================
const EV_pick = (arr) => arr[Math.floor(rnd() * arr.length)];
const EV_shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const EV_q = (perf) => clamp((perf - 7) / 13, 0, 1);
const EV_ord = (n) => (n === 1 ? "first" : n === 2 ? "second" : n === 3 ? "third" : `${n}th`);

// ---------- Naked & Afraid: 11 days, a task each day, a failed task costs the team one player ----------
const NA_TASKS = [
  "build a sturdy shelter before the first night", "find and purify a drinking water source", "keep a fire alive through the whole night",
  "forage and cook a real meal", "craft tools and weapons from what the land provides", "ride out the storm without losing the shelter",
  "land a protein source from the wild", "treat injuries and hold the team together", "build a signal fire and mark the camp",
  "cross the river toward the extraction route", "make the final push to extraction",
];
const NA_ACTS = [
  { k: "shelter", l: "builds a shelter and fixes up the tools", pts: 5, diff: 0.85, w: 3 },
  { k: "food", l: "gathers and cooks a meal", pts: 3, diff: 1.0, w: 4 },
  { k: "water", l: "finds drinking water", pts: 5, diff: 0.9, w: 3 },
  { k: "hunts", l: "makes a successful hunt", pts: 8, diff: 0.55, w: 2 },
  { k: "fires", l: "builds a fire and resupplies the camp", pts: 3, diff: 0.95, w: 4 },
];
const NA_QUIT = ["taps out and calls for extraction", "is pulled out with a medical emergency", "collapses from heat exhaustion and is evacuated", "quits after a brutal night"];
function simNakedAfraid(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB], sideOf = sideOfFn(teamA);
  const box = newBox(roster, { days: 0, shelter: 0, food: 0, water: 0, hunts: 0, fires: 0, milestones: 0, outDay: 0, status: "" });
  const log = [], active = { A: [...teamA], B: [...teamB] }, tasks = { A: 0, B: 0 }, fails = { A: 0, B: 0 };
  const att = duration === "short" ? 0.6 : duration === "long" ? 1.4 : 1;
  const DAYS = NA_TASKS.length;
  log.push({ type: "intro", text: `Day one in the wild. {A} and {B} each send ${teamA.length} competitors with no clothes and almost no gear. Eleven days, ten nights, and one task every day. Fail the task and your team must eliminate one of its own.` });
  let lastDay = 0;
  for (let day = 1; day <= DAYS; day++) {
    if (!active.A.length || !active.B.length) break;
    lastDay = day;
    const task = NA_TASKS[day - 1];
    const perfToday = {};
    ["A", "B"].forEach((s) => {
      const members = [...active[s]];
      members.forEach((p) => {
        if (box[p.n].catastrophe) return;
        box[p.n].days = day;
        perfToday[p.n] = finalPerformance(p, weights);
        // medical emergencies and quitters
        if (rnd() < catastropheChance(p, 5)) {
          const why = EV_pick(NA_QUIT), c = markCatastrophe(box, p, why);
          box[p.n].outDay = day; box[p.n].status = `Out day ${day}`;
          active[s] = active[s].filter((x) => x !== p);
          log.push({ side: s, type: "catastrophe", day, player: p.n, text: `Day ${day}: DISASTER. ${p.n} ${c.text}. That costs ${Math.abs(c.penalty)} fantasy points and ${p.n} is out for the rest of the event.` });
          return;
        }
        const n = Math.floor(att) + (rnd() < att - Math.floor(att) ? 1 : 0);
        for (let i = 0; i < n; i++) {
          const act = weightedPick(NA_ACTS, (a) => a.w);
          const pr = clamp((0.25 + EV_q(perfToday[p.n]) * 0.6) * act.diff, 0.06, 0.9);
          if (rnd() < pr) {
            const b = box[p.n]; b[act.k] += 1; b.fp += act.pts;
            if (act.k === "hunts" || rnd() < 0.12) log.push({ side: s, type: act.k === "hunts" ? "hunt" : "forage", day, player: p.n, action: act.l, pts: act.pts, nth: b[act.k], runFp: r1(b.fp), text: `Day ${day}: ${p.n} ${act.l}, worth ${act.pts} points. That is number ${b[act.k]} for ${p.n}.` });
          }
        }
      });
    });
    // the daily task
    ["A", "B"].forEach((s) => {
      const members = active[s];
      if (!members.length) return;
      const avg = members.reduce((t, p) => t + (perfToday[p.n] != null ? perfToday[p.n] : finalPerformance(p, weights)), 0) / members.length;
      const size = (s === "A" ? teamA : teamB).length;
      const pOk = clamp(0.84 + (avg - 11) * 0.03 - Math.max(0, day - 6) * 0.02 - Math.max(0, size - members.length) * 0.03, 0.4, 0.96);
      if (rnd() < pOk) {
        tasks[s]++;
        const lead = weightedPick(members, (m) => Math.max(0.5, (perfToday[m.n] || 0) - 5));
        box[lead.n].milestones += 1; box[lead.n].fp += 10;
        log.push({ side: s, type: "taskDone", day, player: lead.n, tally: tasks[s], runFp: r1(box[lead.n].fp), text: `Day ${day}, today's task is to ${task}. {${s}} pulls it off, with ${lead.n} leading the way for the 10 point survival milestone. That makes ${tasks[s]} ${tasks[s] === 1 ? "task" : "tasks"} completed.` });
      } else {
        fails[s]++;
        if (members.length > 1) {
          const gone = [...members].sort((a, b) => ((perfToday[a.n] || 0) + rnd() * 3) - ((perfToday[b.n] || 0) + rnd() * 3))[0];
          active[s] = active[s].filter((x) => x !== gone);
          box[gone.n].outDay = day; box[gone.n].status = `Eliminated day ${day}`;
          log.push({ side: s, type: "elimination", day, player: gone.n, text: `Day ${day}, today's task is to ${task}. {${s}} fails, and the team must eliminate one of its own. ${gone.n} is sent home. {${s}} is down to ${active[s].length} left.` });
        } else {
          log.push({ side: s, type: "taskFail", day, text: `Day ${day}, today's task is to ${task}. {${s}} fails, but with only ${members[0].n} left there is nobody to eliminate.` });
        }
      }
    });
  }
  const survivors = { A: active.A.length, B: active.B.length };
  [...active.A, ...active.B].forEach((p) => { box[p.n].days = DAYS; if (!box[p.n].catastrophe) box[p.n].status = "Survived"; });
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  let winnerTeam;
  if (!survivors.A && survivors.B) winnerTeam = "B"; else if (!survivors.B && survivors.A) winnerTeam = "A";
  else winnerTeam = tasks.A !== tasks.B ? (tasks.A > tasks.B ? "A" : "B") : survivors.A !== survivors.B ? (survivors.A > survivors.B ? "A" : "B") : fa >= fb ? "A" : "B";
  log.push({ side: winnerTeam, type: "finale", text: `Extraction. {${winnerTeam}} wins Naked and Afraid, ${tasks[winnerTeam]} tasks completed with ${survivors[winnerTeam]} still standing against ${tasks[winnerTeam === "A" ? "B" : "A"]} tasks and ${survivors[winnerTeam === "A" ? "B" : "A"]} survivors.` });
  const mvp = [...roster].sort((x, y) => box[y.n].fp - box[x.n].fp)[0];
  const stats = (s) => [{ label: "Tasks completed", value: tasks[s] }, { label: "Survivors", value: `${survivors[s]}/${(s === "A" ? teamA : teamB).length}` }];
  return {
    box, log, winnerTeam, scoreA: fa, scoreB: fb, champion: mvp.n,
    columns: [{ k: "shelter", label: "Shelter", tip: "Shelter and tool builds, 5 each" }, { k: "food", label: "Food", tip: "Meals gathered or cooked, 3 each" }, { k: "water", label: "Water", tip: "Water sources found, 5 each" }, { k: "hunts", label: "Hunts", tip: "Successful hunts, 8 each" }, { k: "fires", label: "Fires", tip: "Fires built or camp resupplies, 3 each" }, { k: "milestones", label: "Milestones", tip: "Daily tasks led to completion, 10 each" }, { k: "days", label: "Days", tip: "Days on the course" }, { k: "outDay", label: "Out day", tip: "Day the competitor left, 0 means survived" }, { k: "status", label: "Status", tip: "Survived, eliminated or out" }],
    teamStats: { A: stats("A"), B: stats("B") },
    resultLine: `${winnerTeam === "A" ? "{A}" : "{B}"} wins, ${tasks[winnerTeam]} daily tasks completed and ${survivors[winnerTeam]} survivors`,
    scoringKey: [{ label: "Build or maintain shelter and tools", pts: 5 }, { label: "Gather or cook food", pts: 3 }, { label: "Find drinking water", pts: 5 }, { label: "Successful hunt", pts: 8 }, { label: "Successful fire build or resupply", pts: 3 }, { label: "Survival milestone, completing the daily task", pts: 10 }, { label: "Participation, everyone who plays", pts: 2.5 }, { label: "Catastrophe, quits or medical emergency or KO or DQ or disaster", pts: -5 }],
  };
}

// ---------- Arm Wrestling: single elimination, best of three, never teammates ----------
function simArmWrestling(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB], sideOf = sideOfFn(teamA);
  const box = newBox(roster, { matchW: 0, matchL: 0, legsW: 0, legsL: 0, pins: 0, byes: 0, outRd: 0, status: "" });
  const log = [], alive = { A: EV_shuffle(teamA), B: EV_shuffle(teamB) };
  const BREAK = ["breaks an arm mid-match", "is slammed into the table and knocked out", "has a shoulder pop out", "is disqualified for a flagrant foul"];
  log.push({ type: "intro", text: `Arm wrestling tournament! {A} sends ${teamA.length} and {B} sends ${teamB.length}. Single elimination, every match best of three, and teammates never face each other. If one team runs out of competitors, the other team wins.` });
  let round = 0, matches = 0, last = null;
  while (alive.A.length && alive.B.length && round < 30) {
    round++;
    const k = Math.min(alive.A.length, alive.B.length), pairs = [];
    for (let i = 0; i < k; i++) pairs.push([alive.A[i], alive.B[i]]);
    ["A", "B"].forEach((s) => alive[s].slice(k).forEach((p) => { box[p.n].byes += 1; }));
    const finalRound = alive.A.length === 1 && alive.B.length === 1;
    const byeNames = [...alive.A.slice(k), ...alive.B.slice(k)];
    log.push({ type: "round", round, text: finalRound ? `Round ${round} is the final, ${alive.A[0].n} against ${alive.B[0].n}.` : `Round ${round}: ${pairs.length} ${pairs.length === 1 ? "match" : "matches"}, ${alive.A.length} left for {A} and ${alive.B.length} left for {B}${byeNames.length ? `, and ${byeNames.length} ${byeNames.length === 1 ? "competitor gets" : "competitors get"} a bye` : ""}.` });
    const losers = [];
    pairs.forEach(([a, b]) => {
      matches++;
      const dq = { [a.n]: rnd() < catastropheChance(a, 2), [b.n]: rnd() < catastropheChance(b, 2) };
      let w, l, legsW = 0, legsL = 0, pins = 0, forfeit = false;
      if (dq[a.n] || dq[b.n]) {
        forfeit = true;
        const hurt = dq[a.n] && dq[b.n] ? (rnd() < 0.5 ? a : b) : dq[a.n] ? a : b;
        l = hurt; w = hurt === a ? b : a;
        const c = markCatastrophe(box, l, EV_pick(BREAK));
        log.push({ side: sideOf(l), type: "catastrophe", round, player: l.n, victim: w.n, text: `Round ${round}: DISASTER. ${l.n} ${c.text} against ${w.n}. That costs ${Math.abs(c.penalty)} fantasy points and ${w.n} advances by forfeit.` });
      } else {
        let la = 0, lb = 0;
        while (la < 2 && lb < 2) { const pa = finalPerformance(a, weights), pb = finalPerformance(b, weights); if (pa === pb ? rnd() < 0.5 : pa > pb) la++; else lb++; }
        w = la > lb ? a : b; l = w === a ? b : a; legsW = Math.max(la, lb); legsL = Math.min(la, lb);
        for (let i = 0; i < legsW; i++) if (rnd() < 0.88) pins++;
        box[w.n].pins += pins; box[w.n].fp += 5 * pins;
        box[w.n].legsW += legsW; box[w.n].legsL += legsL; box[l.n].legsW += legsL; box[l.n].legsL += legsW;
        log.push({ side: sideOf(w), type: "matchWin", round, player: w.n, victim: l.n, score: `${legsW}-${legsL}`, pins, text: `Round ${round}: ${w.n} beats ${l.n} ${legsW} legs to ${legsL}${pins ? `, with ${pins} ${pins === 1 ? "pin" : "pins"} along the way` : ""}.` });
      }
      box[w.n].matchW += 1; box[w.n].fp += 5; box[l.n].matchL += 1; box[l.n].outRd = round; box[l.n].status = forfeit ? `Forfeit round ${round}` : `Out round ${round}`;
      losers.push(l); last = { w, l };
    });
    ["A", "B"].forEach((s) => { alive[s] = alive[s].filter((p) => !losers.includes(p)); });
  }
  const winnerTeam = alive.A.length && !alive.B.length ? "A" : alive.B.length && !alive.A.length ? "B" : null;
  const survivors = [...alive.A, ...alive.B];
  survivors.forEach((p) => { box[p.n].fp += 10; box[p.n].status = "Survived"; });
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  const wt = winnerTeam || (fa >= fb ? "A" : "B");
  const champion = [...(wt === "A" ? alive.A : alive.B)].sort((x, y) => box[y.n].fp - box[x.n].fp)[0] || last.w;
  log.push({ side: wt, type: "finale", player: champion.n, text: `That is the tournament. {${wt}} wins with ${(wt === "A" ? alive.A : alive.B).length} competitors never beaten, and ${champion.n} is the standout. Everyone still standing banks 10 points.` });
  const stats = (s) => [{ label: "Never eliminated", value: `${alive[s].length}/${(s === "A" ? teamA : teamB).length}` }, { label: "Match wins", value: (s === "A" ? teamA : teamB).reduce((t, p) => t + box[p.n].matchW, 0) }];
  return {
    box, log, winnerTeam: wt, scoreA: fa, scoreB: fb, champion: champion.n,
    columns: [{ k: "matchW", label: "Match W", tip: "Best of three matches won, 5 each" }, { k: "matchL", label: "Match L", tip: "Matches lost" }, { k: "legsW", label: "Legs W", tip: "Individual pulls won" }, { k: "legsL", label: "Legs L", tip: "Individual pulls lost" }, { k: "pins", label: "Pins", tip: "Opponents pinned, 5 each" }, { k: "byes", label: "Byes", tip: "Rounds skipped because the other team had fewer competitors left" }, { k: "outRd", label: "Out rd", tip: "Round eliminated, 0 means never eliminated" }, { k: "status", label: "Status", tip: "Survived or the round the competitor went out" }],
    teamStats: { A: stats("A"), B: stats("B") },
    resultLine: `${wt === "A" ? "{A}" : "{B}"} wins the tournament with ${(wt === "A" ? alive.A : alive.B).length} ${(wt === "A" ? alive.A : alive.B).length === 1 ? "competitor" : "competitors"} still standing`,
    scoringKey: [{ label: "Match win", pts: 5 }, { label: "Opponent pinned", pts: 5 }, { label: "Event win, not eliminated", pts: 10 }, { label: "Participation, everyone who plays", pts: 3 }, { label: "Catastrophe, KO or broken arm or DQ or disaster", pts: -5 }],
  };
}

// ---------- Prison Break: locked in individual cells, guards, alarms, rescues, extraction ----------
const PB_ZONES = {
  short: ["the cell block corridor", "the yard", "the perimeter fence", "the extraction point"],
  medium: ["the cell block corridor", "the kitchen and mess hall", "the yard", "the tunnels", "the perimeter fence", "the extraction point"],
  long: ["the cell block corridor", "the kitchen and mess hall", "the warden's office", "the yard", "the tunnels", "the boiler room", "the perimeter fence", "the extraction point"],
};
const PB_GUARD = [
  { k: "bypass", v: "slips past the guards" }, { k: "evade", v: "evades the patrol" }, { k: "down", v: "takes out a guard" },
  { k: "decoy", v: "creates a diversion and gets by" },
];
const PB_CAUGHT = ["is tackled by the guards and dragged back", "is knocked out by a baton", "is cornered in a dead end and captured", "is shot with a tranquilizer and goes down"];
function simPrisonBreak(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB], sideOf = sideOfFn(teamA);
  const zones = PB_ZONES[duration] || PB_ZONES.medium, Z = zones.length, TURNS = Z + 3;
  const box = newBox(roster, { cell: 0, guards: 0, equip: 0, rescues: 0, alarms: 0, ability: 0, zone: 0, escaped: 0, status: "" });
  const st = {}; roster.forEach((p) => (st[p.n] = { s: "cell", zi: 0, abil: true, gear: 0 }));
  const team = { A: teamA, B: teamB }, guard = { A: 0, B: 0 }, escaped = { A: 0, B: 0 }, alarmCount = { A: 0, B: 0 };
  const log = [];
  log.push({ type: "intro", text: `Prison break! {A} and {B} each have ${teamA.length} prisoners locked in separate cells. Get out of the cell, get past the guards, and reach the extraction point. Set off the alarm and more guards pour in. Every character gets one use of their signature ability once they are free.` });
  const fpOf = (n) => r1(box[n].fp);
  for (let turn = 1; turn <= TURNS; turn++) {
    ["A", "B"].forEach((s) => {
      const mine = team[s];
      const live = () => mine.filter((p) => st[p.n].s === "cell" || st[p.n].s === "free");
      if (!live().length) return;
      // rescues first
      mine.filter((p) => st[p.n].s === "cell" && turn > 1).forEach((trapped) => {
        const helpers = mine.filter((p) => st[p.n].s === "free" && st[p.n].zi <= 1 && !st[p.n].busy);
        if (!helpers.length) return;
        const h = EV_pick(helpers);
        if (rnd() < 0.5 + EV_q(finalPerformance(h, weights)) * 0.3) {
          st[trapped.n].s = "free"; st[trapped.n].zi = 0; st[h.n].busy = true;
          box[h.n].rescues += 1; box[h.n].fp += 5;
          log.push({ side: s, type: "rescue", player: h.n, victim: trapped.n, runFp: fpOf(h.n), text: `${h.n} frees ${trapped.n} from the cell, worth 5 points. That is rescue number ${box[h.n].rescues} for ${h.n}.` });
        }
      });
      mine.forEach((p) => {
        const S = st[p.n], b = box[p.n];
        if (S.s === "escaped" || S.s === "out") return;
        if (S.busy) { S.busy = false; return; }
        const perf = finalPerformance(p, weights), q = EV_q(perf);
        if (rnd() < catastropheChance(p, TURNS * 2)) {
          const c = markCatastrophe(box, p, EV_pick(PB_CAUGHT)); S.s = "out"; b.status = "Captured";
          log.push({ side: s, type: "catastrophe", player: p.n, text: `DISASTER. ${p.n} ${c.text}. That costs ${Math.abs(c.penalty)} fantasy points and the escape is over for ${p.n}.` });
          return;
        }
        if (S.s === "cell") {
          if (rnd() < 0.4 + q * 0.5) {
            S.s = "free"; S.zi = 0; b.cell = 1; b.fp += 5;
            log.push({ side: s, type: "cellEscape", player: p.n, runFp: fpOf(p.n), text: `${p.n} gets out of the cell for 5 points.` });
          }
          return;
        }
        // moving through the prison
        let pass = rnd() < clamp(0.4 + q * 0.5 - 0.07 * guard[s] + 0.04 * S.gear, 0.12, 0.92);
        if (!pass && S.abil && (S.zi >= 1 || guard[s] >= 2) && rnd() < 0.5) {
          S.abil = false; b.ability = 1; pass = true;
          log.push({ side: s, type: "ability", player: p.n, zone: zones[S.zi], text: `${p.n} uses their one signature ability to get past the guards at ${zones[S.zi]}.` });
        }
        if (pass) {
          const g = EV_pick(PB_GUARD); b.guards += 1; b.fp += 4;
          if (rnd() < 0.3) { b.equip += 1; b.fp += 3; S.gear = Math.min(3, S.gear + 1); }
          S.zi += 1; b.zone = Math.max(b.zone, S.zi);
          if (S.zi >= Z) {
            S.s = "escaped"; b.escaped = 1; b.fp += 20; escaped[s]++; b.status = "Escaped";
            log.push({ side: s, type: "escape", player: p.n, tally: escaped[s], runFp: fpOf(p.n), text: `${p.n} reaches extraction and escapes the prison, worth 20 points. That is ${escaped[s]} escaped for {${s}}.` });
          } else if (rnd() < 0.3) {
            log.push({ side: s, type: "guard", player: p.n, zone: zones[S.zi - 1], text: `${p.n} ${g.v} at ${zones[S.zi - 1]}, worth 4 points.` });
          }
        } else if (rnd() < 0.3 + guard[s] * 0.05) {
          b.alarms += 1; b.fp -= 4; alarmCount[s]++; guard[s] = Math.min(3, guard[s] + 1);
          log.push({ side: s, type: "alarm", player: p.n, level: guard[s], text: `ALARM. ${p.n} trips the alarm at ${zones[S.zi]}, minus 4 points, and more guards flood in. Guard level is now ${guard[s]}.` });
          if (rnd() < 0.012 + guard[s] * 0.008) {
            const c = markCatastrophe(box, p, EV_pick(PB_CAUGHT)); S.s = "out"; b.status = "Captured";
            log.push({ side: s, type: "catastrophe", player: p.n, text: `${p.n} ${c.text}. That costs ${Math.abs(c.penalty)} fantasy points and the escape is over for ${p.n}.` });
          }
        }
      });
    });
    if (roster.every((p) => st[p.n].s === "escaped" || st[p.n].s === "out")) break;
  }
  roster.forEach((p) => { if (!box[p.n].status) box[p.n].status = st[p.n].s === "cell" ? "Still in the cell" : "Still inside"; });
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  const winnerTeam = escaped.A !== escaped.B ? (escaped.A > escaped.B ? "A" : "B") : alarmCount.A !== alarmCount.B ? (alarmCount.A < alarmCount.B ? "A" : "B") : fa >= fb ? "A" : "B";
  const o = winnerTeam === "A" ? "B" : "A";
  log.push({ side: winnerTeam, type: "finale", text: `The dust settles. {${winnerTeam}} wins the prison break with ${escaped[winnerTeam]} escaped against ${escaped[o]}.` });
  const mvp = [...roster].sort((x, y) => box[y.n].fp - box[x.n].fp)[0];
  const stats = (s) => [{ label: "Escaped", value: `${escaped[s]}/${team[s].length}` }, { label: "Alarms", value: alarmCount[s] }];
  return {
    box, log, winnerTeam, scoreA: fa, scoreB: fb, champion: mvp.n,
    columns: [{ k: "cell", label: "Cell", tip: "Escaped the cell, 5" }, { k: "guards", label: "Guards", tip: "Guard bypass, evade or incapacitate, 4 each" }, { k: "equip", label: "Equip", tip: "Equipment gathered or crafted, 3 each" }, { k: "rescues", label: "Rescues", tip: "Teammates rescued, 5 each" }, { k: "alarms", label: "Alarms", tip: "Alarms sounded, minus 4 each" }, { k: "ability", label: "Ability", tip: "Used the one signature ability" }, { k: "zone", label: "Zone", tip: "Furthest zone reached" }, { k: "escaped", label: "Escaped", tip: "Escaped the prison, 20" }, { k: "status", label: "Status", tip: "Final status" }],
    teamStats: { A: stats("A"), B: stats("B") },
    resultLine: `${winnerTeam === "A" ? "{A}" : "{B}"} wins the prison break, ${escaped[winnerTeam]} escaped to ${escaped[o]}`,
    scoringKey: [{ label: "Guard bypass, incapacitate or evade", pts: 4 }, { label: "Escape cell", pts: 5 }, { label: "Equipment gather or craft", pts: 3 }, { label: "Teammate rescued", pts: 5 }, { label: "Escape prison", pts: 20 }, { label: "Alarm sounded", pts: -4 }, { label: "Participation, everyone who plays", pts: 3 }, { label: "Catastrophe, KO or capture or DQ or disaster", pts: -5 }],
  };
}

// ---------- spoken text: no parentheses or brackets ever reach the voices ----------
let SPOKEN_NAMES = null;
function spoken(t) {
  let s = String(t == null ? "" : t);
  if (!SPOKEN_NAMES) SPOKEN_NAMES = (typeof TEAMS !== "undefined" ? TEAMS.flatMap((x) => x.players || []) : []).map((p) => p.n).filter((n) => /[(\[]/.test(n)).map((n) => [n, n.replace(/\s*[(\[].*$/, "").trim()]);
  SPOKEN_NAMES.forEach(([full, short]) => { if (s.includes(full)) s = s.split(full).join(short); });
  if (typeof TEAMS !== "undefined") s = s.replace(/\s*\(([^()\[\]]+)\)/g, (m, inner) => (TEAMS.some((x) => x.name === inner.trim()) ? " of " + inner.trim() : m));
  s = s.replace(/\s*[(\[][^()\[\]]*?(?:[+\-−–]\s?\d|\bpts?\b|\bpoints?\b|\bFP\b|fantasy)[^()\[\]]*?[)\]]/gi, "");
  s = s.replace(/\s*[(\[]([^()\[\]]*)[)\]](?=\s*[.!?,;:]|\s*$)/g, ", $1").replace(/\s*[(\[]([^()\[\]]*)[)\]]/g, ", $1,");
  s = s.replace(/[()\[\]]/g, "").replace(/,(\s*,)+/g, ",").replace(/\s+,/g, ",").replace(/,\s*([.!?])/g, "$1").replace(/,\s*$/, "").replace(/\s{2,}/g, " ").replace(/\s+([.!?])/g, "$1").trim();
  return s;
}
function spokenLines(lines) { return (lines || []).map((l) => (typeof l === "string" ? spoken(l) : { ...l, text: spoken(l.text) })); }


// ============================= BATTLE BOTS / CHESS BOXING / AMERICAN GLADIATORS =============================
const EV_blend = (w, d, mix) => { const o = {}; ["str", "con", "dex", "wis", "int", "cha", "lck"].forEach((k) => { o[k] = (w[k] || 0) * (1 - mix) + (d[k] || 0) * mix; }); return o; };

// ---------- Battle Bots: 4 on 4 battle royale, thirty second exchanges, components, immobilization, knockouts, judges ----------
const BB_DQ = ["is disqualified when the weapon fails the safety check", "is disqualified for a weapon violation", "is disqualified after the robot leaves the arena"];
const BB_KO = ["hull caves in and the robot is knocked out", "is smashed apart and counted out cold", "takes one hit too many and the robot is knocked out"];
const BB_SUPER = [
  { k: "surge", v: "surges the weapon with a burst of power" }, { k: "shield", v: "throws up an energy shield" },
  { k: "evade", v: "boosts the drive system and starts dodging everything" }, { k: "repair", v: "rushes a field repair" },
];
const BB_PART = { weapon: "weapon", armor: "armor plating", drive: "drive system" };
function simBattleBots(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB], sideOf = sideOfFn(teamA), team = { A: teamA, B: teamB };
  const EX = duration === "short" ? 10 : duration === "long" ? 40 : 26, SECS = 30, minutes = (EX * SECS) / 60;
  const box = newBox(roster, { dmg: 0, taken: 0, hits: 0, comps: 0, immob: 0, kos: 0, judged: 0, ability: 0, outEx: 0, status: "" });
  const st = {}; roster.forEach((p) => { st[p.n] = { hull: 16, weapon: 6, armor: 9, drive: 8, out: false, immob: false, count: 0, sup: true, surge: 0, shield: 0, evade: 0, dqAt: rnd() < catastropheChance(p, 1) * 0.8 ? 1 + Math.floor(rnd() * EX) : 0 }; });
  const log = [], dealt = { A: 0, B: 0 };
  const up = (s) => team[s].filter((p) => !st[p.n].out && !st[p.n].immob);
  const standing = (s) => team[s].filter((p) => !st[p.n].out).length;
  log.push({ type: "intro", text: `Battle Bots! {A} and {B} each bring ${teamA.length} custom combat robots into the arena for a ${teamA.length} on ${teamB.length} battle royale, ${minutes} minutes on the clock. Damage the other machines, destroy weapons and armor, immobilize or knock them out, or win on the judges cards. No outside interference, and every driver gets one super ability that can boost a weapon, the drive, a shield or a repair, but never destroy a robot outright.` });
  let ended = null, lastEx = 0;
  for (let ex = 1; ex <= EX; ex++) {
    lastEx = ex;
    // ten counts
    roster.forEach((p) => { const S = st[p.n]; if (S.immob && !S.out) { S.count++; if (S.count >= 2) { S.out = true; box[p.n].outEx = ex; box[p.n].status = `Counted out, exchange ${ex}`; log.push({ side: sideOf(p), type: "countout", player: p.n, text: `${p.n} cannot get moving and is counted out.` }); } } });
    if (!up("A").length || !up("B").length) { ended = !up("A").length && !up("B").length ? "both" : !up("A").length ? "B" : "A"; break; }
    // disqualifications
    roster.forEach((p) => { const S = st[p.n]; if (S.dqAt === ex && !S.out) { const c = markCatastrophe(box, p, EV_pick(BB_DQ)); S.out = true; box[p.n].status = "Disqualified"; box[p.n].outEx = ex; log.push({ side: sideOf(p), type: "catastrophe", player: p.n, text: `DISASTER. ${p.n} ${c.text}. That costs ${Math.abs(c.penalty)} fantasy points and the robot is done for the day.` }); } });
    EV_shuffle(roster.filter((p) => !st[p.n].out && !st[p.n].immob)).forEach((a) => {
      const A = st[a.n]; if (A.out || A.immob) return;
      const foes = up(sideOf(a) === "A" ? "B" : "A"); if (!foes.length) return;
      // super ability: once per robot, more likely when hurt
      if (A.sup && rnd() < 0.07 + (A.hull < 9 ? 0.15 : 0) + (A.armor <= 0 ? 0.05 : 0)) {
        A.sup = false; box[a.n].ability = 1; const s = EV_pick(BB_SUPER);
        if (s.k === "surge") A.surge = 3; else if (s.k === "shield") A.shield = 4; else if (s.k === "evade") A.evade = 3;
        else { const mx = { armor: 9, weapon: 6, drive: 8 }; const parts = ["armor", "weapon", "drive"].filter((k) => A[k] < mx[k]); const k = parts.length ? parts.sort((x, y) => A[x] - A[y])[0] : "hull"; if (k === "hull") A.hull = Math.min(16, A.hull + 3); else { A[k] = Math.min(mx[k], A[k] + 3); if (k === "drive" && A.immob) { A.immob = false; A.count = 0; } } }
        log.push({ side: sideOf(a), type: "ability", player: a.n, text: `${a.n} ${s.v}, using the one super ability for this fight.` });
      }
      const t = weightedPick(foes, (f) => 1 + 3 * (1 - st[f.n].hull / 16) + (st[f.n].armor <= 0 ? 1 : 0));
      const T = st[t.n], aq = EV_q(finalPerformance(a, EV_blend(weights, { str: 25, con: 10, dex: 30, wis: 10, int: 15, lck: 10 }, 0.35))), dp = finalPerformance(t, weights);
      const pHit = clamp(0.5 + (finalPerformance(a, weights) - dp) * 0.03 + (A.surge > 0 ? 0.15 : 0) - (T.evade > 0 ? 0.25 : 0), 0.18, 0.88);
      if (T.evade > 0) T.evade--; 
      if (rnd() >= pHit) { if (A.surge > 0) A.surge--; return; }
      let d = 1 + Math.floor(rnd() * (1.8 + 2.2 * aq)); if (A.surge > 0) { d += 1; A.surge--; }
      const weaponUp = A.weapon > 0; if (!weaponUp) d = Math.max(1, Math.round(d / 2));
      if (T.shield > 0) { const ab = Math.min(T.shield, d); T.shield -= ab; d -= ab; if (d <= 0) return; }
      const B = box[a.n]; B.hits += 1; if (weaponUp) B.fp += 3; B.fp += d; B.dmg += d; box[t.n].taken += d; dealt[sideOf(a)] += d;
      const parts = [["armor", T.armor > 0 ? 35 : 0], ["weapon", T.weapon > 0 ? 20 : 0], ["drive", T.drive > 0 ? 25 : 0], ["hull", 28]];
      const part = weightedPick(parts, (x) => x[1])[0];
      if (part === "hull") {
        T.hull -= d;
        if (T.hull <= 0) {
          T.hull = 0; T.out = true; B.kos += 1; B.fp += 15; const c = markCatastrophe(box, t, EV_pick(BB_KO)); box[t.n].status = `Knocked out, exchange ${ex}`; box[t.n].outEx = ex;
          log.push({ side: sideOf(a), type: "ko", player: a.n, victim: t.n, runFp: r1(B.fp), text: `Exchange ${ex}: KNOCKOUT. ${a.n} lands the finishing blow and ${t.n} ${c.text}. That is 15 points for ${a.n}, and ${Math.abs(c.penalty)} fantasy points lost for ${t.n}.` });
        }
      } else {
        const before = T[part]; T[part] = Math.max(0, T[part] - d); if (T[part] > 0 && d > before) T.hull -= 0;
        if (T[part] <= 0 && before > 0) {
          T.hull -= Math.max(0, d - before) * 0.5;
          if (part === "drive") { B.immob += 1; B.fp += 10; T.immob = true; T.count = 0; log.push({ side: sideOf(a), type: "immob", player: a.n, victim: t.n, runFp: r1(B.fp), text: `Exchange ${ex}: ${a.n} destroys the drive system on ${t.n}. ${t.n} is immobilized and the ten count begins. That is 10 points for ${a.n}.` }); }
          else { B.comps += 1; B.fp += 5; log.push({ side: sideOf(a), type: "component", player: a.n, victim: t.n, runFp: r1(B.fp), text: `Exchange ${ex}: ${a.n} rips off the ${BB_PART[part]} on ${t.n}, worth 5 points.` }); }
        }
      }
    });
    if (ex % Math.max(2, Math.round(EX / 4)) === 0 && ex < EX) log.push({ type: "clock", text: `${r1((ex * SECS) / 60)} minutes gone. {A} has ${standing("A")} robots still in it and {B} has ${standing("B")}. Damage so far is ${dealt.A} for {A} and ${dealt.B} for {B}.` });
  }
  // result
  let wt, byJudges = false;
  const left = { A: up("A").length, B: up("B").length };
  if (ended === "A" || ended === "B") wt = ended; else if (ended === "both") wt = dealt.A >= dealt.B ? "A" : "B";
  else if (!left.A || !left.B) wt = left.A ? "A" : "B";
  else {
    byJudges = true;
    const score = (s) => team[s].reduce((t, p) => t + box[p.n].dmg + 3 * box[p.n].comps + 6 * box[p.n].immob + 10 * box[p.n].kos, 0) + 4 * standing(s);
    const sa = score("A"), sb = score("B"); wt = sa === sb ? (dealt.A >= dealt.B ? "A" : "B") : sa > sb ? "A" : "B";
    log.push({ side: wt, type: "judges", text: `The buzzer sounds with both sides still fighting, and it goes to the judges. {${wt}} takes the decision, ${standing(wt)} robots standing to ${standing(wt === "A" ? "B" : "A")}.` });
    team[wt].forEach((p) => { box[p.n].fp += 10; box[p.n].judged = 1; });
  }
  roster.forEach((p) => { if (!box[p.n].status) box[p.n].status = st[p.n].immob ? "Immobilized" : "Still running"; });
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB), o = wt === "A" ? "B" : "A";
  const mvp = [...roster].sort((x, y) => box[y.n].fp - box[x.n].fp)[0];
  log.push({ side: wt, type: "finale", player: mvp.n, text: `That is the fight. {${wt}} wins${byJudges ? " on the judges cards" : " by taking out the other side"}, and ${mvp.n} was the star of the arena.` });
  const stats = (s) => [{ label: "Robots standing", value: `${standing(s)}/${team[s].length}` }, { label: "Damage dealt", value: dealt[s] }];
  return {
    box, log, winnerTeam: wt, scoreA: fa, scoreB: fb, champion: mvp.n,
    columns: [{ k: "dmg", label: "Damage", tip: "Damage points dealt, 1 each" }, { k: "hits", label: "Hits", tip: "Landed hits, 3 each with a working weapon" }, { k: "comps", label: "Comps", tip: "Components destroyed, 5 each" }, { k: "immob", label: "Immob", tip: "Immobilizations, 10 each" }, { k: "kos", label: "KOs", tip: "Knockouts, 15 each" }, { k: "judged", label: "Judges", tip: "Won on the judges decision, 10" }, { k: "taken", label: "Taken", tip: "Damage absorbed" }, { k: "ability", label: "Super", tip: "Super ability used" }, { k: "status", label: "Status", tip: "How the robot finished" }, { k: "participation", label: "Part.", tip: "Participation points" }],
    teamStats: { A: stats("A"), B: stats("B") },
    resultLine: `${wt === "A" ? "{A}" : "{B}"} wins ${byJudges ? "on the judges decision" : "by taking out the other side"}, ${standing(wt)} robots standing to ${standing(o)}`,
    scoringKey: [{ label: "Damage, per point dealt", pts: 1 }, { label: "Weapon hit", pts: 3 }, { label: "Component destroyed", pts: 5 }, { label: "Immobilization", pts: 10 }, { label: "Knockout of an opponent", pts: 15 }, { label: "Judges decision match win, each teammate", pts: 10 }, { label: "Participation, everyone who plays", pts: "1.0-3.0" }, { label: "DQ or knocked out or catastrophe", pts: -3 }],
  };
}

// ---------- Chess Boxing: seven alternating rounds, chess boxing chess boxing chess boxing chess ----------
const CB_DQ = ["is disqualified for an illegal blow", "is disqualified for a flagrant foul at the board", "walks off in a rage and forfeits the match"];
const CB_CHESS = { str: 0, con: 5, dex: 0, wis: 40, int: 45, cha: 0, lck: 10 }, CB_BOX = { str: 30, con: 30, dex: 30, wis: 5, int: 0, cha: 0, lck: 5 };
function simChessBoxing(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB], sideOf = sideOfFn(teamA);
  const OPP = duration === "short" ? 3 : duration === "long" ? 6 : 4, EXB = duration === "short" ? 4 : duration === "long" ? 8 : 6;
  const wC = EV_blend(weights, CB_CHESS, 0.5), wB = EV_blend(weights, CB_BOX, 0.5);
  const box = newBox(roster, { caps: 0, checks: 0, blocks: 0, strikes: 0, kd: 0, kdTaken: 0, finish: 0, matchW: 0, matchL: 0, rounds: 0, how: "" });
  const log = [], A = EV_shuffle(teamA), B = EV_shuffle(teamB), n = Math.min(A.length, B.length), wins = { A: 0, B: 0 };
  log.push({ type: "intro", text: `Chess boxing! {A} and {B} send ${n} fighters each, one on one. Seven rounds that alternate chess, boxing, chess, boxing, chess, boxing, chess. Win by checkmate, by knockout, or by the referee decision. Super abilities can sharpen one chess decision or one boxing exchange, but never hand anyone an automatic mate or knockout.` });
  for (let m = 0; m < n; m++) {
    const x = A[m], y = B[m], f = [x, y], K = { [x.n]: { cap: 0, chk: 0, str: 0, kd: 0 }, [y.n]: { cap: 0, chk: 0, str: 0, kd: 0 } };
    const dqAt = {}; f.forEach((p) => { dqAt[p.n] = rnd() < catastropheChance(p, 1) * 0.6 ? 1 + Math.floor(rnd() * 7) : 0; });
    log.push({ type: "matchStart", text: `Match ${m + 1}: ${x.n} of {A} against ${y.n} of {B}.` });
    let winner = null, how = "", rd = 0;
    for (let r = 1; r <= 7 && !winner; r++) {
      rd = r;
      const dq = f.find((p) => dqAt[p.n] === r);
      if (dq) { const o = dq === x ? y : x, c = markCatastrophe(box, dq, EV_pick(CB_DQ)); winner = o; how = "DQ"; log.push({ side: sideOf(dq), type: "catastrophe", player: dq.n, victim: o.n, text: `Round ${r}: DISASTER. ${dq.n} ${c.text}. That costs ${Math.abs(c.penalty)} fantasy points and ${o.n} takes the match.` }); break; }
      if (r % 2 === 1) {
        // chess round
        const got = { [x.n]: { cap: 0, chk: 0 }, [y.n]: { cap: 0, chk: 0 } };
        const first = rnd() < 0.5 ? 0 : 1;
        for (let i = 0; i < OPP; i++) {
          const [p, q] = (i + first) % 2 === 0 ? [x, y] : [y, x], d = finalPerformance(p, wC) - finalPerformance(q, wC);
          if (rnd() < clamp(0.36 + d * 0.035, 0.1, 0.72)) { got[p.n].cap++; K[p.n].cap++; box[p.n].caps++; box[p.n].fp += 1; }
          if (rnd() < clamp(0.17 + d * 0.02, 0.04, 0.45)) { got[p.n].chk++; K[p.n].chk++; box[p.n].checks++; box[p.n].fp += 3; box[p.n].rounds += 0; log.push({ side: sideOf(p), type: "check", round: r, player: p.n, victim: q.n, runFp: r1(box[p.n].fp), text: `Round ${r}, chess: ${p.n} puts ${q.n} in check, worth 3 points.` }); }
        }
        log.push({ side: sideOf(x), type: "round", round: r, text: `Round ${r}, chess: ${x.n} captures ${got[x.n].cap} ${got[x.n].cap === 1 ? "piece" : "pieces"} and ${y.n} captures ${got[y.n].cap}. Material is ${K[x.n].cap} to ${K[y.n].cap} in the match.` });
        const lead = K[x.n].cap - K[y.n].cap, L = lead === 0 ? null : lead > 0 ? x : y, O = L === x ? y : x;
        if (L && (got[L.n].chk > 0 || r > 1)) {
          const pm = clamp(0.015 + 0.05 * Math.abs(lead) + 0.03 * ((r - 1) / 2) + 0.03 * Math.max(0, K[L.n].chk - K[O.n].chk), 0, 0.5);
          if (rnd() < pm) { winner = L; how = "checkmate"; box[L.n].finish++; box[L.n].fp += 20; log.push({ side: sideOf(L), type: "mate", round: r, player: L.n, victim: O.n, runFp: r1(box[L.n].fp), text: `Round ${r}, chess: CHECKMATE. ${L.n} traps the king of ${O.n} and the match is over. That is 20 points for ${L.n}.` }); }
        }
      } else {
        // boxing round
        const got = { [x.n]: { land: 0, blk: 0 }, [y.n]: { land: 0, blk: 0 } }; let kdLine = null;
        for (let i = 0; i < EXB && !winner; i++) {
          for (const [p, q] of (rnd() < 0.5 ? [[x, y], [y, x]] : [[y, x], [x, y]])) {
            if (winner) break;
            const d = finalPerformance(p, wB) - finalPerformance(q, wB);
            if (rnd() < clamp(0.42 + d * 0.04, 0.12, 0.82)) {
              got[p.n].land++; K[p.n].str++; box[p.n].strikes++; box[p.n].fp += 1;
              const pk = clamp(0.03 + 0.04 * EV_q(finalPerformance(p, wB)) + 0.03 * K[q.n].kd, 0.02, 0.2);
              if (rnd() < pk) {
                K[q.n].kd++; box[q.n].kdTaken++;
                const rise = clamp(0.82 - 0.2 * (K[q.n].kd - 1) - 0.25 * (K[q.n].kd >= 3 ? 1 : 0) + (q.co - 11) * 0.01, 0.12, 0.95);
                if (rnd() < rise) { box[p.n].kd++; box[p.n].fp += 8; log.push({ side: sideOf(p), type: "knockdown", round: r, player: p.n, victim: q.n, runFp: r1(box[p.n].fp), text: `Round ${r}, boxing: KNOCKDOWN. ${p.n} drops ${q.n}, who beats the count. That is 8 points for ${p.n}.` }); }
                else { winner = p; how = "KO"; box[p.n].finish++; box[p.n].fp += 20; log.push({ side: sideOf(p), type: "KO", round: r, player: p.n, victim: q.n, runFp: r1(box[p.n].fp), text: `Round ${r}, boxing: KNOCKOUT. ${p.n} puts ${q.n} down and the referee waves it off. That is 20 points for ${p.n}.` }); }
              }
            } else if (rnd() < 0.55) { got[q.n].blk++; box[q.n].blocks++; box[q.n].fp += 0.5; }
          }
        }
        if (!winner) log.push({ side: sideOf(x), type: "round", round: r, text: `Round ${r}, boxing: ${x.n} lands ${got[x.n].land} and blocks ${got[x.n].blk}, ${y.n} lands ${got[y.n].land} and blocks ${got[y.n].blk}.` });
      }
    }
    if (!winner) {
      const sc = (p, q) => 1 * K[p.n].cap + 2 * K[p.n].chk + 0.7 * K[p.n].str + 6 * K[p.n].kd - 6 * K[q.n].kd;
      const a = sc(x, y), b = sc(y, x); winner = a === b ? (finalPerformance(x, weights) >= finalPerformance(y, weights) ? x : y) : a > b ? x : y; how = "decision";
      log.push({ side: sideOf(winner), type: "decision", player: winner.n, text: `All seven rounds are done and it goes to the referee. ${winner.n} wins the decision over ${winner === x ? y.n : x.n}.` });
    }
    const loser = winner === x ? y : x; wins[sideOf(winner)]++;
    box[winner.n].matchW = 1; box[loser.n].matchL = 1; f.forEach((p) => { box[p.n].rounds = rd; box[p.n].how = winner === p ? `Won by ${how}` : `Lost by ${how}`; });
  }
  roster.forEach((p) => { if (!box[p.n].how) box[p.n].how = "Did not fight"; });
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  const wt = wins.A !== wins.B ? (wins.A > wins.B ? "A" : "B") : fa >= fb ? "A" : "B", o = wt === "A" ? "B" : "A";
  const mvp = [...roster].sort((x, y) => box[y.n].fp - box[x.n].fp)[0];
  log.push({ side: wt, type: "finale", player: mvp.n, text: `That is the card. {${wt}} takes it ${wins[wt]} matches to ${wins[o]}, and ${mvp.n} was the standout.` });
  return {
    box, log, winnerTeam: wt, scoreA: fa, scoreB: fb, champion: mvp.n,
    columns: [{ k: "caps", label: "Caps", tip: "Chess pieces captured, 1 each" }, { k: "checks", label: "Checks", tip: "Checks, 3 each" }, { k: "blocks", label: "Blocks", tip: "Punches blocked, half a point each" }, { k: "strikes", label: "Strikes", tip: "Boxing strikes landed, 1 each" }, { k: "kd", label: "KD", tip: "Knockdowns, 8 each" }, { k: "finish", label: "Finish", tip: "Checkmate or knockout, 20" }, { k: "matchW", label: "W", tip: "Match won" }, { k: "how", label: "Result", tip: "How the match ended" }, { k: "participation", label: "Part.", tip: "Participation points" }],
    teamStats: { A: [{ label: "Matches won", value: wins.A }], B: [{ label: "Matches won", value: wins.B }] },
    resultLine: `${wt === "A" ? "{A}" : "{B}"} wins the card, ${wins[wt]} matches to ${wins[o]}`,
    scoringKey: [{ label: "Chess piece captured", pts: 1 }, { label: "Check", pts: 3 }, { label: "Punch block", pts: 0.5 }, { label: "Boxing strike", pts: 1 }, { label: "Knockdown", pts: 8 }, { label: "Checkmate or KO", pts: 20 }, { label: "Participation, everyone who plays", pts: "1.0-3.0" }, { label: "Catastrophe, DQ or disaster", pts: "-5 to -14" }],
  };
}

// ---------- American Gladiators: Assault, Joust, Powerball, Pyramid, then the Eliminator ----------
const AG_ROUNDS = [
  { name: "Assault", w: { str: 10, con: 10, dex: 35, wis: 10, int: 15, cha: 0, lck: 20 }, verb: "dodges the cannon fire and lands shots on the gladiator" },
  { name: "Joust", w: { str: 35, con: 25, dex: 20, wis: 5, int: 5, cha: 0, lck: 10 }, verb: "swings the pugil stick from the pedestal" },
  { name: "Powerball", w: { str: 20, con: 25, dex: 25, wis: 10, int: 10, cha: 0, lck: 10 }, verb: "fights through the defenders to the goal" },
  { name: "Pyramid", w: { str: 30, con: 20, dex: 30, wis: 5, int: 5, cha: 0, lck: 10 }, verb: "scrambles up the ramps past the gladiator" },
  { name: "The Eliminator", w: { str: 20, con: 35, dex: 25, wis: 5, int: 5, cha: 0, lck: 10 }, verb: "runs the course" },
];
const AG_GLADS = ["Crusher", "Volt", "Ironclad", "Phoenix", "Cobra", "Maverick", "Havoc", "Siren", "Warhawk", "Blitz", "Titan Jane", "Hammer"];
const AG_OBS = ["the hang tough rings", "the wall climb", "the tire run", "the sky track", "the tight rope", "the crawl tunnel", "the cargo net", "the power line", "the treadmill", "the zip line"];
const AG_CAT = ["is hurled off the platform and carried out", "suffers a hard fall and cannot continue", "is knocked cold by a gladiator and pulled from the arena"];
function agAssign(players, ws, rng) {
  const n = players.length, cost = players.map((p) => ws.map((w) => computeBER(p, w))), weight = ws.map((_, i) => (i === ws.length - 1 ? 1.6 : 1));
  const perms = []; const go = (cur, used) => { if (cur.length === n) { perms.push([...cur]); return; } for (let i = 0; i < n; i++) if (!used.has(i)) { used.add(i); cur.push(i); go(cur, used); cur.pop(); used.delete(i); } };
  go([], new Set());
  const scored = perms.map((pm) => ({ pm, s: pm.reduce((t, ev, pi) => t + cost[pi][ev] * weight[ev], 0) })).sort((a, b) => b.s - a.s);
  const pick = rng() < 0.7 ? 0 : Math.floor(rng() * Math.min(6, scored.length));
  return scored[pick].pm; // pm[playerIdx] = round index
}
function simAmericanGladiators(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB], sideOf = sideOfFn(teamA);
  const n = Math.min(teamA.length, teamB.length, AG_ROUNDS.length), rounds = AG_ROUNDS.slice(0, n);
  const wr = rounds.map((r) => EV_blend(weights, r.w, 0.5));
  const OB = duration === "short" ? 6 : duration === "long" ? 10 : 8;
  const box = newBox(roster, { round: "", gladiator: 0, evWin: 0, obstacles: 0, finish: 0, fastest: 0, time: 0, status: "" });
  const log = [], wins = { A: 0, B: 0 };
  const permA = agAssign(teamA.slice(0, n), wr, rnd), permB = agAssign(teamB.slice(0, n), wr, rnd);
  const at = (team, perm, ri) => team[perm.indexOf(ri)];
  log.push({ type: "intro", text: `American Gladiators! {A} and {B} each send ${n} contestants into the arena for ${n} head to head events: ${rounds.map((r) => r.name).join(", ")}. Each contestant gets one event, and the team captains choose who goes where. Beat the arena gladiator for eight points, win your head to head for one, and in the Eliminator pick up three points per obstacle, fifteen for finishing and ten for the fastest time.` });
  log.push({ side: "A", type: "lineup", text: `{A} lineup: ${rounds.map((r, i) => `${r.name}, ${at(teamA, permA, i).n}`).join(". ")}.` });
  log.push({ side: "B", type: "lineup", text: `{B} lineup: ${rounds.map((r, i) => `${r.name}, ${at(teamB, permB, i).n}`).join(". ")}.` });
  roster.forEach((p) => { const idx = (teamA.includes(p) ? permA : permB)[(teamA.includes(p) ? teamA : teamB).indexOf(p)]; if (idx != null) box[p.n].round = rounds[idx] ? rounds[idx].name : ""; });
  rounds.forEach((R, ri) => {
    const a = at(teamA, permA, ri), b = at(teamB, permB, ri), isElim = ri === n - 1 && R.name === "The Eliminator";
    if (!isElim) {
      const g = AG_GLADS[(ri * 3 + Math.floor(rnd() * 3)) % AG_GLADS.length], G = 11.2 + ri * 0.4 + (duration === "long" ? 0.5 : 0);
      const res = {};
      [a, b].forEach((p) => {
        const perf = finalPerformance(p, wr[ri]);
        res[p.n] = { perf, beat: rnd() < clamp(0.5 + (perf - G) * 0.07, 0.12, 0.88), cat: rnd() < catastropheChance(p, 2) };
      });
      const cats = [a, b].filter((p) => res[p.n].cat);
      let w;
      if (cats.length === 1) w = cats[0] === a ? b : a; else if (cats.length === 2) w = res[a.n].perf >= res[b.n].perf ? a : b;
      else if (res[a.n].beat !== res[b.n].beat) w = res[a.n].beat ? a : b; else w = res[a.n].perf >= res[b.n].perf ? a : b;
      [a, b].forEach((p) => {
        if (res[p.n].cat) { const c = markCatastrophe(box, p, EV_pick(AG_CAT)); box[p.n].status = "Injured"; log.push({ side: sideOf(p), type: "catastrophe", player: p.n, round: ri + 1, text: `${R.name}: DISASTER. ${p.n} ${c.text} against ${g}. That costs ${Math.abs(c.penalty)} fantasy points.` }); }
        else if (res[p.n].beat) { box[p.n].gladiator = 1; box[p.n].fp += 8; log.push({ side: sideOf(p), type: "gladiator", player: p.n, victim: g, round: ri + 1, runFp: r1(box[p.n].fp), text: `${R.name}: ${p.n} ${R.verb} and defeats ${g}. That is 8 points.` }); }
        else log.push({ side: sideOf(p), type: "gladLoss", player: p.n, round: ri + 1, text: `${R.name}: ${p.n} ${R.verb} but ${g} holds on and survives.` });
      });
      box[w.n].evWin = 1; box[w.n].fp += 1; wins[sideOf(w)]++;
      log.push({ side: sideOf(w), type: "eventWin", player: w.n, victim: w === a ? b.n : a.n, round: ri + 1, text: `${R.name} goes to ${w.n} of {${sideOf(w)}} over ${w === a ? b.n : a.n}, worth 1 point. The tally is ${wins.A} to ${wins.B}.` });
      [a, b].forEach((p) => { box[p.n].status = box[p.n].status || "Competed"; });
    } else {
      // Eliminator: head start for the team that is ahead, obstacles, one retry, a fall ends the run
      const lead = a.n && fpSum(box, teamA) - fpSum(box, teamB), head = clamp(Math.abs(lead) * 0.6, 0, 8);
      const delay = { [a.n]: lead < 0 ? head : 0, [b.n]: lead > 0 ? head : 0 };
      log.push({ type: "round", round: ri + 1, text: `The Eliminator. ${OB} obstacles, ${lead === 0 ? "level start" : `{${lead > 0 ? "A" : "B"}} starts ${r1(head)} seconds ahead`}. ${a.n} of {A} against ${b.n} of {B}.` });
      const run = {};
      [a, b].forEach((p) => {
        let t = 0, cleared = 0, fell = null, cat = false;
        if (rnd() < catastropheChance(p, 2)) { cat = true; }
        for (let i = 0; i < OB && !fell && !cat; i++) {
          const need = 0.64 + (finalPerformance(p, wr[ri]) - 11) * 0.05 - i * 0.012;
          let ok = rnd() < clamp(need, 0.3, 0.96); t += 5 + rnd() * 5 + (10 - clamp(p.dx, 2, 20) * 0.3);
          if (!ok) { t += 10; ok = rnd() < clamp(need - 0.15, 0.2, 0.9); if (!ok) { fell = AG_OBS[i % AG_OBS.length]; break; } }
          cleared++; box[p.n].obstacles++; box[p.n].fp += 3;
        }
        run[p.n] = { t, cleared, fell, cat, done: !fell && !cat && cleared === OB };
        box[p.n].time = r1(t);
        if (cat) { const c = markCatastrophe(box, p, EV_pick(AG_CAT)); box[p.n].status = "Injured"; log.push({ side: sideOf(p), type: "catastrophe", player: p.n, text: `The Eliminator: DISASTER. ${p.n} ${c.text}. That costs ${Math.abs(c.penalty)} fantasy points.` }); }
        else if (fell) { box[p.n].status = `Fell at ${fell}`; log.push({ side: sideOf(p), type: "fall", player: p.n, text: `The Eliminator: ${p.n} clears ${cleared} ${cleared === 1 ? "obstacle" : "obstacles"}, worth ${cleared * 3} points, and then falls at ${fell}.` }); }
        else { box[p.n].finish = 1; box[p.n].fp += 15; box[p.n].status = "Finished"; log.push({ side: sideOf(p), type: "finish", player: p.n, runFp: r1(box[p.n].fp), text: `The Eliminator: ${p.n} clears all ${OB} obstacles and crosses the line in ${r1(t)} seconds. That is 15 points for finishing plus ${OB * 3} for the obstacles.` }); }
      });
      const fin = [a, b].filter((p) => run[p.n].done);
      let w;
      if (fin.length === 2) { w = run[a.n].t + delay[a.n] <= run[b.n].t + delay[b.n] ? a : b; const fast = run[a.n].t <= run[b.n].t ? a : b; box[fast.n].fastest = 1; box[fast.n].fp += 10; log.push({ side: sideOf(fast), type: "fastest", player: fast.n, text: `${fast.n} posts the fastest time on the course, ${r1(run[fast.n].t)} seconds. That is 10 points.` }); }
      else if (fin.length === 1) { w = fin[0]; box[w.n].fastest = 1; box[w.n].fp += 10; log.push({ side: sideOf(w), type: "fastest", player: w.n, text: `${w.n} is the only one to finish, so the fastest time is theirs at ${r1(run[w.n].t)} seconds. That is 10 points.` }); }
      else { const sc = (p) => (run[p.n].cat ? -1 : run[p.n].cleared); w = sc(a) === sc(b) ? (run[a.n].t <= run[b.n].t ? a : b) : sc(a) > sc(b) ? a : b; }
      box[w.n].evWin = 1; box[w.n].fp += 1; wins[sideOf(w)]++;
      log.push({ side: sideOf(w), type: "eventWin", player: w.n, round: ri + 1, text: `The Eliminator goes to ${w.n} of {${sideOf(w)}}, worth 1 point.` });
    }
  });
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  const wt = wins.A !== wins.B ? (wins.A > wins.B ? "A" : "B") : fa >= fb ? "A" : "B", o = wt === "A" ? "B" : "A";
  const mvp = [...roster].sort((x, y) => box[y.n].fp - box[x.n].fp)[0];
  log.push({ side: wt, type: "finale", player: mvp.n, text: `That is the gauntlet. {${wt}} wins ${wins[wt]} events to ${wins[o]}, and ${mvp.n} was the standout.` });
  return {
    box, log, winnerTeam: wt, scoreA: fa, scoreB: fb, champion: mvp.n,
    columns: [{ k: "round", label: "Event", tip: "The event this contestant was sent into" }, { k: "gladiator", label: "Glad.", tip: "Gladiator defeated, 8" }, { k: "evWin", label: "Won", tip: "Event won, 1" }, { k: "obstacles", label: "Obst.", tip: "Eliminator obstacles cleared, 3 each" }, { k: "finish", label: "Finish", tip: "Finished the Eliminator, 15" }, { k: "fastest", label: "Fast", tip: "Fastest Eliminator time, 10" }, { k: "time", label: "Time", tip: "Eliminator run time in seconds" }, { k: "status", label: "Status", tip: "How the contestant finished" }, { k: "participation", label: "Part.", tip: "Participation points" }],
    teamStats: { A: [{ label: "Events won", value: wins.A }], B: [{ label: "Events won", value: wins.B }] },
    resultLine: `${wt === "A" ? "{A}" : "{B}"} wins the gauntlet, ${wins[wt]} events to ${wins[o]}`,
    scoringKey: [{ label: "Obstacle cleared", pts: 3 }, { label: "Event won", pts: 1 }, { label: "Gladiator defeated", pts: 8 }, { label: "Finish", pts: 15 }, { label: "Fastest time", pts: 10 }, { label: "Participation, everyone who plays", pts: "1.0-3.0" }, { label: "Catastrophe, injury or disaster", pts: "-5 to -14" }],
  };
}


// ---------- Corn Hole: 2-on-2 doubles, best of three games to 21 win by 2, three matches a side ----------
function simCornHole(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB], sideOf = sideOfFn(teamA);
  const box = newBox(roster, { bags: 0, woody: 0, hole: 0, miss: 0, gameW: 0, gameL: 0, matchW: 0, matchL: 0, rerolls: 0 });
  const log = [], used = {};
  const sa = EV_shuffle(teamA), sb = EV_shuffle(teamB);
  const nMatch = Math.floor(Math.min(sa.length, sb.length) / 2);
  const BAD = ["tweaks a shoulder on the backswing and cannot throw", "slips on the pitcher's box and rolls an ankle", "launches a bag into the crowd and is ejected for a flagrant foul"];
  const throwBag = (p) => {
    const perf = finalPerformance(p, weights), s = (perf - 11) / 5;
    const pHole = Math.max(0.04, Math.min(0.5, 0.2 + 0.1 * s)), pBoard = Math.max(0.15, Math.min(0.6, 0.4 + 0.06 * s));
    const r = rnd();
    return r < pHole ? 3 : r < pHole + pBoard ? 1 : 0;
  };
  let mw = { A: 0, B: 0 };
  log.push({ type: "intro", text: `Corn hole! {A} and {B} each send ${sa.length} players, paired into ${nMatch} doubles teams a side. Every match is best of three games, each game to 21 and win by 2, and the team with the most match wins takes the event.` });
  for (let m = 0; m < nMatch; m++) {
    const A = [sa[2 * m], sa[2 * m + 1]], B = [sb[2 * m], sb[2 * m + 1]];
    const out = {}; [...A, ...B].forEach((p) => { if (rnd() < catastropheChance(p, 3)) out[p.n] = true; });
    log.push({ type: "matchStart", match: m + 1, text: `Match ${m + 1}: ${A[0].n} and ${A[1].n} for {A}, against ${B[0].n} and ${B[1].n} for {B}.` });
    let gA = 0, gB = 0, g = 0;
    while (gA < 2 && gB < 2 && g < 3) {
      g++;
      let sA = 0, sB = 0, round = 0;
      while (!((sA >= 21 || sB >= 21) && Math.abs(sA - sB) >= 2) && round < 40) {
        round++;
        let ptsA = 0, ptsB = 0;
        for (let t = 0; t < 4; t++) {
          [[A, "A"], [B, "B"]].forEach(([pair, side]) => pair.forEach((p, i) => {
            const b = box[p.n];
            if (out[p.n]) {
              if (!b.catastrophe) { const c = markCatastrophe(box, p, BAD[Math.floor(rnd() * BAD.length)]); if (c) log.push({ side: sideOf(p), type: "catastrophe", match: m + 1, player: p.n, text: `Match ${m + 1}, game ${g}: DISASTER. ${p.n} ${c.text}. That costs ${Math.abs(c.penalty)} fantasy points and the partner has to throw alone.` }); }
              return;
            }
            const partnerOut = out[pair[1 - i].n] ? 2 : 1;
            for (let rep2 = 0; rep2 < partnerOut; rep2++) {
            let v = throwBag(p);
            if (v === 0 && !used[p.n] && Math.abs(sA - sB) <= 8 && rnd() < 0.5) { used[p.n] = 1; v = throwBag(p); b.rerolls += 1; if (v > 0) log.push({ side: sideOf(p), type: "reroll", match: m + 1, player: p.n, text: `Match ${m + 1}, game ${g}: ${p.n} uses a super ability reroll and turns a miss into ${v === 3 ? "a cornhole" : "a woody"}.` }); }
            b.bags += 1;
            if (v === 3) { b.hole += 1; b.fp += 3; } else if (v === 1) { b.woody += 1; b.fp += 1; } else b.miss += 1;
            if (side === "A") ptsA += v; else ptsB += v;
            }
          }));
        }
        let net = ptsA - ptsB;
        if (net > 0) sA += net; else if (net < 0) sB += -net;
        if (Math.abs(net) >= 9) log.push({ type: "bigRound", match: m + 1, side: net > 0 ? "A" : "B", text: `Match ${m + 1}, game ${g}: a huge round, ${Math.abs(net)} points for {${net > 0 ? "A" : "B"}}. It is ${sA} to ${sB}.` });
      }
      const wA = sA > sB, W = wA ? A : B, L = wA ? B : A;
      if (wA) gA++; else gB++;
      W.forEach((p) => { box[p.n].gameW += 1; box[p.n].fp += 5; }); L.forEach((p) => { box[p.n].gameL += 1; });
      log.push({ side: wA ? "A" : "B", type: "gameWin", match: m + 1, game: g, text: `Match ${m + 1}, game ${g} goes to ${W[0].n} and ${W[1].n} of {${wA ? "A" : "B"}}, ${Math.max(sA, sB)} to ${Math.min(sA, sB)}.` });
    }
    const wA = gA > gB, W = wA ? A : B, L = wA ? B : A;
    W.forEach((p) => { box[p.n].matchW += 1; box[p.n].fp += 5; }); L.forEach((p) => { box[p.n].matchL += 1; });
    mw[wA ? "A" : "B"] += 1;
    log.push({ side: wA ? "A" : "B", type: "matchWin", match: m + 1, text: `Match ${m + 1} is won by ${W[0].n} and ${W[1].n} of {${wA ? "A" : "B"}}, ${Math.max(gA, gB)} games to ${Math.min(gA, gB)}. Match wins: {A} ${mw.A}, {B} ${mw.B}.` });
  }
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  const wt = mw.A !== mw.B ? (mw.A > mw.B ? "A" : "B") : (fa >= fb ? "A" : "B");
  const winners = (wt === "A" ? sa : sb), champion = [...winners].sort((x, y) => box[y.n].fp - box[x.n].fp)[0];
  log.push({ side: wt, type: "finale", player: champion.n, text: `That is the event. {${wt}} wins ${wt === "A" ? mw.A : mw.B} matches to ${wt === "A" ? mw.B : mw.A}, and ${champion.n} is the best thrower on the day.` });
  const stats = (s) => [{ label: "Match wins", value: mw[s] }, { label: "Holes", value: (s === "A" ? teamA : teamB).reduce((t, p) => t + box[p.n].hole, 0) }, { label: "Woodies", value: (s === "A" ? teamA : teamB).reduce((t, p) => t + box[p.n].woody, 0) }];
  return {
    box, log, winnerTeam: wt, scoreA: fa, scoreB: fb, champion: champion.n,
    columns: [{ k: "hole", label: "Holes", tip: "Bags through the hole, 3 each" }, { k: "woody", label: "Woodies", tip: "Bags that stay on the board, 1 each" }, { k: "miss", label: "Misses", tip: "Bags that miss the board" }, { k: "gameW", label: "Game W", tip: "Games won, 5 each" }, { k: "matchW", label: "Match W", tip: "Matches won, 5 each" }, { k: "rerolls", label: "Rerolls", tip: "Super ability rerolls used" }],
    teamStats: { A: stats("A"), B: stats("B") },
    resultLine: `${wt === "A" ? "{A}" : "{B}"} wins the corn hole event ${mw[wt]} matches to ${mw[wt === "A" ? "B" : "A"]}`,
    scoringKey: [{ label: "Woody, bag stays on the board", pts: 1 }, { label: "Cornhole, bag through the hole", pts: 3 }, { label: "Game win", pts: 5 }, { label: "Match win", pts: 5 }, { label: "Participation, everyone who plays", pts: 3 }, { label: "Catastrophe, injury or ejection", pts: -3 }],
  };
}

// ---------- Haunted House Gauntlet: a night of objectives, ghost touches, and the safe house ----------
function simHauntedHouse(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB], sideOf = sideOfFn(teamA), team = { A: teamA, B: teamB };
  const STEPS = 12, MIN = 5;
  const box = newBox(roster, { clues: 0, objectives: 0, scares: 0, rooms: 0, artifacts: 0, frights: 0, status: "" });
  const log = [];
  const H = { A: { power: 0, clues: 0, rooms: 0, art: 0, safe: false, powerOn: false, solved: false, cleared: false, collected: false }, B: { power: 0, clues: 0, rooms: 0, art: 0, safe: false, powerOn: false, solved: false, cleared: false, collected: false } };
  const NEED = { power: 5, clues: 6, rooms: 5, art: 4 };
  const ps = {}; roster.forEach((p) => { ps[p.n] = { away: 0, frights: 0, gone: false, sup: true, order: EV_shuffle(["power", "clues", "rooms", "art"]) }; });
  const GHOSTS = ["a howling specter", "a grinning poltergeist", "a pale figure in the hallway", "a cold hand from the wall", "a screaming apparition"];
  const CAT = ["falls through a rotted floor and has to be carried out", "is locked in a cellar by a slamming door and is out for the night", "breaks an ankle on the stairs"];
  const roll = (p) => { const perf = finalPerformance(p, weights); return Math.max(0.06, Math.min(0.6, 0.27 + 0.03 * (perf - 10))); };
  log.push({ type: "intro", text: `Haunted house gauntlet! {A} and {B} each send ${teamA.length} into their own haunted house for a one hour night. Turn on the power, solve the murder mystery, clear the supernatural disturbances, recover the artifacts, find the safe house, and stay the whole night. A ghost touch means fear, and a frightened contestant has to go back to the safe house for five minutes.` });
  ["A", "B"].forEach((s) => team[s].forEach((p) => { if (rnd() < catastropheChance(p, 1) * 1.2) ps[p.n].catAt = 1 + Math.floor(rnd() * STEPS); }));
  const objDone = (s, p, label, pts) => { box[p.n].objectives += 1; box[p.n].fp += pts; log.push({ side: s, type: "objective", step: 0, player: p.n, text: label }); };
  for (let step = 1; step <= STEPS; step++) {
    const clock = step * MIN;
    ["A", "B"].forEach((s) => {
      const h = H[s];
      EV_shuffle(team[s]).forEach((p) => {
        const st = ps[p.n], b = box[p.n];
        if (st.gone) return;
        if (st.catAt === step) {
          const c = markCatastrophe(box, p, CAT[Math.floor(rnd() * CAT.length)]); st.gone = true; b.status = "Out";
          if (c) log.push({ side: s, type: "catastrophe", step, player: p.n, text: `Minute ${clock}: DISASTER. ${p.n} ${c.text}. That costs ${Math.abs(c.penalty)} fantasy points.` });
          return;
        }
        if (st.away > 0) { st.away -= 1; return; }
        // ghost encounter
        if (rnd() < (h.powerOn ? 0.36 : 0.48)) {
          const g = GHOSTS[Math.floor(rnd() * GHOSTS.length)];
          const resist = Math.max(0.12, Math.min(0.85, 0.42 + 0.05 * (finalPerformance(p, weights) - 11)));
          if (rnd() < resist) { b.scares += 1; b.fp += 3; log.push({ side: s, type: "scareResisted", step, player: p.n, text: `Minute ${clock}: ${p.n} stares down ${g} and resists the scare.` }); }
          else if (st.sup && rnd() < 0.5) { st.sup = false; b.scares += 1; b.fp += 3; log.push({ side: s, type: "ability", step, player: p.n, text: `Minute ${clock}: ${p.n} is touched by ${g} but uses a super ability to shake off the fear.` }); }
          else {
            b.frights += 1; b.fp -= 2; st.frights += 1; st.away = h.safe ? 1 : 2;
            if (st.frights >= 3) { st.gone = true; b.status = "Abandoned"; log.push({ side: s, type: "abandon", step, player: p.n, text: `Minute ${clock}: ${g} gets ${p.n} for the third time. ${p.n} is frightened, loses it, and leaves the house for good.` }); }
            else log.push({ side: s, type: "frightened", step, player: p.n, text: `Minute ${clock}: ${g} touches ${p.n}, who is frightened and has to return to the safe house for five minutes. That is ${st.frights === 1 ? "the first" : "the second"} fright.` });
            return;
          }
        }
        // work on a task
        let task = !h.safe ? "safe" : st.order.find((k) => !(k === "power" && h.powerOn) && !(k === "clues" && h.solved) && !(k === "rooms" && h.cleared) && true);
        if (!task) return;
        if (rnd() >= roll(p)) return;
        if (task === "safe") { h.safe = true; objDone(s, p, `Minute ${clock}: ${p.n} locates the safe house for {${s}}.`, 5); log[log.length - 1].type = "safehouse"; }
        else if (task === "power") { h.power += 1; if (h.power >= NEED.power) { h.powerOn = true; objDone(s, p, `Minute ${clock}: ${p.n} gets the power source running for {${s}}, and the house gets a little less scary.`, 5); } }
        else if (task === "clues") { h.clues += 1; b.clues += 1; b.fp += 1; if (h.clues >= NEED.clues) { h.solved = true; objDone(s, p, `Minute ${clock}: ${p.n} puts the last clue together and solves the murder mystery for {${s}}.`, 5); } }
        else if (task === "rooms") { h.rooms += 1; b.rooms += 1; b.fp += 5; if (h.rooms < NEED.rooms) log.push({ side: s, type: "roomCleared", step, player: p.n, text: `Minute ${clock}: ${p.n} clears a room of supernatural disturbances. {${s}} has cleared ${h.rooms}.` }); if (h.rooms >= NEED.rooms) { h.cleared = true; objDone(s, p, `Minute ${clock}: ${p.n} clears the last room, so {${s}} has the whole area clear.`, 5); } }
        else if (task === "art") { h.art += 1; b.artifacts += 1; if (h.art < NEED.art) log.push({ side: s, type: "artifact", step, player: p.n, text: `Minute ${clock}: ${p.n} recovers an artifact, number ${h.art} for {${s}}.` }); if (h.art === NEED.art) { h.collected = true; objDone(s, p, `Minute ${clock}: ${p.n} recovers the last artifact for {${s}}.`, 5); } }
      });
    });
  }
  const surv = { A: [], B: [] };
  ["A", "B"].forEach((s) => team[s].forEach((p) => { const st = ps[p.n], b = box[p.n]; if (!st.gone) { b.fp += 15; b.status = "Survived"; surv[s].push(p); log.push({ side: s, type: "survive", player: p.n, text: `${p.n} stays the whole night and survives for {${s}}.` }); } }));
  finishBox(box, roster);
  const fa = fpSum(box, teamA), fb = fpSum(box, teamB);
  const art = (s) => H[s].art;
  let wt = surv.A.length !== surv.B.length ? (surv.A.length > surv.B.length ? "A" : "B") : art("A") !== art("B") ? (art("A") > art("B") ? "A" : "B") : (fa >= fb ? "A" : "B");
  const viaTie = surv.A.length === surv.B.length;
  const champion = [...team[wt]].sort((x, y) => box[y.n].fp - box[x.n].fp)[0];
  log.push({ side: wt, type: "finale", player: champion.n, text: `Dawn breaks. {A} has ${surv.A.length} survivors and {B} has ${surv.B.length}. ${viaTie ? `The tie goes to the team with more artifacts, ${art("A")} to ${art("B")}, so ` : ""}{${wt}} wins the night, and ${champion.n} is the standout.` });
  const stats = (s) => [{ label: "Survivors", value: `${surv[s].length}/${team[s].length}` }, { label: "Artifacts", value: art(s) }, { label: "Rooms cleared", value: H[s].rooms }];
  return {
    box, log, winnerTeam: wt, scoreA: fa, scoreB: fb, champion: champion.n,
    columns: [{ k: "clues", label: "Clues", tip: "Clues found, 1 each" }, { k: "objectives", label: "Objectives", tip: "Objectives completed, 5 each" }, { k: "rooms", label: "Rooms", tip: "Rooms cleared, 5 each" }, { k: "scares", label: "Resisted", tip: "Scares resisted, 3 each" }, { k: "frights", label: "Frights", tip: "Times frightened, minus 2 each" }, { k: "artifacts", label: "Artifacts", tip: "Artifacts recovered, the tiebreaker" }, { k: "status", label: "Night" }],
    teamStats: { A: stats("A"), B: stats("B") },
    resultLine: `${wt === "A" ? "{A}" : "{B}"} wins the night with ${surv[wt].length} survivors to ${surv[wt === "A" ? "B" : "A"].length}`,
    scoringKey: [{ label: "Clue found", pts: 1 }, { label: "Objective complete", pts: 5 }, { label: "Scare resisted", pts: 3 }, { label: "Room cleared", pts: 5 }, { label: "Stays the whole night", pts: 15 }, { label: "Frightened", pts: -2 }, { label: "Participation, everyone who plays", pts: 3 }, { label: "Catastrophe, hurt or locked in", pts: -3 }],
  };
}


// ---------- Alliance Island: sixty days, two tribes, a merge at nine, hidden idols, individual immunity and a jury ----------
const AI_SUPPLIES = ["a fishing kit", "a tarp and a coil of rope", "flint and a machete", "a pot and a sack of rice", "blankets and a cooking set", "a first aid kit", "a feast of fruit and coconut", "a hammock and a bottle of cooking oil"];
const AI_TRIBE_CH = [
  { n: "a swim and puzzle relay", w: { str: 0.2, con: 0.3, int: 0.5 } },
  { n: "a blindfolded obstacle course", w: { dex: 0.3, wis: 0.4, cha: 0.3 } },
  { n: "a mud crawl and sandbag toss", w: { str: 0.4, con: 0.4, dex: 0.2 } },
  { n: "a memory challenge on the island landmarks", w: { int: 0.5, wis: 0.5 } },
  { n: "a rope haul and net climb", w: { str: 0.5, dex: 0.3, con: 0.2 } },
  { n: "a balance beam over the lagoon", w: { dex: 0.5, con: 0.3, lck: 0.2 } },
  { n: "a log carry and ring toss", w: { str: 0.3, dex: 0.4, lck: 0.3 } },
  { n: "a tribe puzzle with everybody shouting directions", w: { int: 0.4, cha: 0.4, wis: 0.2 } },
];
const AI_SOLO_CH = [
  { n: "an endurance hold on a post over the water", w: { con: 0.6, wis: 0.3, str: 0.1 } },
  { n: "a balance beam and bean bag toss", w: { dex: 0.5, con: 0.2, lck: 0.3 } },
  { n: "a blindfolded maze", w: { wis: 0.4, dex: 0.3, int: 0.3 } },
  { n: "a slide puzzle against the clock", w: { int: 0.6, wis: 0.3, lck: 0.1 } },
  { n: "a knot tying race", w: { dex: 0.5, int: 0.3, lck: 0.2 } },
  { n: "a swim to the buoy and a ladder climb", w: { str: 0.4, con: 0.4, dex: 0.2 } },
  { n: "a memory sequence under the blazing sun", w: { int: 0.4, wis: 0.4, lck: 0.2 } },
];
const AI_OUT = ["is medically evacuated after a nasty infection", "collapses in the heat and is pulled from the game by the medics", "quits the game after a sleepless week and walks off the beach", "is airlifted off the island with a badly twisted knee"];

function simAllianceIsland(teamA, teamB, weights, duration) {
  const roster = [...teamA, ...teamB], N = roster.length, sideOf = sideOfFn(teamA);
  const box = newBox(roster, { chall: 0, stars: 0, tribeW: 0, immun: 0, idolFound: 0, idolSaves: 0, atRisk: 0, orch: 0, allies: 0, rounds: 0, merged: 0, jurySeat: 0, votesGot: 0, finalTwo: 0, sole: 0, outDay: 0, place: 0, status: "" });
  const log = [];
  const ps = {};
  roster.forEach((p) => { ps[p.n] = { p, side: sideOf(p), tribe: sideOf(p), alive: true, ally: null, soc: Math.max(0.1, Math.min(1.2, (p.ch * 0.4 + p.wi * 0.25 + p.it * 0.2 + p.lk * 0.15) / 20)), perfSum: 0, perfN: 0, idol: false, immune: false }; });
  const L = (a) => (a.length <= 1 ? a[0] || "" : a.length === 2 ? a.join(" and ") : a.slice(0, -1).join(", ") + ", and " + a[a.length - 1]);
  const alive = () => roster.filter((p) => ps[p.n].alive);
  const tribeOf = (s) => alive().filter((p) => ps[p.n].tribe === s);
  const AL = {}; let alSeq = 0;
  const removed = [], elimInfo = {}, voteHist = [];
  let merged = false, mergeDay = 0, idolsLeft = 3, day = 0, cycle = 0;
  const DAYS = 60, expectedCycles = Math.max(1, N - 2);
  const dayFor = (c) => Math.min(DAYS - 1, Math.max(day + 1, Math.round((c * (DAYS - 1)) / expectedCycles)));
  const perfAvg = (p) => (ps[p.n].perfN ? ps[p.n].perfSum / ps[p.n].perfN : computeBER(p, weights));
  const tgtW = (p, liab) => {
    const q = perfAvg(p), s = ps[p.n].soc;
    const base = merged ? Math.exp((q - 10) * 0.18) * (0.5 + s) * (1 + 0.35 * box[p.n].immun) : Math.exp(-(q - 10) * 0.22) * (1.4 - Math.min(s, 1.2));
    return Math.max(0.02, base * (liab && liab === p.n ? 1.8 : 1));
  };
  const sideTag = (p) => ps[p.n].side;
  const logP = (p, o) => log.push({ side: sideTag(p), player: p.n, day, runFp: r1(box[p.n].fp), ...o });

  // ----- alliances -----
  function newAlliance(members, lead) {
    const id = ++alSeq; AL[id] = { id, leader: lead.n };
    members.forEach((m) => { ps[m.n].ally = id; });
    return id;
  }
  function formAlliances(group, whereText, biasFn) {
    if (group.length < 3) return;
    const maj = Math.ceil(group.length * 0.55), pool = [...group], majors = [];
    while (majors.length < maj && pool.length) { const x = weightedPick(pool, (p) => 0.3 + ps[p.n].soc + (biasFn ? biasFn(p) : 0)); majors.push(x); pool.splice(pool.indexOf(x), 1); }
    [majors, pool].forEach((g, gi) => {
      if (g.length < 2) { g.forEach((m) => { ps[m.n].ally = null; }); return; }
      const lead = weightedPick(g, (p) => Math.pow(ps[p.n].soc + 0.1, 2));
      newAlliance(g, lead);
      g.forEach((m) => { box[m.n].allies += 1; box[m.n].fp += 2; });
      const names = g.map((m) => m.n);
      const t = gi === 0
        ? [`${whereText}, ${L(names)} shake hands on an alliance, and ${lead.n} is the one running the show.`, `${whereText}, ${lead.n} pulls ${L(names.filter((x) => x !== lead.n))} aside and a majority alliance is born.`][Math.floor(rnd() * 2)]
        : [`${whereText}, ${L(names)} huddle up and form an alliance of their own, hoping to sneak a vote.`, `${whereText}, ${L(names)} quietly agree to stick together, led by ${lead.n}.`][Math.floor(rnd() * 2)];
      log.push({ side: ps[lead.n].side, type: "alliance", day, player: lead.n, text: `Day ${day}: ${t}` });
    });
  }
  function cleanAlliances() {
    Object.values(AL).forEach((a) => {
      const mem = alive().filter((p) => ps[p.n].ally === a.id);
      if (mem.length < 2) { mem.forEach((m) => { ps[m.n].ally = null; }); a.dead = true; return; }
      if (!mem.some((m) => m.n === a.leader)) a.leader = [...mem].sort((x, y) => ps[y.n].soc - ps[x.n].soc)[0].n;
    });
  }

  // ----- intro -----
  log.push({ type: "intro", text: `Day one on Alliance Island! The host gathers {A} and {B} on the beach, ${teamA.length} castaways each. Sixty days, one island. Win the challenge and your tribe eats. Lose, and you go to tribal council, where your own tribe votes one of you out. When nine castaways remain, the tribes merge and every challenge becomes a fight for individual immunity. The last two standing face a jury made up of the final seven voted out, and the jury crowns the Sole Survivor.` });
  day = 1;
  formAlliances(tribeOf("A"), "on the {A} beach", () => 0);
  formAlliances(tribeOf("B"), "on the {B} beach", () => 0);

  // ----- core loop -----
  let guard = 0;
  while (alive().length > 2 && guard++ < 40) {
    cycle++; day = dayFor(cycle);
    const nowAlive = alive();
    // medical evacuations and quitters
    nowAlive.forEach((p) => {
      if (alive().length <= 3 || !ps[p.n].alive) return;
      if (rnd() < catastropheChance(p, 6)) {
        const why = EV_pick(AI_OUT), c = markCatastrophe(box, p, why);
        ps[p.n].alive = false; ps[p.n].idol = false; box[p.n].outDay = day; box[p.n].status = `Out day ${day}`;
        removed.push(p.n); elimInfo[p.n] = { day, voters: [], leader: null, allies: [], evac: true };
        log.push({ side: sideTag(p), type: "catastrophe", day, player: p.n, text: `Day ${day}: disaster on the island. ${p.n} ${c.text}. That costs ${Math.abs(c.penalty)} points and ${p.n} is out of the game.` });
      }
    });
    cleanAlliances();
    // hidden idols
    alive().forEach((p) => {
      if (idolsLeft > 0 && alive().length > 4 && !ps[p.n].idol && rnd() < 0.026 + (p.wi / 22) * 0.02 + (p.lk / 22) * 0.015) {
        idolsLeft--; ps[p.n].idol = true; box[p.n].idolFound += 1; box[p.n].fp += 4;
        logP(p, { type: "idolFound", pts: 4, text: `Day ${day}: ${p.n} slips away from camp, digs under a twisted root, and comes back with a hidden immunity idol. That is worth 4 points, and a very quiet smile.` });
      }
    });
    // merge check
    const sizeA = tribeOf("A").length, sizeB = tribeOf("B").length;
    let mergedNow = false;
    if (!merged && (alive().length <= 9 || sizeA <= 2 || sizeB <= 2)) {
      merged = true; mergedNow = true; mergeDay = day;
      const old = { A: sizeA, B: sizeB }, bigger = sizeA >= sizeB ? "A" : "B";
      alive().forEach((p) => { ps[p.n].tribe = null; ps[p.n].ally = null; box[p.n].merged = 1; box[p.n].fp += 5; });
      log.push({ type: "merge", day, text: `Day ${day}: the merge! ${alive().length} castaways remain, ${old.A} from {A} and ${old.B} from {B}, and the host announces that the tribes are done. From here every challenge is for individual immunity, and the castaways who hold it cannot be voted out. Everyone who made the merge banks 5 points.` });
      formAlliances(alive(), `at the merge feast`, (p) => (ps[p.n].side === bigger ? 0.35 : 0));
    }
    const total = alive().length;
    const atRisk = [];
    let loserTribe = null, liab = null, immuneName = null;
    if (!merged) {
      // tribe supply challenge
      const ch = EV_pick(AI_TRIBE_CH), cw = EV_blend(weights, ch.w, 0.5), prize = EV_pick(AI_SUPPLIES);
      const perfs = { A: [], B: [] };
      ["A", "B"].forEach((s) => tribeOf(s).forEach((p) => { const v = finalPerformance(p, cw); perfs[s].push({ p, v }); ps[p.n].perfSum += v; ps[p.n].perfN += 1; }));
      const mean = (s) => perfs[s].reduce((t, x) => t + x.v, 0) / Math.max(1, perfs[s].length);
      const under = (s) => Math.max(0, perfs[s === "A" ? "B" : "A"].length - perfs[s].length) * 0.2;
      const sc = { A: mean("A") + under("A") + (rnd() - 0.5) * 3, B: mean("B") + under("B") + (rnd() - 0.5) * 3 };
      const ws = sc.A >= sc.B ? "A" : "B", ls = ws === "A" ? "B" : "A";
      ["A", "B"].forEach((s) => {
        const arr = [...perfs[s]].sort((x, y) => y.v - x.v), avg = mean(s);
        arr.forEach((x, i) => {
          if (x.v >= avg) { box[x.p.n].chall += 1; box[x.p.n].fp += 2; }
          if (s === ws) { box[x.p.n].tribeW += 1; box[x.p.n].fp += 3; }
        });
        if (arr[0]) { box[arr[0].p.n].stars += 1; box[arr[0].p.n].fp += 3; }
      });
      const star = [...perfs[ws]].sort((x, y) => y.v - x.v)[0], weak = [...perfs[ls]].sort((x, y) => x.v - y.v)[0];
      liab = weak ? weak.p.n : null; loserTribe = ls;
      const st = star ? star.p.n : "the whole tribe", wk = weak && weak.v < 9 ? EV_pick([` ${weak.p.n} struggled badly for {${ls}}.`, ` ${weak.p.n} had a rough one for {${ls}}.`]) : "";
      const twT = [
        `Day ${day}: supply challenge, ${ch.n}, with ${prize} on the line. {${ws}} wins it, and ${st} is the star of the day. {${ls}} loses, so {${ls}} is headed to tribal council.${wk}`,
        `Day ${day}: the host sets up ${ch.n} for ${prize}. {${ws}} pulls away late behind ${st}, and {${ls}} comes up short. {${ls}} will be voting someone out tonight.${wk}`,
        `Day ${day}: it is ${ch.n} for ${prize}, and ${st} drags {${ws}} across the line first. {${ls}} comes up short, and the torches are lit for tribal council.${wk}`,
        `Day ${day}: with ${prize} up for grabs in ${ch.n}, ${st} leads {${ws}} to the win, and {${ls}} trudges back to camp, knowing one of them will be gone tonight.${wk}`,
      ];
      log.push({ side: ws, type: "tribeWin", day, player: star ? star.p.n : undefined, runFp: star ? r1(box[star.p.n].fp) : undefined, text: EV_pick(twT) });
      tribeOf(ls).forEach((p) => atRisk.push(p));
    } else {
      // individual immunity
      const ch = EV_pick(AI_SOLO_CH), cw = EV_blend(weights, ch.w, 0.5);
      const res = alive().map((p) => ({ p, v: finalPerformance(p, cw) })).sort((x, y) => y.v - x.v);
      res.forEach((x) => { ps[x.p.n].perfSum += x.v; ps[x.p.n].perfN += 1; });
      const half = Math.ceil(res.length / 2);
      res.slice(0, half).forEach((x) => { box[x.p.n].chall += 1; box[x.p.n].fp += 2; });
      const w = res[0].p; immuneName = w.n; ps[w.n].immune = true;
      box[w.n].immun += 1; box[w.n].fp += 10;
      const s2 = res[1] ? EV_pick([` ${res[1].p.n} comes in second, close but not safe.`, ` ${res[1].p.n} was right behind, and it was not enough.`]) : "";
      logP(w, { type: "immunity", pts: 10, text: EV_pick([
        `Day ${day}: individual immunity, ${ch.n}. ${w.n} wins it, safe from the vote tonight and 10 points richer.${s2}`,
        `Day ${day}: ${w.n} outlasts everyone in ${ch.n} and wins immunity, worth 10 points. Nobody can touch ${w.n} tonight.${s2}`,
        `Day ${day}: immunity is on the line in ${ch.n}, and ${w.n} is the last one standing, banking 10 points and a safe night.${s2}`,
      ]) });
      alive().forEach((p) => { if (p.n !== w.n) atRisk.push(p); });
    }

    // ----- tribal council -----
    const voters = merged ? alive() : tribeOf(loserTribe);
    const attendees = voters.length;
    if (!merged && voters.length < 1) break;
    let eligible = merged ? voters.filter((p) => !ps[p.n].immune) : voters;
    let out = null, info = { voters: [], leader: null, allies: [], blind: false, final3: false, tied: false, rocks: false };
    if (total === 3) {
      // final three: the immunity winner chooses who goes home
      const w = alive().find((p) => ps[p.n].immune), others = alive().filter((p) => p.n !== w.n);
      out = [...others].sort((x, y) => (ps[y.n].soc * 1.2 + perfAvg(y) / 14 + rnd() * 0.3) - (ps[x.n].soc * 1.2 + perfAvg(x) / 14 + rnd() * 0.3))[0];
      info.final3 = true; info.leader = w.n; info.voters = [w.n];
      log.push({ side: sideTag(w), type: "tribal", day, player: w.n, text: `Day ${day}, tribal council with three left. ${w.n} holds immunity and also holds the power: the person ${w.n} sends home is the person who goes.` });
    } else {
      const byAl = {};
      voters.forEach((v) => { const a = ps[v.n].ally; if (a != null) (byAl[a] = byAl[a] || []).push(v); });
      const alIds = Object.keys(byAl).sort((x, y) => byAl[y].length - byAl[x].length);
      const target = {};
      const topLeader = alIds.length ? AL[alIds[0]].leader : null;
      alIds.forEach((id, idx) => {
        const mem = byAl[id], leader = mem.find((m) => m.n === AL[id].leader) || mem[0];
        let pool = eligible.filter((e) => ps[e.n].ally !== Number(id));
        if (!pool.length) pool = eligible.filter((e) => e.n !== leader.n);
        if (!pool.length) pool = eligible;
        const tl = pool.find((e) => e.n === topLeader);
        target[id] = idx > 0 && tl && merged && rnd() < 0.5 ? tl : weightedPick(pool, (e) => tgtW(e, liab));
      });
      const votes = {}, flips = [];
      voters.forEach((v) => {
        const a = ps[v.n].ally, others = eligible.filter((e) => e.n !== v.n);
        if (!others.length) return;
        let t;
        if (a != null && target[a] && target[a].n !== v.n) {
          t = target[a];
          if (AL[a].leader !== v.n && rnd() < 0.07) {
            const alt = others.filter((e) => e.n !== target[a].n);
            if (alt.length) { t = weightedPick(alt, (e) => tgtW(e, liab)); flips.push(v.n); }
          }
        } else t = weightedPick(others, (e) => tgtW(e, liab));
        votes[v.n] = t.n;
      });
      const tally = () => { const c = {}; Object.values(votes).forEach((t) => { c[t] = (c[t] || 0) + 1; }); return c; };
      let cnt = tally();
      // setup line for the biggest alliance's plan
      if (alIds.length) {
        const lead = AL[alIds[0]].leader, tg = target[alIds[0]];
        if (tg && ps[lead] && ps[lead].alive) {
          const ctx = merged ? "Everybody is on the block except " + immuneName : "{" + loserTribe + "} lost the challenge";
          log.push({ side: ps[lead].side, type: "tribal", day, player: lead, text: EV_pick([
            `Day ${day}, tribal council. ${ctx}, and ${lead} has the votes lined up against ${tg.n}. The only question is whether the plan survives the parchment.`,
            `Day ${day}, tribal council. ${ctx}. ${lead} spent the afternoon whispering, and the name on the tip of every tongue is ${tg.n}.`,
            `Day ${day}, the torches are lit at tribal council. ${ctx}. ${lead} is counting on ${tg.n} going home tonight.`,
          ]) });
        }
      }
      // idol plays
      const played = [];
      eligible.filter((e) => ps[e.n].idol && alive().length >= 4).forEach((h) => {
        const on = cnt[h.n] || 0, pPlay = on >= 2 ? 0.9 : on === 1 ? 0.45 : 0.15;
        if (rnd() < pPlay) {
          ps[h.n].idol = false; played.push(h.n);
          if (on > 0) { box[h.n].idolSaves += 1; box[h.n].fp += 6; Object.keys(votes).forEach((v) => { if (votes[v] === h.n) delete votes[v]; }); }
          logP(h, { type: "idolPlay", pts: on > 0 ? 6 : 0, text: on > 0 ? `${h.n} stands up at tribal council and plays a hidden immunity idol! Every vote cast for ${h.n} is thrown out, ${on} in all, and that is worth 6 points. What a move.` : `${h.n} plays a hidden immunity idol at tribal council, and nobody had written down that name. The idol is wasted, and the island is laughing.` });
        }
      });
      cnt = tally();
      const entries = Object.entries(cnt).sort((x, y) => y[1] - x[1]);
      let outName = null;
      if (!entries.length) {
        const pool = eligible.filter((e) => !played.includes(e.n));
        out = weightedPick(pool.length ? pool : eligible, (e) => tgtW(e, liab)); info.rocks = true;
        log.push({ type: "tribal", day, text: `Day ${day}: every vote lands on an idol. The votes do not count, so the host sends the castaways to draw rocks, and ${out.n} draws the unlucky one.` });
      } else {
        const topN = entries[0][1], tied = entries.filter((e) => e[1] === topN).map((e) => e[0]);
        if (tied.length === 1) outName = tied[0];
        else {
          info.tied = true;
          const rev = {};
          voters.filter((v) => !tied.includes(v.n)).forEach((v) => { const a = ps[v.n].ally; const tg = a != null && target[a] && tied.includes(target[a].n) ? target[a].n : weightedPick(tied.map((n) => ps[n].p), (e) => tgtW(e, liab)).n; rev[tg] = (rev[tg] || 0) + 1; });
          const re = Object.entries(rev).sort((x, y) => y[1] - x[1]);
          log.push({ type: "tribal", day, text: `Day ${day}: a tie at tribal council, ${tied.map((n) => n + " with " + topN).join(" and ")}! The castaways not in the tie vote again.` });
          if (re.length && (re.length === 1 || re[0][1] > re[1][1])) outName = re[0][0];
          else { info.rocks = true; const pool = re.length ? re.filter((e) => e[1] === re[0][1]).map((e) => e[0]) : tied; outName = EV_pick(pool); log.push({ type: "tribal", day, text: `Still deadlocked, so it comes down to drawing rocks. ${outName} pulls the rock nobody wanted.` }); }
        }
        if (outName) out = ps[outName].p;
      }
      info.voters = Object.keys(votes).filter((v) => votes[v] === out.n);
      const leadAl = Object.keys(byAl).sort((x, y) => (byAl[y].filter((m) => votes[m.n] === out.n).length) - (byAl[x].filter((m) => votes[m.n] === out.n).length))[0];
      if (leadAl != null && byAl[leadAl].filter((m) => votes[m.n] === out.n).length >= 2) info.leader = AL[leadAl].leader;
      info.blind = !!(topLeader && ps[out.n].ally != null && alIds.length && ps[out.n].ally === Number(alIds[0]) && alIds.length > 1);
      info.allies = alive().filter((p) => p.n !== out.n && ps[p.n].ally != null && ps[p.n].ally === ps[out.n].ally).map((p) => p.n);
      info.flips = flips;
      info.tallyText = entries.length ? entries.map((e) => `${e[0]} ${e[1]}`).join(", ") : "not one of them counts";
      info.cnt = cnt;
    }
    // everyone at risk who survives banks the points
    atRisk.forEach((p) => { if (!out || p.n !== out.n) { if (ps[p.n].alive) { box[p.n].atRisk += 1; box[p.n].fp += 3; } } });
    // orchestrator credit
    if (!info.final3 && info.leader && out && info.leader !== out.n) { const lp = ps[info.leader].p; box[lp.n].orch += 1; box[lp.n].fp += 4; }
    // eliminate
    ps[out.n].alive = false; ps[out.n].idol = false; box[out.n].outDay = day; ps[out.n].lastAlly = info.allies;
    removed.push(out.n); elimInfo[out.n] = { day, voters: info.voters, leader: info.leader, allies: info.allies, final3: info.final3 };
    const leftN = alive().length;
    if (info.final3) {
      log.push({ side: sideTag(out), type: "elimination", day, player: out.n, text: `Day ${day}: ${out.n} is the one sent home at the final three. ${info.leader} takes ${alive().filter((p) => p.n !== info.leader)[0].n} to the end. Two castaways are left.` });
    } else {
      const flipTxt = info.flips && info.flips.length ? ` ${L(info.flips)} broke from the alliance plan on the parchment.` : "";
      const blindTxt = info.blind ? EV_pick([` A blindside! ${out.n} was sitting in the majority alliance and never saw it coming.`, ` ${out.n} was part of the biggest alliance on the island, and the plan blew up on the way to the parchment.`]) : "";
      const orchTxt = info.leader && info.leader !== out.n ? EV_pick([` ${info.leader} orchestrated it, and that is worth 4 points.`, ` Credit goes to ${info.leader} for steering the vote, worth 4 points.`]) : "";
      const rk = info.rocks ? " The rocks decide it." : "";
      log.push({ side: sideTag(out), type: "elimination", day, player: out.n, text: EV_pick([
        `Day ${day}: the votes are read, ${info.tallyText}.${rk} ${out.n} is voted out of the game, and ${leftN} castaways remain.${blindTxt}${orchTxt}${flipTxt}`,
        `Day ${day}: ${out.n} gets the news the hard way. The votes read ${info.tallyText}.${rk} The host takes ${out.n}'s torch, and ${leftN} castaways remain.${blindTxt}${orchTxt}${flipTxt}`,
        `Day ${day}: one by one the parchments come out, ${info.tallyText}.${rk} That is the end of the road for ${out.n}, with ${leftN} castaways left.${blindTxt}${orchTxt}${flipTxt}`,
      ]) });
    }
    // jury announcements
    if (merged && leftN <= 7 && !info.final3) { /* jury filled as removals accrue */ }
    alive().forEach((p) => { box[p.n].rounds += 1; box[p.n].fp += 1; });
    Object.values(ps).forEach((s) => { s.immune = false; });
    cleanAlliances();
    // alliance wobble: a majority member can jump ship
    if (alive().length >= 5 && rnd() < 0.18) {
      const ids = Object.values(AL).filter((a) => !a.dead && alive().filter((p) => ps[p.n].ally === a.id).length >= 3).map((a) => a.id);
      const other = Object.values(AL).filter((a) => !a.dead && alive().filter((p) => ps[p.n].ally === a.id).length >= 2);
      if (ids.length && other.length >= 2) {
        const from = ids[0], to = other.find((a) => a.id !== from);
        if (to) {
          const mem = alive().filter((p) => ps[p.n].ally === from && p.n !== AL[from].leader);
          if (mem.length) { const j = weightedPick(mem, (p) => 0.2 + (1.2 - ps[p.n].soc)); ps[j.n].ally = to.id; logP(j, { type: "flip", text: `Day ${day}: ${j.n} sneaks away from the majority and joins ${to.leader}'s group. The numbers on this island just changed.` }); }
        }
      }
    }
  }

  // ----- final tribal council -----
  const finalists = alive();
  const jurors = removed.slice(-7).map((n) => ps[n].p);
  day = DAYS;
  jurors.forEach((j) => { box[j.n].jurySeat += 1; box[j.n].fp += 3; });
  finalists.forEach((f) => { box[f.n].finalTwo += 1; box[f.n].fp += 8; });
  const fa = finalists[0], fb = finalists[1];
  log.push({ type: "final", day, text: `Day 60: Final tribal council. ${fa.n} and ${fb.n} have outlasted everybody else, and the ${jurors.length} jurors who were voted out last have the final say. Earning a jury seat is worth 3 points, and making the final two is worth 8.` });
  const gut = {}; jurors.forEach((j) => { gut[j.n] = rnd() < 0.5 ? fa.n : fb.n; });
  const juryScore = (j, f) => {
    const e = elimInfo[j.n] || {};
    let s = 1.2 * ps[f.n].soc + 0.8 * (box[f.n].immun * 0.25 + perfAvg(f) / 20) + 0.15 * box[f.n].orch;
    if (e.voters && e.voters.includes(f.n)) s -= 0.5;
    if (e.leader === f.n) s -= 0.6;
    if (e.allies && e.allies.includes(f.n)) s += 0.6;
    return s + (rnd() - 0.5) * 1.1 + (gut[j.n] === f.n ? 0.35 : 0);
  };
  const jv = { [fa.n]: 0, [fb.n]: 0 };
  const sp = (f) => { const bits = []; if (box[f.n].immun >= 2) bits.push(`${box[f.n].immun} immunity wins`); if (box[f.n].idolSaves) bits.push("an idol that saved the game"); if (box[f.n].orch >= 2) bits.push(`${box[f.n].orch} votes steered`); return bits.length ? L(bits) : "a game played with heart and nerve"; };
  log.push({ type: "final", day, player: fa.n, side: ps[fa.n].side, text: `${fa.n} opens the case to the jury, pointing at ${sp(fa)}. ${fb.n} answers back, pointing at ${sp(fb)}. The jury asks the hard questions, and both finalists take them head on.` });
  const votesOrder = jurors.map((j) => ({ j, pick: juryScore(j, fa) >= juryScore(j, fb) ? fa : fb }));
  votesOrder.forEach((v, i) => {
    jv[v.pick.n] += 1; box[v.pick.n].votesGot += 1; box[v.pick.n].fp += 3;
    const need = Math.floor(jurors.length / 2) + 1, cur = jv[v.pick.n], oth = jv[v.pick.n === fa.n ? fb.n : fa.n], score = `${fa.n} ${jv[fa.n]}, ${fb.n} ${jv[fb.n]}`;
    const jt = i === 0 ? `The first jury vote comes from ${v.j.n}, and it goes to ${v.pick.n}. That makes it ${score}.`
      : cur === need ? `${v.j.n} votes for ${v.pick.n}, and that is ${need} votes. ${v.pick.n} cannot be caught, and the crown is theirs.`
      : i === jurors.length - 1 ? `And the final jury vote, from ${v.j.n}, goes to ${v.pick.n}. The last tally is ${score}.`
      : EV_pick([`${v.j.n} votes for ${v.pick.n}. That makes it ${score}.`, `Jury vote ${i + 1} of ${jurors.length}, from ${v.j.n}, goes to ${v.pick.n}. It stands at ${score}.`]);
    log.push({ side: ps[v.pick.n].side, type: "juryVote", day, player: v.pick.n, runFp: r1(box[v.pick.n].fp), text: jt });
  });
  const winner = jv[fa.n] >= jv[fb.n] ? fa : fb, runner = winner === fa ? fb : fa;
  box[winner.n].sole = 1; box[winner.n].fp += 15;
  log.push({ side: ps[winner.n].side, type: "finale", day, player: winner.n, runFp: r1(box[winner.n].fp), text: `${winner.n} is the Sole Survivor, ${jv[winner.n]} votes to ${jv[runner.n]}! The crown is worth 15 points, and ${runner.n} takes runner-up.` });

  // places and statuses
  box[winner.n].place = 1; box[winner.n].status = "Sole Survivor"; box[runner.n].place = 2; box[runner.n].status = "Runner-up";
  [...removed].reverse().forEach((n, i) => {
    box[n].place = 3 + i;
    if (!box[n].catastrophe) box[n].status = (jurors.some((j) => j.n === n) ? "Jury, voted out day " : "Voted out day ") + box[n].outDay;
  });
  finishBox(box, roster);
  const fpA = fpSum(box, teamA), fpB = fpSum(box, teamB);
  const winnerTeam = fpA === fpB ? ps[winner.n].side : fpA > fpB ? "A" : "B";
  const mvp = [...roster].sort((x, y) => box[y.n].fp - box[x.n].fp)[0];
  const stats = (s) => { const team = s === "A" ? teamA : teamB; return [{ label: "Supply challenges won", value: Math.max(...team.map((p) => box[p.n].tribeW)) }, { label: "Made the merge", value: `${team.filter((p) => box[p.n].merged).length}/${team.length}` }, { label: "Best finish", value: EV_ord(Math.min(...team.map((p) => box[p.n].place))) }]; };
  return {
    box, log, winnerTeam, scoreA: fpA, scoreB: fpB, champion: mvp.n,
    columns: [
      { k: "status", label: "Result", tip: "How their island story ended" },
      { k: "chall", label: "Chall", tip: "Challenges where they beat their own group average, 2 each" },
      { k: "stars", label: "Stars", tip: "Best performer on their tribe in a supply challenge, 3 each" },
      { k: "tribeW", label: "Tribe W", tip: "Supply challenges won by their tribe, 3 each" },
      { k: "immun", label: "Immun", tip: "Individual immunity wins, 10 each" },
      { k: "idolFound", label: "Idols", tip: "Hidden idols found, 4 each" },
      { k: "idolSaves", label: "Saves", tip: "Idol plays that wiped out votes, 6 each" },
      { k: "atRisk", label: "Survived", tip: "Tribal councils survived while on the block, 3 each" },
      { k: "orch", label: "Orch", tip: "Votes they steered to an elimination, 4 each" },
      { k: "allies", label: "Allies", tip: "Alliances formed, 2 each" },
      { k: "votesGot", label: "Jury", tip: "Jury votes won at the final, 3 each" },
    ],
    teamStats: { A: stats("A"), B: stats("B") },
    resultLine: `${winnerTeam === "A" ? "{A}" : "{B}"} wins Alliance Island, with ${winner.n} the Sole Survivor ${jv[winner.n]} votes to ${jv[runner.n]}`,
    finishOrder: [winner.n, runner.n, ...[...removed].reverse()],
    scoringKey: [
      { label: "Challenge contribution", pts: 2 }, { label: "Challenge star", pts: 3 }, { label: "Supply challenge win", pts: 3 },
      { label: "Fresh alliance", pts: 2 }, { label: "Hidden idol find", pts: 4 }, { label: "Hidden idol save", pts: 6 },
      { label: "Tribal survival", pts: 3 }, { label: "Steered elimination", pts: 4 }, { label: "Round survived", pts: 1 },
      { label: "Merge spot", pts: 5 }, { label: "Solo immunity win", pts: 10 }, { label: "Earns a jury seat", pts: 3 },
      { label: "Final two finish", pts: 8 }, { label: "Jury vote received", pts: 3 }, { label: "Sole Survivor crown", pts: 15 },
      { label: "Participation, everyone who plays", pts: 3 }, { label: "Catastrophe, medical evacuation or quit", pts: -3 },
    ],
  };
}

// ============================= READ ALOUD (browser speech synthesis) =============================
// PBP voice: male baritone, declamatory, high-energy Transatlantic delivery, theatrical staccato (short clauses, hard stops).
// COLOR voice: male alto, halting deadpan (Jeff Van Gundy) crossed with the flat, even, factual recital of a Pokedex entry.
// Browsers expose whatever voices the device has installed, so we pick the best male match per persona and shape the
// delivery with pitch, rate and pauses. Voices and speeds can be changed (and tested) in the Voices panel.
const VOICE_STORE_KEY = "fffs_voice_v1";
const VOICE_PROFILE = {
  pbp: { label: "Play-by-play", pitch: 0.62, rate: 1.1, langPref: ["en-GB", "en-US"], prefer: ["daniel", "google uk english male", "arthur", "oliver", "ryan", "george", "rishi", "alex", "fred", "aaron", "guy", "thomas", "gordon", "james", "david", "mark"] },
  color: { label: "Color commentary", pitch: 1.08, rate: 0.9, langPref: ["en-US", "en-GB"], prefer: ["aaron", "alex", "fred", "tom", "evan", "david", "mark", "guy", "eric", "bruce", "ralph", "junior", "daniel"] },
};
const FEMALE_VOICE_RE = /female|woman|samantha|victoria|karen|moira|tessa|fiona|zira|hazel|susan|serena|allison|ava\b|kate|catherine|sara|jenny|aria|libby|sonia|emma|amy|joanna|nicky|lucy|ellen|tracy|kathy|veena|raveena|sabina|laura|monica|paulina|jessa|siri|nora|shelley|sandy|flo\b|grandma|kendra|kimberly|salli|ivy|joan|martha/i;

const READER = { active: null, listeners: new Set(), token: 0, timers: [], reading: false };
function readerSetActive(a) { READER.active = a; READER.listeners.forEach((f) => { try { f(a); } catch (e) { /* ignore */ } }); }
function useReaderActive() {
  const [a, setA] = useState(READER.active);
  useEffect(() => { READER.listeners.add(setA); return () => READER.listeners.delete(setA); }, []);
  return a;
}
function ttsSupported() { return typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance !== "undefined"; }
function loadVoiceSettings() {
  const d = { pbp: { voice: "", rate: 1 }, color: { voice: "", rate: 1 } };
  try { const s = JSON.parse(localStorage.getItem(VOICE_STORE_KEY) || "null"); if (s) return { pbp: { ...d.pbp, ...(s.pbp || {}) }, color: { ...d.color, ...(s.color || {}) } }; } catch (e) { /* ignore */ }
  return d;
}
function saveVoiceSettings(s) { try { localStorage.setItem(VOICE_STORE_KEY, JSON.stringify(s)); } catch (e) { /* ignore */ } }
function getVoicesAsync() {
  return new Promise((resolve) => {
    if (!ttsSupported()) return resolve([]);
    const synth = window.speechSynthesis;
    const now = synth.getVoices();
    if (now && now.length) return resolve(now);
    let done = false;
    const fin = () => { if (done) return; done = true; resolve(synth.getVoices() || []); };
    try { synth.addEventListener("voiceschanged", fin, { once: true }); } catch (e) { /* ignore */ }
    setTimeout(fin, 1500);
  });
}
function voiceScore(v, persona, avoidName) {
  const P = VOICE_PROFILE[persona], name = (v.name || "").toLowerCase(), lang = v.lang || "";
  if (!/^en/i.test(lang)) return -1000;
  let s = 0;
  if (FEMALE_VOICE_RE.test(name)) s -= 200;
  const li = P.langPref.findIndex((l) => lang.replace("_", "-").toLowerCase() === l.toLowerCase());
  if (li >= 0) s += 12 - li * 5;
  const ni = P.prefer.findIndex((n) => name.includes(n));
  if (ni >= 0) s += 40 - ni;
  if (/male/.test(name) && !/female/.test(name)) s += 25;
  if (/natural|neural|premium|enhanced/.test(name)) s += 6;
  if (v.localService) s += 1;
  if (avoidName && v.name === avoidName) s -= 30;
  return s;
}
function pickVoices(voices, settings) {
  const byName = (n) => voices.find((v) => v.name === n);
  const best = (persona, avoid) => [...voices].sort((a, b) => voiceScore(b, persona, avoid) - voiceScore(a, persona, avoid))[0] || null;
  const pbp = (settings.pbp.voice && byName(settings.pbp.voice)) || best("pbp", null);
  const color = (settings.color.voice && byName(settings.color.voice)) || best("color", pbp && pbp.name);
  return { pbp, color };
}
function pushSplit(text, limit, out) {
  let t = text.trim();
  while (t.length > limit) {
    let cut = t.lastIndexOf(" ", limit);
    if (cut < 20) cut = limit;
    out.push(t.slice(0, cut).trim()); t = t.slice(cut).trim();
  }
  if (t) out.push(t);
}
// Turns one script line into timed speech chunks. PBP is clipped into short declamatory bursts; COLOR is halting and flat.
function chunkLine(text, persona) {
  const clean = String(text || "").replace(/\s+/g, " ").replace(/[*_#]/g, "").trim();
  const sentences = clean.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || [clean];
  const chunks = [];
  sentences.forEach((sRaw) => {
    const s = sRaw.trim(); if (!s) return;
    const parts = [];
    const clauses = s.replace(/([,;:—–])\s+/g, "$1|").split("|");
    clauses.forEach((c) => pushSplit(c, persona === "pbp" ? 140 : 160, parts));
    parts.forEach((p, i) => {
      const last = i === parts.length - 1, bang = /!["')\]]*$/.test(p), q = /\?["')\]]*$/.test(p);
      if (persona === "pbp") chunks.push({ text: p, pitch: bang ? 0.14 : q ? 0.1 : 0, rate: bang ? 1.1 : 1, gap: last ? (bang ? 300 : 230) : 120 });
      else chunks.push({ text: p, pitch: q ? 0.06 : 0, rate: 1, gap: last ? 420 : 210 });
    });
  });
  return chunks;
}
function stopReading() {
  READER.token++;
  READER.timers.forEach((t) => clearTimeout(t)); READER.timers = [];
  READER.reading = false;
  try { if (ttsSupported()) window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
  readerSetActive(null);
}
// items: [{ speaker: "pbp" | "color", text, key }]
function startReading(items, voices, settings, hooks) {
  stopReading();
  if (!ttsSupported() || !items.length) { if (hooks && hooks.onDone) hooks.onDone(); return; }
  const synth = window.speechSynthesis, token = READER.token, picked = pickVoices(voices, settings);
  READER.reading = true;
  const queue = [];
  items.forEach((it, li) => {
    const persona = it.speaker === "color" ? "color" : "pbp";
    const chunks = chunkLine(spoken(it.text), persona);
    chunks.forEach((c, ci) => queue.push({ ...c, persona, key: it.key, lineEnd: ci === chunks.length - 1 }));
  });
  let i = 0;
  const alive = () => token === READER.token;
  const finish = () => { if (!alive()) return; READER.reading = false; readerSetActive(null); if (hooks && hooks.onDone) hooks.onDone(); };
  const next = () => {
    if (!alive()) return;
    if (i >= queue.length) return finish();
    const c = queue[i++], P = VOICE_PROFILE[c.persona], voice = picked[c.persona];
    readerSetActive(c.key);
    let advanced = false;
    const advance = () => {
      if (advanced || !alive()) return; advanced = true;
      const gap = c.gap + (c.lineEnd ? 160 : 0);
      READER.timers.push(setTimeout(next, gap));
    };
    try {
      const u = new window.SpeechSynthesisUtterance(c.text);
      if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = "en-US";
      u.pitch = Math.max(0, Math.min(2, P.pitch + c.pitch));
      u.rate = Math.max(0.1, Math.min(3, P.rate * c.rate * (settings[c.persona].rate || 1)));
      u.volume = 1;
      u.onend = advance;
      u.onerror = (e) => { if (e && (e.error === "canceled" || e.error === "interrupted")) return; advance(); };
      synth.speak(u);
      // some browsers never fire onend; move on after a generous estimate
      READER.timers.push(setTimeout(advance, 3500 + c.text.length * 120 / (u.rate || 1)));
    } catch (e) { advance(); }
  };
  next();
}
function ReadAloudBar({ groups, disabled }) {
  const [reading, setReading] = useState(false);
  const [open, setOpen] = useState(false);
  const [voices, setVoices] = useState([]);
  const [settings, setSettings] = useState(loadVoiceSettings);
  const supported = ttsSupported();
  useEffect(() => { let on = true; getVoicesAsync().then((v) => { if (on) setVoices(v); }); return () => { on = false; stopReading(); }; }, []);
  const items = [];
  (groups || []).forEach((g) => (g.lines || []).forEach((l, i) => items.push({ speaker: l.speaker, text: l.text, key: `${g.group}-${i}` })));
  const picked = pickVoices(voices, settings);
  const englishVoices = voices.filter((v) => /^en/i.test(v.lang || ""));
  const update = (persona, patch) => { const n = { ...settings, [persona]: { ...settings[persona], ...patch } }; setSettings(n); saveVoiceSettings(n); };
  const read = () => { setReading(true); startReading(items, voices, settings, { onDone: () => setReading(false) }); };
  const stop = () => { stopReading(); setReading(false); };
  const test = (persona) => {
    const sample = persona === "pbp" ? "And here we go, ladies and gentlemen! The crowd is on its feet, the stakes could not be higher, and it is time to play!" : "Fun fact. This competitor holds the record for the longest winning streak in canon. Roughly nine hundred years. Nobody has asked them to stop.";
    startReading([{ speaker: persona, text: sample, key: "test" }], voices, settings, { onDone: () => {} });
  };
  if (!supported) return <div className="text-xs mb-3" style={{ color: THEME.textMuted }}>Read aloud needs a browser with speech synthesis, which this one does not offer.</div>;
  const btn = (on, color) => ({ color: on ? color : THEME.textFaint, border: `1px solid ${on ? color : THEME.border}`, opacity: on ? 1 : 0.6 });
  return (
    <div className="mb-3">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={read} disabled={disabled || reading || !items.length} className="px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wide flex items-center gap-1.5" style={{ background: !disabled && !reading && items.length ? THEME.gold : "transparent", color: !disabled && !reading && items.length ? "#1A1200" : THEME.textFaint, border: `1px solid ${THEME.gold}66`, cursor: reading || disabled ? "not-allowed" : "pointer" }}><Volume2 size={14} /> Read aloud</button>
        <button onClick={stop} disabled={!reading} className="px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wide flex items-center gap-1.5" style={{ ...btn(reading, THEME.red), cursor: reading ? "pointer" : "not-allowed" }}><VolumeX size={14} /> Stop reading</button>
        <button onClick={() => setOpen(!open)} className="px-3 py-1.5 rounded text-[11px] uppercase tracking-wide" style={{ color: THEME.textMuted, border: `1px solid ${THEME.border}` }}>{open ? "Hide voices" : "Voices"}</button>
        {reading && <span className="text-xs" style={{ color: THEME.teal }}>On air...</span>}
      </div>
      {open && (
        <div className="mt-3 rounded p-3" style={{ background: THEME.panel2, border: `1px solid ${THEME.border}` }}>
          {["pbp", "color"].map((persona) => (
            <div key={persona} className="mb-3">
              <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: persona === "pbp" ? THEME.teal : THEME.purple }}>{VOICE_PROFILE[persona].label}: {persona === "pbp" ? "male baritone, declamatory Transatlantic, staccato" : "male alto, deadpan Van Gundy meets Pokedex"}</div>
              <div className="flex flex-wrap items-center gap-2">
                <select value={settings[persona].voice} onChange={(e) => update(persona, { voice: e.target.value })} className="rounded px-2 py-1 text-xs" style={{ background: THEME.panel, color: THEME.text, border: `1px solid ${THEME.border}`, maxWidth: 260 }}>
                  <option value="">Auto: {picked[persona] ? picked[persona].name : "default voice"}</option>
                  {englishVoices.map((v) => <option key={v.name + v.lang} value={v.name}>{v.name} ({v.lang})</option>)}
                </select>
                <label className="text-xs flex items-center gap-2" style={{ color: THEME.textMuted }}>Speed
                  <input type="range" min="0.7" max="1.4" step="0.05" value={settings[persona].rate} onChange={(e) => update(persona, { rate: parseFloat(e.target.value) })} />
                  <span className="mono">{Number(settings[persona].rate).toFixed(2)}x</span>
                </label>
                <button onClick={() => test(persona)} className="px-2.5 py-1 rounded text-[11px] uppercase" style={{ color: THEME.text, border: `1px solid ${THEME.borderLight}` }}>Test</button>
              </div>
            </div>
          ))}
          <div className="text-[11px]" style={{ color: THEME.textFaint }}>Voices come from your device and browser, so the exact sound varies. Pitch, pacing and pauses are tuned per announcer; pick another voice here if the automatic choice does not fit.</div>
        </div>
      )}
    </div>
  );
}

// ============================= AI NARRATIVE (hardened) =============================
// Why the old version "malfunctioned": it asked the model to put spoken dialogue (full of double quotes)
// inside JSON string fields, never checked the HTTP status, pinned a single model string, and threw the
// whole script away if JSON.parse failed once. This version:
//   * uses a plain tagged-line script format (no JSON escaping to break),
//   * walks a list of model names and retries transient errors,
//   * splits the play-by-play into small parallel chunks so long calls cannot get truncated,
//   * numbers every play so missing lines are detected and filled from the log,
//   * ALWAYS returns a complete script (AI lines where it worked, log-built lines where it did not),
//   * reports exactly what went wrong so the UI can show it.
const CLAUDE_MODELS = ["claude-sonnet-5-5", "claude-haiku-5-5", "claude-sonnet-4-6", "claude-sonnet-4-5"];
let WORKING_MODEL = null;

function capOrderedLog(log, maxItems, mustKeepFn) {
  if (!log || log.length <= maxItems) return log || [];
  const mustKeep = new Set(log.filter(mustKeepFn || (() => false)));
  const rest = log.filter((l) => !mustKeep.has(l));
  const slots = Math.max(0, maxItems - mustKeep.size);
  const step = Math.max(1, Math.floor(rest.length / Math.max(1, slots)));
  const sampled = new Set();
  for (let i = 0; i < rest.length && sampled.size < slots; i += step) sampled.add(rest[i]);
  return log.filter((l) => mustKeep.has(l) || sampled.has(l));
}

let LAST_CALL_AT = 0;
let COMMENTARY_VIA = null;
async function callClaude(system, userMsg, maxTokens, opts) {
  const o = opts || {};
  // Inside a published artifact the page cannot reach api.anthropic.com directly, so ask Claude through the sample capability first.
  let sampler = null;
  try { if (typeof window !== "undefined" && window.claude && window.claude.use) sampler = await window.claude.use("sample"); } catch (e) { sampler = null; }
  if (sampler) {
    let lastS = null;
    for (let attempt = 0; attempt < 4; attempt++) {
      const wait = LAST_CALL_AT + 450 - Date.now(); LAST_CALL_AT = Math.max(Date.now(), LAST_CALL_AT) + 450; if (wait > 0) await sleep(wait);
      try {
        const out = await sampler(system + "\n\n=====\n\n" + userMsg, { cache: false, modelTier: "default" });
        const text = ((out && out.text) || "").trim();
        if (!text) { lastS = new Error("Claude returned an empty reply"); await sleep(1200); continue; }
        COMMENTARY_VIA = "claude";
        return { text, truncated: !!(out && out.truncated), model: "claude" };
      } catch (e) {
        const code = e && e.code;
        if (code === "not_granted") throw new Error("Commentary needs permission. Press Generate again and choose Allow when Claude asks.");
        lastS = new Error("Claude commentary " + (code || "error") + ": " + ((e && e.message) || "failed"));
        if (code === "rate_limited") await sleep(3000 * (attempt + 1)); else await sleep(1500 * (attempt + 1));
      }
    }
    throw lastS || new Error("Claude commentary unavailable");
  }
  const order = WORKING_MODEL ? [WORKING_MODEL, ...CLAUDE_MODELS.filter((m) => m !== WORKING_MODEL)] : CLAUDE_MODELS;
  const notes = [];
  for (const model of order) {
    for (let attempt = 0; attempt < 4; attempt++) {
      // keep request starts spaced out so parallel segments do not trip rate limits
      const wait = LAST_CALL_AT + 450 - Date.now(); LAST_CALL_AT = Math.max(Date.now(), LAST_CALL_AT) + 450; if (wait > 0) await sleep(wait);
      const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
      const timer = ctrl ? setTimeout(() => ctrl.abort(), o.timeoutMs || 100000) : null;
      let retrySame = false, delay = 1500 * Math.pow(2, attempt), fatal = false;
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model, max_tokens: maxTokens, system, messages: [{ role: "user", content: userMsg }] }),
          signal: ctrl ? ctrl.signal : undefined,
        });
        if (timer) clearTimeout(timer);
        const raw = await response.text();
        let data = null;
        try { data = JSON.parse(raw); } catch (e) { data = null; }
        if (!response.ok) {
          const msg = (data && data.error && data.error.message) || raw.slice(0, 160) || "HTTP " + response.status;
          const st = response.status;
          notes.push(model + " " + st + ": " + msg);
          retrySame = st === 408 || st === 409 || st === 425 || st === 429 || st >= 500;
          if (st === 401 || st === 403) fatal = true;
          const ra = response.headers && response.headers.get && +response.headers.get("retry-after");
          if (ra > 0 && ra < 30) delay = Math.max(delay, ra * 1000);
        } else if (!data || !Array.isArray(data.content)) {
          notes.push(model + ": unreadable response"); retrySame = true;
        } else {
          const text = data.content.map((b) => b.text || "").join("\n").trim();
          if (!text) { notes.push(model + ": empty reply"); retrySame = true; }
          else { WORKING_MODEL = model; return { text, truncated: data.stop_reason === "max_tokens", model }; }
        }
      } catch (e) {
        if (timer) clearTimeout(timer);
        notes.push(model + ": " + (e && e.name === "AbortError" ? "timed out" : (e && e.message) || "network error"));
        retrySame = true;
      }
      if (fatal) throw new Error("commentary service refused the request (" + notes[notes.length - 1] + "). Check that you are signed in to claude.ai.");
      if (retrySame && attempt < 3) { await sleep(delay); continue; }
      break; // next model
    }
  }
  throw new Error(notes.length ? notes[notes.length - 1] + (notes.length > 1 ? " (after " + notes.length + " attempts)" : "") : "commentary service unavailable");
}

// Parses "[3] PBP: text" / "COLOR: text" / "**PBP:** text" scripts. Falls back to salvaging JSON-ish replies.
function parseScript(raw) { return parseScriptRaw(raw).map((l) => ({ ...l, text: spoken(l.text) })).filter((l) => l.text && l.text.length > 1); }
function parseScriptRaw(raw) {
  const out = [];
  if (!raw) return out;
  const cleaned = String(raw).replace(/```[a-zA-Z]*/g, "");
  const jsonish = /"speaker"\s*:/.test(cleaned);
  if (jsonish) {
    const re = /"speaker"\s*:\s*"(pbp|color)"\s*,\s*"text"\s*:\s*"((?:[^"\\]|\\.)*)"/gi;
    let m;
    while ((m = re.exec(cleaned))) {
      let t = m[2];
      try { t = JSON.parse('"' + m[2] + '"'); } catch (e) { t = m[2].replace(/\\"/g, '"').replace(/\\n/g, " "); }
      out.push({ speaker: m[1].toLowerCase(), text: t.trim() });
    }
    if (out.length) return out;
  }
  const lineRe = /^\s*(?:\[(\d+)\]|(\d+)[.)])?\s*(PBP|COLOR)\s*[:\-–—]\s*(.*)$/i;
  let last = null;
  cleaned.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.replace(/^\s*[*_#>•]+\s*/, "").replace(/\*\*/g, "").replace(/__/g, "");
    if (!line.trim()) return;
    const m = line.match(lineRe);
    if (m) {
      last = { speaker: m[3].toLowerCase(), text: (m[4] || "").trim(), idx: m[1] || m[2] ? parseInt(m[1] || m[2], 10) : undefined };
      out.push(last);
    } else if (last && !/^(##|HIGHLIGHTS|LOWLIGHTS|CASUALTIES|SEGMENT)/i.test(line.trim()) && !/^\s*[-•]\s/.test(line)) {
      last.text += " " + line.trim();
    }
  });
  return out.filter((l) => l.text && l.text.length > 1);
}
function parseExtras(raw) {
  const res = { segment: [], highlights: [], lowlights: [], casualties: [] };
  if (!raw) return res;
  const text = String(raw).replace(/```[a-zA-Z]*/g, "");
  const sect = { segment: [], highlights: [], lowlights: [], casualties: [] };
  let cur = "segment";
  text.split(/\r?\n/).forEach((line) => {
    const h = line.replace(/[*#_:]/g, "").trim().toUpperCase();
    if (h === "SEGMENT" || h === "DESK SEGMENT" || h === "EXTENDED SEGMENT") { cur = "segment"; return; }
    if (h === "HIGHLIGHTS") { cur = "highlights"; return; }
    if (h === "LOWLIGHTS") { cur = "lowlights"; return; }
    if (h === "CASUALTIES") { cur = "casualties"; return; }
    sect[cur].push(line);
  });
  res.segment = parseScript(sect.segment.join("\n"));
  ["highlights", "lowlights", "casualties"].forEach((k) => {
    res[k] = sect[k].map((l) => spoken(l.replace(/^\s*[-•*\d.)]+\s*/, "").trim())).filter((l) => l && !/^none\.?$/i.test(l) && l.length > 3);
  });
  return res;
}

// ---- digest: the numbers the announcers are allowed to quote (same data the box score displays) ----
function buildDigest(summary) {
  const box = summary.boxScore || {};
  const nameTeam = (n) => (summary.rosters && summary.rosters.A.includes(n) ? summary.teamAName : summary.teamBName);
  const cols = (summary.columns || []).filter((c) => !["fp", "participation"].includes(c.k));
  const lines = [];
  if (summary.gameScore) lines.push(`GAME SCORE: ${summary.teamAName} ${summary.gameScore.A} — ${summary.gameScore.B} ${summary.teamBName}`);
  lines.push(`FANTASY POINTS: ${summary.teamAName} ${summary.fpScore.A} — ${summary.fpScore.B} ${summary.teamBName}`);
  if (summary.resultLine) lines.push(`RESULT: ${summary.resultLine}`);
  if (summary.winner) lines.push(`WINNER: ${summary.winner}`);
  ["A", "B"].forEach((s) => {
    const ts = summary.teamStats && summary.teamStats[s];
    if (ts && ts.length) lines.push(`TEAM STATS ${s === "A" ? summary.teamAName : summary.teamBName}: ` + ts.map((t) => `${t.label} ${t.value}`).join(", "));
  });
  const ranked = Object.entries(box).sort((a, b) => b[1].fp - a[1].fp);
  lines.push("TOP FANTASY PERFORMERS: " + ranked.slice(0, 5).map(([n, b], i) => `${i + 1}. ${n} of ${nameTeam(n)}, ${b.fp}`).join("; "));
  const leaders = [];
  cols.forEach((c) => {
    const vals = Object.entries(box).filter(([, b]) => typeof b[c.k] === "number" && b[c.k] > 0).sort((a, b) => b[1][c.k] - a[1][c.k]).slice(0, 2);
    if (vals.length) leaders.push(`${c.label}: ` + vals.map(([n, b]) => `${n} ${r1(b[c.k])}`).join(", "));
  });
  if (leaders.length) lines.push("STAT LEADERS — " + leaders.join(" | "));
  const cats = Object.entries(box).filter(([, b]) => b.catastrophe);
  if (cats.length) lines.push("CATASTROPHES: " + cats.map(([n, b]) => `${n} of ${nameTeam(n)}, ${b.catastrophe}, ${b.penalty} fantasy points`).join("; "));
  const rows = Object.entries(box).map(([n, b]) => {
    const parts = cols.filter((c) => typeof b[c.k] === "number" && b[c.k] !== 0).map((c) => `${c.label}=${r1(b[c.k])}`);
    if (b.role) parts.unshift(String(b.role));
    return `${n} of ${nameTeam(n)}: ${parts.join(", ")}${parts.length ? ", " : ""}FP=${b.fp}`;
  });
  lines.push("FULL BOX SCORE (zeros omitted):\n" + rows.join("\n"));
  return lines.join("\n");
}

// ---- log-built fallback lines so commentary is NEVER blank ----
const T_OPEN = ["And here we go!", "Oh, look at this!", "Heads up, folks!", "Big moment!", "Here it comes!", "Unbelievable!", "What a play!", "Hold on to your seats!"];
const T_COLOR = ["For the lore nerds out there,", "Fun fact for the canon crowd:", "And you can see exactly why, given their history,", "Classic move from this character, honestly,"];
function templatePbp(l, i, total) {
  const t = ensureText(l);
  const who = t.player || "";
  const lead = i === 0 ? "Welcome in, everybody, we are LIVE and it is already on!" : T_OPEN[i % T_OPEN.length];
  const body = String(t.text).replace(/\s+/g, " ").trim();
  const sentence = /[.!?]$/.test(body) ? body : body + "!";
  const out = [{ speaker: "pbp", text: `${lead} ${sentence}` }];
  if (i % 3 === 2 && who) out.push({ speaker: "color", text: (typeof CHAR_BIOS !== "undefined" && CHAR_BIOS[who] && i % 6 === 2) ? `Quick refresher on ${who}. ${CHAR_BIOS[who][1]}` : `${T_COLOR[i % T_COLOR.length]} ${who} always makes things interesting.` });
  if (i === total - 1) out.push({ speaker: "pbp", text: "And that is the final play! Stick around, the full numbers are coming up right after this." });
  return out;
}
function templateExtras(summary) {
  const box = summary.boxScore || {};
  const nameTeam = (n) => (summary.rosters && summary.rosters.A.includes(n) ? summary.teamAName : summary.teamBName);
  const ranked = Object.entries(box).sort((a, b) => b[1].fp - a[1].fp);
  const top = ranked[0], second = ranked[1];
  const bottom = ranked[ranked.length - 1];
  const cats = Object.entries(box).filter(([, b]) => b.catastrophe);
  const seg = [];
  const score = summary.gameScore ? `${summary.teamAName} ${summary.gameScore.A}, ${summary.teamBName} ${summary.gameScore.B}` : `${summary.teamAName} ${summary.fpScore.A} fantasy points, ${summary.teamBName} ${summary.fpScore.B}`;
  seg.push({ speaker: "pbp", text: `And that is the final bell! ${score}.${summary.winner ? ` ${summary.winner} takes it.` : ""}` });
  if (summary.resultLine) seg.push({ speaker: "color", text: `${summary.resultLine} That tells you most of what you need to know about how this one swung.` });
  if (top) seg.push({ speaker: "pbp", text: `Most valuable performer has to be ${top[0]} of ${nameTeam(top[0])} with ${top[1].fp} fantasy points. Huge night.` });
  if (second) seg.push({ speaker: "color", text: `I will argue for ${second[0]} all day long, ${second[1].fp} points for ${nameTeam(second[0])}, and the canon backs me up.` });
  cats.slice(0, 2).forEach(([n, b]) => seg.push({ speaker: "pbp", text: `And we cannot forget the disaster: ${n} ${b.catastrophe}. That costs ${Math.abs(b.penalty)} fantasy points.` }));
  try {
    const A = summary.fpScore ? summary.fpScore.A : 0, B = summary.fpScore ? summary.fpScore.B : 0, diff = Math.abs(A - B), tot = Math.max(1, A + B);
    if (summary.winner) seg.push({ speaker: "color", text: diff / tot < 0.08 ? "This one was a nail biter, decided by a handful of points, and it could have gone either way right up to the last play." : diff / tot > 0.3 ? "That was a statement win. The loser never really found a way back into it." : "A solid, steady win, the kind of result a team can build a season on." });
    const fa = FRANCHISE_BY_NAME[summary.teamAName], fb = FRANCHISE_BY_NAME[summary.teamBName];
    if (fa && fb && fa.division === fb.division) seg.push({ speaker: "pbp", text: "And do not forget, these two share a division, so that result goes on the books as a division game." });
    if (top && typeof CHAR_BIOS !== "undefined" && CHAR_BIOS[top[0]]) seg.push({ speaker: "color", text: "For anyone new to the broadcast, here is who just took over the night, " + top[0] + ". " + CHAR_BIOS[top[0]][1] });
    const ratingOf = (n) => (POOL_BY_NAME[n] ? POOL_BY_NAME[n].tt : 0);
    const under = ranked.slice(0, 4).sort((x, y) => ratingOf(x[0]) - ratingOf(y[0]))[0];
    if (under && under[0] !== (top && top[0]) && ratingOf(under[0]) < 130) seg.push({ speaker: "pbp", text: "Keep an eye on " + under[0] + ", who is rated well below the stars of this league and still cracked the top four tonight with " + under[1].fp + " fantasy points." });
  } catch (e) { /* story lines are optional */ }
  seg.push({ speaker: "color", text: "The full stat lines are right below. Every number you see matches what we just called." });
  seg.push({ speaker: "pbp", text: "That is all the time we have. Thanks for watching Fan Fiction Fantasy Stars!" });
  return {
    segment: seg,
    highlights: ranked.slice(0, 3).map(([n, b]) => `${n} of ${nameTeam(n)} led the way with ${b.fp} fantasy points.`),
    lowlights: bottom ? [`${bottom[0]} of ${nameTeam(bottom[0])} had a rough one at ${bottom[1].fp} fantasy points.`] : [],
    casualties: cats.map(([n, b]) => `${n} ${b.catastrophe}, costing ${Math.abs(b.penalty)} fantasy points.`),
  };
}

const PBP_SYSTEM = `You are calling LIVE play-by-play for "Fan Fiction Fantasy Stars," a fictional crossover sports league where characters from all of fiction compete. Two personas alternate:
- PBP: fast, energetic, light, funny, in-the-moment play-by-play announcer, calling each play AS IT HAPPENS (never a recap, never past-tense post-game talk).
- COLOR: a huge nerd color commentator who knows deep trivia and lore about every character competing and drops fun facts between plays.

You are given a numbered, chronological list of plays that already happened. Call them LIVE and in order. Write at least one PBP line for EVERY numbered play. COLOR may add a line after a play (use the same number) roughly every 2 to 4 plays.

PAINT THE PICTURE — THE MOST IMPORTANT RULE:
Do not merely report that something happened. SHOW it. Each play has fields (player, target, role, genre, angle, moment, look, delivery, crowd, statementType, text...). Use them to stage the scene and, where it involves speech or performance, VOICE IT.
- Roast Battle: actually deliver the roast in character. Quote the punchline in single quotes, then give the room's reaction.
- Battle of the Bands: describe what the song SOUNDS like, how the player looks on stage, what the solo does to the room.
- Hollywood Squares: voice the celebrity's true-or-false statement (bluff or honest, per statementType), then the contestant's read and the outcome.
- Global Guts: PBP becomes a Mike O'Malley-style host: loud, hyped, kid-show energy, hollering the competitor's name, "DO YOU HAVE IT?!" build-ups. COLOR becomes a Mo Quirk-style British co-host: crisp, precise, rules-focused, calling out technique and results with brisk authority. Name the actual event drawn each round, describe the obstacle, and treat the Aggro Crag finale as the huge climax with the winner claiming their glowing piece of the rock.
- Football: call it like a game: down and distance feel, the route, the hit, the stat line after the big plays.
- Track & Field: call it like a meet broadcaster: the discipline, the approach, the release or the leap, the exact mark from the play's fields, and the running event tally.
- Corn Hole: call it like a backyard tournament broadcast. Name the doubles teams, the holes and woodies, the big rounds, the games and matches won, and the super ability rerolls.\n- Haunted House Gauntlet: call it like a horror night. Name the ghost touches and who gets frightened, the scares resisted, the objectives and rooms, the artifacts, the safe house, and who survives to dawn.\n
- Battle Bots: call it like a robot combat broadcast. Name the robots by their drivers, the weapon hits, the armor and weapons torn off, the immobilizations with the ten count, the knockouts, and the judges decision if the buzzer sounds.\n- Chess Boxing: call the alternating rounds. In chess rounds name the captures, checks and material lead. In boxing rounds name the strikes, blocks and knockdowns. Make the checkmate or knockout feel huge.\n- American Gladiators: call each event by name, Assault, Joust, Powerball, Pyramid, and the Eliminator finale. Name the gladiator each contestant faces and the obstacle where a run falls apart.\n
- Naked & Afraid: it is a day by day survival story. Name the day, the daily task, who found water or made the hunt, and the gut punch when a team fails the task and has to eliminate one of its own.
- Arm Wrestling: call it like a bracket broadcast. Round number, who is on the table, the pins in each best of three, and who is still standing for each team.
- Prison Break: stage the breakout. The cell, the guards, the diversion, the alarm and the extra guards it brings, the rescue of a trapped teammate, the one use of an ability, and the run for extraction.
- Capture the Flag: describe the course, the flag runs, the handoffs, the tags, who is carrying, how long they have held it.
- Physical events: describe the actual movement: the footwork, the impact, the recovery.

STATS MUST MATCH THE BOX SCORE (very important): any number you say aloud (yards, counts, points, times, scores, running totals) must come from the play's own fields (including nth, runFp, yards, tally) or from the DIGEST below. Never invent a statistic or a result. Invent flavor, never numbers and never outcomes. If you are unsure of a number, describe it without one. Catastrophes are real and cost points, so react to them honestly.

LENGTH: pure transition calls stay short and punchy (10 to 25 words). Dialogue and visuals may run up to 45 words. For BIG moments (touchdowns, knockouts, captures, catastrophes, finales, record-setting plays) really vamp it up: up to 70 words with build-up, the call, and the crowd.

This script is read aloud by voice actors: full, natural, speakable sentences. No stage directions, no brackets, no parentheses, no emojis, no abbreviations. NEVER put scoring, stats or side notes in parentheses or brackets, because the voice actors read them out and it sounds broken. If a side note matters, say it as its own short sentence. Say points in words, for example five points, never plus five. Use single quotes for any quoted speech.

OUTPUT FORMAT — plain lines only, no JSON, no markdown, no preamble:
[3] PBP: the call for play 3
[3] COLOR: optional nerd aside after play 3
[4] PBP: the call for play 4`;

const EXTRAS_SYSTEM = `You are writing the POST-EVENT broadcast segment for "Fan Fiction Fantasy Stars," the extended studio wrap-up that airs right after the live play-by-play. Same two personas: PBP (energetic, light, funny host) and COLOR (a huge lore nerd). This is SEPARATE, ADDITIONAL voice-over material and should be MEATY.

Cover in natural conversational flow:
- The turning point of the event and why it swung
- A real argument between PBP and COLOR over who the MVP was, both citing the actual stat lines
- Replay-style re-living of the two or three biggest moments, re-voicing the best lines and visual beats in richer detail
- COLOR going deep on lore: how these characters' origins, powers, rivalries or canon history explain what we just watched
- Any catastrophes (they cost points) and the participation floor: everyone who played earns something
- A look ahead at what this means for both teams

Base everything strictly on the DIGEST and the play log. Every number you say must appear in the digest or the log. Never contradict a result. Invent vivid color, dialogue and detail, never statistics or outcomes. Use single quotes for quoted speech.
Written to be read aloud: full speakable sentences, no stage directions, no brackets, no parentheses, no emojis. Never put scoring or side notes in parentheses; say them as their own sentences.

If the event is Global Guts, use the same two personas in post-show mode: the hyped American host and the crisp British co-host recapping the four drawn events and the Aggro Crag climb, congratulating the Crag winner on their piece of the rock.

OUTPUT FORMAT — plain text, exactly these headers, no JSON, no markdown:
SEGMENT
PBP: ...
COLOR: ...
(18 to 28 lines in total, each up to 60 words)
HIGHLIGHTS
- one vivid full sentence (3 to 5 items)
LOWLIGHTS
- one vivid full sentence (2 to 3 items)
CASUALTIES
- one vivid full sentence per catastrophe or dramatic casualty (write NONE if there were none)`;

async function runPool(tasks, limit) {
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, tasks.length) }, async () => {
    while (next < tasks.length) { const i = next++; await tasks[i](); }
  });
  await Promise.all(workers);
}

async function generateNarrativeAI({ eventLabel, eventDesc, teamAName, teamBName, duration, summary, orderedLog, onUpdate }) {
  const log = (orderedLog || []).map(ensureText);
  const total = log.length;
  const digest = buildDigest(summary);
  const fc = makeFactChecker(summary, log, eventLabel, eventDesc), fcStats = newFactStats();
  const ctx = `EVENT: ${eventLabel} (${duration} length)${eventDesc ? " — " + eventDesc : ""}\n${teamAName} vs ${teamBName}\n\nDIGEST (the only numbers you may quote besides each play's own fields):\n${digest}`;
  const status = { pbp: "pending", extras: "pending", errors: [], model: null, factCheck: fcStats };
  const chunkSize = 9;
  const chunks = [];
  for (let i = 0; i < total; i += chunkSize) chunks.push({ start: i, items: log.slice(i, i + chunkSize), lines: null });
  const extrasHolder = { value: null };

  const assemble = (final) => {
    const pbp = [];
    for (let c = 0; c < chunks.length; c++) {
      if (!chunks[c].lines) { if (final) chunks[c].lines = chunks[c].items.flatMap((l, k) => templatePbp(l, chunks[c].start + k, total)); else break; }
      pbp.push(...chunks[c].lines);
    }
    const ex = extrasHolder.value;
    return {
      playByPlay: spokenLines(pbp),
      extendedSegment: ex ? spokenLines(ex.segment) : [],
      highlights: ex ? spokenLines(ex.highlights) : [],
      lowlights: ex ? spokenLines(ex.lowlights) : [],
      casualties: ex ? spokenLines(ex.casualties) : [],
      status: { ...status },
      pending: !final,
      progress: { done: chunks.filter((c) => c.lines).length + (extrasHolder.value ? 1 : 0), of: chunks.length + 1 },
    };
  };
  const push = () => { if (onUpdate) { try { onUpdate(assemble(false)); } catch (e) { /* ignore UI errors */ } } };

  const chunkTask = (c, ci) => async () => {
    const isFirst = ci === 0, isLast = ci === chunks.length - 1;
    const user = `${ctx}\n\nYOUR SEGMENT: plays ${c.start + 1} through ${c.start + c.items.length} of ${total}.\n` +
      (isFirst ? "You are opening the broadcast: fold a quick welcome and scene-setting into your first line.\n" : "The broadcast is already underway: no greeting and no re-introductions.\n") +
      (isLast ? "These are the last plays of the event: fold a sign-off into your final line.\n" : "More action follows these plays: do not wrap up or summarize.\n") +
      `\nPLAYS:\n` + c.items.map((l, k) => `[${c.start + k + 1}] ${JSON.stringify(l)}`).join("\n");
    let lastErr = null;
    for (let attempt = 0; attempt < 2 && !c.lines; attempt++) {
      try {
        const r = await callClaude(PBP_SYSTEM, user, 2600);
        status.model = r.model;
        const parsed = parseScript(r.text);
        const byIdx = {};
        parsed.forEach((l) => { const k = l.idx; if (k != null) (byIdx[k] = byIdx[k] || []).push(l); });
        const ordered = [];
        let aiCount = 0;
        c.items.forEach((item, k) => {
          const gi = c.start + k + 1;
          let got = byIdx[gi];
          if ((!got || !got.length) && Object.keys(byIdx).length === 0) got = null; // no numbering at all: handled below
          if (got && got.length) { if (checkPlayLines(fc, got, fcStats, `play ${gi}`)) { got.forEach((l) => ordered.push({ speaker: l.speaker, text: l.text })); aiCount++; } else ordered.push(...templatePbp(item, c.start + k, total)); }
          else if (Object.keys(byIdx).length) ordered.push(...templatePbp(item, c.start + k, total).slice(0, 1));
        });
        if (Object.keys(byIdx).length === 0 && parsed.length) {
          const okLines = parsed.filter((l) => checkPlayLines(fc, [l], fcStats, `chunk ${ci + 1}`));
          okLines.forEach((l) => ordered.push({ speaker: l.speaker, text: l.text }));
          aiCount = okLines.length;
          const pbpN = parsed.filter((l) => l.speaker === "pbp").length;
          for (let k = pbpN; k < c.items.length; k++) ordered.push(...templatePbp(c.items[k], c.start + k, total).slice(0, 1));
        }
        if (aiCount === 0) throw new Error("model reply had no usable lines");
        c.lines = ordered;
      } catch (e) { lastErr = e; }
    }
    if (!c.lines) { status.errors.push(`play-by-play part ${ci + 1}: ${lastErr ? lastErr.message : "failed"}`); c.lines = c.items.flatMap((l, k) => templatePbp(l, c.start + k, total)); c.fallback = true; }
    push();
  };
  const extrasTask = async () => {
    const stride = Math.max(1, Math.ceil(total / 30));
    const keyPlays = log.map((l, i) => ({ i: i + 1, t: l.text })).filter((x, i) => i % stride === 0 || i === total - 1).slice(0, 34);
    let lastErr = null;
    for (let attempt = 0; attempt < 2 && !extrasHolder.value; attempt++) {
      try {
        const r = await callClaude(EXTRAS_SYSTEM, `${ctx}\n\nKEY PLAYS FROM THE LOG:\n${keyPlays.map((x) => `[${x.i}] ${x.t}`).join("\n")}\n\nWrite the post-event desk segment now.`, 5200);
        status.model = r.model;
        const parsed = filterExtras(fc, parseExtras(r.text), fcStats);
        if (parsed.segment.length < 4) throw new Error("model reply had too few lines");
        extrasHolder.value = parsed;
      } catch (e) { lastErr = e; }
    }
    if (!extrasHolder.value) { status.errors.push(`desk segment: ${lastErr ? lastErr.message : "failed"}`); extrasHolder.value = templateExtras(summary); extrasHolder.fallback = true; }
    push();
  };

  const tasks = chunks.map((c, ci) => chunkTask(c, ci));
  tasks.push(extrasTask);
  await runPool(tasks, 2);
  const anyPbpFallback = chunks.some((c) => c.fallback);
  status.pbp = anyPbpFallback ? (chunks.every((c) => c.fallback) ? "template" : "partial") : "ai";
  status.extras = extrasHolder.fallback ? "template" : "ai";
  return assemble(true);
}

// ============================= BUILT-IN BROADCAST BOOTH v2 (no AI calls) =============================
// A play-by-play voice and a color analyst, written from the game's own log, box score and scoring key.
// Every fact comes from the log, so the numbers always match the box score.
const BB_BIG_RE = /ko\b|knockout|touchdown|\btd\b|catastroph|finale|champion|escape|pinned|\bpin\b|disqualif|checkmate|woody|cornhole|rescue|flawless|record|walk off|sweep|upset|clutch|perfect|hat trick|buzzer|fastest|clears the room|destroyed|immobiliz|knockdown|summit|bonus round|wins it/i;
const BB_BAD_RE = /comes up empty|\bmiss(?:es|ed)?\b|setback|fails? to|falls short|frightened|is eliminated|is disqualified|blows it|wipes? out|fumble|interception/i;
const BB_CAT_RE = /catastroph|meltdown|wipeout|disaster/i;
const BB = {
  bigOpen: ["Oh, my goodness!", "Wow! Look at that!", "Listen to this place!", "Unbelievable!", "Here it comes!", "Stop the presses!", "That is special!", "Are you kidding me?", "What a moment!", "Absolutely spectacular!", "He did it! They did it!", "Hold on to your seats!"],
  bigTag: ["Just incredible.", "You cannot script this.", "What a play.", "That is going on the highlight reel.", "The place is rocking.", "Everybody saw that one.", "Pure electricity."],
  normOpen: ["Next up.", "Here we go.", "Now we move on.", "The action rolls on.", "Fresh play, fresh opportunity.", "Back to it.", "Another one to log.", "Eyes up, everybody.", "And here is the next test.", "Settle in, because this one matters."],
  badOpen: ["Ooh, that does not go their way.", "No luck on that one.", "Tough sequence.", "That one slips away.", "Not their moment.", "A hard break there.", "They will want that one back."],
  cat: ["And that is a catastrophe! Points come off the board!", "Disaster strikes! That one will hurt!", "Oh no. That is the worst possible outcome."],
  toss: ["Let's bring in our analyst on that one.", "What did you see there?", "Break that down for us.", "Help me understand what just happened.", "Your read on that?", "Walk us through it."],
  back: ["Back to you.", "Over to the call.", "Let's keep this moving.", "Now let's see how they respond."],
  colorLead: ["Here is the thing.", "Honestly.", "What I love here is this.", "Think about it this way.", "Here is what jumps out.", "Let me tell you why that matters.", "Stay with me on this one."],
  stateTied: ["It is too close to call between {A} and {B}.", "{A} and {B} are trading blows, and nobody has pulled away.", "You could not separate {A} and {B} with a crowbar right now."],
  stateNarrow: ["{L} hold a narrow edge, and {T} are right there.", "{L} are slightly ahead, but {T} are breathing down their necks.", "A small lead for {L}, and {T} can feel it."],
  stateControl: ["{L} are in control, and {T} need something big.", "{L} have taken charge, and {T} must find an answer.", "It is {L} setting the pace now, and {T} are chasing."],
  frac: ["We are about a quarter of the way through {E}.", "A quarter of the way into {E}."],
  quirk: ["That is a rough couple of plays for {W}. Somebody get that competitor a glass of water.", "{W} cannot catch a break, and the whole arena feels it.", "{W} is having one of those nights, and honestly, we have all been there."],
  rival: ["Those two have a real history, and nobody is giving an inch.", "Big respect between those two, but only one of them gets the point.", "That matchup was circled on every scouting report.", "Lore nerds are going to be talking about that pairing for years."],
  lull: ["Quiet stretch, so let me say this. Nobody in this arena is phoning it in.", "Little breather here. Honestly, it is a good time to appreciate how loaded both rosters are.", "If you have been on the couch this whole time, stay put, because these things tend to turn all at once.", "I will say this, the pace has been steady, and steady usually means somebody is about to break it open."],
  blowout: ["At this point the bench is picking out snacks.", "Somebody check on the losing side's playbook, because it appears to be missing pages.", "When it gets like this, you start rooting for one great individual moment.", "The only drama left is whether the trailing side can salvage some pride."],
  tight: ["Look at this finish, I have a headache and I love it.", "Nobody is breathing in the booth right now.", "Games like this are why we do this."],
  sympathy: ["Every competitor earns points just for showing up, so this is a speed bump, not the end.", "Shake it off. There is plenty of game left.", "That is why we say a good performer is judged by the next play.", "Bounce back and nobody remembers it."],
  rule: ["Quick reminder for newcomers: every competitor who shows up earns participation points. Only a catastrophe takes points away.", "If you are new to FFFS, here is the key idea. Everybody earns something just for competing, and only disasters go negative.", "For anyone tuning in for the first time, you do not need to know these characters. Just watch who keeps scoring."],
  catExplain: ["For anyone new, a catastrophe is the one thing that pushes a score below zero. It does not happen often, which is why it shakes the whole broadcast.", "A catastrophe is the only way to lose points in this game. Everything else earns something."],
  credit: ["Credit to both sides tonight, because neither one stopped competing.", "Hats off to everybody who stepped in there. That was a real contest.", "Big respect to the losing side, because the scoreboard does not tell the whole story."],
};
function bbOrd(n) { const v = n % 100; const s = ["th", "st", "nd", "rd"]; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
function bbClean(t) {
  let s = String(t == null ? "" : t).replace(/\s+/g, " ").trim();
  s = s.replace(/^((?:Match|Matchup|Round|Drive|Game|Day|Step|Heat|Bout|Question)\s*\d+[^:]*):\s*/i, (m, a) => a.replace(/^(\w)/, (c) => c.toUpperCase()) + ", ");
  s = s.replace(/\s+[—–]\s+/g, ", ");
  s = s.replace(/\s*\([^)]*\)/g, "");
  s = s.replace(/(^|[.!?]\s+)?\b([A-Z]{4,})\b/g, (m, pre, w) => (pre || "") + (pre || m === w && m === s.slice(0, w.length) ? w.charAt(0) + w.slice(1).toLowerCase() : w.toLowerCase()));
  s = s.replace(/\b1 carries\b/g, "1 carry").replace(/\b1 catches\b/g, "1 catch").replace(/\b1 yards\b/g, "1 yard").replace(/\b1 sacks\b/g, "1 sack").replace(/\b1 points\b/g, "1 point");
  s = s.replace(/^[a-z]/, (c) => c.toUpperCase());
  if (!/[.!?]$/.test(s)) s += ".";
  return s;
}
let BB_TT = null;
function bbPct(n) {
  if (!BB_TT) BB_TT = Object.values(typeof POOL_BY_NAME !== "undefined" ? POOL_BY_NAME : {}).map((p) => p.tt || 0).sort((a, b) => a - b);
  const p = typeof POOL_BY_NAME !== "undefined" ? POOL_BY_NAME[n] : null; if (!p || !BB_TT.length) return null;
  let lo = 0; while (lo < BB_TT.length && BB_TT[lo] < p.tt) lo++; return lo / BB_TT.length;
}
function buildBroadcast({ eventLabel, eventDesc, teamAName, teamBName, summary, orderedLog }) {
  const log = (orderedLog || []).map(ensureText), total = log.length;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const used = new Set();
  const take = (arr) => { let v = pick(arr), g = 0; while (used.has(v) && g++ < 8) v = pick(arr); used.add(v); if (used.size > 45) used.clear(); return v; };
  const rosters = (summary && summary.rosters) || { A: [], B: [] };
  const sideOfName = (n) => (rosters.A.includes(n) ? "A" : rosters.B.includes(n) ? "B" : null);
  const sideOfLog = (l) => (l.side === teamAName ? "A" : l.side === teamBName ? "B" : sideOfName(l.player));
  const teamName = (s) => (s === "A" ? teamAName : teamBName);
  const other = (s) => (s === "A" ? "B" : "A");
  const bios = typeof CHAR_BIOS !== "undefined" ? CHAR_BIOS : {};
  const team = (n) => (typeof POOL_BY_NAME !== "undefined" && POOL_BY_NAME[n] ? POOL_BY_NAME[n].team : "");
  const out = [];
  const say = (speaker, text) => out.push({ speaker, text });
  const key = ((summary && summary.scoringKey) || []).filter((k) => !isNaN(parseFloat(k.pts)) && /^-?[0-9.]+$/.test(String(k.pts).trim()));
  const keyWhy = (text) => {
    const t = text.toLowerCase().replace(/touchdown/g, "touchdown td");
    const STOP = ["goal", "made", "play", "yard", "yards", "point", "points", "score", "bonus", "event", "round"];
    const cands = key.map((k) => {
      const label = k.label.replace(/\s*\([^)]*\)/g, "").trim(); const toks = label.toLowerCase().split(/[^a-z]+/).filter((w) => w.length >= 4 && !STOP.includes(w));
      const sc = toks.filter((w) => t.includes(w.slice(0, Math.max(4, w.length - 2)))).length;
      return { label, pts: Number(k.pts), sc, n: toks.length };
    }).filter((c) => c.sc > 0 && c.n > 0 && c.sc >= Math.ceil(c.n / 2) && Math.abs(c.pts) >= 1 && !/\btd\b|touchdown/i.test(c.label));
    if (!cands.length) return null;
    cands.sort((a, b) => b.sc - a.sc); if (cands.length > 1 && cands[1].sc === cands[0].sc) return null;
    return cands[0];
  };
  // ----- precompute plays -----
  const haveRun = log.filter((l) => l.runFp != null && sideOfLog(l)).length >= Math.max(3, total * 0.5);
  const lastRun = { A: {}, B: {} };
  const ptsList = log.map((l) => (typeof l.pts === "number" ? l.pts : null)).filter((x) => x != null).sort((a, b) => a - b);
  const ptsHi = ptsList.length >= 6 ? Math.max(8, ptsList[Math.floor(ptsList.length * 0.85)]) : 8;
  const plays = log.map((l, i) => {
    const who = l.player || "", s = sideOfLog(l), label = (l.type || "") + " " + (l.outcome || "") + " " + l.text;
    const isCat = BB_CAT_RE.test(label);
    const isBad = isCat || l.outcome === "setback" || (l.pts != null && l.pts <= 0 && BB_BAD_RE.test(label)) || (l.pts == null && BB_BAD_RE.test(label) && !BB_BIG_RE.test(label));
    const isBig = !isBad && i > 0 && (BB_BIG_RE.test(label) || (l.pts != null && l.pts >= ptsHi));
    let gain = 0; if (haveRun && s && l.runFp != null && who) { gain = l.runFp - (lastRun[s][who] || 0); lastRun[s][who] = l.runFp; }
    return { i, l, who, s, isBad, isBig, isCat, gain, text: bbClean(l.text) };
  });
  const badRate = plays.filter((q) => q.isBad && !q.isCat).length / Math.max(1, total);
  const quietBad = badRate > 0.4;
  // swings and forecasts
  const swingIdx = plays.filter((p) => p.i > 1 && p.i < total - 1 && (haveRun ? p.gain >= 5 : p.isBig)).sort((a, b) => (b.gain - a.gain) || (a.i - b.i)).reduce((acc, p) => (acc.length < 2 && acc.every((x) => Math.abs(x.i - p.i) >= 6) ? [...acc, p] : acc), []).map((p) => p.i);
  const forecasts = {}, payoffs = {};
  plays.filter((p) => p.isBig && p.who && p.i >= 7 && !swingIdx.includes(p.i)).forEach((p) => {
    if (Object.keys(forecasts).length >= 2 || Object.values(payoffs).some((x) => x.who === p.who)) return;
    const at = p.i - 5; if (at < 2 || forecasts[at] || plays.slice(0, at).some((q) => q.who === p.who && q.isBig)) return;
    forecasts[at] = { who: p.who, at: p.i }; payoffs[p.i] = { who: p.who };
  });
  // ----- opening: orientation, preparation, rules -----
  const star = (s) => (rosters[s] || []).slice().sort((x, y) => (bbPct(y) || 0) - (bbPct(x) || 0)).slice(0, 2);
  const sa = star("A"), sb = star("B"), bioDone = new Set();
  const bioLine = (n, lead) => { if (!bios[n] || bioDone.has(n) || bioDone.size >= 8) return false; bioDone.add(n); say("color", `${lead} ${bbClean(bios[n][1])}`); return true; };
  say("pbp", `Good evening, everybody, and welcome to ${eventLabel}! ${teamAName} against ${teamBName}, and the lights are up and the crowd is loud.`);
  if (eventDesc) say("color", `Great to be here. For anyone new, here is the game. ${String(eventDesc).replace(/\s+/g, " ").replace(/\s*\([^)]*\)/g, "").replace(/[.!?]*$/, ".")}`);
  const keyBits = key.slice(0, 3).map((k) => `${k.label.replace(/\s*\([^)]*\)/g, "").trim().toLowerCase().replace(/\btd\b/g, "touchdown").replace(/\brec\b/g, "receiving")} is worth ${k.pts}`);
  if (keyBits.length >= 2) say("color", `The scoring in one breath: a ${keyBits.slice(0, -1).join(", a ")}, and a ${keyBits[keyBits.length - 1]}. Keep those numbers in your head and the night makes sense.`);
  if (sa.length && sb.length) say("pbp", `On the ${teamAName} side, keep your eyes on ${sa.join(" and ")}. For ${teamBName}, we expect big things from ${sb.join(" and ")}.`);
  if (sa[0]) bioLine(sa[0], `Quick refresher on ${sa[0]}, because they will matter tonight.`);
  if (sb[0]) bioLine(sb[0], `And the other name to know is ${sb[0]}.`);
  say("color", take(BB.rule));
  say("pbp", `Alright, we are underway.`);
  // ----- running state -----
  const seen = {}, pts = {}; let leader = null, leadChanges = 0, lastLeadSay = -99, midDone = false, ruleCat = false, lastColor = -9, streakSide = null, streakN = 0, lull = 0, bigCount = 0;
  const sums = () => { const t = { A: 0, B: 0 }; ["A", "B"].forEach((s) => Object.values(lastRun[s]).forEach((v) => (t[s] += v))); return t; };
  const orient = new Set([Math.round(total * 0.25), Math.round(total * 0.5), Math.round(total * 0.75), total - 2].filter((x) => x > 2 && x < total));
  const stateLine = () => {
    if (!haveRun) return "It is still anybody's game.";
    const t = sums(), tot = t.A + t.B || 1, gap = Math.abs(t.A - t.B) / tot, lead = t.A > t.B ? "A" : "B";
    const f = (t) => take(t).replace(/\{A\}/g, teamAName).replace(/\{B\}/g, teamBName).replace(/\{L\}/g, teamName(lead)).replace(/\{T\}/g, teamName(other(lead)));
    return gap < 0.06 ? f(BB.stateTied) : gap < 0.18 ? f(BB.stateNarrow) : f(BB.stateControl);
  };
  const colorPhrase = (txt, tossIt) => { if (tossIt && Math.random() < 0.4) say("pbp", take(BB.toss)); say("color", txt); lastColor = cur; };
  let cur = 0;
  plays.forEach((p) => {
    cur = p.i; const { l, who, s } = p;
    if (who) seen[who] = (seen[who] || 0) + 1; if (who && haveRun && l.runFp != null) pts[who] = l.runFp;
    // orientation
    if (orient.has(p.i)) {
      const frac = p.i >= total - 2 ? `We are into the final stretch of ${eventLabel}.` : p.i < total * 0.4 ? take(BB.frac).replace("{E}", eventLabel) : p.i < total * 0.6 ? `We are right at the halfway mark of ${eventLabel}.` : `Three quarters of the way home in ${eventLabel}.`;
      say("pbp", `${frac} ${stateLine()}`);
      midDone = true;
    }
    // play call with pacing
    if (p.i > 0 && p.text === plays[p.i - 1].text) return;
    if (p.isCat) say("pbp", take(BB.cat));
    else if (p.isBig) say("pbp", `${take(BB.bigOpen)} ${p.text}`);
    else if (p.isBad) say("pbp", quietBad && Math.random() < 0.75 ? p.text : `${take(BB.badOpen)} ${p.text}`);
    else say("pbp", p.i === 0 ? `First play of the night. ${p.text}` : Math.random() < 0.5 ? `${take(BB.normOpen)} ${p.text}` : p.text);
    if (p.isCat) say("pbp", p.text);
    if (p.isBig) { bigCount++; if (bigCount % 2 === 1) say("pbp", take(BB.bigTag)); }
    // momentum tracking
    if (p.s && (p.isBig || p.gain >= 4)) { if (streakSide === p.s) streakN++; else { streakSide = p.s; streakN = 1; } } else if (p.s && p.isBad) { streakN = 0; streakSide = null; }
    lull = p.isBig || p.gain >= 4 || p.isBad ? 0 : lull + 1;
    let leadFlip = false;
    if (haveRun && s) {
      const t = sums(), now = t.A > t.B ? "A" : t.B > t.A ? "B" : "T";
      if (now !== "T" && leader && leader !== "T" && now !== leader && p.i > 3 && p.i < total - 2 && p.i - lastLeadSay >= 6 && leadChanges < 4) { leadChanges++; lastLeadSay = p.i; leadFlip = now; }
      if (now !== "T") leader = now;
    }
    // ----- color candidates in priority order -----
    const gap = p.i - lastColor;
    let line = null, toss = false;
    const pc = who ? bbPct(who) : null, why = keyWhy(p.text);
    if (payoffs[p.i]) { say("pbp", "You called that one earlier!"); line = `Told you. I said ${who} was not done, and that is exactly why you watch the whole game.`; }
    else if (swingIdx.includes(p.i)) {
      say("pbp", "Let's take another look at that one.");
      const sz = p.gain >= 12 ? "a huge swing" : p.gain >= 8 ? "a big swing" : "a real bump";
      const whyTxt = why ? ` That kind of play is worth ${why.pts} in this event, and it moves the scoreboard.` : ` It moves the scoreboard, and ${sz} in the running tally.`;
      line = `${take(["On the replay you can see how ${W} set it up.", "Slow it down and watch ${W}. The key is the little thing just outside the frame.", "Watch the replay closely. ${W} made that look easier than it was."]).replace("${W}", who || "they")}${whyTxt} That is the kind of moment a game turns on.`;
    }
    else if (leadFlip) { line = `Lead change! ${teamName(leadFlip)} move out in front, and ${teamName(other(leadFlip))} must answer. Momentum is a real thing, and it just changed hands.`; }
    else if (forecasts[p.i]) { const f = forecasts[p.i]; line = `Mark my words. I would not be surprised if ${f.who} delivers something special before the night is out. Keep an eye on them.`; }
    else if (p.isCat && !ruleCat) { ruleCat = true; line = take(BB.catExplain); toss = true; }
    else if (p.isBig && gap >= 2 && who) {
      const parts = [];
      if (why && Math.abs(why.pts) > 0) parts.push(`In this event a ${why.label.toLowerCase()} is worth ${why.pts}, so that is a real chunk of the scoreboard.`);
      if (pc != null && pc >= 0.85) parts.push(`${who} is among the highest rated competitors in the whole pool, so honestly you expect it.`);
      else if (pc != null && pc <= 0.35) parts.push(`Nobody had that on their card. ${who} is rated well below the pool average, and that is a statement.`);
      else if (team(who)) parts.push(`${who} is carrying the banner for ${team(who)}, and they are doing it proudly.`);
      line = `${take(BB.colorLead)} ${parts.join(" ")}`.trim(); toss = true;
    }
    else if (p.isBad && who && !quietBad && gap >= 2 && plays.filter((q) => q.i <= p.i && q.who === who && q.isBad).length === 2) { line = take(BB.quirk).replace(/\{W\}/g, who); }
    else if (p.isBad && who && gap >= (quietBad ? 8 : 3)) { line = `Tough break for ${who}. ${take(BB.sympathy)}`; }
    else if (streakN >= 3 && streakSide && gap >= 2) { line = `${teamName(streakSide)} have strung together ${streakN} big plays in a row. That is how runs are born, and the other side has to stop the bleeding.`; streakN = 0; }
    else if (who && s && !bioDone.has(who) && p.i > 2 && gap >= 3 && bios[who]) { bioLine(who, `Let me tell you about ${who}.`); lastColor = p.i; }
    else if (who && l.target && /\b(roasts?|jokes?|shot|beats?|defeats?|outduels?|against|works)\b/i.test(l.text) && gap >= 4 && !p.isBad) { line = `${who} against ${l.target}, and neither one is backing down. ${take(BB.rival)}`; }
    else if (who && seen[who] === 3 && gap >= 3) { line = `${who} keeps coming up, and that is the third time. This broadcast is turning into a one character show.`; }
    else if (why && gap >= 3 && !p.isBad && p.i > 1) { line = `${take(BB.colorLead)} A ${why.label.toLowerCase()} is worth ${why.pts} in this event, so even the quieter plays add up on the scoreboard.`; }
    else if (lull >= 4 && gap >= 3) { line = take(BB.lull); lull = 0; }
    if (!line && haveRun && p.i > total * 0.55 && gap >= 5) { const t = sums(), tot = t.A + t.B || 1, g = Math.abs(t.A - t.B) / tot; if (g > 0.28) line = take(BB.blowout); else if (g < 0.06 && p.i > total * 0.7) line = take(BB.tight); }
    if (line) { colorPhrase(line, toss); if (toss && Math.random() < 0.3) say("pbp", take(BB.back)); }
  });
  // ----- final call -----
  const fa = summary && summary.fpScore, win = summary && summary.winner;
  let call = "And that is the final play!";
  if (win && fa && typeof fa.A === "number") { const g = Math.abs(fa.A - fa.B) / ((fa.A + fa.B) || 1); call += g < 0.06 ? ` ${win} survive by the slimmest of margins!` : g < 0.16 ? ` ${win} take a good one!` : ` ${win} win it going away!`; }
  say("pbp", call);
  say("color", take(BB.credit));
  say("pbp", "Stay with us, the desk is next with the full breakdown.");
  const ex = templateExtras(summary);
  ex.segment.forEach((x) => { x.text = x.text.replace(/([0-9a-z])\s+(That tells you most of what you need)/, "$1. $2"); });
  const bestSwing = plays.filter((p) => haveRun && p.gain >= 5).sort((a, b) => b.gain - a.gain)[0];
  if (bestSwing) {
    const idx = ex.segment.findIndex((x) => x.speaker === "color");
    ex.segment.splice(idx >= 0 ? idx + 1 : 1, 0, { speaker: "color", text: `If you want the turning point, it came on this play. ${bestSwing.text} That one moved the needle more than any other single moment.` });
  }
  return { playByPlay: out, ex, leadChanges };
}
// ---- fact checker: every number, name and result in the commentary must agree with the box score and play log ----
function makeFactChecker(summary, log, eventLabel, eventDesc) {
  const box = summary.boxScore || {};
  const boxNames = Object.keys(box);
  const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const ALLP = typeof POOL !== "undefined" ? POOL : TEAMS.flatMap((t) => t.players);
  const allNames = [...new Set([...ALLP.map((p) => p.n), ...boxNames])];
  const teamNames = [summary.teamAName, summary.teamBName];
  const nameRe = new RegExp("(?<![A-Za-z])(" + [...allNames, ...TEAMS.map((t) => t.name), eventLabel || ""].filter(Boolean).sort((a, b) => b.length - a.length).map(esc).join("|") + ")(?![A-Za-z])", "gi");
  const numsOf = (s) => (String(s).replace(/(\d),(\d{3})/g, "$1$2").match(/\d+(?:\.\d+)?/g) || []).map(Number);
  const allowed = new Set();
  const addAll = (s) => numsOf(s).forEach((v) => allowed.add(v));
  addAll(buildDigest(summary)); addAll(eventLabel); addAll(eventDesc);
  (log || []).forEach((l) => addAll(JSON.stringify(l)));
  const fa = summary.fpScore, gs = summary.gameScore;
  [fa, gs].forEach((o) => { if (o && o.A != null && o.B != null) { allowed.add(Math.abs(o.A - o.B)); allowed.add(Math.round(Math.abs(o.A - o.B) * 10) / 10); allowed.add(o.A + o.B); } });
  const base = [...allowed];
  base.forEach((v) => { if (v % 1) { allowed.add(Math.round(v)); allowed.add(Math.round(v * 10) / 10); allowed.add(Math.floor(v)); allowed.add(Math.ceil(v)); } });
  allowed.add(boxNames.length);
  const okNum = (v) => v <= 2 || (v >= 1800 && v <= 2100 && !(v % 1)) || [...allowed].some((a) => Math.abs(a - v) < 0.051);
  // unique single-word aliases (first or last word) so "Gandalf" counts as Gandalf the White
  const tokCount = {};
  allNames.forEach((n) => new Set(n.split(/\s+/)).forEach((t) => { tokCount[t.toLowerCase()] = (tokCount[t.toLowerCase()] || 0) + 1; }));
  const aliasOf = {};
  allNames.forEach((n) => { const w = n.split(/\s+/); [w[0], w[w.length - 1]].forEach((t) => { if (t.length >= 5 && tokCount[t.toLowerCase()] === 1 && t !== n) aliasOf[t.toLowerCase()] = n; }); });
  const logBlob = ((log || []).map((l) => JSON.stringify(l)).join(" ") + " " + (eventDesc || "")).toLowerCase();
  const teamOf = (n) => (summary.rosters && summary.rosters.A.includes(n) ? summary.teamAName : summary.teamBName);
  const loser = summary.winner ? teamNames.find((t) => t !== summary.winner) : null;
  const byLen = [...allNames].sort((x, y) => y.length - x.length);
  const mentioned = (text) => {
    const found = new Set(); let work = text.toLowerCase();
    byLen.forEach((n) => { const re = new RegExp("(?<![a-z])" + esc(n.toLowerCase()) + "(?![a-z])", "g"); if (re.test(work)) { found.add(n); work = work.replace(re, " "); } });
    Object.keys(aliasOf).forEach((a) => { const re = new RegExp("\\b" + esc(a) + "\\b", "g"); if (re.test(work)) { found.add(aliasOf[a]); work = work.replace(re, " "); } });
    return [...found];
  };
  function issues(text) {
    const out = [], soft = [];
    const t = String(text || "");
    const scrubbed = t.replace(nameRe, " ").replace(/\b(\d+)(st|nd|rd|th)\b/gi, " ");
    numsOf(scrubbed).forEach((v) => { if (!okNum(v)) out.push(`number ${v} is not in the box score or log`); });
    const names = mentioned(t);
    names.forEach((n) => {
      if (!box[n] && !new RegExp("(?<![a-z])" + esc(n.toLowerCase()) + "(?![a-z])").test(logBlob)) soft.push(`${n} did not compete`);
      if (box[n]) { const other = teamNames.find((x) => x !== teamOf(n)); if (other && new RegExp(esc(n) + "[^.!?]{0,12}\\b(of|for|from) (the )?" + esc(other), "i").test(t)) out.push(`${n} credited to ${other}`); }
    });
    if (loser && summary.winner && /\b(final|overall|in the end|takes the (event|game|match|win)|wins the (event|game|match)|wins it|won the (event|game|match))\b/i.test(t) && /\b(wins?|won|victory|victorious|champions?|takes)\b/i.test(t) && new RegExp(esc(loser), "i").test(t) && !new RegExp(esc(summary.winner), "i").test(t)) out.push(`names ${loser} as the winner`);
    return { hard: out, soft };
  }
  return { issues, okNum };
}
function newFactStats() { return { checked: 0, fixed: 0, notes: [] }; }
// A play is kept only if none of its lines contradict the data; otherwise the log-built line stands in for it.
function checkPlayLines(fc, lines, stats, label) {
  let bad = null;
  lines.forEach((l) => { stats.checked++; const r = fc.issues(l.text); if (r.hard.length && !bad) bad = r.hard[0]; if (r.soft.length && stats.notes.length < 30) stats.notes.push(`${label}: ${r.soft[0]}`); });
  if (bad && stats.notes.length < 30) stats.notes.push(`${label}: ${bad}`);
  if (bad) stats.fixed++;
  return !bad;
}
function filterExtras(fc, parsed, stats) {
  const keepLine = (l, k) => { stats.checked++; const r = fc.issues(l.text != null ? l.text : l); if (r.hard.length) { stats.fixed++; if (stats.notes.length < 30) stats.notes.push(`${k}: ${r.hard[0]}`); return false; } return true; };
  return { segment: parsed.segment.filter((l) => keepLine(l, "desk segment")), highlights: parsed.highlights.filter((l) => keepLine(l, "highlight")), lowlights: parsed.lowlights.filter((l) => keepLine(l, "lowlight")), casualties: parsed.casualties.filter((l) => keepLine(l, "casualty")) };
}


async function generateNarrative({ eventLabel, eventDesc, teamAName, teamBName, summary, orderedLog, onUpdate }) {
  const r = buildBroadcast({ eventLabel, eventDesc, teamAName, teamBName, summary, orderedLog });
  return {
    playByPlay: spokenLines(r.playByPlay),
    extendedSegment: spokenLines(r.ex.segment),
    highlights: spokenLines(r.ex.highlights),
    lowlights: spokenLines(r.ex.lowlights),
    casualties: spokenLines(r.ex.casualties),
    status: { pbp: "builtin", extras: "builtin", errors: [], model: "built-in", factCheck: { checked: 0, fixed: 0, notes: [] } },
    pending: false,
    progress: { done: 1, of: 1 },
  };
}

// ============================= EVENT DISPATCHER (pure, testable) =============================
const MUST = (re) => (l) => re.test((l.type || "") + " " + (l.outcome || ""));
const GENERIC_KEEP = MUST(/finale|catastrophe|boutWin|roundWin|stageWin|fastest|finish|placement|elimination|pass|cleanSheet|leader/);
const ARCH_LOG = {
  football_custom: { max: 40, keep: MUST(/TD|int\b|fumble$|safety|blockedKick|catastrophe|twoPt|fgMade|sack|turnoverOnDowns|tfl|bigPass|bigRun/) },
  basketball_custom: { max: 30, keep: MUST(/make3|block|steal|catastrophe/) },
  guts_custom: { max: 30, keep: () => true },
  trivia_custom: { max: 28, keep: (l) => l.type === "bonusRound" || l.difficult || l.streakHit || l.type === "catastrophe" },
  battleroyale_custom: { max: 34, keep: MUST(/BETRAYAL|friendly|squad victory|catastrophe|zone/) },
  bandbattle_custom: { max: 40, keep: () => true },
  hotdog_custom: { max: 28, keep: MUST(/record|victory|vomits|catastrophe|finishes/) },
  inferno_custom: { max: 30, keep: MUST(/escapes|left behind|trapped|catastrophe|rescued/) },
  dodgeball_custom: { max: 30, keep: MUST(/catches|last player|catastrophe/) },
  feud_custom: { max: 32, keep: MUST(/steals|#1|round won|catastrophe/) },
  sharktank_custom: { max: 30, keep: () => true },
  boxing_custom: { max: 30, keep: MUST(/KO|bout result|wins on the cards|catastrophe/) },
  roastbattle_custom: { max: 40, keep: () => true },
  cornhole_custom: { max: 30, keep: MUST(/gameWin|matchWin|catastrophe|finale|intro|bigRound|reroll|matchStart/) },
  hauntedhouse_custom: { max: 44, keep: MUST(/frightened|abandon|catastrophe|objective|finale|intro|safehouse|survive|roomCleared|artifact/) },
  allianceisland_custom: { max: 70, keep: () => true },
  battlebots_custom: { max: 46, keep: MUST(/ko|immob|component|catastrophe|judges|countout|ability|finale|intro/) },
  chessboxing_custom: { max: 44, keep: MUST(/mate|KO|knockdown|catastrophe|decision|finale|intro|check|matchStart/) },
  gladiators_custom: { max: 40, keep: MUST(/gladiator|eventWin|catastrophe|finish|fastest|fall|finale|intro|lineup/) },
  nakedafraid_custom: { max: 44, keep: MUST(/elimination|taskFail|catastrophe|hunt|finale|intro/) },
  armwrestle_custom: { max: 40, keep: MUST(/matchWin|catastrophe|round|finale|intro/) },
  prisonbreak_custom: { max: 44, keep: MUST(/escape|alarm|rescue|catastrophe|ability|finale|intro/) },
  ninjawarrior_custom: { max: 32, keep: MUST(/completes|fastest|falls|catastrophe|checkpoint/) },
  hollywoodsquares_custom: { max: 30, keep: MUST(/three-in-a-row|takes the round|catastrophe/) },
  trackfield_custom: { max: 30, keep: () => true },
  captureflag_custom: { max: 42, keep: MUST(/steal|score|winCap|drop|recover|matchEnd|seriesEnd|catastrophe|timeout/) },
};
function runEventSim({ event, teamA, teamB, pickedA, pickedB, rolesA, rolesB, kickerA, kickerB, duration }) {
  const arch = event.archetype;
  const rep = (s) => String(s).replace(/\{A\}/g, teamA.name).replace(/\{B\}/g, teamB.name);
  const nameSide = (l) => { const t = ensureText(l); return { ...t, side: t.side ? (t.side === "A" ? teamA.name : teamB.name) : undefined, text: spoken(rep(t.text)) }; };
  const full = { A: teamA.players, B: teamB.players };
  FIXED = event.fixed || null;
  let sim;
  if (arch === "football_custom") {
    const kA = full.A.find((p) => p.n === kickerA) || rolesA.QB, kB = full.B.find((p) => p.n === kickerB) || rolesB.QB;
    sim = simFootball(full.A, full.B, { A: { ...rolesA, Kicker: kA }, B: { ...rolesB, Kicker: kB } }, duration);
  }
  else if (arch === "basketball_custom") sim = simBasketball(pickedA, pickedB, duration);
  else if (arch === "guts_custom") sim = simGuts(pickedA, pickedB, duration);
  else if (arch === "trivia_custom") sim = simTrivia(pickedA, pickedB, duration);
  else if (arch === "battleroyale_custom") sim = simBattleRoyale(full.A, full.B, duration);
  else if (arch === "bandbattle_custom") sim = simBattleOfTheBands(pickedA, pickedB, event.weights, duration);
  else if (arch === "hotdog_custom") sim = simHotDogContest(pickedA, pickedB, event.weights, duration);
  else if (arch === "inferno_custom") sim = simToweringInferno(pickedA, pickedB, event.weights, duration);
  else if (arch === "dodgeball_custom") sim = simDodgeballBlitz(pickedA, pickedB, event.weights, duration);
  else if (arch === "feud_custom") sim = simFamilyFeud(pickedA, pickedB, event.weights, duration);
  else if (arch === "sharktank_custom") sim = simSharkTank(pickedA, pickedB, event.weights, duration);
  else if (arch === "boxing_custom") sim = simBoxing(pickedA, pickedB, event.weights, duration);
  else if (arch === "roastbattle_custom") sim = simRoastBattle(pickedA, pickedB, event.weights, duration);
  else if (arch === "ninjawarrior_custom") sim = simNinjaWarrior(pickedA, pickedB, event.weights);
  else if (arch === "cornhole_custom") sim = simCornHole(pickedA, pickedB, event.weights, duration);
  else if (arch === "hauntedhouse_custom") sim = simHauntedHouse(pickedA, pickedB, event.weights, duration);
  else if (arch === "allianceisland_custom") sim = simAllianceIsland(pickedA, pickedB, event.weights, duration);
  else if (arch === "battlebots_custom") sim = simBattleBots(pickedA, pickedB, event.weights, duration);
  else if (arch === "chessboxing_custom") sim = simChessBoxing(pickedA, pickedB, event.weights, duration);
  else if (arch === "gladiators_custom") sim = simAmericanGladiators(pickedA, pickedB, event.weights, duration);
  else if (arch === "nakedafraid_custom") sim = simNakedAfraid(pickedA, pickedB, event.weights, duration);
  else if (arch === "armwrestle_custom") sim = simArmWrestling(pickedA, pickedB, event.weights, duration);
  else if (arch === "prisonbreak_custom") sim = simPrisonBreak(pickedA, pickedB, event.weights, duration);
  else if (arch === "hollywoodsquares_custom") sim = simHollywoodSquares(pickedA, pickedB, event.weights, duration);
  else if (arch === "trackfield_custom") sim = simTrackAndField(pickedA, pickedB, event.weights, duration);
  else if (arch === "captureflag_custom") sim = simCaptureFlag(full.A, full.B, event.weights, duration);
  else {
    const config = { primary: event.primary, secondary: event.secondary, actions: event.actions, weights: event.weights };
    if (arch === "duel") sim = simDuel(pickedA, pickedB, config, duration);
    else if (arch === "race") sim = simRace(pickedA, pickedB, config, duration);
    else if (arch === "battlefield") sim = simBattlefieldGeneric(pickedA, pickedB, config, duration);
    else if (arch === "boxscore") sim = simBoxscoreGeneric(pickedA, pickedB, config, duration, event.name);
    else sim = simRoundEngine(pickedA, pickedB, config, duration);
  }
  FIXED = null;
  const cfg = ARCH_LOG[arch] || { max: 30, keep: GENERIC_KEEP };
  const named = (sim.log || []).map(nameSide);
  const orderedLog = capOrderedLog(named, cfg.max, cfg.keep);
  const namesA = new Set(full.A.map((p) => p.n));
  const rosters = { A: Object.keys(sim.box).filter((n) => namesA.has(n)), B: Object.keys(sim.box).filter((n) => !namesA.has(n)) };
  const winnerName = sim.winnerTeam === "A" ? teamA.name : teamB.name;
  const summary = {
    eventLabel: event.label, teamAName: teamA.name, teamBName: teamB.name, rosters,
    gameScore: sim.gameScore || null, fpScore: { A: sim.scoreA, B: sim.scoreB }, resultLine: sim.resultLine ? spoken(rep(sim.resultLine)) : "",
    winner: winnerName, columns: sim.columns || null, boxScore: sim.box, teamStats: sim.teamStats || null, scoringKey: sim.scoringKey || null,
    finishOrder: sim.finishOrder, champion: sim.champion, eventsDrawn: sim.eventsDrawn, cragWinner: sim.cragWinner,
  };
  return { sim, summary, orderedLog, eventDesc: event.description };
}
function offlineNarrative(args, err) {
  const log = (args.orderedLog || []).map(ensureText);
  const ex = templateExtras(args.summary);
  return {
    playByPlay: spokenLines(log.flatMap((l, i) => templatePbp(l, i, log.length))), extendedSegment: spokenLines(ex.segment), highlights: spokenLines(ex.highlights), lowlights: spokenLines(ex.lowlights), casualties: spokenLines(ex.casualties),
    status: { pbp: "template", extras: "template", errors: [String((err && err.message) || err || "commentary unavailable")] }, pending: false, progress: { done: 1, of: 1 },
  };
}

// ============================= RESULTS SCREEN =============================
function scriptText(event, teamA, teamB, narrative) {
  const L = (arr) => (arr || []).map((l) => `${l.speaker === "color" ? "COLOR" : "PBP"}: ${l.text}`).join("\n");
  let t = `${event.label}: ${teamA.name} vs ${teamB.name}\n\n=== LIVE PLAY-BY-PLAY ===\n${L(narrative.playByPlay)}\n`;
  if (narrative.extendedSegment && narrative.extendedSegment.length) t += `\n=== POST-EVENT DESK SEGMENT ===\n${L(narrative.extendedSegment)}\n`;
  const sect = (name, arr) => (arr && arr.length ? `\n${name}\n${arr.map((x) => "- " + x).join("\n")}\n` : "");
  return t + sect("HIGHLIGHTS", narrative.highlights) + sect("LOWLIGHTS", narrative.lowlights) + sect("CASUALTIES", narrative.casualties);
}
function FactNote({ narrative }) {
  const f = narrative && narrative.status && narrative.status.factCheck;
  if (!f || narrative.pending || !f.checked) return null;
  return <div className="text-xs mb-3 px-3 py-2 rounded" style={{ background: THEME.teal + "18", color: THEME.teal }} title={(f.notes || []).join("\n")}>Fact-checked against the box score: {f.checked} lines checked{f.fixed ? `, ${f.fixed} replaced with accurate lines from the play log` : ", all consistent"}.</div>;
}

function ScriptLines({ lines, group }) {
  const active = useReaderActive();
  useEffect(() => {
    if (group && active && active.indexOf(group + "-") === 0) { const el = document.getElementById("rl-" + active); if (el && el.scrollIntoView) { try { el.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) { /* ignore */ } } }
  }, [active]);
  return (
    <div className="space-y-2.5">
      {(lines || []).map((line, i) => {
        const on = group && active === `${group}-${i}`;
        return (
          <div key={i} id={group ? `rl-${group}-${i}` : undefined} className="text-sm leading-relaxed rounded" style={on ? { background: "rgba(217,168,43,0.16)", outline: `1px solid ${THEME.gold}66`, padding: "2px 6px", margin: "0 -6px" } : undefined}>
            <span className="font-bold mr-2" style={{ color: line.speaker === "color" ? THEME.purple : THEME.teal }}>{line.speaker === "color" ? "COLOR:" : "PBP:"}</span>
            <span>{line.text}</span>
          </div>
        );
      })}
    </div>
  );
}
function StepResults({ loading, result, narrative, event, teamA, teamB, onReset, eventKey, onRerun, onChangeRoster, onSwapTeam, teamAIdx, teamBIdx, onRetryCommentary, simError }) {
  const [copyMsg, setCopyMsg] = useState("");
  const [showRaw, setShowRaw] = useState(false);
  if (simError) {
    return (
      <div className="py-16 text-center">
        <div className="display text-2xl mb-2" style={{ color: THEME.red }}>SIMULATION ERROR</div>
        <div className="text-sm mb-4" style={{ color: THEME.textMuted }}>{simError}</div>
        <button onClick={onRerun} className="px-5 py-2.5 rounded font-bold text-sm uppercase" style={{ background: THEME.gold, color: "#1A1200" }}>Try Again</button>
      </div>
    );
  }
  if (loading || !result) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Zap size={40} color={THEME.gold} className="animate-pulse" />
        <div className="display text-2xl mt-4">SIMULATING {event.label.toUpperCase()}...</div>
        <div className="text-sm mt-1" style={{ color: THEME.textMuted }}>{teamA.name} vs {teamB.name}</div>
      </div>
    );
  }
  const { summary } = result;
  const errs = narrative && narrative.status && narrative.status.errors ? narrative.status.errors : [];
  const copyScript = async () => {
    const text = scriptText(event, teamA, teamB, narrative);
    try { await navigator.clipboard.writeText(text); setCopyMsg("Script copied!"); }
    catch (e) { setShowRaw(true); setCopyMsg("Select the text below and copy it."); }
    setTimeout(() => setCopyMsg(""), 4000);
  };
  return (
    <div>
      <div className="display text-3xl mb-1">{teamA.name} <span style={{ color: THEME.textFaint }}>vs</span> {teamB.name}</div>
      <div className="text-sm mb-5" style={{ color: THEME.textMuted }}>{event.label} — Final Recap</div>

      {narrative && narrative.pending && (
        <div className="rounded p-3 mb-4 flex items-center gap-3" style={{ background: `${THEME.gold}14`, border: `1px solid ${THEME.gold}55` }}>
          <Mic size={16} color={THEME.gold} className="animate-pulse" />
          <div className="text-sm">
            On air... the booth is writing the broadcast{narrative.progress ? ` (${narrative.progress.done} of ${narrative.progress.of} segments ready)` : ""}. The box score below is already final.
          </div>
        </div>
      )}
      {narrative && !narrative.pending && errs.length > 0 && (
        <div className="rounded p-3 mb-4" style={{ background: `${THEME.red}14`, border: `1px solid ${THEME.red}66` }}>
          <div className="text-sm font-semibold mb-1" style={{ color: THEME.red }}>
            {narrative.status.pbp === "template" && narrative.status.extras === "template" ? "The AI booth did not respond, so this script was written straight from the play log." : "Part of the AI booth failed, so those sections were written straight from the play log."}
          </div>
          <div className="text-xs mb-2 mono" style={{ color: THEME.textMuted }}>{errs.slice(0, 3).join("  |  ")}</div>
          <button onClick={onRetryCommentary} className="px-3 py-1.5 rounded text-xs font-bold uppercase" style={{ background: THEME.gold, color: "#1A1200" }}>Retry commentary</button>
        </div>
      )}

      <FactNote narrative={narrative} />
      {narrative && narrative.playByPlay && narrative.playByPlay.length > 0 && (
        <div className="rounded p-4 mb-5" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Mic size={16} color={THEME.gold} />
              <span className="text-xs uppercase tracking-wide" style={{ color: THEME.gold }}>Broadcast — Live Play-by-Play</span>
            </div>
            {!narrative.pending && (
              <button onClick={copyScript} className="px-3 py-1 rounded text-[11px] uppercase tracking-wide" style={{ color: THEME.text, border: `1px solid ${THEME.borderLight}` }}>Copy full script</button>
            )}
          </div>
          {copyMsg && <div className="text-xs mb-2" style={{ color: THEME.teal }}>{copyMsg}</div>}
          <ReadAloudBar disabled={!!narrative.pending} groups={[{ group: "pbp", lines: narrative.playByPlay }, { group: "seg", lines: narrative.extendedSegment || [] }]} />
          <ScriptLines lines={narrative.playByPlay} group="pbp" />
        </div>
      )}

      {showRaw && narrative && (
        <textarea readOnly value={scriptText(event, teamA, teamB, narrative)} onFocus={(e) => e.target.select()} className="w-full h-48 mb-5 p-3 rounded text-xs mono" style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, color: THEME.text }} />
      )}

      {narrative && narrative.extendedSegment && narrative.extendedSegment.length > 0 && (
        <div className="rounded p-4 mb-5" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
          <div className="flex items-center gap-2 mb-3">
            <Radio size={16} color={THEME.teal} />
            <span className="text-xs uppercase tracking-wide" style={{ color: THEME.teal }}>Post-Event Studio Segment</span>
          </div>
          <ScriptLines lines={narrative.extendedSegment} group="seg" />
        </div>
      )}

      {narrative && (narrative.highlights?.length > 0 || narrative.lowlights?.length > 0 || narrative.casualties?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <RecapBox title="Highlights" items={narrative.highlights} color={THEME.gold} />
          <RecapBox title="Lowlights" items={narrative.lowlights} color={THEME.red} />
          <RecapBox title="Casualties" items={narrative.casualties} color={THEME.purple} />
        </div>
      )}

      <BoxScorePanel eventKey={eventKey} summary={summary} teamA={teamA} teamB={teamB} />

      <div className="mt-5 p-4 rounded" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
        <div className="text-xs uppercase tracking-wide mb-3" style={{ color: THEME.gold }}>Run It Back</div>
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={onRerun} className="flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm uppercase tracking-wide" style={{ background: THEME.gold, color: "#1A1200" }}>
            <RotateCcw size={15} /> Re-run Same Matchup
          </button>
          <button onClick={onChangeRoster} className="flex items-center gap-2 px-5 py-2.5 rounded text-sm uppercase tracking-wide" style={{ background: THEME.panel2, color: THEME.text, border: `1px solid ${THEME.borderLight}` }}>
            <Users size={15} /> Change Players
          </button>
          <button onClick={onReset} className="flex items-center gap-2 px-5 py-2.5 rounded text-sm uppercase tracking-wide" style={{ background: THEME.panel2, color: THEME.text, border: `1px solid ${THEME.borderLight}` }}>
            <Shuffle size={15} /> New Matchup
          </button>
        </div>
        <div className="text-xs uppercase tracking-wide mb-2" style={{ color: THEME.textFaint }}>Swap a team and re-run instantly</div>
        <div className="grid grid-cols-2 gap-3">
          <QuickTeamSwap label={teamA.name} color={THEME.gold} currentIdx={teamAIdx} onPick={(i) => onSwapTeam("A", i)} otherIdx={teamBIdx} />
          <QuickTeamSwap label={teamB.name} color={THEME.teal} currentIdx={teamBIdx} onPick={(i) => onSwapTeam("B", i)} otherIdx={teamAIdx} />
        </div>
      </div>
    </div>
  );
}

// ============================= BOX SCORE (advanced stats, split by team) =============================
const NON_ADDITIVE = new Set(["rating", "accuracy", "successPct", "hitPct", "fgPct", "acc", "pace", "margin", "place", "roundOut", "fellAt", "bestStreak", "bestDodgeStreak", "bestInterval", "bestRating", "longPlay", "time", "avgBuzz", "setScore", "musicalTalent", "appearance", "wowFactor", "cragPct", "gained"]);
function fmtCell(v, col) {
  if (v === undefined || v === null || v === "") return "—";
  if (col.fmt === "mmss") return v ? mmss(v) : "—";
  if (typeof v === "number") return v === 0 ? "—" : String(Math.round(v * 10) / 10);
  return String(v);
}
function deriveColumns(box) {
  const first = Object.values(box)[0] || {};
  return Object.keys(first).filter((k) => !["fp", "catastrophe", "penalty", "floored", "offRounds", "defRounds"].includes(k) && !Array.isArray(first[k])).map((k) => ({ k, label: k, tip: "" }));
}
function TeamBoxTable({ title, color, names, box, cols, teamStats, fpTotal }) {
  const rows = names.map((n) => ({ name: n, ...box[n] })).sort((a, b) => b.fp - a.fp);
  const totals = {};
  cols.forEach((c) => {
    if (NON_ADDITIVE.has(c.k) || c.g === "none") { totals[c.k] = null; return; }
    const vals = rows.map((r) => r[c.k]);
    totals[c.k] = vals.every((v) => typeof v === "number" || v === undefined) ? vals.reduce((s, v) => s + (v || 0), 0) : null;
  });
  return (
    <div className="rounded overflow-hidden mb-5" style={{ border: `1px solid ${color}66` }}>
      <div className="flex items-center justify-between px-3 py-2" style={{ background: `${color}22` }}>
        <div className="display text-lg" style={{ color }}>{title}</div>
        <div className="mono text-sm font-bold" style={{ color }}>{fpTotal} FP</div>
      </div>
      {teamStats && teamStats.length > 0 && (
        <div className="flex flex-wrap gap-x-5 gap-y-1 px-3 py-2 text-xs" style={{ background: THEME.panel, borderBottom: `1px solid ${THEME.border}` }}>
          {teamStats.map((t, i) => (<span key={i}><span style={{ color: THEME.textFaint }}>{t.label}: </span><span className="mono font-semibold">{t.value}</span></span>))}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead style={{ background: THEME.panel2 }}>
            <tr>
              <th className="px-3 py-2 text-left text-[11px] uppercase sticky left-0" style={{ color: THEME.textMuted, background: THEME.panel2, borderBottom: `1px solid ${THEME.border}` }}>Player</th>
              {cols.map((c) => (<th key={c.k} title={c.tip} className="px-2 py-2 text-center text-[10px] uppercase mono whitespace-nowrap" style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>{c.label}</th>))}
              <th className="px-3 py-2 text-center text-[11px] uppercase" style={{ color: THEME.gold, borderBottom: `1px solid ${THEME.border}` }}>FP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} style={{ background: i % 2 === 0 ? THEME.panel : THEME.bg, borderLeft: r.catastrophe ? `3px solid ${THEME.red}` : "3px solid transparent" }}>
                <td className="px-3 py-1.5 whitespace-nowrap sticky left-0" style={{ background: i % 2 === 0 ? THEME.panel : THEME.bg }}>
                  {r.name}
                  {r.catastrophe && <span title={`${r.name} ${r.catastrophe} (${r.penalty} FP)`} className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: THEME.red, color: "#fff" }}>CATASTROPHE {r.penalty}</span>}
                </td>
                {cols.map((c) => (<td key={c.k} className="px-2 py-1.5 text-center mono text-xs whitespace-nowrap" style={{ color: r[c.k] ? THEME.text : THEME.textFaint }}>{fmtCell(r[c.k], c)}</td>))}
                <td className="px-3 py-1.5 text-center mono font-bold" style={{ color: r.fp >= 0 ? THEME.gold : THEME.red }} title={r.floored ? "Participation floor applied" : ""}>{r.fp}{r.floored ? "*" : ""}</td>
              </tr>
            ))}
            <tr style={{ background: THEME.panel2, borderTop: `1px solid ${THEME.border}` }}>
              <td className="px-3 py-2 text-xs uppercase font-semibold sticky left-0" style={{ background: THEME.panel2, color: THEME.textMuted }}>Team totals</td>
              {cols.map((c) => (<td key={c.k} className="px-2 py-2 text-center mono text-xs font-semibold">{totals[c.k] === null || totals[c.k] === undefined ? "" : fmtCell(c.fmt === "mmss" ? totals[c.k] : Math.round(totals[c.k] * 10) / 10, c)}</td>))}
              <td className="px-3 py-2 text-center mono font-bold" style={{ color }}>{fpTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
function BoxScorePanel({ eventKey, summary, teamA, teamB }) {
  const box = summary.boxScore || {};
  const cols0 = summary.columns && summary.columns.length ? summary.columns : deriveColumns(box);
  const groups = Array.from(new Set(cols0.map((c) => c.g).filter(Boolean)));
  const [group, setGroup] = useState("All");
  const cols = groups.length && group !== "All" ? cols0.filter((c) => c.g === group || c.g === "All") : cols0;
  const rosters = summary.rosters || { A: Object.keys(box).filter((n) => teamA.players.some((p) => p.n === n)), B: Object.keys(box).filter((n) => !teamA.players.some((p) => p.n === n)) };
  const fp = summary.fpScore || { A: 0, B: 0 };
  const gs = summary.gameScore;
  const cats = Object.entries(box).filter(([, b]) => b.catastrophe);
  const nameTeam = (n) => (rosters.A.includes(n) ? teamA.name : teamB.name);
  const topFp = Object.entries(box).sort((a, b) => b[1].fp - a[1].fp).slice(0, 3);
  const leaders = cols0.filter((c) => !NON_ADDITIVE.has(c.k) && c.k !== "participation" && c.fmt !== "mmss" || c.k === "top").map((c) => {
    const best = Object.entries(box).filter(([, b]) => typeof b[c.k] === "number" && b[c.k] > 0).sort((a, b) => b[1][c.k] - a[1][c.k])[0];
    return best ? { label: c.label, name: best[0], val: c.fmt === "mmss" ? mmss(best[1][c.k]) : Math.round(best[1][c.k] * 10) / 10 } : null;
  }).filter(Boolean).slice(0, 12);
  return (
    <div>
      <div className="text-center mb-4">
        {gs ? (
          <>
            <div className="display text-3xl" style={{ color: THEME.gold }}>{teamA.name} {gs.A} — {gs.B} {teamB.name}</div>
            <div className="text-sm mt-1 mono" style={{ color: THEME.textMuted }}>Fantasy points: {fp.A} — {fp.B}</div>
          </>
        ) : (
          <div className="display text-3xl" style={{ color: THEME.gold }}>{teamA.name} {fp.A} — {fp.B} {teamB.name}</div>
        )}
        {summary.resultLine && <div className="text-sm mt-1" style={{ color: THEME.textMuted }}>{summary.resultLine}</div>}
        {summary.winner && <div className="text-xs uppercase tracking-wide mt-1" style={{ color: THEME.teal }}>Winner: {summary.winner}</div>}
      </div>

      {topFp.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 justify-center">
          {topFp.map(([n, b], i) => (
            <span key={n} className="px-2.5 py-1 rounded text-xs" style={{ background: THEME.panel, border: `1px solid ${i === 0 ? THEME.gold : THEME.border}`, color: i === 0 ? THEME.gold : THEME.text }}>
              {i === 0 ? "MVP " : `#${i + 1} `}{n} <span className="mono">{b.fp}</span> <span style={{ color: THEME.textFaint }}>({nameTeam(n)})</span>
            </span>
          ))}
        </div>
      )}

      {groups.length > 0 && (
        <div className="flex gap-1.5 mb-3 flex-wrap">
          {["All", ...groups.filter((g) => g !== "All")].map((g) => (
            <button key={g} onClick={() => setGroup(g)} className="px-3 py-1 rounded text-xs uppercase tracking-wide" style={{ background: group === g ? THEME.gold : THEME.panel2, color: group === g ? "#1A1200" : THEME.text, border: `1px solid ${group === g ? THEME.gold : THEME.border}` }}>{g}</button>
          ))}
        </div>
      )}

      <TeamBoxTable title={teamA.name} color={THEME.gold} names={rosters.A} box={box} cols={cols} teamStats={summary.teamStats && summary.teamStats.A} fpTotal={fp.A} />
      <TeamBoxTable title={teamB.name} color={THEME.teal} names={rosters.B} box={box} cols={cols} teamStats={summary.teamStats && summary.teamStats.B} fpTotal={fp.B} />

      {cats.length > 0 && (
        <div className="rounded p-3 mb-4" style={{ background: `${THEME.red}14`, border: `1px solid ${THEME.red}66` }}>
          <div className="text-xs uppercase tracking-wide mb-1" style={{ color: THEME.red }}>Catastrophes (minus points, participation voided)</div>
          {cats.map(([n, b]) => (<div key={n} className="text-sm">{n} <span style={{ color: THEME.textFaint }}>({nameTeam(n)})</span> {b.catastrophe} <span className="mono" style={{ color: THEME.red }}>{b.penalty} FP</span></div>))}
        </div>
      )}

      {leaders.length > 0 && (
        <div className="rounded p-3 mb-4" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
          <div className="text-xs uppercase tracking-wide mb-2" style={{ color: THEME.gold }}>Stat leaders</div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs">
            {leaders.map((l, i) => (<span key={i}><span style={{ color: THEME.textFaint }}>{l.label}: </span>{l.name} <span className="mono font-semibold">{l.val}</span></span>))}
          </div>
        </div>
      )}

      {summary.scoringKey && (
        <details className="rounded p-3 mb-2" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
          <summary className="text-xs uppercase tracking-wide cursor-pointer" style={{ color: THEME.gold }}>Scoring system applied</summary>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-2 text-xs">
            {summary.scoringKey.map((s, i) => (<div key={i} className="flex justify-between gap-3"><span style={{ color: THEME.textMuted }}>{s.label}</span><span className="mono">{typeof s.pts === "number" && s.pts > 0 ? "+" : ""}{s.pts}</span></div>))}
          </div>
        </details>
      )}
      <div className="text-[11px]" style={{ color: THEME.textFaint }}>* participation floor applied. Everyone who competes banks participation points, 1.0 to 3.0 in most events and a fixed amount in a few. Only a catastrophe voids them and sends a score negative.</div>
    </div>
  );
}

// ============================= POSITION AUTO-ASSIGN (football) =============================
function autoAssignFootball(players) {
  const pool = [...players];
  const takeTop = (arr, n, scoreFn) => {
    const sorted = [...arr].sort((a, b) => scoreFn(b) - scoreFn(a));
    const picked = sorted.slice(0, n);
    picked.forEach((p) => { const idx = arr.indexOf(p); arr.splice(idx, 1); });
    return picked;
  };
  const QB = takeTop(pool, 1, (p) => p.it + p.at + p.rn)[0];
  const OL = takeTop(pool, 4, (p) => p.st + p.co);
  const RB = takeTop(pool, 2, (p) => p.st + p.dx + p.co);
  const WR = takeTop(pool, 3, (p) => p.dx + p.ch + p.rn);
  const TE = pool[0];
  return { QB, OL, RB, WR, TE };
}

// ============================= LEAGUE CORE (pure logic) =============================
const LEAGUE_KEY = "fffs_league_v1";
const POOL = TEAMS.flatMap((t) => t.players.map((p) => ({ ...p, team: t.name, conf: t.conference, div: t.division })));
const POOL_BY_NAME = Object.fromEntries(POOL.map((p) => [p.n, p]));
const POOL_SIZE = POOL.length;
const FRANCHISE_BY_NAME = Object.fromEntries(TEAMS.map((t) => [t.name, t]));
const FULL_ROSTER_ARCH = new Set(["football_custom", "battleroyale_custom", "captureflag_custom"]);
const MGR_COLORS = ["#D9A82B", "#39A896", "#C1554D", "#9D7FE0", "#4F9BE0", "#E08A4F", "#7BC96F", "#E06FA8", "#5CC8D6", "#C9C24F", "#A07F5C", "#8FA3C9", "#D96F6F", "#6FD9A0", "#B56FD9", "#D9B76F"];
const mgrColor = (i) => MGR_COLORS[i % MGR_COLORS.length];

function mulberry32(a) {
  return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function shuffled(arr, rng) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const nextPow2 = (n) => { let p = 1; while (p < n) p *= 2; return p; };
const roundsFor = (teams) => Math.max(1, Math.round(Math.log2(nextPow2(teams))));
const maxRounds = (nMgr) => Math.max(1, Math.min(15, Math.floor(POOL_SIZE / nMgr)));

function defaultSettings() {
  return { leagueName: "Fan Fiction Fantasy League", numManagers: 12, rounds: 11, regWeeks: 20, playoffTeams: 6, playoffWeeks: 3, tradeDeadlineWeek: 14, starters: 8, byeEnabled: true, byeStart: 6, byeEnd: 13, duration: "medium", seed: Math.floor(Math.random() * 1e9) };
}
function validateSettings(s) {
  const e = [], w = [];
  if (s.numManagers < 8 || s.numManagers > 32 || s.numManagers % 2) e.push("Managers must be an even number from 8 to 32.");
  if (s.rounds < 1 || s.rounds > maxRounds(s.numManagers)) e.push(`With ${s.numManagers} managers the pool of ${POOL_SIZE} competitors allows at most ${maxRounds(s.numManagers)} draft rounds.`);
  if (s.rounds < 11 && s.rounds <= maxRounds(s.numManagers)) w.push("Rosters under 11 are below the usual 11 to 15 competitors per team.");
  if (s.starters < 1 || s.starters > s.rounds) e.push("Starters must be between 1 and the roster size.");
  if (s.regWeeks < 1) e.push("Need at least 1 regular season week.");
  if (s.playoffTeams < 2 || s.playoffTeams > s.numManagers) e.push("Playoff teams must be between 2 and the number of managers.");
  if (s.playoffWeeks < roundsFor(s.playoffTeams)) e.push(`${s.playoffTeams} playoff teams need at least ${roundsFor(s.playoffTeams)} playoff weeks (one per round).`);
  if (s.tradeDeadlineWeek < 1 || s.tradeDeadlineWeek > s.regWeeks + s.playoffWeeks) e.push("Trade deadline must fall inside the season.");
  if (s.byeEnabled) {
    const n = s.byeEnd - s.byeStart + 1;
    if (s.byeStart < 1 || s.byeEnd > s.regWeeks || n < 1) e.push("Bye weeks must fall inside the regular season.");
    else if (![2, 4, 8, 16].includes(n)) e.push(`The bye window is ${n} week${n === 1 ? "" : "s"}. Use 2, 4, 8 or 16 weeks so every week has an even number of franchises playing (8 weeks gives 4 franchises on bye each week).`);
  }
  if (s.regWeeks + s.playoffWeeks > 23) w.push("The season runs longer than the standard 23 weeks.");
  return { errors: e, warnings: w };
}

function newLeague(settings, names) {
  const managers = Array.from({ length: settings.numManagers }, (_, i) => ({ id: i, name: (names && names[i]) || `Manager ${i + 1}`, color: mgrColor(i) }));
  const rng = mulberry32(settings.seed);
  return {
    version: 1, settings, managers, phase: "draft",
    draft: { order: shuffled(managers.map((m) => m.id), rng), picks: [] },
    rosters: Object.fromEntries(managers.map((m) => [m.id, []])),
    schedule: null, results: [], lineups: {}, playoff: null, transactions: [], champion: null, createdAt: Date.now(), scale: defaultScaleSetting(),
  };
}

// ---------- draft ----------
function pickOwner(league, pickIdx) {
  const n = league.managers.length, r = Math.floor(pickIdx / n), i = pickIdx % n;
  return league.draft.order[r % 2 === 0 ? i : n - 1 - i];
}
function draftedSet(league) { return new Set(league.draft.picks.map((p) => p.player)); }
function ownedMap(league) { const m = {}; Object.entries(league.rosters).forEach(([id, names]) => names.forEach((n) => (m[n] = +id))); return m; }
function draftTotal(league) { return league.managers.length * league.settings.rounds; }
function makePick(league, playerName) {
  const idx = league.draft.picks.length;
  if (idx >= draftTotal(league) || draftedSet(league).has(playerName) || !POOL_BY_NAME[playerName]) return league;
  const mgr = pickOwner(league, idx);
  const picks = [...league.draft.picks, { pick: idx, round: Math.floor(idx / league.managers.length) + 1, mgr, player: playerName }];
  const rosters = { ...league.rosters, [mgr]: [...league.rosters[mgr], playerName] };
  return { ...league, draft: { ...league.draft, picks }, rosters };
}
function undoPick(league) {
  const last = league.draft.picks[league.draft.picks.length - 1];
  if (!last) return league;
  return { ...league, draft: { ...league.draft, picks: league.draft.picks.slice(0, -1) }, rosters: { ...league.rosters, [last.mgr]: league.rosters[last.mgr].filter((n) => n !== last.player) } };
}
function bestAvailable(league, rng) {
  const taken = draftedSet(league);
  const avail = POOL.filter((p) => !taken.has(p.n)).sort((a, b) => b.tt - a.tt || a.n.localeCompare(b.n));
  if (!avail.length) return null;
  const r = (rng || Math.random)();
  const k = r < 0.55 ? 0 : r < 0.8 ? 1 : r < 0.92 ? 2 : 3;
  return avail[Math.min(k, avail.length - 1)].n;
}
function autoDraftAll(league, rng) { return autoDraftRest(league, rng); }

// ---------- schedule ----------
function circlePairs(ids, round) {
  const n = ids.length, arr = ids.slice(1), k = arr.length;
  const rot = round % k, rotated = arr.slice(k - rot).concat(arr.slice(0, k - rot));
  const row = [ids[0], ...rotated], pairs = [];
  for (let i = 0; i < n / 2; i++) pairs.push([row[i], row[n - 1 - i]]);
  return pairs;
}
function genWeekEvents(rng, used) {
  // Every week fields exactly 11 competitors per franchise: one 11-player event, or two events that sum to 11 (4+7 or 5+6).
  const pickFrom = (n) => {
    let pool = EVENTS_DB.filter((e) => e.competitors === n && !used.has(e.name));
    if (!pool.length) pool = EVENTS_DB.filter((e) => e.competitors === n);
    return pool[Math.floor(rng() * pool.length)];
  };
  const r = rng();
  const out = r < 0.25 ? [pickFrom(11)] : r < 0.625 ? [pickFrom(4), pickFrom(7)] : [pickFrom(5), pickFrom(6)];
  out.forEach((e) => used.add(e.name));
  return out.map((e) => e.name);
}
const EVENT_BY_NAME = Object.fromEntries(EVENTS_DB.map((e) => [e.name, e]));
const simEventObj = (ev) => ({ ...ev, key: ev.name, label: ev.name, roster: ev.competitors });
function assignFranchise(team, eventNames, rng) {
  let remaining = [...team.players];
  return eventNames.map((en) => {
    const ev = EVENT_BY_NAME[en];
    if (FULL_ROSTER_ARCH.has(ev.archetype) || ev.competitors >= remaining.length) { const all = remaining.map((p) => p.n); remaining = []; return all.length ? all : team.players.map((p) => p.n); }
    const ranked = remaining.map((p) => ({ p, s: computeBER(p, ev.weights) + rng() * 3 })).sort((a, b) => b.s - a.s).slice(0, ev.competitors).map((x) => x.p);
    remaining = remaining.filter((p) => !ranked.includes(p));
    return ranked.map((p) => p.n);
  });
}
function buildWeek(rngSeed, eventNames, byes) {
  const rng = mulberry32(rngSeed), skip = new Set(byes || []);
  const assign = {};
  TEAMS.forEach((t) => { if (!skip.has(t.name)) assign[t.name] = assignFranchise(t, eventNames, rng); });
  return { events: eventNames, assign };
}
function byeSchedule(settings, fOrder) {
  // each franchise rests exactly once inside the bye window, evenly spread across its weeks
  const out = {};
  if (!settings.byeEnabled) return out;
  const n = settings.byeEnd - settings.byeStart + 1, per = Math.floor(fOrder.length / n);
  if (n < 1 || fOrder.length % n !== 0 || per % 2 !== 0) return out;
  for (let k = 0; k < n; k++) out[settings.byeStart - 1 + k] = fOrder.slice(k * per, (k + 1) * per);
  return out;
}
function weekPairs(fOrder, byes, w) { const skip = new Set(byes || []); return circlePairs(fOrder.filter((n) => !skip.has(n)), w); }
function buildSchedule(league) {
  const s = league.settings, total = s.regWeeks + s.playoffWeeks, rng = mulberry32(s.seed + 7);
  const used = new Set(), weeks = [];
  const fOrder = shuffled(TEAMS.map((t) => t.name), rng);
  const byeMap = byeSchedule(s, shuffled(fOrder, mulberry32(s.seed + 11)));
  for (let w = 0; w < total; w++) {
    const byes = byeMap[w] || [];
    const wk = buildWeek(s.seed * 31 + w * 97 + 5, genWeekEvents(rng, used), byes);
    wk.byes = byes; wk.pairs = weekPairs(fOrder, byes, w);
    weeks.push(wk);
  }
  const mids = league.managers.map((m) => m.id), reg = [];
  for (let w = 0; w < s.regWeeks; w++) reg.push(circlePairs(shuffled(mids, mulberry32(s.seed + 3)), w));
  return { weeks, reg, fOrder };
}
function replaceWeekEvents(league, w, names) {
  const old = league.schedule.weeks[w], byes = old.byes || [];
  const wk = buildWeek(Math.floor(Math.random() * 1e9), names, byes);
  wk.byes = byes; wk.pairs = old.pairs;
  return { ...league, schedule: { ...league.schedule, weeks: league.schedule.weeks.map((x, i) => (i === w ? wk : x)) } };
}
function rerollWeek(league, w) {
  const rng = mulberry32(Math.floor(Math.random() * 1e9)), used = new Set();
  league.schedule.weeks.forEach((wk, i) => { if (i !== w) wk.events.forEach((e) => used.add(e)); });
  return replaceWeekEvents(league, w, genWeekEvents(rng, used));
}
function randomizeUnplayed(league) {
  let L = league; const rng = mulberry32(Math.floor(Math.random() * 1e9)), used = new Set();
  L.schedule.weeks.forEach((wk, i) => { if (i < L.results.length) wk.events.forEach((e) => used.add(e)); });
  for (let w = L.results.length; w < L.schedule.weeks.length; w++) L = replaceWeekEvents(L, w, genWeekEvents(rng, used));
  return L;
}
function setWeekEvents(league, w, names) {
  if (w < league.results.length) return { league, error: "That week has already been played." };
  if (!names.length || names.length > 2 || names.some((n) => !EVENT_BY_NAME[n])) return { league, error: "Pick one or two events." };
  if (new Set(names).size !== names.length) return { league, error: "Pick two different events." };
  const sum = names.reduce((t, n) => t + EVENT_BY_NAME[n].competitors, 0);
  if (sum !== 11) return { league, error: `Events must add up to 11 competitors (currently ${sum}). Use one 11-player event, or 4+7 or 5+6.` };
  return { league: replaceWeekEvents(league, w, names) };
}
const isBye = (league, w, name) => { const p = POOL_BY_NAME[name], wk = league.schedule.weeks[w]; return !!(p && wk && (wk.byes || []).includes(p.team)); };
function startSeason(league) {
  return { ...league, phase: "season", schedule: buildSchedule(league), results: [], lineups: {}, playoff: null, champion: null, waivers: league.waivers || defaultWaivers(league) };
}

// ---------- lineups ----------
function playsInWeek(league, w, name) {
  const wk = league.schedule.weeks[w]; const p = POOL_BY_NAME[name]; if (!wk || !p) return [];
  return (wk.assign[p.team] || []).map((list, i) => (list.includes(name) ? wk.events[i] : null)).filter(Boolean);
}
function autoLineup(league, mgr, w, exclude) {
  const roster = league.rosters[mgr] || [];
  const S = league.settings.starters;
  const avg = {}; roster.forEach((n) => { let t = 0, c = 0; league.results.forEach((r) => { if (r.playerFp[n] != null) { t += r.playerFp[n]; c++; } }); avg[n] = c ? t / c : POOL_BY_NAME[n].tt / 4; });
  return [...roster].sort((a, b) => playsInWeek(league, w, b).length - playsInWeek(league, w, a).length || avg[b] - avg[a]).slice(0, S);
}
function effectiveLineup(league, mgr, w) {
  const roster = league.rosters[mgr] || [], S = league.settings.starters;
  const custom = (league.lineups[`${mgr}|${w}`] || []).filter((n) => roster.includes(n));
  if (custom.length >= S) return custom.slice(0, S);
  const fill = autoLineup(league, mgr, w).filter((n) => !custom.includes(n));
  return [...custom, ...fill].slice(0, S);
}

// ---------- event point scaling + calibration ----------
// League points = standardized event points. Every event is centered on SCALE_TARGET league points per competitor, with the spread nudged toward SCALE_SPREAD,
// so a week full of 4-player judged events and a week of 11-player sports score on the same footing. Raw box scores are never changed.
const SCALE_TARGET = 14, SCALE_SPREAD = 7;
const SCALE_DATA = {"short":{"Alliance Island":[56.821,0.172,0.246],"Battle Bots":[32.734,0.507,0.428],"Charades":[9.346,1.592,1.498],"Chess Boxing":[18.565,0.651,0.754],"Escape Room Gauntlet":[12.593,0.769,1.112],"Fashion Runway Showdown":[10.088,0.835,1.388],"Giant Jenga":[9.242,0.757,1.515],"Go-Kart Racing":[15.84,0.7,0.884],"Hot Dog Eating Contest":[24.081,0.651,0.581],"Ice Road Truckers":[44.106,0.635,0.317],"Iron Chef":[11.545,0.741,1.213],"Karaoke Showdown":[9.032,1.247,1.55],"Lego Masters Challenge":[9.335,0.869,1.5],"Master Builder Challenge":[10.684,0.863,1.31],"Mecha Arena":[26.786,0.322,0.523],"Mock Trial":[12.308,0.852,1.137],"Monopoly":[12.185,0.845,1.149],"Mousetrap":[12.182,0.869,1.149],"Naked & Afraid":[42.786,0.37,0.327],"Operation":[22.494,0.431,0.622],"Race to the Moon":[19.646,0.906,0.713],"Relay Race":[37.256,0.68,0.376],"Shark Tank":[34.107,0.776,0.41],"Talent Show Takedown":[10.038,0.853,1.395],"The Amazing Race":[18.809,0.422,0.744],"Train Heist":[12.153,0.962,1.152],"Wizard's Duel":[19.067,0.438,0.734],"Basketball":[26.467,0.785,0.529],"Battle of the Bands":[10.174,1.022,1.376],"Dance Off":[5.501,1.427,2.545],"Demolition Derby":[14.341,0.743,0.976],"Family Feud":[12.981,0.647,1.079],"Fear Factor":[9.082,0.771,1.541],"Global Guts":[14.94,0.998,0.937],"Haunted House Gauntlet":[33.199,0.541,0.422],"Heist Night":[15.333,0.78,0.913],"Ninja Warrior":[57.19,0.49,0.245],"Roast Battle":[17.798,0.873,0.787],"Saw":[15.94,0.668,0.878],"American Gladiators":[14.061,0.537,0.996],"Archery Tournament":[17.884,0.525,0.783],"Beach Volleyball":[13.755,1.146,1.018],"Beer Pong":[16.678,0.587,0.839],"Boxing/MMA Rumble":[42.242,0.472,0.331],"Carnival Games":[11.624,0.717,1.204],"Corn Hole":[119.844,0.169,0.117],"Dodgeball Blitz":[9.285,0.754,1.508],"Log Rolling Tournament":[14.382,0.557,0.973],"Olympic Figure Skating":[7.67,1.532,1.825],"Paintball Tournament":[25.968,0.527,0.539],"Space Battle":[28.28,0.386,0.495],"Spelling Bee":[9.448,1.443,1.482],"Sumo Tournament":[23.759,0.364,0.589],"The Floor Is Lava":[29.055,0.964,0.482],"Towering Inferno":[33.255,0.653,0.421],"Treasure Hunt":[13.363,0.798,1.048],"Trivia Titans":[5.723,1.742,2.446],"Underwater Search & Rescue":[11.276,1.055,1.242],"Wipeout":[30.694,0.912,0.456],"Arm Wrestling Tournament":[15.661,0.447,0.894],"Hollywood Squares":[5.787,1.21,2.419],"Kaiju Defense":[10.824,0.777,1.293],"Laser Tag":[20.124,0.624,0.696],"The Great Migration":[49.642,0.564,0.282],"Baseball":[5.507,1.7,2.542],"Fencing Tournament":[16.562,0.577,0.845],"Hide & Seek":[9.74,1.215,1.437],"Royal Rumble":[22.243,0.367,0.629],"Street Fighter Tournament":[15.997,0.545,0.875],"Track & Field Events":[10.893,0.929,1.285],"Weakest Link":[9.987,1.031,1.402],"Battle Royale":[20.202,0.353,0.693],"Capture the Flag":[26.818,0.261,0.522],"Cricket":[6.721,1.411,2.083],"Football":[12.872,0.873,1.088],"Gladiator Arena":[22.102,0.377,0.633],"Grand Prix Showdown":[41.027,0.443,0.341],"High Stakes Poker Night":[19.349,0.596,0.724],"Legends of the Hidden Temple":[12.713,0.852,1.101],"Prison Break":[33.904,0.423,0.413],"Siege Defense":[7.828,1.517,1.788],"Soccer":[7.451,1.329,1.879],"Squid Games":[30.336,0.322,0.461],"The Apprentice":[6.833,1.399,2.049],"Tug of War":[17.654,0.483,0.793],"Zombie Outbreak Containment":[7.884,1.083,1.776]},"medium":{"Alliance Island":[56.846,0.173,0.246],"Battle Bots":[61.915,0.24,0.226],"Charades":[13.666,1.284,1.024],"Chess Boxing":[24.051,0.558,0.582],"Escape Room Gauntlet":[18.07,0.667,0.775],"Fashion Runway Showdown":[13.76,0.783,1.017],"Giant Jenga":[14.741,0.475,0.95],"Go-Kart Racing":[19.141,0.682,0.731],"Hot Dog Eating Contest":[38.092,0.598,0.368],"Ice Road Truckers":[53.254,0.526,0.263],"Iron Chef":[17.115,0.647,0.818],"Karaoke Showdown":[12.574,1.048,1.113],"Lego Masters Challenge":[12.317,0.814,1.137],"Master Builder Challenge":[15.147,0.772,0.924],"Mecha Arena":[29.3,0.286,0.478],"Mock Trial":[17.253,0.784,0.811],"Monopoly":[17.597,0.71,0.796],"Mousetrap":[17.661,0.733,0.793],"Naked & Afraid":[52.965,0.34,0.264],"Operation":[42.82,0.234,0.327],"Race to the Moon":[24.535,0.877,0.571],"Relay Race":[46.256,0.605,0.303],"Shark Tank":[34.01,0.786,0.412],"Talent Show Takedown":[13.926,0.771,1.005],"The Amazing Race":[28.043,0.339,0.499],"Train Heist":[17.463,0.831,0.802],"Wizard's Duel":[35.914,0.243,0.39],"Basketball":[36.898,0.635,0.379],"Battle of the Bands":[10.192,1.033,1.374],"Dance Off":[6.736,1.409,2.078],"Demolition Derby":[15.61,0.674,0.897],"Family Feud":[18.362,0.443,0.762],"Fear Factor":[11.801,0.593,1.186],"Global Guts":[14.94,0.994,0.937],"Haunted House Gauntlet":[33.383,0.535,0.419],"Heist Night":[22.915,0.639,0.611],"Ninja Warrior":[57.277,0.489,0.244],"Roast Battle":[17.965,0.877,0.779],"Saw":[23.522,0.574,0.595],"American Gladiators":[14.815,0.472,0.945],"Archery Tournament":[33.722,0.29,0.415],"Beach Volleyball":[19.44,0.907,0.72],"Beer Pong":[31.22,0.32,0.448],"Boxing/MMA Rumble":[54.111,0.388,0.259],"Carnival Games":[17.091,0.581,0.819],"Corn Hole":[122.689,0.169,0.114],"Dodgeball Blitz":[9.15,0.765,1.53],"Log Rolling Tournament":[24.895,0.347,0.562],"Olympic Figure Skating":[10.773,1.32,1.3],"Paintball Tournament":[28.445,0.445,0.492],"Space Battle":[30.696,0.342,0.456],"Spelling Bee":[13.964,1.181,1.003],"Sumo Tournament":[43.594,0.207,0.321],"The Floor Is Lava":[32.936,0.85,0.425],"Towering Inferno":[40.761,0.517,0.343],"Treasure Hunt":[19.13,0.693,0.732],"Trivia Titans":[7.645,1.412,1.831],"Underwater Search & Rescue":[16.875,0.85,0.83],"Wipeout":[35.162,0.796,0.398],"Arm Wrestling Tournament":[15.65,0.447,0.895],"Hollywood Squares":[5.778,1.211,2.423],"Kaiju Defense":[14.945,0.713,0.937],"Laser Tag":[22.606,0.523,0.619],"The Great Migration":[58.952,0.475,0.237],"Baseball":[7.074,1.379,1.979],"Fencing Tournament":[31.101,0.31,0.45],"Hide & Seek":[14.642,1.009,0.956],"Royal Rumble":[23.232,0.327,0.603],"Street Fighter Tournament":[29.875,0.293,0.469],"Track & Field Events":[10.889,0.934,1.286],"Weakest Link":[14.406,0.929,0.972],"Battle Royale":[20.375,0.35,0.687],"Capture the Flag":[26.969,0.26,0.519],"Cricket":[9.354,1.093,1.497],"Football":[19.487,0.595,0.718],"Gladiator Arena":[23.238,0.34,0.602],"Grand Prix Showdown":[53.711,0.368,0.261],"High Stakes Poker Night":[29.986,0.463,0.467],"Legends of the Hidden Temple":[18.952,0.69,0.739],"Prison Break":[34.054,0.368,0.411],"Siege Defense":[11.371,1.221,1.231],"Soccer":[10.41,1.059,1.345],"Squid Games":[32.604,0.278,0.429],"The Apprentice":[9.561,1.16,1.464],"Tug of War":[32.495,0.259,0.431],"Zombie Outbreak Containment":[10.542,0.84,1.328]},"long":{"Alliance Island":[56.82,0.172,0.246],"Battle Bots":[63.834,0.21,0.219],"Charades":[17.574,1.078,0.797],"Chess Boxing":[29.385,0.47,0.476],"Escape Room Gauntlet":[23.348,0.612,0.6],"Fashion Runway Showdown":[17.55,0.709,0.798],"Giant Jenga":[17.807,0.393,0.786],"Go-Kart Racing":[25.235,0.672,0.555],"Hot Dog Eating Contest":[52.189,0.537,0.268],"Ice Road Truckers":[71.551,0.391,0.196],"Iron Chef":[21.605,0.589,0.648],"Karaoke Showdown":[16.174,0.928,0.866],"Lego Masters Challenge":[15.583,0.745,0.898],"Master Builder Challenge":[19.182,0.725,0.73],"Mecha Arena":[29.753,0.276,0.471],"Mock Trial":[22.212,0.717,0.63],"Monopoly":[23.018,0.637,0.608],"Mousetrap":[22.955,0.648,0.61],"Naked & Afraid":[62.922,0.3,0.222],"Operation":[63.58,0.158,0.22],"Race to the Moon":[34.458,0.813,0.406],"Relay Race":[63.782,0.439,0.219],"Shark Tank":[34.078,0.775,0.411],"Talent Show Takedown":[17.439,0.729,0.803],"The Amazing Race":[37.131,0.283,0.377],"Train Heist":[23.163,0.74,0.604],"Wizard's Duel":[52.727,0.168,0.266],"Basketball":[47.253,0.55,0.296],"Battle of the Bands":[10.06,1.046,1.392],"Dance Off":[8.012,1.373,1.747],"Demolition Derby":[15.828,0.658,0.885],"Family Feud":[23.716,0.359,0.59],"Fear Factor":[14.336,0.488,0.977],"Global Guts":[14.943,1.001,0.937],"Haunted House Gauntlet":[33.28,0.554,0.421],"Heist Night":[30.691,0.567,0.456],"Ninja Warrior":[57.311,0.489,0.244],"Roast Battle":[17.637,0.879,0.794],"Saw":[31.073,0.512,0.451],"American Gladiators":[15.372,0.455,0.911],"Archery Tournament":[49.419,0.197,0.283],"Beach Volleyball":[26.776,0.765,0.523],"Beer Pong":[45.677,0.219,0.307],"Boxing/MMA Rumble":[65.701,0.336,0.213],"Carnival Games":[22.143,0.521,0.632],"Corn Hole":[120.505,0.169,0.116],"Dodgeball Blitz":[9.192,0.762,1.523],"Log Rolling Tournament":[35.332,0.25,0.396],"Olympic Figure Skating":[13.886,1.149,1.008],"Paintball Tournament":[29.159,0.428,0.48],"Space Battle":[30.921,0.335,0.453],"Spelling Bee":[18.376,0.982,0.762],"Sumo Tournament":[63.309,0.147,0.221],"The Floor Is Lava":[40.895,0.685,0.342],"Towering Inferno":[48.216,0.431,0.29],"Treasure Hunt":[25.639,0.615,0.546],"Trivia Titans":[10.178,1.181,1.376],"Underwater Search & Rescue":[22.331,0.71,0.627],"Wipeout":[43.819,0.639,0.319],"Arm Wrestling Tournament":[15.64,0.448,0.895],"Hollywood Squares":[5.788,1.209,2.419],"Kaiju Defense":[18.953,0.671,0.739],"Laser Tag":[22.923,0.506,0.611],"The Great Migration":[77.177,0.363,0.181],"Baseball":[9.02,1.106,1.552],"Fencing Tournament":[45.396,0.211,0.308],"Hide & Seek":[19.466,0.853,0.719],"Royal Rumble":[23.508,0.321,0.596],"Street Fighter Tournament":[43.785,0.2,0.32],"Track & Field Events":[10.907,0.931,1.284],"Weakest Link":[18.629,0.853,0.752],"Battle Royale":[20.588,0.345,0.68],"Capture the Flag":[27.266,0.257,0.513],"Cricket":[12.45,0.899,1.124],"Football":[27.021,0.441,0.518],"Gladiator Arena":[23.68,0.334,0.591],"Grand Prix Showdown":[78.032,0.271,0.179],"High Stakes Poker Night":[40.635,0.388,0.345],"Legends of the Hidden Temple":[25.444,0.591,0.55],"Prison Break":[35.517,0.355,0.394],"Siege Defense":[14.96,1.027,0.936],"Soccer":[14.079,0.85,0.994],"Squid Games":[32.892,0.274,0.426],"The Apprentice":[12.128,1.003,1.154],"Tug of War":[47.394,0.176,0.295],"Zombie Outbreak Containment":[13.469,0.691,1.039]}};
const r3 = (x) => Math.round(x * 1000) / 1000;
function deriveScale(mean, sd, T, S) {
  T = T || SCALE_TARGET; S = S || SCALE_SPREAD;
  const f = T / Math.max(mean, 1);
  const k = Math.min(2 * f, Math.max(0.5 * f, S / Math.max(sd, 0.5)));
  return { m: r3(mean), k: r3(k), f: r3(f) };
}
function applyScale(raw, sc, T) {
  if (!sc) return raw;
  T = T || SCALE_TARGET;
  let lp = T + sc.k * (raw - sc.m);
  if (raw < 0) lp = Math.min(lp, raw * Math.min(1, Math.max(sc.f, 0.4)));
  else lp = Math.max(lp, 1 + Math.min(raw, 3) * 0.5);   // the participation floor survives scaling: nobody who showed up lands at zero
  lp = Math.max(lp, -T);
  const cap = 4 * T; if (lp > cap) lp = cap + (lp - cap) * 0.4;   // soft ceiling on freak scores
  return lp;
}
function scaleLookupFor(league, duration) {
  const s = league && league.scale; if (!s || !s.on) return null;
  const tbl = s.table || SCALE_DATA[duration] || SCALE_DATA.medium || {};
  return (name) => { const v = tbl[name]; return v ? (Array.isArray(v) ? { m: v[0], k: v[1], f: v[2] } : v) : null; };
}
function defaultScaleSetting() { return { on: true, table: null, src: "built-in", target: SCALE_TARGET }; }

// ---- calibration: run one event many times with the same assignment logic the league uses ----
function calibrateEvent(ev, n, duration, rng) {
  const vals = [], sides = []; let errs = 0;
  for (let i = 0; i < n; i++) {
    let a = Math.floor(rng() * TEAMS.length), b; do { b = Math.floor(rng() * TEAMS.length); } while (b === a);
    const tA = TEAMS[a], tB = TEAMS[b];
    const pick = (t) => assignFranchise(t, [ev.name], rng)[0].map((nm) => t.players.find((p) => p.n === nm)).filter(Boolean);
    const rA = autoAssignFootball(tA.players), rB = autoAssignFootball(tB.players);
    try {
      const run = runEventSim({ event: simEventObj(ev), teamA: tA, teamB: tB, pickedA: pick(tA), pickedB: pick(tB), rolesA: rA, rolesB: rB, kickerA: rA.QB.n, kickerB: rB.QB.n, duration });
      const namesA = new Set(tA.players.map((p) => p.n)); let sa = 0, sb = 0;
      Object.entries(run.summary.boxScore).forEach(([nm, bx]) => { vals.push(bx.fp); if (namesA.has(nm)) sa += bx.fp; else sb += bx.fp; });
      sides.push(sa, sb);
    } catch (e) { errs++; }
  }
  return { name: ev.name, comp: ev.competitors, arch: ev.archetype, n: vals.length, errs, vals, sides };
}
function summarizeVals(vals) {
  const v = [...vals].sort((x, y) => x - y), L = v.length || 1;
  const q = (p) => v[Math.min(v.length - 1, Math.floor(p * L))] || 0;
  const mean = v.reduce((s, x) => s + x, 0) / L;
  const sd = Math.sqrt(v.reduce((s, x) => s + (x - mean) * (x - mean), 0) / L);
  return { mean, sd, p5: q(0.05), p50: q(0.5), p95: q(0.95), p99: q(0.99), max: v[v.length - 1] || 0, min: v[0] || 0, neg: v.filter((x) => x < 0).length / L };
}
function finishCalibration(raws, T, S) {
  const rows = raws.map((r) => {
    const st = summarizeVals(r.vals), sc = deriveScale(st.mean, st.sd, T, S);
    const sv = summarizeVals(r.vals.map((x) => applyScale(x, sc, T)));
    const sideMean = r.sides.length ? r.sides.reduce((s, x) => s + x, 0) / r.sides.length : 0;
    return { name: r.name, comp: r.comp, arch: r.arch, n: r.n, errs: r.errs, raw: st, lg: sv, scale: sc, sideMean };
  });
  const means = rows.map((r) => r.raw.mean).sort((a, b) => a - b), med = means[Math.floor(means.length / 2)] || 1;
  rows.forEach((r) => {
    const f = [], cv = r.raw.sd / Math.max(r.raw.mean, 0.1);
    if (r.raw.mean > med * 1.6) f.push("runs hot"); if (r.raw.mean < med * 0.55) f.push("runs cold");
    if (cv > 0.9) f.push("swingy"); if (cv < 0.15) f.push("flat");
    if (r.raw.p99 > r.raw.mean * 4.5) f.push("heavy tail");
    if (r.errs) f.push("errors");
    r.flags = f; r.cv = cv;
  });
  return { rows, median: med, target: T || SCALE_TARGET, spread: S || SCALE_SPREAD };
}
function runCalibrationSync(n, duration, seed) {
  const rng = mulberry32(seed || 777);
  return finishCalibration(EVENTS_DB.map((ev) => calibrateEvent(ev, n, duration, rng)));
}
async function runCalibrationAsync(n, duration, onProgress) {
  const rng = mulberry32(Math.floor(Math.random() * 1e9)), raws = [];
  for (let i = 0; i < EVENTS_DB.length; i++) {
    raws.push(calibrateEvent(EVENTS_DB[i], n, duration, rng));
    if (onProgress) onProgress((i + 1) / EVENTS_DB.length);
    await new Promise((r) => setTimeout(r, 0));
  }
  return finishCalibration(raws);
}
function scaleTableFromReport(rep) { const t = {}; rep.rows.forEach((r) => { t[r.name] = [r.scale.m, r.scale.k, r.scale.f]; }); return t; }
function calibrationCsv(rep, duration) {
  const head = ["Event", "Competitors", "Engine", "Runs", "Raw avg", "Raw SD", "Raw p5", "Raw median", "Raw p95", "Raw p99", "Raw max", "Raw min", "Catastrophe %", "Scale slope k", "League avg", "League SD", "League p95", "League max", "Flags"];
  const f1 = (x) => (Math.round(x * 10) / 10).toFixed(1);
  const lines = [head.join(",")];
  rep.rows.forEach((r) => lines.push([`"${r.name}"`, r.comp, r.arch, r.n, f1(r.raw.mean), f1(r.raw.sd), f1(r.raw.p5), f1(r.raw.p50), f1(r.raw.p95), f1(r.raw.p99), f1(r.raw.max), f1(r.raw.min), f1(r.raw.neg * 100), r.scale.k, f1(r.lg.mean), f1(r.lg.sd), f1(r.lg.p95), f1(r.lg.max), `"${r.flags.join("; ")}"`].join(",")));
  return lines.join("\n");
}


// ---------- player projections + smart auto-pick ----------
const PROJ_DATA = {"Thanos":[15.08,7.65,7,25.7],"Loki":[13.56,6.56,6.6,22.5],"Magneto":[15.43,8.1,7,27.3],"Dr. Doom":[13.82,7,6.7,23],"Captain Planet":[15.77,7.31,8,25.9],"Donatello":[12.89,6.29,6.1,21.4],"Kung Fu Panda (Po)":[16.59,7.96,8,27.8],"He-Man":[17.78,8.58,8.2,31.5],"Ultron":[14.45,7.14,6.7,24.2],"Venom":[11.39,5.88,5.1,20],"Apocalypse":[13.36,6.62,5.9,22.4],"Juggernaut":[10.51,5.59,4.8,18.9],"Dr. Octopus":[11.08,5.69,5.1,19.1],"Winter Soldier":[11.43,5.66,5.4,19.4],"Scarlet Witch":[14.89,7.5,6.8,25.3],"Popeye":[12.39,6.08,5.6,20.7],"Inspector Gadget":[9.07,5,4,15.7],"Mighty Mouse":[13.52,6.58,5.9,22.5],"Kim Possible":[15.46,7.68,7.3,25.7],"Leonardo":[13.45,6.62,6.1,22.5],"Michelangelo":[12.18,5.69,5.7,20.4],"Raphael":[11.06,5.5,5.2,18.9],"Yoda":[19.55,9.03,9.2,32.7],"Obi-Wan Kenobi":[15.15,7.06,7.5,24.5],"Mace Windu":[14.59,6.97,7.4,23.7],"Darth Vader":[13.82,6.48,6.6,22.4],"The Rock":[17.49,7.94,8.9,28.2],"Triple H":[15.86,6.66,8,24.6],"Ric Flair":[17.55,7.96,8.3,29],"Stone Cold Steve Austin":[15.96,6.95,8.1,24.9],"Luke Skywalker":[14.76,7.02,7.3,23.6],"Han Solo":[15.11,7.26,7.3,24.8],"Chewbacca":[9.87,4.91,4.9,16.4],"Boba Fett":[12.35,5.73,5.7,20.7],"Jar Jar Binks":[8.98,5.08,4,15.4],"General Grievous":[12.49,6.6,5.3,21.8],"Kylo Ren":[13.06,6.31,6.1,21.7],"The Undertaker":[16.62,7.32,8.6,26.2],"John Cena":[17.09,7.86,8.4,27.3],"Hulk Hogan":[15.61,6.49,7.7,23.6],"Andre the Giant":[9.7,5.03,4.6,16.3],"The Ultimate Warrior":[14.11,6.14,6.5,22.5],"Macho Man Randy Savage":[15.82,6.57,8.1,24.4],"Kane":[13.1,6.1,5.7,21.8],"Ness":[14.36,7.21,6.8,23.9],"Samus":[15.13,6.99,7.4,24.8],"Sephiroth":[15.48,7.62,7.5,25.5],"Captain Falcon":[15.53,7.28,7.1,25.3],"Ra":[23.11,8.59,11.9,34.2],"Osiris":[16.42,6.9,8.6,25.2],"Anubis":[16.52,6.84,9.1,25.1],"Horus":[17.48,6.77,10.3,25.9],"Kirby":[12.42,5.61,5.9,20.4],"Banjo & Kazooie":[13.46,5.98,6.6,21.9],"Cloud Strife":[14.62,6.75,7,23.4],"Minecraft Steve":[14.01,6.64,6.4,22.5],"Pac-Man":[8.68,5.1,3.5,15.1],"Sora":[15.99,7.67,7.7,26.4],"Solid Snake":[16.1,7.66,7.5,26.3],"Scorpion King":[10.9,5.64,5,18.7],"Imhotep":[14.87,7.14,6.7,24.5],"The Sphinx":[15.53,6.28,8,23.5],"Cleopatra":[13.26,6.91,5.8,22.5],"King Tut":[9.19,5.19,4,15.8],"Pharaoh Ramses II":[14.25,6.02,6.8,22.3],"Set":[17.08,7.14,9.1,26.3],"Data":[18.53,8.61,9.1,31.2],"Seven of Nine":[15.03,6.74,7.6,23.9],"Odo":[15.79,7.27,8,25.8],"Captain James T. Kirk":[15.97,7.63,7.5,26],"Bugs Bunny":[16.92,8.68,7.8,30.1],"Marvin the Martian":[12.21,6.44,5.7,21.2],"Speedy Gonzales":[11.9,6.17,5.7,20.2],"Daffy Duck":[12.19,6.5,5.9,20.7],"Captain Jean-Luc Picard":[15.29,8.16,6.3,27.8],"Spock":[14.45,6.82,6.6,23.3],"Benjamin Sisko":[15.17,6.79,7.6,24.3],"Worf":[13.56,6.42,6.3,22.2],"Leonard \"Bones\" McCoy":[12.76,5.99,5.8,20.8],"Montgomery \"Scotty\" Scott":[12.31,5.93,5.5,20.5],"Kang":[14.49,6.55,6.8,23.2],"Porky Pig":[11.25,5.87,5.4,19],"Foghorn Leghorn":[11.07,5.83,5.3,18.8],"Wile E. Coyote":[10.32,5.73,4.8,18.1],"Roadrunner":[12.13,6.38,5.5,21.3],"Yosemite Sam":[11.54,5.82,5.4,19.9],"Tasmanian Devil":[10.03,6.16,4,18.3],"Elmer Fudd":[9.61,5.25,4.5,16.3],"Centaur":[14.53,7.59,6.9,25.6],"Oni":[10.94,6,5.1,18.8],"Mothman":[14.5,7.66,6.9,25],"Medusa":[10.58,5.85,5.1,18.3],"Johnny Appleseed":[15.21,8.11,6.8,27.2],"Buffalo Bill Cody":[13.73,6.45,6.9,22.5],"Davy Crockett":[13.32,6.35,6.6,21.5],"Annie Oakley":[15.14,7.36,7,25.2],"Golem":[8.71,5.38,2.5,16.1],"Kraken":[8.71,5.09,2.5,15.2],"Minotaur":[7.6,4.85,2.5,13.8],"Cyclopes":[7.7,4.97,2.5,14],"Yeti":[11.04,5.94,5.1,19.4],"Sasquatch":[7.86,4.72,2.5,14],"Loch Ness Monster":[12,6.69,5.6,21.2],"Paul Bunyan":[12.24,6.35,5.5,20.7],"Pecos Bill":[15.81,7.75,7.5,26.3],"John Henry":[13.03,6.17,6.2,21.7],"Calamity Jane":[13,6.1,6.1,21.6],"Wyatt Earp":[13.46,6.84,6.4,22.5],"Uncle Sam":[13.84,6.84,6.8,22.5],"Rip Van Winkle":[11.79,5.76,5.4,19.5],"Laura Croft":[18.09,8.48,8.6,30.6],"Link":[13.48,6.73,6.6,22.4],"Star Fox":[13.91,6.44,7.1,22.4],"Master Chief":[14.82,6.99,7.6,24],"Cthulhu":[19.67,9.22,9.4,32.8],"Dalek":[13.09,6.36,6.1,21.8],"Invader Zim":[13.05,6.88,5.9,22.5],"Ben 10":[13.27,6.38,7,21.7],"Princess Zelda":[14.65,7.59,6.8,25.2],"Donkey Kong":[10.56,5.52,4.8,17.9],"Diddy Kong":[11.26,5.81,5.3,19.7],"Little Mac":[12.33,6.24,5.6,21.5],"Earthworm Jim":[10.76,5.33,5,18.3],"Kratos":[13.48,6.63,6.4,22.5],"Crash Bandicoot":[10.58,5.36,5.1,17.7],"Xenomorph":[12.69,6.63,5.6,21.9],"Predator":[11.87,6.02,5.6,20.1],"E.T.":[11.3,6.52,4.9,20],"Alf":[12.53,6.35,5.7,21.2],"Na'vi":[12.46,6.1,5.9,21.3],"Zoidberg":[11.71,5.73,5.4,20],"Blue Meanie":[11.77,5.72,5.4,20.1],"Beast (Hank McCoy)":[12.96,6.98,6,22.4],"Professor Xavier":[12.14,6.89,5.5,21.2],"Jean Grey":[13.2,7.14,6,23.2],"Storm":[13.72,6.98,6.8,22.8],"Martian Manhunter":[16.23,7.04,8.3,25.6],"Superman":[21.22,8.89,10.1,33.5],"Batman":[16.21,7.27,7.8,25.5],"Green Lantern":[14.95,6.41,7.4,23.4],"Wolverine":[14.3,7.13,6.7,23.1],"Cyclops":[12.63,6.03,6.1,21.1],"Colossus":[10.75,5.63,4.9,18.3],"Rogue":[14.29,7.35,7,24.1],"Nightcrawler":[13.39,6.79,6.4,22.5],"Gambit":[11.97,5.71,5.7,19.9],"Deadpool":[13.89,6.78,6.6,23.1],"Wonder woman":[15.91,7.13,8,25],"Aquaman":[14.65,6.13,7.1,22.5],"Apache Chief":[11.76,5.63,5.4,20],"Plastic Man":[13.6,5.83,6.3,21.8],"Cyborg":[14,6.03,6.5,22.1],"The Flash":[15.57,6.75,7.8,24.5],"Shazaam":[15.54,6.8,7.7,24.2],"Dr. Strange":[16.77,7.72,8,27.4],"Ironman":[16.69,7.49,8.4,27.3],"Vision":[15.16,6.91,7.6,24.3],"Captain America":[17.57,7.89,8.9,28.2],"Bane":[12.27,6.4,5.5,21.3],"Catwoman":[16.06,8.18,7.4,27.7],"Harley Quinn":[15.53,7.63,7.4,26.2],"Mr. Freeze":[12.09,6.41,5.5,20.7],"Thor":[16.47,7.34,8.2,26],"Black Widow":[16.49,7.11,8.5,25.6],"Hawkeye":[10.89,5.48,5.2,17.9],"The Incredible Hulk":[13.01,6.58,5.4,22.3],"Spiderman":[16.42,7.15,8.3,25.8],"Black Panther":[14.98,6.11,7.8,23.4],"Ant-man":[10.99,5.29,5.1,18.2],"Joker":[13.14,6.78,5.7,22.7],"Penguin":[12.81,6.3,5.9,21.4],"Riddler":[11.57,6.33,5.1,20.6],"Poison Ivy":[13.55,6.57,6.8,22.4],"Scarecrow":[11.69,6.19,5.4,20.6],"Two-Face":[13.66,6.45,6.4,22.4],"Clayface":[14.03,7.29,6.2,23.9],"Rosalina":[16.84,8.75,7.8,29.8],"Princess Peach":[12.94,6.98,6.3,22.1],"Bowser Jr.":[11.28,6,5.6,19.3],"Daisy":[11.84,6.13,5.9,20.2],"Neo":[17.87,8.92,8,31.6],"Falcor":[15.18,7.52,7.6,25.5],"Indiana Jones":[14.44,7.1,7,23.4],"Leonidas":[13.23,6.72,6.1,22.5],"Mario Mario":[11.49,6.02,5.7,19.6],"Luigi Mario":[10.76,5.36,5.3,18],"Captain Toad":[8.56,4.92,3.6,14.5],"Yoshi":[10.7,5.67,5.1,18.1],"Bowser":[11.14,5.88,5.2,19.1],"Wario":[7.09,4.56,2.5,12.5],"Waluigi":[6.82,4.79,2.5,12.4],"Rocky Balboa":[10.67,5.28,5.2,18],"Rambo":[11.14,5.58,5.2,18.5],"Zorro":[11.9,6.03,5.5,20.1],"Forrest Gump":[8.9,5.02,3.9,15.3],"Beatrix Kiddo":[10.89,5.52,5.3,18.2],"John Wick":[13.81,6.64,6.8,22.5],"William Wallace":[12.24,6.32,5.7,20.6],"Frieza":[19.29,8.9,8.8,31.7],"Cell":[16,7.23,7.3,25.6],"Gohan":[16.27,7.16,7.7,25.4],"Trunks":[15.69,6.58,7.6,24],"Optimus Prime":[19.46,9.26,8.6,32.8],"Mega Man":[12.83,6.3,6,21.7],"Megatron":[13.46,6.74,6.6,22.5],"Baymax":[13.81,7.09,6.4,22.9],"Goku":[15.91,6.93,7.3,24.8],"Vegeta":[15.18,6.47,6.9,23.6],"Piccolo":[15.59,6.57,7.6,24.2],"Krillin":[15.92,6.73,7.8,24.5],"Majin Buu":[15.29,6.82,6.7,24],"Android 18":[15.92,6.86,7.8,24.5],"Tien Shinhan":[14.95,6.33,7.1,23.2],"T-800":[12.91,6.34,5.8,21.8],"Iron Giant":[13.12,6.7,5.8,22.2],"T-1000":[12.49,6.21,5.6,21.5],"Robo-Cop":[12.55,6.16,5.6,21.3],"Megazord":[12.02,6.03,5.3,20.3],"Bender Bending Rodriguez":[10.59,5.44,4.8,18.4],"Voltron":[12.84,6.26,5.7,21.7],"Apollo":[18.37,7.23,10.5,28.1],"Zeus":[22.07,8.73,11.7,34],"Athena":[17.8,7.16,10,26.9],"Hades":[16.47,6.89,8.3,25.2],"Ronald McDonald":[13.44,6.42,6.5,22.2],"Mr. Clean":[14.07,6.78,6.9,22.6],"Lucky the Leprechaun":[14.74,7.13,7,24.1],"Mr. Peanut":[15.94,8.29,7.1,27.9],"Hercules":[13.54,6.18,5.8,22],"Achilles":[15.13,6.11,7.6,23.1],"Odysseus":[17.58,7.25,8.8,27],"Perseus":[15.94,6.53,8,24.6],"Atlas":[12.76,6.04,5.5,21.2],"Ares":[12.9,6.19,5.5,21.7],"Poseidon":[16.72,7.04,8.5,25.7],"Burger King":[12.53,5.9,5.9,20.9],"Energizer Bunny":[15.47,7.91,6.9,25.5],"Jolly Green Giant":[13.27,6.59,6.2,22],"Kool-Aid Man":[11.21,5.7,5.1,19.4],"Tony the Tiger":[14.42,6.71,7.1,23.7],"GEICO Gecko":[14.16,6.9,6.3,23.5],"Chester Cheetah":[12.05,5.9,5.7,20.4],"Brainiac":[13.69,7.15,6.1,23.3],"Lex Luthor":[12.57,6.62,5.7,21.5],"Sinestro":[13.31,6.79,6.4,22.4],"General Zod":[14.8,7.76,6.8,25.2],"Van Helsing":[15.56,6.96,8,25.1],"James Bond":[17.29,7.94,8.8,28.7],"Gilgamesh":[16.1,7.1,8.3,25.6],"King Arthur":[16.07,7.3,8.2,25.7],"Darkseid":[14.31,7.31,6.8,24.7],"Deathstroke":[15.34,7.32,7.5,24.7],"Killer Croc":[7.87,5.05,2.5,14.8],"Doomsday":[9.65,5.73,3.7,18.1],"Lobo":[10.56,5.89,4.8,19.3],"Gorilla Grodd":[12.95,6.43,5.9,21.6],"Professor Zoom":[14.45,7.37,6.7,23.8],"Merlin":[15,7.34,6.9,24.5],"Mr Hyde":[8.91,5.86,2.5,17.5],"Dorian Gray":[16.31,7.6,7.9,26.7],"Robin Hood":[15.38,6.75,7.8,24.3],"Don Quixote":[8.46,5.22,3.3,15],"Sherlock Holmes":[11.52,6.17,5.1,20.1],"Beowulf":[16.6,8.01,7.7,27.2],"Count Dracula":[13.4,7.01,6.7,22.5],"Pennywise":[15.88,8.13,7.6,27.8],"Freddy Krueger":[11.31,5.74,5.7,18.9],"Beetlejuice":[10.08,5.21,4.6,17.1],"Mewtwo":[16.98,8.61,7.7,30.2],"Greninja":[12.53,6.29,6.4,21],"Lucario":[13.08,6.35,7,21.6],"Mr. Mime":[8.83,5.01,4,15.1],"Frankenstein's Monster":[6.78,4.46,2.5,12.3],"The Headless Horseman":[11.16,6.33,5.1,19.8],"Stay Puft Marshmallow Man":[7.08,4.75,2.5,12.9],"Jason Voorhees":[8.72,5.05,2.8,15.2],"Godzilla":[10.96,6.38,4.7,19.7],"King Kong":[10.83,5.82,5,18.9],"Wolf-man":[9.33,5.08,3.8,15.9],"Pikachu":[11.5,5.68,5.5,19.2],"Charizard":[11.61,6.14,5.4,19.5],"Squirtle":[10,5.18,4.8,16.9],"Jigglypuff":[11.72,6.54,5.6,20.5],"Hawlucha":[12.4,6.69,5.7,21.5],"Eevee":[12.05,6.23,5.7,20.5],"Machamp":[7.32,4.74,2.5,13.1],"Doctor Fate":[17,8.28,8.1,29.1],"Nightwing":[13.02,6.4,6.4,21.2],"Black Adam":[15.66,7.72,7.7,25.7],"Supergirl":[16.01,8,7.7,26.6],"The Genie":[17.81,8.35,8.6,30.2],"Stitch":[14.53,6.64,7.4,23.1],"Mulan":[13.99,6.64,7,22.8],"Tarzan":[17.7,8.4,8.4,31],"Green Arrow":[10.9,5.52,5.2,18.2],"The Atom":[12.4,6.58,5.5,21.5],"Constantine":[14.24,7.76,6.1,25.3],"Deadshot":[10.01,5.33,4.8,16.5],"Hawkman":[11.86,5.99,5.5,20],"Swamp Thing":[11.39,5.88,5.3,19.7],"King Shark":[8.97,5.03,3.8,15.1],"Mickey Mouse":[11.31,5.78,5,19.4],"Elsa":[13.07,7.15,5.7,22.9],"Maui":[13.05,6.27,6.2,21.8],"Simba":[10.58,5.3,4.9,17.8],"Wreck-it Ralph":[10.69,5.62,4.9,18],"Peter Pan":[13.33,6.3,6.6,21.8],"Beast":[11.16,5.58,5.2,18.9],"Lord Voldemort":[13.8,7.26,6.6,23.6],"Albus Dumbledore":[15.98,9.06,7.1,29.9],"Severus Snape":[12.28,5.99,5.7,20.4],"Hermione Granger":[12.55,6.74,5.8,21.5],"Rumpelstiltskin":[16.52,8.64,7.2,29.1],"Thumbelina":[14.34,7.11,6.5,24.1],"Mother Goose":[14.89,8.03,6.4,27.1],"Pied Piper":[13.5,6.54,6.5,22.3],"Harry Potter":[12.79,6.33,6.1,21.4],"Rubeus Hagrid":[9.12,5.1,4.2,15.3],"Sirius Black":[12.71,6.43,6.3,21.2],"Ron Weasley":[11.26,5.44,5.4,18.8],"Dobby":[11.08,5.57,5.3,19],"Mad-Eye Moody":[12.53,6.11,6.3,20.6],"Newt Scamander":[12.97,6.69,5.9,21.9],"Big Bad Wolf":[13.95,7.04,6.6,22.6],"Shrek":[12.67,6.42,5.7,21.1],"Puss in Boots":[14.37,6.76,7.2,23.2],"Jack Frost":[14.28,7.1,7.3,23.5],"Pinocchio":[13.04,5.98,6.2,21.6],"The Ugly Duckling":[11.81,5.82,5.6,19.7],"The Gingerbread Man":[12.72,6.17,5.9,22],"Silver Surfer":[18.21,9.13,8.3,31.8],"Star-Lord":[12.91,6.6,6.1,21.8],"Rocket Raccoon":[11.53,5.81,5.5,19.6],"Mr. Fantastic":[11.76,6.25,5.5,19.8],"Gandalf the White":[17.16,8.14,8.5,29.3],"Tom Bombadil":[19.03,8.64,9.2,31.7],"Sauron":[14.05,6.41,6.5,22.5],"Elrond":[15.5,7.02,7.9,24.6],"Ghost Rider":[12.46,6.54,5.6,21],"Daredevil":[12.26,6.21,5.7,20.5],"Punisher":[10.53,5.46,5.1,17.7],"Groot":[9.49,5.36,4.3,16.2],"Human Torch":[12.44,6.1,6,21],"Thing (Ben Grimm)":[10.89,5.85,5.1,18.9],"Invisible Woman":[12.74,6.74,6.2,21.8],"Aragorn":[14.15,6.46,6.5,22.5],"Gimli":[13.64,6.55,6.1,22.4],"Legolas":[14.14,6.5,6.8,22.8],"Durin's Bane":[9.06,5.54,2.7,16.5],"Smaug":[15.7,7.31,7.5,25.7],"Treebeard (Ent)":[12.68,6.07,5.7,20.9],"Boromir":[13.13,6.2,6,21.9]};
function projOf(name) { const v = PROJ_DATA[name]; return v ? { mean: v[0], sd: v[1], lo: v[2], hi: v[3] } : null; }
// Monte Carlo: sim many full weeks with the league's own engine and event scaling, average what each competitor earns per week played.
function projectionRun(seasons, seed, scale, duration, onProg) {
  const dur = duration || "medium", acc = {};
  for (let si = 0; si < seasons; si++) {
    const settings = { ...defaultSettings(), regWeeks: 20, playoffWeeks: 3, byeEnabled: false, duration: dur, seed: seed + si * 101 };
    const L = { ...newLeague(settings, null), scale: scale || defaultScaleSetting() };
    L.schedule = buildSchedule(L);
    const lookup = scaleLookupFor(L, dur);
    for (let w = 0; w < 20; w++) {
      const wk = L.schedule.weeks[w], fp = {};
      wk.pairs.forEach((_, pi) => wk.events.forEach((_e, ei) => { const { lp } = simFranchiseGame(w, wk, pi, ei, dur, lookup); Object.entries(lp).forEach(([n, v]) => { fp[n] = (fp[n] || 0) + v; }); }));
      Object.entries(fp).forEach(([n, v]) => { (acc[n] = acc[n] || []).push(v); });
    }
    if (onProg) onProg((si + 1) / seasons);
  }
  const out = {};
  Object.entries(acc).forEach(([n, a]) => {
    const s = [...a].sort((x, y) => x - y), m = a.reduce((x, y) => x + y, 0) / a.length;
    const sd = Math.sqrt(a.reduce((x, y) => x + (y - m) * (y - m), 0) / a.length);
    out[n] = [Math.round(m * 100) / 100, Math.round(sd * 100) / 100, Math.round(s[Math.floor(s.length * 0.1)] * 10) / 10, Math.round(s[Math.floor(s.length * 0.9)] * 10) / 10];
  });
  return out;
}
// Specialties: the events whose weighting rewards this competitor most compared with the rest of the pool.
let SPEC_STATS = null;
function specStats() {
  if (SPEC_STATS) return SPEC_STATS;
  SPEC_STATS = EVENTS_DB.map((ev) => { const v = POOL.map((p) => computeBER(p, ev.weights)); const m = v.reduce((a, b) => a + b, 0) / v.length; const sd = Math.sqrt(v.reduce((a, b) => a + (b - m) * (b - m), 0) / v.length) || 1; return { name: ev.name, m, sd }; });
  return SPEC_STATS;
}
const SPEC_CACHE = {};
function specialties(p, n) {
  if (!SPEC_CACHE[p.n]) SPEC_CACHE[p.n] = specStats().map((s) => ({ name: s.name, z: (computeBER(p, EVENT_BY_NAME[s.name].weights) - s.m) / s.sd })).sort((a, b) => b.z - a.z);
  return SPEC_CACHE[p.n].slice(0, n || 3);
}
function weaknesses(p, n) { specialties(p); return SPEC_CACHE[p.n].slice(-(n || 3)).reverse(); }
// Draft value: projected league points per week, minus a penalty for stacking one franchise (shared bye week, shared fate).
const FRANCHISE_CAP = (rounds) => Math.max(3, Math.ceil(rounds / 4));
function draftValue(league, mgr, p) {
  const pr = projOf(p.n); const base = pr ? pr.mean : 8 + p.tt / 20;
  const same = (league.rosters[mgr] || []).filter((n) => POOL_BY_NAME[n].team === p.team).length;
  const pen = same <= 1 ? 0 : same === 2 ? 0.6 : 1.6;
  return base - pen;
}
function autoPickFor(league, mgr, rng) {
  const taken = draftedSet(league), cap = FRANCHISE_CAP(league.settings.rounds);
  const q = ((league.draft.queues || {})[mgr] || []).find((n) => !taken.has(n) && POOL_BY_NAME[n]);
  if (q) return q;
  const mine = league.rosters[mgr] || [];
  let cand = POOL.filter((p) => !taken.has(p.n));
  const capped = cand.filter((p) => mine.filter((n) => POOL_BY_NAME[n].team === p.team).length < cap);
  if (capped.length) cand = capped;
  if (!cand.length) return null;
  const scored = cand.map((p) => ({ n: p.n, v: draftValue(league, mgr, p) })).sort((a, b) => b.v - a.v || a.n.localeCompare(b.n));
  const best = scored[0].v, pool = scored.filter((x) => x.v >= best - 1.0).slice(0, 4);
  const r = (rng || Math.random)();
  const k = pool.length === 1 ? 0 : r < 0.6 ? 0 : r < 0.85 ? 1 : r < 0.95 ? 2 : 3;
  return pool[Math.min(k, pool.length - 1)].n;
}
function autoPickNext(league, rng) {
  const made = league.draft.picks.length; if (made >= draftTotal(league)) return league;
  const nm = autoPickFor(league, pickOwner(league, made), rng);
  return nm ? makePick(league, nm) : league;
}
function autoDraftRest(league, rng, onlyMgrs) {
  let L = league; const total = draftTotal(L);
  for (let guard = 0; L.draft.picks.length < total && guard < total + 5; guard++) {
    const next = pickOwner(L, L.draft.picks.length);
    if (onlyMgrs && !onlyMgrs.includes(next)) break;
    const nL = autoPickNext(L, rng); if (nL === L) break; L = nL;
  }
  return L;
}
function queueOf(league, mgr) { return ((league.draft.queues || {})[mgr] || []); }
function setQueue(league, mgr, list) { return { ...league, draft: { ...league.draft, queues: { ...(league.draft.queues || {}), [mgr]: list } } }; }


// ============================= draft grades, previews, recaps, waivers =============================
const pMean = (n) => { const p = projOf(n); return p ? p.mean : 8 + POOL_BY_NAME[n].tt / 20; };
const pSd = (n) => { const p = projOf(n); return p ? p.sd : 6; };
const normCdf = (z) => { const t = 1 / (1 + 0.2316419 * Math.abs(z)); const d = 0.3989423 * Math.exp((-z * z) / 2); const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
const letterFor = (z) => (z >= 1.4 ? "A+" : z >= 1.0 ? "A" : z >= 0.65 ? "A-" : z >= 0.35 ? "B+" : z >= 0.1 ? "B" : z >= -0.15 ? "B-" : z >= -0.4 ? "C+" : z >= -0.65 ? "C" : z >= -0.9 ? "C-" : z >= -1.2 ? "D" : "F");

// ---------- draft grades ----------
let BOARD_CACHE = null;
function projBoard() { if (!BOARD_CACHE) BOARD_CACHE = POOL.map((p) => pMean(p.n)).sort((a, b) => b - a); return BOARD_CACHE; }
function draftGrades(league) {
  const S = league.settings.starters, board = projBoard(), N = league.managers.length;
  const rows = league.managers.map((m) => {
    const picks = league.draft.picks.filter((p) => p.mgr === m.id);
    const roster = picks.map((p) => p.player);
    const vals = picks.map((p) => ({ ...p, proj: pMean(p.player), slot: board[Math.min(p.pick, board.length - 1)], val: pMean(p.player) - board[Math.min(p.pick, board.length - 1)] }));
    const sorted = [...roster].sort((a, b) => pMean(b) - pMean(a));
    const strength = sorted.slice(0, S).reduce((t, n) => t + pMean(n), 0);
    const depth = sorted.slice(S).reduce((t, n) => t + pMean(n), 0);
    const byTeam = {}; roster.forEach((n) => { const t = POOL_BY_NAME[n].team; byTeam[t] = (byTeam[t] || 0) + 1; });
    const stackTeam = Object.entries(byTeam).sort((a, b) => b[1] - a[1])[0] || ["", 0];
    const value = vals.reduce((t, v) => t + v.val, 0);
    const best = [...vals].sort((a, b) => b.val - a.val)[0], worst = [...vals].sort((a, b) => a.val - b.val)[0];
    return { id: m.id, name: m.name, roster, strength, depth, value, stack: stackTeam[1], stackTeam: stackTeam[0], best, worst, picks: vals };
  });
  const z = (key) => { const a = rows.map((r) => r[key]), mu = a.reduce((x, y) => x + y, 0) / a.length, sd = Math.sqrt(a.reduce((x, y) => x + (y - mu) ** 2, 0) / a.length) || 1; return (r) => (r[key] - mu) / sd; };
  const zs = z("strength"), zd = z("depth"), zv = z("value");
  rows.forEach((r) => { r.score = zs(r) * 1.0 + zd(r) * 0.3 + zv(r) * 0.5 - 0.35 * Math.max(0, r.stack - 2); r.grade = null; });
  const sc = rows.map((r) => r.score), mu = sc.reduce((a, b) => a + b, 0) / sc.length, sd = Math.sqrt(sc.reduce((a, b) => a + (b - mu) ** 2, 0) / sc.length) || 1;
  rows.forEach((r) => { r.z = (r.score - mu) / sd; r.grade = letterFor(r.z + 0.45); });
  rows.sort((a, b) => b.score - a.score);
  rows.forEach((r, i) => { r.rank = i + 1; });
  return rows;
}

// ---------- matchup expectations ----------
const FIT_PER_Z = 3.0;
const FIT_CACHE = {};
function eventFit(name, evName) {
  const k = name + "|" + evName; if (FIT_CACHE[k] != null) return FIT_CACHE[k];
  const p = POOL_BY_NAME[name], ss = specStats(), me = ss.find((s) => s.name === evName); if (!p || !me) return 0;
  const z = (s) => (computeBER(p, EVENT_BY_NAME[s.name].weights) - s.m) / s.sd;
  if (FIT_CACHE["m|" + name] == null) FIT_CACHE["m|" + name] = ss.reduce((t, s) => t + z(s), 0) / ss.length;
  return (FIT_CACHE[k] = z(me) - FIT_CACHE["m|" + name]);
}
function playerExpect(league, name, w) {
  const evs = playsInWeek(league, w, name), bye = isBye(league, w, name);
  if (bye || !evs.length) return { n: name, exp: 0, sd: 0, ev: "", fit: 0, bye };
  const fit = evs.reduce((t, e) => t + eventFit(name, e), 0) / evs.length;
  return { n: name, exp: Math.max(0, pMean(name) + FIT_PER_Z * fit), sd: pSd(name) * 0.9, ev: evs.join(" + "), fit, bye: false };
}
function lineupExpect(league, names, w) {
  const rows = names.map((n) => playerExpect(league, n, w));
  return { rows, total: rows.reduce((t, r) => t + r.exp, 0), sd: Math.sqrt(rows.reduce((t, r) => t + r.sd * r.sd, 0)) };
}
function matchupPreview(league, m, w, useActual) {
  const lu = (id) => (useActual && league.results[w] && league.results[w].lineups[id]) || effectiveLineup(league, id, w);
  const A = lineupExpect(league, lu(m.a), w), B = lineupExpect(league, lu(m.b), w);
  const diff = A.total - B.total, sd = Math.sqrt(A.sd * A.sd + B.sd * B.sd) || 1;
  const pa = normCdf(diff / sd);
  const pick = (X, f) => [...X.rows].sort(f)[0];
  const edges = [];
  const sA = pick(A, (x, y) => y.exp - x.exp), sB = pick(B, (x, y) => y.exp - x.exp);
  if (sA) edges.push(`${league.managers[m.a].name}'s top projection is ${sA.n} (${sA.exp.toFixed(1)}${sA.ev ? ", " + sA.ev : ""}).`);
  if (sB) edges.push(`${league.managers[m.b].name}'s top projection is ${sB.n} (${sB.exp.toFixed(1)}${sB.ev ? ", " + sB.ev : ""}).`);
  const hot = [...A.rows.map((r) => ({ ...r, side: m.a })), ...B.rows.map((r) => ({ ...r, side: m.b }))].filter((r) => !r.bye).sort((x, y) => y.fit - x.fit)[0];
  if (hot && hot.fit > 0.5) edges.push(`Best event fit: ${hot.n} in ${hot.ev} (+${(hot.fit * FIT_PER_Z).toFixed(1)} over their usual).`);
  const byes = [...A.rows.map((r) => ({ ...r, side: m.a })), ...B.rows.map((r) => ({ ...r, side: m.b }))].filter((r) => r.bye);
  byes.forEach((r) => edges.push(`${r.n} (${league.managers[r.side].name}) is on a bye and scores nothing.`));
  return { A, B, pa, diff, edges, favorite: pa >= 0.5 ? m.a : m.b, favP: Math.max(pa, 1 - pa) };
}

// ---------- weekly recap ----------
function weekRecap(league, w) {
  const res = league.results[w]; if (!res) return null;
  const nm = (id) => league.managers[id].name, owned = ownedMap(league);
  const lp = (n) => (res.playerFp[n] != null ? res.playerFp[n] : 0);
  const out = { week: w + 1, headline: "", sections: [] };
  const ms = res.matchups.filter((m) => m.aPts != null);
  const prevL = { ...league, results: league.results.slice(0, w) }, nextL = { ...league, results: league.results.slice(0, w + 1) };
  const withP = ms.map((m) => { const pv = matchupPreview(league, m, w, true); const winner = m.aPts >= m.bPts ? m.a : m.b; return { m, pv, winner, loser: winner === m.a ? m.b : m.a, margin: Math.abs(m.aPts - m.bPts), winP: winner === m.a ? pv.pa : 1 - pv.pa }; });
  const games = [];
  const blow = [...withP].sort((a, b) => b.margin - a.margin)[0], close = [...withP].sort((a, b) => a.margin - b.margin)[0], upset = [...withP].sort((a, b) => a.winP - b.winP)[0];
  const sc = (g) => { const mm = g.m; return `${fp1(Math.max(mm.aPts, mm.bPts))}–${fp1(Math.min(mm.aPts, mm.bPts))}`; };
  if (blow) games.push(`Blowout: ${nm(blow.winner)} beat ${nm(blow.loser)} ${sc(blow)}, a ${fp1(blow.margin)}-point margin.`);
  if (close && close !== blow) games.push(`Nail-biter: ${nm(close.winner)} edged ${nm(close.loser)} ${sc(close)} (${fp1(close.margin)} points).`);
  if (upset && upset.winP < 0.4) games.push(`Upset: ${nm(upset.winner)} beat ${nm(upset.loser)} ${sc(upset)} after a ${Math.round(upset.winP * 100)}% pre-game win chance.`);
  if (games.length) out.sections.push({ h: "Matchups", items: games });
  // players
  const all = Object.entries(res.playerFp).map(([n, v]) => ({ n, v })).sort((a, b) => b.v - a.v);
  const own = (n) => (owned[n] != null ? ` (${nm(owned[n])})` : " (free agent)");
  const pl = [];
  if (all[0]) pl.push(`Player of the week: ${all[0].n}${own(all[0].n)} with ${fp1(all[0].v)} league points.`);
  const starters = []; Object.entries(res.lineups).forEach(([id, names]) => names.forEach((n) => starters.push({ n, id, v: lp(n), d: lp(n) - pMean(n) })));
  const bust = [...starters].sort((a, b) => a.d - b.d)[0], boom = [...starters].sort((a, b) => b.d - a.d)[0];
  if (boom) pl.push(`Biggest overperformer in a starting lineup: ${boom.n} (${nm(boom.id)}), ${fp1(boom.v)} against a ${fp1(pMean(boom.n))} projection.`);
  if (bust) pl.push(`Biggest letdown: ${bust.n} (${nm(bust.id)}), ${fp1(bust.v)} against a ${fp1(pMean(bust.n))} projection.`);
  let left = null; Object.entries(res.lineups).forEach(([id, names]) => { const bench = (league.rosters[id] || []).filter((n) => !names.includes(n) && res.playerFp[n] != null); const minS = Math.min(...names.map(lp)); bench.forEach((n) => { const gain = lp(n) - minS; if (!left || gain > left.gain) left = { id, n, gain }; }); });
  if (left && left.gain > 3) pl.push(`Costly bench decision: ${nm(left.id)} left ${left.n} (${fp1(lp(left.n))}) on the bench.`);
  out.sections.push({ h: "Players", items: pl });
  // managers
  const scores = Object.entries(res.mgrScores).map(([id, v]) => ({ id: +id, v })).sort((a, b) => b.v - a.v);
  const mg = [`High score: ${nm(scores[0].id)} with ${fp1(scores[0].v)}.`, `Low score: ${nm(scores[scores.length - 1].id)} with ${fp1(scores[scores.length - 1].v)}.`];
  out.sections.push({ h: "Managers", items: mg });
  // standings movement
  if (w < league.settings.regWeeks) {
    const before = computeStandings(prevL), after = computeStandings(nextL), rb = {}; before.forEach((r) => (rb[r.id] = r.rank));
    const mv = after.map((r) => ({ id: r.id, d: (w === 0 ? r.rank : rb[r.id]) - r.rank, rank: r.rank, rec: `${r.w}-${r.l}${r.t ? "-" + r.t : ""}` }));
    const up = [...mv].sort((a, b) => b.d - a.d)[0], dn = [...mv].sort((a, b) => a.d - b.d)[0];
    const st = [`${nm(after[0].id)} leads at ${after[0].w}-${after[0].l}${after[0].t ? "-" + after[0].t : ""} (${fp1(after[0].pf)} points for).`];
    if (up && up.d > 0) st.push(`Biggest climb: ${nm(up.id)} up ${up.d} to #${up.rank} (${up.rec}).`);
    if (dn && dn.d < 0) st.push(`Biggest slide: ${nm(dn.id)} down ${-dn.d} to #${dn.rank} (${dn.rec}).`);
    const line = league.settings.playoffTeams; if (after[line - 1]) st.push(`Playoff line: ${nm(after[line - 1].id)} holds the last spot at #${line}${after[line] ? `, ${nm(after[line].id)} is first out` : ""}.`);
    out.sections.push({ h: "Standings", items: st });
  }
  // events
  const byEv = {}; res.games.forEach((g) => { Object.entries(g.summary.boxScore).forEach(([n, b]) => { const v = b.lp != null ? b.lp : b.fp; if (!byEv[g.ev] || v > byEv[g.ev].v) byEv[g.ev] = { n, v, team: g.a }; }); });
  const evi = Object.entries(byEv).sort((a, b) => b[1].v - a[1].v).slice(0, 4).map(([e, x]) => `${e}: ${x.n} led all competitors with ${fp1(x.v)}.`);
  const cats = []; res.games.forEach((g) => Object.entries(g.summary.boxScore).forEach(([n, b]) => { if (b.catastrophe) cats.push(`${n} (${g.ev}): ${b.catastrophe}`); }));
  out.sections.push({ h: "Events", items: [...evi, ...cats.slice(0, 3).map((c) => "Catastrophe — " + c)] });
  const wv = (league.waivers && league.waivers.log || []).filter((x) => x.week === w + 1 && x.ok);
  if (wv.length) out.sections.push({ h: "Waivers", items: wv.map((x) => `${nm(x.mgr)} claimed ${x.add}${x.drop ? ", dropped " + x.drop : ""}.`) });
  out.headline = blow ? `${nm(blow.winner)} ${blow.margin > 60 ? "rolls" : "wins"} while ${all[0] ? all[0].n : "the field"} steals the show` : `Week ${w + 1} recap`;
  out.text = `WEEK ${w + 1} RECAP: ${out.headline}\n\n` + out.sections.map((s) => s.h.toUpperCase() + "\n" + s.items.map((i) => "- " + i).join("\n")).join("\n\n");
  return out;
}

// ---------- waiver wire ----------
function defaultWaivers(league) { return { priority: [...league.draft.order].reverse(), claims: [], log: [], seq: 1 }; }
function submitClaim(league, mgr, add, drop) {
  const W = league.waivers; if (!W) return { league, error: "Waivers are not enabled." };
  if (ownedMap(league)[add] != null) return { league, error: `${add} is already on a roster.` };
  if (!POOL_BY_NAME[add]) return { league, error: "Unknown competitor." };
  if (W.claims.some((c) => c.mgr === mgr && c.add === add)) return { league, error: `You already have a claim on ${add}.` };
  if (drop && !(league.rosters[mgr] || []).includes(drop)) return { league, error: "Drop target is not on your roster." };
  const claims = [...W.claims, { id: Date.now() * 20 + mgr, mgr, add, drop: drop || null }];
  return { league: { ...league, waivers: { ...W, claims } } };
}
function cancelClaim(league, id) { const W = league.waivers; return { ...league, waivers: { ...W, claims: W.claims.filter((c) => c.id !== id) } }; }
function moveClaim(league, id, d) { const W = league.waivers, i = W.claims.findIndex((c) => c.id === id); if (i < 0) return league; const mine = W.claims.filter((c) => c.mgr === W.claims[i].mgr); const j = mine.findIndex((c) => c.id === id) + d; if (j < 0 || j >= mine.length) return league; const swap = mine[j]; const a = W.claims.findIndex((c) => c.id === swap.id); const claims = [...W.claims]; [claims[i], claims[a]] = [claims[a], claims[i]]; return { ...league, waivers: { ...W, claims } }; }
const WAIVER_CAP = 3;
// Runs before each week is simulated. Claims go in waiver-priority order; a manager who wins a claim drops to the back of the line.
function processWaivers(league, week) {
  const W0 = league.waivers; if (!W0 || !W0.claims.length) return league;
  let L = league, priority = [...W0.priority]; const log = [], wins = {}, ptr = {};
  const byMgr = {}; W0.claims.forEach((c) => { (byMgr[c.mgr] = byMgr[c.mgr] || []).push(c); });
  let changed = true, guard = 0;
  while (changed && guard++ < 500) {
    changed = false;
    for (const mgr of [...priority]) {
      const list = byMgr[mgr] || []; ptr[mgr] = ptr[mgr] || 0;
      while (ptr[mgr] < list.length && (wins[mgr] || 0) < WAIVER_CAP) {
        const c = list[ptr[mgr]++]; const owned = ownedMap(L), ros = L.rosters[mgr] || [];
        let why = null;
        if (owned[c.add] != null) why = `${c.add} was already claimed`;
        else if (c.drop && !ros.includes(c.drop)) why = `${c.drop} is no longer on the roster`;
        else if (!c.drop && ros.length >= L.settings.rounds) why = "roster was full and no drop was named";
        if (why) { log.push({ week: week + 1, mgr, add: c.add, drop: c.drop, ok: false, why }); continue; }
        const roster = [...ros.filter((n) => n !== c.drop), c.add];
        const lineups = { ...L.lineups }; Object.keys(lineups).forEach((k) => { if (+k.split("|")[0] === mgr) delete lineups[k]; });
        L = { ...L, rosters: { ...L.rosters, [mgr]: roster }, lineups, transactions: [...L.transactions, { week: week + 1, type: "waiver", mgr, add: c.add, drop: c.drop, t: Date.now() }] };
        log.push({ week: week + 1, mgr, add: c.add, drop: c.drop, ok: true });
        wins[mgr] = (wins[mgr] || 0) + 1; priority = [...priority.filter((x) => x !== mgr), mgr]; changed = true; break;
      }
    }
  }
  // claims not reached (manager hit the weekly cap) are dropped from the queue with a note
  Object.entries(byMgr).forEach(([mgr, list]) => list.slice(ptr[mgr] || 0).forEach((c) => log.push({ week: week + 1, mgr: +mgr, add: c.add, drop: c.drop, ok: false, why: `weekly limit of ${WAIVER_CAP} claims reached` })));
  return { ...L, waivers: { ...W0, priority, claims: [], log: [...W0.log, ...log].slice(-300) } };
}


// ---------- weekly simulation ----------
function slimSummary(summary, lp) {
  const box = {};
  Object.entries(summary.boxScore).forEach(([n, b]) => {
    const o = {};
    Object.entries(b).forEach(([k, v]) => { if (typeof v === "number") { if (v !== 0) o[k] = Math.round(v * 100) / 100; } else if (v != null && v !== false && v !== "") o[k] = v; });
    o.fp = Math.round(b.fp * 100) / 100; if (lp && lp[n] != null) o.lp = Math.round(lp[n] * 100) / 100; box[n] = o;
  });
  return { eventLabel: summary.eventLabel, teamAName: summary.teamAName, teamBName: summary.teamBName, rosters: summary.rosters, gameScore: summary.gameScore, fpScore: summary.fpScore, resultLine: summary.resultLine, winner: summary.winner, columns: summary.columns, teamStats: summary.teamStats, scoringKey: summary.scoringKey, boxScore: box };
}
function simFranchiseGame(w, wk, pairIdx, evIdx, duration, lookup) {
  const [an, bn] = wk.pairs[pairIdx];
  const tA = FRANCHISE_BY_NAME[an], tB = FRANCHISE_BY_NAME[bn];
  const ev = EVENT_BY_NAME[wk.events[evIdx]];
  const pick = (t, nm) => nm.map((n) => t.players.find((p) => p.n === n)).filter(Boolean);
  const pA = pick(tA, wk.assign[an][evIdx]), pB = pick(tB, wk.assign[bn][evIdx]);
  const rolesA = autoAssignFootball(tA.players), rolesB = autoAssignFootball(tB.players);
  const run = runEventSim({ event: simEventObj(ev), teamA: tA, teamB: tB, pickedA: pA, pickedB: pB, rolesA, rolesB, kickerA: rolesA.QB.n, kickerB: rolesB.QB.n, duration });
  const sc = lookup ? lookup(ev.name) : null, lp = {};
  Object.entries(run.summary.boxScore).forEach(([n, b]) => { lp[n] = sc ? applyScale(b.fp, sc) : b.fp; });
  return { run, lp, game: { id: `${w}-${pairIdx}-${evIdx}`, ev: ev.name, a: an, b: bn, sa: run.summary.fpScore.A, sb: run.summary.fpScore.B, winner: run.summary.winner, scale: sc ? { k: sc.k, m: sc.m } : null, summary: slimSummary(run.summary, lp) } };
}
function mgrMatchupsForWeek(league, w) {
  const s = league.settings;
  if (w < s.regWeeks) return (league.schedule.reg[w] || []).map(([a, b]) => ({ a, b, kind: "reg" }));
  const po = league.playoff; if (!po) return [];
  const out = [];
  po.rounds.forEach((r, ri) => { if (r.weeks.includes(w)) r.matches.forEach((m, mi) => { if (m.a != null && m.b != null) out.push({ a: m.a, b: m.b, kind: "playoff", round: ri, match: mi }); }); });
  return out;
}
function simWeekCore(league, w, hooks) {
  const wk = league.schedule.weeks[w], dur = league.settings.duration;
  const games = [], playerFp = {}, logs = {}, lookup = scaleLookupFor(league, dur);
  wk.pairs.forEach((_, pi) => wk.events.forEach((_e, ei) => {
    const { run, game, lp } = simFranchiseGame(w, wk, pi, ei, dur, lookup);
    games.push(game); logs[game.id] = { orderedLog: run.orderedLog, eventDesc: run.eventDesc, summary: run.summary };
    Object.entries(run.summary.boxScore).forEach(([n]) => { playerFp[n] = Math.round(((playerFp[n] || 0) + lp[n]) * 100) / 100; });
  }));
  const lineups = {}, mgrScores = {}, mgrPlayer = {};
  league.managers.forEach((m) => {
    const L = effectiveLineup(league, m.id, w); lineups[m.id] = L;
    const per = {}; let tot = 0; L.forEach((n) => { const v = playerFp[n] || 0; per[n] = v; tot += v; });
    mgrScores[m.id] = Math.round(tot * 100) / 100; mgrPlayer[m.id] = per;
  });
  const matchups = mgrMatchupsForWeek(league, w).map((m) => ({ ...m, aPts: mgrScores[m.a], bPts: mgrScores[m.b] }));
  return { weekResult: { week: w, games, playerFp, lineups, mgrScores, mgrPlayer, matchups }, logs };
}

// ---------- standings & playoffs ----------
function computeStandings(league) {
  const rec = {}; league.managers.forEach((m) => (rec[m.id] = { id: m.id, w: 0, l: 0, t: 0, pf: 0, pa: 0, gp: 0, streak: [] }));
  league.results.forEach((r) => r.matchups.forEach((m) => {
    if (m.kind !== "reg") return;
    const A = rec[m.a], B = rec[m.b]; A.pf += m.aPts; A.pa += m.bPts; B.pf += m.bPts; B.pa += m.aPts; A.gp++; B.gp++;
    if (m.aPts > m.bPts) { A.w++; B.l++; A.streak.push("W"); B.streak.push("L"); } else if (m.aPts < m.bPts) { B.w++; A.l++; B.streak.push("W"); A.streak.push("L"); } else { A.t++; B.t++; A.streak.push("T"); B.streak.push("T"); }
  }));
  const rows = Object.values(rec).map((r) => ({ ...r, pct: r.gp ? (r.w + r.t / 2) / r.gp : 0 }));
  rows.sort((a, b) => b.pct - a.pct || b.pf - a.pf || a.id - b.id);
  return rows.map((r, i) => ({ ...r, rank: i + 1 }));
}
function seedOrder(size) { let o = [1]; while (o.length < size) { const n = o.length * 2; o = o.flatMap((s) => [s, n + 1 - s]); } return o; }
function buildPlayoffs(league) {
  const s = league.settings, st = computeStandings(league), P = s.playoffTeams, B = nextPow2(P), R = Math.log2(B);
  const seeds = st.slice(0, P).map((r) => r.id);
  const weeksPer = Array(R).fill(1); let extra = s.playoffWeeks - R;
  for (let r = R - 1; extra > 0; r = r === 0 ? R - 1 : r - 1, extra--) weeksPer[r]++;
  let w = s.regWeeks; const rounds = [];
  for (let r = 0; r < R; r++) { const weeks = []; for (let k = 0; k < weeksPer[r]; k++) weeks.push(w++); rounds.push({ weeks, matches: [] }); }
  const order = seedOrder(B);
  for (let i = 0; i < B; i += 2) {
    const sa = order[i], sb = order[i + 1];
    const a = sa <= P ? seeds[sa - 1] : null, b = sb <= P ? seeds[sb - 1] : null;
    rounds[0].matches.push({ a, b, sa, sb, winner: a != null && b == null ? a : b != null && a == null ? b : null });
  }
  for (let r = 1; r < R; r++) for (let i = 0; i < B / 2 ** (r + 1); i++) rounds[r].matches.push({ a: null, b: null, winner: null });
  const po = { seeds, rounds, size: B };
  return advancePlayoffs({ ...league, playoff: po });
}
function roundPoints(league, round, mgr) { return round.weeks.reduce((t, w) => t + ((league.results[w] && league.results[w].mgrScores[mgr]) || 0), 0); }
function advancePlayoffs(league) {
  const po = JSON.parse(JSON.stringify(league.playoff)), seedOf = (id) => po.seeds.indexOf(id) + 1;
  let champion = league.champion;
  po.rounds.forEach((rd, ri) => {
    const done = rd.weeks.every((w) => league.results[w]);
    rd.matches.forEach((m, mi) => {
      if (ri > 0) { const pa = po.rounds[ri - 1].matches[mi * 2], pb = po.rounds[ri - 1].matches[mi * 2 + 1]; m.a = pa.winner; m.b = pb.winner; if (m.a != null && m.b != null && seedOf(m.b) < seedOf(m.a)) { const t = m.a; m.a = m.b; m.b = t; } }
      if (m.a != null && m.b != null && done) {
        m.aPts = roundPoints(league, rd, m.a); m.bPts = roundPoints(league, rd, m.b);
        m.winner = m.aPts > m.bPts ? m.a : m.bPts > m.aPts ? m.b : seedOf(m.a) < seedOf(m.b) ? m.a : m.b;
      }
    });
  });
  const fin = po.rounds[po.rounds.length - 1].matches[0];
  champion = fin.winner != null && po.rounds[po.rounds.length - 1].weeks.every((w) => league.results[w]) ? fin.winner : null;
  return { ...league, playoff: po, champion, phase: champion != null ? "complete" : league.phase };
}
function seasonWeeks(league) { return league.settings.regWeeks + league.settings.playoffWeeks; }
function playoffActive(league, w) { return w >= league.settings.regWeeks; }
function simNextWeek(league) {
  const w = league.results.length;
  if (w >= seasonWeeks(league) || league.phase === "complete") return { league, logs: {} };
  let L = league;
  if (L.waivers) L = processWaivers(L, w);
  if (w === L.settings.regWeeks && !L.playoff) L = buildPlayoffs(L);
  const { weekResult, logs } = simWeekCore(L, w);
  L = { ...L, results: [...L.results, weekResult] };
  if (L.playoff) L = advancePlayoffs(L);
  else if (w === L.settings.regWeeks - 1) L = buildPlayoffs(L);
  return { league: L, logs };
}
// players who are mid-playoff-eliminated still sim; managers not in the bracket simply have no matchup.

// ---------- transactions ----------
function tradeCheck(league, a, b, giveA, giveB) {
  const w = league.results.length + 1;
  if (league.phase !== "season") return "Trades open once the season begins.";
  if (w > league.settings.tradeDeadlineWeek) return `The trade deadline (week ${league.settings.tradeDeadlineWeek}) has passed.`;
  if (a === b) return "Pick two different managers.";
  if (!giveA.length || giveA.length !== giveB.length) return "Trades must be the same number of competitors each way.";
  if (!giveA.every((n) => league.rosters[a].includes(n)) || !giveB.every((n) => league.rosters[b].includes(n))) return "A player in this trade is not on that roster.";
  return null;
}
function doTrade(league, a, b, giveA, giveB) {
  const err = tradeCheck(league, a, b, giveA, giveB); if (err) return { league, error: err };
  const rosters = { ...league.rosters, [a]: [...league.rosters[a].filter((n) => !giveA.includes(n)), ...giveB], [b]: [...league.rosters[b].filter((n) => !giveB.includes(n)), ...giveA] };
  const lineups = { ...league.lineups }; Object.keys(lineups).forEach((k) => { if (+k.split("|")[0] === a || +k.split("|")[0] === b) delete lineups[k]; });
  return { league: { ...league, rosters, lineups, transactions: [...league.transactions, { week: league.results.length + 1, type: "trade", a, b, giveA, giveB, t: Date.now() }] } };
}
function addDrop(league, mgr, add, drop) {
  const owned = ownedMap(league);
  if (owned[add] != null) return { league, error: `${add} is already on a roster.` };
  if (!POOL_BY_NAME[add]) return { league, error: "Unknown competitor." };
  const size = league.rosters[mgr].length, cap = league.settings.rounds;
  if (size >= cap && !drop) return { league, error: "Roster is full, choose someone to drop." };
  if (drop && !league.rosters[mgr].includes(drop)) return { league, error: "Drop target not on roster." };
  const roster = [...league.rosters[mgr].filter((n) => n !== drop), add];
  const lineups = { ...league.lineups }; Object.keys(lineups).forEach((k) => { if (+k.split("|")[0] === mgr) delete lineups[k]; });
  return { league: { ...league, rosters: { ...league.rosters, [mgr]: roster }, lineups, transactions: [...league.transactions, { week: league.results.length + 1, type: "addDrop", mgr, add, drop, t: Date.now() }] } };
}
function seasonStats(league) {
  const tot = {}, gp = {}, last = {};
  league.results.forEach((r, i) => Object.entries(r.playerFp).forEach(([n, v]) => { tot[n] = (tot[n] || 0) + v; gp[n] = (gp[n] || 0) + 1; last[n] = v; }));
  return { tot, gp, last };
}

// ============================= LEAGUE UI =============================
const fp1 = (x) => (Math.round((x || 0) * 10) / 10).toFixed(1);
const shortEv = (s) => s;

function Card({ title, right, children, pad = true, style }) {
  return (
    <div className="rounded-lg mb-4" style={{ background: THEME.panel, border: `1px solid ${THEME.border}`, ...style }}>
      {(title || right) && (
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${THEME.border}` }}>
          <div className="display text-base tracking-wide">{title}</div>
          <div>{right}</div>
        </div>
      )}
      <div className={pad ? "p-4" : ""}>{children}</div>
    </div>
  );
}
function Btn({ onClick, children, kind = "ghost", disabled, small, title, style }) {
  const base = kind === "gold" ? { background: THEME.gold, color: "#1A1200", border: `1px solid ${THEME.gold}` }
    : kind === "teal" ? { background: THEME.teal, color: "#06201C", border: `1px solid ${THEME.teal}` }
    : kind === "red" ? { background: "transparent", color: THEME.red, border: `1px solid ${THEME.red}66` }
    : { background: "transparent", color: THEME.text, border: `1px solid ${THEME.borderLight}` };
  return (
    <button onClick={onClick} disabled={disabled} title={title} className={`rounded font-bold uppercase tracking-wide inline-flex items-center gap-1.5 ${small ? "px-2.5 py-1 text-[11px]" : "px-4 py-2 text-xs"}`}
      style={{ ...base, opacity: disabled ? 0.4 : 1, cursor: disabled ? "not-allowed" : "pointer", ...style }}>{children}</button>
  );
}
function Dot({ color, size = 10 }) { return <span className="inline-block rounded-full" style={{ width: size, height: size, background: color, flexShrink: 0 }} />; }
function MgrTag({ league, id, bold }) {
  const m = league.managers[id]; if (!m) return null;
  return <span className="inline-flex items-center gap-1.5"><Dot color={m.color} /><span className={bold ? "font-bold" : ""}>{m.name}</span></span>;
}
function Select({ value, onChange, children, style }) {
  return <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded px-2 py-1.5 text-sm" style={{ background: THEME.panel2, color: THEME.text, border: `1px solid ${THEME.border}`, ...style }}>{children}</select>;
}
function MgrSelect({ league, value, onChange, style }) {
  if (MP.on && !MP.isCommish && MP.myMgr != null && value === MP.myMgr) return <MgrTag league={league} id={value} bold />;
  return <Select value={value} onChange={(v) => onChange(+v)} style={style}>{league.managers.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}</Select>;
}
function Modal({ title, onClose, children, wide }) {
  useEffect(() => { const h = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4" style={{ background: "rgba(5,7,10,0.78)" }} onClick={onClose}>
      <div className="w-full rounded-lg my-6" style={{ maxWidth: wide ? 1100 : 720, background: THEME.bg, border: `1px solid ${THEME.borderLight}` }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 sticky top-0 rounded-t-lg z-10" style={{ background: THEME.panel, borderBottom: `1px solid ${THEME.border}` }}>
          <div className="display text-lg">{title}</div>
          <button onClick={onClose} className="p-1" style={{ color: THEME.textMuted }}><X size={18} /></button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
function Th({ children, onClick, active, right }) {
  return <th onClick={onClick} className={`px-2 py-2 text-[11px] uppercase tracking-wider font-semibold ${right ? "text-right" : "text-left"}`} style={{ color: active ? THEME.gold : THEME.textMuted, cursor: onClick ? "pointer" : "default", whiteSpace: "nowrap" }}>{children}</th>;
}
function Stepper({ label, hint, value, onChange, min, max, step = 1 }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5" style={{ borderBottom: `1px solid ${THEME.border}` }}>
      <div><div className="text-sm font-semibold">{label}</div>{hint && <div className="text-xs" style={{ color: THEME.textMuted }}>{hint}</div>}</div>
      <div className="flex items-center gap-2 mono">
        <button className="w-8 h-8 rounded" style={{ border: `1px solid ${THEME.borderLight}` }} onClick={() => onChange(Math.max(min, value - step))}>−</button>
        <div className="w-10 text-center text-lg font-bold">{value}</div>
        <button className="w-8 h-8 rounded" style={{ border: `1px solid ${THEME.borderLight}` }} onClick={() => onChange(Math.min(max, value + step))}>+</button>
      </div>
    </div>
  );
}

// In-app confirm (window.confirm / alert are blocked inside sandboxed iframes, so never rely on them)
let ASK = null;
function askConfirm(message, onYes, yesLabel) { if (ASK) ASK({ message, onYes, yesLabel }); else onYes(); }
function ConfirmDialog({ dlg, onClose }) {
  if (!dlg) return null;
  return (
    <Modal title={dlg.title || "Please confirm"} onClose={onClose}>
      <div className="text-sm mb-5" style={{ lineHeight: 1.5 }}>{dlg.message}</div>
      <div className="flex justify-end gap-2">{dlg.onYes ? <><Btn onClick={onClose}>Cancel</Btn><Btn kind="gold" onClick={() => { const f = dlg.onYes; onClose(); f(); }}>{dlg.yesLabel || "Confirm"}</Btn></> : <Btn kind="gold" onClick={onClose}>OK</Btn>}</div>
    </Modal>
  );
}

// ---------- persistence ----------
function saveLeague(league) {
  try {
    let json = JSON.stringify(league);
    if (json.length > 4400000) {
      const slim = { ...league, results: league.results.map((r, i) => (i >= league.results.length - 3 ? r : { ...r, games: r.games.map((g) => ({ ...g, summary: { ...g.summary, boxScore: Object.fromEntries(Object.entries(g.summary.boxScore).map(([n, b]) => [n, { fp: b.fp, lp: b.lp }])) } })) })) };
      json = JSON.stringify(slim);
    }
    localStorage.setItem(LEAGUE_KEY, json); return true;
  } catch (e) { return false; }
}
function loadLeague() { try { const s = localStorage.getItem(LEAGUE_KEY); if (!s) return null; const L = JSON.parse(s); return L && L.version === 1 ? L : null; } catch (e) { return null; } }
function downloadLeague(league) {
  try {
    const blob = new Blob([JSON.stringify(league)], { type: "application/json" });
    const url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url; a.download = `${(league.settings.leagueName || "fffs-league").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.json`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000); return true;
  } catch (e) { return false; }
}
function readLeagueFile(file, cb) {
  const fr = new FileReader();
  fr.onload = () => { try { const L = JSON.parse(String(fr.result)); if (!L || L.version !== 1 || !L.settings || !L.managers) throw new Error("not a league file"); cb(null, L); } catch (e) { cb(e); } };
  fr.onerror = () => cb(new Error("could not read file"));
  fr.readAsText(file);
}

// ============================= SETUP =============================
function SetupScreen({ onCreate, onImport }) {
  const [s, setS] = useState(defaultSettings());
  const [names, setNames] = useState({});
  const [showNames, setShowNames] = useState(false);
  const [err, setErr] = useState("");
  const set = (k, v) => setS((p) => {
    const n = { ...p, [k]: v };
    if (k === "numManagers") { n.rounds = Math.min(n.rounds, maxRounds(v)); n.playoffTeams = Math.min(n.playoffTeams, v); n.starters = Math.min(n.starters, n.rounds); }
    if (k === "rounds") n.starters = Math.min(n.starters, v);
    if (k === "playoffTeams") n.playoffWeeks = Math.max(n.playoffWeeks, roundsFor(v));
    if (k === "regWeeks") { n.tradeDeadlineWeek = Math.min(n.tradeDeadlineWeek, v + n.playoffWeeks); n.byeEnd = Math.min(n.byeEnd, v); n.byeStart = Math.min(n.byeStart, n.byeEnd); }
    if (k === "byeStart") n.byeEnd = Math.max(n.byeEnd, v);
    if (k === "byeEnd") n.byeStart = Math.min(n.byeStart, v);
    return n;
  });
  const { errors, warnings } = validateSettings(s);
  const fileRef = useRef(null);
  return (
    <div className="max-w-[860px] mx-auto">
      <div className="text-center mb-6">
        <div className="display text-4xl" style={{ color: THEME.gold }}>LEAGUE SETTINGS</div>
        <div className="text-sm mt-1" style={{ color: THEME.textMuted }}>Managers draft competitors from the 32 franchises. Franchises play weekly events; competitors' fantasy points score your head-to-head matchup.</div>
      </div>
      <Card title="League">
        <label className="text-xs uppercase tracking-wider" style={{ color: THEME.textMuted }}>League name</label>
        <input value={s.leagueName} onChange={(e) => set("leagueName", e.target.value)} className="w-full mt-1 rounded px-3 py-2 text-base" style={{ background: THEME.panel2, border: `1px solid ${THEME.border}`, color: THEME.text }} />
        <div className="mt-3">
          <Stepper label="How many teams / managers?" hint="Even numbers, 8 to 32" value={s.numManagers} onChange={(v) => set("numManagers", v)} min={8} max={32} step={2} />
          <Stepper label="How many competitors per team? (draft rounds)" hint={`Usually 11 to 15. Pool is ${POOL_SIZE} competitors, so ${s.numManagers} managers can draft at most ${maxRounds(s.numManagers)} each`} value={s.rounds} onChange={(v) => set("rounds", v)} min={1} max={maxRounds(s.numManagers)} />
          <Stepper label="How many starters count each week?" hint="Active lineup size; the rest of the roster is bench" value={s.starters} onChange={(v) => set("starters", v)} min={1} max={s.rounds} />
          <Stepper label="How many regular season weeks?" value={s.regWeeks} onChange={(v) => set("regWeeks", v)} min={1} max={30} />
          <Stepper label="How many playoff teams make the postseason?" value={s.playoffTeams} onChange={(v) => set("playoffTeams", v)} min={2} max={s.numManagers} />
          <Stepper label="How many weeks for playoffs?" hint={`At least ${roundsFor(s.playoffTeams)} (one per round); extra weeks make the later rounds two-week totals`} value={s.playoffWeeks} onChange={(v) => set("playoffWeeks", v)} min={roundsFor(s.playoffTeams)} max={8} />
          <Stepper label="Trade deadline (week number)" hint="Trades close after this week is played" value={s.tradeDeadlineWeek} onChange={(v) => set("tradeDeadlineWeek", v)} min={1} max={s.regWeeks + s.playoffWeeks} />
          <div className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <div><div className="text-sm font-semibold">Franchise bye weeks</div><div className="text-xs" style={{ color: THEME.textMuted }}>Each of the 32 franchises rests one week mid-season; its competitors score nothing that week</div></div>
            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={!!s.byeEnabled} onChange={(e) => set("byeEnabled", e.target.checked)} />{s.byeEnabled ? "On" : "Off"}</label>
          </div>
          {s.byeEnabled && <>
            <Stepper label="First bye week" value={s.byeStart} onChange={(v) => set("byeStart", v)} min={1} max={s.regWeeks} />
            <Stepper label="Last bye week" hint={(() => { const n = s.byeEnd - s.byeStart + 1; return [2, 4, 8, 16].includes(n) ? `${n} weeks, ${32 / n} franchises on bye each week` : `${n} week${n === 1 ? "" : "s"}: use 2, 4, 8 or 16 weeks`; })()} value={s.byeEnd} onChange={(v) => set("byeEnd", v)} min={s.byeStart} max={s.regWeeks} />
          </>}
          <div className="flex items-center justify-between py-2.5">
            <div><div className="text-sm font-semibold">Simulation length for weekly events</div><div className="text-xs" style={{ color: THEME.textMuted }}>Same short / medium / long setting as the Event Simulator</div></div>
            <Select value={s.duration} onChange={(v) => set("duration", v)}>{DURATIONS.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}</Select>
          </div>
        </div>
      </Card>
      <Card title="Manager names" right={<Btn small onClick={() => setShowNames(!showNames)}>{showNames ? "Hide" : "Edit names"}</Btn>}>
        {showNames ? (
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: s.numManagers }, (_, i) => (
              <div key={i} className="flex items-center gap-2"><Dot color={mgrColor(i)} /><input placeholder={`Manager ${i + 1}`} value={names[i] || ""} onChange={(e) => setNames({ ...names, [i]: e.target.value })} className="flex-1 rounded px-2 py-1.5 text-sm" style={{ background: THEME.panel2, border: `1px solid ${THEME.border}`, color: THEME.text }} /></div>
            ))}
          </div>
        ) : <div className="text-sm" style={{ color: THEME.textMuted }}>Defaults to Manager 1 through Manager {s.numManagers}. You can rename anyone later from the League tab.</div>}
      </Card>
      {errors.map((e, i) => <div key={i} className="text-sm mb-2 px-3 py-2 rounded" style={{ background: THEME.red + "22", color: THEME.red }}>{e}</div>)}
      {warnings.map((e, i) => <div key={i} className="text-sm mb-2 px-3 py-2 rounded" style={{ background: THEME.gold + "18", color: THEME.gold }}>{e}</div>)}
      {err && <div className="text-sm mb-2" style={{ color: THEME.red }}>{err}</div>}
      <div className="flex items-center justify-between mt-4">
        <div>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) readLeagueFile(f, (er, L) => (er ? setErr("That file is not a league save: " + er.message) : onImport(L))); e.target.value = ""; }} />
          <Btn onClick={() => fileRef.current && fileRef.current.click()}><Upload size={14} /> Load league file</Btn>
        </div>
        <Btn kind="gold" disabled={errors.length > 0} onClick={() => onCreate(s, names)}>Create league and open draft <ChevronRight size={14} /></Btn>
      </div>
    </div>
  );
}

// ============================= DRAFT =============================
const STAT_KEYS = [["st", "STR"], ["co", "CON"], ["dx", "DEX"], ["wi", "WIS"], ["it", "INT"], ["ch", "CHA"], ["lk", "LCK"]];
function DraftRoom({ league, setLeague, onStartSeason }) {
  const [search, setSearch] = useState("");
  const [fran, setFran] = useState("all");
  const [sortKey, setSortKey] = useState("proj");
  const [viewMgr, setViewMgr] = useState(null);
  const total = draftTotal(league), made = league.draft.picks.length, done = made >= total;
  const clock = done ? null : pickOwner(league, made);
  const taken = useMemo(() => draftedSet(league), [league.draft.picks.length]);
  const auto = league.draft.auto || {}, timer = league.draft.timer || 0;
  const ref = useRef(league); ref.current = league;
  const [left, setLeft] = useState(timer);
  const cap = FRANCHISE_CAP(league.settings.rounds);
  const patchDraft = (o) => setLeague({ ...league, draft: { ...league.draft, ...o } });
  const pickNow = () => { const L = ref.current; if (L.draft.picks.length < draftTotal(L)) setLeague(autoPickNext(L)); };
  // autopilot managers pick for themselves shortly after they come on the clock
  useEffect(() => {
    if (done || !auto[clock] || !MPRUNS()) return undefined;
    const t = setTimeout(pickNow, 350);
    return () => clearTimeout(t);
  }, [made, clock, auto[clock], done]);
  // pick clock
  useEffect(() => { setLeft(timer); }, [made, timer]);
  useEffect(() => {
    if (done || !timer || auto[clock] || !MPRUNS()) return undefined;
    const t = setInterval(() => setLeft((s) => { if (s <= 1) { setTimeout(pickNow, 0); return timer; } return s - 1; }), 1000);
    return () => clearInterval(t);
  }, [made, timer, done, auto[clock]]);
  const projOrd = (p) => { const x = projOf(p.n); return x ? x.mean : 0; };
  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    return POOL.filter((p) => !taken.has(p.n) && (fran === "all" || p.team === fran) && (!q || p.n.toLowerCase().includes(q))).sort((a, b) => (sortKey === "n" ? a.n.localeCompare(b.n) : sortKey === "proj" ? projOrd(b) - projOrd(a) : b[sortKey] - a[sortKey] || b.tt - a.tt)).slice(0, 120);
  }, [search, fran, sortKey, taken]);
  const shownMgr = viewMgr != null ? viewMgr : clock != null ? clock : 0;
  const lastPicks = league.draft.picks.slice(-8).reverse();
  const draft = (n) => setLeague(makePick(league, n));
  const queue = queueOf(league, shownMgr).filter((n) => !taken.has(n));
  const inQ = (n) => queue.includes(n);
  const toggleQ = (n) => setLeague(setQueue(league, shownMgr, inQ(n) ? queue.filter((x) => x !== n) : [...queue, n]));
  const moveQ = (n, d) => { const i = queue.indexOf(n), j = i + d; if (j < 0 || j >= queue.length) return; const q = [...queue]; [q[i], q[j]] = [q[j], q[i]]; setLeague(setQueue(league, shownMgr, q)); };
  const mine = league.rosters[shownMgr] || [];
  const stack = (p) => mine.filter((n) => POOL_BY_NAME[n].team === p.team).length;
  const nextPick = () => { const nm = autoPickFor(league, clock); if (nm) draft(nm); };
  const anyAuto = Object.values(auto).some(Boolean);
  return (
    <div>
      <div className="rounded-lg px-4 py-3 mb-4 flex flex-wrap items-center justify-between gap-3" style={{ background: THEME.panel, border: `1px solid ${done ? THEME.teal : league.managers[clock].color}` }}>
        {done ? (
          <div className="display text-2xl" style={{ color: THEME.teal }}>DRAFT COMPLETE</div>
        ) : (
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: THEME.textMuted }}>On the clock · Round {Math.floor(made / league.managers.length) + 1} · Pick {made + 1} of {total}{timer && !auto[clock] ? <span className="mono ml-2" style={{ color: left <= 10 ? THEME.red : THEME.gold }}>{left}s</span> : null}{auto[clock] ? <span className="ml-2" style={{ color: THEME.teal }}>AUTOPILOT</span> : null}</div>
            <div className="display text-3xl flex items-center gap-2"><Dot color={league.managers[clock].color} size={14} />{league.managers[clock].name.toUpperCase()}</div>
          </div>
        )}
        <div className="flex flex-wrap gap-2 items-center">
          {!done && <Btn kind="gold" disabled={!MPCAN(clock)} onClick={nextPick}><Zap size={14} /> Auto-pick</Btn>}
          {!done && MPA() && <Btn onClick={() => askConfirm("Auto-draft every remaining pick for every manager?", () => setLeague(autoDraftRest(league)), "Auto-draft")}><FastForward size={14} /> Auto-draft rest</Btn>}
          <Btn disabled={!made || !MPA()} onClick={() => setLeague(undoPick(league))}><Undo2 size={14} /> Undo</Btn>
          {!done && MPA() && <Select value={String(timer)} onChange={(v) => patchDraft({ timer: +v })}><option value="0">No pick clock</option><option value="30">30s clock</option><option value="60">60s clock</option><option value="90">90s clock</option><option value="120">120s clock</option></Select>}
          {done && MPA() && <Btn kind="teal" onClick={onStartSeason}>Start season <ChevronRight size={14} /></Btn>}
        </div>
      </div>
      {!done && MPA() && (
        <div className="flex flex-wrap items-center gap-1.5 mb-4 text-xs">
          <span className="uppercase tracking-[0.15em] mr-1" style={{ color: THEME.textMuted }}>Autopilot</span>
          {league.managers.map((m) => (
            <button key={m.id} onClick={() => patchDraft({ auto: { ...auto, [m.id]: !auto[m.id] } })} className="rounded px-2 py-1" style={{ border: `1px solid ${auto[m.id] ? m.color : THEME.border}`, background: auto[m.id] ? m.color + "33" : "transparent", color: auto[m.id] ? THEME.text : THEME.textMuted }}>{m.name}{auto[m.id] ? " ✓" : ""}</button>
          ))}
          <button onClick={() => patchDraft({ auto: Object.fromEntries(league.managers.map((m) => [m.id, m.id !== shownMgr])) })} className="rounded px-2 py-1" style={{ border: `1px solid ${THEME.border}`, color: THEME.textMuted }}>All except {league.managers[shownMgr].name}</button>
          {anyAuto && <button onClick={() => patchDraft({ auto: {} })} className="rounded px-2 py-1" style={{ border: `1px solid ${THEME.border}`, color: THEME.textMuted }}>Clear</button>}
        </div>
      )}
      <div className="grid gap-4" style={{ gridTemplateColumns: "minmax(0,1.7fr) minmax(0,1fr)" }}>
        <Card title={`Available competitors (${POOL_SIZE - taken.size})`} pad={false}>
          <div className="flex flex-wrap gap-2 p-3" style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <div className="relative flex-1" style={{ minWidth: 160 }}>
              <Search size={14} className="absolute left-2.5 top-2.5" color={THEME.textFaint} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search competitors" className="w-full rounded pl-8 pr-2 py-1.5 text-sm" style={{ background: THEME.panel2, border: `1px solid ${THEME.border}`, color: THEME.text }} />
            </div>
            <Select value={fran} onChange={setFran}><option value="all">All franchises</option>{TEAMS.map((t) => <option key={t.name} value={t.name}>{t.name}</option>)}</Select>
            <Select value={sortKey} onChange={setSortKey}><option value="proj">Sort: Projection</option><option value="tt">Sort: Total</option>{STAT_KEYS.map(([k, l]) => <option key={k} value={k}>Sort: {l}</option>)}<option value="n">Sort: Name</option></Select>
          </div>
          <div className="px-3 py-1.5 text-[11px]" style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>Proj = projected league points per week (simulated over {Object.keys(PROJ_DATA).length ? "2,000 weeks" : "—"}); range is a typical bad-to-good week. Stacking more than {cap} from one franchise is blocked for autopilot, and 3+ is penalised.</div>
          <div style={{ maxHeight: 520, overflowY: "auto" }}>
            <table className="w-full text-sm">
              <thead style={{ position: "sticky", top: 0, background: THEME.panel2 }}><tr><Th /><Th>Competitor</Th><Th>Franchise</Th><Th right>Proj</Th><Th right>Range</Th><Th>Best at</Th><Th right>Total</Th><Th /></tr></thead>
              <tbody>
                {list.map((p) => { const pr = projOf(p.n), sp = specialties(p, 2), st = stack(p); return (
                  <tr key={p.n} style={{ borderTop: `1px solid ${THEME.border}` }}>
                    <td className="pl-2 py-1.5"><button title={inQ(p.n) ? "Remove from queue" : "Add to queue"} onClick={() => toggleQ(p.n)} style={{ color: inQ(p.n) ? THEME.gold : THEME.textFaint }}><Star size={14} fill={inQ(p.n) ? THEME.gold : "none"} /></button></td>
                    <td className="px-2 py-1.5 font-semibold">{p.n}{p.star && <span style={{ color: THEME.gold }}> ★</span>}</td>
                    <td className="px-2 py-1.5 text-xs" style={{ color: THEME.textMuted }}>{p.team}{st >= 2 ? <span style={{ color: st >= cap ? THEME.red : THEME.gold }}> · {st} owned</span> : null}</td>
                    <td className="px-2 py-1.5 text-right mono font-bold" style={{ color: THEME.gold }}>{pr ? pr.mean.toFixed(1) : "—"}</td>
                    <td className="px-2 py-1.5 text-right mono text-xs" style={{ color: THEME.textMuted }}>{pr ? `${pr.lo.toFixed(0)}–${pr.hi.toFixed(0)}` : ""}</td>
                    <td className="px-2 py-1.5 text-xs" style={{ color: THEME.textMuted }}>{sp.map((x) => x.name).join(", ")}</td>
                    <td className="px-2 py-1.5 text-right mono text-xs" style={{ color: THEME.textMuted }}>{p.tt}</td>
                    <td className="px-2 py-1.5 text-right"><Btn small kind="gold" disabled={done || !MPCAN(clock)} onClick={() => draft(p.n)}>Draft</Btn></td>
                  </tr>); })}
                {!list.length && <tr><td colSpan={8} className="p-6 text-center" style={{ color: THEME.textMuted }}>No competitors match.</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
        <div>
          <Card title="Latest picks">
            {lastPicks.length ? lastPicks.map((p) => (
              <div key={p.pick} className="flex items-center justify-between py-1 text-sm"><span><span className="mono text-xs mr-2" style={{ color: THEME.textFaint }}>{p.round}.{String(((p.pick) % league.managers.length) + 1).padStart(2, "0")}</span><b>{p.player}</b></span><MgrTag league={league} id={p.mgr} /></div>
            )) : <div className="text-sm" style={{ color: THEME.textMuted }}>No picks yet.</div>}
          </Card>
          <Card title="Queue" right={<MgrSelect league={league} value={shownMgr} onChange={setViewMgr} />}>
            {queue.map((n, i) => (
              <div key={n} className="flex justify-between items-center text-sm py-1"><span><span className="mono text-xs mr-2" style={{ color: THEME.textFaint }}>{i + 1}</span>{n} <span className="text-xs" style={{ color: THEME.textMuted }}>{projOf(n) ? projOf(n).mean.toFixed(1) : ""}</span></span>
                <span className="flex gap-1"><Btn small onClick={() => moveQ(n, -1)}>↑</Btn><Btn small onClick={() => moveQ(n, 1)}>↓</Btn><Btn small onClick={() => toggleQ(n)}><X size={12} /></Btn></span></div>
            ))}
            {!queue.length && <div className="text-sm" style={{ color: THEME.textMuted }}>Star competitors to queue them. Autopilot and the pick clock take the first queued player still available, then fall back to best projection.</div>}
          </Card>
          <Card title="Roster">
            {mine.map((n, i) => <div key={n} className="flex justify-between text-sm py-1"><span><span className="mono text-xs mr-2" style={{ color: THEME.textFaint }}>{i + 1}</span>{n}</span><span className="text-xs" style={{ color: THEME.textMuted }}>{POOL_BY_NAME[n].team} · {projOf(n) ? projOf(n).mean.toFixed(1) : POOL_BY_NAME[n].tt}</span></div>)}
            {!mine.length && <div className="text-sm" style={{ color: THEME.textMuted }}>Empty.</div>}
          </Card>
        </div>
      </div>
      {done && <DraftGradesView league={league} />}
      <Card title="Draft board (snake)" pad={false}>
        <div style={{ overflowX: "auto" }}>
          <table className="text-[11px]" style={{ borderCollapse: "collapse" }}>
            <thead><tr><th className="px-2 py-1.5" style={{ color: THEME.textFaint }}>Rd</th>{league.draft.order.map((id) => <th key={id} className="px-2 py-1.5 text-left" style={{ minWidth: 110, color: league.managers[id].color, whiteSpace: "nowrap" }}>{league.managers[id].name}</th>)}</tr></thead>
            <tbody>
              {Array.from({ length: league.settings.rounds }, (_, r) => (
                <tr key={r}>
                  <td className="px-2 mono" style={{ color: THEME.textFaint }}>{r + 1}</td>
                  {league.draft.order.map((id, col) => {
                    const idx = r * league.managers.length + (r % 2 === 0 ? col : league.managers.length - 1 - col);
                    const pk = league.draft.picks[idx];
                    return <td key={id} className="px-2 py-1" style={{ border: `1px solid ${THEME.border}`, background: pk ? league.managers[id].color + "22" : idx === made ? THEME.gold + "33" : "transparent", whiteSpace: "nowrap" }}>{pk ? pk.player : idx === made ? "on the clock" : ""}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ============================= MODALS =============================
function MatchupModal({ league, m, w, onClose }) {
  const res = league.results[w];
  const side = (id, pts) => {
    const L = (res ? res.lineups[id] : effectiveLineup(league, id, w)) || [];
    return (
      <div>
        <div className="flex items-center justify-between mb-2"><div className="display text-lg"><MgrTag league={league} id={id} bold /></div><div className="display text-3xl" style={{ color: THEME.gold }}>{res ? fp1(pts) : "—"}</div></div>
        <table className="w-full text-sm">
          <tbody>
            {L.map((n) => {
              const ev = res ? res.games.filter((g) => g.summary.boxScore[n]).map((g) => g.ev) : playsInWeek(league, w, n);
              const bye = isBye(league, w, n);
              const v = res ? res.mgrPlayer[id][n] : null;
              return (
                <tr key={n} style={{ borderTop: `1px solid ${THEME.border}` }}>
                  <td className="py-1.5 font-semibold"><PName n={n} /><div className="text-[11px]" style={{ color: THEME.textFaint }}>{POOL_BY_NAME[n].team} · {ev.length ? ev.join(", ") : bye ? "on bye" : "not in an event"}</div></td>
                  <td className="py-1.5 text-right mono font-bold" style={{ color: v < 0 ? THEME.red : THEME.text }}>{v == null ? "" : fp1(v)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <Modal title={`Week ${w + 1} matchup${m.kind === "playoff" ? " · Playoffs" : ""}`} onClose={onClose} wide>
      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>{side(m.a, m.aPts)}{side(m.b, m.bPts)}</div>
    </Modal>
  );
}
function GameModal({ league, game, logs, onClose }) {
  const [narr, setNarr] = useState(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState("");
  const tA = FRANCHISE_BY_NAME[game.a], tB = FRANCHISE_BY_NAME[game.b];
  const owned = ownedMap(league);
  const lpOf = (b) => (b.lp != null ? b.lp : b.fp);
  const impact = Object.entries(game.summary.boxScore).filter(([n]) => owned[n] != null).sort((a, b) => lpOf(b[1]) - lpOf(a[1]));
  const gen = async () => {
    if (!logs) return; setBusy(true);
    try {
      const r = await generateNarrative({ eventLabel: game.ev, eventDesc: logs.eventDesc, teamAName: game.a, teamBName: game.b, duration: league.settings.duration, summary: logs.summary, orderedLog: logs.orderedLog, onUpdate: setNarr });
      setNarr(r);
    } catch (e) { setNarr(offlineNarrative({ orderedLog: logs.orderedLog, summary: logs.summary }, e)); }
    setBusy(false);
  };
  const copy = () => {
    const txt = scriptText({ label: game.ev }, tA, tB, narr);
    try { navigator.clipboard.writeText(txt).then(() => setCopied("Copied"), () => setCopied("Copy failed")); } catch (e) { setCopied("Copy failed"); }
  };
  return (
    <Modal title={`${game.ev}: ${game.a} vs ${game.b}`} onClose={onClose} wide>
      <Card title="Fantasy impact (league points)" pad>
        {game.scale && <div className="text-xs mb-3" style={{ color: THEME.textMuted }}>League scoring standardizes every event so a typical competitor averages {SCALE_TARGET} league points. The box score below shows the raw event points; the numbers here are what your lineup earns.</div>}
        {impact.length ? (
          <div className="grid gap-x-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {impact.map(([n, b]) => <div key={n} className="flex items-center justify-between text-sm py-1" style={{ borderBottom: `1px solid ${THEME.border}` }}><span><b>{n}</b> <span className="text-xs" style={{ color: THEME.textMuted }}>({league.managers[owned[n]].name})</span></span><span className="mono font-bold" style={{ color: lpOf(b) < 0 ? THEME.red : THEME.text }}>{fp1(lpOf(b))}{b.lp != null && <span className="text-[10px] ml-1" style={{ color: THEME.textFaint }}>raw {fp1(b.fp)}</span>}</span></div>)}
          </div>
        ) : <div className="text-sm" style={{ color: THEME.textMuted }}>No rostered competitors in this event.</div>}
      </Card>
      <BoxScorePanel eventKey={game.ev} summary={game.summary} teamA={tA} teamB={tB} />
      <Card title="Commentary" right={logs ? <div className="flex gap-2">{narr && !busy && <Btn small onClick={copy}>{copied || "Copy script"}</Btn>}<Btn small kind="gold" disabled={busy} onClick={gen}><Mic size={13} /> {busy ? "On air..." : narr ? "Regenerate" : "Generate commentary"}</Btn></div> : null}>
        {!logs && <div className="text-sm" style={{ color: THEME.textMuted }}>The play-by-play log is only kept for the most recent weeks of the current session, so commentary is not available for this game.</div>}
        {logs && !narr && <div className="text-sm" style={{ color: THEME.textMuted }}>Generate the live play-by-play and color commentary for this game. Numbers quoted match the box score above.</div>}
        {narr && (
          <div>
            {narr.status && narr.status.errors && narr.status.errors.length > 0 && <div className="text-xs mb-3 px-3 py-2 rounded" style={{ background: THEME.gold + "18", color: THEME.gold }}>Some of the commentary was filled in from the game log ({narr.status.errors.length} part{narr.status.errors.length > 1 ? "s" : ""} could not be written). {Array.from(new Set(narr.status.errors.map((e) => String(e).replace(/^[^:]*: /, "")))).slice(0, 2).join(" | ")} Press Regenerate to try again.</div>}
            <FactNote narrative={narr} />
            <ReadAloudBar disabled={busy} groups={[{ group: "pbp", lines: narr.playByPlay }, { group: "seg", lines: narr.extendedSegment || [] }]} />
            <ScriptLines lines={narr.playByPlay} group="pbp" />
            {narr.extendedSegment && narr.extendedSegment.length > 0 && <div className="mt-5"><div className="display text-sm mb-2" style={{ color: THEME.gold }}>POST-EVENT DESK</div><ScriptLines lines={narr.extendedSegment} group="seg" /></div>}
          </div>
        )}
      </Card>
    </Modal>
  );
}

// ============================= SCOREBOARD =============================
function Scoreboard({ league, logs, myMgr }) {
  const played = league.results.length, total = seasonWeeks(league);
  const [week, setWeek] = useState(Math.max(0, played - 1));
  useEffect(() => { setWeek(Math.max(0, played - 1)); }, [played]);
  const [mModal, setMModal] = useState(null);
  const [gModal, setGModal] = useState(null);
  const [onlyMine, setOnlyMine] = useState(false);
  const wk = league.schedule.weeks[week];
  const res = league.results[week];
  const isPlayoff = week >= league.settings.regWeeks;
  const matchups = res ? res.matchups : mgrMatchupsForWeek(league, week).map((m) => ({ ...m, aPts: null, bPts: null }));
  const owned = ownedMap(league);
  const games = res ? res.games : [];
  const shown = onlyMine ? games.filter((g) => Object.keys(g.summary.boxScore).some((n) => owned[n] === myMgr)) : games;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Btn small disabled={week <= 0} onClick={() => setWeek(week - 1)}><ChevronLeft size={14} /></Btn>
        <div className="display text-2xl px-2">WEEK {week + 1}{isPlayoff ? " · PLAYOFFS" : ""}</div>
        <Btn small disabled={week >= total - 1} onClick={() => setWeek(week + 1)}><ChevronRight size={14} /></Btn>
        <div className="flex flex-wrap gap-1.5 ml-2">{wk.events.map((e) => <span key={e} className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide" style={{ background: THEME.gold + "22", color: THEME.gold, border: `1px solid ${THEME.gold}55` }}>{e}</span>)}</div>
        {!res && <span className="text-xs ml-2" style={{ color: THEME.textMuted }}>not played yet</span>}
      </div>
      {(wk.byes || []).length > 0 && <div className="mb-4 text-sm rounded px-3 py-2" style={{ background: THEME.purple + "18", border: `1px solid ${THEME.purple}55` }}><b style={{ color: THEME.purple }}>ON BYE:</b> {wk.byes.join(", ")} <span style={{ color: THEME.textMuted }}>(resting, no points)</span></div>}
      <Card title={isPlayoff ? "Playoff matchups" : "Head-to-head matchups"} pad={false}>
        {matchups.length ? (
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))" }}>
            {matchups.map((m, i) => {
              const aw = m.aPts != null && m.aPts > m.bPts, bw = m.aPts != null && m.bPts > m.aPts;
              const row = (id, pts, win) => (
                <div className="flex items-center justify-between py-1.5">
                  <span className={win ? "font-bold" : ""} style={{ opacity: m.aPts != null && !win ? 0.7 : 1 }}><MgrTag league={league} id={id} /></span>
                  <span className="mono text-xl font-bold" style={{ color: win ? THEME.gold : THEME.text }}>{pts == null ? "—" : fp1(pts)}</span>
                </div>
              );
              return (
                <div key={i} onClick={() => setMModal({ m, w: week })} className="px-4 py-2 cursor-pointer" style={{ borderBottom: `1px solid ${THEME.border}`, borderRight: `1px solid ${THEME.border}`, background: myMgr === m.a || myMgr === m.b ? THEME.gold + "0D" : "transparent" }}>
                  {row(m.a, m.aPts, aw)}{row(m.b, m.bPts, bw)}
                </div>
              );
            })}
          </div>
        ) : <div className="p-4 text-sm" style={{ color: THEME.textMuted }}>{isPlayoff ? "Playoff matchups are set once the previous round finishes." : "No matchups."}</div>}
      </Card>
      {!res && league.phase === "season" && <MatchupPreviews league={league} week={week} myMgr={myMgr} />}
      <Card title={`Franchise events (${res ? games.length : wk.pairs.length * wk.events.length} games)`} right={res ? <label className="text-xs flex items-center gap-1.5 cursor-pointer" style={{ color: THEME.textMuted }}><input type="checkbox" checked={onlyMine} onChange={(e) => setOnlyMine(e.target.checked)} /> Only games with {league.managers[myMgr].name}'s competitors</label> : null} pad={false}>
        {res ? (
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))" }}>
            {shown.map((g) => (
              <div key={g.id} onClick={() => setGModal(g)} className="px-4 py-2 cursor-pointer" style={{ borderBottom: `1px solid ${THEME.border}`, borderRight: `1px solid ${THEME.border}` }}>
                <div className="text-[11px] uppercase tracking-wider mb-0.5" style={{ color: THEME.gold }}>{g.ev}</div>
                {[[g.a, g.sa], [g.b, g.sb]].map(([n, s]) => <div key={n} className="flex justify-between text-sm"><span className={g.winner === n ? "font-bold" : ""} style={{ opacity: g.winner === n ? 1 : 0.7 }}>{n}</span><span className="mono font-bold">{g.summary.gameScore ? g.summary.gameScore[n === g.a ? "A" : "B"] : fp1(s)}</span></div>)}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
            {wk.pairs.map(([a, b], i) => <div key={i} className="px-4 py-2 text-sm" style={{ borderBottom: `1px solid ${THEME.border}` }}>{a} <span style={{ color: THEME.textFaint }}>vs</span> {b}</div>)}
          </div>
        )}
      </Card>
      {mModal && <MatchupModal league={league} m={mModal.m} w={mModal.w} onClose={() => setMModal(null)} />}
      {gModal && <GameModal league={league} game={gModal} logs={logs[gModal.id]} onClose={() => setGModal(null)} />}
    </div>
  );
}

// ============================= MY TEAM =============================
function MyTeam({ league, setLeague, myMgr, setMyMgr, goPlayers }) {
  const nextW = league.results.length, total = seasonWeeks(league);
  const upcoming = nextW < total ? nextW : null;
  const [sel, setSel] = useState(null);
  const stats = useMemo(() => seasonStats(league), [league.results.length]);
  const roster = league.rosters[myMgr] || [];
  const lineup = upcoming != null ? effectiveLineup(league, myMgr, upcoming) : [];
  const starters = new Set(lineup);
  const order = [...roster].sort((a, b) => (starters.has(b) ? 1 : 0) - (starters.has(a) ? 1 : 0) || POOL_BY_NAME[b].tt - POOL_BY_NAME[a].tt);
  const click = (n) => {
    if (upcoming == null) return;
    if (!sel) { setSel(n); return; }
    if (sel === n) { setSel(null); return; }
    if (starters.has(sel) === starters.has(n)) { setSel(n); return; }
    const out = starters.has(sel) ? sel : n, inn = starters.has(sel) ? n : sel;
    const next = lineup.map((x) => (x === out ? inn : x));
    setLeague({ ...league, lineups: { ...league.lineups, [`${myMgr}|${upcoming}`]: next } }); setSel(null);
  };
  const auto = () => { const l = { ...league.lineups }; delete l[`${myMgr}|${upcoming}`]; setLeague({ ...league, lineups: l }); setSel(null); };
  const std = computeStandings(league).find((r) => r.id === myMgr);
  const opp = upcoming != null ? mgrMatchupsForWeek(league, upcoming).find((m) => m.a === myMgr || m.b === myMgr) : null;
  const oppId = opp ? (opp.a === myMgr ? opp.b : opp.a) : null;
  const drop = (n) => {
    askConfirm(`Drop ${n}? They become a free agent.`, () => setLeague({ ...league, rosters: { ...league.rosters, [myMgr]: roster.filter((x) => x !== n) }, lineups: Object.fromEntries(Object.entries(league.lineups).filter(([k]) => +k.split("|")[0] !== myMgr)), transactions: [...league.transactions, { week: nextW + 1, type: "drop", mgr: myMgr, drop: n, t: Date.now() }] }), "Drop");
  };
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <MgrSelect league={league} value={myMgr} onChange={(v) => { setMyMgr(v); setSel(null); }} style={{ fontSize: 16 }} />
        {std && <div className="text-sm" style={{ color: THEME.textMuted }}>Record <b style={{ color: THEME.text }}>{std.w}-{std.l}{std.t ? "-" + std.t : ""}</b> · #{std.rank} · PF <b style={{ color: THEME.text }}>{fp1(std.pf)}</b></div>}
        {oppId != null && <div className="text-sm" style={{ color: THEME.textMuted }}>Week {upcoming + 1}: vs <MgrTag league={league} id={oppId} bold /></div>}
      </div>
      <Card title={upcoming != null ? `Week ${upcoming + 1} lineup · ${lineup.length}/${league.settings.starters} starters` : "Roster"} right={upcoming != null && <Btn small onClick={auto}><RefreshCw size={12} /> Auto-set</Btn>} pad={false}>
        {upcoming != null && <div className="px-4 py-2 text-xs" style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>Click a starter, then a bench player to swap. Competitors only score if their franchise puts them in this week's event(s). Anyone you leave unset is auto-filled.</div>}
        <table className="w-full text-sm">
          <thead><tr style={{ background: THEME.panel2 }}><Th>Slot</Th><Th>Competitor</Th><Th>Franchise</Th><Th>This week</Th><Th right>Last</Th><Th right>Avg</Th><Th right>Season</Th><Th /></tr></thead>
          <tbody>
            {order.map((n) => {
              const st = starters.has(n), plays = upcoming != null ? playsInWeek(league, upcoming, n) : [];
              const gp = stats.gp[n] || 0;
              return (
                <tr key={n} onClick={() => click(n)} style={{ borderTop: `1px solid ${THEME.border}`, cursor: upcoming != null ? "pointer" : "default", background: sel === n ? THEME.gold + "30" : st ? THEME.teal + "10" : "transparent" }}>
                  <td className="px-2 py-2"><span className="px-2 py-0.5 rounded text-[11px] font-bold" style={{ background: st ? THEME.teal : THEME.border, color: st ? "#06201C" : THEME.textMuted }}>{st ? "START" : "BENCH"}</span></td>
                  <td className="px-2 py-2 font-semibold"><PName n={n} /></td>
                  <td className="px-2 py-2 text-xs" style={{ color: THEME.textMuted }}>{POOL_BY_NAME[n].team}</td>
                  <td className="px-2 py-2 text-xs" style={{ color: plays.length ? THEME.gold : upcoming != null && isBye(league, upcoming, n) ? THEME.purple : THEME.textFaint }}>{upcoming == null ? "" : plays.length ? plays.join(", ") : isBye(league, upcoming, n) ? "BYE WEEK" : "not playing"}</td>
                  <td className="px-2 py-2 text-right mono">{gp ? fp1(stats.last[n]) : "—"}</td>
                  <td className="px-2 py-2 text-right mono">{gp ? fp1(stats.tot[n] / gp) : "—"}</td>
                  <td className="px-2 py-2 text-right mono font-bold">{fp1(stats.tot[n] || 0)}</td>
                  <td className="px-2 py-2 text-right"><Btn small kind="red" onClick={(e) => { e.stopPropagation(); drop(n); }}>Drop</Btn></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      {roster.length < league.settings.rounds && <div className="text-sm mb-4" style={{ color: THEME.gold }}>Open roster spot{league.settings.rounds - roster.length > 1 ? "s" : ""}: {league.settings.rounds - roster.length}. <button className="underline" onClick={goPlayers}>Find a free agent</button></div>}
      <Card title="Weekly scores" pad>
        {league.results.length ? <div className="flex flex-wrap gap-2">{league.results.map((r, i) => { const mt = r.matchups.find((m) => m.a === myMgr || m.b === myMgr); const won = mt && (mt.a === myMgr ? mt.aPts > mt.bPts : mt.bPts > mt.aPts); return <div key={i} className="px-3 py-2 rounded text-center" style={{ background: THEME.panel2, border: `1px solid ${mt ? (won ? THEME.teal : THEME.red) + "66" : THEME.border}`, minWidth: 64 }}><div className="text-[10px] uppercase" style={{ color: THEME.textFaint }}>Wk {i + 1}</div><div className="mono font-bold">{fp1(r.mgrScores[myMgr])}</div></div>; })}</div> : <div className="text-sm" style={{ color: THEME.textMuted }}>No weeks played yet.</div>}
      </Card>
    </div>
  );
}

// ============================= STANDINGS =============================
function franchiseRecords(league) {
  const m = {};
  TEAMS.forEach((t) => (m[t.name] = { name: t.name, conf: t.conference, div: t.division, w: 0, l: 0, t: 0, pf: 0, pa: 0, seq: [] }));
  const reg = league.settings.regWeeks;
  let weeks = 0;
  league.results.forEach((r) => {
    if (r.week >= reg) return;
    weeks++;
    r.games.forEach((g) => {
      const A = m[g.a], B = m[g.b]; if (!A || !B) return;
      A.pf += g.sa; A.pa += g.sb; B.pf += g.sb; B.pa += g.sa;
      if (g.winner === g.a) { A.w++; B.l++; A.seq.push("W"); B.seq.push("L"); }
      else if (g.winner === g.b) { B.w++; A.l++; B.seq.push("W"); A.seq.push("L"); }
      else { A.t++; B.t++; A.seq.push("T"); B.seq.push("T"); }
    });
  });
  const rows = Object.values(m).map((x) => { const gp = x.w + x.l + x.t; return { ...x, gp, pct: gp ? (x.w + x.t / 2) / gp : 0, diff: x.pf - x.pa }; });
  const cmp = (a, b) => b.pct - a.pct || b.w - a.w || b.diff - a.diff || b.pf - a.pf || a.name.localeCompare(b.name);
  rows.sort(cmp);
  rows.forEach((r, i) => (r.rank = i + 1));
  const divLead = {};
  rows.forEach((r) => { if (!divLead[r.div]) divLead[r.div] = r.name; });
  return { rows, weeks, reg, done: weeks >= reg && reg > 0, divLead, cmp };
}
function FranchiseStandings({ league }) {
  const [view, setView] = useState("div");
  const data = useMemo(() => franchiseRecords(league), [league.results.length, league.settings.regWeeks]);
  const { rows, weeks, reg, done, divLead } = data;
  const champ = done ? rows[0] : null, leader = rows[0];
  const streak = (seq) => { if (!seq.length) return "—"; const c = seq[seq.length - 1]; let n = 0; for (let i = seq.length - 1; i >= 0 && seq[i] === c; i--) n++; return c + n; };
  const Table = ({ list, title }) => (
    <Card title={title} pad={false}>
      <div style={{ overflowX: "auto" }}>
        <table className="w-full text-sm">
          <thead><tr style={{ background: THEME.panel2 }}><Th>#</Th><Th>Franchise</Th><Th right>W</Th><Th right>L</Th><Th right>T</Th><Th right>Pct</Th><Th right>PF</Th><Th right>PA</Th><Th right>Diff</Th><Th>Strk</Th><Th>Last 5</Th></tr></thead>
          <tbody>
            {list.map((r, i) => (
              <tr key={r.name} style={{ borderTop: `1px solid ${THEME.border}` }}>
                <td className="px-2 py-1.5 mono" style={{ color: i === 0 ? THEME.gold : THEME.textFaint }}>{i + 1}</td>
                <td className="px-2 py-1.5 font-semibold whitespace-nowrap">{champ && champ.name === r.name && <Crown size={13} color={THEME.gold} style={{ display: "inline", marginRight: 4 }} />}{r.name}{divLead[r.div] === r.name && r.gp > 0 && <span className="text-[10px] ml-1.5 px-1 rounded" style={{ background: THEME.teal + "30", color: THEME.teal }} title="Leads its division">DIV</span>}</td>
                <td className="px-2 py-1.5 text-right mono">{r.w}</td><td className="px-2 py-1.5 text-right mono">{r.l}</td><td className="px-2 py-1.5 text-right mono">{r.t}</td>
                <td className="px-2 py-1.5 text-right mono">{r.gp ? r.pct.toFixed(3).replace(/^0/, "") : "—"}</td>
                <td className="px-2 py-1.5 text-right mono">{fp1(r.pf)}</td><td className="px-2 py-1.5 text-right mono">{fp1(r.pa)}</td>
                <td className="px-2 py-1.5 text-right mono" style={{ color: r.diff > 0 ? THEME.teal : r.diff < 0 ? THEME.red : THEME.textMuted }}>{r.diff > 0 ? "+" : ""}{fp1(r.diff)}</td>
                <td className="px-2 py-1.5 mono text-xs">{streak(r.seq)}</td>
                <td className="px-2 py-1.5 mono text-xs">{r.seq.slice(-5).map((x, k) => <span key={k} style={{ color: x === "W" ? THEME.teal : x === "L" ? THEME.red : THEME.textMuted }}>{x}</span>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
  const groups = view === "div" ? [...new Set(TEAMS.map((t) => t.division))].map((d) => [d, rows.filter((r) => r.div === d)]) : view === "conf" ? [...new Set(TEAMS.map((t) => t.conference))].map((c) => [c, rows.filter((r) => r.conf === c)]) : [["All 32 franchises", rows]];
  return (
    <div className="mb-2">
      <div className="rounded-lg px-5 py-4 mb-3 flex items-center gap-3" style={{ background: THEME.gold + (done ? "28" : "14"), border: `1px solid ${done ? THEME.gold : THEME.border}` }}>
        <Crown size={28} color={THEME.gold} />
        <div>
          <div className="text-xs uppercase tracking-widest" style={{ color: THEME.gold }}>{done ? "Franchise champion" : weeks ? `Franchise race, week ${weeks} of ${reg}` : "Franchise race"}</div>
          {weeks ? <div className="display text-2xl">{leader.name} <span className="mono text-base" style={{ color: THEME.textMuted }}>{leader.w}-{leader.l}{leader.t ? `-${leader.t}` : ""}</span></div> : <div className="text-sm" style={{ color: THEME.textMuted }}>Standings fill in as soon as the first week is played.</div>}
          {!done && weeks > 0 && <div className="text-xs" style={{ color: THEME.textMuted }}>Currently leading. The best record after week {reg} is crowned franchise champion. Ties break on point differential, then points scored.</div>}
          {done && <div className="text-xs" style={{ color: THEME.textMuted }}>Best record of the regular season. Ties broken by point differential, then points scored.</div>}
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        {[["div", "By division"], ["conf", "By conference"], ["all", "Overall"]].map(([k, t]) => <button key={k} onClick={() => setView(k)} className="text-xs px-3 py-1.5 rounded" style={{ background: view === k ? THEME.gold : THEME.panel2, color: view === k ? "#1a1204" : THEME.textMuted, border: `1px solid ${THEME.border}` }}>{t}</button>)}
      </div>
      {groups.map(([t, list]) => <Table key={t} title={t} list={list} />)}
    </div>
  );
}

function Standings({ league }) {
  const st = computeStandings(league), P = league.settings.playoffTeams;
  const fr = useMemo(() => {
    const m = {}; TEAMS.forEach((t) => (m[t.name] = { name: t.name, conf: t.conference, div: t.division, w: 0, l: 0, pf: 0, pa: 0 }));
    league.results.forEach((r) => r.games.forEach((g) => { m[g.a].pf += g.sa; m[g.a].pa += g.sb; m[g.b].pf += g.sb; m[g.b].pa += g.sa; if (g.winner === g.a) { m[g.a].w++; m[g.b].l++; } else { m[g.b].w++; m[g.a].l++; } }));
    return Object.values(m).sort((a, b) => b.w - a.w || (b.pf - b.pa) - (a.pf - a.pa));
  }, [league.results.length]);
  return (
    <div>
      {league.champion != null && <div className="rounded-lg px-5 py-4 mb-4 flex items-center gap-3" style={{ background: THEME.gold + "20", border: `1px solid ${THEME.gold}` }}><Crown size={28} color={THEME.gold} /><div><div className="text-xs uppercase tracking-widest" style={{ color: THEME.gold }}>League champion</div><div className="display text-3xl"><MgrTag league={league} id={league.champion} bold /></div></div></div>}
      <Card title="League standings" pad={false}>
        <table className="w-full text-sm">
          <thead><tr style={{ background: THEME.panel2 }}><Th>#</Th><Th>Manager</Th><Th right>W</Th><Th right>L</Th><Th right>T</Th><Th right>Pct</Th><Th right>PF</Th><Th right>PA</Th><Th>Last 5</Th></tr></thead>
          <tbody>
            {st.map((r) => (
              <React.Fragment key={r.id}>
                <tr style={{ borderTop: r.rank === P + 1 ? `2px dashed ${THEME.gold}` : `1px solid ${THEME.border}`, opacity: r.rank > P ? 0.85 : 1 }}>
                  <td className="px-2 py-2 mono" style={{ color: r.rank <= P ? THEME.gold : THEME.textFaint }}>{r.rank}</td>
                  <td className="px-2 py-2 font-semibold"><MgrTag league={league} id={r.id} /></td>
                  <td className="px-2 py-2 text-right mono">{r.w}</td><td className="px-2 py-2 text-right mono">{r.l}</td><td className="px-2 py-2 text-right mono">{r.t}</td>
                  <td className="px-2 py-2 text-right mono">{r.gp ? r.pct.toFixed(3).replace(/^0/, "") : "—"}</td>
                  <td className="px-2 py-2 text-right mono font-bold">{fp1(r.pf)}</td><td className="px-2 py-2 text-right mono">{fp1(r.pa)}</td>
                  <td className="px-2 py-2 mono text-xs">{r.streak.slice(-5).map((x, i) => <span key={i} style={{ color: x === "W" ? THEME.teal : x === "L" ? THEME.red : THEME.textMuted }}>{x}</span>)}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-2 text-xs" style={{ color: THEME.textMuted }}>Top {P} advance. Ties break on total points scored. Dashed line is the playoff cut.</div>
      </Card>
      <FranchiseStandings league={league} />
    </div>
  );
}

// ============================= SCHEDULE =============================
const EVENTS_SORTED = [...EVENTS_DB].sort((a, b) => a.competitors - b.competitors || a.name.localeCompare(b.name));
function ScheduleEditor({ league, w, onSave, onClose }) {
  const cur = league.schedule.weeks[w].events;
  const [e1, setE1] = useState(cur[0] || "");
  const [e2, setE2] = useState(cur[1] || "");
  const [err, setErr] = useState("");
  const n1 = e1 ? EVENT_BY_NAME[e1].competitors : 0;
  const need = n1 && n1 < 11 ? 11 - n1 : 0;
  const second = need ? EVENTS_SORTED.filter((e) => e.competitors === need && e.name !== e1) : [];
  const names = [e1, need ? e2 : ""].filter(Boolean);
  const total = names.reduce((t, n) => t + EVENT_BY_NAME[n].competitors, 0);
  const valid = names.length > 0 && total === 11;
  const usedElsewhere = (n) => league.schedule.weeks.map((wk, i) => (i !== w && wk.events.includes(n) ? i + 1 : null)).filter(Boolean);
  const pickFirst = (v) => { setE1(v); setErr(""); const c = v ? EVENT_BY_NAME[v].competitors : 0; if (!c || c >= 11 || EVENT_BY_NAME[e2] == null || EVENT_BY_NAME[e2].competitors !== 11 - c) setE2(""); };
  const groups = [4, 5, 6, 7, 11];
  const info = (n) => { const ev = EVENT_BY_NAME[n]; const u = usedElsewhere(n); return <div className="text-xs mt-1" style={{ color: THEME.textMuted }}>{ev.description}{u.length ? <span style={{ color: THEME.gold }}> · Also scheduled in week {u.join(", ")}</span> : null}</div>; };
  return (
    <Modal title={`Week ${w + 1} events`} onClose={onClose}>
      <div className="text-sm mb-4" style={{ color: THEME.textMuted }}>Each franchise fields exactly 11 competitors per week: one 11-player event, or two events that add up to 11 (4 + 7 or 5 + 6).</div>
      <div className="text-xs uppercase tracking-wider mb-1" style={{ color: THEME.textMuted }}>Event 1</div>
      <Select value={e1} onChange={pickFirst} style={{ width: "100%" }}>
        <option value="">Choose an event</option>
        {groups.map((g) => <optgroup key={g} label={`${g} competitors`}>{EVENTS_SORTED.filter((e) => e.competitors === g).map((e) => <option key={e.name} value={e.name}>{e.name}</option>)}</optgroup>)}
      </Select>
      {e1 && info(e1)}
      <div className="text-xs uppercase tracking-wider mb-1 mt-4" style={{ color: THEME.textMuted }}>Event 2 {need ? `(needs exactly ${need} competitors)` : ""}</div>
      <Select value={need ? e2 : ""} onChange={(v) => { setE2(v); setErr(""); }} style={{ width: "100%", opacity: need ? 1 : 0.5 }}>
        <option value="">{need ? "Choose an event" : n1 === 11 ? "Not needed, this event uses all 11" : "Pick event 1 first"}</option>
        {second.map((e) => <option key={e.name} value={e.name}>{e.name}</option>)}
      </Select>
      {need && e2 ? info(e2) : null}
      <div className="mt-4 text-sm" style={{ color: valid ? THEME.teal : THEME.textMuted }}>{valid ? `Total ${total} competitors. Ready.` : names.length ? `Total ${total} of 11 competitors.` : ""}</div>
      {err && <div className="text-sm mt-2" style={{ color: THEME.red }}>{err}</div>}
      <div className="mt-4 flex justify-end gap-2"><Btn onClick={onClose}>Cancel</Btn><Btn kind="gold" disabled={!valid} onClick={() => { const r = onSave(names); if (r) setErr(r); }}>Save week {w + 1}</Btn></div>
    </Modal>
  );
}
function Schedule({ league, setLeague, myMgr, setMyMgr }) {
  const played = league.results.length, s = league.settings;
  const [edit, setEdit] = useState(null);
  const save = (w, names) => { const r = setWeekEvents(league, w, names); if (r.error) return r.error; setLeague(r.league); setEdit(null); return null; };
  return (
    <div>
      <Card title="Event schedule builder" right={<Btn small disabled={played >= league.schedule.weeks.length} onClick={() => askConfirm("Replace the events for every week that has not been played yet with a new random schedule?", () => setLeague(randomizeUnplayed(league)), "Randomize")}><Shuffle size={12} /> Randomize unplayed weeks</Btn>}>
        <div className="text-sm" style={{ color: THEME.textMuted }}>Choose which events are played each week with <b style={{ color: THEME.text }}>Edit</b>, for example week 1 Football, week 2 Battle Bots + Fencing Tournament. Weeks that are already played are locked. {s.byeEnabled ? `Each franchise rests one week in weeks ${s.byeStart} to ${s.byeEnd} (purple).` : ""}</div>
      </Card>
      <div className="flex items-center gap-3 mb-4"><MgrSelect league={league} value={myMgr} onChange={setMyMgr} /><span className="text-sm" style={{ color: THEME.textMuted }}>Showing this manager's matchups and results.</span></div>
      <Card pad={false}>
        <table className="w-full text-sm">
          <thead><tr style={{ background: THEME.panel2 }}><Th>Week</Th><Th>Events</Th><Th>Matchup</Th><Th right>Result</Th><Th /></tr></thead>
          <tbody>
            {league.schedule.weeks.map((wk, w) => {
              const isPo = w >= s.regWeeks, res = league.results[w];
              const mt = res ? res.matchups.find((m) => m.a === myMgr || m.b === myMgr) : mgrMatchupsForWeek(league, w).find((m) => m.a === myMgr || m.b === myMgr);
              const opp = mt ? (mt.a === myMgr ? mt.b : mt.a) : null;
              const mine = mt && res ? (mt.a === myMgr ? [mt.aPts, mt.bPts] : [mt.bPts, mt.aPts]) : null;
              const byes = wk.byes || [];
              return (
                <tr key={w} style={{ borderTop: `1px solid ${THEME.border}`, background: w === played ? THEME.gold + "10" : "transparent" }}>
                  <td className="px-2 py-2 mono">{w + 1}{isPo ? <span className="ml-1 text-[10px]" style={{ color: THEME.gold }}>PO</span> : null}{w + 1 === s.tradeDeadlineWeek ? <span className="ml-1 text-[10px]" style={{ color: THEME.red }}>TRADE DL</span> : null}</td>
                  <td className="px-2 py-2">
                    <div className="flex flex-wrap gap-1">{wk.events.map((e) => <span key={e} className="px-2 py-0.5 rounded text-[11px]" style={{ background: THEME.panel2, border: `1px solid ${THEME.border}` }}>{e}</span>)}</div>
                    {byes.length > 0 && <div className="text-[11px] mt-1" style={{ color: THEME.purple }}>BYE: {byes.join(", ")}</div>}
                  </td>
                  <td className="px-2 py-2">{opp != null ? <MgrTag league={league} id={opp} /> : <span style={{ color: THEME.textFaint }}>{isPo && !league.playoff ? "TBD" : isPo ? "No game" : "Bye"}</span>}</td>
                  <td className="px-2 py-2 text-right mono">{mine ? <span style={{ color: mine[0] > mine[1] ? THEME.teal : mine[0] < mine[1] ? THEME.red : THEME.text }}>{mine[0] > mine[1] ? "W" : mine[0] < mine[1] ? "L" : "T"} {fp1(mine[0])}–{fp1(mine[1])}</span> : ""}</td>
                  <td className="px-2 py-2 text-right whitespace-nowrap">{w >= played ? <span className="inline-flex gap-1.5"><Btn small kind="teal" onClick={() => setEdit(w)}>Edit</Btn><Btn small onClick={() => setLeague(rerollWeek(league, w))} title="Pick random events for this week"><Shuffle size={12} /> Random</Btn></span> : <span className="text-[11px]" style={{ color: THEME.textFaint }}>played</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      {edit != null && <ScheduleEditor league={league} w={edit} onSave={(names) => save(edit, names)} onClose={() => setEdit(null)} />}
    </div>
  );
}

// ============================= PLAYERS / FREE AGENTS =============================
function Players({ league, setLeague, myMgr }) {
  const [search, setSearch] = useState(""), [fran, setFran] = useState("all"), [avail, setAvail] = useState("all"), [sortKey, setSortKey] = useState("season");
  const [addFor, setAddFor] = useState(null), [dropPick, setDropPick] = useState(""), [msg, setMsg] = useState("");
  const owned = ownedMap(league), stats = useMemo(() => seasonStats(league), [league.results.length]);
  const upcoming = league.results.length < seasonWeeks(league) ? league.results.length : null;
  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return POOL.filter((p) => (fran === "all" || p.team === fran) && (!q || p.n.toLowerCase().includes(q)) && (avail === "all" || (avail === "fa" ? owned[p.n] == null : owned[p.n] != null)))
      .map((p) => ({ p, season: stats.tot[p.n] || 0, gp: stats.gp[p.n] || 0, last: stats.last[p.n] }))
      .sort((a, b) => sortKey === "tt" ? b.p.tt - a.p.tt : sortKey === "avg" ? (b.gp ? b.season / b.gp : -1) - (a.gp ? a.season / a.gp : -1) : sortKey === "n" ? a.p.n.localeCompare(b.p.n) : b.season - a.season || b.p.tt - a.p.tt).slice(0, 150);
  }, [search, fran, avail, sortKey, league.rosters, league.results.length]);
  const full = league.rosters[myMgr].length >= league.settings.rounds;
  const confirmAdd = () => {
    const r = league.waivers ? submitClaim(league, myMgr, addFor, dropPick || null) : addDrop(league, myMgr, addFor, full ? dropPick : null);
    if (r.error) { setMsg(r.error); return; }
    setLeague(r.league); setAddFor(null); setDropPick(""); setMsg("");
  };
  return (
    <div>
      <Card title="Competitors" right={<span className="text-xs" style={{ color: THEME.textMuted }}>Adding for <b style={{ color: THEME.text }}>{league.managers[myMgr].name}</b> (change on My Team)</span>} pad={false}>
        <div className="flex flex-wrap gap-2 p-3" style={{ borderBottom: `1px solid ${THEME.border}` }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="rounded px-3 py-1.5 text-sm" style={{ background: THEME.panel2, border: `1px solid ${THEME.border}`, color: THEME.text }} />
          <Select value={fran} onChange={setFran}><option value="all">All franchises</option>{TEAMS.map((t) => <option key={t.name} value={t.name}>{t.name}</option>)}</Select>
          <Select value={avail} onChange={setAvail}><option value="all">All</option><option value="fa">Free agents</option><option value="owned">Rostered</option></Select>
          <Select value={sortKey} onChange={setSortKey}><option value="season">Sort: Season FP</option><option value="avg">Sort: Avg FP</option><option value="tt">Sort: Rating</option><option value="n">Sort: Name</option></Select>
        </div>
        <div style={{ maxHeight: 560, overflowY: "auto" }}>
          <table className="w-full text-sm">
            <thead style={{ position: "sticky", top: 0, background: THEME.panel2 }}><tr><Th>Competitor</Th><Th>Franchise</Th><Th>Owner</Th><Th>This week</Th><Th right>Rtg</Th><Th right>Last</Th><Th right>Season</Th><Th /></tr></thead>
            <tbody>
              {rows.map(({ p, season, gp, last }) => (
                <tr key={p.n} style={{ borderTop: `1px solid ${THEME.border}` }}>
                  <td className="px-2 py-1.5 font-semibold"><PName n={p.n} /></td>
                  <td className="px-2 py-1.5 text-xs" style={{ color: THEME.textMuted }}>{p.team}</td>
                  <td className="px-2 py-1.5 text-xs">{owned[p.n] != null ? <MgrTag league={league} id={owned[p.n]} /> : <span style={{ color: THEME.teal }}>Free agent</span>}</td>
                  <td className="px-2 py-1.5 text-xs" style={{ color: THEME.gold }}>{upcoming != null ? (playsInWeek(league, upcoming, p.n).join(", ") || (isBye(league, upcoming, p.n) ? "BYE" : "")) : ""}</td>
                  <td className="px-2 py-1.5 text-right mono">{p.tt}</td>
                  <td className="px-2 py-1.5 text-right mono">{gp ? fp1(last) : "—"}</td>
                  <td className="px-2 py-1.5 text-right mono font-bold">{fp1(season)}</td>
                  <td className="px-2 py-1.5 text-right">{owned[p.n] == null && <Btn small kind="teal" onClick={() => { setAddFor(p.n); setMsg(""); }}><UserPlus size={12} /> {league.waivers ? "Claim" : "Add"}</Btn>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {addFor && (
        <Modal title={`Add ${addFor}`} onClose={() => setAddFor(null)}>
          <div className="text-sm mb-3">Adding to <b>{league.managers[myMgr].name}</b>.{full ? " Roster is full, so choose someone to drop." : ""}</div>
          {(full || league.waivers) && <Select value={dropPick} onChange={setDropPick} style={{ width: "100%" }}><option value="">{full ? "Choose a competitor to drop" : "No drop (roster has room)"}</option>{league.rosters[myMgr].map((n) => <option key={n} value={n}>{n}</option>)}</Select>}
          {msg && <div className="text-sm mt-2" style={{ color: THEME.red }}>{msg}</div>}
          <div className="mt-4 flex justify-end gap-2"><Btn onClick={() => setAddFor(null)}>Cancel</Btn><Btn kind="gold" disabled={full && !dropPick} onClick={confirmAdd}>Confirm</Btn></div>
        </Modal>
      )}
    </div>
  );
}

// ============================= TRADES =============================
function Trades({ league, setLeague }) {
  const [a, setA] = useState(0), [b, setB] = useState(1), [ga, setGa] = useState([]), [gb, setGb] = useState([]), [msg, setMsg] = useState("");
  const wkNow = league.results.length + 1, dl = league.settings.tradeDeadlineWeek;
  const toggle = (arr, set, n) => set(arr.includes(n) ? arr.filter((x) => x !== n) : [...arr, n]);
  const submit = () => { const r = doTrade(league, a, b, ga, gb); if (r.error) { setMsg(r.error); return; } setLeague(r.league); setGa([]); setGb([]); setMsg("Trade completed."); };
  const list = (id, sel, set) => (
    <div style={{ maxHeight: 300, overflowY: "auto" }}>
      {league.rosters[id].map((n) => <label key={n} className="flex items-center gap-2 py-1 text-sm cursor-pointer"><input type="checkbox" checked={sel.includes(n)} onChange={() => toggle(sel, set, n)} />{n}<span className="text-xs" style={{ color: THEME.textFaint }}>{POOL_BY_NAME[n].team} · {POOL_BY_NAME[n].tt}</span></label>)}
    </div>
  );
  const nm = (id) => league.managers[id] ? league.managers[id].name : "?";
  return (
    <div>
      <div className="rounded px-4 py-2 mb-4 text-sm" style={{ background: wkNow > dl ? THEME.red + "18" : THEME.teal + "15", color: wkNow > dl ? THEME.red : THEME.teal }}>{wkNow > dl ? `The trade deadline (week ${dl}) has passed.` : `Trades are open through week ${dl}. Currently week ${wkNow}.`}</div>
      <Card title="Propose and complete a trade">
        <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div><MgrSelect league={league} value={a} onChange={(v) => { setA(v); setGa([]); }} style={{ width: "100%", marginBottom: 8 }} />{list(a, ga, setGa)}</div>
          <div><MgrSelect league={league} value={b} onChange={(v) => { setB(v); setGb([]); }} style={{ width: "100%", marginBottom: 8 }} />{list(b, gb, setGb)}</div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="text-sm" style={{ color: msg === "Trade completed." ? THEME.teal : THEME.red }}>{msg}</div>
          <Btn kind="gold" onClick={submit}><ArrowLeftRight size={14} /> Execute trade ({ga.length} for {gb.length})</Btn>
        </div>
      </Card>
      <Card title="Transactions">
        {league.transactions.length ? [...league.transactions].reverse().map((t, i) => (
          <div key={i} className="text-sm py-1.5" style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <span className="mono text-xs mr-2" style={{ color: THEME.textFaint }}>Wk {t.week}</span>
            {t.type === "trade" ? <span><b>{nm(t.a)}</b> trades {t.giveA.join(", ")} to <b>{nm(t.b)}</b> for {t.giveB.join(", ")}</span>
              : t.type === "addDrop" ? <span><b>{nm(t.mgr)}</b> adds {t.add}{t.drop ? `, drops ${t.drop}` : ""}</span>
              : <span><b>{nm(t.mgr)}</b> drops {t.drop}</span>}
          </div>
        )) : <div className="text-sm" style={{ color: THEME.textMuted }}>No transactions yet.</div>}
      </Card>
    </div>
  );
}

// ============================= PLAYOFFS =============================
function Playoffs({ league }) {
  const po = league.playoff, s = league.settings, st = computeStandings(league);
  if (!po) {
    return (
      <Card title="Projected playoff field">
        <div className="text-sm mb-3" style={{ color: THEME.textMuted }}>Bracket is set after regular season week {s.regWeeks}. Current top {s.playoffTeams}:</div>
        {st.slice(0, s.playoffTeams).map((r) => <div key={r.id} className="flex items-center justify-between py-1 text-sm" style={{ borderBottom: `1px solid ${THEME.border}` }}><span><span className="mono text-xs mr-2" style={{ color: THEME.gold }}>{r.rank}</span><MgrTag league={league} id={r.id} /></span><span className="mono">{r.w}-{r.l}-{r.t} · {fp1(r.pf)}</span></div>)}
      </Card>
    );
  }
  const seedOf = (id) => po.seeds.indexOf(id) + 1;
  const cell = (id, pts, win) => (
    <div className="flex items-center justify-between gap-3 px-3 py-1.5" style={{ opacity: id == null ? 0.4 : 1 }}>
      <span className={win ? "font-bold" : ""}>{id == null ? "TBD" : <><span className="mono text-xs mr-1.5" style={{ color: THEME.textFaint }}>{seedOf(id)}</span><MgrTag league={league} id={id} /></>}</span>
      <span className="mono font-bold" style={{ color: win ? THEME.gold : THEME.text }}>{pts == null ? "" : fp1(pts)}</span>
    </div>
  );
  const names = (R, i) => (i === R - 1 ? "Championship" : i === R - 2 ? "Semifinals" : i === R - 3 ? "Quarterfinals" : `Round ${i + 1}`);
  return (
    <div>
      {league.champion != null && <div className="rounded-lg px-5 py-4 mb-4 flex items-center gap-3" style={{ background: THEME.gold + "20", border: `1px solid ${THEME.gold}` }}><Crown size={28} color={THEME.gold} /><div className="display text-3xl"><MgrTag league={league} id={league.champion} bold /> <span style={{ color: THEME.gold }}>· CHAMPION</span></div></div>}
      <div className="flex gap-5" style={{ overflowX: "auto", paddingBottom: 8 }}>
        {po.rounds.map((rd, ri) => (
          <div key={ri} style={{ minWidth: 250 }}>
            <div className="display text-base mb-1">{names(po.rounds.length, ri).toUpperCase()}</div>
            <div className="text-[11px] mb-2" style={{ color: THEME.textMuted }}>Week{rd.weeks.length > 1 ? "s" : ""} {rd.weeks.map((w) => w + 1).join(" + ")}{rd.weeks.length > 1 ? " (combined)" : ""}</div>
            {rd.matches.map((m, mi) => {
              const bye = (m.a == null) !== (m.b == null) && ri === 0;
              return (
                <div key={mi} className="rounded mb-3" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
                  {cell(m.a, m.aPts, m.winner != null && m.winner === m.a)}
                  <div style={{ borderTop: `1px solid ${THEME.border}` }} />
                  {cell(m.b, m.bPts, m.winner != null && m.winner === m.b)}
                  {bye && <div className="px-3 pb-1 text-[10px] uppercase tracking-wider" style={{ color: THEME.textFaint }}>First-round bye</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================= SCORING BALANCE (scaling + calibration report) =============================
function downloadText(name, text, mime) {
  try {
    const blob = new Blob([text], { type: mime || "text/plain" });
    const url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000); return true;
  } catch (e) { return false; }
}
function CalibrationModal({ rep, duration, runs, onClose, onApply, canApply }) {
  const [sortKey, setSortKey] = useState("mean");
  const [dir, setDir] = useState(-1);
  const pick = { name: (r) => r.name, size: (r) => r.comp, mean: (r) => r.raw.mean, sd: (r) => r.raw.sd, p95: (r) => r.raw.p95, max: (r) => r.raw.max, neg: (r) => r.raw.neg, lmean: (r) => r.lg.mean, lsd: (r) => r.lg.sd, lp95: (r) => r.lg.p95, lmax: (r) => r.lg.max, flags: (r) => r.flags.length };
  const rows = [...rep.rows].sort((a, b) => { const x = pick[sortKey](a), y = pick[sortKey](b); return (typeof x === "string" ? x.localeCompare(y) : x - y) * dir; });
  const rawMeans = rep.rows.map((r) => r.raw.mean), lgMeans = rep.rows.map((r) => r.lg.mean);
  const spread = (a) => Math.max(...a) / Math.max(0.1, Math.min(...a));
  const hdr = (k, label, right = true) => <Th right={right} active={sortKey === k} onClick={() => { if (sortKey === k) setDir(-dir); else { setSortKey(k); setDir(k === "name" ? 1 : -1); } }}>{label}{sortKey === k ? (dir < 0 ? " ▼" : " ▲") : ""}</Th>;
  const flagColor = (f) => (f === "runs hot" || f === "heavy tail" || f === "errors" ? THEME.red : f === "runs cold" ? THEME.teal : THEME.gold);
  const f1 = (x) => (Math.round(x * 10) / 10).toFixed(1);
  return (
    <Modal title="Calibration report" onClose={onClose} wide>
      <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
        {[["Events measured", rep.rows.length, `${runs} runs each, ${duration} length`], ["Raw averages", `${f1(Math.min(...rawMeans))} to ${f1(Math.max(...rawMeans))}`, `${spread(rawMeans).toFixed(1)}x gap between hottest and coldest event`], ["League averages", `${f1(Math.min(...lgMeans))} to ${f1(Math.max(...lgMeans))}`, `${spread(lgMeans).toFixed(2)}x gap after scaling`], ["Needs attention", rep.rows.filter((r) => r.flags.some((f) => f !== "runs hot" && f !== "runs cold")).length, "swingy, flat or heavy-tailed even after scaling"]].map(([k, v, h]) => (
          <div key={k} className="rounded p-3" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
            <div className="text-[11px] uppercase tracking-wider" style={{ color: THEME.textMuted }}>{k}</div>
            <div className="display text-2xl" style={{ color: THEME.gold }}>{v}</div>
            <div className="text-[11px]" style={{ color: THEME.textFaint }}>{h}</div>
          </div>
        ))}
      </div>
      <div className="text-xs mb-3" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
        Raw columns are the points a single competitor earns in the box score. League columns are what a manager's lineup actually receives after standardizing: each event is centered on {rep.target} points per competitor and its spread is nudged toward {rep.spread}. Flags: <b>runs hot / cold</b> = raw average far above / below the typical event, <b>swingy</b> = results vary wildly from game to game, <b>flat</b> = almost everyone scores the same, <b>heavy tail</b> = rare freak scores.
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {canApply && <Btn kind="gold" onClick={onApply}><Check size={14} /> Use these measured scales for unplayed weeks</Btn>}
        <Btn onClick={() => downloadText(`fffs-calibration-${duration}.csv`, calibrationCsv(rep, duration), "text/csv")}><Download size={14} /> Download CSV</Btn>
      </div>
      <div className="overflow-x-auto rounded" style={{ border: `1px solid ${THEME.border}` }}>
        <table className="w-full text-sm mono" style={{ minWidth: 980 }}>
          <thead style={{ background: THEME.panel }}>
            <tr>{hdr("name", "Event", false)}{hdr("size", "Size")}{hdr("mean", "Raw avg")}{hdr("sd", "Raw SD")}{hdr("p95", "Raw p95")}{hdr("max", "Raw max")}{hdr("neg", "Cat %")}{hdr("lmean", "League avg")}{hdr("lsd", "League SD")}{hdr("lp95", "League p95")}{hdr("lmax", "League max")}{hdr("flags", "Flags", false)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} style={{ borderTop: `1px solid ${THEME.border}` }}>
                <td className="px-2 py-1.5 font-sans font-semibold" style={{ fontFamily: "'Oswald', sans-serif" }}>{r.name}</td>
                <td className="px-2 py-1.5 text-right">{r.comp}</td>
                <td className="px-2 py-1.5 text-right">{f1(r.raw.mean)}</td>
                <td className="px-2 py-1.5 text-right">{f1(r.raw.sd)}</td>
                <td className="px-2 py-1.5 text-right">{f1(r.raw.p95)}</td>
                <td className="px-2 py-1.5 text-right">{f1(r.raw.max)}</td>
                <td className="px-2 py-1.5 text-right">{f1(r.raw.neg * 100)}</td>
                <td className="px-2 py-1.5 text-right font-bold" style={{ color: THEME.gold }}>{f1(r.lg.mean)}</td>
                <td className="px-2 py-1.5 text-right">{f1(r.lg.sd)}</td>
                <td className="px-2 py-1.5 text-right">{f1(r.lg.p95)}</td>
                <td className="px-2 py-1.5 text-right">{f1(r.lg.max)}</td>
                <td className="px-2 py-1.5" style={{ fontFamily: "'Oswald', sans-serif" }}>{r.flags.map((f) => <span key={f} className="inline-block mr-1 px-1.5 rounded text-[10px] uppercase tracking-wide" style={{ background: flagColor(f) + "22", color: flagColor(f), border: `1px solid ${flagColor(f)}55` }}>{f}</span>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
function ScalingCard({ league, setLeague }) {
  const sc = league.scale, dur = league.settings.duration;
  const [runs, setRuns] = useState(50);
  const [busy, setBusy] = useState(false), [prog, setProg] = useState(0);
  const [rep, setRep] = useState(null), [open, setOpen] = useState(false);
  const played = league.results.length;
  const go = async () => {
    setBusy(true); setProg(0);
    try { const r = await runCalibrationAsync(runs, dur, setProg); setRep(r); setOpen(true); } catch (e) { askConfirm("Calibration failed: " + (e && e.message)); }
    setBusy(false);
  };
  const setScale = (v) => setLeague({ ...league, scale: v });
  return (
    <Card title="Scoring balance">
      <div className="text-sm mb-3" style={{ lineHeight: 1.5 }}>
        Different events hand out very different raw points (an Arm Wrestling bracket pays several times what Dance Off does). <b>Event point scaling</b> standardizes every event so a typical competitor earns {SCALE_TARGET} league points whatever the event, which keeps the weekly schedule from deciding matchups. Raw box scores never change.
      </div>
      {!sc ? (
        <div className="text-sm mb-3" style={{ color: THEME.textMuted }}>This league started before scaling existed, so its {played} played week{played === 1 ? "" : "s"} use raw points. You can switch scaling on for the weeks that are still to be played.<div className="mt-2"><Btn kind="gold" onClick={() => setScale(defaultScaleSetting())}>Turn on scaling for unplayed weeks</Btn></div></div>
      ) : (
        <div className="mb-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer mb-1"><input type="checkbox" checked={!!sc.on} onChange={(e) => setScale({ ...sc, on: e.target.checked })} /> <b>Event point scaling</b> <span style={{ color: THEME.textMuted }}>(applies to weeks not yet played{played ? `; weeks 1 to ${played} keep the points they already earned` : ""})</span></label>
          <div className="text-xs" style={{ color: THEME.textMuted }}>Scale table: {sc.table ? `custom, ${sc.src}` : "built-in (measured over 300 runs per event for each event length)"}. {sc.table && <button className="underline" onClick={() => setScale({ ...sc, table: null, src: "built-in" })}>Reset to built-in</button>}</div>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs" style={{ color: THEME.textMuted }}>Runs per event</span>
        <Select value={runs} onChange={(v) => setRuns(+v)}>{[25, 50, 100, 200].map((n) => <option key={n} value={n}>{n}</option>)}</Select>
        <Btn kind="gold" disabled={busy} onClick={go}><Zap size={14} /> {busy ? `Simulating ${Math.round(prog * 100)}%` : "Run calibration report"}</Btn>
        {rep && !busy && <Btn onClick={() => setOpen(true)}>Reopen last report</Btn>}
      </div>
      {busy && <div className="mt-3 h-1.5 rounded" style={{ background: THEME.panel2 }}><div className="h-1.5 rounded" style={{ width: `${Math.round(prog * 100)}%`, background: THEME.gold }} /></div>}
      {rep && open && !busy && <CalibrationModal rep={rep} duration={dur} runs={runs} canApply={!!sc} onClose={() => setOpen(false)} onApply={() => { setScale({ ...(sc || defaultScaleSetting()), on: true, table: scaleTableFromReport(rep), src: `measured ${runs} runs per event, ${new Date().toLocaleDateString()}` }); setOpen(false); }} />}
    </Card>
  );
}


// ============================= DRAFT GRADES / WAIVERS / PREVIEWS / RECAP / STUDIO =============================
const gradeColor = (g) => (g[0] === "A" ? THEME.teal : g[0] === "B" ? THEME.gold : g[0] === "C" ? "#e8a24a" : THEME.red);
function GradeBadge({ g, big }) {
  return <span className="display inline-block text-center rounded" style={{ minWidth: big ? 56 : 38, padding: big ? "4px 10px" : "1px 6px", fontSize: big ? 30 : 16, color: gradeColor(g), border: `1px solid ${gradeColor(g)}`, background: gradeColor(g) + "18" }}>{g}</span>;
}
function DraftGradesView({ league }) {
  const [open, setOpen] = useState(null);
  const rows = useMemo(() => draftGrades(league), [league.draft.picks.length]);
  const st = league.results.length ? computeStandings(league) : null;
  const act = {}; if (st) st.forEach((r) => (act[r.id] = r));
  return (
    <Card title="Draft grades" pad={false} right={<span className="text-xs" style={{ color: THEME.textMuted }}>Grades weigh projected starter points, bench depth, value versus draft slot and franchise stacking.</span>}>
      <table className="w-full text-sm">
        <thead><tr style={{ background: THEME.panel2 }}><Th>#</Th><Th>Manager</Th><Th>Grade</Th><Th right>Starters / wk</Th><Th right>Depth / wk</Th><Th right>Pick value</Th><Th right>Most from one franchise</Th>{st && <Th right>Actual rank</Th>}</tr></thead>
        <tbody>
          {rows.map((r) => (
            <React.Fragment key={r.id}>
              <tr onClick={() => setOpen(open === r.id ? null : r.id)} className="cursor-pointer" style={{ borderTop: `1px solid ${THEME.border}` }}>
                <td className="px-3 py-2 mono text-xs" style={{ color: THEME.textFaint }}>{r.rank}</td>
                <td className="px-3 py-2"><MgrTag league={league} id={r.id} /></td>
                <td className="px-3 py-2"><GradeBadge g={r.grade} /></td>
                <td className="px-3 py-2 text-right mono">{fp1(r.strength)}</td>
                <td className="px-3 py-2 text-right mono">{fp1(r.depth)}</td>
                <td className="px-3 py-2 text-right mono" style={{ color: r.value >= 0 ? THEME.teal : THEME.red }}>{r.value >= 0 ? "+" : ""}{fp1(r.value)}</td>
                <td className="px-3 py-2 text-right text-xs" style={{ color: r.stack >= 3 ? THEME.gold : THEME.textMuted }}>{r.stack} ({r.stackTeam})</td>
                {st && <td className="px-3 py-2 text-right mono">{act[r.id] ? `#${act[r.id].rank}` : ""}</td>}
              </tr>
              {open === r.id && (
                <tr><td colSpan={st ? 8 : 7} className="px-4 py-3" style={{ background: THEME.panel2 }}>
                  <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <div className="text-sm">
                      <div className="mb-1" style={{ color: THEME.teal }}>Best pick: <b>{r.best.player}</b> at #{r.best.pick + 1} ({r.best.proj.toFixed(1)} projected, {r.best.val >= 0 ? "+" : ""}{r.best.val.toFixed(1)} vs slot)</div>
                      <div style={{ color: THEME.red }}>Biggest reach: <b>{r.worst.player}</b> at #{r.worst.pick + 1} ({r.worst.proj.toFixed(1)} projected, {r.worst.val.toFixed(1)} vs slot)</div>
                      {r.stack >= 3 && <div className="mt-1 text-xs" style={{ color: THEME.gold }}>{r.stack} players from {r.stackTeam} share a bye week and a schedule.</div>}
                    </div>
                    <div className="text-xs grid gap-x-4" style={{ gridTemplateColumns: "1fr 1fr" }}>{r.picks.map((p) => <div key={p.pick} className="flex justify-between py-0.5"><span><span className="mono mr-1" style={{ color: THEME.textFaint }}>{p.round}</span>{p.player}</span><span className="mono" style={{ color: THEME.textMuted }}>{p.proj.toFixed(1)}</span></div>)}</div>
                  </div>
                </td></tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
function GradesTab({ league }) { return <DraftGradesView league={league} />; }

function WinBar({ pa, a, b }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1"><span style={{ color: a }}>{Math.round(pa * 100)}%</span><span style={{ color: b }}>{Math.round((1 - pa) * 100)}%</span></div>
      <div className="flex rounded overflow-hidden" style={{ height: 8, background: THEME.border }}><div style={{ width: `${pa * 100}%`, background: a }} /><div style={{ width: `${(1 - pa) * 100}%`, background: b }} /></div>
    </div>
  );
}
function MatchupPreviews({ league, week, myMgr }) {
  const [open, setOpen] = useState(null);
  const ms = mgrMatchupsForWeek(league, week);
  const rows = useMemo(() => ms.map((m) => ({ m, pv: matchupPreview(league, m, week) })), [week, league.results.length, league.rosters, league.lineups]);
  if (!rows.length) return null;
  return (
    <Card title="Matchup previews" right={<span className="text-xs" style={{ color: THEME.textMuted }}>Projected league points from simulated averages, adjusted for each competitor's events this week and byes.</span>} pad={false}>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))" }}>
        {rows.map(({ m, pv }, i) => {
          const ca = league.managers[m.a].color, cb = league.managers[m.b].color, mine = m.a === myMgr || m.b === myMgr;
          return (
            <div key={i} className="px-4 py-3" style={{ borderBottom: `1px solid ${THEME.border}`, borderRight: `1px solid ${THEME.border}`, background: mine ? THEME.gold + "0d" : "transparent" }}>
              <div className="flex justify-between items-center mb-1"><span className="font-semibold"><MgrTag league={league} id={m.a} /></span><span className="mono text-lg" style={{ color: THEME.gold }}>{fp1(pv.A.total)}</span></div>
              <div className="flex justify-between items-center mb-2"><span className="font-semibold"><MgrTag league={league} id={m.b} /></span><span className="mono text-lg" style={{ color: THEME.gold }}>{fp1(pv.B.total)}</span></div>
              <WinBar pa={pv.pa} a={ca} b={cb} />
              <div className="text-xs mt-2" style={{ color: THEME.textMuted }}>{pv.edges.slice(0, 3).map((e, k) => <div key={k}>{e}</div>)}</div>
              <button className="text-xs mt-1" style={{ color: THEME.teal }} onClick={() => setOpen(open === i ? null : i)}>{open === i ? "Hide lineups" : "Show lineups"}</button>
              {open === i && (
                <div className="grid gap-3 mt-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  {[pv.A, pv.B].map((X, k) => <div key={k} className="text-xs">{X.rows.map((r) => <div key={r.n} className="flex justify-between py-0.5"><span title={r.ev}><PName n={r.n} />{r.bye ? <b style={{ color: THEME.red }}> BYE</b> : null}</span><span className="mono" style={{ color: THEME.textMuted }}>{r.exp.toFixed(1)}</span></div>)}</div>)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function WaiversTab({ league, setLeague, myMgr }) {
  const [claimFor, setClaimFor] = useState(null), [dropPick, setDropPick] = useState(""), [msg, setMsg] = useState(""), [search, setSearch] = useState(""), [sort, setSort] = useState("proj");
  const W = league.waivers; const owned = ownedMap(league), stats = useMemo(() => seasonStats(league), [league.results.length]);
  if (!W) return (
    <Card title="Waiver wire"><div className="text-sm mb-3" style={{ color: THEME.textMuted }}>This league uses instant free-agent adds. Turn on waivers to use priority claims that are processed before each week is simulated.</div><Btn kind="gold" onClick={() => setLeague({ ...league, waivers: defaultWaivers(league) })}>Enable waivers</Btn></Card>
  );
  const mine = W.claims.filter((c) => c.mgr === myMgr), ros = league.rosters[myMgr], full = ros.length >= league.settings.rounds;
  const rows = POOL.filter((p) => owned[p.n] == null && (!search.trim() || p.n.toLowerCase().includes(search.trim().toLowerCase()))).map((p) => {
    const rec = league.results.slice(-3).map((r) => r.playerFp[p.n]).filter((v) => v != null);
    return { p, proj: pMean(p.n), hot: rec.length ? rec.reduce((a, b) => a + b, 0) / rec.length : null, season: stats.tot[p.n] || 0 };
  }).sort((a, b) => (sort === "hot" ? (b.hot == null ? -1 : b.hot) - (a.hot == null ? -1 : a.hot) : b.proj - a.proj)).slice(0, 60);
  const submit = () => { const r = submitClaim(league, myMgr, claimFor, dropPick || null); if (r.error) { setMsg(r.error); return; } setLeague(r.league); setClaimFor(null); setDropPick(""); setMsg(""); };
  const nextWeek = league.results.length + 1;
  return (
    <div>
      <div className="grid gap-4" style={{ gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)" }}>
        <Card title="Free agents" pad={false} right={<span className="text-xs" style={{ color: THEME.textMuted }}>Claiming for <b style={{ color: THEME.text }}>{league.managers[myMgr].name}</b></span>}>
          <div className="flex gap-2 p-3" style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="rounded px-3 py-1.5 text-sm flex-1" style={{ background: THEME.panel2, border: `1px solid ${THEME.border}`, color: THEME.text }} />
            <Select value={sort} onChange={setSort}><option value="proj">Sort: Projection</option><option value="hot">Sort: Last 3 weeks</option></Select>
          </div>
          <div style={{ maxHeight: 520, overflowY: "auto" }}>
            <table className="w-full text-sm"><thead style={{ position: "sticky", top: 0, background: THEME.panel2 }}><tr><Th>Competitor</Th><Th>Franchise</Th><Th right>Proj</Th><Th right>L3 avg</Th><Th right>Season</Th><Th /></tr></thead>
              <tbody>{rows.map(({ p, proj, hot, season }) => (
                <tr key={p.n} style={{ borderTop: `1px solid ${THEME.border}` }}>
                  <td className="px-2 py-1.5 font-semibold"><PName n={p.n} /></td><td className="px-2 py-1.5 text-xs" style={{ color: THEME.textMuted }}>{p.team}</td>
                  <td className="px-2 py-1.5 text-right mono" style={{ color: THEME.gold }}>{proj.toFixed(1)}</td>
                  <td className="px-2 py-1.5 text-right mono">{hot == null ? "—" : fp1(hot)}</td>
                  <td className="px-2 py-1.5 text-right mono">{fp1(season)}</td>
                  <td className="px-2 py-1.5 text-right"><Btn small kind="teal" disabled={mine.some((c) => c.add === p.n)} onClick={() => { setClaimFor(p.n); setMsg(""); setDropPick(""); }}><UserPlus size={12} /> Claim</Btn></td>
                </tr>))}
                {!rows.length && <tr><td colSpan={6} className="p-6 text-center" style={{ color: THEME.textMuted }}>No free agents match.</td></tr>}
              </tbody></table>
          </div>
        </Card>
        <div>
          <Card title={`Your claims (processed before week ${nextWeek})`}>
            {mine.map((c, i) => (
              <div key={c.id} className="flex justify-between items-center text-sm py-1"><span><span className="mono text-xs mr-2" style={{ color: THEME.textFaint }}>{i + 1}</span>Add <b>{c.add}</b>{c.drop ? <span style={{ color: THEME.textMuted }}>, drop {c.drop}</span> : null}</span>
                <span className="flex gap-1"><Btn small onClick={() => setLeague(moveClaim(league, c.id, -1))}>↑</Btn><Btn small onClick={() => setLeague(moveClaim(league, c.id, 1))}>↓</Btn><Btn small onClick={() => setLeague(cancelClaim(league, c.id))}><X size={12} /></Btn></span></div>
            ))}
            {!mine.length && <div className="text-sm" style={{ color: THEME.textMuted }}>No pending claims. If two managers want the same player, the one higher in priority gets him. Up to {WAIVER_CAP} claims can succeed per week.</div>}
          </Card>
          <Card title="Waiver priority">
            <div className="text-xs mb-2" style={{ color: THEME.textMuted }}>First in line wins ties. A successful claim sends the manager to the back.</div>
            {W.priority.map((id, i) => <div key={id} className="flex items-center text-sm py-0.5"><span className="mono text-xs w-6" style={{ color: THEME.textFaint }}>{i + 1}</span><MgrTag league={league} id={id} />{W.claims.some((c) => c.mgr === id) && <span className="ml-2 text-[10px]" style={{ color: THEME.gold }}>{W.claims.filter((c) => c.mgr === id).length} pending</span>}</div>)}
          </Card>
          <Card title="Recent results">
            {[...W.log].reverse().slice(0, 14).map((x, i) => <div key={i} className="text-xs py-1" style={{ color: x.ok ? THEME.text : THEME.textMuted }}>Wk {x.week} · {league.managers[x.mgr].name}: {x.ok ? <b style={{ color: THEME.teal }}>claimed {x.add}</b> : <span>{x.add} failed ({x.why})</span>}{x.ok && x.drop ? `, dropped ${x.drop}` : ""}</div>)}
            {!W.log.length && <div className="text-sm" style={{ color: THEME.textMuted }}>Nothing processed yet.</div>}
          </Card>
        </div>
      </div>
      {claimFor && (
        <Modal title={`Claim ${claimFor}`} onClose={() => setClaimFor(null)}>
          <div className="text-sm mb-3">Claim for <b>{league.managers[myMgr].name}</b>, projected {pMean(claimFor).toFixed(1)} per week.{full ? " Your roster is full, so a drop is required." : ""}</div>
          <Select value={dropPick} onChange={setDropPick} style={{ width: "100%" }}><option value="">{full ? "Choose a competitor to drop" : "No drop (roster has room)"}</option>{ros.map((n) => <option key={n} value={n}>{n} ({pMean(n).toFixed(1)})</option>)}</Select>
          {msg && <div className="text-sm mt-2" style={{ color: THEME.red }}>{msg}</div>}
          <div className="mt-4 flex justify-end gap-2"><Btn onClick={() => setClaimFor(null)}>Cancel</Btn><Btn kind="gold" disabled={full && !dropPick} onClick={submit}>Submit claim</Btn></div>
        </Modal>
      )}
    </div>
  );
}

function RecapView({ league, week }) {
  const rc = useMemo(() => weekRecap(league, week), [week, league.results.length]);
  const [copied, setCopied] = useState("");
  if (!rc) return <div className="text-sm" style={{ color: THEME.textMuted }}>This week has not been played yet.</div>;
  const copy = () => { try { navigator.clipboard.writeText(rc.text).then(() => setCopied("Copied"), () => setCopied("Copy failed")); } catch (e) { setCopied("Copy failed"); } };
  return (
    <Card title={`Week ${rc.week} recap`} right={<Btn small onClick={copy}>{copied || "Copy as text"}</Btn>}>
      <div className="display text-2xl mb-4" style={{ color: THEME.gold }}>{rc.headline.toUpperCase()}</div>
      {rc.sections.filter((s) => s.items.length).map((s) => (
        <div key={s.h} className="mb-4"><div className="text-[11px] uppercase tracking-[0.2em] mb-1" style={{ color: THEME.textMuted }}>{s.h}</div>{s.items.map((it, i) => <div key={i} className="text-sm py-0.5">{it}</div>)}</div>
      ))}
    </Card>
  );
}
function RecapTab({ league }) {
  const played = league.results.length;
  const [week, setWeek] = useState(Math.max(0, played - 1));
  useEffect(() => { setWeek(Math.max(0, played - 1)); }, [played]);
  if (!played) return <Card title="Weekly recap"><div className="text-sm" style={{ color: THEME.textMuted }}>Sim a week to see its recap.</div></Card>;
  return (
    <div>
      <div className="flex items-center gap-2 mb-4"><Btn small disabled={week <= 0} onClick={() => setWeek(week - 1)}><ChevronLeft size={14} /></Btn><div className="display text-2xl px-2">WEEK {week + 1}</div><Btn small disabled={week >= played - 1} onClick={() => setWeek(week + 1)}><ChevronRight size={14} /></Btn></div>
      <RecapView league={league} week={week} />
    </div>
  );
}

function CountUp({ to, ms = 900 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, t0 = null; const step = (t) => { if (t0 == null) t0 = t; const k = Math.min(1, (t - t0) / ms); setV(to * (1 - Math.pow(1 - k, 3))); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{fp1(v)}</>;
}
function StudioScreen({ league, onClose, onSim, busy }) {
  const played = league.results.length, total = seasonWeeks(league);
  const week = Math.max(0, played - 1), res = league.results[week];
  const panels = ["scores", "standings", "performers", "preview", "recap"].filter((p) => (p === "preview" ? played < total && mgrMatchupsForWeek(league, played).length > 0 : p === "recap" || p === "performers" ? !!res : true));
  const [idx, setIdx] = useState(0), [paused, setPaused] = useState(false), [tick, setTick] = useState(0);
  const cur = panels[idx % panels.length];
  useEffect(() => { setIdx(0); }, [played]);
  useEffect(() => { if (paused) return undefined; const t = setInterval(() => setIdx((i) => (i + 1) % panels.length), 14000); return () => clearInterval(t); }, [paused, panels.length]);
  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onClose(); else if (e.key === "ArrowRight") setIdx((i) => (i + 1) % panels.length); else if (e.key === "ArrowLeft") setIdx((i) => (i + panels.length - 1) % panels.length); else if (e.key === " ") { e.preventDefault(); setPaused((p) => !p); } };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [panels.length]);
  const owned = ownedMap(league), nm = (id) => league.managers[id];
  const st = computeStandings(league);
  const fs = () => { try { const el = document.documentElement; if (document.fullscreenElement) document.exitFullscreen(); else el.requestFullscreen(); } catch (e) { /* ignore */ } };
  const title = { scores: res ? `WEEK ${week + 1} FINAL` : "SEASON PREVIEW", standings: "STANDINGS", performers: "TOP PERFORMERS", preview: `WEEK ${played + 1} PREVIEW`, recap: `WEEK ${week + 1} RECAP` }[cur];
  let content = null;
  if (cur === "scores") {
    const ms = res ? res.matchups : mgrMatchupsForWeek(league, played).map((m) => ({ ...m, aPts: null, bPts: null }));
    content = (
      <div className="grid gap-5" style={{ height: "100%", gridAutoRows: "1fr", gridTemplateColumns: `repeat(${ms.length > 4 ? 3 : 2}, minmax(0,1fr))` }}>
        {ms.map((m, i) => { const aw = m.aPts != null && m.aPts > m.bPts, bw = m.aPts != null && m.bPts > m.aPts; return (
          <div key={i} className="rounded-xl px-6 py-4 flex flex-col justify-center" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
            {[[m.a, m.aPts, aw], [m.b, m.bPts, bw]].map(([id, pts, w]) => (
              <div key={id} className="flex items-center justify-between py-2"><span className="display" style={{ fontSize: 30, color: w ? THEME.text : THEME.textMuted }}><Dot color={nm(id).color} size={16} /> {nm(id).name.toUpperCase()}</span><span className="display" style={{ fontSize: 44, color: w ? THEME.gold : THEME.textMuted }}>{pts == null ? "—" : <CountUp to={pts} />}</span></div>
            ))}
          </div>); })}
      </div>
    );
  } else if (cur === "standings") {
    const top = st.slice(0, 12), max = Math.max(...top.map((r) => r.pf), 1);
    content = (
      <div className="grid gap-x-10" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {top.map((r) => (
          <div key={r.id} className="flex items-center py-2" style={{ borderBottom: `1px solid ${THEME.border}`, opacity: r.rank > league.settings.playoffTeams ? 0.65 : 1 }}>
            <span className="display w-12" style={{ fontSize: 30, color: THEME.gold }}>{r.rank}</span>
            <span className="display flex-1" style={{ fontSize: 28 }}><Dot color={nm(r.id).color} size={14} /> {nm(r.id).name.toUpperCase()}</span>
            <span className="mono text-2xl mr-6">{r.w}-{r.l}{r.t ? `-${r.t}` : ""}</span><span className="mono text-xl w-28 text-right" style={{ color: THEME.textMuted }}>{fp1(r.pf)}</span>
          </div>))}
      </div>
    );
  } else if (cur === "performers") {
    const all = Object.entries(res.playerFp).map(([n, v]) => ({ n, v })).sort((a, b) => b.v - a.v).slice(0, 10);
    const evOf = {}; res.games.forEach((g) => Object.keys(g.summary.boxScore).forEach((n) => (evOf[n] = g.ev)));
    content = (
      <div>{all.map((x, i) => (
        <div key={x.n} className="flex items-center py-2" style={{ borderBottom: `1px solid ${THEME.border}` }}>
          <span className="display w-14" style={{ fontSize: 32, color: i === 0 ? THEME.gold : THEME.textMuted }}>{i + 1}</span>
          <span className="display flex-1" style={{ fontSize: 30 }}>{x.n.toUpperCase()}<span className="text-base ml-3" style={{ color: THEME.textMuted, fontFamily: "Oswald" }}>{evOf[x.n]}</span></span>
          <span className="text-xl mr-8" style={{ color: THEME.textMuted }}>{owned[x.n] != null ? nm(owned[x.n]).name : "Free agent"}</span>
          <span className="display" style={{ fontSize: 36, color: THEME.gold }}>{fp1(x.v)}</span>
        </div>))}</div>
    );
  } else if (cur === "preview") {
    const ms = mgrMatchupsForWeek(league, played);
    content = (
      <div className="grid gap-5" style={{ height: "100%", gridAutoRows: "1fr", gridTemplateColumns: `repeat(${ms.length > 4 ? 3 : 2}, minmax(0,1fr))` }}>
        {ms.map((m, i) => { const pv = matchupPreview(league, m, played); return (
          <div key={i} className="rounded-xl px-6 py-4 flex flex-col justify-center" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
            <div className="flex justify-between display" style={{ fontSize: 26 }}><span>{nm(m.a).name.toUpperCase()}</span><span style={{ color: THEME.gold }}>{fp1(pv.A.total)}</span></div>
            <div className="flex justify-between display mb-3" style={{ fontSize: 26 }}><span>{nm(m.b).name.toUpperCase()}</span><span style={{ color: THEME.gold }}>{fp1(pv.B.total)}</span></div>
            <WinBar pa={pv.pa} a={nm(m.a).color} b={nm(m.b).color} />
          </div>); })}
      </div>
    );
  } else if (cur === "recap") {
    const rc = weekRecap(league, week);
    content = rc ? (
      <div><div className="display mb-5" style={{ fontSize: 38, color: THEME.gold }}>{rc.headline.toUpperCase()}</div>
        {rc.sections.filter((s) => ["Matchups", "Players", "Standings"].includes(s.h)).flatMap((s) => s.items).slice(0, 7).map((it, i) => <div key={i} className="py-2" style={{ fontSize: 26, borderBottom: `1px solid ${THEME.border}` }}>{it}</div>)}</div>
    ) : null;
  }
  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: THEME.bg, color: THEME.text, fontFamily: "'Oswald', sans-serif" }}>
      <div className="flex items-center justify-between px-10 py-5" style={{ borderBottom: `3px solid ${THEME.gold}` }}>
        <div><div className="text-sm tracking-[0.3em]" style={{ color: THEME.textMuted }}>{league.settings.leagueName.toUpperCase()}</div><div className="display" style={{ fontSize: 54, lineHeight: 1 }}>{title}</div></div>
        <div className="display" style={{ fontSize: 28, color: THEME.gold }}>{played >= total ? "SEASON COMPLETE" : `WEEK ${Math.min(played + 1, total)} OF ${total}`}</div>
      </div>
      <div className="flex-1 overflow-hidden px-10 py-6" key={cur + played}>{content}</div>
      <div className="flex items-center justify-between px-10 py-3 text-sm" style={{ borderTop: `1px solid ${THEME.border}`, background: THEME.panel }}>
        <div className="flex gap-2 items-center">{panels.map((p, i) => <span key={p} className="rounded-full" style={{ width: 12, height: 12, background: i === idx % panels.length ? THEME.gold : THEME.border }} />)}<span className="ml-2" style={{ color: THEME.textMuted }}>{paused ? "Paused" : "Rotating every 14 seconds"} · arrows to change panel · space to pause · Esc to exit</span></div>
        <div className="flex gap-2">
          <Btn small onClick={() => setIdx((i) => (i + panels.length - 1) % panels.length)}><ChevronLeft size={14} /></Btn>
          <Btn small onClick={() => setPaused(!paused)}>{paused ? "Resume" : "Pause"}</Btn>
          <Btn small onClick={() => setIdx((i) => (i + 1) % panels.length)}><ChevronRight size={14} /></Btn>
          {league.phase === "season" && <Btn small kind="gold" disabled={busy} onClick={onSim}><Play size={13} /> {busy ? "Simulating..." : `Sim week ${played + 1}`}</Btn>}
          <Btn small onClick={fs}>Full screen</Btn>
          <Btn small kind="red" onClick={onClose}>Exit</Btn>
        </div>
      </div>
    </div>
  );
}


// ============================= EVENT GUIDE + PLAYER CARD =============================
const EVENT_INFO = {"Alliance Island":[56.8,40.4,4.6,138.3,14,7,5,28.1],"Battle Bots":[61.9,29.2,17,110.5,14,6.9,3.2,25.7],"Charades":[13.7,5.5,5.9,23.3,14,6.9,4,26.4],"Chess Boxing":[24.1,12.6,5.9,48.2,14,7,3.9,27.5],"Escape Room Gauntlet":[18.1,10.5,5.9,40.6,14,7.1,5.9,29],"Fashion Runway Showdown":[13.8,8.9,4,34.9,14,7.1,6.4,30.6],"Giant Jenga":[14.7,15.7,-10,39.6,11.9,10.9,-9.5,25.8],"Go-Kart Racing":[19.1,10.3,11,44.5,14,7,8.4,31.3],"Hot Dog Eating Contest":[38.1,11.7,29.3,69.2,14,6.9,8.7,32.6],"Ice Road Truckers":[53.3,5.9,47.1,59.7,14.1,2.6,10.8,17.4],"Iron Chef":[17.1,10.8,4,39.3,14,7.1,5.5,28.4],"Karaoke Showdown":[12.6,6.7,3.9,25.1,14,7,4.9,27.1],"Lego Masters Challenge":[12.3,8.6,3.7,33.1,14,7.1,7,30.9],"Master Builder Challenge":[15.1,9.1,5.8,36.7,14,7.1,6.8,30.6],"Mecha Arena":[29.3,24.5,2.9,74.1,14,7.1,6.4,26.8],"Mock Trial":[17.3,8.9,7,38.4,14,7,6,30.6],"Monopoly":[17.6,9.9,5,37.2,14,7,5.1,27.9],"Mousetrap":[17.7,9.6,4.6,36.3,14,7,4.4,27.7],"Naked & Afraid":[53,20.6,15.5,85.5,14.2,6.6,2.5,25.1],"Operation":[42.8,29.9,2.1,90.1,14,7,4.5,25.1],"Race to the Moon":[24.5,8,21.8,47.4,14,6.9,11.6,34.1],"Relay Race":[46.3,10.8,31.9,61.7,14.1,6.4,5.3,23.3],"Shark Tank":[34,8.9,21.2,51.1,14.2,6.5,3.9,27.4],"Talent Show Takedown":[13.9,9.1,4,34.5,13.9,7.1,6.3,29.9],"The Amazing Race":[28,20.7,7.1,72.3,14,7.1,6.9,29],"Train Heist":[17.5,8.4,6.8,37.2,14,7,5.1,30.4],"Wizard's Duel":[35.9,28.8,2.2,81.4,14,7.1,5.8,25.1],"Basketball":[36.9,11,19.4,55.5,14.1,6.8,2.9,25.8],"Battle of the Bands":[10.2,6.8,1.9,20.6,14,7,5.4,24.8],"Dance Off":[6.7,5,3.2,21,14,7,9,34.1],"Demolition Derby":[15.6,10.4,3.9,39.1,14,7.1,6.1,29.8],"Family Feud":[18.4,15.8,2,52.2,14,7,6.8,29],"Fear Factor":[11.8,17.3,-10,42.2,11,14.1,-10,32],"Global Guts":[14.9,7,2.1,23.5,14.1,6.9,2.1,22.5],"Haunted House Gauntlet":[33.4,13.1,7,54.8,14.2,6.5,2.5,25.5],"Heist Night":[22.9,11,7.2,42.6,14,7,4,26.6],"Ninja Warrior":[57.3,6.7,56.8,67.2,14.1,2.6,13.8,18.9],"Roast Battle":[18,8,8,35.3,14,7,5.3,29.2],"Saw":[23.5,12.2,7.3,50.7,14,7,4.7,29.6],"American Gladiators":[14.8,14.8,2,52.3,13.9,7.1,8,31.7],"Archery Tournament":[33.7,24.2,2.2,68.4,14,7.1,4.9,24.1],"Beach Volleyball":[19.4,7.7,7.9,32.8,14,6.9,3.5,26.1],"Beer Pong":[31.2,21.8,2.1,64.1,14,7,4.7,24.5],"Boxing/MMA Rumble":[54.1,18,29.3,81.7,14,6.9,4.4,24.7],"Carnival Games":[17.1,12,4.1,41.3,14,7.1,6.5,28.1],"Corn Hole":[122.7,41.4,60.2,194.1,14.1,6.9,3.4,26.1],"Dodgeball Blitz":[9.2,9.5,1.9,28.6,14,7.3,8.5,28.9],"Log Rolling Tournament":[24.9,20.2,2.1,68.2,14,7.1,6.1,29],"Olympic Figure Skating":[10.8,5.3,3.9,21.2,14,7,4.9,27.8],"Paintball Tournament":[28.4,15.7,5.4,55.2,14,7,3.7,25.9],"Space Battle":[30.7,20.5,4.3,67,14,7,5,26.4],"Spelling Bee":[14,5.9,5.1,24.3,14,6.9,3.5,26.2],"Sumo Tournament":[43.6,33.9,2,103.7,14,7,5.4,26.4],"The Floor Is Lava":[32.9,4.4,28,37.5,14.1,3.4,9.8,17.9],"Towering Inferno":[40.8,13.5,22.1,66.1,14,7,4.4,27.1],"Treasure Hunt":[19.1,10.1,5.4,41.2,14,7,4.5,29.3],"Trivia Titans":[7.6,5,2,18,14,7,6,28.6],"Underwater Search & Rescue":[16.9,8.2,5.2,31.7,14,7,4.1,26.6],"Wipeout":[35.2,5,31.1,45.2,14.1,3.6,10.8,22],"Arm Wrestling Tournament":[15.7,16.4,3,43,14,7.4,8.3,26.2],"Hollywood Squares":[5.8,6.5,1.8,22.6,14,7.9,9.2,34.4],"Kaiju Defense":[14.9,9.8,4.4,40.6,14,7.1,6.5,32.3],"Laser Tag":[22.6,13.4,4.1,46.3,14,7,4.3,26.4],"The Great Migration":[59,6.5,53.2,65.2,14.1,2.6,11.3,17],"Baseball":[7.1,5.1,2,17.8,14,7,7,28.8],"Fencing Tournament":[31.1,22.6,2.1,67.2,14,7.1,5,25.2],"Hide & Seek":[14.6,6.9,5,26.5,14,7,4.3,26],"Royal Rumble":[23.2,21.4,2.1,63.8,13.9,7.1,7.1,27.3],"Street Fighter Tournament":[29.9,23.9,1.8,62.2,14,7.1,5.8,23.5],"Track & Field Events":[10.9,7.5,2,20,14,7.1,5.7,22.5],"Weakest Link":[14.4,7.5,5.1,33.9,14,7,5.4,32.1],"Battle Royale":[20.4,20,2.9,64.8,14,7,7.9,29.5],"Capture the Flag":[27,28.7,2,85.6,14,7.5,7.5,29.2],"Cricket":[9.4,6.4,2,21.4,14,7,6,27.2],"Football":[19.5,11.8,5,41.8,14,7,5.4,27.3],"Gladiator Arena":[23.2,20.6,2.7,62,14,7.1,7,27.2],"Grand Prix Showdown":[53.7,19,29.3,89.1,14,7,5,27],"High Stakes Poker Night":[30,15.1,9.8,55.4,14,6.9,4.7,25.8],"Legends of the Hidden Temple":[19,10.1,5,37.4,14,7,4.4,26.7],"Prison Break":[34.1,19,6,61,14,7,3.7,23.9],"Siege Defense":[11.4,5.7,3.8,21.5,14,7,4.8,26.4],"Soccer":[10.4,6.6,2.1,22.8,14,7,5.2,27.1],"Squid Games":[32.6,25.1,2.2,77.3,14,7,5.5,26.4],"The Apprentice":[9.6,6,2.6,20.3,14,7,5.9,26.5],"Tug of War":[32.5,27,1.8,62.7,14,7.1,6,21.8],"Zombie Outbreak Containment":[10.5,8.3,1.9,25.6,14,7.1,6.7,26.6]};
const CHAR_BIOS = {"Scorpion King":["~35","A warrior king of the desert who bargained with dark powers and commands armies and the scorpion's sting."],"Osiris":["Ageless","Egyptian god of the dead and rebirth, judge of souls and ruler of the underworld."],"Anubis":["Ageless","Jackal-headed guardian of tombs who weighs hearts against the feather of truth."],"Imhotep":["~50","Architect, physician and high priest of ancient Egypt, remembered as a genius and later as a feared undead sorcerer."],"The Sphinx":["Ageless","Riddling guardian with a lion's body and a human face who destroys anyone who answers wrong."],"Cleopatra":["~39","Last active queen of Egypt, a brilliant ruler, linguist and master of persuasion."],"King Tut":["~19","The boy pharaoh whose golden tomb became the most famous in the world."],"Pharaoh Ramses II":["~90","Ramses the Great, the long-reigning warrior pharaoh who built monuments across the Nile."],"Ra":["Ageless","Sun god and king of the Egyptian gods, who sails the heavens each day and fights the serpent of night."],"Horus":["Ageless","Falcon-headed god of the sky and kingship, avenger of his father Osiris."],"Set":["Ageless","God of storms, deserts and chaos, the rival who murdered his own brother."],"Hercules":["~30","Demigod son of Zeus famed for twelve impossible labors and unmatched strength."],"Zeus":["Ageless","King of the Greek gods who rules the sky and hurls thunderbolts."],"Hades":["Ageless","Grim lord of the underworld who rules the dead with cold patience."],"Achilles":["~32","Greatest warrior of the Trojan War, nearly invincible except for one heel."],"Odysseus":["~45","The cunning king of Ithaca who survived a ten year voyage home from Troy."],"Perseus":["~25","Hero who beheaded Medusa and rescued Andromeda from a sea monster."],"Atlas":["Ageless","Titan condemned to hold up the sky on his shoulders forever."],"Apollo":["Ageless","God of the sun, music, prophecy and archery, the picture of Olympian perfection."],"Athena":["Ageless","Goddess of wisdom and strategic warfare, born fully armored from the head of Zeus."],"Ares":["Ageless","God of war who loves the chaos and bloodshed of battle."],"Poseidon":["Ageless","God of the sea, earthquakes and horses, who carries the mighty trident."],"Medusa":["Ageless","A gorgon with snakes for hair whose gaze turns onlookers to stone."],"Golem":["~500","A giant of clay brought to life by sacred words to protect its makers without question."],"Kraken":["Unknown","A colossal sea beast of Nordic legend that drags whole ships beneath the waves."],"Oni":["Unknown","A club-wielding horned ogre of Japanese folklore, huge, savage and fond of mischief."],"Centaur":["~40","A proud half-human, half-horse archer who runs with the speed of the plains."],"Minotaur":["Unknown","Bull-headed beast imprisoned in the Labyrinth of Crete, ferocious and relentless."],"Cyclopes":["Unknown","A one-eyed giant, a forge-working brute with tremendous strength."],"Yeti":["Unknown","The shaggy snowbeast of the Himalayas, strong, elusive and at home in the cold."],"Sasquatch":["Unknown","The shy giant of the Pacific Northwest forests, seen far more often than caught."],"Loch Ness Monster":["Unknown","A long-necked lake creature of the Scottish Highlands that hides in the deep."],"Mothman":["Unknown","A red-eyed winged cryptid said to appear before disasters, made famous in West Virginia."],"Paul Bunyan":["Ageless","A lumberjack giant of American tall tales who clears forests with his blue ox Babe."],"Pecos Bill":["~35","The legendary cowboy who rode a tornado and used a rattlesnake for a lasso."],"John Henry":["~35","The steel driving man who beat a steam drill in a race and died with his hammer in hand."],"Johnny Appleseed":["~70","Barefoot wanderer who planted apple orchards across the frontier."],"Annie Oakley":["~35","Sharpshooter of the Wild West shows, famous for never missing a shot."],"Davy Crockett":["~50","Frontiersman, congressman and legend who fell defending the Alamo."],"Calamity Jane":["~40","Rough-riding frontierswoman and scout, a tough survivor of the Old West."],"Wyatt Earp":["~40","Lawman of Tombstone, who stood in the gunfight at the O.K. Corral."],"Buffalo Bill Cody":["~55","Scout, bison hunter and showman who turned the Wild West into a traveling spectacle."],"Uncle Sam":["~60","The stern personification of the United States, always pointing straight at you."],"Rip Van Winkle":["~40","A Catskills villager who slept twenty years and woke to a changed world."],"Gandalf the White":["Ageless","A wizard returned from death with greater power, a guide and a fighter against Sauron."],"Aragorn":["~87","Ranger of the North and rightful heir to the throne of Gondor."],"Gimli":["~140","Axe-wielding dwarf of the Lonely Mountain, proud, stubborn and fearless."],"Legolas":["~2,900","Elven prince of Mirkwood and a deadly archer with unnatural grace."],"Sauron":["Ageless","The Dark Lord of Mordor who forged the One Ring to rule all others."],"Durin's Bane":["Ageless","A towering fire demon of the ancient world, the Balrog that sleeps beneath Moria."],"Smaug":["~200","The greatest dragon of his age, who hoards the gold of the Lonely Mountain."],"Tom Bombadil":["Ageless","An ancient, merry master of the Old Forest who the Ring itself cannot touch."],"Treebeard (Ent)":["~14,000","Eldest of the Ents, a slow and patient tree shepherd who stirs to wrath."],"Boromir":["~41","Steward's son of Gondor, a bold fighter torn by the pull of the Ring."],"Elrond":["~6,500","Half-elven lord of Rivendell, healer, scholar and veteran of ages of war."],"King Arthur":["~40","The once and future king who drew Excalibur and founded the Round Table."],"Merlin":["Unknown","The wizard and royal advisor to Camelot, who sees the future and bends magic to his will."],"Mr Hyde":["~40","The savage, ruthless alter ego unleashed by Dr. Jekyll's experiments."],"Gilgamesh":["~120","The mighty two-thirds divine king of Uruk who searched the world for immortality."],"Dorian Gray":["~20 in appearance","A handsome Londoner whose portrait ages while he stays young and corrupt."],"Robin Hood":["~30","Outlaw archer of Sherwood Forest who robs the rich to help the poor."],"Don Quixote":["~50","A gentleman knight-errant who tilts at windmills and fights imaginary giants."],"Sherlock Holmes":["~40","The world's greatest consulting detective, powered by observation and logic."],"James Bond":["~40","British secret agent with a license to kill and an unbroken streak of narrow escapes."],"Beowulf":["~50","Geatish hero who slew Grendel, Grendel's mother and a dragon."],"Van Helsing":["~45","Obsessive vampire hunter and scholar who has devoted his life to destroying Dracula."],"Harry Potter":["~17","The Boy Who Lived, a wizard who survived Voldemort and fought him to the end."],"Hermione Granger":["~17","The brightest witch of her age, a ruthless planner and a loyal friend."],"Rubeus Hagrid":["~60","Half-giant gamekeeper of Hogwarts with a soft spot for dangerous creatures."],"Albus Dumbledore":["~115","Headmaster of Hogwarts and the greatest wizard of his time."],"Sirius Black":["~36","Harry's godfather, a wrongly jailed wizard and a fierce, loyal duelist."],"Ron Weasley":["~17","Harry's best friend, a brave strategist who plays wizard chess like a general."],"Severus Snape":["~38","A brooding potions master and double agent whose loyalties stay hidden to the end."],"Dobby":["Unknown","A free house elf with powerful magic and an enormous heart."],"Mad-Eye Moody":["~60","A scarred, paranoid Auror with a magical eye who trusts nobody."],"Newt Scamander":["~35","A gentle magizoologist who travels with a case full of fantastic beasts."],"Lord Voldemort":["~71","The Dark Lord, a murderous wizard who split his soul to avoid death."],"Big Bad Wolf":["Unknown","The notorious huffer and puffer of fairy tales, hungry and deceptive."],"Shrek":["~30","A grumpy ogre who just wants his swamp back and ends up a hero."],"Pied Piper":["~35","A mysterious piper who leads away rats, and children, with enchanted music."],"Puss in Boots":["~9 lives","A dashing swordfighting cat with a silver tongue and endless swagger."],"Rumpelstiltskin":["Unknown","A scheming little imp who spins straw into gold in exchange for the unexpected."],"Jack Frost":["Ageless","A mischievous winter spirit who paints windows with ice and nips at noses."],"Mother Goose":["Ageless","The storyteller of nursery rhymes, wise and unflappable with her gander."],"Pinocchio":["Unknown","A wooden puppet who dreams of becoming a real boy, as long as his nose stays short."],"Thumbelina":["~16","A tiny girl born from a flower, quick and brave in a world of giants."],"The Ugly Duckling":["~2","An outcast duckling who grows into a graceful swan."],"The Gingerbread Man":["Unknown","A fast-running cookie who taunts everyone with 'catch me if you can'."],"Batman":["~35","Gotham's Dark Knight, a master detective and martial artist with no superpowers but endless preparation."],"Superman":["~35","The Man of Steel from Krypton, who flies, hits like a freight train and never gives up."],"Wonder woman":["Ageless","Amazon princess Diana, warrior ambassador armed with the Lasso of Truth."],"Green Lantern":["~30","A ring bearer of the Green Lantern Corps who builds anything he can imagine."],"Aquaman":["~35","King of Atlantis who commands the seas and everything that lives in them."],"Martian Manhunter":["Unknown","The last Martian, a shapeshifting, telepathic powerhouse who is vulnerable only to fire."],"Apache Chief":["~30","A Super Friends hero who grows to enormous size at will."],"Plastic Man":["~35","A stretchy, shapeshifting former crook turned crimefighting jokester."],"Cyborg":["~25","A hero rebuilt with cutting-edge technology who can interface with any machine."],"The Flash":["~30","The fastest man alive, who taps the Speed Force to run past light."],"Shazaam":["Unknown","A young hero who shouts a magic word to become a lightning-powered champion."],"Joker":["Unknown","Gotham's Clown Prince of Crime, an unpredictable agent of chaos."],"Bane":["~35","A hulking mercenary who broke the Bat with venom-fueled strength and strategy."],"Penguin":["~45","Umbrella-toting crime boss of Gotham's underworld."],"Catwoman":["~30","A cunning cat burglar who lives between heroism and thievery."],"Riddler":["~35","A genius obsessed with proving he is smarter than everyone and leaving clues."],"Poison Ivy":["~30","An eco-terrorist botanist with plant control and toxic kisses."],"Mr. Freeze":["Unknown","A cryogenics scientist in a sub-zero suit, driven by love for his lost wife."],"Scarecrow":["~40","A fear-toxin chemist who turns people's terrors against them."],"Two-Face":["~40","A former district attorney whose life is decided by the flip of a coin."],"Harley Quinn":["~30","A former psychiatrist turned unhinged, acrobatic sidekick with a mallet."],"Clayface":["Unknown","A shapeshifting mud monster who can take any form."],"Lex Luthor":["~40","A billionaire scientist who hates Superman and schemes to rule Metropolis."],"Brainiac":["Ageless","A cold alien intelligence that collects planets and the knowledge they hold."],"Darkseid":["Ageless","Tyrant of Apokolips, who seeks the Anti-Life Equation to rule all minds."],"Deathstroke":["~45","A genius mercenary with enhanced strength and reflexes, the best assassin alive."],"Sinestro":["Unknown","A former Green Lantern who wields yellow fear-powered rings."],"Killer Croc":["Unknown","A reptilian brute with a taste for flesh and nearly impenetrable hide."],"Doomsday":["Unknown","A bone-spiked engine of destruction who killed Superman once."],"Lobo":["Unknown","The hard-drinking, hard-fighting interstellar bounty hunter called the Main Man."],"Gorilla Grodd":["Unknown","A hyper-intelligent telepathic ape bent on conquering mankind."],"Professor Zoom":["Unknown","The Reverse-Flash, a time-traveling speedster obsessed with destroying the Flash."],"General Zod":["~50","A Kryptonian military commander with Superman's powers and no mercy."],"Green Arrow":["~35","Billionaire archer Oliver Queen, a trick-arrow marksman who fights for the little guy."],"The Atom":["~35","A scientist who shrinks to subatomic size while keeping his full strength."],"Constantine":["~40","A chain-smoking occult detective who survives on wits, lies and dark magic."],"Deadshot":["~40","A hired gun who never misses a target."],"Doctor Fate":["Ageless","A sorcerer wearing the helmet of the Lord of Order, a master of mystic forces."],"Black Adam":["Ageless","An ancient Egyptian champion with the powers of the gods and a short temper."],"Hawkman":["Ageless","A reincarnated warrior with wings and a mace made of Nth metal."],"Swamp Thing":["Unknown","A plant elemental guardian of the Green who protects the earth."],"Nightwing":["~28","Dick Grayson, the first Robin grown up into a nimble acrobat and fighter."],"Supergirl":["~18","Superman's cousin Kara, the last daughter of Krypton with equal power."],"King Shark":["Unknown","A hulking man-eating hybrid with a shark's jaws and savage strength."],"Captain America":["~105 (looks 30)","Steve Rogers, a World War II super soldier and shield-slinging leader of the Avengers."],"Ironman":["~48","Billionaire inventor Tony Stark in a flying powered armor of his own design."],"Thor":["~1,500","Asgardian god of thunder who wields the mighty hammer Mjolnir."],"Black Widow":["~35","Natasha Romanoff, a master spy and hand-to-hand assassin turned Avenger."],"Hawkeye":["~40","Clint Barton, an Avenger whose trick arrows almost never miss."],"The Incredible Hulk":["~45","Dr. Bruce Banner's gamma-fueled alter ego, who grows stronger the angrier he gets."],"Spiderman":["~20","Peter Parker, a wall-crawling teen hero with spider sense and quick wit."],"Dr. Strange":["~45","Former surgeon turned Sorcerer Supreme who guards Earth against magical threats."],"Black Panther":["~35","T'Challa, king of Wakanda, a vibranium-suited warrior and brilliant strategist."],"Ant-man":["~40","Scott Lang, a thief turned hero who shrinks to insect size or grows giant."],"Vision":["~3","A synthetic android with an Infinity Stone in his forehead and a calm, philosophical mind."],"Professor Xavier":["~70","The world's most powerful telepath and founder of the X-Men."],"Wolverine":["~200","Logan, a mutant with healing, retractable claws and a nearly unbreakable adamantium skeleton."],"Beast (Hank McCoy)":["~40","A brilliant blue-furred scientist with ape-like agility and strength."],"Cyclops":["~35","Scott Summers, the field leader of the X-Men, who fires destructive optic blasts."],"Jean Grey":["~35","A telepathic and telekinetic mutant tied to the cosmic Phoenix Force."],"Storm":["~35","Ororo Munroe, a mutant who commands weather and lightning."],"Colossus":["~30","Russian mutant who turns his skin into organic steel."],"Rogue":["~28","A mutant who absorbs powers and memories on skin contact."],"Nightcrawler":["~30","A blue, fuzzy, teleporting swashbuckler and devout gentle soul."],"Gambit":["~35","A Cajun thief who charges objects with kinetic energy and throws them."],"Deadpool":["~35","The Merc with a Mouth, a regenerating mercenary who knows he's in a story."],"Ghost Rider":["~30","A stunt rider bound to a spirit of vengeance, with a flaming skull and hellfire chain."],"Daredevil":["~35","Blind lawyer Matt Murdock, whose heightened senses make him a deadly street fighter."],"Silver Surfer":["Ageless","A herald of Galactus who rides the cosmos on a board with the Power Cosmic."],"Punisher":["~45","Frank Castle, a vigilante marine hunting criminals with an arsenal."],"Star-Lord":["~35","Peter Quill, a half-celestial outlaw who leads the Guardians of the Galaxy."],"Groot":["Unknown","A towering tree creature who only says three words but fights with fierce loyalty."],"Rocket Raccoon":["Unknown","A genetically engineered raccoon, a weapons expert and sharp-tongued pilot."],"Mr. Fantastic":["~45","Reed Richards, a genius whose body stretches like rubber."],"Human Torch":["~25","Johnny Storm, a hot-headed hero who bursts into flame and flies."],"Thing (Ben Grimm)":["~45","A rock-skinned brawler with enormous strength and a big heart."],"Invisible Woman":["~35","Sue Storm, who turns invisible and projects force fields."],"Dr. Doom":["~45","The armored monarch of Latveria, a genius sorcerer-scientist and Reed Richards' nemesis."],"Thanos":["~1,000","The Mad Titan who sought the Infinity Stones to wipe out half of all life."],"Ultron":["~3","A rogue artificial intelligence that decided humanity must go."],"Magneto":["~85","Master of magnetism who fights for mutant supremacy."],"Venom":["~35","A symbiote bonded with a host, a vicious web-slinging brute."],"Loki":["~1,000","Asgardian god of mischief, a trickster with illusion and cunning."],"Apocalypse":["~5,000","The first mutant, who believes only the strong deserve to survive."],"Juggernaut":["~45","An unstoppable mystic-powered man who bulldozes anything in his path."],"Dr. Octopus":["~50","A brilliant scientist fused with four mechanical tentacles."],"Winter Soldier":["~106 (looks 35)","Bucky Barnes, a brainwashed super assassin with a metal arm."],"Scarlet Witch":["~30","Wanda Maximoff, a reality-warping sorceress with chaos magic."],"Mickey Mouse":["~95","The cheerful face of Disney, a brave, optimistic mouse in red shorts."],"The Genie":["~10,000","A blue, shapeshifting wish-granter with cosmic powers and an itty-bitty living space."],"Elsa":["~21","Queen of Arendelle, who commands ice and snow."],"Maui":["~1,000","A shape-shifting demigod with a magic fishhook and heaps of ego."],"Simba":["~8","A lion who returned to reclaim Pride Rock as king."],"Stitch":["Unknown","Experiment 626, a tiny blue alien with chaos in his heart and ohana on his mind."],"Mulan":["~16","A young woman who took her father's place in the army and saved China."],"Wreck-it Ralph":["~35","An arcade game villain who wants to be a hero, with giant fists to match."],"Peter Pan":["Never grows up","The boy who won't grow up, a flying leader of the Lost Boys in Neverland."],"Beast":["~25","A prince cursed into a ferocious beast until he learns to love."],"Tarzan":["~25","A man raised by apes who swings through the jungle and fights with savage agility."],"Goku":["~40","A Saiyan raised on Earth, the world's greatest martial artist, who loves a good fight."],"Vegeta":["~45","Prince of the Saiyans, proud, rival and sometimes ally of Goku."],"Gohan":["~20","Goku's scholarly son, whose hidden power rises when his loved ones are threatened."],"Piccolo":["~40","A Namekian warrior, once a villain, now Gohan's mentor and protector of Earth."],"Frieza":["~70","A cruel galactic tyrant who destroyed the Saiyans' homeworld."],"Trunks":["~20","A sword-swinging half-Saiyan from the future who trains to beat the androids."],"Krillin":["~40","The bravest and strongest human on Earth, Goku's lifelong friend."],"Majin Buu":["~5,000,000","A pink, rubbery, candy-loving monster with a childlike mind and terrifying power."],"Cell":["~1","A bio-android assembled from the best fighters' cells, who absorbs people to become perfect."],"Android 18":["~30","A cyborg with infinite energy and steady nerves, later Krillin's wife."],"Tien Shinhan":["~40","A three-eyed martial artist who gave up villainy for honor."],"Bugs Bunny":["~85","A carrot-chewing, wise-cracking rabbit who always outsmarts his opponents."],"Daffy Duck":["~85","A greedy, zany black duck whose schemes usually backfire."],"Porky Pig":["~90","A stuttering, kindhearted pig who closes every show."],"Foghorn Leghorn":["~75","A loud Southern rooster who loves to tease the barnyard dog."],"Wile E. Coyote":["~75","A super genius who orders Acme gadgets that always blow up on him."],"Roadrunner":["~75","A lightning-fast desert bird that says beep beep and never gets caught."],"Yosemite Sam":["~75","A pint-sized, hot-tempered outlaw with two six-shooters."],"Marvin the Martian":["~70","A Martian invader with a space helmet and an Illudium Q-36 explosive space modulator."],"Tasmanian Devil":["~70","A spinning, snarling whirlwind with an insatiable appetite."],"Elmer Fudd":["~85","A hapless hunter in pursuit of wabbits."],"Speedy Gonzales":["~70","The fastest mouse in all Mexico."],"Kung Fu Panda (Po)":["~25","A noodle-loving panda who became the Dragon Warrior through sheer heart."],"Popeye":["~50","A sailor who gets super strength from spinach."],"He-Man":["~25","Prince Adam, who raises his sword and becomes the most powerful man in the universe."],"Inspector Gadget":["~45","A bumbling cyborg detective with a gadget for every situation."],"Mighty Mouse":["~80","A caped rodent superhero who arrives to save the day."],"Kim Possible":["~16","A teen secret agent who handles global crises between cheerleading practice."],"Leonardo":["~16","The disciplined, katana-wielding leader of the Teenage Mutant Ninja Turtles."],"Michelangelo":["~16","The fun-loving, nunchuck-twirling turtle who loves pizza."],"Donatello":["~16","The brainy turtle who builds gadgets and fights with a bo staff."],"Raphael":["~16","The tough, hot-headed turtle who fights with twin sai."],"Captain Planet":["Ageless","An eco-hero summoned by the Planeteers to fight pollution."],"Count Dracula":["~500","The immortal vampire lord of Transylvania with a hypnotic gaze."],"Frankenstein's Monster":["Unknown","A stitched together creature of enormous strength and tragic loneliness."],"The Headless Horseman":["Unknown","A spectral Hessian rider who hurls a flaming pumpkin and haunts Sleepy Hollow."],"Stay Puft Marshmallow Man":["Unknown","A skyscraper-sized, sailor-hatted marshmallow mascot who goes on a rampage."],"Pennywise":["Unknown","A shape-shifting clown who feeds on fear in the town of Derry."],"Freddy Krueger":["Unknown","A razor-gloved dream stalker who murders teens in their sleep."],"Jason Voorhees":["Unknown","A relentless hockey-masked killer who stalks Crystal Lake."],"Godzilla":["~70,000","The atomic breathing king of the monsters, a city-sized beast."],"King Kong":["Unknown","A giant ape from Skull Island, strong enough to fight dinosaurs."],"Wolf-man":["~35","A man cursed to become a ferocious werewolf under the full moon."],"Beetlejuice":["Unknown","A fast-talking bio-exorcist ghost who loves to cause chaos."],"The Undertaker":["~57","The Deadman, a towering, dark-gimmick WWE legend with an unbeaten WrestleMania streak."],"John Cena":["~49","The 'Never Give Up' superstar, a multi-time world champion and top-flight showman."],"Hulk Hogan":["~73","Hulkamania's face, a legendary hero in a red and yellow bandana."],"Andre the Giant":["~46","The Eighth Wonder of the World, a 7-foot-4 giant who was nearly unbeatable."],"The Ultimate Warrior":["~54","A face-painted, rope-shaking powerhouse who ran full speed to the ring."],"Ric Flair":["~77","The Nature Boy, a flashy, 16-time world champion who woos and cheats."],"Stone Cold Steve Austin":["~61","A foul-mouthed, beer-drinking rebel who stunned his way to the top."],"The Rock":["~54","The Great One, a charismatic People's Champion with the People's Elbow."],"Macho Man Randy Savage":["~58","A raspy-voiced, sunglasses-wearing high flyer known for the flying elbow drop."],"Triple H":["~57","The Game, a calculating, cerebral leader of D-Generation X."],"Kane":["~59","The Big Red Machine, a masked monster brother of the Undertaker."],"Indiana Jones":["~45","An archaeology professor who dodges traps and Nazis with a whip and fedora."],"Neo":["~30","The One, a hacker who can bend the rules of the Matrix."],"Leonidas":["~45","The Spartan king who held the pass at Thermopylae with just 300 men."],"Falcor":["Unknown","A giant, furry, friendly luck dragon who flies through the Nothing."],"Rocky Balboa":["~35","A Philadelphia underdog boxer who took on the champ and went the distance."],"Rambo":["~40","John Rambo, a haunted Green Beret and one-man army."],"Zorro":["~35","A masked swordsman who carves a Z and defends the poor of California."],"Forrest Gump":["~40","A kind, simple-minded man who sprints through history by accident and heart."],"Beatrix Kiddo":["~35","The Bride, a lethal assassin on a katana-fueled revenge mission."],"John Wick":["~45","A legendary hitman who comes out of retirement with deadly efficiency."],"William Wallace":["~35","A Scottish rebel who led a charge for freedom against the English."],"Ronald McDonald":["~60","A red-wigged clown with a ravenous cheeseburger obsession."],"Burger King":["~60","A silent, plastic-masked monarch of the flame-broiled burger."],"Energizer Bunny":["~35","A sunglasses-wearing drummer bunny who keeps going and going."],"Jolly Green Giant":["~90","A towering vegetable farmer who says 'ho ho ho'."],"Kool-Aid Man":["~50","A giant pitcher of juice who bursts through walls shouting 'Oh yeah!'."],"Lucky the Leprechaun":["Unknown","A cereal-hunting leprechaun who guards a bowl of marshmallow charms."],"Tony the Tiger":["~70","A frosted flakes mascot who proclaims that cereal is grrreat."],"Mr. Clean":["~65","A bald, muscular, earring-wearing cleaner who scours any mess."],"GEICO Gecko":["~25","A small, British-accented lizard who saves you money."],"Mr. Peanut":["~110","A monocle and top-hat-wearing gentleman legume."],"Chester Cheetah":["~35","A cool, sunglasses-wearing cheetah who loves cheese puffs."],"Xenomorph":["Unknown","A perfect organism with acid blood and an inner jaw."],"Predator":["Unknown","A cloaked alien hunter who collects trophies from worthy prey."],"E.T.":["Unknown","A gentle alien botanist who just wants to phone home."],"Dalek":["Unknown","A mutant inside a tank-like armor who screams 'Exterminate!'."],"Alf":["~230","A wise-cracking, cat-hungry alien from Melmac who lives in the Tanner house."],"Na'vi":["Unknown","A tall blue warrior of Pandora connected to nature and an animal bond."],"Zoidberg":["Unknown","A clawed, lobster-like doctor from Futurama who is always hungry."],"Invader Zim":["Unknown","An overconfident, incompetent alien invader who plots against Earth."],"Ben 10":["~10","A kid with an Omnitrix who turns into powerful aliens."],"Cthulhu":["Ageless","A tentacled cosmic horror sleeping in sunken R'lyeh."],"Blue Meanie":["Unknown","A music-hating invader from Pepperland who rains blue destruction."],"Darth Vader":["~45","A fallen Jedi turned cybernetic Sith Lord who serves the Emperor."],"Yoda":["~900","A tiny, wise Jedi master who fights with surprising agility."],"Luke Skywalker":["~25","A farm boy who became a Jedi knight and fought for the Rebellion."],"Han Solo":["~32","A cocky smuggler and pilot of the Millennium Falcon."],"Chewbacca":["~200","A loyal, towering Wookiee who pulls arms from sockets when angry."],"Obi-Wan Kenobi":["~57","A patient Jedi master who mentors a young Skywalker."],"Mace Windu":["~53","A stern member of the Jedi council who wields a purple lightsaber."],"Boba Fett":["~35","A Mandalorian armored bounty hunter with a jetpack."],"Jar Jar Binks":["~35","A clumsy, long-eared Gungan who accidentally becomes a hero."],"General Grievous":["Unknown","A cybernetic general with four lightsabers who hunts Jedi."],"Kylo Ren":["~30","A conflicted Force user with a crossguard saber, drawn to the dark side."],"Captain Jean-Luc Picard":["~65","Commanding officer of the Enterprise-D, a diplomat and scholar."],"Spock":["~35","A half-Vulcan science officer who relies on logic over emotion."],"Benjamin Sisko":["~45","Commander of Deep Space Nine and the Emissary of the Prophets."],"Captain James T. Kirk":["~35","A bold starship captain who breaks the rules and wins."],"Worf":["~35","A Klingon officer in Starfleet, a fierce warrior with a strong sense of honor."],"Data":["~30","An android officer who longs to be human."],"Odo":["Unknown","A shapeshifting security chief of Deep Space Nine."],"Seven of Nine":["~35","A former Borg drone who regained her humanity."],"Leonard \"Bones\" McCoy":["~40","A gruff, compassionate doctor aboard the Enterprise."],"Montgomery \"Scotty\" Scott":["~45","A miracle-working chief engineer who can fix any ship."],"Kang":["~60","A scheming Klingon warlord who fights with duty and pride."],"T-800":["Unknown","A relentless cyborg assassin with a living tissue exterior."],"Iron Giant":["Unknown","A gentle giant robot who chooses to be a hero."],"T-1000":["Unknown","A liquid-metal terminator that mimics anything it touches."],"Robo-Cop":["Unknown","A cybernetic Detroit police officer who serves the public trust."],"Megazord":["Unknown","A giant fighting machine assembled by teen rangers."],"Megatron":["Unknown","The ruthless leader of the Decepticons, who turns into a cannon."],"Optimus Prime":["Unknown","The noble leader of the Autobots, who turns into a truck."],"Bender Bending Rodriguez":["Unknown","A beer-fueled, cigar-smoking, robot whose favorite hobby is bending."],"Voltron":["Unknown","A giant combined robot formed from five lion mechs."],"Baymax":["Unknown","A soft, inflatable healthcare robot who defends his friends."],"Mega Man":["Unknown","A blue combat robot who copies the abilities of defeated enemies."],"Link":["~17","A hero in green, wielder of the Master Sword."],"Princess Zelda":["~17","The princess of Hyrule, holder of the Triforce of Wisdom."],"Donkey Kong":["Unknown","A barrel-throwing, tie-wearing gorilla with huge fists."],"Diddy Kong":["Unknown","A fast, peanut-popping monkey sidekick with a jetpack."],"Star Fox":["~25","Fox McCloud, a pilot who leads a team of mercenary starfighters."],"Little Mac":["~17","A small but fierce boxer who climbs the ranks of the circuit."],"Laura Croft":["~30","An adventurer and tomb raider with a pair of pistols."],"Earthworm Jim":["Unknown","A worm in a super suit who battles evil with a plasma blaster."],"Master Chief":["~40","A super soldier Spartan fighting an alien Covenant."],"Kratos":["Unknown","The Ghost of Sparta, a god-slaying warrior."],"Crash Bandicoot":["Unknown","A spinning, wumpa-fruit-loving marsupial."],"Mario Mario":["~35","A mustachioed plumber and hero of the Mushroom Kingdom."],"Luigi Mario":["~35","Mario's taller, cowardly, but brave-when-needed brother."],"Captain Toad":["Unknown","A mushroom explorer with a headlamp and a backpack."],"Princess Peach":["~25","The ruler of the Mushroom Kingdom who frequently needs rescuing and sometimes fights."],"Daisy":["~25","Princess of Sarasaland, a spunky, athletic friend."],"Yoshi":["Unknown","A friendly dinosaur who eats enemies and lays eggs."],"Bowser":["Unknown","King of the Koopas, a fire-breathing, spiky turtle tyrant."],"Bowser Jr.":["~8","The Koopa prince with a paintbrush and a clown car."],"Wario":["~35","A greedy, garlic-loving rival of Mario."],"Waluigi":["~35","A lanky, scheming rival of Luigi."],"Rosalina":["Unknown","A guardian of the cosmos who travels with her Lumas."],"Pikachu":["Unknown","An electric mouse and partner who shocks opponents."],"Charizard":["Unknown","A fire-breathing, winged dragon Pokemon."],"Mewtwo":["Unknown","A genetically engineered psychic Pokemon of overwhelming power."],"Greninja":["Unknown","A ninja frog Pokemon with water shuriken."],"Squirtle":["Unknown","A small turtle Pokemon with a water cannon."],"Mr. Mime":["Unknown","A mime Pokemon who creates invisible barriers."],"Jigglypuff":["Unknown","A singing Pokemon whose lullaby puts everyone to sleep."],"Lucario":["Unknown","An aura-sensing, fighting-type Pokemon."],"Hawlucha":["Unknown","A masked wrestling Pokemon who flies from the top rope."],"Eevee":["Unknown","An adaptable fox Pokemon who can evolve into many forms."],"Machamp":["Unknown","A four-armed fighting Pokemon of immense strength."],"Kirby":["Unknown","A round pink hero who inhales enemies and copies their abilities."],"Banjo & Kazooie":["Unknown","A bear and bird duo who work together on adventures."],"Cloud Strife":["~21","A former SOLDIER with a giant Buster Sword."],"Samus":["~28","A bounty hunter in a power suit who fights space pirates."],"Minecraft Steve":["Unknown","A blocky miner and crafter who builds anything."],"Ness":["~13","A boy with psychic powers and a baseball bat."],"Pac-Man":["Unknown","A round yellow arcade icon who eats pellets and ghosts."],"Sora":["~15","A keyblade wielder who fights darkness across worlds."],"Solid Snake":["~40","A legendary infiltrator who uses stealth and a cardboard box."],"Captain Falcon":["~35","A F-Zero racer and bounty hunter with a flaming punch."],"Sephiroth":["~30","A legendary soldier turned villain with a very long sword."]};
let OPEN_CARD = null;
const ATTR_LABELS = [["st", "Strength"], ["co", "Constitution"], ["dx", "Dexterity"], ["wi", "Wisdom"], ["it", "Intelligence"], ["ch", "Charisma"], ["at", "Attack"], ["rg", "Range"], ["rn", "Run"], ["lk", "Luck"]];
const WEIGHT_LABELS = { str: "Strength", con: "Constitution", dex: "Dexterity", wis: "Wisdom", int: "Intelligence", cha: "Charisma", lck: "Luck" };
const ARCH_TEXT = {
  round: "Played in rounds. Every round each competitor attempts the event's actions, and points are scored for what they accomplish.",
  duel: "Head-to-head duels. Competitors from the two franchises are paired off and face each other, with bonus points for winning.",
  race: "A race or run. Competitors progress through stages, scoring for obstacles cleared and finishing position.",
  battlefield: "A battlefield. Everyone is in the arena at once and scores for hits, eliminations and surviving to the end.",
  boxscore: "A box score game. Competitors accumulate stat lines over the whole event, like a real sports game."
};
function fmtHeight(p) { const i = p.hi; return i >= 240 ? `${(i / 12).toFixed(0)} ft` : `${Math.floor(i / 12)}'${i % 12}"`; }
function fmtWeight(p) { return p.w >= 4000 ? `${(p.w / 2000).toFixed(1)} tons` : `${p.w.toLocaleString()} lb`; }
function PName({ n, style, className }) {
  return <button type="button" className={className} title="View player card" onClick={(e) => { e.stopPropagation(); OPEN_CARD && OPEN_CARD(n); }} style={{ background: "none", border: "none", padding: 0, color: "inherit", font: "inherit", fontWeight: "inherit", cursor: "pointer", textAlign: "left", textDecoration: "underline dotted", textUnderlineOffset: 3, ...style }}>{n}</button>;
}
function playerLog(league, n) {
  const out = [];
  league.results.forEach((r) => r.games.forEach((g) => { const b = g.summary.boxScore[n]; if (b) out.push({ week: r.week + 1, ev: g.ev, lp: b.lp != null ? b.lp : b.fp, fp: b.fp }); }));
  return out;
}
function PlayerCard({ league, name, onClose }) {
  const p = POOL_BY_NAME[name]; if (!p) return null;
  const bio = CHAR_BIOS[name] || ["Unknown", "A competitor in the league."];
  const owner = ownedMap(league)[name];
  const log = playerLog(league, name);
  const tot = log.reduce((t, x) => t + x.lp, 0), gp = log.length;
  const w = league.schedule && league.results.length < seasonWeeks(league) ? league.results.length : null;
  const ex = w != null ? playerExpect(league, name, w) : null;
  const pr = projOf(name);
  const best = log.length ? [...log].sort((a, b) => b.lp - a.lp)[0] : null, worst = log.length ? [...log].sort((a, b) => a.lp - b.lp)[0] : null;
  const Stat = ({ label, value, sub, color }) => <div className="rounded p-3 text-center" style={{ background: THEME.panel2, border: `1px solid ${THEME.border}` }}><div className="text-[11px] uppercase tracking-wide" style={{ color: THEME.textMuted }}>{label}</div><div className="display text-2xl" style={{ color: color || THEME.text }}>{value}</div>{sub && <div className="text-[11px]" style={{ color: THEME.textFaint }}>{sub}</div>}</div>;
  const proj = ex ? (ex.bye ? "BYE" : ex.ev ? fp1(ex.exp) : "—") : pr ? fp1(pr.mean) : "—";
  const projSub = ex ? (ex.bye ? "on a bye this week" : ex.ev ? `Week ${w + 1}: ${ex.ev}` : "no event this week") : "season projection per week";
  return (
    <Modal title={name} onClose={onClose}>
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: THEME.textMuted }}>
          <span>{p.team}</span><span>{p.div} · {p.conf}</span>
          <span>{owner != null ? <>Owner: <MgrTag league={league} id={owner} bold /></> : <b style={{ color: THEME.teal }}>Free agent</b>}</span>
          <span>Rating {p.tt}</span>
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))" }}>
          <Stat label="Projected" value={proj} sub={projSub} color={THEME.gold} />
          <Stat label="Weekly avg" value={gp ? fp1(tot / gp) : "—"} sub={gp ? `${gp} game${gp > 1 ? "s" : ""}` : "no games yet"} />
          <Stat label="Season total" value={gp ? fp1(tot) : "0.0"} sub="league points" />
        </div>
        <div className="rounded p-3" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
          <div className="grid gap-2 mb-2 text-sm" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div><div className="text-[11px] uppercase" style={{ color: THEME.textMuted }}>Height</div><b>{fmtHeight(p)}</b></div>
            <div><div className="text-[11px] uppercase" style={{ color: THEME.textMuted }}>Weight</div><b>{fmtWeight(p)}</b></div>
            <div><div className="text-[11px] uppercase" style={{ color: THEME.textMuted }}>Age</div><b>{bio[0]}</b></div>
          </div>
          <div className="text-sm">{bio[1]}</div>
          <div className="text-[11px] mt-1" style={{ color: THEME.textFaint }}>Ages are approximate and based on canon.</div>
        </div>
        {(best || worst) && <div className="text-sm" style={{ color: THEME.textMuted }}>Best game <b style={{ color: THEME.text }}>{fp1(best.lp)}</b> ({best.ev}, week {best.week}) · Worst <b style={{ color: THEME.text }}>{fp1(worst.lp)}</b> ({worst.ev}, week {worst.week}) · Last <b style={{ color: THEME.text }}>{fp1(log[log.length - 1].lp)}</b></div>}
        <div>
          <div className="display text-sm mb-1">Attributes</div>
          <div className="grid gap-x-4 gap-y-1" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {ATTR_LABELS.map(([k, l]) => <div key={k} className="flex items-center gap-2 text-xs"><span style={{ width: 82, color: THEME.textMuted }}>{l}</span><div className="flex-1 rounded" style={{ background: THEME.border, height: 6 }}><div className="rounded" style={{ width: `${Math.min(100, (p[k] / 20) * 100)}%`, background: THEME.teal, height: 6 }} /></div><span className="mono" style={{ width: 20, textAlign: "right" }}>{p[k]}</span></div>)}
          </div>
        </div>
        <div className="text-sm"><b>Best events:</b> {specialties(p, 3).map((s) => s.name).join(", ")}<br /><b>Weakest events:</b> {weaknesses(p, 3).map((s) => s.name).join(", ")}</div>
        {log.length > 0 && <div>
          <div className="display text-sm mb-1">Game log</div>
          <table className="w-full text-xs"><thead><tr style={{ background: THEME.panel2 }}><Th>Wk</Th><Th>Event</Th><Th right>League pts</Th><Th right>Raw</Th></tr></thead>
            <tbody>{log.map((x, i) => <tr key={i} style={{ borderTop: `1px solid ${THEME.border}` }}><td className="px-2 py-1">{x.week}</td><td className="px-2 py-1">{x.ev}</td><td className="px-2 py-1 text-right mono font-bold" style={{ color: x.lp < 0 ? THEME.red : THEME.text }}>{fp1(x.lp)}</td><td className="px-2 py-1 text-right mono" style={{ color: THEME.textMuted }}>{fp1(x.fp)}</td></tr>)}</tbody></table>
        </div>}
      </div>
    </Modal>
  );
}
function eventLiveStats(league, evName) {
  const per = {}; let games = 0;
  league.results.forEach((r) => r.games.forEach((g) => { if (g.ev !== evName) return; games++; Object.entries(g.summary.boxScore).forEach(([n, b]) => { const v = b.lp != null ? b.lp : b.fp; (per[n] = per[n] || []).push(v); }); }));
  const all = Object.values(per).flat();
  const top = Object.entries(per).map(([n, a]) => ({ n, avg: a.reduce((t, x) => t + x, 0) / a.length, c: a.length })).sort((a, b) => b.avg - a.avg).slice(0, 5);
  return { games, apps: all.length, avg: all.length ? all.reduce((t, x) => t + x, 0) / all.length : null, top };
}
function EventGuide({ league }) {
  const [q, setQ] = useState(""), [cat, setCat] = useState("All"), [sel, setSel] = useState("");
  const cats = ["All", ...Array.from(new Set(EVENTS_DB.map((e) => e.category))).sort()];
  const list = EVENTS_DB.filter((e) => (cat === "All" || e.category === cat) && e.name.toLowerCase().includes(q.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name));
  const ev = EVENT_BY_NAME[sel] || list[0];
  const info = ev && EVENT_INFO[ev.name];
  const live = ev ? eventLiveStats(league, ev.name) : null;
  const fx = ev && (ev.fixed || {});
  const arch = ev && (ARCH_TEXT[ev.archetype] || "A custom format with its own rules, described above.");
  const wts = ev ? Object.entries(ev.weights).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]) : [];
  const ss = ev ? specStats().find((s) => s.name === ev.name) : null;
  const spec = ev ? POOL.map((p) => ({ n: p.n, z: (computeBER(p, ev.weights) - ss.m) / ss.sd })).sort((a, b) => b.z - a.z).slice(0, 6) : [];
  const Sec = ({ t, children }) => <div className="mb-4"><div className="display text-sm mb-1" style={{ color: THEME.gold }}>{t}</div>{children}</div>;
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "minmax(220px, 280px) 1fr" }}>
      <Card title="Events" pad={false}>
        <div className="p-2 space-y-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events" className="w-full rounded px-2 py-1.5 text-sm" style={{ background: THEME.panel2, color: THEME.text, border: `1px solid ${THEME.border}`, fontSize: 16 }} />
          <Select value={cat} onChange={setCat} style={{ width: "100%" }}>{cats.map((c) => <option key={c}>{c}</option>)}</Select>
        </div>
        <div style={{ maxHeight: 560, overflowY: "auto" }}>{list.map((e) => <button key={e.name} onClick={() => setSel(e.name)} className="w-full text-left px-3 py-1.5 text-sm" style={{ borderTop: `1px solid ${THEME.border}`, background: ev && ev.name === e.name ? THEME.gold + "30" : "transparent", color: THEME.text }}>{e.name}<span className="text-[11px] ml-2" style={{ color: THEME.textFaint }}>{e.category}</span></button>)}</div>
      </Card>
      {ev && <Card title={ev.name} right={<span className="text-xs" style={{ color: THEME.textMuted }}>{ev.rank ? `Rank ${ev.rank} · ` : ""}{ev.category}</span>}>
        <Sec t="Rules"><div className="text-sm">{ev.description}</div></Sec>
        <Sec t="Head-to-head matchup">
          <div className="text-sm">Two franchises face off. {ev.competitors} competitor{ev.competitors > 1 ? "s" : ""} from each franchise {ev.competitors === 11 ? "play this event, which uses a franchise's full weekly 11." : `play this event, and the same franchises meet in a second event with ${11 - ev.competitors} each, so all 11 compete each week.`} {arch} Each competitor's raw box score is converted to league points, and fantasy managers add up the league points of their starters.</div>
        </Sec>
        <Sec t="Scoring system">
          <table className="w-full text-sm"><tbody>{ev.actions.map((a) => <tr key={a.l} style={{ borderTop: `1px solid ${THEME.border}` }}><td className="py-1">{a.l.charAt(0).toUpperCase() + a.l.slice(1)}</td><td className="py-1 text-right mono font-bold" style={{ color: a.p < 0 ? THEME.red : THEME.teal }}>{a.p > 0 ? "+" : ""}{a.p}</td></tr>)}</tbody></table>
          <div className="text-xs mt-1" style={{ color: THEME.textMuted }}>Everyone who shows up earns participation points; only a catastrophe goes negative. Raw points are then scaled so every event averages about 14 league points.</div>
        </Sec>
        <Sec t="Average score">
          {info ? <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
            {[["Raw avg", info[0]], ["Raw range", `${info[2]} to ${info[3]}`], ["League avg", info[4]], ["League range", `${info[6]} to ${info[7]}`]].map(([l, v]) => <div key={l} className="rounded p-2 text-center" style={{ background: THEME.panel2, border: `1px solid ${THEME.border}` }}><div className="text-[11px] uppercase" style={{ color: THEME.textMuted }}>{l}</div><div className="display text-lg">{v}</div></div>)}
          </div> : <div className="text-sm" style={{ color: THEME.textMuted }}>No calibration data.</div>}
          <div className="text-xs mt-1" style={{ color: THEME.textMuted }}>Per competitor, medium length, from simulated games (range is the 5th to 95th percentile). This season: {live.games ? <>{live.games} game{live.games > 1 ? "s" : ""}, <b style={{ color: THEME.text }}>{fp1(live.avg)}</b> league points per competitor.</> : "no games played yet."}</div>
        </Sec>
        <Sec t="What it rewards">
          <div className="space-y-1">{wts.map(([k, v]) => <div key={k} className="flex items-center gap-2 text-xs"><span style={{ width: 90, color: THEME.textMuted }}>{WEIGHT_LABELS[k] || k}</span><div className="flex-1 rounded" style={{ background: THEME.border, height: 6 }}><div className="rounded" style={{ width: `${Math.min(100, v * 2.5)}%`, background: THEME.gold, height: 6 }} /></div><span className="mono" style={{ width: 28, textAlign: "right" }}>{v}%</span></div>)}</div>
        </Sec>
        <Sec t="Best suited competitors"><div className="text-sm flex flex-wrap gap-x-4 gap-y-1">{spec.map((s) => <PName key={s.n} n={s.n} />)}</div></Sec>
        {live.top.length > 0 && <Sec t="Top performers this season"><div className="text-sm space-y-0.5">{live.top.map((t) => <div key={t.n} className="flex justify-between"><PName n={t.n} /><span className="mono">{fp1(t.avg)} avg · {t.c} game{t.c > 1 ? "s" : ""}</span></div>)}</div></Sec>}
      </Card>}
    </div>
  );
}

// ============================= LEAGUE ADMIN =============================
function LeagueAdmin({ league, setLeague, onReset, onImport, saveOk }) {
  const fileRef = useRef(null);
  const [err, setErr] = useState("");
  const s = league.settings;
  return (
    <div>
      <Card title="League settings">
        <div className="grid text-sm gap-y-1" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {[["League name", s.leagueName], ["Managers", s.numManagers], ["Competitors per team", s.rounds], ["Starters per week", s.starters], ["Regular season weeks", s.regWeeks], ["Playoff teams", s.playoffTeams], ["Playoff weeks", s.playoffWeeks], ["Trade deadline", `Week ${s.tradeDeadlineWeek}`], ["Franchise byes", s.byeEnabled ? `Weeks ${s.byeStart} to ${s.byeEnd}` : "Off"], ["Event length", s.duration]].map(([k, v]) => <React.Fragment key={k}><div style={{ color: THEME.textMuted }}>{k}</div><div className="font-semibold">{v}</div></React.Fragment>)}
        </div>
      </Card>
      <ScalingCard league={league} setLeague={setLeague} />
      <Card title="Manager names">
        <div className="grid grid-cols-2 gap-2">
          {league.managers.map((m) => <div key={m.id} className="flex items-center gap-2"><Dot color={m.color} /><input value={m.name} onChange={(e) => setLeague({ ...league, managers: league.managers.map((x) => (x.id === m.id ? { ...x, name: e.target.value } : x)) })} className="flex-1 rounded px-2 py-1.5 text-sm" style={{ background: THEME.panel2, border: `1px solid ${THEME.border}`, color: THEME.text }} /></div>)}
        </div>
      </Card>
      <Card title="Save and load">
        <div className="text-sm mb-3" style={{ color: saveOk ? THEME.textMuted : THEME.red }}>{saveOk ? "This league auto-saves in this browser. Export a file for a backup or to move it to another device." : "Auto-save is unavailable in this browser. Export a league file to keep your progress."}</div>
        <div className="flex flex-wrap gap-2">
          <Btn kind="gold" onClick={() => downloadLeague(league)}><Download size={14} /> Export league file</Btn>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) readLeagueFile(f, (er, L) => (er ? setErr("That file is not a league save: " + er.message) : onImport(L))); e.target.value = ""; }} />
          <Btn onClick={() => fileRef.current && fileRef.current.click()}><Upload size={14} /> Import league file</Btn>
          <Btn kind="red" onClick={() => askConfirm("Delete this league and start over? Export a file first if you want a backup.", onReset, "Delete league")}><RotateCcw size={14} /> Delete league</Btn>
        </div>
        {err && <div className="text-sm mt-2" style={{ color: THEME.red }}>{err}</div>}
      </Card>
    </div>
  );
}

// ============================= MAIN APP =============================
const TABS = [["score", "Scoreboard", Trophy], ["info", "Event Guide", BookOpen], ["recap", "Recap", Mic], ["waivers", "Waivers", UserPlus], ["grades", "Draft Grades", ListOrdered], ["team", "My Team", Users], ["standings", "Standings", ListOrdered], ["franchises", "Franchises", Crown], ["schedule", "Schedule", Calendar], ["players", "Players", Search], ["trades", "Trades", ArrowLeftRight], ["playoffs", "Playoffs", Crown], ["admin", "League", Settings]];
// ============================= MULTIPLAYER (shared league over the artifact db) =============================
const MP = { saveWarn: null, on: false, ready: false, uid: null, isCommish: false, myMgr: null, seats: {}, names: {}, spectate: false, error: null, publishLogs: null, claimSeat: null, freeSeat: null, resetAll: null, spectateNow: null };
const MPA = () => !MP.on || MP.isCommish;
const MPCAN = (mgr) => !MP.on || MP.isCommish || MP.myMgr === mgr;
const MPRUNS = () => !MP.on || MP.isCommish;
async function mpHash(s) {
  const t = String(s).trim().toLowerCase();
  try { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("fffs|" + t)); return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join("").slice(0, 32); }
  catch (e) { let h = 5381; for (let i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) | 0; return "w" + (h >>> 0).toString(16); }
}
function canon(v) {
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(canon).join(",") + "]";
  return "{" + Object.keys(v).filter((k) => v[k] !== undefined).sort().map((k) => JSON.stringify(k) + ":" + canon(v[k])).join(",") + "}";
}
const mgrOfLineupKey = (k) => String(k).split("|")[0];
function chunkWeek(r) {
  const chunks = []; let cur = [], size = 0;
  (r.games || []).forEach((g) => { const s = JSON.stringify(g).length; if (cur.length && size + s > 180000) { chunks.push(cur); cur = []; size = 0; } cur.push(g); size += s; });
  chunks.push(cur);
  const { games, ...meta } = r;
  return chunks.map((gs, i) => (i === 0 ? { meta, games: gs, n: chunks.length } : { games: gs }));
}
function shardsOf(L) {
  const S = {};
  const { results, lineups, waivers, draft, ...rest } = L;
  const d = { ...draft }; delete d.queues;
  const w = waivers ? { ...waivers } : null; if (w) delete w.claims;
  S.state = { ...rest, draft: d, waivers: w, hasWaivers: !!waivers };
  const mg = L.managers.map((m) => m.id);
  mg.forEach((m) => {
    const lu = {}; Object.keys(lineups || {}).forEach((k) => { if (+mgrOfLineupKey(k) === m) lu[k] = lineups[k]; });
    S["u_" + m] = { lineups: lu, queue: ((draft && draft.queues) || {})[m] || [] };
    S["c_" + m] = { claims: waivers ? waivers.claims.filter((c) => c.mgr === m) : [] };
  });
  (results || []).forEach((r, wi) => chunkWeek(r).forEach((c, ci) => { S["res_" + wi + "_" + ci] = c; }));
  return S;
}
function assembleLeague(docs) {
  const st = docs.state; if (!st || !st.s) return null;
  const base = st.s; const L = { ...base };
  delete L.hasWaivers;
  const queues = {}, lineups = {}, claims = [];
  Object.keys(docs).forEach((id) => {
    if (id.startsWith("u_")) { const m = +id.slice(2), d = docs[id]; Object.assign(lineups, d.lineups || {}); if (d.queue && d.queue.length) queues[m] = d.queue; }
    if (id.startsWith("c_")) claims.push(...(docs[id].claims || []));
  });
  L.draft = { ...base.draft, queues };
  L.lineups = lineups;
  L.waivers = base.hasWaivers && base.waivers ? { ...base.waivers, claims: claims.sort((a, b) => a.id - b.id) } : undefined;
  if (!L.waivers) delete L.waivers;
  const weeks = {};
  Object.keys(docs).forEach((id) => { const m = /^res_(\d+)_(\d+)$/.exec(id); if (m) { (weeks[m[1]] = weeks[m[1]] || {})[m[2]] = docs[id]; } });
  const results = [];
  for (let wi = 0; weeks[wi]; wi++) {
    const c0 = weeks[wi][0]; if (!c0 || !c0.meta) break;
    let ok = true; const games = [...c0.games];
    for (let ci = 1; ci < c0.n; ci++) { if (!weeks[wi][ci]) { ok = false; break; } games.push(...weeks[wi][ci].games); }
    if (!ok) break;
    results.push({ ...c0.meta, games });
  }
  L.results = results;
  return L;
}

function useMP(league, setLeagueRaw, setMyMgr, logsRef, bump) {
  const R = useRef({ docs: {}, known: {}, rev: 0, db: null, user: null, applied: null, busy: false, again: false, logSeen: {} });
  const [, tick] = useState(0);
  const refresh = () => { tick((x) => x + 1); };
  useEffect(() => {
    let off = [], dead = false;
    const timer = setTimeout(() => { if (!R.current.db && !dead) { MP.error = "Could not reach the shared league. Open this page from the shared link while signed in to claude.ai."; refresh(); } }, 12000);
    (async () => {
      let db = null, user = null;
      try { db = await window.claude.use("db"); user = await window.claude.use("user"); } catch (e) { /* ignore */ }
      if (dead) return;
      if (!db || !user) { MP.error = "This page needs a signed-in claude.ai viewer with access to the shared league."; refresh(); return; }
      const uid = await user.id();
      MP.on = true; MP.uid = uid; MP.isCommish = !!(user.isOwner() || user.canEdit());
      R.current.db = db; R.current.user = user;
      MP.db = db;
      const profiles = async (ids) => { try { const p = await user.profiles(ids); const o = {}; ids.forEach((i) => { o[i] = (p[i] && p[i].name) || "Player"; }); return o; } catch (e) { const o = {}; ids.forEach((i) => { o[i] = "Player"; }); return o; } };
      MP.invites = {}; MP.codeOk = {}; MP.myEmailHash = null;
      try { const me = await user.me(); if (me && me.email) MP.myEmailHash = await mpHash(me.email); } catch (e) { /* no email available */ }
      const autoClaim = async () => {
        if (MP.myMgr != null || !MP.ready || !MP.myEmailHash || R.current.autoBusy) return;
        const m = Object.keys(MP.invites).find((k) => MP.invites[k].eh === MP.myEmailHash && !MP.seats[k]);
        if (m == null) return;
        R.current.autoBusy = true; try { await MP.claimSeat(+m); } catch (e) { /* ignore */ } R.current.autoBusy = false;
      };
      const rebuild = async () => {
        const docs = R.current.docs;
        const L = assembleLeague(docs);
        const nMgr = L && L.managers ? L.managers.length : 0;
        // ignore seats left over from an older league with more teams than this one
        const seats = {}; Object.entries((docs.seats && docs.seats.seats) || {}).forEach(([k, v]) => { if (+k >= 0 && +k < nMgr) seats[k] = v; });
        MP.seats = seats;
        const ids = Array.from(new Set(Object.values(seats))); if (ids.length) MP.names = { ...MP.names, ...(await profiles(ids)) };
        const mine = Object.keys(seats).find((k) => seats[k] === uid);
        MP.myMgr = mine != null ? +mine : null;
        Object.keys(R.current.known).forEach((k) => { if (!(k in docs) && k !== "state") delete R.current.known[k]; });
        Object.keys(docs).forEach((id) => { if (id === "seats") return; const d = docs[id]; R.current.known[id] = canon(id === "state" ? d.s : d); });
        R.current.rev = (docs.state && docs.state.rev) || 0;
        MP.ready = true;
        if (!R.current.dirty) { R.current.applied = L; setLeagueRaw(L); }
        if (MP.myMgr != null) setMyMgr(MP.myMgr);
        refresh();
        autoClaim();
      };
      MP.claimWithCode = async (code) => {
        const ch = await mpHash("code:" + String(code).trim().toUpperCase());
        const m = Object.keys(MP.invites).find((k) => MP.invites[k].ch === ch);
        if (m == null) return "bad";
        MP.codeOk[m] = true; return MP.claimSeat(+m);
      };
      MP.claimSeat = async (m) => {
        const inv = MP.invites[m];
        if (!MP.isCommish && inv && (inv.eh || inv.ch) && !(inv.eh && inv.eh === MP.myEmailHash) && !MP.codeOk[m]) return "reserved";
        const ref = db.doc("lg/seats");
        for (let i = 0; i < 8; i++) {
          const a = await ref.acquire({ holder: uid, ttlMs: 1500 });
          if (!a.acquired) { await sleep(250 + Math.random() * 300); continue; }
          const cur = await ref.get(); const seats = (cur.exists && cur.data().seats) || {};
          if (seats[m] && seats[m] !== uid) return "taken";
          const next = { ...seats }; Object.keys(next).forEach((k) => { if (next[k] === uid) delete next[k]; }); next[m] = uid;
          await ref.set({ seats: next }); return "ok";
        }
        return "busy";
      };
      MP.freeSeat = async (m) => {
        const ref = db.doc("lg/seats");
        for (let i = 0; i < 8; i++) {
          const a = await ref.acquire({ holder: uid, ttlMs: 1500 });
          if (!a.acquired) { await sleep(250 + Math.random() * 300); continue; }
          const cur = await ref.get(); const seats = { ...((cur.exists && cur.data().seats) || {}) };
          if (seats[m] !== uid && !MP.isCommish) return "no";
          delete seats[m]; await ref.set({ seats }); return "ok";
        }
        return "busy";
      };
      MP.spectateNow = () => { MP.spectate = true; refresh(); };
      MP.publishLogs = async (keep) => {
        for (const [k, v] of Object.entries(keep)) { try { await db.doc("lgl/" + k).set({ w: +k.split("-")[0], k, v }); } catch (e) { /* too large or rate limited: skip this log */ } await sleep(40); }
      };
      MP.resetAll = async () => {
        const snap = await db.collection("lg").get(); for (const d of snap.docs) { await db.doc("lg/" + d.id).delete(); }
        const sn2 = await db.collection("lgl").get(); for (const d of sn2.docs) await db.doc("lgl/" + d.id).delete();
        R.current.docs = {}; R.current.known = {}; R.current.rev = 0; R.current.dirty = false; logsRef.current = {}; setLeagueRaw(null); refresh();
      };
      off.push(db.collection("inv").onSnapshot((snap) => {
        const o = {}; snap.docs.forEach((d) => { o[d.id.replace(/^m/, "")] = d.data(); });
        MP.invites = o; refresh(); autoClaim();
      }, () => { /* invites unavailable: lobby still works */ }));
      off.push(db.collection("lg").onSnapshot((snap) => {
        const docs = {}; snap.docs.forEach((d) => { docs[d.id] = d.data(); });
        R.current.docs = docs; rebuild();
      }, (e) => { MP.error = "Lost connection to the shared league (" + (e && e.code) + ")."; refresh(); }));
      off.push(db.collection("lgl").orderBy("w", "desc").limit(60).onSnapshot((snap) => {
        let changed = false;
        snap.docs.forEach((d) => { const x = d.data(); if (!R.current.logSeen[x.k]) { R.current.logSeen[x.k] = 1; logsRef.current[x.k] = x.v; changed = true; } });
        if (changed) bump();
      }, () => {}));
    })();
    return () => { dead = true; clearTimeout(timer); off.forEach((f) => f && f()); };
  }, []);
  // write local changes back to the shared docs
  const flush = async () => {
    const r = R.current; if (!r.db || !MP.ready) return;
    if (r.busy) { r.again = true; return; }
    r.busy = true;
    try {
      do {
        r.again = false;
        const L = r.latest; if (!L) break;
        const S = shardsOf(L);
        const allowed = (id) => MP.isCommish || id === "state" || id === "u_" + MP.myMgr || id === "c_" + MP.myMgr;
        const ids = Object.keys(S).filter((id) => canon(S[id]) !== r.known[id] && allowed(id));
        const ordered = ids.filter((id) => id !== "state").sort((a, b) => (/^res_\d+_0$/.test(a) ? 1 : 0) - (/^res_\d+_0$/.test(b) ? 1 : 0));
        for (const id of ordered) { await r.db.doc("lg/" + id).set(S[id]); r.known[id] = canon(S[id]); }
        if (ids.includes("state")) {
          const ref = r.db.doc("lg/state"); let done = false;
          for (let i = 0; i < 8 && !done; i++) {
            const a = await ref.acquire({ holder: MP.uid, ttlMs: 1500 });
            if (!a.acquired) { await sleep(200 + Math.random() * 300); continue; }
            const cur = await ref.get(); const curRev = cur.exists ? cur.data().rev || 0 : 0;
            if (cur.exists && curRev !== r.rev) { r.docs.state = cur.data(); r.dirty = false; r.conflict = true; done = true; break; }
            await ref.set({ s: S.state, rev: curRev + 1 }); r.rev = curRev + 1; r.known.state = canon(S.state); done = true;
          }
          if (!done) r.conflict = true;
        }
      } while (r.again);
      r.dirty = false; if (r.fails || MP.saveWarn) { r.fails = 0; MP.saveWarn = null; refresh(); }
      if (r.conflict) { r.conflict = false; const L2 = assembleLeague(r.docs); r.applied = L2; setLeagueRaw(L2); if (ASK) ASK({ message: "Someone else changed the league at the same moment, so your last action was not applied. Please try it again." }); }
    } catch (e) {
      r.fails = (r.fails || 0) + 1;
      MP.saveWarn = "Saving to the shared league hit a snag (" + (e && (e.message || e.code)) + "). " + (r.fails > 5 ? "Automatic retry stopped. Reload the page, your last action may need to be repeated." : "Retrying automatically...");
      if (r.fails <= 5) { r.dirty = true; r.known = { ...r.known }; setTimeout(() => { r.busy = false; flush(); }, 1500 * r.fails); r.busyHold = true; } else r.dirty = false;
      refresh();
    }
    if (r.busyHold) r.busyHold = false; else r.busy = false;
  };
  useEffect(() => {
    const r = R.current;
    if (!MP.on || !MP.ready) return undefined;
    if (league === r.applied || league == null) { if (!r.busy) r.dirty = false; return undefined; }
    r.latest = league;
    const S = shardsOf(league);
    const allowed = (id) => MP.isCommish || id === "state" || id === "u_" + MP.myMgr || id === "c_" + MP.myMgr;
    if (!Object.keys(S).some((id) => allowed(id) && canon(S[id]) !== r.known[id])) { if (!r.busy) r.dirty = false; return undefined; }
    r.dirty = true;
    const t = setTimeout(flush, 250);
    return () => clearTimeout(t);
  }, [league]);
  return MP;
}
function SeatLobby({ league, onPick }) {
  const [msg, setMsg] = useState(""), [code, setCode] = useState("");
  const taken = (m) => MP.seats[m];
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4" style={{ background: "rgba(5,7,10,0.88)" }}>
      <div className="w-full rounded-lg my-10" style={{ maxWidth: 560, background: THEME.bg, border: `1px solid ${THEME.borderLight}` }}>
        <div className="px-4 py-3 display text-xl" style={{ background: THEME.panel, borderBottom: `1px solid ${THEME.border}` }}>Choose your team</div>
        <div className="p-4 space-y-2">
          <div className="text-sm" style={{ color: THEME.textMuted }}>Pick an open team in {league.settings.leagueName}. Unclaimed teams are run on autopilot. This is an alpha build, so tell the commissioner about anything that looks wrong.</div>
          {league.managers.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded px-3 py-2" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
              <div className="flex items-center gap-2"><Dot color={m.color} /><b>{m.name}</b></div>
              {taken(m.id) ? <span className="text-xs" style={{ color: THEME.textMuted }}>{MP.names[taken(m.id)] || "Player"}{taken(m.id) === MP.uid ? " (you)" : ""}</span>
                : (MP.invites[m.id] && !MP.isCommish) ? <span className="text-xs" style={{ color: THEME.gold }}>Reserved</span>
                : <Btn small kind="gold" onClick={async () => { const r = await MP.claimSeat(m.id); setMsg(r === "ok" ? "" : r === "taken" ? "That team was just taken. Pick another." : "The league is busy, try again."); }}>Take this team</Btn>}
            </div>
          ))}
          {msg && <div className="text-sm" style={{ color: THEME.red }}>{msg}</div>}
          {Object.keys(MP.invites).length > 0 && !MP.isCommish && (
            <div className="rounded px-3 py-2 text-sm" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
              <div className="mb-1" style={{ color: THEME.textMuted }}>Reserved teams are held for the person the commissioner invited. If you signed in with the invited email you will be seated automatically. Otherwise enter the invite code the commissioner gave you.</div>
              <div className="flex gap-2"><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Invite code" className="px-2 py-1 rounded text-sm mono" style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, color: THEME.text, width: 150 }} /><Btn small kind="gold" disabled={!code.trim()} onClick={async () => { const r = await MP.claimWithCode(code); setMsg(r === "ok" ? "" : r === "bad" ? "That code did not match a team." : r === "taken" ? "That team already has a manager." : "The league is busy, try again."); }}>Use code</Btn></div>
            </div>
          )}
          <div className="pt-2"><Btn onClick={() => MP.spectateNow()}>{MP.isCommish ? "Run as commissioner without a team" : "Just watch"}</Btn></div>
        </div>
      </div>
    </div>
  );
}

// ---------- in-app feedback + sim notice ----------
const MP_ERRS = [];
if (typeof window !== "undefined" && !window.__mpErrHook) {
  window.__mpErrHook = true;
  window.addEventListener("error", (e) => { MP_ERRS.push(String(e.message || e).slice(0, 200)); if (MP_ERRS.length > 6) MP_ERRS.shift(); });
  window.addEventListener("unhandledrejection", (e) => { MP_ERRS.push("promise: " + String((e.reason && (e.reason.message || e.reason.code)) || e.reason).slice(0, 200)); if (MP_ERRS.length > 6) MP_ERRS.shift(); });
}
function ago(t) { const m = Math.max(0, Math.round((Date.now() - t) / 60000)); return m < 1 ? "just now" : m < 60 ? m + " min ago" : m < 1440 ? Math.round(m / 60) + " hr ago" : Math.round(m / 1440) + " days ago"; }
function SimNotice({ league, setLeague }) {
  const ls = league.lastSim, played = (league.results || []).length;
  const [edit, setEdit] = useState(false), [txt, setTxt] = useState(league.simNote || "");
  if (!MP.on || league.phase !== "season") return null;
  return (
    <div className="rounded px-3 py-2 mb-4 text-sm flex flex-wrap items-center gap-x-4 gap-y-1" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
      <span><b style={{ color: THEME.gold }}>{played ? `Week ${played} played` : "Season not started"}</b>{ls && ls.at ? <span style={{ color: THEME.textMuted }}> · simulated {ago(ls.at)}</span> : null}</span>
      <span style={{ color: THEME.textMuted }}>Week {played + 1} is next. Lineups lock when the commissioner presses Sim.</span>
      {league.simNote && !edit && <span style={{ color: THEME.teal }}>{league.simNote}</span>}
      {MPA() && !edit && <button className="text-xs underline" style={{ color: THEME.textMuted }} onClick={() => { setTxt(league.simNote || ""); setEdit(true); }}>{league.simNote ? "Edit note" : "Add a note for players"}</button>}
      {MPA() && edit && <span className="flex gap-2 items-center"><input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Next sim: tonight 9pm ET" className="px-2 py-1 rounded text-xs" style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, color: THEME.text, width: 240 }} /><Btn small kind="gold" onClick={() => { setLeague({ ...league, simNote: txt.trim().slice(0, 140) }); setEdit(false); }}>Save</Btn></span>}
    </div>
  );
}
function FeedbackButton({ league, tab }) {
  const [open, setOpen] = useState(false), [txt, setTxt] = useState(""), [state, setState] = useState(""), [list, setList] = useState(null);
  if (!MP.on || !MP.ready || !league) return null;
  const send = async () => {
    if (!txt.trim()) return;
    setState("sending");
    try {
      const mg = MP.myMgr != null && league.managers[MP.myMgr] ? league.managers[MP.myMgr].name : "(no team)";
      const id = Date.now() + "_" + String(MP.uid || "x").slice(-6);
      await MP.db.doc("fb/" + id).set({ t: Date.now(), uid: MP.uid, who: MP.names[MP.uid] || "", mgr: mg, week: (league.results || []).length + 1, tab: tab || "", text: txt.trim().slice(0, 1500), banner: MP.error || MP.saveWarn || "", errs: MP_ERRS.slice(-4), phase: league.phase, w: window.innerWidth });
      setState("sent"); setTxt("");
    } catch (e) { setState("fail"); }
  };
  const load = async () => { try { const s = await MP.db.collection("fb").get(); setList(s.docs.map((d) => d.data()).sort((a, b) => b.t - a.t)); } catch (e) { setList([]); } };
  return (
    <>
      <button onClick={() => { setOpen(true); setState(""); }} className="fixed z-40 text-xs px-3 py-2 rounded-full shadow" style={{ right: 12, bottom: 76, background: THEME.panel2, border: `1px solid ${THEME.borderLight}`, color: THEME.text }}>Report a problem</button>
      {open && (
        <Modal title="Report a problem" onClose={() => setOpen(false)}>
          <div className="text-sm mb-2" style={{ color: THEME.textMuted }}>Tell us what happened and what you were trying to do. We attach your team, the week, the screen you are on and any error text automatically.</div>
          <textarea value={txt} onChange={(e) => setTxt(e.target.value)} rows={5} className="w-full px-3 py-2 rounded text-sm" style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, color: THEME.text }} placeholder="What went wrong?" />
          <div className="flex items-center gap-3 mt-3">
            <Btn kind="gold" disabled={state === "sending" || !txt.trim()} onClick={send}>{state === "sending" ? "Sending..." : "Send"}</Btn>
            {state === "sent" && <span className="text-sm" style={{ color: THEME.teal }}>Sent, thank you.</span>}
            {state === "fail" && <span className="text-sm" style={{ color: THEME.red }}>Could not send. Your access may be view only, so tell the commissioner directly.</span>}
          </div>
          {MP.isCommish && (
            <div className="mt-5 pt-3" style={{ borderTop: `1px solid ${THEME.border}` }}>
              <Btn small onClick={load}>Show reports</Btn>
              {list && !list.length && <div className="text-sm mt-2" style={{ color: THEME.textMuted }}>No reports yet.</div>}
              {list && list.map((r, i) => <div key={i} className="text-sm mt-2 p-2 rounded" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}><div className="text-xs" style={{ color: THEME.textMuted }}>{r.who || "Player"} · {r.mgr} · week {r.week} · {r.tab} · {ago(r.t)}</div><div>{r.text}</div>{(r.banner || (r.errs && r.errs.length > 0)) && <div className="text-xs mt-1" style={{ color: THEME.gold }}>{r.banner} {(r.errs || []).join(" | ")}</div>}</div>)}
            </div>
          )}
        </Modal>
      )}
    </>
  );
}

// ---------- commissioner: add team managers ----------
function ManagersPanel({ league, setLeague }) {
  const [em, setEm] = useState({}), [codes, setCodes] = useState({}), [note, setNote] = useState("");
  if (!MP.on || !MPA()) return null;
  const save = async (m, patch) => { try { await MP.db.doc("inv/m" + m).set({ ...(MP.invites[m] || {}), ...patch, at: Date.now() }); setNote(""); } catch (e) { setNote("Could not save the invite: " + ((e && (e.message || e.code)) || "unknown error")); } };
  const reserve = async (m) => {
    const e = String(em[m] || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) { setNote("Enter a full email address. Phone numbers cannot be used here, managers sign in with their claude.ai account."); return; }
    await save(m, { eh: await mpHash(e), hint: e[0] + "•••@" + e.split("@")[1] }); setEm({ ...em, [m]: "" });
  };
  const makeCode = async (m) => {
    const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; let c = ""; for (let i = 0; i < 6; i++) c += A[Math.floor(Math.random() * A.length)];
    await save(m, { ch: await mpHash("code:" + c) }); setCodes({ ...codes, [m]: c });
  };
  const clear = async (m) => { try { await MP.db.doc("inv/m" + m).delete(); } catch (e) { setNote("Could not clear: " + ((e && e.code) || "error")); } };
  const rename = (m, name) => { const n = name.trim().slice(0, 30); if (n && n !== league.managers[m].name) setLeague({ ...league, managers: league.managers.map((x) => (x.id === m ? { ...x, name: n } : x)) }); };
  return (
    <Card title="Team managers">
      <div className="p-4 space-y-3 text-sm">
        <div style={{ color: THEME.textMuted }}>
          <b style={{ color: THEME.text }}>How to add a manager.</b> 1) Invite their email from this page's Share menu with Contributor access, so claude.ai emails them a link. 2) Reserve their team below with that same email. 3) When they open the link and sign in with that email they land on their team automatically, and every time they come back they are still on it. If their email is not recognized, give them the invite code and they enter it on the team screen. Phone numbers are not supported, because sign-in is handled by claude.ai accounts.
        </div>
        {note && <div style={{ color: THEME.red }}>{note}</div>}
        {league.managers.map((m) => {
          const inv = MP.invites[m.id], seat = MP.seats[m.id];
          return (
            <div key={m.id} className="rounded px-3 py-2 flex flex-wrap items-center gap-2" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
              <Dot color={m.color} />
              <input defaultValue={m.name} key={m.name} onBlur={(e) => rename(m.id, e.target.value)} className="px-2 py-1 rounded font-semibold" style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, color: THEME.text, width: 150 }} />
              <span className="text-xs" style={{ color: seat ? THEME.teal : inv ? THEME.gold : THEME.textMuted, minWidth: 110 }}>{seat ? `Seated: ${MP.names[seat] || "Player"}` : inv ? `Reserved${inv.hint ? " for " + inv.hint : " by code"}` : "Open"}</span>
              <input value={em[m.id] || ""} onChange={(e) => setEm({ ...em, [m.id]: e.target.value })} placeholder="manager email" className="px-2 py-1 rounded text-xs" style={{ background: THEME.bg, border: `1px solid ${THEME.border}`, color: THEME.text, width: 190 }} />
              <Btn small onClick={() => reserve(m.id)}>Reserve</Btn>
              <Btn small onClick={() => makeCode(m.id)}>Invite code</Btn>
              {codes[m.id] && <span className="mono text-xs px-2 py-1 rounded" style={{ background: THEME.bg, color: THEME.gold, border: `1px solid ${THEME.gold}` }}>{codes[m.id]}</span>}
              {seat && <Btn small onClick={async () => { await MP.freeSeat(m.id); }}>Release seat</Btn>}
              {inv && <Btn small onClick={() => clear(m.id)}>Clear</Btn>}
            </div>
          );
        })}
        <div className="text-xs" style={{ color: THEME.textMuted }}>Invite codes are shown once, so copy them to the manager right away. Reserved teams cannot be taken by anyone else. You can always take or release any team yourself.</div>
      </div>
    </Card>
  );
}

function ManagersToggle({ league, setLeague }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4">
      <Btn onClick={() => setOpen(!open)}><UserPlus size={14} /> {open ? "Hide team managers" : "Add team managers"}</Btn>
      {open && <div className="mt-3"><ManagersPanel league={league} setLeague={setLeague} /></div>}
    </div>
  );
}

export default function FanFictionFantasyLeague() {
  const [league, setLeagueRaw] = useState(null);
  const [tab, setTab] = useState("score");
  const [myMgr, setMyMgr] = useState(0);
  const [busy, setBusy] = useState(false);
  const [studio, setStudio] = useState(false);
  const [cardName, setCardName] = useState(null);
  OPEN_CARD = setCardName;
  const [saveOk, setSaveOk] = useState(true);
  const logsRef = useRef({});
  const [dlg, setDlg] = useState(null);
  ASK = setDlg;
  const [, force] = useState(0);
  const setLeague = (L) => setLeagueRaw(L);
  const [, bumpAll] = useState(0);
  useMP(league, setLeagueRaw, setMyMgr, logsRef, () => bumpAll((x) => x + 1));
  const played = league ? league.results.length : 0;
  const total = league && league.schedule ? seasonWeeks(league) : 0;

  const runWeeks = (count) => {
    if (busy) return; setBusy(true);
    setTimeout(() => {
      try {
        let L = league, keep = {};
        for (let i = 0; i < count && L.results.length < total && L.phase !== "complete"; i++) {
          const r = simNextWeek(L); if (r.league === L) break; L = r.league;
          const wnum = L.results.length - 1;
          Object.entries(r.logs).forEach(([k, v]) => { keep[k] = v; });
          Object.keys(keep).forEach((k) => { if (+k.split("-")[0] < wnum - 1) delete keep[k]; });
        }
        logsRef.current = { ...logsRef.current, ...keep };
        Object.keys(logsRef.current).forEach((k) => { if (+k.split("-")[0] < L.results.length - 3) delete logsRef.current[k]; });
        setLeague(MP.on ? { ...L, lastSim: { at: Date.now(), week: (L.results || []).length } } : L); force((x) => x + 1); if (MP.publishLogs) MP.publishLogs(keep);
      } catch (e) { askConfirm("Simulation error: " + (e && e.message)); }
      setBusy(false);
    }, 30);
  };

  const resetLeague = () => { setTab("score"); if (MP.resetAll) MP.resetAll(); };
  const header = (
    <div className="w-full flex flex-wrap items-center justify-between gap-3 px-5 py-3 sticky top-0 z-30" style={{ background: THEME.panel, borderBottom: `1px solid ${THEME.border}` }}>
      <div className="flex items-center gap-3">
        <Radio size={22} color={THEME.gold} />
        <div>
          <div className="display text-lg leading-none">{league ? league.settings.leagueName.toUpperCase() : "FAN FICTION FANTASY LEAGUE"}</div>
          <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: THEME.textFaint }}>{league ? (league.phase === "draft" ? "Draft" : league.phase === "complete" ? "Season complete" : `Week ${Math.min(played + 1, total)} of ${total}`) : "League Manager"}</div>
        </div>
      </div>
      {league && (
        <div className="flex flex-wrap gap-2">
          {league.schedule && <Btn onClick={() => setStudio(true)}><Radio size={14} /> Studio</Btn>}
          {league.phase === "season" && MPA() && <>
          <Btn kind="gold" disabled={busy} onClick={() => runWeeks(1)}><Play size={14} /> {busy ? "Simulating..." : `Sim week ${played + 1}`}</Btn>
          {played < league.settings.regWeeks && <Btn disabled={busy} onClick={() => runWeeks(league.settings.regWeeks - played)}><FastForward size={14} /> Sim to playoffs</Btn>}
          <Btn disabled={busy} onClick={() => askConfirm("Simulate every remaining week?", () => runWeeks(total - played), "Sim season")}><FastForward size={14} /> Sim season</Btn>
          </>}
          <Btn kind="red" onClick={() => askConfirm("Delete the shared league for everyone and start a new one?", resetLeague, "Delete league")}><RotateCcw size={14} /> New league</Btn>
        </div>
      )}
    </div>
  );

  let body;
  if (MP.error && !league) {
    body = <Card title="Cannot open the league"><div className="text-sm">{MP.error}</div></Card>;
  } else if (!MP.ready && !league) {
    body = <Card><div className="text-sm" style={{ color: THEME.textMuted }}>Connecting to the shared league...</div></Card>;
  } else if (!league && !MP.isCommish) {
    body = <Card title="Waiting for the commissioner"><div className="text-sm">The commissioner has not created the league yet. This page updates by itself when they do.</div></Card>;
  } else if (!league) {
    body = <SetupScreen onCreate={(s, names) => { const L = newLeague(s, Object.keys(names).length ? Array.from({ length: s.numManagers }, (_, i) => (names[i] || "").trim() || `Manager ${i + 1}`) : null); setLeague(L); }} onImport={(L) => { setLeague(L); }} />;
  } else if (league.phase === "draft") {
    body = <div>{MP.on && MPA() && <ManagersToggle league={league} setLeague={setLeague} />}<DraftRoom league={league} setLeague={setLeague} onStartSeason={() => { logsRef.current = {}; setLeague(startSeason(league)); setTab("score"); }} /></div>;
  } else {
    body = (
      <div>
        <SimNotice league={league} setLeague={setLeague} />
        <div className="flex flex-wrap gap-1 mb-5" style={{ borderBottom: `1px solid ${THEME.border}` }}>
          {TABS.filter(([k]) => k !== "admin" || MPA()).map(([k, l, Icon]) => (
            <button key={k} onClick={() => setTab(k)} className="px-4 py-2.5 text-sm uppercase tracking-wide font-semibold flex items-center gap-1.5" style={{ color: tab === k ? THEME.gold : THEME.textMuted, borderBottom: `2px solid ${tab === k ? THEME.gold : "transparent"}` }}><Icon size={14} />{l}</button>
          ))}
        </div>
        {tab === "score" && <Scoreboard league={league} logs={logsRef.current} myMgr={myMgr} />}
        {tab === "team" && <MyTeam league={league} setLeague={setLeague} myMgr={myMgr} setMyMgr={setMyMgr} goPlayers={() => setTab("players")} />}
        {tab === "standings" && <Standings league={league} />}
        {tab === "franchises" && <div className="max-w-5xl"><div className="display text-2xl mb-3">Franchise standings</div><FranchiseStandings league={league} /></div>}
        {tab === "schedule" && <Schedule league={league} setLeague={setLeague} myMgr={myMgr} setMyMgr={setMyMgr} />}
        {tab === "players" && <Players league={league} setLeague={setLeague} myMgr={myMgr} />}
        {tab === "trades" && (MPA() ? <Trades league={league} setLeague={setLeague} /> : <Card title="Trades"><div className="text-sm">Trades are run by the commissioner in this alpha. Ask them to make the trade for you.</div></Card>)}
        {tab === "recap" && <RecapTab league={league} />}
        {tab === "info" && <EventGuide league={league} />}
        {tab === "waivers" && <WaiversTab league={league} setLeague={setLeague} myMgr={myMgr} />}
        {tab === "grades" && <GradesTab league={league} />}
        {tab === "playoffs" && <Playoffs league={league} />}
        {tab === "admin" && MP.on && <ManagersPanel league={league} setLeague={setLeague} />}
        {tab === "admin" && MPA() && <LeagueAdmin league={league} setLeague={setLeague} saveOk={saveOk} onReset={resetLeague} onImport={(L) => { logsRef.current = {}; setLeague(L); }} />}
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen flex flex-col" style={{ background: THEME.bg, color: THEME.text, fontFamily: "'Oswald', sans-serif" }}>
      <style>{FONTS}{`
        .mono { font-family: 'JetBrains Mono', monospace; }
        .display { font-family: 'Anton', sans-serif; letter-spacing: 0.02em; }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: ${THEME.panel}; }
        ::-webkit-scrollbar-thumb { background: ${THEME.border}; border-radius: 6px; }
      `}</style>
      {header}
      <div className="flex-1 w-full max-w-[1280px] mx-auto px-5 py-6">{body}</div>
      {studio && league && league.schedule && <StudioScreen league={league} busy={busy} onSim={() => runWeeks(1)} onClose={() => setStudio(false)} />}
      {cardName && league && <PlayerCard league={league} name={cardName} onClose={() => setCardName(null)} />}
      {league && MP.on && MP.ready && MP.myMgr == null && !MP.spectate && <SeatLobby league={league} />}
      {league && <FeedbackButton league={league} tab={tab} />}
      {league && (MP.saveWarn || MP.error) && <div className="fixed bottom-3 left-3 right-3 z-50 text-sm px-4 py-3 rounded" style={{ background: THEME.panel, border: `1px solid ${THEME.gold}`, color: THEME.gold }}>{MP.saveWarn || MP.error}</div>}
      <ConfirmDialog dlg={dlg} onClose={() => setDlg(null)} />
    </div>
  );
}
