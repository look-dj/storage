const path = require("path");
const fs = require("fs");
module.exports = (app) => {
	app.post("/upload/image", function (req, res) {
		let _file = req.files[0];
		let newName =
			"look_" + new Date().valueOf() + path.parse(_file.originalname).ext;
		let _dir = path.resolve(process.cwd(), path.parse(_file.path).dir);
		let newFile = path.resolve(_dir, newName); // 新文件名
		let oldFile = path.resolve(process.cwd(), _file.path); // 旧文件名
		fs.rename(oldFile, newFile, function (err) {
			if (err)
				return res.send({ msg: "保存图片失败，请稍后重试", code: 351 });
			let link = app.config.uploadPath + newName;
			res.send({ msg: "上传图片成功", code: 200, path: link });
		});
	});
	app.post("/delete/image", function (req, res) {
		// 删除的文件名不存在
		// 没有权限
    // 开始删除
    deleteFile(app, res, req.body.name);
    // 更新数据库信息
	});
};
function deleteFile(app, res, name){
  name = path.parse(name).base;
  let deletePath = path.resolve(app.config.savePath, name);
  if (fs.existsSync(deletePath)) {
    fs.unlink(deletePath, (err) => {
      if (err) {
        res.send({ msg: "删除图片失败，请稍后重试", code: 351 });
      }
      res.send({ msg: "删除图片成功", code: 200 });
    });
  } else {
    res.send({ msg: "删除图片失败，图片路劲不存在", code: 351 });
  }
}
