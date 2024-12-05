const infoColor: string = "#10d3ff";
const successColor: string = "#23ff23";
const warningColor: string = "#ffff23";
const errorColor: string = "#ff2323";

function logMessage(message: string, color: string, fontWeight: string = "") {
    console.log(`%c ${message}`, `color: ${color}; ${fontWeight}`);
}

export const customConsole = {
    success(message: string) {
        logMessage(message, successColor);
    },

    warning(message: string) {
        logMessage(message, warningColor);
    },

    info(message: string) {
        logMessage(message, infoColor);
    },

    error(message: string) {
        logMessage(message, errorColor, "font-weight: bold");
    }
};
