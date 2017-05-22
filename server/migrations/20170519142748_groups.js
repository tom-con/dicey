exports.up = function(knex, Promise) {
  return knex.schema.createTable('groups', tbl => {
    tbl.increments()
    tbl.string('name').unique().notNullable()
    tbl.integer('owner').references('users.id').onDelete('CASCADE')
    tbl.boolean('profanity').defaultTo(false)
    tbl.integer('word_limit').defaultTo(12)
    tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups')
};
