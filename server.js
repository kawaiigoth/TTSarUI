var express = require('express');
var app = express();
var path = require('path');
var route_status = require('./api/index ');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dev'));

app.set('port', process.env.PORT || "8080");

app.get('/',function(req,res){
    res.sendFile('index.html');
});

app.get('/about',function(req,res){
    res.sendFile('/admin.html');
});

app.use('/api', route_status);

app.use(function (req, res) {
    res.status(404).send('not found');
});
app.use(function (err, req, res, next) {
    "use strict";
    if (process.env.NODE_ENV == 'development') {

        console.log(err.stack);
        next(err);
    } else {
        console.log(err.stack);
        res.send(500);
    }

});

app.listen(app.get('port'));

console.log("Running at Port " + app.get('port'));
