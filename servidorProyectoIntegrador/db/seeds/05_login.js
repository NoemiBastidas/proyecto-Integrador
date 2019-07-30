
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('usuarioLogin').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuarioLogin').insert([
        {usuario: 'Oscar', password: '123456'},
        {usuario: 'Emily', password: '654321'}
      ]);
    });
};
