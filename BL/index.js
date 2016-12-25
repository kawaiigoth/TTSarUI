var DAL = require('../DAL');
var Message = require('../Models/message');
var loger = require('../libs/loger')(module);
class BL {
    constructor() {
        loger.info('BL instance');
        this.dal = new DAL();

    }

    getRoutes(done) {
        var routesArr;
        this.dal.getRoutes(function (routes) {
            loger.info("bl");
            done(routes);
        });
    }

    getRoute(id) {
        let info = this.dal.getRoute(id);
        return info;
    }

    getMessages() {
        let messages = this.dal.getMessages();
        return messages;
    }

    getMessagesByRouteID(id) {

    }

    getRouteFromId(id) {

    }

    getTypeFromId(id) {

    }

    sendMessage(body, file) {
        let filePath = file ? file.path : undefined;
        let message = new Message(body.text, [body.latitude, body.longitude], new Date(), body.id, filePath, 'unreaded');

        return this.dal.insertMessage(message);
    }

    changeMessageStatus(message, status) {

    }

    changeRouteStatus(id, statusMessage) {

    }
}

module.exports = BL;