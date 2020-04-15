const express = require("express");
const auth = require('../middleware/auth')
const { Genre, validate } = require('../models/genres')
const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const result = await Genre.find();
        res.send(result);
    } catch (err) {
        console.error("Error", err);
    }
});

router.get("/:id", async(req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send("NOT FOUND");
        console.log(genre);
        res.send(genre);
    } catch (err) {
        console.error("Error", err);
    }
});

router.post("/", auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const genre = new Genre({
            name: req.body.name,
        });
        const result = await genre.save();
        console.log(result);
        res.send(result);
    } catch (err) {
        console.error("Error", err);
    }
});

router.put("/:id", async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const genre = await Genre.findByIdAndUpdate(
            req.params.id, { name: req.body.name }, { new: true }
        );
        if (!genre) return res.status(404).send("Not found");
        console.log(genre);
        res.send(genre);
    } catch (err) {
        console.error("Error", err);
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if (!genre) return res.status(404).send("Not found");
        console.log(genre);
        res.send(genre);
    } catch (err) {
        console.error("Error", err);
    }
});

module.exports = router;