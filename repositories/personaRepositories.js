const Persona = require('../modelo/persona');

class PersonaRepository {
  async findAll() {
    return await Persona.find();
  }

  async findById(id) {
    return await Persona.findOne({ id: id });
  }

  async create(personaData) {
    const count = await Persona.countDocuments();
    const newId = count + 1;
    const persona = new Persona({
      id: newId,
      ...personaData
    });
    return await persona.save();
  }

  async update(id, personaData) {
    return await Persona.findOneAndUpdate({ id: id }, personaData, { new: true });
  }

  async delete(id) {
    return await Persona.findOneAndDelete({ id: id });
  }
}

module.exports = new PersonaRepository();