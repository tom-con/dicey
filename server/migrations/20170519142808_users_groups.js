
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_groups', tbl => {
    tbl.increments()
    tbl.integer('user_id').references('users.id').onDelete('CASCADE')
    tbl.integer('group_id').references('groups.id').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_groups')
};
