var config = {
    local: {
        mode: 'local',
        port: 3000,
        db_name: 'fancy_db'
    },
    staging: {
        mode: 'staging',
        port: 4000,
        db_name: 'fancy_db'
    },
    production: {
        mode: 'production',
        port: 5000,
        db_name: 'fancy_db'
    }
};

module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
};