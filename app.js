var express = require('express')
  , http = require('http')
  , path = require('path')
  , load = require('express-load')
  , mysql = require('mysql')
  , MySQLStore = require('connect-mysql')(express);

var app = express();

//设置不同的环境使用不同的 config 文件，默认是 dev ，生产环境设置成 pdc
app.settings.env = 'dev';

load('configs').into(app);
app.set('port', app.config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(app.config.name));
app.use(express.session({secret: app.config.name, cookie: {maxAge: 12*60*60*1000}, store: new MySQLStore({client: mysql.createConnection(app.config.db) })}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
if ('dev' == app.get('env')) {
  app.use(express.errorHandler());
}
if ('pdc' == app.get('env') ) {
};

load('models').then('controllers').then('weixin').then('routes').into(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
