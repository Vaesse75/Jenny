import { ShellCommand } from "./ShellCommand";
/**
 * @throws
 */
export declare function shellCommand(command: string, args?: string[], expectedExitStatus?: number): ShellCommand;
export declare function execute(command: string, args?: string[], expectedExitStatus?: number): Promise<{
    shellCommand: ShellCommand;
    success: boolean;
}>;
export declare function execute(command: string, args: string[], expectedExitStatus: number | undefined, callback: (error: Error | null, result: {
    shellCommand: ShellCommand;
    success: boolean;
}) => void): ShellCommand;
