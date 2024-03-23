const loginRouter = require('express').Router()

loginRouter.post('/', async(request, response) => {
    const body = request.body
    console.log("Sending POST request")
    if (body.username  && body.password){
        const user = {
            username: body.username,
            password: body.password,
        }
        try{
            const db = request.app.locals.db;
            if (user){
            const result = await db.collection("login").insertOne(user);
            console.log("POST was succesful")
            response.json(result)
        }
        }catch(e){
        response.status(400).end(console.log(e))
        }
    } else {
        response.json("POST failed")
        response.status(400).end(console.log("Request failed because username or password is empty"))
    }
    
})

loginRouter.get('/:username', async(request,response) => {
    try{
    const db = request.app.locals.db;
    const filter = {username: request.params.username}
    const result = await db.collection("login").find(filter).toArray();
    response.json(result)
    console.log("GET User with uuid succesful")
    console.log(result)
    }catch(e){
        console.log(e)
        response.status(400).end("error")
    }
})



loginRouter.put('/:username', async(request, response) => {
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
        password: body.password
        }
    }
    console.log(update)
    console.log(request.params.username)
    try{
        const db = request.app.locals.db;
        const filter = {username: request.params.username}
        const result = await db.collection("login").updateOne(filter, update, updateOptions);
        response.json(result)
        console.log("PUT succesful")
        console.log(result)
    }catch(e){
        response.status(400).end("Error")
        console.log(e)
    }
})

module.exports = loginRouter