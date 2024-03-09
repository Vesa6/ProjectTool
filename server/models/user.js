const mongoose = require('mongoose')

const userSchema = mongooseSchema({
    json : '',
    uuid : {type : String, unique: true, required:true},
})

const User = mongoose.model('User', userSchema);

module.exports = User