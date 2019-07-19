
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pasteles').del()
    .then(function () {
      // Inserts seed entries
      return knex('pasteles').insert([
        { nombre: 'gelato',
          descripcion: 'pastel de chocolate',
          precio: 20.80,
          imagen: 'https://www.google.com/search?q=nombres+de+pasteles&source=lnms&tbm=isch&sa=X&ved=0ahUKEwj80tSdgI_jAhUCyFkKHepRAOAQ_AUIECgB&biw=681&bih=643#imgrc=05IPX4WPZ5U_1M:',
          sabor: 'chocolate'
        },
        { nombre: 'pavlova',
          descripcion: 'pastel de vainilla con fresas',
          precio: 30.20,
          imagen: 'https://www.google.com/search?q=nombres+de+pasteles&source=lnms&tbm=isch&sa=X&ved=0ahUKEwj80tSdgI_jAhUCyFkKHepRAOAQ_AUIECgB&biw=681&bih=643#imgrc=05IPX4WPZ5U_1M:',
          sabor: 'vainilla'
        }
      ]);
    });
};
