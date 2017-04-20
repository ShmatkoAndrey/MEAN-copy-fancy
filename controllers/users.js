var User = require('../models/user');
var Product = require('../models/product');
var Identity = require('../models/identity');
var productHelper = require('../helpers/product');

var userHelper = require('../helpers/user');

module.exports = function(app) {

    app.get('/api/current_user', function (req, res) {
        userHelper.current_user(req.session.user_id, function (user) {
            if (user && user._id) res.json({user: user.serialized()});
            else res.json({user: null});

        })
    });

    app.post('/api/login', function (req, res) {
        User.findOne({username: req.body.username}, function (err, curUser) {
            if (err) res.json({error: err});
            else if (curUser) {
                if (curUser.checkPassword(req.body.password)) {
                    req.session.user_id = curUser._id;
                    res.json({user: curUser.serialized()});
                } else {

                }
            } else {
                res.json({error: "User not found"});
            }
        });
    });

    app.post('/api/registration', function (req, res) {
        userHelper.saveUser(req, function (user) {
            req.session.user_id = user._id;
            res.json({user: user.serialized()});
        })
    });

    app.get('/api/logout', function (req, res) {
        req.session.user_id = null;
        res.json({logout: true});
    });

    app.post('/api/auth', function (req, res) {
        Identity.findOne({uid: req.body.uid, provider: req.body.provider}, function (err, identity) {
            if (!identity) {
                var new_user = new User({
                    username: req.body.name,
                    password: Math.random().toString(36).substring(7),
                    store: false,
                    admin: false
                });
                var new_identity = new Identity({
                    uid: req.body.uid,
                    provider: req.body.provider,
                    user_id: new_user._id
                });

                new_identity.save(function (err) {

                });

                new_user.save(function (err, user) {
                    if (err) console.log(err);
                    else {
                        req.session.user_id = user._id;
                        res.json({user: user.serialized()});
                    }

                });
            }
            else {
                User.findById(identity.user_id, function (err, user) {
                    req.session.user_id = user._id;
                    res.json({user: user.serialized()});
                });
            }
        })
    });

    app.get('/api/stores', function (req, res) {
        User.find({store: true}, function (err, stores) {
            stores = stores.map(function (e) {
                return e.serialized()
            });
            res.json({stores: stores});
        })
    });

    app.get('/api/stores/products', function (req, res) {
        User.find({store: true}, function (err, stores) {
            stores = stores.map(function (e) {
                return e.serialized()
            });
            var ii = 0;
            stores.forEach(function (e, i) {
                Product.find({user_id: e._id}, function (err, products) {
                    if (products.length == 0) {
                        ii++;
                        if (ii == stores.length) res.json({stores: stores});
                    }
                    productHelper.getFullInfoProducts(products, function (products) {
                        var popular = products.slice(0);
                        popular.sort(function (a, b) {
                            return -a.user_likes.length + b.user_likes.length;
                        });
                        stores[i].products = popular.slice(0, 4);
                        ii++;
                        if (ii == stores.length) res.json({stores: stores});
                    })
                });
            });
        })
    });

    app.get('/api/store/:id', function (req, res) {
        User.findById(req.params.id, function (err, store) {
            res.json({store: store.serialized()});
        })
    });

    app.get('/api/users', function (req, res) {
        User.find({}, function (err, users) {
           res.json({ users: users.reverse() });
        });
    });

    app.patch('/api/users/:id', function (req, res) {
        User.update({ _id: req.params.id }, { $set: { admin: req.body.admin, store: req.body.store } }, function (err, status) {
            if(err) { res.json({ error: err }); }
            else {
                User.findById(req.params.id, function (err, user) {
                    res.json({user: user});
                });
            }
        })
    });

};
