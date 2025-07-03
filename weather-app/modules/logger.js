// modules/logger.js

import { CONFIG } from './config.js';

const levels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class Logger {
  constructor() {
    this.logs = [];
    this.enabled = CONFIG.LOGGING.ENABLED;
    this.maxLogs = CONFIG.LOGGING.MAX_LOGS;
    this.level = CONFIG.LOGGING.LEVEL;

    if (this.enabled) {
      console.info(`[Logger] Activat cu nivel '${this.level}'`);
    }
  }

  debug(message, data = null) {
    this._log('debug', message, data);
  }

  info(message, data = null) {
    this._log('info', message, data);
  }

  warn(message, data = null) {
    this._log('warn', message, data);
  }

  error(message, error = null) {
    const data = error instanceof Error
      ? { message: error.message, stack: error.stack }
      : error;
    this._log('error', message, data);
  }

  _log(level, message, data) {
    if (!this.enabled) return;

    const currentLevel = levels[this.level];
    const messageLevel = levels[level];

    if (messageLevel < currentLevel) return;

    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      data,
    };

    // Limitează numărul de log-uri
    if (this.logs.length >= this.maxLogs) {
      this.logs.shift();
    }

    this.logs.push(logEntry);

    // Logging vizibil în consolă
    switch (level) {
      case 'debug':
        console.debug(`[${timestamp}] [DEBUG] ${message}`, data);
        break;
      case 'info':
        console.info(`[${timestamp}] [INFO] ${message}`, data);
        break;
      case 'warn':
        console.warn(`[${timestamp}] [WARN] ${message}`, data);
        break;
      case 'error':
        console.error(`[${timestamp}] [ERROR] ${message}`, data);
        break;
    }
  }

  getLogs() {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }

  show() {
    console.group('[Stored Logs]');
    this.logs.forEach((log) => {
      console.log(
        `[${log.timestamp}] [${log.level}] ${log.message}`,
        log.data || ''
      );
    });
    console.groupEnd();
  }
}

// Singleton instance
export const logger = new Logger();

// Expunere globală în browser pentru debugging
window.logs = {
  show: () => logger.show(),
  clear: () => logger.clearLogs(),
  get: () => logger.getLogs(),
};
