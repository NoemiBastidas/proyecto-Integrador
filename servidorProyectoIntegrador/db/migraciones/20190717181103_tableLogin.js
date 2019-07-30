
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuarioLogin', function(ul){
        ul.increments('id').notNullable();
        ul.string('usuario').notNullable();
        ul.string('password').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarioLogin');
};
