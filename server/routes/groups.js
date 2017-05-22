const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  let user = req.cookies.user
  knex('groups')
    .insert({name: req.body.name, word_limit: req.body.word_limit, owner: user}, '*')
    .then(group => {
      res.send(group)
    })
});

module.exports = router;
