//puerto
process.env.PORT = process.env.PORT || 3000;

//BD
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://cafeuser:a123456@ds123084.mlab.com:23084/dmirandam-node-cafe';
}

process.env.urlDB = urlDB;