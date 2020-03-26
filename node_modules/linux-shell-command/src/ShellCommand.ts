import { platform } from "os";
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { EventEmitter } from 'events';

export interface ShellCommandEvents extends EventEmitter {
	on(event: 'pid', listener: (pid: number) => void): this;
	on(event: 'stdout', listener: (stdout: string) => void): this;
	on(event: 'stderr', listener: (stderr: string) => void): this;
	on(event: 'error', listener: (error: Error) => void): this;
	on(event: 'exit', listener: (exitStatus: number) => void): this;
}

export class ShellCommand {
	public command: string;
	public args: string[];
	public processedCommand: string;
	public spawn: ChildProcessWithoutNullStreams | null;
	public pid: number
	public error: Error | null;
	public stdout: string;
	public stderr: string;
	public working: boolean;
	public executed: boolean;
	public expectedExitStatus: number;
	public exitStatus: number;
	public exitSignal: string | null;
	public events: ShellCommandEvents;

	/**
	 * @throws
	 */
	constructor(command: string, args: string[], expectedExitStatus: number = 0) {
		if (platform() !== 'linux') {
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
		this.events = new EventEmitter();
		try{
			this.processCommand();
		}catch(e){
			throw e;
		}
	}

	/**
	 * @throws
	 */
	private processCommand(): void {
		var regex = /'\!\?\!'/;
		var matchRegex = /'\!\?\!'/g;
		var nbMatch = (this.command.match(matchRegex) || []).length;
		var nbArgs = this.args.length;
		if (nbMatch === nbArgs) {
			var buf = this.command;
			for (let i = 0; i < nbMatch; i++) {
				buf = buf.replace(regex, `'${this.args[i]}'`);
			}
			this.processedCommand = buf;
		} else {
			this.error = new Error(`${nbMatch} arguments expected but ${nbArgs} given.`);
			throw this.error;
		}
	}

	public execute(): Promise<boolean>;
	public execute(callback: (error: Error|null, result: boolean) => void): void;
	public execute(callback?: (error: Error|null, result: boolean) => void): Promise<boolean> | void {
		var result: Promise<boolean> = new Promise((resolve, reject) => {
			if (this.processedCommand !== "") {
				this.spawn = spawn(this.processedCommand, { shell: true });
				if (this.spawn.pid !== undefined) {
					this.working = true;
					this.pid = this.spawn.pid;
					this.events.emit('pid', this.spawn.pid);
				}

				//DATA//
				this.spawn.stdout.on('data', (data) => {
					let stdout = data.toString();
					this.stdout += stdout;
					this.events.emit('stdout', stdout);
				});
				this.spawn.stderr.on('data', (data) => {
					let stderr = data.toString();
					this.stderr += stderr;
					this.events.emit('stderr', stderr);
				});

				//END//
				this.spawn.on('error', (error) => {
					this.working = false;
					this.executed = true;
					this.error = error;
					this.events.emit('error', error);
					resolve(false);
				});
				this.spawn.on('exit', (code, signal) => {
					this.working = false;
					this.executed = true;
					this.exitStatus = code === null ? 0 : code;
					this.exitSignal = signal;
					this.stdout = this.stdout.trim();
					this.stderr = this.stderr.trim();
					if (!this.exitStatusOk()) {
						this.error = Error(this.stderr);
					}
					this.events.emit('exit', code, signal);
					resolve(this.ok());
				});
			} else {
				this.error = Error("No command provided")
				this.events.emit('error', this.error);
				reject(this.error);
			}
		});

		if (typeof callback === "undefined") {
			return result;
		} else {
			result.then((r) => {
				callback(null, r);
			}).catch((e) => {
				//@ts-ignore
				callback(e, undefined);
			});
		}
	}

	public ok(): boolean {
		return this.spawn !== null && !this.working && this.executed && this.error === null && this.exitStatusOk();
	}

	public exitStatusOk(): boolean {
		return this.exitStatus === this.expectedExitStatus;
	}

	/**
	 * @throws
	 */
	public kill(signal?: string): boolean {
		if (this.spawn !== null) {
			if (!this.spawn.killed) {
				this.spawn.kill(signal);
				return this.spawn.killed;
			} else {
				throw new Error('already killed');
			}
		} else {
			throw new Error('cannot kill: command isn\'t executed yet');
		}
	}
}
