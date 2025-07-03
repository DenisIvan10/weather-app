// modules/history-service.js

import { CONFIG } from './config.js';
import { logger } from './logger.js';

export class HistoryService {
  constructor() {
    this.storageKey = CONFIG.STORAGE_KEYS.SEARCH_HISTORY;
    this.maxItems = CONFIG.MAX_HISTORY_ITEMS;
  }

  addLocation(weatherData) {
    try {
      const city = weatherData.name;
      const country = weatherData.sys?.country || '';
      const lat = weatherData.coord?.lat;
      const lon = weatherData.coord?.lon;

      if (!city || lat === undefined || lon === undefined) {
        logger.warn('addLocation: Date insuficiente pentru istoric');
        return;
      }

      const history = this._loadFromStorage();

      // Verifică dacă locația există deja
      const existingIndex = history.findIndex(
        (item) => item.city.toLowerCase() === city.toLowerCase()
      );

      const timestamp = Date.now();
      const newEntry = {
        city,
        country,
        timestamp,
        coordinates: { lat, lon }
      };

      if (existingIndex !== -1) {
        const [existing] = history.splice(existingIndex, 1);
        history.unshift({ ...existing, timestamp }); // actualizează timestamp
        logger.info(`Istoric: Mutat în top - ${city}`);
      } else {
        history.unshift(newEntry);
        logger.info(`Istoric: Adăugat - ${city}`);
      }

      // Limitează la maxim
      if (history.length > this.maxItems) {
        history.splice(this.maxItems);
      }

      this._saveToStorage(history);
    } catch (err) {
      logger.error('addLocation failed', err);
    }
  }

  getHistory() {
    return this._loadFromStorage();
  }

  removeLocation(city) {
    const history = this._loadFromStorage();
    const filtered = history.filter(
      (item) => item.city.toLowerCase() !== city.toLowerCase()
    );

    this._saveToStorage(filtered);
    logger.info(`Istoric: Ștersă locația "${city}"`);
  }

  clearHistory() {
    this._saveToStorage([]);
    logger.info('Istoric: Golit complet');
  }

  _saveToStorage(history) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch (err) {
      logger.error('Eroare la salvarea în localStorage', err);
    }
  }

  _loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      logger.error('Eroare la încărcarea din localStorage', err);
      return [];
    }
  }
}

export const historyService = new HistoryService();
