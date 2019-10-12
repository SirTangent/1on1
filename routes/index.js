module.exports = function () {
    var route = require('express').Router();

    route.get('/:id', (req, res) => {
        // steam_id is random example.
        res.render('stream', {layout: 'gradient', stream_id: req.params.id});
    });

    route.get('/', (req, res) => {
        // steam_id is random example.
        res.render('index', {layout: 'gradient'});
    });

    return route;
};
