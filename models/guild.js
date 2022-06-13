const mongoose = require('mongoose');

const guildShema = mongoose.Schema({
    id: String,
    prefix: { 'type' : String, 'default': '!' },
    logChannel: { 'type' : String, 'default': '949253797119684608' },
});

module.exports = mongoose.model('guild', guildShema);