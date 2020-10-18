// const cors = require("cors");
module.exports = (app) => {
	// app.use(cors());
	// app.all("*", (req, res, next) => {
	// 	res.header("Access-Control-Allow-Origin", "*");
	// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	// 	res.header(
	// 		"Access-Control-Allow-Methods",
	// 		"PUT,POST,GET,DELETE,OPTIONS"
	// 	);
	// 	res.header("X-Powered-By", " 3.2.1");
	// 	res.header("Content-Type", "application/json;charset=utf-8");
	// 	next();
	// });
	app.get("/", function (req, res) {
    res.render("react.html", {config: JSON.stringify(app.config)});
    // res.render("react.html")
  });
  require("./upload.js")(app);
  require("./login.js")(app);
  require("./test.js")(app);
};
