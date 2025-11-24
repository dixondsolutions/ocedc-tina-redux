require('dotenv').config();
const { MongodbLevel } = require("mongodb-level");

async function run() {
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
  
  console.log("Listing keys in database...");
  const iterator = databaseAdapter.iterator();
  let count = 0;
  for await (const [key, value] of iterator) {
    if (key.includes('content/users')) {
        console.log(`\nKey: ${key}`);
        let displayValue = value;
        if (typeof value === 'string') {
            try {
                displayValue = JSON.parse(value);
            } catch (e) {
                // Not JSON, display as is
            }
        }
        console.log(`Value:`, JSON.stringify(displayValue, null, 2));
    }
    count++;
    if (count > 1000) break; // Limit output
  }
  console.log(`Total keys listed: ${count}`);
  process.exit(0);
}

run().catch(console.error);
