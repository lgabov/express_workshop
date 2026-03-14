const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');

app.get("/",(req, res, next) => {
    
    res.send("Bienvenido al pokedex");
    res.status(200);
});

app.get('/:pokemon/all',(req, res, next) => {
    
    res.status(200);
    res.send(pokemon);
});

app.get('/pokemon/:name', (req, res) => {
    const name = req.params.name;
    for(i=0; i < pokemon.length; i++) {
        if(pokemon[i].name ==name){
            res.status(200).send(pokemon[i]);

        }

    if (pokemonFound) {
        return res.status(200).send(pokemonFound);
    }
}
    res.status(404).send("Pokemon no encontrado");
});

app.get('/pokemon/:id', (req, res) => {
    const idParam = req.params.id;

   if (isNaN(idParam)) {
        return res.status(400).send("Error: El ID debe ser un número, no texto.");
    }

    const id = parseInt(idParam) - 1;

    if (id >= 0 && id < pokemon.length) {
        return res.status(200).send(pokemon[id]);
    }
    
    res.status(404).send("Pokemon no encontrado");
    
})


    
app.listen(process.env.PORT || 3000, () => {
console.log('Server is running ....');
});