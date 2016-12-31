var Origin = require("origin")

module.exports.loop = function() {
    if(Memory.Origin != undefined) {
        Origin.update()
    }
}
