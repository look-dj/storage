module.exports = (app) => {
	app.post("/storage/login", async function (req, res) {
		let { account, pass } = req.body;
		// 获得用户信息
    let info = await getUserInfo(app, account);
		// 验证用户信息
		if (info && String(info.pass) === String(pass)) {
			let token = app.util.encode(account, app.config.tokenSecret);
			res.send({ code: 200, msg: "登录成功", storageToken: token });
			return;
		}
		res.send({ code: 351, msg: "登录失败，账号或密码错误" });
	});
};
async function getUserInfo(app, account) {
	try {
		let userResult = await app.mysql.query(
			"SELECT * FROM `user` WHERE account = ?;",
			[account]
		);
		if (!userResult) return false;
		let userInfo = userResult[0];
		return userInfo;
	} catch (e) {
		console.log(e);
		return false;
	}
}
