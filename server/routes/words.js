const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

router.get('/:id', function(req, res, next) {
  knex('words')
    .where("sentence_id", req.params.id)
    .orderBy('position')
    .then(words => {
      res.send(words)
    })
})

router.get('/s/:id', function(req, res, next) {
  knex('words')
    .where("sentence_id", req.params.id)
    .whereNot("author_fbid", null)
    .orderBy('updated_at', 'DESC')
    .then(words => {
      res.send(words)
    })
})

router.post('/', function(req, res, next) {
  knex('words')
    .insert(req.body, '*')
    .then(word => {
      console.log("getting it");
      res.send(word[0])
    })
})

router.patch('/:id', function(req, res, next) {
  let user = req.cookies.user
  knex('words')
    .where('id', req.params.id)
    .update({text: req.body.text, author_fbid: user, updated_at: req.body.updated_at}, '*')
    .then(word => {
      res.send(word[0])
    })
})


module.exports = router;
