var DAL = require('../DAL');
var Message = require('../Models/message')
class BL{
    constructor(){
        console.log('BL instance');
        this.dal = new DAL();

    }
    getRoutes(){
        let routes = this.dal.getRoutes();
        return routes;
    }
    getRoute(id){
        let info = this.dal.getRoute(id);
        return info;
    }
    getMessages(){
        let messages = this.dal.getMessages();
        return messages;
    }

    getMessagesByRouteID(id){

    }

    getRouteFromId(id){

    }
    getTypeFromId(id){

    }
    sendMessage(body,file){
        let message = new Message(body.text,[body.latitude,body.longitude], new Date(), body.id, file.path, 'unreaded');

        return this.dal.insertMessage(message);
    }
    changeMessageStatus(message,status){

    }
    changeRouteStatus(id,statusMessage){

    }
}

module.exports = BL;