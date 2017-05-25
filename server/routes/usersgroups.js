const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

router.get('/', function(req, res, next) {
  let user = req.cookies.user
  knex('users_groups')
    .join('groups', 'users_groups.group_id', 'groups.id')
    .where('users_groups.user_fbid', user)
    .then(groups => {
      res.send(groups)
    })
})

router.get('/:id', function(req, res, next) {
  let groupID = req.params.id
  knex('users_groups')
  .select('user_fbid')
    .where('group_id', groupID)
    .then(users => {
      res.send(users)
    })
})

router.get('/a/:id', function(req, res, next) {
  let groupID = req.params.id
  knex('users_groups')
  .select('user_fbid')
    .where('group_id', groupID)
    .where('is_approved', false)
    .then(users => {
      res.send(users)
    })
})

router.post('/', function(req, res, next) {
  knex('users_groups')
    .insert(req.body, '*')
    .then(insertion => {
      res.send(insertion)
    })
});

router.patch('/:id', function(req, res, next) {
  let groupID = req.params.id
  let userID = req.cookies.user
  knex('users_groups')
    .where('group_id', groupID)
    .where('user_fbid', userID)
    .update({is_approved: true}, '*')
    .then(user => {
      res.send(user[0])
    })
})

module.exports = router;
