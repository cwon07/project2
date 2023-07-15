////// IMPORT DEPENDENCIES
require('dotenv').config();
const express = require('express');
const router = express.Router();
const https = require('https');

router.get("/", (req, res) => {
    res.render('newsletter/signup.ejs');
})

router.post("/", (req, res) => {
    const firstName = req.body.fName;
    const email = req.body.email
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                FNAME: firstName
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/aed8dbae06"

    const options = {
        method: "POST",
        auth: "chris1:afdd86da2fc852fd331fd12da077cb77-us14"
    }

   const request =  https.request(url, options, (response) => {
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

// API KEY
// afdd86da2fc852fd331fd12da077cb77-us14


// LIST ID
// aed8dbae06

////// SETTING UP SERVER
// app.listen(PORT, () =>
//     console.log(`Listening on Port ${PORT}`))
