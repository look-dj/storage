"use strict";

const Controller = require("egg").Controller;

class FileController extends Controller {
	async rename() {
		const { ctx, service } = this;
		let res = await service.file.rename();
		if (res.state) return ctx.success(res.msg);
		ctx.err("生成sql失败");
	}
}

module.exports = FileController;
