require('dotenv').config();
const { MongoClient } = require('mongodb');

async function run() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("Error: MONGODB_URI is not set in .env file.");
    process.exit(1);
  }
  console.log(`Using MongoDB URI: ${mongoUri.replace(/:([^:@]+)@/, ':****@')}`);

  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    const db = client.db("tinacms");
    const collection = db.collection("tinacms");
    
    console.log("\n=== First 5 documents in collection ===");
    const cursor = collection.find({}).limit(5);
    for await (const doc of cursor) {
      console.log('\nDocument:', JSON.stringify(doc, null, 2));
    }
    
    console.log("\n\n=== Searching for user documents (by key field) ===");
    const userCursor = collection.find({ key: /content\/users/ });
    let count = 0;
    for await (const doc of userCursor) {
      console.log(`\nUser document found:`);
      console.log(JSON.stringify(doc, null, 2));
      count++;
    }
    console.log(`\n=== Total user documents found: ${count} ===`);
  } finally {
    await client.close();
  }
  
  process.exit(0);
}

run().catch(console.error);
