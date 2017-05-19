
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sentences', tbl => {
    tbl.increments()
    tbl.text('content').defaultTo('')
    tbl.integer('word_limit').defaultTo(12)
    tbl.integer('group_id').references('groups.id').onDelete('CASCADE')
    tbl.boolean('is_completed').defaultTo(false)
    tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sentences')
};
