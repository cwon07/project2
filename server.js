// Import our dependencies
require('dotenv').config();
const express = require('express');
const RecipeRouter = require('./controllers/recipe');
const UserRouter = require('./controllers/user');
const app = express();
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');


// Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.use(session({
    secret:process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
}));
app.use("/recipes", RecipeRouter);
app.use("/user", UserRouter);




app.get('/', (req, res) => {
    res.render('index.ejs')
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})