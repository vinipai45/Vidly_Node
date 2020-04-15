const jwt = require('jsonwebtoken')
const config = require('config')

const auth = function(req, res, next) {
    try {
        const token = req.header('x-auth-token')
        if (!token) return res.status(401).send("Access Denied")
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded
        next();
    } catch (err) {
        res.status(400).send("Invalid TOken")
        console.error("Error", err);

    }
}

module.exports = auth