// modules/config.js

export const CONFIG = {
  API_KEY: 'your_api_key_here', // Înlocuiește cu cheia reală
  API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  DEFAULT_UNITS: 'metric', // 'metric' sau 'imperial'
  DEFAULT_LANG: 'ro', // 'ro', 'en', 'fr', etc.
  DEFAULT_CITY: 'București',

  // ✅ Nou: Istoric și preferințe
  MAX_HISTORY_ITEMS: 10,
  STORAGE_KEYS: {
    SEARCH_HISTORY: 'weather_search_history',
    USER_PREFERENCES: 'weather_user_prefs',
  },

  // ✅ Nou: Logging controlat
  LOGGING: {
    ENABLED: true,
    LEVEL: 'info', // 'debug', 'info', 'warn', 'error'
    MAX_LOGS: 100,
  }
};

export const API_ENDPOINTS = {
  CURRENT_WEATHER: '/weather',
  FORECAST: '/forecast',
  ONE_CALL: '/onecall',
};

export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: 'Orașul nu a fost găsit. Te rugăm să încerci din nou.',
  NETWORK_ERROR: 'Eroare de rețea. Verifică conexiunea la internet.',
  EMPTY_INPUT: 'Introdu un nume de oraș valid.',
  UNKNOWN_ERROR: 'A apărut o eroare necunoscută. Încearcă din nou.',
};
