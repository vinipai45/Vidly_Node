const mongoose = require('mongoose')
const Joi = require('joi')
const config = require('config')
const jwt = require("jsonwebtoken");

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(3).required()
    }
    return Joi.validate(user, schema)
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    }

})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
    return token
}


const User = mongoose.model("User", userSchema)


exports.User = User
exports.validate = validateUser