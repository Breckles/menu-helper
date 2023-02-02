import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'You must provide a value for MONGODB_URI in the .env.local file in the project root directory.'
  );
}

const client = new MongoClient(MONGODB_URI);

export default client.db();
