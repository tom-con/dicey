
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sentences', tbl => {
    tbl.increments()
    tbl.text('current_turn').defaultTo('')
    tbl.integer('group_id').references('groups.id').onDelete('CASCADE')
    tbl.boolean('is_completed').defaultTo(false)
    tbl.string('winner').references('users.fbid').onDelete('CASCADE')
    tbl.string('deployment_url')
    tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sentences')
};
