/* eslint-disable no-undef */
var platform = require('os').platform;
var ShellCommand = require('../dist/ShellCommand').ShellCommand;
var shellCommand = require('../dist/index').shellCommand;
var execute = require('../dist/index').execute;
var assert = require('assert');

describe('#shellCommand', () => {
	if (platform() === 'linux') {
		it('#Kill and signal', (done) => {
			try {
				var kill = false;
				var sc = shellCommand('sleep 10', []);
				sc.events.on('pid', () => {
					if (sc.kill('SIGKILL')) {
						kill = true;
					} else {
						done(new Error('Should have been killed'));
					}
				});
				sc.events.on('exit', (exitStatus, exitSignal) => {
					if (kill === true) {
						if (exitSignal === 'SIGKILL') {
							done();
						} else {
							done(`The expected exit signal was 'SIGKILL' but ${exitSignal} recieved`);
						}
					}
				});
				sc.execute(() => { });
			} catch (e) {
				done(new Error(`Didn't expected an error to happend\nError:\n${e}`));
			}
		});
	} else {
		it('#Bad platform', (done) => {
			execute('ls \'!?!\'', ['/']).then(() => {
				done(new Error('Shouldn\'t work on this platform'));
			}).catch((e) => {
				if (e.message === 'This module only runs on linux'){
					done();
				}else{
					done(new Error(`Didn't expected this error to happend\nError:\n${e}`));
				}
			});
		});
	}
});

describe('#execute (Promise)', () => {
	if (platform() === 'linux') {
		it('#Bad number of arguments', (done) => {
			execute('ls', ['/']).then(() => {
				done(new Error('Should have thrown an exception: too many arguments'));
			}).catch((e) => {
				if (e.message === '0 arguments expected but 1 given.'){
					execute('ls \'!?!\'', []).then(() => {
						done(new Error('Should have thrown an exception: to few arguments'));
					}).catch((e) => {
						if (e.message === '1 arguments expected but 0 given.') {
							done();
						}else{
							done(new Error('Wrong exception'));
						}
					});
				}else{
					done(new Error('Wrong exception'));
				}
			});
		});
		it('#Known command', (done) => {
			execute('ls \'!?!\' ', ['/']).then((result) => {
				if (result.success) {
					done();
				} else {
					done(result.shellCommand.error);
				}
			}).catch((e) => {
				done(new Error(`Didn't expected an error to happend\nError:\n${e}`));
			});
		});
		it('#Unknown command', (done) => {
			execute('vfduisvbfiudnvfdkxu', []).then((result) => {
				if (result.success) {
					done(new Error('Shouldn\'t succeed'));
				} else {
					done();
				}
			}).catch((e) => {
				done(new Error(`Didn't expected an error to happend\nError:\n${e}`));
			});
		});
		it('#Expected exit status to be 1', (done) => {
			execute('exit \'!?!\'', ['1'], 1).then((result) => {
				if (result.success) {
					done();
				} else {
					done(new Error(`The exit status should be equals to ${result.shellCommand.expectedExitStatus} but it is ${result.shellCommand.exitStatus}`));
				}
			}).catch((e) => {
				done(new Error(`Didn't expected an error to happend\nError:\n${e}`));
			});
		});
	} else {
		it('#Bad platform', (done) => {
			execute('ls \'!?!\'', ['/']).then(() => {
				done(new Error('Shouldn\'t work on this platform'));
			}).catch((e) => {
				if (e.message === 'This module only runs on linux'){
					done();
				}else{
					done(new Error(`Didn't expected this error to happend\nError:\n${e}`));
				}
			});
		});
	}
});

describe('#execute (Callback)', () => {
	if (platform() === 'linux') {
		it('#Bad number of arguments', (done) => {
			execute('ls', ['/'], undefined, (error, result) => {
				if(error){
					if (error.message === '0 arguments expected but 1 given.'){
						if(result === undefined){
							execute('ls \'!?!\'', [], undefined, (error, result) => {
								if(error){
									if(error.message === '1 arguments expected but 0 given.'){
										if(result === undefined){
											done();
										}else{
											done(new Error('The result should be undefined when the error is not null'));
										}
									}else{
										done(new Error('Wrong error given'));
									}
								}else{
									done(new Error('Should get an error: too few arguments'));
								}
							});
						}else{
							done(new Error('The result should be undefined when the error is not null'));
						}
					}else{
						done(new Error('Wrong error given'));
					}
				}else{
					done(new Error('Should get an error: too many arguments'));
				}
			});
		});
		it('#Retrieve the shellCommand', (done) => {
			var scOk = false;
			var sc = execute('ls', undefined, undefined, (error, { shellCommand, success }) => {
				if (error) {
					done(error);
				} else {
					if (success === true) {
						if (shellCommand instanceof ShellCommand) {
							if (scOk === true) {
								done();
							} else {
								done(new Error('The sc variable should be an instanceof "ShellCommand" but it isn\'t'));
							}
						} else {
							done(new Error('The shellCommand variable should be an instanceof "ShellCommand" but it isn\'t'));
						}
					} else {
						done(shellCommand.error);
					}
				}
			});
			scOk = sc instanceof ShellCommand;
		});
		it('#Known command', (done) => {
			execute('ls \'!?!\' ', ['/'], undefined, (error, { shellCommand, success }) => {
				if (error) {
					done(new Error(`Didn't expected an error to happend\nError:\n${error}`));
				} else {
					if (success) {
						done();
					} else {
						done(shellCommand.error);
					}
				}
			});
		});
		it('#Unknown command', (done) => {
			execute('vfduisvbfiudnvfdkxu', [], undefined, (error, result) => {
				if (error) {
					done(new Error(`Didn't expected an error to happend\nError:\n${error}`));
				} else {
					if (result.success) {
						done(new Error('Shouldn\'t succeed'));
					} else {
						done();
					}
				}
			});
		});
		it('#Expected exit status to be 1', (done) => {
			execute('exit \'!?!\'', ['1'], 1, (error, { shellCommand, success }) => {
				if (error) {
					done(new Error(`Didn't expected an error to happend\nError:\n${e}`));
				} else {
					if (success) {
						done();
					} else {
						done(new Error(`The exit status should be equals to ${shellCommand.expectedExitStatus} but it is ${shellCommand.exitStatus}`));
					}
				}
			});
		});
	} else {
		it('#Bad platform', (done) => {
			execute('ls \'!?!\'', ['/'], undefined, (error, result) => {
				if(error){
					if (error.message === 'This module only runs on linux'){
						if(typeof result === undefined){
							done();
						}else{
							done(new Error('The result should be undefined when the error is not null'));
						}
					}else{
						done(new Error(`Didn't expected this error to happend\nError:\n${error}`));
					}
				}else{
					done(new Error('Shouldn\'t work on this platform'));
				}
			});
		});
	}
});
