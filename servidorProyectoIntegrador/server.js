var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var knex = require('./db/knex');

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

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

//INSERT PRODUCTO
app.post('/agregarProducto', function(req, res) {
    // let tabla = req.body.tabla
    // let datos = JSON.stringify(req.body.datos)
    return knex('pasteles').insert({
        "nombre" : req.body.nombre,
        "descripcion" : req.body.descripcion,
        "precio" : req.body.precio,
        "imagen" : req.body.imagen,
        "sabor" : req.body.sabor
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


//UPDATE
app.put('/actualizar', function(req, res) {
    let tabla = req.body.tabla
    let campo = req.body.campo
    let dato = req.body.dato
    knex(tabla)/*.where("id", req.params.id)*/.update(campo, dato)
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

//DELETE
app.delete('/eliminar/:id', function(req, res) {
    let tabla = req.body.tabla
    knex(tabla).where("id", req.params.id).del()
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