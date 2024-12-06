import Table from 'cli-table3';  // Correct default import
import chalk from 'chalk';

// LogTableData Interface for TypeScript typing
export interface LogTableData {
  [key: string]: any;
}

// Check if we're running in Node.js
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

// Default color settings for headers
const defaultHeaderColor = chalk.cyan;

// Log a table with custom-colored headers
export function logTable(data: LogTableData[]): void {
  if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
    console.error(chalk.red('Invalid data format. Please provide an array of objects.'));
    return;
  }

  // If it's running in Node.js, use cli-table3, else use default console.table for browser
  if (isNode) {
    renderNodeTable(data);
  } else {
    renderBrowserTable(data);
  }
}

// Function to render the table in Node.js using cli-table3
function renderNodeTable(data: LogTableData[]): void {
  const headers = Object.keys(data[0]);
  headers.unshift('(index)'); // Add an index column to the table

  // Calculate column widths based on content
  const colWidths = headers.map((_, i) => calculateColWidth(data, i));

  // Create the table with headers and column widths
  const table = new Table({
    head: headers.map(header => defaultHeaderColor(header)),  // Apply color to headers
    colWidths: colWidths,
  });

  // Add data rows to the table
  data.forEach((row, rowIndex) => {
    const rowValues = headers.slice(1).map(key => (key in row ? stringifyCell(row[key]) : ''));
    table.push([rowIndex.toString(), ...rowValues]);
  });

  console.log(table.toString());
}

// Function to render the table in the browser using console.table
function renderBrowserTable(data: LogTableData[]): void {
  const formattedData = data.map((row, index) => {
    return { "(index)": index, ...row };
  });

  console.table(formattedData);
}

// Calculate the column width for a given column index
function calculateColWidth(data: LogTableData[], columnIndex: number): number {
  const MAX_COL_WIDTH = 28;
  const MIN_COL_WIDTH = 3;

  const columnValues = data.map((row, rowIndex) => {
    if (columnIndex === 0) return rowIndex.toString(); // Index column
    const key = Object.keys(data[0])[columnIndex - 1];
    return key in row ? stringifyCell(row[key]) : '';
  });

  // Calculate the max width of all values in the column, ensuring a min/max range
  const maxWidth = Math.max(...columnValues.map(val => val.length), MIN_COL_WIDTH);

  return Math.min(maxWidth, MAX_COL_WIDTH) + 2; // Add some padding for readability
}

// Utility to convert a value into a string (including handling objects)
function stringifyCell(value: any): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value); // Handle object/array serialization
  return value.toString();
}
