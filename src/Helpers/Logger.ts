import rl from 'readline'
enum LogColor {
    Reset = '[0m',
    FgRed = '[31m',
    FgGreen = '[32m',
    FgBlue = '[34m',
}

function logWithColor(color: LogColor, message: any) {
    console.log(color, message, LogColor.Reset);
}

export function success(message: any) {
    logWithColor(LogColor.FgGreen, message);
}

export function error(message: any) {
    logWithColor(LogColor.FgRed, message);
}

export function msg(message: any) {
    logWithColor(LogColor.FgBlue, message);
}

export function getInputFromTerminal(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        const readline = rl.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question(prompt, (input: string) => {
            readline.close();
            resolve(input);
        });
    });
}
