var spawn = require('child_process').spawn;

var RestartableProcess = function(processName,args,opts) {
    this._processName = processName;
    this._args = args;
    this._opts = Object.assign(opts || {},{ stdio: 'inherit' });
    this._onRestart = null;
    process.on('exit',function() {
        if (this._process) {
            this._process.kill();
        }
    });
};

RestartableProcess.prototype._start = function(cb) {
    this._process = spawn(this._processName,this._args,this._opts);
    this._process.on('close',function(code) {
        this._process = null;
        if (this._onRestart) {
            cb = this._onRestart;
            this._onRestart = null;
            this._start(cb);
        }
    }.bind(this));
    cb();
};

RestartableProcess.prototype.restart = function(cb) {
    if (this._process) {
        this._onRestart = cb;
        this._process.kill();
    } else {
        this._start(cb);
    }
};

module.exports = RestartableProcess;
