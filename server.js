var express = require('express');
var app = express();
var path = require('path');
var route_status = require('./api/index ');
var loger = require('./libs/loger')(module);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dev'));
app.use(express.static(__dirname + '/api'));
app.set('port', process.env.PORT || "8080");

app.get('/',function(req,res){
    res.sendFile('index.html');
});

app.get('/admin',function(req,res){
    res.sendFile('/admin.html');
});

app.use('/api', route_status);
app.use(function (req, res) {
    res.status(404).send('not found');
});
app.use(function (err, req, res, next) {
    "use strict";
    if (process.env.NODE_ENV == 'development') {

        loger.error(err.stack);
        next(err);
    } else {
        loger.error(err.stack);
        res.sendStatus(500);
    }

});

app.listen(app.get('port'));
loger.info("Running at Port " + app.get('port'));
