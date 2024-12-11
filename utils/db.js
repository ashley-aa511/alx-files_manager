// Import the MongoDB client from the MongoDB library
const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        // Retrieve environment variables or use defaults
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || '27017';
        const database = process.env.DB_DATABASE || 'files_manager';

        // Create the connection URI and MongoDB client
        const uri = `mongodb://${host}:${port}`;
        this.client = new MongoClient(uri, { useUnifiedTopology: true });

        // Connect to the database
        this.client.connect().catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
        });
        this.db = this.client.db(database);
    }

    // Check if the connection to MongoDB is alive
    isAlive() {
        return this.client && this.client.isConnected();
    }

    // Get the number of documents in the 'users' collection
    async nbUsers() {
        try {
            const usersCollection = this.db.collection('users');
            return await usersCollection.countDocuments();
        } catch (error) {
            console.error('Error fetching user count:', error);
            return 0;
        }
    }

    // Get the number of documents in the 'files' collection
    async nbFiles() {
        try {
            const filesCollection = this.db.collection('files');
            return await filesCollection.countDocuments();
        } catch (error) {
            console.error('Error fetching file count:', error);
            return 0;
        }
    }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
