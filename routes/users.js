const express = require("express");
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router();
const _ = require('lodash')
const bcrypt = require('bcrypt')

const { User, validate } = require("../models/users");

router.post("/", async(req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("USER ALREADY REGISTERED");

        user = new User(_.pick(req.body, ["name", "email", "password"]));

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save();
        console.log(user);

        const token = user.generateAuthToken();

        res.header('x-auth-token', token).send(_.pick(user, ["name", "email"]));
    } catch (err) {
        console.error("Error", err);
    }
});

module.exports = router;