// modules =================================================
var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var path     	   = require('path');
var methodOverride = require('method-override');
var logger 		   = require('morgan');
//var personas       = require('./app/routes/personas');
var vuelos       = require('./app/routes/vuelos');
var app            = express();

// configuration ===========================================

// config files
var db = require('./config/db');
//connection to db
mongoose.connect(db.url, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var port = process.env.PORT || 3000; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(logger('dev'));

// routes ==================================================
app.use('/api/vuelos', vuelos);

// Ruta de inicio (index.html)
var path = require('path');
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname,'index.html'));
});

app.get('*', function(req, res){
  res.send('Esta pagina no Existe', 404);
});

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
