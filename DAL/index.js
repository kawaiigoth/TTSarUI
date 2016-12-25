var pg = require('pg');
var loger = require('../libs/loger')(module);
var Pool = pg.Pool; // good! a pool bound to the native client
var Client = pg.Client;// good! this client uses libpq bindings
var config = {
    user: 'postgres', //env var: PGUSER
    database: 'TTSar', //env var: PGDATABASE
    password: '123456789', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432 //env var: PGPORT

};

class DAL{
    constructor(){
        loger.info('DAL instance');
    }

    getMessages(){
        let messages =
            [
                {"message_id": 1,
            "datetime": "2016-10-23T14:25:43.511Z",
            "message": "Some information about route status",
            "status": "unread",
            "geotag": [ 10, 20 ],
            "photo": undefined},
            {"message_id": 2,
                "datetime": "2016-10-23T13:25:43.511Z",
                "message": "Some information about route status",
                "status": "unread",
                "geotag": [ 10, 20 ],
                "photo": "http://placehold.it/350x150"},
            {"message_id": 3,
                "datetime": "2016-10-23T16:25:43.511Z",
                "message": "Some information about route status",
                "status": "readed",
                "geotag": [ 10, 20 ],
                "photo": "http://placehold.it/350x150"},
            {"message_id": 4,
                "datetime": "2016-10-23T17:25:43.511Z",
                "message": "Some information about route status",
                "status": "readed",
                "geotag": [ 10, 20 ],
                "photo": "http://placehold.it/350x150"},
            {"message_id": 5,
                "datetime": "2016-10-23T18:25:43.511Z",
                "message": "Some information about route status",
                "status": "readed",
                "geotag": [ 10, 20 ],
                "photo": "http://placehold.it/350x150"},
            {"message_id": 6,
                "datetime": "2016-10-23T18:25:43.511Z",
                "message": "Some information about route status",
                "status": "readed",
                "geotag": [ 10, 20 ],
                "photo": "http://placehold.it/350x150"},
            {"message_id": 7,
                "datetime": "2016-10-23T18:25:43.511Z",
                "message": "Some information about route status",
                "status": "readed",
                "geotag": [ 10, 20 ],
                "photo": "http://placehold.it/350x150"}
        ];
        var client = new Client(config);
        client.query('SELECT NOW() as right_now')
            .then(res => loger.info(res.rows[0].right_now))
            .then(() => client.end());
        return messages;
    }

    insertMessage(message){
        if(Object.keys(message).length === 0){

            return false;
        }
        else{

            return true;
        }

    }

    getRoutes(done){

        loger.info("geting");
        let routes = [];
        let ready = false;
        var client = new Client(config);
        var routesQuery = client.query({
            text: 'SELECT "Test".type, "Test".way, "Test".status   FROM public."Test";'
        });
        client.on('drain', function () {
            client.end.bind(client);
            loger.info("true");
           done(routes);
        });
        client.connect();
        routesQuery.on('row', function(row) {
            routes.push({type : row.type, way: row.way, status : row.status});
        });

    }
    getRoute(id){
        var client = new Client(config);
        client.query('SELECT NOW() as right_now')
            .then(res => loger.info(res.rows[0].right_now))
            .then(() => client.end());
        let route ={
            "route": {
                "type": 1,
                "way": 15
            },
            "status": 1,
            "message": "Some information about route status"
        };
        return route;
    }
}

module.exports = DAL;