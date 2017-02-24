var Product = require('../models/product');
var productHelper = require('../helpers/product');
var userHelper = require('../helpers/user');
var User = require('../models/user');
var fs = require('fs');
var mkdirp = require('mkdirp');


var formidable = require('formidable');


module.exports = function(app){

    app.get('/api/products', function (req, res) {
        Product.find({}, function (err, products) {
            productHelper.getFullInfoProducts(products, function (products) {
                res.json({ products: products });
            })
        });
    });

    app.post('/api/products', function (req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {

            console.log('files', Object.keys(files).length);


            var product = fields;
            var descriptionPhotos = [];
            var mainPhoto = files.mainPhoto;
            for (var i = 0; i < Object.keys(files).length - 1; i++) {
                descriptionPhotos.push(files['descriptionPhoto[' + i + ']']);
            }

            userHelper.current_user(req.session.user_id, function (user) {

                // if (user && ( user.admin || user.store )) {
                var new_product = new Product({
                    user_id: user.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    tags: product.tags
                });

                var dphotos = [];
                var ii = 0;

                descriptionPhotos.forEach(function (e, i) {

                    mkdirp('./images/' + new_product._id, function (err) {
                        fs.readFile(e.path, function (err, data) {
                            if (err) throw err;
                            var name = Math.random().toString(36).substring(7) + '.' + e.name.split('.').pop();
                            fs.writeFile(__dirname + './../images/' + new_product._id + '/' + name, data, function (err) {
                                if (err) throw err;
                                dphotos[i] = name;
                                ii++;
                                if (ii == descriptionPhotos.length) {
                                    fs.readFile(mainPhoto.path, function (err, data) {
                                        var mainPhotodir = Math.random().toString(36).substring(7) + '.' + mainPhoto.name.split('.').pop();
                                        fs.writeFile(__dirname + './../images/' + new_product._id + '/' + mainPhotodir, data, function (err) {

                                            new_product.descriptionPhoto = dphotos;
                                            new_product.mainPhoto = mainPhotodir;

                                            console.log(new_product);
                                            console.log('---');

                                            new_product.save(function (err) {
                                                if (err) res.json({error: err});
                                                else {
                                                    new_product.getFullInfo(function (product) {
                                                        console.log(product);
                                                        res.json({product: product});
                                                    });
                                                }
                                            });

                                        });
                                    });
                                }

                            });
                        });

                    });

                });
            });
            // } else {
            //     res.json({error: "Please, login store acc"});
            // }

        });

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

    app.put('/api/products/like/:id', function (req, res) {

        Product.findById( req.params.id , function (err, product) {
            productHelper.Like(req.session.user_id, product, function (new_likes) {
                Product.update({ _id: post._id }, { $set: { user_likes: new_likes } }, function (err, product) {
                    if(err) res.json({ error: err });
                    else {  res.json({ like: 'ok' }); }
                })
            })
        })
    });

};