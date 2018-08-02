require("./config/config");

const express = require("express");
const app = express();

//este sirve para conectarse a la BD
const mongoose = require("mongoose");


//body parser sirve para serializar objetos enviados por post
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require("./routes/usuario"));

mongoose.connect(process.env.urlDB, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("BD online");
    }
});

app.listen(process.env.PORT, () => {
    console.log("escuchando puerto: ", process.env.PORT);
});