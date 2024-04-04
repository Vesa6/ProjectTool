const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
require('dotenv').config({ path: '../.env' })
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
    let secret = process.env.SECRET;
    const body = request.body
    const db = request.app.locals.db
    console.log("Sending LOGIN request")
    if (body.email && body.password) {
        let filter = { email: body.email }
        const user = await db.collection("login").find(filter).toArray();
        let passhash = ""
        try {
            passhash = user[0].password
        } catch (e) {
            return response.status(400).send("no user found");
        }
        if (passhash) {
            const isPwdCorrect = user === null
                ? false
                : await bcrypt.compare(body.password, user[0].password)
            if (!isPwdCorrect) {
                return response.status(400).send("Wrong password")
            }
            console.log("Password matches")
            const userForToken = {
                email: user.email,
                id: user._id
            }
            console.log(user)
            const token = jwt.sign(userForToken, secret, {expiresIn: 60*60})
            return response.status(200).send({token, email: user[0].email, name: user[0].name});
        } else {
            return response.status(400).send("No account associated with this email")
        }

    } else {
        response.status(400).send("Login failed, username or password is not correct")
    }

})

loginRouter.get('/:id', async (request, response) => {
    try {
        const db = request.app.locals.db;
        const filter = { id: request.params.id }
        const result = await db.collection("login").find(filter).toArray();
        response.json(result)
        console.log("GET User with uuid succesful")
        console.log(result)
    } catch (e) {
        console.log(e)
        response.status(400).end("error")
    }
})



loginRouter.put('/:username', async (request, response) => {
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
            username: request.params.username,
            password: body.password
        }
    }
    console.log(update)
    console.log(request.params.username)
    try {
        const db = request.app.locals.db;
        const filter = { username: request.params.username }
        const result = await db.collection("login").updateOne(filter, update, updateOptions);
        response.json(result)
    } catch (e) {
        response.status(400).end("Error")
        console.log(e)
    }
})

module.exports = loginRouter