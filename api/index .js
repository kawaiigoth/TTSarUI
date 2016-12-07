var express = require('express');
var app = express();
var BL = require('../BL');
var router = express.Router();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var bl = new BL();
router.get('/status', requestStatus);
router.get('/get-status-info', requestInfo);

function requestStatus(req, res) {
    let stat = bl.getRoutes();
    if(stat){
        res.status(200).send(stat)
    }
    else{
        res.status(500).send('error');
    }

}

function requestInfo(req,res){
    let stat = bl.getRoute(req.query.id);
    if(stat){
        res.status(200).send(stat)
    }
    else{
        res.status(500).send('error');
    }
}

module.exports = router;