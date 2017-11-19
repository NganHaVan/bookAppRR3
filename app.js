require('babel-core/register')({
  "presets":["es2015","react","stage-3"]
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var httpProxy=require('http-proxy');

var app = express();
// REQUEST HANDLER FOR SERER-SIDE RENDERING
var requestHandler= require('./requestHandler');
const apiProxy=httpProxy.createProxyServer({
  target:'http://localhost:3001'
});
// Middleware to intercept all requests to the '/api' url and retrieve all resources from PROXY
app.use('/api',function(req,res){
  apiProxy.web(req,res);
})
// END PROXY

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Template enfine
app.set('view engine','ejs');
// Middleware to intercept all client request
app.use(requestHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
