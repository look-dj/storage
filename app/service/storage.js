"use strict";
const path = require("path");
const fs = require("fs");
const Controller = require("egg").Service;

class StorageService extends Controller {
	async validAuth(authorization) {
		let { app, config } = this;
		let token = authorization.split(" ")[1];
		let account = app.decode(token, config.tokenSecret);
		if (!account) return false;
		try {
			await app.mysql.get("user", { account });
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
	async login({ account, pass }) {
		let { app, config } = this;
		let info = await app.mysql.get("user", { account });
		if (info.pass !== pass) return { msg: "登录失败，账号或密码错误" };
		let token = app.encode(info.account, config.tokenSecret);
		return { msg: "登录成功", state: true, data: { token } };
	}
	async imageUpload(stream) {
		let { app, config, ctx } = this;
		let date = new Date().valueOf();
		let { insertId } = await app.mysql.insert("file_list", {
			origin: ctx.request.header.origin,
			filename: stream.filename,
			link: "",
			date,
			username: "root",
		});
		if (!insertId) return { msg: "保存图片信息到数据库失败" };
		let floder = path.join(config.baseDir, "app/public/uploads");
		if (!fs.existsSync(floder)) {
			fs.mkdirSync(floder);
		}
		let filename =
			app.encode(insertId + "_" + date, config.fileSecret) +
			path.parse(stream.filename).ext;
		let writeStream = fs.createWriteStream(path.join(floder, filename));
		let result = await awaitWriteStream(stream, writeStream);
		if (result) {
			let link = `${config.site}/public/uploads/${filename}`;
			await app.mysql.update("file_list", {
				id: insertId,
				link,
				filename,
			});
			return {
				msg: "上传图片信息成功",
				state: true,
				data: { path: link },
			};
		}
		return { msg: "保存图片出现错误" };
	}
	async imageDelete({ name }) {
		let { app, config } = this;
		let filename = path.parse(name).base;
		let filepath = path.join(
			config.baseDir,
			"app/public/uploads",
			filename
		);
		if (!fs.existsSync(filepath)) {
			return { msg: "删除图片失败，图片路劲不存在" };
		}
		try {
			await unlink(filepath);
			let name = app.decode(filename.split(".")[0], config.fileSecret);
			console.log(name);
			let id = name.split("_")[0];
			await app.mysql.delete("file_list", { id });
			return { msg: "删除图片成功", state: true };
		} catch (e) {
			console.log(e);
			return { msg: "删除图片失败，请稍后重试" };
		}
	}
	async imageList({ limit, offset }) {
		let { app } = this;
		let sql = "SELECT * FROM `file_list`";
		let allImages = await app.mysql.query(sql);
		console.log(allImages);
		sql = sql += " LIMIT ? OFFSET ?";
		let result = await app.mysql.query(sql, [limit, limit * offset]);
		if (result.length > 0)
			return {
				msg: "获取数据成功",
				state: true,
				data: {
					data: result,
					total: Math.ceil(allImages.length / limit),
				},
			};
		return { msg: "暂时还没有数据", state: true };
	}
}
function awaitWriteStream(stream, writeStream) {
	return new Promise((resolve, reject) => {
		stream.pipe(writeStream);
		writeStream.on("finish", function () {
			resolve(true);
		});
		writeStream.on("data", function () {
			console.log("正在写入");
		});
		writeStream.on("error", function (err) {
			console.log(err);
			reject(err);
		});
	});
}
function unlink(deletePath) {
	return new Promise((resolve, reject) => {
		fs.unlink(deletePath, (err) => {
			if (err) {
				reject(err);
			}
			resolve(true);
		});
	});
}
module.exports = StorageService;
