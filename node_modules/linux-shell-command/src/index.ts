import { ShellCommand } from "./ShellCommand";

/**
 * @throws
 */
export function shellCommand(command: string, args: string[] = [], expectedExitStatus: number = 0) : ShellCommand {
	try {
		var sc = new ShellCommand(command, args, expectedExitStatus);
		return sc;
	} catch (e) {
		throw e;
	}
}

export function execute(command: string, args?: string[], expectedExitStatus?: number): Promise<{ shellCommand: ShellCommand, success: boolean }>;
export function execute(command: string, args: string[], expectedExitStatus: number|undefined, callback: (error:Error|null, result: {shellCommand: ShellCommand, success: boolean}) => void): ShellCommand;
export function execute(command: string, args: string[] = [], expectedExitStatus: number = 0, callback?: (error: Error | null, result: { shellCommand: ShellCommand, success: boolean }) => void): Promise<{ shellCommand: ShellCommand, success: boolean }> | ShellCommand {
	if (typeof callback === 'undefined') {
		return new Promise((resolve, reject) => {
			try{
				let sc = shellCommand(command, args, expectedExitStatus)
				sc.execute().then((success)=> {
					resolve({shellCommand: sc, success: success});
				}).catch((e)=>{
					reject(e);
				})
			}catch(e){
				reject(e);
			}
		});
	} else {
		try {
			let sc = shellCommand(command, args, expectedExitStatus)
			sc.execute((error, result) => {
				if(error){
					callback(error, {shellCommand: sc, success: result});
				}else{
					callback(error, {shellCommand: sc, success: result});
				}
			});
			return sc;
		} catch (e) {
			//@ts-ignore
			callback(e, undefined);
			//@ts-ignore
			return;
		}
	}
}
