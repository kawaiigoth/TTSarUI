class DAL{
    constructor(){
        console.log("dal inst");
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
        ]
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

    getRoutes(){
        let routes = [
            {
                "type": 1,
                "way": 1,
                "status": 2
            },
            {
                "type": 1,
                "way": 2,
                "status": 3
            },
            {
                "type": 1,
                "way": 3,
                "status": 2
            },
            {
                "type": 1,
                "way": 4,
                "status": 1
            },
            {
                "type": 1,
                "way": 5,
                "status": 1
            },
            {
                "type": 1,
                "way": 6,
                "status": 1
            },
            {
                "type": 1,
                "way": 7,
                "status": 1
            },
            {
                "type": 1,
                "way": 8,
                "status": 1
            },
            {
                "type": 1,
                "way": 9,
                "status": 1
            },
            {
                "type": 1,
                "way": 10,
                "status": 1
            },
            {
                "type": 2,
                "way": 11,
                "status": 1
            },
            {
                "type": 2,
                "way": 12,
                "status": 1
            },
            {
                "type": 2,
                "way": 13,
                "status": 1
            },
            {
                "type": 2,
                "way": 14,
                "status": 1
            },
            {
                "type": 2,
                "way": 16,
                "status": 1
            },
            {
                "type": 2,
                "way": 17,
                "status": 1
            },
            {
                "type": 2,
                "way": 18,
                "status": 1
            },
            {
                "type": 2,
                "way": 19,
                "status": 1
            },
            {
                "type": 2,
                "way": 20,
                "status": 1
            },
            {
                "type": 2,
                "way": 21,
                "status": 2
            },
            {
                "type": 2,
                "way": 22,
                "status": 1
            },
            {
                "type": 2,
                "way": 23,
                "status": 3
            },
            {
                "type": 2,
                "way": 24,
                "status": 2
            },
            {
                "type": 1,
                "way": 25,
                "status": 1
            }
        ];
        return routes;
    }
    getRoute(id){
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