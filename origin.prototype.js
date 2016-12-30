module.exports = {
    room: function() {
        Room.prototype.initOrigin = function() {}
    },
    spawn: function() {
        StructureSpawn.prototype.initOrigin = function() {}
    },
    creep: function() {
        Creep.prototype.initOrigin = function() {}
    },
    global: function() {
        global.origin = {}                                                                                           *
    },
    job: function() {
    }
}
