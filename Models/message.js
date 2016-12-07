var _text, _geo, _photo, _date, _id, _status;

class Message {
    constructor(text, geo, photo, date, status, id) {
            _text = text;
            _geo = geo;
            _photo = photo;
            _date = date || new Date();
            _id = id || this.genereateUUID();
            _status = status || 'unreaded';
    }

    get text() {
        return _text;
    }
    get geo(){
        return _geo;
    }
    get photo(){
        return _photo;
    }
    get date(){
        return _date;
    }
    get status(){
        return _status;
    }
    get id(){
        return _id;
    }
    genereateUUID() {

        var d = new Date.now();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;

    }

}