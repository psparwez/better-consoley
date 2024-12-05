const infoColor: string = "#10d3ff";
const successColor: string = "#23ff23";
const warningColor: string = "#ffff23";
const errorColor: string = "#ff2323";

export class Log {
    static success(message: string) {
        console.log(`%c ${message}`,`color: ${successColor}`);

    }

    static warning(message: string) {
        console.log(`%c ${message}`,`color: ${warningColor}`);

    }
    
    static info(message: string) {
        console.log(`%c ${message}`,`color: ${infoColor}`);

    }
    
    static error(message: string) {
        console.log(`%c ${message}`,`color: ${errorColor}; font-weight: bold`);

    }
    
}