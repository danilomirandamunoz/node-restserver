//esto es para generar una infraestructura de aplicaciones server => npm install express --save
const express = require("express");
const app = express();

//esto es para generar y comparar passwords encriptadas => npm install bcriptjs --save
const bcrypt = require("bcryptjs");

//esto es para generar los tokens => npm install jsonwebtoken --save
const jwt = require("jsonwebtoken");

//esto es para tener el modelo del usuario con sus restricciones
const Usuario = require("../models/usuario");


app.post("/login", (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: '(Usuario) o contraseña incorrectos'
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario o (contraseña) incorrectos'
            });
        }
        console.log(process.env.SEED);

        let token = jwt.sign({
            usuario: usuarioDB

        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    });


});




module.exports = app;