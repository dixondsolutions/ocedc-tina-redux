require('dotenv').config();
const { MongoClient } = require('mongodb');

async function run() {
  const mongoUri = process.env.MONGODB_URI;
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    const db = client.db("tinacms");
    const collection = db.collection("tinacms");
    
    console.log("Deleting all user-related records...");
    
    const result = await collection.deleteMany({
      key: /content\/users/
    });
    
    console.log(`✅ Deleted ${result.deletedCount} user records`);
    console.log("\nNow trigger a redeploy on Vercel to re-index from Git");
    
  } finally {
    await client.close();
  }
  
  process.exit(0);
}

run().catch(console.error);
