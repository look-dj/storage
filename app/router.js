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
	router.post("/storage/sql/faction", controller.sql.faction);
	router.post("/storage/sql/role", controller.sql.role);
	router.post("/storage/sql/realm", controller.sql.realm);
	router.post("/storage/file/rename", controller.file.rename);
};
