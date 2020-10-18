const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const app = express();
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");

let router = require("./routes/index.js"); // 路由
let config = require("./config/config.js"); // 配置
let plugins = require("./plugins/index.js");
config(app);
plugins(app);
app.config.tokenSecret = app.util.randomStr(20 + Math.floor(Math.random() * 20));
app.set("views", path.join(__dirname, "views"));
//设置模板引擎为ejs
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
//为html扩展名注册ejs
app.set('view engine', 'html');
let obj = multer({
	dest: app.config.savePath,
});
app.use(obj.any());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/public/upload", express.static(path.join(__dirname, "upload")));
// console.log(app.util.randomStr(24));
console.log(`当前为=====> ${process.env.NODE_ENV === 'production'?'生产':'开发'}环境`)
router(app);
module.exports = app;
