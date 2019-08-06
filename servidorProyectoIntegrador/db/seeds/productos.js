exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('pasteles').del()
        .then(function() {
            // Inserts seed entries
            return knex('pasteles').insert([{
                    nombre: 'gelato',
                    descripcion: 'pastel de chocolate',
                    precio: 20.80,
                    imagen: 5,
                    sabor: 'chocolate'
                },
                {
                    nombre: 'pavlova',
                    descripcion: 'pastel de vainilla con fresas',
                    precio: 30.20,
                    imagen: 6,
                    sabor: 'vainilla'
                }
            ]);
        });
};