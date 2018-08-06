const express = require("express");

const { verificaToken } = require("../middlewares/autenticacion");

const app = express();

let Producto = require("../models/producto");


app.get("/productos", (req, res) => {

    Producto.find({ disponible: true })
        .populate("usuario", "nombre email")
        .populate("categoria", "descripcion")
        .exec((err, productos) => {
            if (err) {
                return res.json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        });

});

app.get("/productos/buscar/:termino", verificaToken, (req, res) => {


    let termino = req.params.termino;

    //para buscar de acuerdo a cualquier valor
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate()
        .exec((err, productos) => {
            if (err) {
                return res.json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        })
});

app.post("/productos", verificaToken, (req, res) => {

    let producto = new Producto({
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        descripcion: req.body.descripcion,
        disponible: req.body.disponible,
        categoria: req.body.categoria,
        usuario: req.usuario._id
    });



    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            productoDB
        })
    });

});

app.put("/productos/:id", verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: "no existe producto"
                }
            });
        }

        productoDB.nombre = req.body.nombre;
        productoDB.precioUni = req.body.precioUni;
        productoDB.categoria = req.body.categoria;
        productoDB.disponible = req.body.disponible;
        productoDB.descripcion = req.body.descripcion;

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                producto: productoGuardado
            })

        });
    })

});

app.delete("/productos/:id", verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndRemove(id, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });


    });
});




module.exports = app;