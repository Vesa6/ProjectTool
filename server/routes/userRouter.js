const userRouter = require('express').Router()
const testData = require('../testdata/usersdata')
const { ObjectId } = require("mongodb");

userRouter.get('/', async (request, response) => {
    try {
        console.log("getting")
        const db = request.app.locals.db;
        const result = await db.collection("users").find().toArray();
        response.json(result)
        console.log(result)
        console.log("GET ALL succesful")
    } catch {
        console.log("Getting all users failed ")
        response.status(400).end("error")
    }
})

userRouter.post('/', async (request, response) => {
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
                const result = await db.collection("users").insertOne(user);
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



userRouter.get('/:id', async (request, response) => {
    try {
        const db = request.app.locals.db;
        let projectId = new ObjectId(request.params.id) 
        const result = await db.collection("users").find({_id: projectId}).toArray();
        response.json(result)
        console.log("GET User with uuid succesful")
        console.log(result)
    } catch (e) {
        console.log(e)
        response.status(400).end("error")
    }
})



userRouter.put('/:id', async (request, response) => {
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
        const result = await db.collection("users").updateOne(filter, update, updateOptions);
        response.json(result)
        console.log("PUT succesful")
        console.log(result)
    } catch (e) {
        response.status(400).end("Error")
        console.log(e)
    }
})

userRouter.delete('/:id', async (request, response) => {
    try {
        const db = request.app.locals.db;
        const filter = { id: request.params.id }
        console.log(filter)
        const result = await db.collection("users").deleteOne(filter);
        response.json(result)
        console.log("DELETE was succesful")
    } catch (e) {
        console.log(e)
        response.status(400).end("error")
    }

})


userRouter.get('/test/addtestdata', async (request, response) => {
    try {
        const db = request.app.locals.db
        testData.forEach(jsonObj => {
            console.log(jsonObj)
            db.collection("users").insertOne(jsonObj);
        });
        response.json("test data added")
    } catch (e) {
        console.log(e)
        response.status(400).end("error")
    }
})

userRouter.get('/test/deletetestdata', async (request, response) => {
    try {
        const db = request.app.locals.db
        let users = await db.collection("users").find().toArray();
        console.log(users)
        users.forEach(object => {
            let filter = { _id: object._id }
            db.collection("users").deleteOne(filter);
        })
        response.json("test data removed")
    } catch (e) {
        console.log(e)
        response.status(400).end("error")
    }
})

module.exports = userRouter