var express = require('express');
var oracledb = require('oracledb');

const app = express();
const port = process.env.PORT || 5550;

app.listen(port);

app.get("/api/user", function(req, res) {
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
			console.log(result.rows);
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
			console.log(result.rows);
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
			console.log(result.rows);
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
			console.log(result.rows);
			res.send(result.rows);
		});
	});
});

app.get('/api/saveuser/:userid/:username/:firstname/:lastname/:email/:provinceid/:khetid/:khwangid', function(req, res){
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
		connection.execute("DECLARE \
				  temp_id INT; \
				BEGIN \
				INSERT INTO TABLEUSER (USERNAME, FIRSTNAME, LASTNAME,EMAIL ) VALUES ('"+req.param('username')+"', '"+req.param('firstname')+"', '"+req.body.req.param('email')+"', '"+req.param('id')+"') RETURNING USERID INTO temp_id; \
				INSERT INTO TABLEADDRESS(USERID,PROVINCEID,KHETID,KHWANGID) VALUES(temp_id,"+req.param('provinceid')+","+req.param('khetid')+","+req.param('khwangid')+"); \
				END;", function (error, result){
			if(err){
				console.log(err);
				return;
			}
			connection.commit();
			console.log(result);
			res.send(JSON.stringify(result));
			connection.release();
		});
	});
	
});

app.get('/api/deluser/:userid/', function(req, res){
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
				DELETE FROM TABLEUSER WHERE USERID="+req.param('provinceid')+"; \
				DELETE FROM TABLEADDRESS WHERE USERID="+req.param('provinceid')+"; \
				END;", function (error, result){
			if(err){
				console.log(err);
				return;
			}
			connection.commit();
			console.log(result);
			res.send(JSON.stringify(result));
			connection.release();
		});
	});
	
});

console.log('API Server started on:' + port);