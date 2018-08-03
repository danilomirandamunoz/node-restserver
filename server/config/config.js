//puerto
process.env.PORT = process.env.PORT || 3000;

//BD
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//variable para poner la cadena de conexion a la BD
let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.urlDB = urlDB;

//vencimiento del token
//60 seg

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

//seed de autenticacion

process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo"