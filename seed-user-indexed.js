require('dotenv').config();
const { createDatabase } = require("@tinacms/datalayer");
const { MongodbLevel } = require("mongodb-level");
const { GitHubProvider } = require("tinacms-gitprovider-github");
const bcrypt = require("bcryptjs");

async function run() {
  console.log("Starting indexed user seed...");
  
  const database = createDatabase({
    gitProvider: new GitHubProvider({
      branch: process.env.GITHUB_BRANCH || "",
      owner: process.env.GITHUB_OWNER || "",
      repo: process.env.GITHUB_REPO || "",
      token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN || "",
    }),
    databaseAdapter: new MongodbLevel({
      collectionName: "tinacms",
      dbName: "tinacms",
      mongoUri: process.env.MONGODB_URI || "",
    }),
  });

  const username = process.argv[2] || "admin";
  const password = process.argv[3] || "password";
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(`Creating indexed user ${username}...`);

  // Use database.put which should handle both storage AND indexing
  const userDocument = {
    users: [
      {
        username,
        password: hashedPassword,
        id: username,
      }
    ]
  };

  try {
    // This should trigger indexing
    await database.put({
      collection: "user",
      relativePath: "index.json",
      data: userDocument,
    });
    
    console.log("✅ User created and indexed successfully!");
    console.log("Username:", username);
    console.log("Password:", password);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Full error:", error);
  }
  
  process.exit(0);
}

run().catch(console.error);
