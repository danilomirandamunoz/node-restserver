const mongoose = require("mongoose");

const uniquevalidator = require("mongoose-unique-validator");

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]

    },
    email: {
        type: String,
        required: [true, "El Email es requerido"],
        unique: true

    },
    password: {
        type: String,
        required: [true, "La Contraseña es requerido"]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//esto se utiliza para eliminar la propiedad password al retornar un usuario al cliente
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

//esto se genera para agregar un plugin para verificar que el valor sea unico
usuarioSchema.plugin(uniquevalidator, {
    message: '{PATH} debe de ser unico'
})

module.exports = mongoose.model("Usuario", usuarioSchema);