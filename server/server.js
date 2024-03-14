const cors = require('cors');
const express = require('express');
const loginRoute = require('./routes/login');
const { MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config({ path:'../.env'})

const app = express();
app.use(express.json());
app.use(cors());
//process.env.MONGORUI is the value of MONGOURI in .env file
const client = new MongoClient(process.env.MONGOURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
})
  async function run() {
    try {
      // Connect the client to the server
      const database = client.db("test");
      const logins = database.collection("logins")
      var test_user = {
        username: "hello",
        passoword: "test",
      }
      const result = await logins.insertOne(test_user)
      console.log(`TEST insert into users collection with id ${result.insertedId}`)
     /* db.collection.insert({Username: "HELLO",
                          Password: "hello"});*/

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