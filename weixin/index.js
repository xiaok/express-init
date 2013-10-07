module.exports = function(app){

    var webot = require('weixin-robot');

    webot.watch(app, {token : app.config.weixin.token,path:app.config.weixin.path});

    require('./rules')(webot);

}