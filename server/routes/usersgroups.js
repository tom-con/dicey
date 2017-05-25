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

router.post('/', function(req, res, next) {
  knex('users_groups')
    .insert(req.body, '*')
    .then(insertion => {
      res.send(insertion)
    })
});

module.exports = router;
