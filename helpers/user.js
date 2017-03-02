var User = require('../models/user');
var fileHepler = require('../helpers/files');
var formidable = require('formidable');
var mkdirp = require('mkdirp');

exports.current_user = function (session_user_id, callback) {
    User.findById(session_user_id, function (err, user) {
        callback(user);
    });
};

exports.saveUser = function (req, callback) {
    var form = new formidable.IncomingForm();
    var userF, avatar;
    form.parse(req, function (err, fields, files) {
        userF = fields;
        avatar = files.avatar;
        if (userF.password === userF.password_confirmation) {
            User.findOne({username: userF.username}, function (err, user) {
                if (err) callback({error: err});
                else {
                    if (user) callback({error: "Username busy"});
                    else {
                        var new_user = new User({
                            username: userF.username,
                            password: userF.password,
                            store: userF.store,
                            admin: userF.admin
                        });
                        mkdirp('./images/users/' + new_user._id, function (err) {
                            fileHepler.saveImg(avatar.path, __dirname + './../images/users/' + new_user._id + '/avatar.jpg', function () {
                                new_user.save(function (err) {
                                    if (err) callback({error: err});
                                    else {
                                        callback(new_user);
                                    }
                                });
                            });
                        });
                    }
                }
            })
        } else callback({error: "Password != password_confirm"});
    });
};