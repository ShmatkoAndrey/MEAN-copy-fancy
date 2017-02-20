var User = require('../models/user');

exports.current_user = function (session_user_id, callback) {
    User.findById(session_user_id, function (err, user) {
        callback(user);
    });
};