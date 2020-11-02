"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
	async index() {
		const { ctx, service } = this;
		await ctx.render("react.html");
	}
}

module.exports = HomeController;
