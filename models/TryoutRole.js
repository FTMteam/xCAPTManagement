const {Schema,model} = require('mongoose')

const setTryoutRole = new Schema({
    guildID : {
        type: String,
        required : true,
    },
    roleID : {
        type : String,
    }
});

module.exports = model('setTryoutRole', setTryoutRole);