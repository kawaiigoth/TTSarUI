var DAL = require('../DAL');

class BL{
    constructor(){
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
    getMessages(id){

    }
    getRouteFromId(id){

    }
    getTypeFromId(id){

    }
    sendMessage(message){

    }
    changeMessageStatus(message,status){

    }
    changeRouteStatus(id,statusMessage){

    }
}

module.exports = BL;