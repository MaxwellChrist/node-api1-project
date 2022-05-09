// BUILD YOUR SERVER HERE
const express = require('express');
const Data = require('../api/users/model.js');
const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
    if (!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        Data.insert(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(result => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
    }
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

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Data.remove(id)
    .then(result => {
        if (result == null) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.json(result)
        }
    })
    .catch(result => {
        res.status(500).json({ message: "The user could not be removed"})
    })
})

server.put('/api/users/:id', (req, res) => {
    const {name, bio} = req.body;
    const id = req.params.id;
    if (!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user"})
    } else {
        Data.update(id, req.body) 
        .then(result => {
            if (result == null) {
                res.status(404).json({ message: "The user with the specified ID does not exist"})
            } else {
                res.status(200).json(result)
            }
        })
        .catch(result => {
            res.status(500).json({ message: "The user information could not be modified" })
        })
    }
})



module.exports = server