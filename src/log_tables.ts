import Table from 'cli-table';

// Helper function to convert HEX color to ANSI escape codes
function hexToAnsi(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `\x1b[38;2;${r};${g};${b}m`; // ANSI escape for 24-bit color
}

export interface LogTableData {
  [key: string]: any; 
}

// Check if the environment is Node.js (detect `process` globally)
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

// Log a table with custom-colored headers
export function logTable(data: LogTableData[]): void {
  if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
    console.error('Invalid data format. Please provide an array of objects.');
    return;
  }

  // If it's running in Node.js, use cli-table, else use default console.table for browser
  if (isNode) {
    // Extract headers from the first object
    const headers = Object.keys(data[0]);
    headers.unshift('(index)'); // Add an index column

    // Calculate column widths
    const colWidths = headers.map((_, i) => calculateColWidth(data, i));

    // Create the table instance with headers and column widths
    const table = new Table({
      head: headers.map(header => `${hexToAnsi("#1ac6ff")}${header}\x1b[0m`), 
      colWidths: colWidths
    });

    // Add rows
    data.forEach((row, rowIndex) => {
      const rowValues = headers.slice(1).map(key => (key in row ? stringifyCell(row[key]) : ''));
      table.push([rowIndex.toString(), ...rowValues]);
    });

    console.log(table.toString());

  } else {
    // If it's in the browser, use default console.table
    const formattedData = data.map((row, index) => {
      return { "(index)": index, ...row };
    });

    console.table(formattedData);
  }
}

// Calculate the column width based on the content
function calculateColWidth(data: LogTableData[], columnIndex: number): number {
  const MAX_COL_WIDTH = 28;
  const MIN_COL_WIDTH = 3;

  const columnValues = data.map((row, rowIndex) => {
    if (columnIndex === 0) return rowIndex.toString(); 
    const key = Object.keys(data[0])[columnIndex - 1];
    return key in row ? stringifyCell(row[key]) : '';
  });

  const maxWidth = Math.max(
    ...columnValues.map(val => val.length),
    MIN_COL_WIDTH
  );

  return Math.min(maxWidth, MAX_COL_WIDTH) + 2; 
}

function stringifyCell(value: any): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return value.toString();
}
