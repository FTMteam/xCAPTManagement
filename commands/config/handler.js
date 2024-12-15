async function index(c,cmd,interaction ){
    var mod = require(`./${interaction.options.getSubcommand()}.js`)
    mod(c,cmd,interaction)
}

module.exports = index