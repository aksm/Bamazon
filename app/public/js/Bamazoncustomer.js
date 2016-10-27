// Quantity dropdown (taken from amazon)
var amazonQ = "<div class='selectQuantity'> <span class='a-declarative' data-action='quantity-dropdown' data-quantity-dropdown='{}'> <span class='a-dropdown-container'><label for='quantity' class='a-native-dropdown'>Qty:</label><select name='quantity' autocomplete='off' id='quantity' tabindex='-1' class='a-native-dropdown'> <option value='1' selected=''>1 </option> <option value='2'>2 </option> <option value='3'>3 </option> <option value='4'>4 </option> <option value='5'>5 </option> <option value='6'>6 </option> <option value='7'>7 </option> <option value='8'>8 </option> <option value='9'>9 </option> <option value='10'>10 </option> <option value='11'>11 </option> <option value='12'>12 </option> <option value='13'>13 </option> <option value='14'>14 </option> <option value='15'>15 </option> <option value='16'>16 </option> <option value='17'>17 </option> <option value='18'>18 </option> <option value='19'>19 </option> <option value='20'>20 </option> <option value='21'>21 </option> <option value='22'>22 </option> <option value='23'>23 </option> <option value='24'>24 </option> <option value='25'>25 </option> <option value='26'>26 </option> <option value='27'>27 </option> <option value='28'>28 </option> <option value='29'>29 </option> <option value='30'>30 </option> </select><span tabindex='-1' class='a-button a-button-dropdown a-button-small' id='a-autoid-0' style='min-width: 0%;'><span class='a-button-inner'><span class='a-button-text a-declarative' data-action='a-dropdown-button' role='button' tabindex='0' aria-hidden='true' id='a-autoid-0-announce'>";

var order = {};
// Load product table
var loadProducts = function() {
	$.get("/products", function(products) {
		// var productTable = $("<table class='table table-striped table-hover'><thead><tr><th>ID<th>Item<th>Department<th>Price<tbody>");
		$.each(products, function(i, v) {
			var row = $("<tr class='itemRow'>");
		  	$("<td class='itemid' data-itemid='"+v.ItemID+"'>").text(v.ItemID).appendTo(row);
		  	$("<td>").text(v.ProductName).appendTo(row);
		  	$("<td>").text(v.DepartmentName).appendTo(row);
		  	$("<td class='cashmoney'>").text(v.Price).appendTo(row);
		  	$(amazonQ+"<button type='button' class='btn btn-default btn-sm addItem'><span class='glyphicon glyphicon-shopping-cart'></span> Shopping Cart</button>").appendTo(row);
		  	row.appendTo("#products");
		});
		$(".cashmoney").autoNumeric("init",{
			aSep: ",",
			aSign: "$"
		});
		// productTable.appendTo("#products");
	});
};
var addProduct = function() {
	$(document).on("click", ".addItem",function() {
		var q = $(this).closest(".itemRow").find("select#quantity option:selected").val();
		var itemID = $(this).closest(".itemRow").find(".itemid").data("itemid");
		$.get("/productbyid?"+$.param({productID:itemID}), function(product) {
			if(product.StockQuantity < 1) {
				$("#cart-status").html("<h2>Sold out. Please choose another item.");
			} else {
				order[itemID] = q;
				var row = $("<tr class='cartRow'>");
			  	$("<td class='itemid' data-cartitemid='"+product[0].ItemID+"'>").text(product[0].ItemID).appendTo(row);
			  	$("<td>").text(product[0].ProductName).appendTo(row);
			  	$("<td>").text(product[0].DepartmentName).appendTo(row);
			  	$("<td class='cashmoney'>").text(product[0].Price).appendTo(row);
			  	$("<td>").text(q).appendTo(row);
			  	$("<button type='button' class='btn btn-default btn-sm removeItem'><span class='glyphicon glyphicon-remove'></span></button>").appendTo(row);
			  	// $(amazonQ+"<button type='button' class='btn btn-default btn-sm addItem'><span class='glyphicon glyphicon-shopping-cart'></span> Shopping Cart</button>").appendTo(row);
			  	row.appendTo("#cart");
				$(".cashmoney").autoNumeric("init",{
					aSep: ",",
					aSign: "$"
				});
			}
		});
	});
};
var removeItem = function() {
	$(document).on("click", ".removeItem",function() {
		var removeitemID = $(this).closest("tr").find(".itemid").data("cartitemid");
		$(this).closest("tr").remove();
		delete order[removeitemID];
	});
};

var submitOrder = function() {
	$(document).on("click", "#order",function() {

		$.post("/order?"+$.param({productID:itemID}), function(product) {
		});
	});
};

// Dom ready
$(function() {
	loadProducts();
	addProduct();
	removeItem();
});