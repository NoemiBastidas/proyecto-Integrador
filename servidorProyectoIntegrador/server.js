var express = require('express');
let bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var port = 3000;
var knex = require('./db/knex');
var jwt = require('jsonwebtoken');

var app = express()
app.use(bodyParser.json({ limit: '100mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

var JWT_SECRET = '123456';

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//METODOS
//SELECT PEDIDOS
app.get('/getPedidos', function(req, res) {
    // let tabla = req.body.tabla
    // let campo = req.body.datos
    knex.select().from('pedidos')
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
                mensaje: `Existen ${resultado.length} registros en la consulta`
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})

//GET PASTELES
app.get('/getPasteles', function(req, res) {
    // let tabla = req.body.tabla
    // let campo = req.body.datos
    knex.table('pasteles').innerJoin('imagen', 'pasteles.imagen', '=', 'imagen.id')
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
                mensaje: `Existen ${resultado.length} registros en la consulta`
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})

//POST LOGEO
app.post('/login', function(req, res) {
    console.log(req.body)
    let usuario = req.body.usuario
    let password = req.body.password
    console.log(usuario)
    knex('usuarioLogin').where('usuario', usuario)
        .then(resultado => {
            console.log(resultado)
            if (resultado.length > 0) {
                bcrypt.compare(password, resultado[0].password).then(ok => {
                    if (ok) {
                        resultado[0].password = '********ll';
                        console.log(resultado[0])
                        let tokenC = jwt.sign(resultado[0], 'hdfkasjhfjasdhlajhsldfjha');

                        console.log(tokenC);
                        return res.status(200).json({
                            ok: true,
                            datos: resultado,
                            token: tokenC,
                            mensaje: `Existen ${resultado.length} registros en la consulta`,
                            mensaje2: `Haz iniciado sesion`
                        })
                    } else {
                        return res.status(200).json({
                            ok: false,
                            datos: null,
                            mensaje: `Usuario o contraseña incorrecta`
                        })
                    }
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})



//INSERT USUARIO REGISTRO
app.post('/agregarUsuario', function(req, res) {
    let usuario = req.body.usuario;
    let password = '';
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        password = hash;
        console.log(password)
        return knex('usuarioLogin').insert({
                usuario: usuario,
                password: password
            })
            .then(resultado => {
                return res.status(200).json({
                    ok: true,
                    datos: resultado,
                    mensaje: `Existen ${resultado.length} registros en la consulta`
                })
            })
            .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    datos: null,
                    mensaje: `Error del servidor: ${error}`
                })
            })
    })

})


//INSERT IMAGEN
app.post('/agregarImagen', function(req, res) {
    return knex('imagen').insert(req.body)
        .then(resultado => {
            knex('imagen').where({
                contenidoImagen: req.body.contenidoImagen
            }).select('id').then(r => {
                return res.status(200).json({
                    ok: true,
                    datos: r
                })
            })

        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })

})


//INSERT PRODUCTO
app.post('/agregarProducto', function(req, res) {
    // let tabla = req.body.tabla
    // let datos = JSON.stringify(req.body.datos)
    return knex('pasteles').insert({
            "nombre": req.body.nombre,
            "descripcion": req.body.descripcion,
            "precio": req.body.precio,
            "imagen": req.body.imagen,
            "sabor": req.body.sabor
        })
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
                mensaje: `Existen ${resultado.length} registros en la consulta`
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})


//INSERT PEDIDO
app.post('/agregarPedido', function(req, res) {
    // let tabla = req.body.tabla
    // let datos = JSON.stringify(req.body.datos)
    return knex('pedidos').insert({
            "nombre": req.body.nombre,
            "apellido": req.body.apellido,
            "cedula": req.body.cedula,
            "telefono": req.body.telefono
        })
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
                mensaje: `Existen ${resultado.length} registros en la consulta`
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})

//POST LOGEO ADMIN
app.post('/logAdmin', function(req, res) {
    console.log(req.body)
    let nombre = req.body.nombre
    let apellido = req.body.apellido
    let password = req.body.password
    console.log(nombre)
    console.log(apellido)
    knex('administracion').where({ 'nombre': nombre, 'apellido': apellido })
        .then(resultado => {
            console.log(resultado)
            if (resultado.length > 0) {
                bcrypt.compare(password, resultado[0].password).then(ok => {
                    if (ok) {
                        resultado[0].password = '********ll';
                        console.log(resultado[0])
                        let tokenC = jwt.sign(resultado[0], 'asdaslkdjalksjdlsakldj');

                        console.log(tokenC);
                        return res.status(200).json({
                            ok: true,
                            datos: resultado,
                            token: tokenC,
                            mensaje: `Existen ${resultado.length} registros en la consulta`,
                            mensaje2: `Haz iniciado sesion`
                        })
                    } else {
                        return res.status(200).json({
                            ok: false,
                            datos: null,
                            mensaje: `Alguno de los datos estan incorrectos`
                        })
                    }
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})


//INSERT ADMINISTRADOR REGISTRO
app.post('/agregarAdmin', function(req, res) {
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let cargo = req.body.cargo;
    let password = '';
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        password = hash;
        console.log(password)
        return knex('administracion').insert({
                nombre: nombre,
                apellido: apellido,
                cargo: cargo,
                password: password
            })
            .then(resultado => {
                return res.status(200).json({
                    ok: true,
                    datos: resultado,
                    mensaje: `Existen ${resultado.length} registros en la consulta`
                })
            })
            .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    datos: null,
                    mensaje: `Error del servidor: ${error}`
                })
            })
    })
})


//DELETE PEDIDOS
app.delete('/eliminar/:id', function(req, res) {
    // let tabla = req.body.tabla
    knex('pedidos').where({ "id": req.params.id }).del()
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
                mensaje: `Existen ${resultado.length} registros en la consulta`
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})

//PUERTO
app.listen(port, function() {
    console.log("El servidor se ejecuta en el puerto: ", port);
})

// if(req.body){
//     var user = req.body;
//     console.log(user);

//     if(usuario === req.body.usuario && password === req.body.password){
//         var token = jwt.sign(user, JWT_SECRET);
//         res.status(200).send({
//             sigin: user,
//             token: token
//         });
//     }
//     else{
//         res.status(403).send({
//             errorMensaje: 'error'
//         })
//     }
// }    

// knex.select("usuario","password").from('usuarioLogin')