const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).send('Welcome!')
})

server.get('/accounts', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

server.get('/accounts/:id', (req, res) => {
    db('accounts').where({ id: req.params.id })
    .first()
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

module.exports = server;