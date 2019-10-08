const express = require('express');

// database access using knex
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  // get the list of posts from the db
  db.select('*')
    .from('Customers') // all knex commands return a promise
    .where('PostalCode', '=', '1010')
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

router.get('/:id', (req, res) => {
  db.select('*')
    .from('Suppliers')
    .where('SupplierID', '=', req.params.id)
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// can i use .where without req.params.id? is it ok to have a non-dynamic id?
router.get('/', (req, res) => {
    db.select('*')
      .from('Orders') 
      .where('OrderID', '<', '10258')
      .then(account => {
        res.status(200).json(account);
      })
      .catch(error => {
        res.status(500).json(error);
      })
});

router.get('/', (req, res) => {
    db.select('*')
      .from('Customers') 
      .where('City', '=', 'London' , 'or', 'City', '=', 'Mardrid', 'or', 'Country', '=', 'Brazil')
      .then(account => {
        res.status(200).json(account);
      })
      .catch(error => {
        res.status(500).json(error);
      })
});

router.post('/', (req, res) => {
  const accountData = req.body;
  // validate the data before saving it to the database. NEVER TRUST THE CLIENT!!

  // insert into posts () values ()
  // db.insert(postData, 'id').into('posts')
  db('Customers')
    .insert(accountData, 'id')
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(error => {
      // remember to handle the error
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  db('Customers')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      // remember to handle the error
      res.status(500).json(error);
    });
});

// router.delete('/:id', (req, res) => {
//   db('posts')
//     .where({ id: req.params.id })
//     .del()
//     .then(count => {
//       res.status(200).json(count);
//     })
//     .catch(error => {
//       // remember to handle the error
//       res.status(500).json(error);
//     });
// });

module.exports = router;