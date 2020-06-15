var express = require('express');
var oracledb = require('oracledb');

const app = express();
const port = process.env.PORT || 5550;
const bodyParser = require('body-parser');

app.listen(port);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/api/users", function(req, res) {
	oracledb.getConnection({
		user: 'system',
		password: 'cfpxY5xNYjs=1',
		connectString: '192.168.226.200/orcltest'
	},
	function(err, connection){
		if(err){
			console.log(err);
			return;
		}
		connection.execute('SELECT a.USERID,a.USERNAME,a.FIRSTNAME,a.LASTNAME,a.EMAIL,c.PROVINCENAME,d.KHETNAME,e.KHWANGNAME,e.ZIPCODE \
							FROM TABLEUSER a \
							INNER JOIN TABLEADDRESS b \
							  ON b.USERID = a.USERID \
							INNER JOIN  TABLEPROVINCE c \
							  ON c.PROVINCEID = b.PROVINCEID \
							INNER JOIN TABLEKHET d \
							  ON d.PROVINCEID = c.PROVINCEID AND b.KHETID = d.KHETID \
							INNER JOIN TABLEKHWANG e \
							  ON e.KHETID= d.KHETID AND b.KHWANGID = e.KHWANGID',[],{ outFormat: oracledb.OBJECT },function(err, result){
			if(err){
				console.log(err);
				return;
			}
			//console.log(result.rows);
			connection.release();
			res.send(result.rows);
		});
	});
});

app.get("/api/province", function(req, res) {
	oracledb.getConnection({
		user: 'system',
		password: 'cfpxY5xNYjs=1',
		connectString: '192.168.226.200/orcltest'
	},
	function(err, connection){
		if(err){
			console.log(err);
			return;
		}
		connection.execute('SELECT * \
							FROM TABLEPROVINCE',[],{ outFormat: oracledb.OBJECT },function(err, result){
			if(err){
				console.log(err);
				return;
			}
			//console.log(result.rows);
			connection.release();
			res.send(result.rows);
		});
	});
});

app.get("/api/khet", function(req, res) {
	oracledb.getConnection({
		user: 'system',
		password: 'cfpxY5xNYjs=1',
		connectString: '192.168.226.200/orcltest'
	},
	function(err, connection){
		if(err){
			console.log(err);
			return;
		}
		connection.execute('SELECT * \
							FROM TABLEKHET',[],{ outFormat: oracledb.OBJECT },function(err, result){
			if(err){
				console.log(err);
				return;
			}
			//console.log(result.rows);
			connection.release();
			res.send(result.rows);
		});
	});
});

app.get("/api/khwang", function(req, res) {
	oracledb.getConnection({
		user: 'system',
		password: 'cfpxY5xNYjs=1',
		connectString: '192.168.226.200/orcltest'
	},
	function(err, connection){
		if(err){
			console.log(err);
			return;
		}
		connection.execute('SELECT * \
							FROM TABLEKHWANG',[],{ outFormat: oracledb.OBJECT },function(err, result){
			if(err){
				console.log(err);
				return;
			}
			//console.log(result.rows);
			connection.release();
			res.send(result.rows);
		});
	});
});


app.post('/api/users/', function(req, res){
	console.log('Got body:', req.body);
	oracledb.getConnection({
		  user: 'system',
		  password: 'cfpxY5xNYjs=1',
		  connectString: '192.168.226.200/orcltest'
	  },
	  function(err, connection){
		  if(err){
			  console.log("Error");
			  console.log(err);
			  return;
		  }
		  console.log("Starting execute");
		  connection.execute("DECLARE \
					temp_id INT; \
				  BEGIN \
				  INSERT INTO TABLEUSER (USERNAME, FIRSTNAME, LASTNAME,EMAIL ) VALUES ('"+req.body.username+"', '"+req.body.firstname+"', '"+req.body.lastname+"', '"+req.body.email+"') RETURNING USERID INTO temp_id; \
				  INSERT INTO TABLEADDRESS(USERID,PROVINCEID,KHETID,KHWANGID) VALUES(temp_id,"+req.body.provinceid+","+req.body.khetid+","+req.body.khwangid+"); \
				  END;", function (error, result){
			  if(error){
				  console.log(error);
				  return;
			  }
			  connection.commit();
			  console.log(result);
			  res.sendStatus(200);
			  connection.release();
		  });
	  });
	  
  });

  app.put('/api/users/:userid', function(req, res){
	console.log(req.params.userid);
	console.log('Got body:', req.body);
	oracledb.getConnection({
		  user: 'system',
		  password: 'cfpxY5xNYjs=1',
		  connectString: '192.168.226.200/orcltest'
	  },
	  function(err, connection){
		  if(err){
			  console.log("Error");
			  console.log(err);
			  return;
		  }
		  console.log("Starting execute");
		  connection.execute("BEGIN \
			UPDATE TABLEUSER SET USERNAME='"+req.body.username+"', FIRSTNAME='"+req.body.firstname+"', LASTNAME='"+req.body.lastname+"', EMAIL='"+req.body.email+"' WHERE USERID = "+req.params.userid+"; \
			UPDATE TABLEADDRESS SET PROVINCEID="+req.body.provinceid+", KHETID="+req.body.khetid+", KHWANGID="+req.body.khwangid+" WHERE USERID = "+req.params.userid+"; \
			END;", function (error, result){
			  if(error){
				  console.log(error);
				  return;
			  }
			  connection.commit();
			  console.log(result);
			  res.sendStatus(200);
			  connection.release();
		  });
	  });
	  
  });

app.delete('/api/users/:userid/', function(req, res){
  oracledb.getConnection({
		user: 'system',
		password: 'cfpxY5xNYjs=1',
		connectString: '192.168.226.200/orcltest'
	},
	function(err, connection){
		if(err){
			console.log(err);
			return;
		}
		connection.execute("BEGIN \
				DELETE FROM TABLEUSER WHERE USERID="+req.params.userid+"; \
				DELETE FROM TABLEADDRESS WHERE USERID="+req.params.userid+"; \
				END;", function (error, result){
			if(error){
				console.log(error);
				return;
			}
			connection.commit();
			console.log(result);
			res.sendStatus(200);
			connection.release();
		});
	});
	
});

console.log('API Server started on:' + port);