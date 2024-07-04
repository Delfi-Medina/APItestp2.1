require("dotenv").config();

const express = require("express");

const Database = require("./db/connection");
const authMiddleware = require('./middleware/authMiddleware');
const usuarioRouter = require('./routes/auth');
const app = express();


const Persona = require("./modelo/persona");


// Middleware
app.use(express.json());
app.use((req, res, next) => {
    res.header("Content-type", "application/json; charset=utf8");
    next();
});

app.use(usuarioRouter);

// Endpoint GET protegido
app.get("/api/personas", authMiddleware, async (req, res) => {
    try {
        const persona = await Persona.find();
        res.status(200).json(persona);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener personas' });
    }
});

// Endpoint GET por ID protegido
app.get("/api/personas/:id", authMiddleware, async (req, res) => {
    try {
        const persona = await Persona.findOne({ id: req.params.id });
        if (!persona) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }
        res.status(200).json(persona);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener persona' });
    }
});

// Endpoint POST protegido
app.post("/api/personas", authMiddleware, async (req, res) => {
    try {
        const countPersona = await Persona.countDocuments();
        const id_persona = countPersona + 1;
        const datos_persona = {
            id: id_persona,
            ...req.body,
        };
        const persona1 = new Persona(datos_persona);
        await persona1.save();
        res.status(201).json(persona1);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear persona' });
    }
});

// Endpoint PUT protegido
app.put("/api/personas/:id", authMiddleware, async (req, res) => {
    try {
        const persona = await Persona.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!persona) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }
        res.status(200).json(persona);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar persona' });
    }
});

// Endpoint DELETE protegido
app.delete("/api/personas/:id", authMiddleware, async (req, res) => {
    try {
        const persona = await Persona.findOneAndDelete({ id: req.params.id });
        if (!persona) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }
        res.status(200).json({ message: 'Persona eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar persona' });
    }
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor APP corriendo en puerto ${PORT}`);
});
