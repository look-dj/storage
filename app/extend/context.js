module.exports = {
	success(msg = "操作成功", data = {}) {
		this.body = {
			code: 200,
			...data,
			msg,
		};
	},
	err(msg = "操作失败", code = 351) {
		this.body = {
			code,
			msg,
		};
	},
};
