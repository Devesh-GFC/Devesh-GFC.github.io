var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
	console.log("Responding to request.");
 	res.send("Welcome!");
});

app.listen(3000, function () {
	console.log("Server is listening on 3000...");
});