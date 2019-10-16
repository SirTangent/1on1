module.exports = function () {
    const route = require('express').Router();

    // Import mongoose stream model
    const mongoose = require('mongoose');
    const stream = mongoose.model('stream');

    // Random code function
    // SOURCE: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    function makeid(length) {
        var result           = '';
        var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    console.log(makeid(5));

    // Index Page Route
    route.get('/', (req, res) => {
        res.render('index', {layout: 'gradient'});
    });

    // Stream Page Route
    route.get('/:id', (req, res) => {
        // Check if stream exists on db
        let id = req.params.id.toLowerCase();
        stream.findOne({
            code: id
        })
            .then(this_stream => {
                if(this_stream){
                    res.render('stream', {layout: 'gradient', stream_id: id, msg: this_stream.msg});
                } else {
                    res.render('index', {layout: 'gradient', error: 'Invalid Code!'});
                }
            })
            .catch(err => {
                console.log(err);
                res.redirect('/');
            })
    });

    // Creat Post Route
    route.get('/f/create', (req, res) => {
        // Generate random code and passphrase
        let random_code = makeid(process.env.CODE_LENGTH || 5);
        let random_pass = makeid(process.env.PASS_LENGTH || 8);

        stream.findOne({
            code: random_code
        })
            .then(this_stream => {
                if(this_stream){
                    res.redirect('/f/create');
                } else {
                    const newStream = {
                        code: random_code,
                        passphrase: random_pass
                    };

                    // Push to database
                    new stream(newStream)
                        .save()
                        .then(new_stream => {
                            console.log('New stream pushed to DB:');
                            console.log(new_stream);
                            res.render('create_success', {
                                layout: 'gradient',
                                code: new_stream.code,
                                passphrase: new_stream.passphrase
                            });
                        })
                }
            })
            .catch(err => {
                console.log(err);
                res.redirect('/');
            })
    });

    // About Page Route
    route.get('/f/about', (req, res) => {
       res.render('about',{layout: 'gradient'});
    });

    return route;
};
