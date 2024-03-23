const userRouter = require('express').Router()

userRouter.get('/', async(request, response) => {
    try{
    console.log("getting")
    const db = request.app.locals.db;
    const result = await db.collection("users").find().toArray();
    response.json(result)
    console.log(result)
    console.log("GET ALL succesful")
    }catch{
        console.log("Getting all users failed ")
        response.status(400).end("error")
    }
})

userRouter.post('/', async(request, response) => {
    const body = request.body
    console.log("Sending POST request")
    if (body.username  && body.data){
        const user = {
            username: body.username,
            data: body.data,
        }
        try{
            const db = request.app.locals.db;
            if (user){
            const result = await db.collection("users").insertOne(user);
            console.log("POST was succesful")
            response.json(result)
        }
        }catch(e){
        response.status(400).end(console.log(e))
        }
    } else {
        response.json("POST failed")
        response.status(400).end(console.log("Request failed because username or data is empty"))
    }
    
})



userRouter.get('/:username', async(request,response) => {
    try{
    const db = request.app.locals.db;
    const filter = {username: request.params.username}
    const result = await db.collection("users").find(filter).toArray();
    response.json(result)
    console.log("GET User with uuid succesful")
    console.log(result)
    }catch(e){
        console.log(e)
        response.status(400).end("error")
    }
})



userRouter.put('/:username', async(request, response) => {
    const updateOptions = {
        // If set to true, creates a new document when no document matches the filter
        upsert: false,
        // If set to true, returns the updated document instead of the original document
        returnOriginal: false
    };    
    body = request.body
    console.log("Sending PUT request")
    let update = { $set: {
        username: request.params.username,
        data: body.data
        }
    }
    console.log(update)
    console.log(request.params.username)
    try{
        const db = request.app.locals.db;
        const filter = {username: request.params.username}
        const result = await db.collection("users").updateOne(filter, update, updateOptions);
        response.json(result)
        console.log("PUT succesful")
        console.log(result)
    }catch(e){
        response.status(400).end("Error")
        console.log(e)
    }
})

userRouter.delete('/:username',async(request, response) => {
    try{
        const db = request.app.locals.db;
        const filter = {username: request.params.username}
        console.log(filter)
        const result = await db.collection("users").deleteOne(filter);
        response.json(result)
        console.log("DELETE was succesful")
    }catch(e){
        response.status(400).end("error")
    }

})


module.exports = userRouter