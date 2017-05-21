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

router.post('/', function(req, res, next) {
  knex('users')
    .where('fbid', `${req.body.authResponse.userID}`)
    .update({accessToken: req.body.authResponse.accessToken})
    .returning('*')
    .then(user => {
      if (user[0]) {
        res.send(user[0])
      } else {
        knex('users')
          .insert({
            fbid: req.body.authResponse.userID,
            accessToken: req.body.authResponse.accessToken
          }, '*')
          .then(user => {
            res.send(user[0])
          })
      }
    })
});

router.patch('/:id', function(req, res, next) {
  knex('users')
    .where('id', req.params.id)
    .update({name: req.body.name})
    .returning('*')
    .then(user => {
      res.send(user[0])
    })
})

module.exports = router;
