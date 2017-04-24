var Product = require('../models/product');
var userHelper = require('../helpers/user');
var formidable = require('formidable');
var cloudinary = require('../cloudinary');

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
        if(user) {
            var new_likes = product.user_likes;

            if (new_likes.some(function (element) {
                    return element == '' + user._id;
                }) == false) {
                new_likes.push(user._id);
            } else {
                var index = new_likes.indexOf(user._id);
                if (index > -1) {
                    new_likes.splice(index, 1);
                }
            }
            callback(new_likes);
        }
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
            if (user && ( user.admin || user.store )) {
                var new_product = new Product({
                    user_id: user.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    tags: product.tags.split(',').map(function(item){return item.trim()})
                });
                var dphotos = [], ii = 0;
                descriptionPhotos.forEach(function (e, i) {
                    cloudinary.uploader.upload(e.path, function (result) {
                        dphotos[i] = result.url;
                        ii++;
                        if (ii == descriptionPhotos.length) {
                            cloudinary.uploader.upload(mainPhoto.path, function (result) {
                                new_product.descriptionPhoto = dphotos;
                                new_product.mainPhoto = result.url;
                                new_product.save(function (err) {
                                    new_product.getFullInfo(function (product) {
                                        callback(product);
                                    });

                                });
                            }, {folder: 'public'});

                        }
                    }, {folder: 'public'})
                });
            }
            else {
                res.json({error: "Please, login store acc"});
            }

        });

    });
};
