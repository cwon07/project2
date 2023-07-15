const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')
})

router.post('/signup', async (req, res) => {
    try{
        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        await User.create(req.body);
        res.redirect('/user/login');
    }catch {
        res.send('there was an error')
    }
})

router.get('/login', (req, res) => {
    res.render('users/login.ejs')
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(!user){
        res.send('user does not exist')
    }else {
        const passmatches = bcrypt.compareSync(req.body.password, user.password);
        if(passmatches){
            req.session.username = req.body.username;
            req.session.loggedIn = true;
            res.redirect('/recipes');
        }else {
            res.redirect('/user/login');
    }}})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/');
    })
})

router.get("/newsletter", (req, res) => {
    res.render('newsletter/signup.ejs');
})

router.post("/newsletter", (req, res) => {
    const firstName = req.body.fName;
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                name: firstName
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/aed8dbae06"

    const options = {
        method: "POST",
        auth: "chris1:afdd86da2fc852fd331fd12da077cb77-us14"
    }

   const request = request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.render('newsletter/success.ejs');
        }else {
            res.render('newsletter/failure.ejs')
        }
        res.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

module.exports = router