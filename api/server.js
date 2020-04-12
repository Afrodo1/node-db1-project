const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req,res) =>{
    db('accounts')
        .then(account =>{
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({message: "error retrieving data"})
        })

});

server.get("/:id", (req, res) => {
    const { id } = req.params;

    db('accounts')
      .where({ id })
      .then((account) => res.status(200).json(account))
      .catch((err) =>
        res.status(500).json({ message: "error retrieving account with id", err })
      );
});

server.post('/', (req, res) => {
    const accountData= req.body;
    db('accounts')
    .insert(accountData)
    .then((account) => res.status(200).json(accountData))
      .catch((err) =>
        res.status(500).json({ message: "faild to create account ", err })
      );
});

server.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts')
    .where({id})
    .update(changes)
    .then((account) => {
        if(account){ res.status(200).json(changes)
        } else {
            res.status(404).json({message: "account not found", })
        }
    })
    .catch((err) =>
    res.status(500).json({ message: "faild to create account ", err })
    );
});

server.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
    .where({id})
    .del()
    .then((account) => {
        if(account){ res.status(200).json({message: "account deleted succesfully"})
        } else {
            res.status(404).json({message: "account not found", })
        }
    })
    .catch((err) =>
    res.status(500).json({ message: "failed to delete account ", err })
    );
});


module.exports = server;
