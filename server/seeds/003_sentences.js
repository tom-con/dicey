
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sentences').del()
    .then(function () {
      // Inserts seed entries
      return knex('sentences').insert([
        {id: 1, group_id: 1}

      ]);
    }).then(() => {
      return knex.raw("SELECT setval('sentences_id_seq', (SELECT MAX(id) FROM sentences));")
    });
};
