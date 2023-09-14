const LogColor = {
    Reset: '[0m', FgRed: '[31m', FgGreen: '[32m', FgBlue: '[34m',
}

function logWithColor(color, message) {
    console.log(color, message, LogColor.Reset);
}

function success(message) {
    logWithColor(LogColor.FgGreen, message);
}

function error(message) {
    logWithColor(LogColor.FgRed, message);
}

function msg(message) {
    logWithColor(LogColor.FgBlue, message);
}

export {success, msg, error}