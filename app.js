require('babel-core/register')({
  "presets":["env","react","stage-3"],
  "plugins":['transform-class-properties']
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var httpProxy=require('http-proxy');

// var routes=require('./src/routes');
// var ReactDOMServer= require('react-dom/server');
// var match=require('react-router');
// var RoutingContext=require('react-router');

var app = express();
// REQUEST HANDLER FOR SERER-SIDE RENDERING
var handleRender= require('./requestHandler');
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
app.set('views',path.join(__dirname,'views'));
// Middleware to intercept all client request. This is where we bring in the universal rendering aspect of the application.
app.use(handleRender);
// app.get('*',handleRender);
/* app.get('*',(req, res) => {
  
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
  
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const reactMarkup = ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps} />)
        // Success!
        res.status(200).render('index',{reactMarkup});
  
      } else {
        res.status(404).render('Not found')
      }
    })
  }) */
  
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
  res.send(err.message);
  console.log(err);
});

module.exports = app;
