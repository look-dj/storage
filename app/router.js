"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
	const { router, controller } = app;
	router.get("/", controller.home.index);
	router.post("/storage/login", controller.storage.login);
	router.post("/storage/image/upload", controller.storage.imageUpload);
	router.post("/storage/image/delete", controller.storage.imageDelete);
	router.post("/storage/image/list", controller.storage.imageList);
};
