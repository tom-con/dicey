
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_groups', tbl => {
    tbl.increments()
    tbl.string('user_fbid').references('users.fbid').onDelete('CASCADE')
    tbl.integer('group_id').references('groups.id').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_groups')
};
