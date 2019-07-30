
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('administracion').del()
    .then(function () {
      // Inserts seed entries
      return knex('administracion').insert([
        { nombre: 'Oscar', 
          apellido: 'Salvador',
          cargo: 'gerente',
          password: '12345'
        },
        { nombre: 'Noemi', 
          apellido: 'Bastidas',
          cargo: 'gerenta',
          password: '54321'
        }
      ]);
    });
};
