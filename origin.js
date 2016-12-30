module.exports = {
    assemble: function() {
        global.Origin = class Origin {
            constructor() {}
        }
        global.Origin.Job = class Job {
            constructor(name, steps) {
                this.name = name;
                this.steps = steps;
            }
        }
    },
    initiate: function() {

    },
    develop: function() {

    },
    energize: function() {

    }
}
