const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

/* GET home page. */


router.post('/', function(req, res, next) {
  console.log(req.body);
  knex('users_groups')
    .insert(req.body, '*')
    .then(insertion => {
      res.send(insertion)
    })
});

module.exports = router;
