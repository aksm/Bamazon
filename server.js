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
	connection.query("UPDATE Products SET StockQuantity=StockQuantity-? WHERE ItemID=?", [quantity, item],function(err, res) {
		if(err) throw err;
		return res;
	});
};

// Display all products
app.get("/products", function(request, response) {
	connection.query("SELECT * FROM Products", function(err, res) {
		if(err) throw err;
		response.send(res);
	});
});

// Retrieve product to add to cart
app.get("/productbyid", function(request, response) {
	connection.query("SELECT * FROM Products WHERE ItemID=?", request.query.productID,function(err, res) {
		if(err) throw err;
		response.send(res);
	});
});

// Reduce quantity in DB
app.post("/order", function(request, response) {
	for(var k in request.query) {
		reduceInventory(parseInt(request.query[k]),parseInt(k));
	}
  	response.sendStatus(200);
});

app.listen(app.get("port"), function() {console.log("listening");});
