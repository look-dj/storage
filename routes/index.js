let upload = require('./upload.js')
module.exports = (app) => {
	app.get('/', function(req, res) {
		res.render('react.html')
	})
	upload(app);
}
