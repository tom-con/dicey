
exports.up = function(knex, Promise) {
  return knex.schema.createTable('words', tbl => {
    tbl.increments()
    tbl.text('text').notNullable()
    tbl.integer('sentence_id').references('sentences.id').onDelete('CASCADE')
    tbl.string('author_fbid').references('users.fbid').onDelete('CASCADE')
    tbl.integer('position')
    tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('words')
};
