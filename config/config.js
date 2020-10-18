const path = require("path");
let site =
	process.env.NODE_ENV === "production"
		? "http://storage.luciferdj.cn"
		: "http://127.0.0.1:9018";
// let site = "http://127.0.0.1:9018";
const config = {
	site,
	uploadPath: site + "/public/upload/",
	savePath: path.resolve(__dirname, "../upload/"),
	fileSecret: "AtYCme5tnffR",
	userSecret: "SXadZ3Qk5EA6",
	mysql: {
		host:
			process.env.NODE_ENV === "production"
				? "119.45.57.238"
				: "127.0.0.1",
		port: "3306",
		user: "storage",
		password: "123123",
		database: "storage",
	},
};

module.exports = (app) => {
	// console.log(config);
	app.config = config;
};
