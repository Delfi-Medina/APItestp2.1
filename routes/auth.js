const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../modelo/usuario');
const router = new express.Router();

//registro
router.post('/register', async (req, res) => {
    const usuario = new Usuario(req.body);
    try {
        await usuario.save();
        res.status(201).send({ usuario });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ nombre_de_usuario: req.body.nombre_de_usuario});
        if (!usuario) {
            return res.status(400).send({ error: 'Credenciales invalidas'});
        }
        const isMatch = await bcrypt.compare(req.body.contrasenia, usuario.contrasenia);
        if (!isMatch) {
            return res.status(400).send({ error: 'Credenciales invalidas'});
        }
        const token = jwt.sign({ _id: usuario._id.toString() }, process.env.JWT_SECRET);
        res.send({ usuario, token });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;