const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req, res, next) => {
   return res.status(200).send("Bienvenido al pokedex");

});
app.post("/pokemon",(req, res, next) => {
    return res.status(200).send(req.body.name);
});

app.get('/:pokemon',(req, res, next) => {
    
   return res.status(200).send(pokemon);
   
});
app.get('/pokemon/:name', (req, res) => {
    const { name } = req.params;
    if (!/^[a-zA-Z]+$/.test(name)) {
        return res.status(400).send('Nombre inválido');
    }
const pk = pokemon.filter(p => {
  return (p.name.toUpperCase() == name.toUpperCase() ) && p ;
  
   });

(pk.length > 0) ? res.status(200).send(pk): res.status(404).send("Pokemon no encontrado");
   
});

app.get('/pokemon/:id', (req, res) => {
    const idParam = req.params.id;

   if (isNaN(idParam)) {
        return res.status(400).send("Error: El ID debe ser un número, no texto.");
    }

    const id = parseInt(idParam) - 1;

     (id >= 0 && id < pokemon.length) ? res.status(200).send(pokemon[id]) :
     res.status(404).send("Pokemon no encontrado");

})


    
app.listen(process.env.PORT || 3000, () => {
console.log('Server is running ....');
});