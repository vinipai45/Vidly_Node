const bcrypt = require("bcrypt");

const express = require("express");
const Joi = require("joi");

const { User } = require("../models/users");
const router = express();

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(req, schema);
}

router.post("/", async(req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid Username or Password");

        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(400).send("Invalid Username or Password");

        const token = user.generateAuthToken();
        res.send({ token });
    } catch (err) {
        console.error("Error", err);
    }
});

module.exports = router;