
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pedidos', function(ped) {
    ped.increments('id').notNullable();
    ped.string('nombre').notNullable();
    ped.string('apellido').notNullable();
    ped.string('cedula').notNullable();
    ped.string('telefono').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pedidos');
};
