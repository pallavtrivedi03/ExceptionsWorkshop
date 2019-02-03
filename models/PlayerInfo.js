var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerInfo = new Schema({
    name: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: false
    },
    nationality: {
        type: String,
        required: false
    },
    appearances: {
        type: String,
        required: false
    },
    clean_sheets: {
        type: String,
        required: false
    },
    goals: {
        type: String,
        required: false
    },
    wins: {
        type: String,
        required: false
    },
    loses: {
        type: String,
        required: false
    },
    still_plays: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('PlayerInfo', PlayerInfo);