require('dotenv').config({ path:'../.env'})
const { MongoClient } = require('mongodb');

const url = process.env.MONGOURI;
const dbName = 'test';

async function connectToDatabase() {
    const client = new MongoClient(url, {});
    
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectToDatabase;