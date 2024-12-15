

const mod = require('./models/TryoutLogs.js')
const fields = {a:1  , b:2 , c:3}
const query = new mod({
    guildID : '2342342342',
    userID : '1231231231',
    RobloxUsername : 'test1234',
    date : new Date(),
    content : fields

})
async function f() {
    console.log('CALLED')
    await query.save().catch((e) => {
        console.log('Error updating Tryout Result log.',e)
      })
    console.log('FINIED')
}

module.exports = f