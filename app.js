var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser')
let router = require('./routes/index.js'); // 路由
let config = require('./config/config.js'); // 配置
config(app);
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎为ejs
app.set('view engine', 'ejs');
//为html扩展名注册ejs
app.engine('html', ejs.renderFile);
let obj = multer({
	dest: app.config.savePath
});
app.use(obj.any());
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, 'static')));
app.use("/public/upload", express.static(path.join(__dirname, 'upload')));
router(app);
module.exports = app;
