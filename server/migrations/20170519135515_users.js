
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.string('fbid').primary().notNullable()
    tbl.string('name')
    tbl.string('accessToken')
    tbl.string('prof_picture')
    tbl.boolean('public_profile').defaultTo(false)
    tbl.boolean('user_friends').defaultTo(false)
    tbl.boolean('publish_actions').defaultTo(false)

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
