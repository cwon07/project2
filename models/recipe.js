const mongoose = require('./connection');

const recipeSchema = new mongoose.Schema({
    title: String,
    type: String,
    image: String,
    ingredients: String,
    instruction: String,
    username: String,
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;