var Handlebars = exports.handlebars = require('handlebars'),
    partialsRegistered = false;


var partialsRegister = function(views){

  if (partialsRegistered) return;

  partialsRegistered = true;

  for (var viewName in views) {

    if(!views.hasOwnProperty(viewName) || !views[viewName]['.hbs']) continue;
    Handlebars.registerPartial(viewName, views[viewName]['.hbs'].data._content);
  }
};

var renderer = function HandlebarsRenderer (data, locals){

  partialsRegister(hexo.theme.views);
  return  Handlebars.compile(data.text)(locals);

};

hexo.extend.renderer.register('hbs', 'html', renderer, true);
hexo.extend.renderer.register('handlebars', 'html', renderer, true);
