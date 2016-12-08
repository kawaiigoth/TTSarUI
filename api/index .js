var express = require('express');
var app = express();
var BL = require('../BL');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'uploaded_images/'}).fields([{name : "text", maxCount: 1}, {name : "imgUpload", maxCount: 1},
    {name: "id", maxCount: 1}, {name: "latitude", maxCount: 1}, {name: "longtitude", maxCount: 1}]);
var bodyParser = require('body-parser');

var bl = new BL();
router.get('/status', requestStatus);
router.get('/get-status-info', requestInfo);
router.post('/send-message', upload, sendMessage);
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

function sendMessage(req, res) {
    console.log('sending');
    console.log(req.body);
    console.log(req.file);
}
module.exports = router;