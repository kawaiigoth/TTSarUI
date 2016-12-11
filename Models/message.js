var uuid = require('node-uuid');
class Message {
    constructor(text, geo, date, r_id, photo, status, id) {
            this.message = text;
            this.geotag = geo;
            this.photo = photo;
            this.datetime = date || new Date();
            this.message_id = id || uuid.v4();
            this.r_id = r_id;
            this.status = status || 'unreaded';
    }

}

module.exports = Message;