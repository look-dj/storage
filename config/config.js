const path = require('path');
let site = "http://127.0.0.1:9018";
const config = {
	site,
	uploadPath: site + "/public/upload/",
	savePath: path.resolve(__dirname, '../public/upload/')
}

module.exports = (app) => {
	// console.log(config);
	app.config = config;
}
