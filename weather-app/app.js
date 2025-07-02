import {
  elements,
  showLoading,
  hideLoading,
  showError,
  showMessage,
  displayWeather,
  getCityInput,
  clearInput,
  saveUserPreferences,
  loadUserPreferences,
} from './modules/ui-controller.js';

import {
  getCurrentWeather,
  getWeatherByCoords,
  getCurrentWeatherWithFallback,
} from './modules/weather-service.js';

import { getCoords } from './modules/location-service.js';

let currentUnit = 'metric';
let currentLang = 'ro';
let lastSearch = null; // poate fi un city sau { lat, lon }

const init = () => {
  // 1. Încarcă preferințele
  const prefs = loadUserPreferences();
  currentUnit = prefs.unit;
  currentLang = prefs.lang;
  elements.unitSelect.value = currentUnit;
  elements.langSelect.value = currentLang;

  // 2. Setează listeneri
  setupEventListeners();

  // 3. Detectează locația
  handleLocationSearch();
};

const setupEventListeners = () => {
  elements.searchBtn.addEventListener('click', handleSearch);
  elements.cityInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  elements.unitSelect.addEventListener('change', async (e) => {
    currentUnit = e.target.value;
    const { lang } = loadUserPreferences();
    saveUserPreferences(currentUnit, lang);

    if (lastSearch) {
      await reloadWeather();
    }
  });

  elements.langSelect.addEventListener('change', async (e) => {
    currentLang = e.target.value;
    const { unit } = loadUserPreferences();
    saveUserPreferences(unit, currentLang);

    if (lastSearch) {
      await reloadWeather();
    }
  });
};

const handleSearch = async () => {
  const city = getCityInput();
  if (!isValidCity(city)) {
    showError(elements, 'Introduceți un nume de oraș valid');
    return;
  }

  clearInput();
  showLoading(elements, 'Caut vremea...');

  try {
    const weather = await getCurrentWeather(city, currentUnit, currentLang);
    displayWeather(elements, weather, currentUnit);
    lastSearch = city;
  } catch (error) {
    showError(elements, error.message || 'Eroare necunoscută');
  }
};

const handleLocationSearch = async () => {
  try {
    showLoading(elements, 'Detectez locația...');

    const coords = await getCoords(); // { latitude, longitude, source }

    if (coords.source === 'ip') {
      showMessage(elements, 'Locație aproximativă bazată pe IP', 'warning');
    }

    showLoading(elements, 'Încarc vremea...');
    const weather = await getWeatherByCoords(
      coords.latitude,
      coords.longitude,
      currentUnit,
      currentLang
    );

    displayWeather(elements, weather, currentUnit);
    lastSearch = { lat: coords.latitude, lon: coords.longitude };
  } catch (error) {
    showError(elements, `Locația nu a putut fi determinată: ${error.message}`);
  }
};

const reloadWeather = async () => {
  showLoading(elements, 'Reîncarc vremea...');
  try {
    let weather;

    if (typeof lastSearch === 'string') {
      weather = await getCurrentWeather(lastSearch, currentUnit, currentLang);
    } else if (lastSearch?.lat && lastSearch?.lon) {
      weather = await getWeatherByCoords(
        lastSearch.lat,
        lastSearch.lon,
        currentUnit,
        currentLang
      );
    } else {
      throw new Error('Nu există căutare anterioară');
    }

    displayWeather(elements, weather, currentUnit);
  } catch (error) {
    showError(elements, 'Nu am putut reîncărca vremea: ' + error.message);
  }
};

const isValidCity = (city) => {
  return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city);
};

init();
