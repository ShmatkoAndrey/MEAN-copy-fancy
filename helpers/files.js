var fs = require('fs');

exports.saveImg = function (oldPath, newPath, callback) {
    fs.readFile(oldPath, function (err, data) {
        if (err) throw err;
        fs.writeFile(newPath, data, function (err) {
            if (err) throw err;
            callback();
        });
    });
};
