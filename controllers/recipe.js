const express = require('express');
const Recipe = require('../models/recipe');

const router = express.Router();

router.use((req, res, next) => {
    if(req.session.loggedIn){
        next();
    }else {
        res.redirect('/user/login')
    }
});

router.get('/', async (req, res) => {
    const allRecipes = await Recipe.find({username: req.session.username})
    res.render(
        'recipes/index.ejs',
        {recipes: allRecipes, user: req.session.username}
    )
});

router.get('/new', (req, res) => {
    res.render('recipes/new.ejs')

});

router.post('/', async (req, res) => {
    req.body.username = req.session.username
    const newRecipe = await Recipe.create(req.body);
    res.redirect('/recipes')
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const recipe = await Recipe.findById(id);
    res.render('recipes/show.ejs', {recipe})
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes')
});

router.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const recipe = await Recipe.findById(id);
    res.render('recipes/edit.ejs', {recipe})
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    await Recipe.findByIdAndUpdate(id, req.body)
    res.redirect('/recipes')
});

module.exports = router;