// BUILD YOUR SERVER HERE
const express = require('express');
const Data = require('../api/users/model.js');
const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
    Data.insert(req.body)
    .then(result => {
        if (name == null || name == "") {
            res.status(400).json({ message: "Please provide a name for the user" })
        } else if (bio == null || bio == "") {
            res.status(400).json({ message: "Please provide a bio for the user" })
        } else {
            res.status(201).json(result)
        }
    })
    .catch(result => {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    })
})

server.get('/api/users', (req, res) => {
    Data.find()
    .then(result => {
        res.json(result)
    })
    .catch(result => {
        res.status(500).json({ message: "The users information could not be retrieved" })
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Data.findById(id)
    .then(result => {
        if (result == null) {
            res.status(404).json({ message:"The user with the specified ID does not exist" })
        } else {
            res.json(result)
        }
    })
    .catch(result => {
        res.status(500).json({ message: "The user information could not be retrieved"  })
    })
})



module.exports = server