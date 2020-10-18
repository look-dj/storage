const crypto = require("crypto");
let algorithm = "aes-192-cbc";
let salt = "mjn6TASS2zedrNx42JarDDiJ";
const util = {
	encode: function (text, secret) {
		let key = crypto.scryptSync(secret, salt, 24);
    let iv = Buffer.alloc(16, 0); // 初始化向量。
		let cipher = crypto.createCipheriv(algorithm, key, iv);
		let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
		return encrypted;
	},
	decode: function (code, secret) {
		let key = crypto.scryptSync(secret, salt, 24);
		let iv = Buffer.alloc(16, 0); // 初始化向量。
		let decipher = crypto.createDecipheriv(algorithm, key, iv);
		let decrypted = decipher.update(code, "hex", "utf8");
		decrypted += decipher.final("utf8");
		return decrypted;
  },
  randomStr: function(num){
    num = num<8?8:num;
    let str = "";
    let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    for (let i = 0; i < num; i++) {
      str += chars.charAt(Math.floor(Math.random()* chars.length));
    }
    return str;
  }
};
module.exports = (app) => {
  app.util = util;
};
