export const elements = {
  cityInput: document.querySelector('#city-input'),
  searchBtn: document.querySelector('#search-btn'),
  loading: document.querySelector('#loading'),
  error: document.querySelector('#error'),
  weatherDisplay: document.querySelector('#weather-display'),
  cityName: document.querySelector('#city-name'),
  temperature: document.querySelector('#temperature'),
  weatherDescription: document.querySelector('#weather-description'),
  weatherIcon: document.querySelector('#weather-icon'),
  humidity: document.querySelector('#humidity'),
  pressure: document.querySelector('#pressure'),
  wind: document.querySelector('#wind'),
  visibility: document.querySelector('#visibility'),
  sunrise: document.querySelector('#sunrise'),
  sunset: document.querySelector('#sunset'),
  unitSelect: document.querySelector('#unit-select'),
  langSelect: document.querySelector('#lang-select')
};

export const showLoading = () => {
  elements.loading.classList.remove('hidden');
  elements.error.classList.add('hidden');
  elements.weatherDisplay.classList.add('hidden');
};

export const hideLoading = () => {
  elements.loading.classList.add('hidden');
};

export const showError = (message) => {
  elements.error.textContent = message;
  elements.error.classList.remove('hidden');
  elements.weatherDisplay.classList.add('hidden');
};

export const displayWeather = (data, unit) => {
  const symbol = unit === 'imperial' ? '°F' : '°C';
  elements.cityName.textContent = data.name;
  elements.temperature.textContent = `${Math.round(data.main.temp)}${symbol}`;
  elements.weatherDescription.textContent = data.weather[0].description;
  elements.weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />`;
  elements.humidity.textContent = `${data.main.humidity}%`;
  elements.pressure.textContent = `${data.main.pressure} hPa`;
  elements.wind.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
  elements.visibility.textContent = `${data.visibility / 1000} km`;
  elements.sunrise.textContent = formatTime(data.sys.sunrise);
  elements.sunset.textContent = formatTime(data.sys.sunset);

  elements.weatherDisplay.classList.remove('hidden');
  elements.error.classList.add('hidden');
};

export const getCityInput = () => elements.cityInput.value.trim();
export const clearInput = () => { elements.cityInput.value = ''; };

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('ro-RO', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const saveUserPreferences = (unit, lang) => {
  localStorage.setItem('preferredUnit', unit);
  localStorage.setItem('preferredLang', lang);
};

export const loadUserPreferences = () => ({
  unit: localStorage.getItem('preferredUnit') || 'metric',
  lang: localStorage.getItem('preferredLang') || 'ro'
});
