//esto es para generar una infraestructura de aplicaciones server => npm install express --save
const express = require("express");

let { verificaToken } = require("../middlewares/autenticacion");

let app = express();

let Categoria = require("../models/categoria");

app.get("/categoria", (req, res) => {
    //retornar todas las categorias
    Categoria.find({})
        .sort("descripcion")
        .populate("usuario", 'nombre _id') //sirve para traer los objetos que hacen referencia en la tabla
        .exec((err, categorias) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });
        });


});

app.get("/categoria/:id", verificaToken, (req, res) => {
    //retornar la categoria
    //Categoria.findById
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoriaDB
        });
    });


});

app.post("/categoria", verificaToken, (req, res) => {
    //crear nueva categoria
    //req.usuario.id


    let body = req.usuario._id;

    let categoria = new Categoria;
    categoria.descripcion = req.body.descripcion;
    categoria.usuario = req.usuario._id;

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });


});

app.put("/categoria/:id", verificaToken, (req, res) => {
    //actualizar nombre categoria
    let id = req.params.id;
    let descripcionNueva = req.body.descripcion;

    Categoria.findByIdAndUpdate(id, { descripcion: descripcionNueva }, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        console.log('antes de consultar');
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });


});
app.delete("/categoria/:id", verificaToken, (req, res) => {
    //borrar categoria que solo la borre el admin
    //pedir token
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: null
        });


    });


});

module.exports = app;