
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups').insert();
    }).then(() => {
      return knex.raw("SELECT setval('groups_id_seq', (SELECT MAX(id) FROM groups));")
    });
};
