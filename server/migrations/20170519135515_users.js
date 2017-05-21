
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl.string('name')
    tbl.string('fbid').notNullable()
    tbl.string('accessToken')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
