"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var child_process_1 = require("child_process");
var events_1 = require("events");
var ShellCommand = /** @class */ (function () {
    /**
     * @throws
     */
    function ShellCommand(command, args, expectedExitStatus) {
        if (expectedExitStatus === void 0) { expectedExitStatus = 0; }
        if (os_1.platform() !== 'linux') {
            throw new Error("This module only runs on linux");
        }
        if (typeof command === 'undefined') {
            throw new Error('command must be defined and of type string');
        }
        if (typeof args === 'undefined') {
            throw new Error('args must be defined and an array of string');
        }
        this.command = command;
        this.args = args;
        this.processedCommand = "";
        this.spawn = null;
        this.pid = -1;
        this.error = null;
        this.stdout = "";
        this.stderr = "";
        this.working = false;
        this.executed = false;
        this.expectedExitStatus = expectedExitStatus;
        this.exitStatus = -1;
        this.exitSignal = null;
        this.events = new events_1.EventEmitter();
        try {
            this.processCommand();
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * @throws
     */
    ShellCommand.prototype.processCommand = function () {
        var regex = /'\!\?\!'/;
        var matchRegex = /'\!\?\!'/g;
        var nbMatch = (this.command.match(matchRegex) || []).length;
        var nbArgs = this.args.length;
        if (nbMatch === nbArgs) {
            var buf = this.command;
            for (var i = 0; i < nbMatch; i++) {
                buf = buf.replace(regex, "'" + this.args[i] + "'");
            }
            this.processedCommand = buf;
        }
        else {
            this.error = new Error(nbMatch + " arguments expected but " + nbArgs + " given.");
            throw this.error;
        }
    };
    ShellCommand.prototype.execute = function (callback) {
        var _this = this;
        var result = new Promise(function (resolve, reject) {
            if (_this.processedCommand !== "") {
                _this.spawn = child_process_1.spawn(_this.processedCommand, { shell: true });
                if (_this.spawn.pid !== undefined) {
                    _this.working = true;
                    _this.pid = _this.spawn.pid;
                    _this.events.emit('pid', _this.spawn.pid);
                }
                //DATA//
                _this.spawn.stdout.on('data', function (data) {
                    var stdout = data.toString();
                    _this.stdout += stdout;
                    _this.events.emit('stdout', stdout);
                });
                _this.spawn.stderr.on('data', function (data) {
                    var stderr = data.toString();
                    _this.stderr += stderr;
                    _this.events.emit('stderr', stderr);
                });
                //END//
                _this.spawn.on('error', function (error) {
                    _this.working = false;
                    _this.executed = true;
                    _this.error = error;
                    _this.events.emit('error', error);
                    resolve(false);
                });
                _this.spawn.on('exit', function (code, signal) {
                    _this.working = false;
                    _this.executed = true;
                    _this.exitStatus = code === null ? 0 : code;
                    _this.exitSignal = signal;
                    _this.stdout = _this.stdout.trim();
                    _this.stderr = _this.stderr.trim();
                    if (!_this.exitStatusOk()) {
                        _this.error = Error(_this.stderr);
                    }
                    _this.events.emit('exit', code, signal);
                    resolve(_this.ok());
                });
            }
            else {
                _this.error = Error("No command provided");
                _this.events.emit('error', _this.error);
                reject(_this.error);
            }
        });
        if (typeof callback === "undefined") {
            return result;
        }
        else {
            result.then(function (r) {
                callback(null, r);
            }).catch(function (e) {
                //@ts-ignore
                callback(e, undefined);
            });
        }
    };
    ShellCommand.prototype.ok = function () {
        return this.spawn !== null && !this.working && this.executed && this.error === null && this.exitStatusOk();
    };
    ShellCommand.prototype.exitStatusOk = function () {
        return this.exitStatus === this.expectedExitStatus;
    };
    /**
     * @throws
     */
    ShellCommand.prototype.kill = function (signal) {
        if (this.spawn !== null) {
            if (!this.spawn.killed) {
                this.spawn.kill(signal);
                return this.spawn.killed;
            }
            else {
                throw new Error('already killed');
            }
        }
        else {
            throw new Error('cannot kill: command isn\'t executed yet');
        }
    };
    return ShellCommand;
}());
exports.ShellCommand = ShellCommand;
