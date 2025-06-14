import { getCurrentWeather } from './modules/weather-service.js';
import { elements, showLoading, hideLoading, showError, displayWeather, getCityInput, clearInput } from './modules/ui-controller.js';

const setupEventListeners = () => {
  elements.searchBtn.addEventListener('click', handleSearch);
  elements.cityInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
};

const handleSearch = async () => {
  const city = getCityInput();
  if (!isValidCity(city)) {
    showError('Introduceți un nume de oraș valid');
    return;
  }

  showLoading();
  try {
    const data = await getCurrentWeather(city);
    hideLoading();
    displayWeather(data);
    clearInput();
  } catch (err) {
    hideLoading();
    showError(err.message);
  }
};

const isValidCity = (city) => {
  return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city);
};

setupEventListeners();
