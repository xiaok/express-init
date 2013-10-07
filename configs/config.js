var _ = require('underscore');

module.exports = function(app) {

	//通用配置：
	//如果开发生产配置的键值和通用配置相同，则通用配置被覆盖
	var conf = {
		name : 'fed',
		version:'0.0.1',
		port : '3000',
	}

	//开发环境配置：
  	if ('dev' == app.get('env')) {
		var dev = {
			db : {
				host : 'localhost',
				user : 'root',
				password :'',
				database : 'fed',
			},

			'weixin' : {

				token:'keyboardcat123',
				path:'/'

			}

		};
		app.config = _.extend(conf,dev);
	};

	//生产环境配置：
	if ('pdc' == app.get('env')) {
		var pdc = {
			'db' : {
				host : 'localhost',
				user : 'root',
				password :'',
				database : '',
			},

			'weixin' : {

				token:'keyboardcat123',
				path:'/wechat'

			}

		};
		app.config = _.extend(conf,pdc);
	};
};