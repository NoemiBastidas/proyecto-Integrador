
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pedidos').del()
    .then(function () {
      // Inserts seed entries
      return knex('pedidos').insert([
        { nombre: 'Maria', 
          apellido: 'Sandoval', 
          cedula: '1725363987', 
          telefono: '0987456132' 
        },
        { nombre: 'David', 
          apellido: 'Andrade', 
          cedula: '1725369357', 
          telefono: '0987456129' 
        }
      ]);
    });
};
