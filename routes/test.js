// const cors = require("cors");
module.exports = (app) => {
	app.get("/storage/test", function (req, res) {
		// res.send({msg:'测试接口，成功'})
		res.render("<h1>测试接口，成功<h1/>");
	});
	app.post("/storage/test", function (req, res) {
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    console.log(token);
    if(!token) return res.send({ msg: "测试接口，失败", code: 351});
		let account = app.util.decode(token, app.config.tokenSecret);
		if (account === "root") {
			return res.send({ msg: "测试接口，成功",code: 200 });
		}
		res.send({ msg: "测试接口，失败", code: 351});
		// res.render("react.html")
	});
};
