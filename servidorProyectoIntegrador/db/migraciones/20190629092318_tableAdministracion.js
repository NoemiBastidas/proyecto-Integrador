
exports.up = function(knex, Promise) {
  return knex.schema.createTable('administracion', function(admin) {
    admin.increments('id').notNullable();
    admin.string('contraseña_antigua').notNullable();
    admin.string('contraseña_nueva').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('administracion');
};
