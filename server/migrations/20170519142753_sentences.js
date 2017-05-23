
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sentences', tbl => {
    tbl.increments()
    tbl.text('content').defaultTo('')
    tbl.text('current_turn').defaultTo('')
    tbl.integer('group_id').references('groups.id').onDelete('CASCADE')
    tbl.integer('position').defaultTo(1)
    tbl.boolean('is_completed').defaultTo(false)
    tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sentences')
};
