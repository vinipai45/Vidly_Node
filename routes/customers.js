const express = require("express");
const { Customer, validate } = require('../models/customers')
const router = express.Router();

router.post("/", async(req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const customer = new Customer({
            isGold: req.body.isGold,
            phone: req.body.phone,
            name: req.body.name,
        });
        const result = await customer.save();
        console.log(result);
        res.send(result);
    } catch (err) {
        console.error("Error", err);
    }
});

router.get("/", async(req, res) => {
    try {
        const customers = await Customer.find();
        console.log(customers);
        res.send(customers);
    } catch (err) {
        console.error("Error", err);
    }
});

router.get("/:id", async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.send(404).send("NOT FOUND");
        console.log(customer);
        res.send(customer);
    } catch (err) {
        console.error("Error", err);
    }
});

router.put("/:id", async(req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id, {
                name: req.body.name,
                phone: req.body.phone,
                isGold: req.body.isGold,
            }, { new: true }
        );
        if (!customer) return res.status(404).send("NOT FOUND")
        console.log(customer)
        res.send(customer)
    } catch (err) {
        console.error("Error", err);
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if (!customer) return res.status(404).send("NOT FOUND");
        console.log(customer);
        res.send(customer);
    } catch (err) {
        console.error("Error", err);
    }
});

module.exports = router;