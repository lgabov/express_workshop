const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/",async(req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if(pok_name && pok_height && pok_weight && pok_base_experience){
    let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience) ";
    query += `VALUES ('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience}); `;
    
const rows = await db.query(query);
console.log(rows);
    
  if (rows.affectedRows == 1) {
    return res.status(200).json({ code: 201, message: "Pokemon insertado exitosamente" });
  }
  return res.status(500).json({ code: 500, message: "Error al insertar el pokemon" });

    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

pokemon.get('/',async (req, res, next) => {
    const pkmn = await db.query('SELECT * FROM pokemon');
   
    return res.status(200).json({ code: 201, message: pkmn });
   
});
pokemon.get('/:name',async (req, res) => {
    const { name } = req.params;
    if (!/^[a-zA-Z]+$/.test(name)) {
        return res.status(400).json({ error: 'Nombre inválido' });
    }
const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = ?", [name]);

    if (pkmn.length > 0) {
        return res.status(200).json(pkmn);
    } else {
        return res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
    }
});


pokemon.get('/:id', async(req, res) => {
    const idParam = req.params.id;

   if (isNaN(idParam)) {
        return res.status(400).json({ error: 'El ID debe ser un número, no texto.' });
    }

    const id = parseInt(idParam) - 1;

     if (id >= 0 && id < pk.length) {
        return res.status(200).json({ code: 201, message: pk[req.params.id - 1] });
    } 
        return res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
    
});

module.exports = pokemon;