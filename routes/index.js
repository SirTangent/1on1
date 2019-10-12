module.exports = function () {
    const route = require('express').Router();

    // Import mongoose stream model
    const mongoose = require('mongoose');
    const stream = mongoose.model('stream');

    // Index Page Route
    route.get('/', (req, res) => {
        res.render('index', {layout: 'gradient'});
    });

    // Stream Page Route
    route.get('/:id', (req, res) => {
        // Check if stream exists on db
        stream.findOne({
            code: req.params.id
        })
            .then(this_stream => {
                if(this_stream){
                    console.log(this_stream.code);
                    res.render('stream', {layout: 'gradient', stream_id: req.params.id, msg: this_stream.msg});
                }
                res.render('index', {layout: 'gradient', error: 'Invalid Code!'});
            })
            .catch(err => {
                console.log(err);
                res.redirect('/');
            })

        // steam_id is random example.
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
