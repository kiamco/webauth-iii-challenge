const Router = require('express').Router();
const bycrypt = require('bcryptjs');

// import data model fo users table
const db = require('../users/userModel');

// register endpoint
Router.post('/register', (req, res) => {
    let user = req.body

    const hash = bycrypt.hashSync(user.password, 10)
    user.password = hash

    db.add(user)
        .then(user => {
            res.status(201).json({ user });
        })
        .catch(err => console.error(err));
})

// login endpoint
Router.post('/login', (req, res) => {
    let { username, password } = req.body;

    db.findBy(username)
        .then(item => {
            console.log(item)
            if (item && bycrypt.compareSync(password, item[0].password)) {
                res.status(200).json({ username: item[0].username });
            }
        })
})

module.exports = Router;