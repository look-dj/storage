"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
	async faction() {
		const { ctx, service } = this;
		let res = await service.sql.faction();
		if (res) return ctx.success("生成sql成功", res);
		ctx.err("生成sql失败");
  }
  async weapon() {
		const { ctx, service } = this;
		let res = await service.sql.weapon();
		if (res) return ctx.success("生成sql成功", res);
		ctx.err("生成sql失败");
	}
	async realm() {
		const { ctx, service } = this;
		let res = await service.sql.realm();
		if (res) return ctx.success("生成sql成功", res);
		ctx.err("生成sql失败");
	}
	async role() {
		const { ctx, service } = this;
		let res = await service.sql.role();
		if (res) return ctx.success("生成sql成功", res);
		ctx.err("生成sql失败");
	}
}

module.exports = HomeController;
