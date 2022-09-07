import { spawn } from 'child_process';
import { Logger } from 'tslog';

const log: Logger = new Logger();
class AdbHelper {

    static ADB_COMMAND = 'adb';
    static SHELL_COMMAND = 'shell';

    static executeADBCommand(args: string[]) {
        AdbHelper.executeShellCommand(AdbHelper.ADB_COMMAND, args);
    }
    static executeADBShellCommand(args: string[]) {
        args.unshift(AdbHelper.SHELL_COMMAND);
        AdbHelper.executeADBCommand(args);
    }

    static executeShellCommand(command: string, args: string[]) {
        const cmd = spawn(command, args);
        cmd.stdout.on('data', data => {
            return data;
        });

        cmd.stderr.on('data', data => {
            throw new Error(`stderr executing shell command ${command}: ${data}`);
        });

        cmd.on('close', code => {
            // tslint:disable-next-line: triple-equals
            if (code !== 0) {
                throw new Error(`Command: ${command} exited with non-zero status code`);
            }
        });
    }
}

export default AdbHelper;

