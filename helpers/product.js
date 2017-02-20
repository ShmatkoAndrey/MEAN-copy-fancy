var userHelper = require('../helpers/user');

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

exports.Like = function (post, callback) {
    userHelper.current_user(function (user) {
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