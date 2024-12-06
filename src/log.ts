import { logTable } from "./log_tables";

// Color definitions
const infoColor: string = "#10d3ff";
const successColor: string = "#23ff23";
const warningColor: string = "#ffff23";
const errorColor: string = "#ff2323";

// Default colors for each log level
const defaultColors: Record<LogLevel, string> = {
  info: infoColor,
  success: successColor,
  warning: warningColor,
  error: errorColor,
};

// Available log levels for extendability
export type LogLevel = "info" | "success" | "warning" | "error";

// Utility function to format messages with color and style
function logMessage(message: string, color: string, fontWeight: string = "") {
  console.log(`%c${message}`, `color: ${color}; ${fontWeight}`);
}

// Extend the global Console type to add custom methods
declare global {
  interface Console {
    success(message: string): void;
    warning(message: string): void;
    info(message: string): void;
    error(message: string): void;
  }
}

// Custom console class
class CustomConsole {
  private colors: Record<LogLevel, string>;

  constructor(customColors?: Partial<Record<LogLevel, string>>) {
    this.colors = { ...defaultColors, ...customColors };
  }

  success(message: string) {
    logMessage(message, this.colors.success);
  }

  warning(message: string) {
    logMessage(message, this.colors.warning);
  }

  info(message: string) {
    logMessage(message, this.colors.info);
  }

  error(message: string) {
    logMessage(message, this.colors.error, "font-weight: bold");
  }

  logTable(data: any[]) {
    logTable(data); 
  }

  log(level: LogLevel, message: string) {
    this[level](message);
  }
}

// Export the custom console object
const customConsoleInstance = new CustomConsole();

// Override global `console` methods
if (typeof window !== "undefined") {
  const originalConsole = globalThis.console;
  globalThis.console = {
    ...originalConsole,
    success: customConsoleInstance.success.bind(customConsoleInstance),
    warning: customConsoleInstance.warning.bind(customConsoleInstance),
    info: customConsoleInstance.info.bind(customConsoleInstance),
    error: customConsoleInstance.error.bind(customConsoleInstance),
    table: customConsoleInstance.logTable.bind(customConsoleInstance), 
  };
}

// Export the customized global console for use
export const console = globalThis.console;
