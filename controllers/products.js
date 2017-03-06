var Product = require('../models/product');
var productHelper = require('../helpers/product');
var userHelper = require('../helpers/user');

module.exports = function(app){

    app.get('/api/products', function (req, res) {
        Product.find({}, function (err, products) {
            productHelper.getFullInfoProducts(products, function (products) {
                res.json({ products: products });
            })
        });
    });

    app.get('/api/popular', function (req, res) {
        Product.find({}, function (err, products) {
            productHelper.getFullInfoProducts(products, function (products) {
                var popular = products.slice(0);
                popular.sort(function(a,b) {
                    return - a.user_likes.length + b.user_likes.length;
                });
                res.json({ products: popular });
            })
        });
    });

    app.get('/api/popular/:n_start/:n', function (req, res) {
        Product.find({}, function (err, products) {
            productHelper.getFullInfoProducts(products, function (products) {
                var popular = products.slice(0);
                popular.sort(function(a,b) {
                    return - a.user_likes.length + b.user_likes.length;
                });

                var p = popular.slice(parseInt(req.params.n_start), parseInt(req.params.n_start) + parseInt(req.params.n));
                res.json({ products: p });
            })
        });
    });

    app.get('/api/products/:n_start/:n', function (req, res) {
        Product.find({}, function (err, products) {
            productHelper.getFullInfoProducts(products, function (products) {
                var p = products.reverse().slice(parseInt(req.params.n_start), parseInt(req.params.n_start) + parseInt(req.params.n));
                res.json({ products: p });
            })
        });
    });

    app.post('/api/products', function (req, res) {
        productHelper.createProduct(req, res, function (product) {
            res.json({ product: product });
        })
    });

    app.put('/api/products/:id', function (req, res) {
        var product = req.body;
        userHelper.current_user(req.session.user_id, function (user) {
            if (user && ( user.admin || (user._id == product.user_id ) )) {
                var new_product = new Product({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    tags: product.tags
                });

                Product.update({ _id: req.params.id }, { $set: new_product }, function (err, product) {
                    if (err) res.json({error: err});
                    else {
                        product.getFullInfo(function (product) {
                            res.json({product: product});
                        });
                    }
                });
            } else {
                res.json({error: "Please, login store acc"});
            }
        });
    });

    app.delete('/api/products/:id', function (req, res) {
        userHelper.current_user(req.session.user_id, function (user) {
            if (user && ( user.admin || (user._id == product.user_id ) )) {
                Product.remove({ _id: req.params.id }, function (err) { // findOneAndRemove ?
                    res.json({ delete: true });
                });
            } else {
                res.json({error: "Please, login store acc"});
            }
        });
    });

    app.get('/api/like/:id', function (req, res) {
        Product.findById( req.params.id , function (err, product) {  // ? del
            productHelper.Like(req.session.user_id, product, function (new_likes) {
                Product.update({ _id: product._id }, { $set: { user_likes: new_likes } }, function (err, status) {
                    if(err) { res.json({ error: err }); }
                    else {
                        product.getFullInfo(function (product) {
                            res.json({product: product});
                        });
                    }
                })
            })
        })
    });

};