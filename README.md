# Better consoley
<br />


![Screenshot](https://github.com/user-attachments/assets/b5833f57-70eb-40bb-836e-118bd356b61f)



## A better console for Node project.
**`Better Consoley`** is a drop-in replacement for Node.js' default console, offering enhanced logging with colorful output. It works seamlessly with existing code and is safe to use as it delegates calls to native console methods for compatibility


## Installation

Install via **NPM**:
```shell
$ npm install better-consoley
```

## Methods

### 🟢 `success(message: string)`
Logs a success message with a green color.

### 🟠 `warning(message: string)`
Logs a warning message with an orange color.

### 🔵 `info(message: string)`
Logs an informational message with a blue color.

### 🔴 `error(message: string)`
Logs an error message with a red color.

These methods work exactly same as native console methods but with colors.

<br />

# How to use it
You can override `console` object itself or assign better console to another variable like {Log}. It's completely safe to override the native console object because better consoley calls native console methods for methods that are already available in it.


```javascript

import { console } from "better-consoley";

console.success("Operation completed successfully!"); 
console.warning("This is a warning message.");       
console.info("This is an info message.");            
console.error("An error occurred!");                

```


## Why Better Consoley?

- Ease of Use: Seamlessly integrates into your existing project.
- Enhanced Debugging: Visual distinctions between log levels.
- Safe and Compatible: Uses native console methods where applicable.
- Customizable: console log output to match your needs.



<br />
<br />
<br />

· [Issues](https://github.com/psparwez/better-consoley/issues)

