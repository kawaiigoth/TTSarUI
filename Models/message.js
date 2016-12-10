var uuid = require('node-uuid');
class Message {
    constructor(text, geo, date, r_id, photo, status, id) {
            this.text = text;
            this.geo = geo;
            this.photo = photo;
            this.date = date || new Date();
            this.id = id || uuid.v4();
            this.r_id = r_id;
            this.status = status || 'unreaded';
    }

}

module.exports = Message;