var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
// var mongoose = require('mongoose');
// var passport = require('passport');
// var webpack  = require('webpack');
// var webpackConfig = require('./webpack.config.js');
// var webpackMiddleware = require('webpack-dev-middleware');
// var webpackHotMiddleware = require('webpack-hot-middleware');
// var compiler = webpack(webpackConfig);
// var wpMiddleware = webpackMiddleware(compiler, 
// 									{publicPath: webpackConfig.output.publicPath, 
// 										contentBase: "./src", 
// 										stats: {colors:true, 
// 												timings: true,
// 												 hash:false,
// 												 chunks:false,
// 												 chunkModules:false,
// 												 modules:false}});
// app.use(wpMiddleware);
// app.use(webpackHotMiddleware(compiler));

// var morgan       = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser   = require('body-parser');
// var session      = require('express-session');

// var configDB = require('./config/database.js');
// // var configPassport = require('./config/passport.js');
// // configPassport(passport);

// // configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database

// // require('./config/passport')(passport); // pass passport for configuration

// // set up our express application
// app.use(morgan('dev')); // log every request to the console
// app.use(cookieParser()); // read cookies (needed for auth)
// app.use(bodyParser()); // get information from html forms

// // required for passport
// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

// // routes ======================================================================
// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.use(express.static('public'));

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);