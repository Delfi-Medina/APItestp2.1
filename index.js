require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DB_PATH);

const Persona = require("./modelo/persona")

//Middleware
app.use(express.json())

app.use((req, res, next)=>{
    res.header("Content-type", "application/json; charset=utf8");
    next();
})

//Endpoint GET
app.get("/api/personas", async (req, res) => {
    try {
        const persona = await Persona.find();
        res.status(200).json(persona);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener personas' });
      }
    });

// Endpoint GETbyID
app.get("/api/personas/:id", async (req, res) => {
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

//Endpoint POST
app.post("/api/personas", async (req, res) => {
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

// Endpoint PUT
app.put("/api/personas/:id", async (req, res) => {
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

// Endpoint DELETE
app.delete("/api/personas/:id", async (req, res) => {
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

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,() => {
    console.log(`Servidor APP corriendo en puerto ${PORT}`)
})