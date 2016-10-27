// Quantity dropdown (taken from amazon)
var amazonQ = "<div class='selectQuantity'> <span class='a-declarative' data-action='quantity-dropdown' data-quantity-dropdown='{}'> <span class='a-dropdown-container'><label for='quantity' class='a-native-dropdown'>Qty:</label><select name='quantity' autocomplete='off' id='quantity' tabindex='-1' class='a-native-dropdown'> <option value='1' selected=''>1 </option> <option value='2'>2 </option> <option value='3'>3 </option> <option value='4'>4 </option> <option value='5'>5 </option> <option value='6'>6 </option> <option value='7'>7 </option> <option value='8'>8 </option> <option value='9'>9 </option> <option value='10'>10 </option> <option value='11'>11 </option> <option value='12'>12 </option> <option value='13'>13 </option> <option value='14'>14 </option> <option value='15'>15 </option> <option value='16'>16 </option> <option value='17'>17 </option> <option value='18'>18 </option> <option value='19'>19 </option> <option value='20'>20 </option> <option value='21'>21 </option> <option value='22'>22 </option> <option value='23'>23 </option> <option value='24'>24 </option> <option value='25'>25 </option> <option value='26'>26 </option> <option value='27'>27 </option> <option value='28'>28 </option> <option value='29'>29 </option> <option value='30'>30 </option> </select><span tabindex='-1' class='a-button a-button-dropdown a-button-small' id='a-autoid-0' style='min-width: 0%;'><span class='a-button-inner'><span class='a-button-text a-declarative' data-action='a-dropdown-button' role='button' tabindex='0' aria-hidden='true' id='a-autoid-0-announce'>";

// Load product table
var loadProducts = function() {
	$.get("/products", function(products) {
		var productTable = $("<table class='table table-striped table-hover'><thead><tr><th>ID<th>Item<th>Department<th>Price<tbody>");
		$.each(products, function(i, v) {
			var row = $("<tr>");
		  	$("<td>").text(v.ItemID).appendTo(row);
		  	$("<td>").text(v.ProductName).appendTo(row);
		  	$("<td>").text(v.DepartmentName).appendTo(row);
		  	$("<td class='cashmoney'>").text(v.Price).appendTo(row);
		  	$(amazonQ+"<button type='button' class='btn btn-default btn-sm addItem'><span class='glyphicon glyphicon-shopping-cart'></span> Shopping Cart</button>").appendTo(row);
		  	row.appendTo(productTable);
		});
		productTable.appendTo("#products");
		$(".cashmoney").autoNumeric("init",{
			aSep: ",",
			aSign: "$"
		});
	});
};
$(document).on("click", ".addItem",function() {
	console.log($(this).data("quantity-dropdown"));
});

// Dom ready
$(function() {
	loadProducts();
});