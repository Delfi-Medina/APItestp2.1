const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personaSchema = new Schema({
    id: Number,
    nombre: String,
    DNI: Number,
    fecha_nacimiento: Date,
});

module.exports = mongoose.model("persona", personaSchema);