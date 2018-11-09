const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const recipeModels = require('./api/recipe.model');
const recipes = require('./api/recipe.controllers');

const app = express();
const mongoUri = 'mongodb://devereld:dd2345@ds015730.mlab.com:15730/recipes-dd';

// this line always appears before any routes
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Ahoy there');
});

app.get('/api/recipes', recipes.findAll);
app.get('/api/recipes/:id', recipes.findById);
app.post('/api/recipes', recipes.add);
app.put('/api/recipes/:id', recipes.update);
app.delete('/api/recipes/:id', recipes.delete);
app.get('/api/import', recipes.import);

mongoose.connect(mongoUri, { useNewUrlParser: true }, () => {
  app.listen(3001);
  console.log('Server running at http://localhost:3001/');
});