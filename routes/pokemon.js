const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/",async(req, res, next) => {
    return res.status(200).json(req.body);
});

pokemon.get('/',async (req, res, next) => {
    const pkmn = await db.query('SELECT * FROM pokemon');
   
    return res.status(200).json(pkmn);
   
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
        return res.status(404).send("Pokemon no encontrado");
    }
});


pokemon.get('/:id', async(req, res) => {
    const idParam = req.params.id;

   if (isNaN(idParam)) {
        return res.status(400).json({ error: 'El ID debe ser un número, no texto.' });
    }

    const id = parseInt(idParam) - 1;

     (id >= 0 && id < pk.length) ? res.status(200).send(pk[req.params.id - 1]) :
     res.status(404).send("Pokemon no encontrado");

})

module.exports = pokemon;