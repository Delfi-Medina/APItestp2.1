const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
    nombre_de_usuario: {
        type: String,
        required: true,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true
    }
});
 
usuarioSchema.pre('save', async function(next) {
    try{
        const salt = await bcrypt.genSalt(10);
        this.contrasenia = await bcrypt.hash(this.contrasenia, salt);
        next();
    } 
    catch(error) {
        next(error);
    }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;
