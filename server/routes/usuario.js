const express = require("express");
const app = express();

const bcrypt = require("bcryptjs");
const _ = require("underscore");

const Usuario = require("../models/usuario");

app.get("/usuario", function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email')
        .limit(limite)
        .skip(desde)
        .exec((err, usuarios) => {

            if (err) {
                return {
                    ok: false,
                    err
                }
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            });



        })

});

app.post("/usuario", function(req, res) {

    //obytiene los datos enviado para actualizar por post
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: err,
                usuario: usuario
            });
            return;
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.put("/usuario/:id", function(req, res) {

    let id = req.params.id;

    //la funcion pick permite que las propiedades definidas en el array se puedan actualizar
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //esta es una forma de no permitir que se actualicen las propiedades
    // delete body.password;
    // delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: err,
                usuario: usuarioDB
            });
            return;
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });


});

app.delete("/usuario/:id", function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: err,
                usuario: usuarioDB
            });
            return;
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });



    //esto es para eliminar el registro fisicamente
    // Usuario.findByIdAndRemove(id, (err, usuarioDB) => {

    //     if (err) {
    //         res.status(400).json({
    //             ok: false,
    //             mensaje: err,
    //             usuario: usuarioDB
    //         });
    //         return;
    //     }

    //     if (!usuarioDB) {
    //         res.status(400).json({
    //             ok: false,
    //             mensaje: "Usuario no encontrado"
    //         });
    //         return;
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioDB
    //     });
    // });
});

module.exports = app;