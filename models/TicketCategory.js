const {Schema,model} = require('mongoose')

const index = new Schema({
    guildID : {
        type: String,
        required : true,
    },
    currentTicketID : {
        type : String,
    },
    categoryID : {
        type : String,
    },
    channelID : {
        type : String,
    },
    customID : {
        type : String,
    },
});

module.exports = model('setTicketCategory', index);