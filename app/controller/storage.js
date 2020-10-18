"use strict";

const Controller = require("egg").Controller;

class StorageController extends Controller {
	async login() {
		const { ctx, service } = this;
		let params = ctx.request.body;
		let result = await service.storage.login(params);
		if (result.state) return ctx.success(result.msg, result.data);
		ctx.err(result.msg);
	}
	async uploadImage() {
		const { ctx, service } = this;
		const stream = await ctx.getFileStream();
		let result = await service.storage.uploadImage(stream);
		if (result.state) return ctx.success(result.msg, result.data);
		ctx.err(result.msg);
	}
	async deleteImage() {
    const { ctx, service } = this;
    let params = ctx.request.body;
		let result = await service.storage.deleteImage(params);
		if (result.state) return ctx.success(result.msg);
		ctx.err(result.msg);
	}
}

module.exports = StorageController;
