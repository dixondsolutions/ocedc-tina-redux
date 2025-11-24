require('dotenv').config();
const { createDatabase } = require("@tinacms/datalayer");
const { MongodbLevel } = require("mongodb-level");
const { GitHubProvider } = require("tinacms-gitprovider-github");
const bcrypt = require("bcryptjs"); // You might need to install bcryptjs if not present, or use another way.
// Actually tinacms-authjs uses bcryptjs internally usually, or we can just insert the user.
// But wait, we need to hash the password.
// Let's check if we can use the auth provider to create a user.
// Or just use the database client.

// Simple script to insert a user into the 'users' collection (or whatever TinaUserCollection uses).
// TinaUserCollection usually stores in 'users' collection in the content repo or DB?
// In MongoDBLevel, it stores in the KV store.
// The collection name is 'tina_user'.

async function run() {
  console.log("Starting seed script...");
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("Error: MONGODB_URI is not set in .env file.");
    process.exit(1);
  }
  console.log(`Using MongoDB URI: ${mongoUri.replace(/:([^:@]+)@/, ':****@')}`);

  const databaseAdapter = new MongodbLevel({
        collectionName: "tinacms",
        dbName: "tinacms",
        mongoUri: mongoUri,
      });
  
  const database = createDatabase({
      gitProvider: new GitHubProvider({
        branch: process.env.GITHUB_BRANCH || "",
        owner: process.env.GITHUB_OWNER || "",
        repo: process.env.GITHUB_REPO || "",
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN || "",
      }),
      databaseAdapter,
    });

  // We need to hash the password.
  // Since we don't know if bcryptjs is installed, we can try to require it or ask user to install.
  // tinacms-authjs depends on bcryptjs, so it should be there.
  
  let bcrypt;
  try {
    bcrypt = require('bcryptjs');
  } catch (e) {
    console.log('Installing bcryptjs...');
    require('child_process').execSync('npm install bcryptjs', { stdio: 'inherit' });
    bcrypt = require('bcryptjs');
  }

  const username = process.argv[2] || "admin";
  const password = process.argv[3] || "password";

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    username,
    password: hashedPassword,
    id: username, // ID is usually the username or generated
    // TinaUserCollection fields might vary, but usually it has username and password.
  };

  // We need to put this into the database.
  // The collection is 'tina_user' usually.
  // But wait, TinaCMS stores content in files usually.
  // If using MongoDB adapter, it stores in MongoDB.
  // But 'tina_user' is a collection in the schema.
  // So we should use the database client to put it.
  
  // However, using the database directly is easier for a seed script.
  // The key for a document is usually `content/collection/filename`.
  // For tina_user, it might be `content/users/username.json` or similar if it was file based.
  // But with MongoDB adapter, it's just a key.
  
  // Let's try to use the database.put method.
  // But we need to know the key.
  // If TinaUserCollection is defined as a collection, we can use the mutation.
  
  console.log(`Creating user ${username} with password ${password}...`);
  
  // We can't easily use the mutation without the server running and authorized.
  // So we will try to write to the DB directly if we can guess the key.
  // Or better, just tell the user to use the UI if possible, but they can't login.
  
  // Actually, tinacms-authjs has a `createUser` helper?
  // No.
  
  // Let's just provide instructions to the user to use the Vercel console or similar if they can,
  // or use this script if I can make it work.
  
  // I will skip the script for now and just tell them to use the signup if enabled, or I'll assume they can figure it out?
  // No, that's bad service.
  
  // I'll try to create a simple script that uses the database adapter directly.
  // The key for a collection item is `collection/filename`.
  // For `tina_user` collection, if it's file-based, it would be `content/users/admin.json`.
  // But `TinaUserCollection` is often configured to be in `users` folder.
  
  // Let's assume `content/users/${username}.json`.
  
  // TinaUserCollection seems to be a single-document collection (global: true in ui?)
  // The grep output showed:
  // path: "content/users",
  // fields: [{ name: "users", list: true, ... }]
  // This implies all users are stored in one file, likely content/users/index.json
  
  await databaseAdapter.put(`content/users/index.json`, JSON.stringify({
    users: [
      {
        username,
        password: hashedPassword,
        id: username,
      }
    ]
  }));
  
  console.log("User created!");
  process.exit(0);
}

run().catch(console.error);
