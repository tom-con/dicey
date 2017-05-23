const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:id', function(req, res, next) {
  knex('sentences')
    .where('id', req.params.id)
    .where('is_completed', false)
    .first()
    .then(sentence => {
      res.send(sentence)
    })
});

router.post('/', function(req, res, next) {
    knex('sentences')
      .insert(req.body, '*')
      .then(sentence => sentence[0])
});


module.exports = router;
