const path = require('path');
let site = process.env.NODE_ENV === 'production'?"http://storage.luciferdj.cn":"http://127.0.0.1:9018";
const config = {
	site,
	uploadPath: site + "/public/upload/",
  savePath: path.resolve(__dirname, '../upload/'),
  fileSecret: "AtYCme5tnffR",
	mysql: {
		host: "127.0.0.1",
		port: "3306",
		user: "root",
		password: "123123",
		database: "storage"
	}
}

module.exports = (app) => {
	// console.log(config);
	app.config = config;
}
