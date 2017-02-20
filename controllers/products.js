var Product = require('../models/product');
var productHelper = require('../helpers/product');
var userHelper = require('../helpers/user');
var User = require('../models/user');

module.exports = function(app){

    app.get('/api/products', function (req, res) {
        Product.find({}, function (err, products) {
            productHelper.getFullInfoProducts(products, function (products) {
                res.json({ products: products });
            })
        });
    });

    app.post('/api/products', function (req, res) {
        var product = req.body.product;
        userHelper.current_user(function (user) {
            if (user && ( user.admin || user.store )) {
                var new_product = new Product({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    tags: product.tags
                });
                new_product.save(function (err) {
                    if (err) res.json({error: err});
                    else {
                        new_product.getFullInfo(function (product) {
                            res.json({product: product});
                        });
                    }
                });
            } else {
                res.json({error: "Please, login store acc"});
            }
        });
    });

    app.put('/api/products/:id', function (req, res) {
        var product = req.body.product;
        userHelper.current_user(function (user) {
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
        userHelper.current_user(function (user) {
            if (user && ( user.admin || (user._id == product.user_id ) )) {
                Product.remove({ _id: req.params.id }, function (err) { // findOneAndRemove ?
                    res.json({ delete: true });
                });
            } else {
                res.json({error: "Please, login store acc"});
            }
        });
    });

    app.put('/api/products/like/:id', function (req, res) {

        Product.findBuId( req.params.id , function (err, product) {
            productHelper.Like(product, function (new_likes) {
                Product.update({ _id: post._id }, { $set: { user_likes: new_likes } }, function (err, product) {
                    if(err) res.json({ error: err });
                    else {  res.json({ like: 'ok' }); }
                })
            })
        })
    });

};