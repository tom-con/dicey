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

router.get('/me', function(req, res, next) {
  let me = req.cookies.user
  knex('users')
    .where('fbid', me)
    .first()
    .then(me => {
      res.send(me)
    })
});

router.get('/:uid', function(req, res, next) {
  knex('users')
    .where('fbid', `${req.params.uid}`)
    .first()
    .then(user => {
      res.send(user ? user : false)
    })
});

router.post('/', function(req, res, next) {
  let user = req.body.authResponse
  knex('users')
    .insert({fbid: user.userID}, '*')
    .then(newUser => {
      res.send(newUser)
    })
})

router.patch('/:uid', function(req, res, next) {
  knex('users')
    .where('fbid', req.params.uid)
    .update(req.body)
    .returning('*')
    .then(user => {
      req.cookies.user ? null : res.cookie('user', req.body.fbid)
      res.send(user[0])
    })
})

module.exports = router;
