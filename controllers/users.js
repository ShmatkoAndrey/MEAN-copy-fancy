var User = require('../models/user');
var Product = require('../models/product');
var productHelper = require('../helpers/product');

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
        console.log(res.body);
    });

    app.get('/api/stores', function (req, res) {
       User.find({ store: true }, function (err, stores) {
           stores = stores.map(function (e) {return e.serialized()});
           res.json({stores: stores});
       })
    });

    app.get('/api/stores/products', function (req, res) {
        User.find({ store: true }, function (err, stores) {
            stores = stores.map(function (e) {return e.serialized()});
            var ii = 0;
            stores.forEach(function (e, i) {
                Product.find({user_id: e._id}, function (err, products) {
                    productHelper.getFullInfoProducts(products, function (products) {
                        var popular = products.slice(0);
                        popular.sort(function(a,b) { return - a.user_likes.length + b.user_likes.length; });
                        stores[i].products = popular.slice(0, 5);
                        ii++;
                        if(ii == stores.length) res.json({ products: stores });
                    })
                });
            });
        })
    })
};
