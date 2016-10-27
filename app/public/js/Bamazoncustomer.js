$(function() {

	$.get("/products", function(products) {
		var productTable = $("<table class='table table-hover'><thead><tr><th>ID<th>Item<th>Department<th>Price<th>Quantity<tbody>");
		$.each(products, function(i, v) {
			var row = $("<tr>");
		  	$("<td>").text(v.ItemID).appendTo(row);
		  	$("<td>").text(v.ProductName).appendTo(row);
		  	$("<td>").text(v.DepartmentName).appendTo(row);
		  	$("<td>").text(v.Price).appendTo(row);
		  	$("<td>").text(v.StockQuantity).appendTo(row);
		  	row.appendTo(productTable);
		});
		productTable.appendTo("#products");
	});
});