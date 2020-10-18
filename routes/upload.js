const path = require("path");
const fs = require("fs");
module.exports = (app) => {
	app.post("/storage/upload/image", async function (req, res) {
		// 存到数据库
		let auth = await validAuth(app, req);
		if (!auth) return res.send({ msg: "暂时还没有权限", code: 351 });
		let insertId = await saveFileToDb(app, req);
		if (!insertId) {
			console.log("保存图片信息到数据库失败");
		}
		// 存到服务器
		let resultFile = await saveFileToServer(app, req, res, insertId);
		if (!insertId) return;
		// 更新数据库里的信息
		let resultUpdate = await updateFileMsg(app, [
			resultFile.name,
			resultFile.link,
			insertId,
		]);
		if (!resultUpdate) {
			console.log("更新图片信息失败");
		}
		console.log("更新图片信息成功");
	});
	app.post("/storage/delete/image", async function (req, res) {
		// 没有权限
		// 开始删除
		let auth =await validAuth(app, req);
		if (!auth) return res.send({ msg: "暂时还没有权限", code: 351 });
		let name = req.body.name;
		let filename = path.parse(name).base;
		// 删除文件
		let resultDelete = await deleteFileToServer(app, res, filename);
		if (resultDelete.code === 200) {
			// 删除数据库里的数据
			let resultDelete1 = await deleteFileToDb(app, filename);
			if (resultDelete1) {
				console.log("成功在数据库里删除一条数据");
			} else {
				console.log("在数据库里删除失败");
			}
		}
		// 更新数据库信息
	});
};
async function validAuth(app, req) {
	let token = req.headers.authorization;
  if (!token) return false;
  token = token.split(' ')[1];
	let account = app.util.decode(token, app.config.tokenSecret);
	if (!account) return false;
	try {
		let accountResult = await app.mysql.query(
			"SELECT account FROM `user` WHERE account = ?;",
			[account]
		);
		if (!accountResult[0]) return false;
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}
function saveFileToServer(app, req, res, id) {
	return new Promise((resolve, reject) => {
		let _file = req.files[0];
		let filename = id + "_" + new Date().valueOf();
		filename = app.util.encode(filename, app.config.fileSecret);
		filename = filename + path.parse(_file.originalname).ext;
		let _dir = path.resolve(process.cwd(), path.parse(_file.path).dir);
		let newFile = path.resolve(_dir, filename); // 新文件名
		let oldFile = path.resolve(process.cwd(), _file.path); // 旧文件名
		fs.rename(oldFile, newFile, function (err) {
			if (err) {
				return res.send({ msg: "保存图片出现错误", code: 351 });
			}
			let link = app.config.uploadPath + filename;
			res.send({ msg: "上传图片成功", code: 200, path: link });
			resolve({ name: filename, link });
		});
	});
}
// 删除
function deleteFileToServer(app, res, name) {
	return new Promise((resolve, reject) => {
		let deletePath = path.resolve(app.config.savePath, name);
		if (fs.existsSync(deletePath)) {
			fs.unlink(deletePath, (err) => {
				if (err) {
					console.log(err);
					res.send({ msg: "删除图片失败，请稍后重试", code: 351 });
					reject(err);
				}
				res.send({ msg: "删除图片成功", code: 200 });
				resolve({ code: 200 });
			});
		} else {
			res.send({ msg: "删除图片失败，图片路劲不存在", code: 351 });
		}
	});
}
async function deleteFileToDb(app, name) {
	name = name.split(".")[0];
	name = app.util.decode(name, app.config.fileSecret);
	let id = name.split("_")[0];
	try {
		let resultDelete = await app.mysql.query(
			"DELETE FROM file_list where id=?;",
			[id]
		);
		if (resultDelete.affectedRows === 1) {
			return true;
		}
		return false;
	} catch (e) {
		console.log(e);
		return false;
	}
}
// 将添加的图片信息保存到数据库
async function saveFileToDb(app, req) {
	let file = req.files[0];
	let date = new Date().valueOf();
	let args = [file.filename, "", date, req.headers.origin, "root"];
	try {
		let result = await app.mysql.query(
			"INSERT INTO file_list(Id,filename,link,date,origin, username) VALUES(0,?,?,?,?,?);",
			args
		);
		return result.insertId;
	} catch (e) {
		console.log(e);
		return false;
	}
}
// 更新图片在数据的信息
async function updateFileMsg(app, args) {
	try {
		let result = await app.mysql.query(
			"UPDATE file_list SET filename = ?,link = ? WHERE Id = ?;",
			args
		);
		return { code: 200 };
	} catch (e) {
		console.log(e);
		return false;
	}
}
