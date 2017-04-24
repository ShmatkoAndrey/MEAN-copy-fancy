var db = require('./db');
var User = require('./models/User');
var Product = require('./models/Product');
var Identity = require('./models/Identity');
var faker = require('faker');
var colors = require('colors');
var mkdirp = require('mkdirp');
var cloudinary = require('./cloudinary');

var stores = [];
var users = [];
var products = [];

var stores_cnt = 10;
var users_cnt = 20;
var products_cnt = 10;
var rm = false;
var all_tags = ['man', 'woman', 'child', 'art', 'gadgets', 'pets', 'food', 'workspace', 'tag1', 'tag2', 'tag3' ];

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

        cloudinary.api.delete_resources_by_prefix('public/', function(result){
            console.log('images cleared'.red);
            startSeeds();
        });
    } else {
        startSeeds();
    }
});

function startSeeds() {
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
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
                    cloudinary.api.resources(function(result){
                        var avatars = result.resources;
                        cloudinary.uploader.upload(avatars[Math.floor(Math.random() * avatars.length)].url, function(result) {
                            new_user.avatar = result.url;
                            if(store) {
                                cloudinary.api.resources(function (result) {
                                    var banners = result.resources;
                                    cloudinary.uploader.upload(banners[Math.floor(Math.random() * banners.length)].url, function (result) {
                                        new_user.banner = result.url;
                                        new_user.save(function (err) {
                                            if (err) callback({error: err});
                                            else callback(new_user);
                                        });
                                    }, {folder: 'public'})
                                }, {type: 'upload', prefix: 'seed-images/banners'});
                            }
                            else {
                                new_user.save(function (err) {
                                    if (err) callback({error: err});
                                    else callback(new_user);
                                });
                            }
                        },{folder: 'public'})
                    },{ type: 'upload', prefix: 'seed-images/avatars' });
                }
            }
        })
    }
}

function productCreate(user_id, callback) {
    var tags = randomTags();
    var new_product = new Product({
        user_id: user_id,
        title: faker.commerce.productName(),
        description: faker.lorem.paragraphs(),
        price: faker.commerce.price().split('.')[0],
        tags: tags
    });
    var descriptionPhotos = [], mainPhoto;
    cloudinary.api.resources(function(result) {
        var items = result.resources;
        for (var i = 0; i < 4; i++) {
            var path = items[Math.floor(Math.random() * items.length)].url;
            descriptionPhotos.push(path);
        }
        var dphotos = [], ii = 0;
        descriptionPhotos.forEach(function (e, i) {
            cloudinary.uploader.upload(e, function (result) {
                dphotos[i] = result.url;
                ii++;
                if (ii == descriptionPhotos.length) {
                    cloudinary.uploader.upload(items[Math.floor(Math.random() * items.length)].url, function (result) {
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
    },{ type: 'upload', prefix: 'seed-images' });
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

function randomTags() {
    var tags_to_product = [];
    all_tags.forEach(function (e) {
        if(getRandomInt(0, 3) == 0) tags_to_product.push(e);

    }) ;

    return tags_to_product;
}
