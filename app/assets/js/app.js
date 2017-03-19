var socket = io('/');
var initialized = false;
var jp = {
	"id":"abc",
	"name":"Jane Doe",
	"title":"Mrs",
	"image":"/static/photos/jan.png",
	"lastVisit":"17/03/2017",
	"creditBill":"100",
	"loanDebt":"40",
	"capitalControlLimit":"750",
	"transactions":[
		{
			"transaction_date":"2017-02-20",
			"value_date":"2017-02-20",
			"description":"Κατάθεση 202",
			"amount":48.71,
			"new_balance":5963.77
		},
		{
			"transaction_date":"2017-02-20",
			"value_date":"2017-02-20",
			"description":"Πληρωμή Βεβαιωμένης Οφειλής 215",
			"amount":-65.84,
			"new_balance":5897.93
		},
		{
			"transaction_date":"2017-02-20",
			"value_date":"2017-02-20",
			"description":"Κατάθεση 746",
			"amount":53.51,
			"new_balance":5951.44
		},
		{
			"transaction_date":"2017-02-17",
			"value_date":"2017-02-17",
			"description":"Κατάθεση 435",
			"amount":65.47,
			"new_balance":5827.78
		},
		{
			"transaction_date":"2017-02-17",
			"value_date":"2017-02-17",
			"description":"Κατάθεση 197",
			"amount":87.28,
			"new_balance":5915.06
		},
		{
			"transaction_date":"2017-02-16",
			"value_date":"2017-02-16",
			"description":"Ανάληψη 199",
			"amount":-97.17,
			"new_balance":5854.47
		}
	]
};

var customers = {};
var nextOffers = [
	'New credit card',
	'Low interest loan',
	'eΒanking account',
	'Time deposit with 3% interest'
];

socket.on('new-vip-customer', function (data) {
	console.log(data);
	if (customers[data.customer.id]) {
		return;
	}
	hideLoaderPanel();
	addCustomer(data.customer)
	//renderCustomerData();
	showCustomerPanel();
});

function hideLoaderPanel(){
	$('#loader').hide();
}

function showCustomerPanel(){
	$('#vipCustomer').fadeIn();
}

function addCustomer(customer){
	customers[customer.id] = customer;
	var customer_card = '<div id="'+customer.id+'" class="customer"><div class="avatar"></div><div class="name">' + customer.name +'</div></div>';
	$("#customer-list").hide().append(customer_card).fadeIn();
	$("#" + customer.id + " .avatar").css("background-image", 'url("' + customer.image + '")');
}
function renderCustomerData(customerId){
	var wrapper = $("#customer-card");
	wrapper.find('#avatar').css("background-image", 'url("' + customers[customerId].image + '")');
	wrapper.find('#name').text(customers[customerId].name);
	wrapper.find('#serveBtn').data('user_id',customers[customerId].id);
	wrapper.find('#visited').text(customers[customerId].lastVisit);
	wrapper.find('#balance').text(customers[customerId].transactions[0].new_balance);
	wrapper.find('#credit-bill').text(customers[customerId].creditBill);
	wrapper.find('#loan-debt').text(customers[customerId].loanDebt);
	wrapper.find('#capital-control').text(customers[customerId].capitalControlLimit);
	var transBody = "";
	for (var i = 0; i < customers[customerId].transactions.length; i++) {
		if (i>4) {
			break;
		}
		var tr = "<tr><td>"+ customers[customerId].transactions[i].transaction_date +"</td><td>" + customers[customerId].transactions[i].amount  + "</td>	<td>" + customers[customerId].transactions[i].new_balance +"</td><td>" + customers[customerId].transactions[i].value_date +"</td><td>"+ customers[customerId].transactions[i].description +"</td></tr>";
		transBody = transBody +tr;
	}
	wrapper.find('#transBody').html(transBody);
	if(!initialized){
		$("#customer-card").slideDown();
		initialized = true;
	}
}

function getNextOffer(name){
	var offerNum = name.length % nextOffers.length;
	return nextOffers[offerNum];
}
$(document).ready( function() {
	addCustomer(jp);
	$("#customer-list").on("click", ".customer", function(){
		$(".customer.active").removeClass("active");
		$(this).addClass("active");
		renderCustomerData(this.id);
	});
	$("#customer-card #serveBtn").on("click", function(){
		$(".served").removeClass("served");
		//$(this).closest("#customer-card").addClass('served');
		var uid = $(this).data('user_id');
		$("#"+uid).addClass('served');
		serveCustomer(uid);
	});
});
function serveCustomer(uid){
	$.get({
		url: "/person/"+uid+"/message/something"
	});
}
