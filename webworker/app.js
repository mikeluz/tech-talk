var express = require('express'); // requires express.js
var app = express(); // defines app.js as an instance of express

var nunjucks = require('nunjucks'); // require nunjucks for dynamic HTML

var path = require('path'); // node module that provides utilities for working with file and directory path
module.exports = app; // exports app so it can be used/referenced elsewhere in program

app.set('view engine', 'html'); // '.set' is an express method which sets "application settings", options provided by express
app.engine('html', nunjucks.render); // sets engine to nunjucks, first arg is file extension (".html") to apply the second arg (the callback) to
var env = nunjucks.configure('views', { noCache: true }); // why capture what .configure returns in "env" ?

app.use(express.static(path.join(__dirname, './public'))); // sets "/public" folder to static

app.get('/', function (req, res, next) { // basic GET request for homepage
	console.log("Working");
	res.render('index');
});

// error handling middleware, comes last and globally deals with errors
// first arg is an error, this distinguishes it from other .use instances
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send(err.message);
});
