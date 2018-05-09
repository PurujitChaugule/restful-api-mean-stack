var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('submit',['submit']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/submit', function(req, res) {
	console.log(" I recieved a GET request")

	db.submit.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});

});

/*app.post('/assignment', function(req, res) {
	console.log(req.body);
	db.assignment.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});*/

app.post('/submit', function (req, res) {
  console.log(req.body);
  var doc = req.body;
   var exists;
   db.submit.find({name: doc.name}, function(err,docs){
       if (docs == undefined || docs.length == 0){
           console.log("Doesn't exist" );
           exists = false;
       }
       else{	
           console.log("Data Already Exists" );
           exists = true;
       }
       if(exists){}
       else{
		   if(doc.name == undefined){}
		   else{
			   db.submit.insert(req.body, function(err, doc) {
				   res.json(doc);
		   });
        }
   }

});
});

app.delete('/submit/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.submit.remove({_id: mongojs.ObjectId(id)}, function(err,doc)
		{
			res.json(doc);
		});
});

app.get("/submit/:id", function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.submit.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/submit/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.submit.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, age: req.body.age, gender: req.body.gender, number: req.body.number}},
		new: true}, function(err, doc) {
			res.json(doc);
		});
});

app.listen(3000);
console.log("SERVER RUNNING ON PORT 3000");