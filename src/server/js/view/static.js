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

// No matching route
router.use((req, res, next) => {
    res.sendStatus(404);
});


// Error handler
router.use((err, req, res, next) => {
    res.sendStatus(404);
});

// keep at bottom of file
module.exports = router;
