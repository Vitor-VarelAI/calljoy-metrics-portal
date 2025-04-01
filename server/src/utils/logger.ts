
import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(__dirname, '../logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

export const logToFile = (message: string, level: 'info' | 'error' = 'info') => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, logEntry);
};

export const logError = (error: Error | string) => {
  const message = error instanceof Error ? `${error.message}\n${error.stack}` : error;
  logToFile(message, 'error');
};
