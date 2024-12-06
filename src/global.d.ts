declare global {
    interface Console {
        success(message: string): void;
        warning(message: string): void;
        info(message: string): void;
        error(message: string): void;
    }
}

// Ensure this file is treated as a module.
export {};
