const regRouter = require('express').Router()
const testData = require('../testdata/logindata')
const bcrypt = require('bcrypt')

regRouter.post('/', async (request, response) => {
    const body = request.body;
    const saltRounds = 10;
    let emailList = []
    const db = request.app.locals.db
    try {
        let users = await db.collection("login").find().toArray();
        users.forEach(object => {
            emailList.push(object.email)
        })
        if (emailList.includes(body.email)) {
            console.log("Email already in use")
            response.status(400).send("Email already in use")
        } else {
            let passHash = await bcrypt.hash(body.password, saltRounds)
            let regUser = {
                name: body.name,
                email: body.email,
                password: passHash
            }
            db.collection("login").insertOne(regUser);
            console.log("Registration succesful")
            response.status(201).end("Registration succesful")
        }
    } catch (e) {
        console.log(e)
        response.status(400).end("error")
    }
})

regRouter.get('/test/addtestdata', async (request, response) => {
    const saltRounds = 10
    try {
        const db = request.app.locals.db
        testData.forEach(async jsonObj => {
            console.log(jsonObj)
            jsonObj.password = await bcrypt.hash(jsonObj.password, saltRounds)
            console.log(jsonObj)
            db.collection("login").insertOne(jsonObj);
        });
        response.json("test data added")
    } catch (e) {
        console.log(e)
        response.status(400).end("error")
    }
})

regRouter.get('/test/deletetestdata', async (request, response) => {
    try {
        const db = request.app.locals.db
        let users = await db.collection("login").find().toArray();
        console.log(users)
        users.forEach(object => {
            let filter = { _id: object._id }
            db.collection("login").deleteOne(filter);
        })
        response.json("test data removed")
    } catch (e) {
        console.log(e)
        response.status(400).end("error")
    }
})

module.exports = regRouter