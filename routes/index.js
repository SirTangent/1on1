module.exports = function () {
    var route = require('express').Router();

    route.get('/', (req, res) => {
        res.render('feed', {layout: 'feed'});
    });

    return route;
};
