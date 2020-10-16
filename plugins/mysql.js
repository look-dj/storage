const mysql = require('mysql');
module.exports = (app) => {
	var pool = mysql.createPool(app.config.mysql);
	app.mysql = {
		query: function(sql, args=[]){
			return new Promise((resolve,reject)=>{
				pool.getConnection(function(err,connection){
					if(err) return reject(err);
					connection.query(sql, args, function(err, rows){
						if(err) return reject(err);
						resolve(rows);
					})
				})
			})
		}
	}
}
