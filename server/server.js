const cors = require('cors');
const express = require('express');
const loginRoute = require('./routes/login');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path:'../.env'})

const app = express();
app.use(express.json());
app.use(cors());
const client = new MongoClient(process.env.MONGOURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

run()
app.use('/login', loginRoute);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});