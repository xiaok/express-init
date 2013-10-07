module.exports = function(app) {

  var main = app.controllers.main;

  app.get('/',main.index);

};