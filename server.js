// heroku - morning-basin
// Load modules
var express = require("express");
var mysql = require("mysql");
var dotenv = require("dotenv");

// Load local environment variables
dotenv.load();

var app = express();
app.set("port", process.env.PORT || 8080);
app.use("/", express.static(__dirname + "/app/public"));

var connection = mysql.createConnection(process.env.JAWSDB_URL);

var reduceInventory = function(quantity, item) {
	connection.query("UPDATE Products SET StockQuantity=? WHERE ItemID=?", ["StockQuantity - "+quantity, item],function(err, res) {
		if(err) throw err;
		return res;
	});
};
// getAllProducts();

// function getAllProducts() {
// 	connection.query("SELECT * FROM Products", function(err, res) {
// 		if(err) throw err;
		// return res;
		// console.log(res);
		// for(var i = 0; i < res.length; i++){
		// 	console.log("\nItem ID: "+res[i].ItemID);
		// 	console.log("Item: "+res[i].ProductName);
		// 	console.log("Department: "+res[i].DepartmentName);
		// 	console.log("Price: $"+res[i].Price);
		// 	console.log("Quantity: "+res[i].StockQuantity);
		// }
	// });
// }
app.get("/products", function(request, response) {
	connection.query("SELECT * FROM Products", function(err, res) {
		if(err) throw err;
		response.send(res);
	});
});

app.get("/productbyid", function(request, response) {
	connection.query("SELECT * FROM Products WHERE ItemID=?", request.query.productID,function(err, res) {
		if(err) throw err;
		response.send(res);
	});
});

app.post("/order", function(request, response) {
	for(var k in request.query) {
		// console.log(parseInt(request.query[k]),k);
		// console.log(typeof request.query[k],typeof k);
		// reduceInventory(request.query[k],k);
	}
  	response.sendStatus(200);
});

app.listen(app.get("port"), function() {console.log("listening");});
