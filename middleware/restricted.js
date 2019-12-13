const jwt = require('jsonwebtoken');
const secrets = require('../config/secret.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;;
    console.log(req.headers, token)
    if (req.decodedJwt) {
        next();
    } else if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
            // if the token doesn't verify
            console.log(decodedJwt)
            if (err) {
                res.status(401).json({
                    you: err
                });
                // if it DOES...
            } else {
                req.decodedJwt = decodedJwt;
                next();
            }
        })
    } else {
        res.status(401).json({
            you: 'elsee'
        });
    }
}