// Run this script AFTER you log into /admin for the first time
// It will create an admin user via the TinaCMS GraphQL API
// Usage: node create-admin-via-api.js

const fetch = require('node-fetch');

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_TINA_API_URL || 'http://localhost:3000/api/tina/gql';
const USERNAME = 'admin';
const PASSWORD = 'password'; // Change this!

const mutation = `
  mutation CreateUser($relativePath: String!, $params: UserMutation!) {
    createDocument(
      collection: "user"
      relativePath: $relativePath
      params: $params
    ) {
      __typename
    }
  }
`;

async function createUser() {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          relativePath: 'index.json',
          params: {
            users: [
              {
                username: USERNAME,
                password: PASSWORD,
                id: USERNAME,
              }
            ]
          }
        }
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL Errors:', JSON.stringify(result.errors, null, 2));
      process.exit(1);
    }
    
    console.log('✅ Admin user created successfully!');
    console.log('Username:', USERNAME);
    console.log('Password:', PASSWORD);
    console.log('\n⚠️  IMPORTANT: Change the password immediately after logging in!');
    
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    process.exit(1);
  }
}

createUser();
