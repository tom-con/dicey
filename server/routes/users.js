const express = require('express');
const router = express.Router();
const knex = require('../db/knex')


/* GET users listing. */
router.get('/', function(req, res, next) {

  knex('users')
    .then(users => {
      res.send(users)
    })

});

module.exports = router;
