const mongoUrl = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME;
const instance = require('monk')(mongoUrl);

module.exports.instance = instance;
module.exports.vipCustomers = instance.get('vipCustomers');
