const mongoose = require("mongoose");
const Joi = require("joi");

function validateGenres(genre) {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    return Joi.validate(genre, schema);
}

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        required: true,
        lowercase: true,
    },
})

const Genre = mongoose.model("Genre", genreSchema);

exports.Genre = Genre
exports.validate = validateGenres
exports.genreSchema = genreSchema