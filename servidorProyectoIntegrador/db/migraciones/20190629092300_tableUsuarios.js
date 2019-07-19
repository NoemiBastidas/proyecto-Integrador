
exports.up = function(knex, Promise) {
  return knex.schema.createTable('usuarios', function(user) {
      user.increments('id').notNullable();
      user.string('nombre').notNullable();
      user.string('apellido').notNullable();
      user.string('cedula').notNullable();
      user.string('telefono').notNullable();

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarios');
};
