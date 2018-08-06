//esto es para generar los tokens => npm install jsonwebtoken --save
const jwt = require("jsonwebtoken");

//verificar token
//parametro next sirve para continuar con la funcionalidad del metodo usado
let verificaToken = (req, res, next) => {

    let token = req.get("token");

    // res.json({
    //     token
    // });

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no válido"
                }
            });
        }
        console.log("fdsfdsfds");
        req.usuario = decoded.usuario;
        //permite continuar con la ejecucion del metodo invocado
        next();

    });


};

let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role != "ADMIN_ROLE") {
        res.json({
            ok: false,
            err: {
                message: "El usuario no es administrador"
            }
        });

        return;
    }

    next();

};


module.exports = { verificaToken, verificaAdminRole };