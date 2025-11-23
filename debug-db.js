require('dotenv').config();
const { createDatabase, createLocalDatabase } = require("@tinacms/datalayer");
const { MongodbLevel } = require("mongodb-level");
const { GitHubProvider } = require("tinacms-gitprovider-github");

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const database = isLocal
  ? createLocalDatabase()
  : createDatabase({
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

async function run() {
  try {
    console.log('Getting schema...');
    const schema = await database.getSchema();
    console.log('Schema collections:', schema ? schema.getCollections().map(c => c.name) : 'No schema found');

    console.log('Using resolve from @tinacms/graphql...');
    const { resolve } = require('@tinacms/graphql');
    const result = await resolve({
      database,
      query: 'query { postConnection { edges { node { id } } } }',
      variables: {},
    });
    
    console.log('Resolve result:', JSON.stringify(result, null, 2));
  } catch (e) {
    console.error('Error:', e);
  }
}

run();
