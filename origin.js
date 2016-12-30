module.exports = {
    assemble: function() {
        global.Origin = class Origin {
            constructor() {
                this.jobs = []
            }
            addJob(job, priority) {
                this.jobs.push({job: job, priority: priority})
                var jobstmp = this.jobs.sort((a,b) => a.priority - b.priority)
                this.jobs = jobstmp
            }
        }
        global.Origin.Job = class Job {
            constructor(bodyNeeded, steps, variables) {
                this.bodyNeeded = bodyNeeded;
                this.steps = steps;
                this.variables = variables
            }
        }
        global.Origin.Job.Step = class Step {
            constructor(funcName, args, fallbacks) {
                this.funcName = funcName
                this.args = args
                this.fallbacks = fallbacks
            }
        }
        global.Origin.Job.Step.harvestSource = new Origin.Job.Step("harvest", ["$%memory.source"], {[ERR_NOT_IN_RANGE]: {name: "moveTo", args: ["$%memory.source"]}})
        global.Origin.Job.Step.feed = new Origin.Job.Step("transfer", ["$%room.getFeedTarget()"], {[ERR_FULL]: {name: "moveTo", args: ["$%room.getFeedTarget()"]}, [ERR_NOT_IN_RANGE]: {name:"moveTo", args: ["$`room.getFeedTarget()`$"]}})
        global.Origin.Job.feed = new Origin.Job([WORK, CARRY], ["harvestSource", "feed", "done"])
        Room.prototype.initOrigin = function() {
            this.memory.origin = {ticks: 0, jobs: []}
        }
        Room.prototype.tickOrigin = function() {
            this.memory.origin.ticks++
        }
        Room.prototype.findJob = function(creep) {

        }
        StructureSpawn.prototype.initOrigin = function() {
            this.memory.origin = {spawning: false, ticks: 0}
        }
        StructureSpawn.prototype.tickOrigin = function() {
            this.memory.origin.ticks++
        }
        Creep.prototype.initOrigin = function() {
            this.memory.origin = {working: false, ticks: 0}
        }
        Creep.prototype.tickOrigin = function() {
            this.memory.origin.ticks++
            if(this.memory.origin.working == false) {
                //Do something by default
            } else {
                var jobParams = this.memory.origin.job

            }
        }
        Creep.prototype.setJob = function(jobName) {
            if(global.Origin.Job[jobName]) {
                for (var i = 0; i < global.Origin.Job[jobName].bodyNeeded.length; i++) {
                    if(this.body.find((e,i,a) => e.type == global.Origin.Job[jobName].bodyNeeded[i]) == false) {
                    // if(!this.body.includes(global.Origin.Job[jobName].bodyNeeded[i])) {
                        console.log(this.body)
                        console.log(global.Origin.Job[jobName].bodyNeeded[i])
                        return ERR_NO_BODYPART
                    }
                }
                this.memory.origin.working = true
                var job = global.Origin.Job[jobName]
                this.memory.origin.job = {
                    steps: job.steps,
                    variables: {},
                    stepInd: 0
                }
                for (var vi in job.variables) {
                    if (job.variables.hasOwnProperty(vi)) {
                        this.memory.origin.job.variables[vi] = job.variables[vi]
                    }
                }
            } else {
                return ERR_INVALID_ARGS
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
