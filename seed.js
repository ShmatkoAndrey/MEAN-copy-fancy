var db = require('./db');
var User = require('./models/User');
var Product = require('./models/Product');
var Identity = require('./models/Identity');
var fileHepler = require('./helpers/files');
var productHelper = require('./helpers/product');
var faker = require('faker');
var colors = require('colors');
var fs = require('fs');
var mkdirp = require('mkdirp');

var stores = [];
var users = [];
var products = [];

var stores_cnt = 10;
var users_cnt = 20;
var products_cnt = 50;
var rm = false;

db.connection.on('connected', function () {

    if(!isNaN((process.argv[2])) && !isNaN(process.argv[3]) && !isNaN(process.argv[4])) {
        stores_cnt = parseInt(process.argv[2]);
        users_cnt = parseInt(process.argv[3]);
        products_cnt = parseInt(process.argv[4]);
    }

    if(process.argv[2] === 'remove' || process.argv[3] === 'remove' || process.argv[4] === 'remove' || process.argv[5] === 'remove') {
        rm = true;
    }

    if(!isNaN((process.argv[2])) && !isNaN(process.argv[3]) && (!process.argv[4]) || process.argv[4] === 'remove') {
        stores_cnt = parseInt(process.argv[2]);
        products_cnt = parseInt(process.argv[3]);
    }

    if(!isNaN((process.argv[2])) && (!process.argv[3]) || process.argv[3] === 'remove') {
        products_cnt = parseInt(process.argv[2]);
    }

    if(rm) {
        User.remove({}, function (err) {
            console.log('removed all users'.red);
        });
        Product.remove({}, function (err) {
            console.log('removed all products'.red);
        });
         Identity.remove({}, function (err) {
            console.log('removed all identities'.red);
        });

        deleteFolderRecursive(__dirname + '/images/');
        console.log('images cleared'.red);
    }

    var time = Date.now();
    var c_i_sore = 0;
    for (var i = 0; i < stores_cnt; i++) {
        userCreate(true, function (store) {
            stores.push(store);
            console.log('created store: \t'.green + store.username);
            c_i_sore++;
            if(c_i_sore == stores_cnt) {
                var ii = 0;
                for (var j = 0; j < products_cnt; j++) {
                    productCreate(stores[Math.floor(Math.random() * stores.length)]._id, function (product) {
                        products.push(product);
                        console.log('created product: \t'.green + product.title);
                        ii++;
                        if(ii == products_cnt) {
                            productLikes(function () {
                                db.connection.close();
                                console.log('Created time '.yellow, Date.now() - time);
                            })
                        }
                    });
                }
            }
        });
    }

    for (var i = 0; i < users_cnt; i++) {
        userCreate(false, function (user) {
            users.push(user);
            console.log('created user: \t'.green + user.username);
        });
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

function userCreate(store, callback) {
    var userF = {
        username: store ? faker.company.companyName() : faker.name.findName(),
        password: '12',
        password_confirmation: '12',
        store: store,
        admin: false
    };
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
                    fs.readdir('./test-images/avatars/', function (err, items) {
                        var path = __dirname + '/test-images/avatars/' + items[Math.floor(Math.random() * items.length)];
                        mkdirp('./images/users/' + new_user._id, function (err) {
                            fileHepler.saveImg(path, __dirname + '/images/users/' + new_user._id + '/avatar.jpg', function () {
                                new_user.save(function (err) {
                                    if (err) callback({error: err});
                                    else callback(new_user);
                                });
                            });
                        });
                    });
                }
            }
        })
    }
}

function productCreate(user_id, callback) {
    var new_product = new Product({
        user_id: user_id,
        title: faker.commerce.productName(),
        description: faker.lorem.paragraphs(),
        price: faker.commerce.price().split('.')[0],
        tags: ['tag1', 'tag2', 'tag3', 'seedcreate']
    });

    var descriptionPhotos = [], mainPhoto;
    fs.readdir('./test-images/', function (err, items) {
        items.splice(items.indexOf('avatars'), 1);
        mainPhoto = __dirname + '/test-images/' + items[Math.floor(Math.random() * items.length)];
        for (var i = 0; i < 4; i++) {
            var path = __dirname + '/test-images/' + items[Math.floor(Math.random() * items.length)];
            descriptionPhotos.push(path);
        }
        var dphotos = [], ii = 0;
        descriptionPhotos.forEach(function (e, i) {
            mkdirp('./images/' + new_product._id, function (err) {
                var name = Math.random().toString(36).substring(7) + '.' + e.split('.').pop();
                fileHepler.saveImg(e, __dirname + '/images/' + new_product._id + '/' + name, function () {
                    dphotos[i] = name;
                    ii++;
                    if (ii == descriptionPhotos.length) {
                        var mainPhotoDir = Math.random().toString(36).substring(7) + '.' + mainPhoto.split('.').pop();
                        fileHepler.saveImg(mainPhoto, __dirname + '/images/' + new_product._id + '/' + mainPhotoDir, function () {
                            new_product.descriptionPhoto = dphotos;
                            new_product.mainPhoto = mainPhotoDir;
                            new_product.save(function (err) {
                                new_product.getFullInfo(function (product) {
                                    callback(product);
                                });

                            });
                        });
                    }
                });

            });
        });
    });
}

function productLikes(callback) {
    products.forEach(function (e) {
        var cnt = getRandomInt(2, users.length);
        var users_lds = [];
        for(var l = 0; l < cnt; l++) { users_lds.push(users[Math.floor(Math.random()*users.length)]._id) }
        Product.update({ _id: e._id }, { $set: { user_likes: users_lds } }, function (err, status) {
            if(e === products[products.length - 1]) {
                callback();
            }
        });
    });
}
