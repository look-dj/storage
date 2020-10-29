"use strict";
const path = require("path");
const fs = require("fs");
const Controller = require("egg").Service;

class FileService extends Controller {
	rename() {
		// let { app, config } = this;
		return new Promise((resolve, reject) => {
			let src = path.resolve(__dirname, "../public/temp");
			if (!fs.existsSync(src))
				return resolve({ state: false, msg: "目录不存在" });
			fs.readdir(src, function (err, files) {
				if (err) {
					console.log(err);
					reject(err);
					return;
        }
				files.forEach(async (file, idx) => {
					let link = path.join(src, file);
					let newName = path.join(
						src,
						new Date().valueOf() + "" + path.parse(link).ext
					);
          fs.renameSync(link, newName);
				});
				resolve({ state: true, msg: "重命名成功" });
			});
		});
	}
}
function rename(old, name) {
	return new Promise((resolve, reject) => {
		fs.rename(old, name, function (err) {
      console.log(err);
			if (err) return reject(err);
			resolve(true);
		});
	});
}
module.exports = FileService;
