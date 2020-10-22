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
	async imageUpload() {
		const { ctx, service } = this;
		const stream = await ctx.getFileStream();
		let result = await service.storage.imageUpload(stream);
		if (result.state) return ctx.success(result.msg, result.data);
		ctx.err(result.msg);
	}
	async imageDelete() {
		const { ctx, service } = this;
		let params = ctx.request.body;
		let result = await service.storage.imageDelete(params);
		if (result.state) return ctx.success(result.msg);
		ctx.err(result.msg);
	}
	async imageList() {
		const { ctx, service } = this;
		let params = ctx.request.body;
		let result = await service.storage.imageList(params);
		if (result.state) return ctx.success(result.msg, result.data || {});
		ctx.err(result.msg);
	}
}

module.exports = StorageController;
