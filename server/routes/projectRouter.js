const projectRouter = require('express').Router()
const testData = require('../testdata/projectsdata')
const { ObjectId } = require('mongodb');


projectRouter.get('/', async (request, response) => {
  try {
    console.log("getting")
    const db = request.app.locals.db;
    const result = await db.collection("projects").find().toArray();
    response.json(result)
    console.log(result)
    console.log("GET ALL succesful")
  } catch {
    console.log("Getting all users failed ")
    response.status(400).end("error")
  }
})

projectRouter.post('/', async (request, response) => {
  const body = request.body
  console.log("Sending POST request")
  if (body.id && body.data) {
    const user = {
      id: body.id,
      data: body.data,
    }
    try {
      const db = request.app.locals.db;
      if (user) {
        const result = await db.collection("projects").insertOne(user);
        console.log("POST was succesful")
        response.json(result)
      }
    } catch (e) {
      console.log(e)
      response.status(400).end(console.log(e))
    }
  } else {

    response.json("POST failed")
    response.status(400).end(console.log("Request failed because id or data is empty"))
  }

})



projectRouter.get('/:id', async (request, response) => {
  try {
    const db = request.app.locals.db;
    const filter = { id: request.params.id }
    const result = await db.collection("projects").find(filter).toArray();
    response.json(result)
    console.log("GET User with uuid succesful")
    console.log(result)
  } catch (e) {
    console.log(e)
    response.status(400).end("error")
  }
})



projectRouter.put('/:id', async (request, response) => {
  const updateOptions = {
    // If set to true, creates a new document when no document matches the filter
    upsert: false,
    // If set to true, returns the updated document instead of the original document
    returnOriginal: false
  };
  body = request.body
  console.log("Sending PUT request")
  let update = {
    $set: {
      id: request.params.id,
      data: body.data
    }
  }
  console.log(request.params.id)
  try {
    const db = request.app.locals.db;
    const filter = { id: request.params.id }
    const result = await db.collection("projects").updateOne(filter, update, updateOptions);
    response.json(result)
    console.log("PUT succesful")
    console.log(result)
  } catch (e) {
    response.status(400).end("Error")
    console.log(e)
  }
})

// For calendars new tasks.
projectRouter.put('/:id/add-task', async (request, response) => {
  const db = request.app.locals.db;
  const projectId = new ObjectId(request.params.id);

  // console.log('Received Project ID:', request.params.id);
  // console.log('Converted to ObjectId:', projectId);

  try {

    const task = {
    _id: new ObjectId(), //Use this as unique ID. I don't think this needs to be displayed anywhere, but this is solid and easy to do.
    title: request.body.title,
    status: request.body.status || 'In Progress',
    start: request.body.start,
    end: request.body.end || '',  // not used atm so whatever
    participants: request.body.participants || [],
    ...request.body 
    };

    const updateResult = await db.collection('projects').updateOne(
      { _id: projectId },
      { $push: { tasks: task } }
    );

    console.log('MongoDB Update Result:', updateResult);

    if (updateResult.modifiedCount === 0) {
      return response.status(404).send('Project not found');
    }

    response.send('Task added successfully');
  } catch (error) {
    console.error('Database operation failed:', error);
    response.status(500).send('Error adding task to project');
  }
});



projectRouter.delete('/:id', async (request, response) => {
  try {
    const db = request.app.locals.db;
    const filter = { id: request.params.id }
    console.log(filter)
    const result = await db.collection("projects").deleteOne(filter);
    response.json(result)
    console.log("DELETE was succesful")
  } catch (e) {
    console.log(e)
    response.status(400).end("error")
  }

})


projectRouter.get('/test/addtestdata', async (request, response) => {
  try {
    const db = request.app.locals.db
    testData.forEach(jsonObj => {
      console.log(jsonObj)
      db.collection("projects").insertOne(jsonObj);
    });
    response.json("test data added")
  } catch (e) {
    console.log(e)
    response.status(400).end("error")
  }
})

projectRouter.get('/test/deletetestdata', async (request, response) => {
  try {
    const db = request.app.locals.db
    let projects = await db.collection("projects").find().toArray();
    console.log(projects)
    projects.forEach(object => {
      let filter = { _id: object._id }
      db.collection("projects").deleteOne(filter);
    })
    response.json("test data removed")
  } catch (e) {
    console.log(e)
    response.status(400).end("error")
  }
})

module.exports = projectRouter