module.exports = function () {
    var route = require('express').Router();

    // Index Page Route
    route.get('/', (req, res) => {
        // steam_id is random example.
        res.render('index', {layout: 'gradient'});
    });

    // Stream Page Route
    route.get('/:id', (req, res) => {
        // steam_id is random example.
        res.render('stream', {layout: 'gradient', stream_id: req.params.id});
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
