
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('words').del()
    .then(function () {
      // Inserts seed entries
      return knex('words').insert();
    }).then(() => {
      return knex.raw("SELECT setval('words_id_seq', (SELECT MAX(id) FROM words));")
    });
};
