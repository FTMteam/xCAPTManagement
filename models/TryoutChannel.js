const {Schema,model} = require('mongoose')

const setTryoutResult = new Schema({
    guildID : {
        type: String,
        required : true,
    },
    channelID : {
        type : String,
    }
});

module.exports = model('setTryoutResult', setTryoutResult);