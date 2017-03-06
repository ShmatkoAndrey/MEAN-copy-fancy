var User = require('../models/user');
var userHelper = require('../helpers/user');

module.exports = function(app){

    app.get('/api/current_user', function (req, res) {
        userHelper.current_user(req.session.user_id, function (user) {
            if(user && user._id) res.json({ user: user.serialized() });
            else res.json({ user: null });

        })
    });

    app.post('/api/login', function (req, res) {
        User.findOne({ username:  req.body.username }, function (err, curUser) {
            if(err) res.json({ error: err });
            else if(curUser) {
                if(curUser.checkPassword(req.body.password)){
                    req.session.user_id = curUser._id;
                    res.json({ user: curUser.serialized() });
                } else {

                }
            } else {
                res.json({ error: "User not found"});
            }
        });
    });

    app.post('/api/registration', function (req, res) {
       userHelper.saveUser(req, function (user) {
           req.session.user_id = user._id;
           res.json({ user: user.serialized() });
       })
    });

    app.get('/api/logout', function (req, res) {
        req.session.user_id = null;
        res.json({ logout: true });
    });

    app.post('/api/auth', function (req, res) {

    })
};
