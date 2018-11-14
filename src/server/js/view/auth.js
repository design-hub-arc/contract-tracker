const express = require('express');
const bodyParser = require('body-parser');
const fb_auth = require('../model/services/firebaseauthapi.js');

const router = express.Router();


// for parsing application/json
router.use(bodyParser.json());

// log in user
router.post('/login', (req, res, next) => {
    res.sendStatus(501);
});

// sign up user
router.post('/signup', (req, res, next) => {
    res.sendStatus(501);
});

// keep at bottom of file
module.exports = router;
