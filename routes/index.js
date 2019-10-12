module.exports = function () {
    var route = require('express').Router();

    route.get('/', (req, res) => {
        // steam_id is random example.
        res.render('feed', {layout: 'feed', stream_id: '13b5xd'});
    });

    return route;
};
