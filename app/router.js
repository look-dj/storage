'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/storage/login', controller.storage.login);
  router.post('/storage/upload/image', controller.storage.uploadImage);
  router.post('/storage/delete/image', controller.storage.deleteImage);

};
