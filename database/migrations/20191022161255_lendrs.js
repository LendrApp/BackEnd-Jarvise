
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl
      .string('username', 255)
      .notNullable()
      .unique();
      tbl
      .string('password', 255)
      .notNullable();
      tbl
      .string('email', 50)
      .notNullable()
      .unique();
      tbl
      .string('fullName', 50)
      .notNullable();
    })
    .createTable('items', tbl => {
      tbl.increments();
      tbl
      .string('name', 255)
      .notNullable();
      tbl
      .string('description', 255)
      .notNullable();
      
      tbl
      .integer('price', 255)
      .notNullable();
    })
};
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
    .dropTableIfExists('items')
};
