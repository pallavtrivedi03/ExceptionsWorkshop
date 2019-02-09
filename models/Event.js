var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Event = new Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Event', Event);