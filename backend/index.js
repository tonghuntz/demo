var oracledb = require('oracledb');
var express = require('express');
  app = express();
  port = process.env.PORT || 5000;

app.listen(port);

app.get("/api/oracle", (req, res) => {
    oracledb.getConnection({
    user : "system",
    password : "cfpxY5xNYjs=1",
    connectString : "192.168.226.200/orcltest"
	 },
	 (err, connection) => {
	 if (err) { 
		console.error(err); return; }
		connection.execute("SELECT * from TABLE1",
	 (err, result) => {
	 if (err) { 
		console.error(err); return; 
	 }
		console.log(result.rows);
		res.send(result);
	 });
	 });
});

console.log('todo list RESTful API server started on: ' + port);