let mysql = require('./mysql.js');
let util = require('./util.js');
module.exports = (app) => {
	mysql(app);
	util(app);
}