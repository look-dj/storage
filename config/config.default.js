/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require("path");
module.exports = (appInfo) => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {});
  config.luinxPass="8si7DrXx4Tx2JZDN";
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + "_1603011385388_3417";
	config.tokenSecret = "dsdsdsdsdshjkshjkdsh";
  config.fileSecret = "dsdsdsdsdshjkshjkdsh";
  config.site = appInfo.env === "prod" ? "http://storage.luciferdj.cn" : "http://127.0.0.1:9018"; 
	// add your middleware config here
	config.middleware = ["auth"];
	config.view = {
		mapping: {
			".html": "nunjucks",
		},
		root: path.join(appInfo.baseDir, "app/view"),
  };
  config.security = {
    csrf: false
  };
	config.mysql = {
		// 单数据库信息配置
		client: {
			// host
			host: "119.45.57.238",
			// 端口号
			port: "3306",
			// 用户名
			user: "dj",
			// 密码
			password: "kmRHGi3DzMyHjDe6",
			// 数据库名
			database: "storage",
		},
		// 是否加载到 app 上，默认开启
		app: true,
		// 是否加载到 agent 上，默认关闭
		agent: false,
  };

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	return {
		...config,
		...userConfig,
	};
};
