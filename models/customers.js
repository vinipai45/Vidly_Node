const mongoose = require("mongoose");
const Joi = require("joi");

function validateCustomers(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(5).required(),
    };
    return Joi.validate(customer, schema);
}

const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
        isGold: {
            type: Boolean,
            required: true,
        },
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            lowercase: true,
        },
        phone: {
            type: Number,
            required: true,
            min: 5,
        },
    })
);

exports.Customer = Customer
exports.validate = validateCustomers