const express = require('express');

const router = express.Router();


// css
router.use('/css', express.static('build/css'));

// html
router.use('/html', express.static('build/html'));

// js
router.use('/js', express.static('build/js'));

// static
router.use('/static', express.static('build/static'));


// Error handler
router.use((err, req, res, next) => {
    res.sendStatus(500);
});

// keep at bottom of file
module.exports = router;
