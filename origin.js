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
                this.variables = variables;
            }
        }
        global.Origin.Step = class Step {
            constructor(funcName, argsDefault) {
                this.funcName = funcName;
                this.argsDefault = argsDefault;
            }
        }
        global.Origin.Util.rGet = function(obj, prop) {
            if(typeof obj == undefined) {
                return false;
            }

            var _index = prop.indexOf('.')
            if(_index > -1) {
                return global.Origin.Util.rGet(obj[prop.substring(0, _index)], prop.substr(_index + 1));
            }

            return obj[prop]
        }
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
        Creep.prototype.doStep = function() {
            var step = this.memory.origin.job.steps[this.memory.origin.job.stepInd];
            this[step.funcName].apply(this, this.memory.stepVars[this.memory.origin.job.stepInd])
        }
        Creep.prototype.setJob = function(jobName) {
            if(global.Origin.Job[jobName]) {
                for (var i = 0; i < global.Origin.Job[jobName].bodyNeeded.length; i++) {
                    if(this.body.find((e,i,a) => e.type == global.Origin.Job[jobName].bodyNeeded[i]) == false) {
                    // if(!this.body.includes(global.Origin.Job[jobName].bodyNeeded[i])) {
                        // console.log(this.body)
                        // console.log(global.Origin.Job[jobName].bodyNeeded[i])
                        return ERR_NO_BODYPART
                    }
                }
                this.memory.origin.working = true
                var job = global.Origin.Job[jobName]
                this.memory.origin.job = {
                    steps: job.steps,
                    variables: {},
                    stepVars: {},
                    stepInd: 0
                }
                for (var vi in job.variables) {
                    if (job.variables.hasOwnProperty(vi)) {
                        this.memory.origin.job.variables[vi] = job.variables[vi]
                    }
                }
                for(var si in this.memory.origin.job.steps) {
                    var step = this.memory.origin.job.steps[si]
                    stepVars[si] = {};
                    for(var svi in step.argsDefault) {
                        var arg = step.argsDefault[svi]
                        if(arg.startsWith("#")) {
                            stepVars[si][svi] = global.Origin.Util.rGet(global, arg.substr(1))
                        } else if(arg.startsWith("!")) {
                            stepVars[si][svi] = global.Origin.Util.rGet(global, arg.substr(1))()
                        }
                        // stepVars[si][svi] =
                    }
                }
            } else {
                return ERR_INVALID_ARGS
            }
        }
    },
    initiate: function() {
        Memory.Origin = {}
    },
    develop: function() {

    },
    energize: function() {

    },
    update: function() {
        module.exports.assemble()
    }
}
