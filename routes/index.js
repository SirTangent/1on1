module.exports = function () {
    var route = require('express').Router();

    route.get('/', (req, res) => {
        res.render('index', {layout: 'gradient'});
    });

    return route;
};
