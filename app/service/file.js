"use strict";
const path = require("path");
const fs = require("fs");
const Controller = require("egg").Service;

class FileService extends Controller {
	rename() {
		let that = this;
		// let { app, config } = this;
		return new Promise(async (resolve, reject) => {
			let src = path.resolve(__dirname, "../public/temp");
			if (!fs.existsSync(src))
				return resolve({ state: false, msg: "目录不存在" });
			let files = fs.readdirSync(src);
			let i = 0;
			while (i < files.length) {
				let old = path.join(src, files[i]);
				let newName = path.join(
					src,
					new Date().valueOf() + path.parse(files[i]).ext
				);
				try {
					await rename(old, newName);
					i++;
				} catch (e) {
					console.log(e);
					reject(e);
					throw new Error(e);
				}
			}
			resolve({ state: true, msg: "重命名成功" });
		});
	}
}
function rename(old, newName) {
	return new Promise((resolve, reject) => {
		let r_stream = fs.createReadStream(old);
		let w_stream = fs.createWriteStream(newName);
		r_stream.pipe(w_stream);
		w_stream.on("finish", function (e) {
			fs.unlink(old, function (err) {
				if (err) {
					console.log(err);
					reject(err);
					return;
				}
				resolve(true);
			});
		});
	});
}
module.exports = FileService;
