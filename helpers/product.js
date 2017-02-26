var Product = require('../models/product');
var userHelper = require('../helpers/user');
var fileHepler = require('../helpers/files');
var formidable = require('formidable');
var mkdirp = require('mkdirp');

exports.getFullInfoProducts = function (products, callback) {
    var ii = 0;
    products.forEach(function (product, i) {
        product.getFullInfo(function (productN) {
            products[i] = productN;
            ii++;
            if (ii == products.length) {
                callback(products);
            }
        });
    })
};

exports.Like = function (session_user_id, product, callback) {
    userHelper.current_user(session_user_id, function (user) {
        var new_likes = product.user_likes;

        if (new_likes.some(function (element) { return element == user._id; }) == false) {
            new_likes.push(user._id);
        } else {
            var index = new_likes.indexOf(user._id);
            if (index > -1) {
                new_likes.splice(index, 1);
            }
        }

        callback(new_likes);
    });
};

exports.createProduct = function (req, res, callback) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var product = fields, descriptionPhotos = [], mainPhoto = files.mainPhoto;
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

            var dphotos = [], ii = 0;

            descriptionPhotos.forEach(function (e, i) {

                mkdirp('./images/' + new_product._id, function (err) {

                    var name = Math.random().toString(36).substring(7) + '.' + e.name.split('.').pop();
                    fileHepler.saveImg(e.path, __dirname + './../images/' + new_product._id + '/' + name, function () {
                        dphotos[i] = name;
                        ii++;
                        if (ii == descriptionPhotos.length) {
                            var mainPhotoDir = Math.random().toString(36).substring(7) + '.' + mainPhoto.name.split('.').pop();
                            fileHepler.saveImg(mainPhoto.path, __dirname + './../images/' + new_product._id + '/' + mainPhotoDir, function () {
                                new_product.descriptionPhoto = dphotos;
                                new_product.mainPhoto = mainPhotoDir;
                                new_product.save(function (err) {
                                    if (err) res.json({error: err});
                                    else {
                                        new_product.getFullInfo(function (product) {
                                            callback(product);
                                        });
                                    }
                                });
                            });
                        }
                    });

                });
            });
            // } else {
            //     res.json({error: "Please, login store acc"});
            // }

        });

    });
};
