
exports.up = function(knex, Promise) {
  return knex.schema.createTable('groups', tbl => {
    tbl.increments()
    tbl.string('name').unique().notNullable()
    tbl.boolean('profanity').defaultTo(false)
    tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups')
};
