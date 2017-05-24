const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

/* GET home page. */

router.get('/', function(req, res, next) {
  let user = req.cookies.user
  knex('users_groups')
    .select('*')
    .join('groups', 'users_groups.group_id', 'groups.id')
    .where('users_groups.user_id', user)
    .then(groups => {
      res.send(groups)
    })
})

router.get('/g/:id', function(req, res, next) {
  let group = req.params.id
  knex('users_groups')
  .select('user_id')
    .where('group_id', group)
    .then(users => {
      res.send(users)
    })
})

router.get('/u', function(req, res, next) {
  let user = req.cookies.user
  console.log(user);
  knex('users_groups')
  // .select('*')
    .join('groups', 'users_groups.group_id', 'groups.id')
    .where('users_groups.user_id', user)
    .then(groups => {
      res.send(groups)
    })
})

router.post('/', function(req, res, next) {
  knex('users_groups')
    .insert(req.body, '*')
    .then(insertion => {
      res.send(insertion)
    })
});

module.exports = router;
