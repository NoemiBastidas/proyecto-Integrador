
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('usuarios').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuarios').insert([
        { nombre: 'Oscar',
          apellido: 'Salvador',
          cedula: '1725393738',
          telefono: '0987991621'
        },
        { nombre: 'Marcelo',
          apellido: 'Salvador',
          cedula: '1726353988',
          telefono: '0123456789'
        }
      ]);
    });
};
