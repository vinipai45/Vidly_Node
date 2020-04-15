const express = require("express");
const router = express.Router();
const { Movie, validate } = require("../models/movies");
const { Genre } = require("../models/genres");

router.post("/", async(req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(404).send("NOT FOUND");

        const movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name,
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        });
        const result = await movie.save();
        console.log(result);

        res.send(result);
    } catch (err) {
        console.error("Error", err);
    }
});

router.get("/", async(req, res) => {
    try {
        const movies = await Movie.find();
        console.log(movies);

        res.send(movies);
    } catch (err) {
        console.error("Error", err);
    }
});

router.get("/:id", async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send("NOT FOUND");
        console.log(movie);
        res.send(movie);
    } catch (err) {
        console.error("Error", err);
    }
});

router.put("/:id", async(req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(404).send("NOT FOUND");

        const movie = await Movie.findByIdAndUpdate(
            req.params.id, {
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name,
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate,
            }, { new: true }
        );

        if (!movie) return res.status(404).send("NOT FOUND");
        console.log(movie);
        res.send(movie);
    } catch (err) {
        console.error("Error", err);
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const movie = await Movie.findByIdAndRemove(req.params.id);
        if (!movie) return res.status(404).send("NOT FOUND");
        console.log(movie);
        res.send(movie)
    } catch (err) {
        console.error("Error", err);

    }


});

module.exports = router