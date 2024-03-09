const userRouter = require('express').Router()
const User = require('../models/user')
const errorMsg = "Error, request failed"


userRouter.get('/', async(request, response) => {
    try{
    const result = await User.find({})
    await response.json(result)
    console.log("GET ALL succesful")
    }catch{
        console.log("Getting all graphs failed ")
        response.status(400).end(errorMsg)
    }
})

userRouter.post('/', async(request, response) => {
    const body = request.body
    console.log("Sending POST request")
    const graph = new User({
        json: body.json,
        uuid: body.uuid,
    })
    console.log(graph)
    try{
        if (graph){
        const result = await graph.save()
        console.log("POST was succesful")
        response.json(result)
    }
    }catch{
    response.status(400).end(console.log(errorMsg))
}
})



userRouter.get('/:uuid', async(request,response) => {
    try{
    const result = await User.find({ "uuid" : request.params.uuid})
    await response.json(result)
    console.log("GET User with uuid succesful")
    console.log(result)
    }catch{
        console.log("GET failed")
        response.status(400).end(errorMsg)
    }
})



userRouter.put('/:id', async(request, response) => {
    body = request.body
    console.log("Sending PUT request")
    let graph = {
        uuid: body.uuid,
        json: body.json
    }

    try{
        console.log(request.params.id)
        const result = await User.findByIdAndUpdate(request.params.id, graph, {new:true})
        await response.json(result)
        console.log("PUT succesful")
        console.log(result)
    }catch{
        response.status(400).end(errorMsg)
        console.log("PUT request failed")
    }
})

userRouter.delete('/:id',async(request, response) => {
    try{
        let result = await User.findByIdAndDelete(request.params.id)
        response.json(result)
        console.log("DELETE was succesful")
    }catch{
        response.status(400).end(errorMsg)
    }

})


module.exports = userRouter