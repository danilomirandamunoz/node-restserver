require("./config/config");

//esto es para generar una infraestructura de aplicaciones server => npm install express --save
const express = require("express");
const app = express();

//este sirve para conectarse a la BD => npm install mongoose --save
const mongoose = require("mongoose");


//body parser sirve para serializar objetos enviados por post => npm install body-parser --save
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//condiguracion global de rutas en archivo
app.use(require("./routes/index"));


//esto es para conectarse a la BD
mongoose.connect(process.env.urlDB, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("BD online");
    }
});

//esto es para levantar el servidor en el puerto definido en el config
app.listen(process.env.PORT, () => {
    console.log("escuchando puerto: ", process.env.PORT);
});