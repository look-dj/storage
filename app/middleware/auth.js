module.exports = (options, app) => {
	return async function auth(ctx, next) {
		if (ctx.request.method.toLowerCase() === "get") return await next();
		let whiteList = ["/storage/login"];
		let whiteUrl = whiteList.some((item) => ctx.url.startsWith(item));
		if (whiteUrl) return await next();
		let authorization = ctx.request.header.authorization;
		if (authorization.length < 1) return ctx.err("暂时还没有权限", 351);
		let authResult = ctx.service.storage.validAuth(authorization);
		if (!authResult) return ctx.err("暂时还没有权限", 351);
		await next();
	};
};
