const {Schema,model} = require('mongoose')

const index = new Schema({
    guildID : {
        type: String,
        required : true,
    },
    userID : {
        type : String,
        required : true,
    },
    RobloxUsername : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        
    },
    content : {
        type : Array,
    },
    messageID : {
        type :String,
    }
});

module.exports = model('TryoutLogs', index);