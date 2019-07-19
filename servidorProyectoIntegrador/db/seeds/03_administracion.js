
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('administracion').del()
    .then(function () {
      // Inserts seed entries
      return knex('administracion').insert([
        { contraseña_antigua: '12345', 
          contraseña_nueva: 'admin01'
        },
        { contraseña_antigua: 'admin01', 
          contraseña_nueva: 'adminPas'
        }
      ]);
    });
};
