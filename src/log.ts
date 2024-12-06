const infoColor: string = "#10d3ff";
const successColor: string = "#23ff23";
const warningColor: string = "#ffff23";
const errorColor: string = "#ff2323";

//  log function to apply styling
function logMessage(message: string, color: string, fontWeight: string = "") {
    console.log(`%c ${message}`, `color: ${color}; ${fontWeight}`);
}

// Create a custom console object
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
    },
};

// Override the global console object
globalThis.console = {
    ...console,  // Preserve original console methods
    ...customConsole,  // Add our custom methods
};
