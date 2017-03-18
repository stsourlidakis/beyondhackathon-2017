require('dotenv').config();
const express = require('express'),
		app = express(),
		db = require('./lib/db.js');

app.use('/static', express.static('static'));
app.use('/', express.static('../app'));

app.get('/arrived/:personId', function(req, res){
	res.json({success: true});
});

const port = process.env.PORT || 80;
app.listen(port, function () {
	console.log('Server listening on port '+port+'!');
});
