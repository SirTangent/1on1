module.exports = function () {
    var route = require('express').Router();

    route.get('/', (req, res) => {
        res.send('<h1>Hello, world!</h1>');
    });

    return route;
};
