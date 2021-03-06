var express = require('express');
var app = express();
var BL = require('../BL');
var router = express.Router();
var multer = require('multer');
var loger = require('../libs/loger')(module);
var pattExt=/\.[0-9a-z]{1,5}$/i;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploaded_images')
    },
    filename: function (req, file, cb) {
        let fileExt = file.originalname.match(pattExt);
        cb(null, file.fieldname + '-' + Date.now()+ fileExt)
    }
});
var upload = multer({storage: storage}).single('imgUpload');


var bl = new BL();
router.get('/status', requestStatus);
router.get('/get-status-info', requestInfo);
router.get('/messages', requestMessages);
router.post('/send-message', upload, sendMessage);

function requestMessages(req,res){
    let stat = bl.getMessages();
    if(stat){
        res.status(200).send(stat)
    }
    else{
        res.status(500).send('error');
    }
}

function requestStatus(req, res) {
    bl.getRoutes(function (routes) {
        if(routes){
            res.status(200).send(routes);
        }
        else
        {
            res.sendStatus(500);
        }
    });
}

function requestInfo(req,res){
    bl.getRoute(req.query.id, function (route) {
        if(route){
            res.status(200).send(routes);
        }
        else
        {
            res.sendStatus(500);
        }
    });
}

function sendMessage(req, res) {

    console.log('sending');
    console.log(req.body);
    console.log(req.file);
    if(bl.sendMessage(req.body, req.file)) {
        res.status(200).send("ok");
    }
    else {
        res.status(500).send("error");
    }
}
module.exports = router;