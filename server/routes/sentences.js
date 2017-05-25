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
  let user = req.cookies.user
  knex('sentences')
    .where('id', req.params.id)
    .update({content: req.body.content, current_turn: req.body.current_turn}, '*')
    .then(sentence => {
      res.send(sentence)
    })
});


module.exports = router;
