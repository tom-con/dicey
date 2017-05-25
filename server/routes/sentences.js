const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

router.get('/:id', function(req, res, next) {
  knex('sentences')
    .join('groups', 'groups.id', 'sentences.group_id')
    .where('sentences.group_id', req.params.id)
    .where('sentences.is_completed', false)
    .first()
    .then(sentence => {
      res.send(sentence)
    })
});

router.post('/', function(req, res, next) {
    knex('sentences')
      .insert(req.body)
      .returning('*')
      .then(sentence => {
        res.send(sentence[0])
      })
});

router.patch('/:id', function(req, res, next) {
  knex('sentences')
    .where('id', req.params.id)
    .update(req.body, '*')
    .then(sentence => {
      res.send(sentence[0])
    })
});


module.exports = router;
