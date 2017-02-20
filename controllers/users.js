var User = require('../models/user');
var userHelper = require('../helpers/user');

module.exports = function(app){

    app.get('/api/current_user', function (req, res) {
        userHelper.current_user(function (user) {
            res.json({ user: user });
        })
    });

    app.post('/api/login', function (req, res) {
        User.findOne({ username:  req.body.username }, function (err, curUser) {
            if(err) res.json({ error: err });
            else if(curUser) {
                if(curUser.checkPassword(req.body.password)){
                    req.session.user_id = curUser._id;
                    res.json({ user: curUser });
                } else {

                }
            } else {
                res.json({ error: "User not found"});
            }
        });
    });

    app.post('/api/registration', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var password_confirm = req.body.password_confirmation;
        if(password === password_confirm){
            User.findOne({username: username}, function (err, user) {
                if(err) res.json({ error: err });
                else {
                    if(user) {
                        res.json({ error: "Username busy" });
                    }
                    else{
                        var new_user = new User({
                            username: username,
                            password: password
                        });
                        new_user.save(function (err) {
                            if(err) res.json({ error: err });
                            else {
                                req.session.user_id = new_user._id;
                                res.json({ user: new_user });
                            }
                        });
                    }
                }
            })
        } else {
            res.json({ error: "Password != password_confirm" });
        }
    });

    app.get('/api/logout', function (req, res) {
        req.session.user_id = null;
        res.json({ logout: true });
    })
};
