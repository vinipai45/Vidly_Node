const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require('./genres')

function validateMovies(movie) {
    const schema = {
        title: Joi.string().min(3).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    }
    return Joi.validate(movie, schema)
}

const Movie = mongoose.model("Movie", new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 50,
        trim: true,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }

}))

exports.Movie = Movie
exports.validate = validateMovies