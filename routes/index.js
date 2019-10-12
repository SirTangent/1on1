module.exports = function () {
    const route = require('express').Router();

    // Import mongoose stream model
    const mongoose = require('mongoose');
    const stream = mongoose.model('stream');

    // Index Page Route
    route.get('/', (req, res) => {
        // steam_id is random example.
        res.render('index', {layout: 'gradient'});
    });

    // Stream Page Route
    route.get('/:id', (req, res) => {
        // steam_id is random example.
        let msg = [];
        res.render('stream', {layout: 'gradient', stream_id: req.params.id, msg: msg});
    });

    // About Page Route
    route.post('/f/create', (req, res) => {
        //TODO: Add page generation!
    });

    // About Page Route
    route.get('/f/about', (req, res) => {
       res.render('about',{layout: 'gradient'});
    });

    return route;
};
