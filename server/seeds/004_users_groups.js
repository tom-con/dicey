
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_groups').insert([
        {id: 1, user_id: 1, group_id: 1},
      ]);
    }).then(() => {
      return knex.raw("SELECT setval('users_groups_id_seq', (SELECT MAX(id) FROM users_groups));")
    });
};
