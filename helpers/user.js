var User = require('../models/user');
var formidable = require('formidable');
var cloudinary = require('../cloudinary');

exports.current_user = function (session_user_id, callback) {
    User.findById(session_user_id, function (err, user) {
        callback(user);
    });
};

exports.saveUser = function (req, callback) {
    var form = new formidable.IncomingForm();
    var userF, avatar, banner;
    form.parse(req, function (err, fields, files) {
        userF = fields;
        avatar = files.avatar;
        if(files.banner) banner = files.banner;
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
                        cloudinary.uploader.upload(avatar.path, function(result) {
                            new_user.avatar = result.url;
                            if(userF.store == 'true') {
                                    cloudinary.uploader.upload(banner.path, function (result) {
                                        new_user.banner = result.url;
                                        new_user.save(function (err) {
                                            if (err) callback({error: err});
                                            else callback(new_user);
                                        });
                                    }, {folder: 'public'})
                            }
                            else {
                                new_user.save(function (err) {
                                    if (err) callback({error: err});
                                    else callback(new_user);
                                });
                            }
                        },{folder: 'public'});
                    }
                }
            })
        } else callback({error: "Password != password_confirm"});
    });
};