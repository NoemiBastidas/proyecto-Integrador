
exports.up = function(knex, Promise) {
  return knex.schema.createTable('administracion', function(admin) {
    admin.increments('id').notNullable();
    admin.string('nombre').notNullable();
    admin.string('apellido').notNullable();
    admin.string('cargo').notNullable();
    admin.string('password').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('administracion');
};
