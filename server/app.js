var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var connectToDB = mongoose.connect('mongodb://localhost:27017/adoptiondb').connection;

// middleware
app.use(bodyParser.json());

// test db connection
connectToDB.on('error', function(err) {
	console.log('mongodb connection error:', err);
});
connectToDB.once('open', function() {
	console.log('mongodb connection open');
});

// spin up server
app.listen(process.env.PORT || 3000, function() {
	console.log('now serving port');
});

app.use(express.static('public'));

// base URL
app.get('/', function(req,res) {
	console.log('in base URL');
	res.sendFile(path.resolve('views/index.html'));
});
