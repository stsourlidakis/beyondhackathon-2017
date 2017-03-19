require('dotenv').config();
const express = require('express'),
		app = express(),
		http = require('http').Server(app),
		io = require('socket.io')(http),
		db = require('./lib/db.js');

let pendingMessages = [];

app.use('/static', express.static('static'));
app.use('/', express.static('../app'));
app.use('/mobile', express.static('../client-mobile'));

app.get('/arrived/:personId', function(req, res){
	db.vipCustomers.findOne({personId: req.params.personId})
	.then(function(doc){
		if(!doc){
			throw(`Unkown personId: ${req.params.personId}`)
		}

		let customer = {
			personId: req.params.personId,
			id: doc._id,
			name: doc.name,
			title: doc.title,
		    flagged: doc.flagged,
			image: `/static/photos/${doc.localImageName}`,
			lastVisit: doc.lastVisit,
			creditBill: doc.creditBill,
			loanDebt: doc.loanDebt,
			capitalControlLimit: doc.capitalControlLimit,
			transactions: doc.transactions
		};
		io.sockets.emit('new-vip-customer', { customer: customer });
		res.json({success: true, customer: customer});
	})
	.catch(function(error){
		console.log(error);
		res.json({success: false, error: error});
	});
});

app.get('/person/:personId/message/:message', function(req, res){
	db.vipCustomers.findOne({personId: req.params.personId})
	.then(function(doc){
		if(!doc){
			throw(`Unkown personId: ${req.params.personId}`)
		}
		pendingMessages.push({
			name: `${doc.title}. ${doc.name}`,
			message: req.params.message,
			queueNumber: 15,
			clerkName: 'Mr. Iosif Mpoukas',
			clerkPhoto: '/static/photos/clerk.jpg',
			directions: 'first office to the left'
		});

		res.json({success: true});
	})
	.catch(function(error){
		console.log(error);
		res.json({success: false, error: error});
	});
});

app.get('/message', function(req, res){
	res.json({
		message: pendingMessages.shift()
	});
});

const port = process.env.PORT || 80;
http.listen(port, function () {
	console.log('Server listening on port '+port+'!');
});
