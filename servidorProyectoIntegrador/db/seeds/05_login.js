
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('usuarioLogin').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuarioLogin').insert([
        {usuario: 'Oscar', contraseña: '123456'},
        {usuario: 'Emily', contraseña: '654321'}
      ]);
    });
};
