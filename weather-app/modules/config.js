// modules/config.js

export const CONFIG = {
  API_KEY: 'your_api_key_here', // Înlocuiește cu cheia reală dacă ai una
  API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  DEFAULT_UNITS: 'metric', // sau 'imperial'
  DEFAULT_LANG: 'ro', // 'ro', 'en', 'fr', etc.
  DEFAULT_CITY: 'București', // opțional
};

export const API_ENDPOINTS = {
  CURRENT_WEATHER: '/weather', // exemplu complet: /weather?q=Cluj&appid=...
  FORECAST: '/forecast',
  ONE_CALL: '/onecall', // pt. date meteo combinate
};

export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: 'Orașul nu a fost găsit. Te rugăm să încerci din nou.',
  NETWORK_ERROR: 'Eroare de rețea. Verifică conexiunea la internet.',
  EMPTY_INPUT: 'Introdu un nume de oraș valid.',
  UNKNOWN_ERROR: 'A apărut o eroare necunoscută. Încearcă din nou.',
};
