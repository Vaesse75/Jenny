"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShellCommand_1 = require("./ShellCommand");
/**
 * @throws
 */
function shellCommand(command, args, expectedExitStatus) {
    if (args === void 0) { args = []; }
    if (expectedExitStatus === void 0) { expectedExitStatus = 0; }
    try {
        var sc = new ShellCommand_1.ShellCommand(command, args, expectedExitStatus);
        return sc;
    }
    catch (e) {
        throw e;
    }
}
exports.shellCommand = shellCommand;
function execute(command, args, expectedExitStatus, callback) {
    if (args === void 0) { args = []; }
    if (expectedExitStatus === void 0) { expectedExitStatus = 0; }
    if (typeof callback === 'undefined') {
        return new Promise(function (resolve, reject) {
            try {
                var sc_1 = shellCommand(command, args, expectedExitStatus);
                sc_1.execute().then(function (success) {
                    resolve({ shellCommand: sc_1, success: success });
                }).catch(function (e) {
                    reject(e);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    else {
        try {
            var sc_2 = shellCommand(command, args, expectedExitStatus);
            sc_2.execute(function (error, result) {
                if (error) {
                    callback(error, { shellCommand: sc_2, success: result });
                }
                else {
                    callback(error, { shellCommand: sc_2, success: result });
                }
            });
            return sc_2;
        }
        catch (e) {
            //@ts-ignore
            callback(e, undefined);
            //@ts-ignore
            return;
        }
    }
}
exports.execute = execute;
