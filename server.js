var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dev'));


app.get('/',function(req,res){
    res.sendFile('index.html');
});

app.get('/about',function(req,res){
    res.sendFile('/admin.html');
});


app.listen(8080);

console.log("Running at Port 8080");
