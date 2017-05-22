
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.string('fbid').primary().notNullable()
    tbl.string('name')
    tbl.string('accessToken')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
