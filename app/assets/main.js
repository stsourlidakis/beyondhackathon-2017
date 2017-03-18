var socket = io('http://localhost');

socket.on('new-vip-customer', function (data) {
	hideLoaderPanel();
	renderCustomerData(data.customer);
	showCustomerPanel();
});

function hideLoaderPanel(){
	$('#loader').hide();
}

function showCustomerPanel(){
	$('#vipCustomer').fadeIn();
}

function renderCustomerData(customer){
	var wrapper = $('#vipCustomer');
	console.log(customer);
	wrapper.find('.title').text(customer.title);
	wrapper.find('.name').text(customer.name);
	wrapper.find('.avatar>img').attr('src', customer.image).attr('alt', customer.name);
}
