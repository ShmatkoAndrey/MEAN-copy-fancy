var User = require('../models/user');

exports.current_user = function (callback) {
    User.findById(req.session.user_id, function (err, user) {
        callback(user);
    });
};