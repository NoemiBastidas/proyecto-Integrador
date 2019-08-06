exports.up = function(knex, Promise) {
    return knex.schema.createTable('pasteles', function(prod) {
        prod.increments('id').notNullable();
        prod.string('nombre').notNullable();
        prod.string('descripcion').notNullable();
        prod.double('precio').notNullable();
        prod.string('sabor').notNullable();
        prod.integer('imagen').notNullable();
        prod.foreign('imagen').references('id').inTable('imagen');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pasteles');
};