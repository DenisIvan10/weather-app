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
  langSelect: document.querySelector('#lang-select'),
  historySection: document.querySelector('#history-section'),
  historyList: document.querySelector('#history-list'),
  clearHistoryBtn: document.querySelector('#clear-history-btn')
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

export const showHistory = () => {
  elements.historySection.classList.remove('hidden');
};

export const hideHistory = () => {
  elements.historySection.classList.add('hidden');
};

export const renderHistory = (historyItems) => {
  if (historyItems.length === 0) {
    elements.historyList.innerHTML =
      '<p class="no-history">Nu ai căutări recente</p>';
    return;
  }

  const historyHTML = historyItems
    .map((item) => {
      const timeAgo = getTimeAgo(item.timestamp);
      return `
      <div class="history-item" data-city="${item.city}" data-lat="${item.coordinates.lat}" data-lon="${item.coordinates.lon}">
        <div class="history-location">
          <span class="city">${item.city}</span>
          <span class="country">${item.country}</span>
        </div>
        <div class="history-time">${timeAgo}</div>
      </div>
    `;
    })
    .join('');

  elements.historyList.innerHTML = historyHTML;
};

const getTimeAgo = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes} minute în urmă`;
  if (hours < 24) return `${hours} ore în urmă`;
  return `${days} zile în urmă`;
};

export const addHistoryEventListeners = (onHistoryClick, onClearHistory) => {
  elements.historyList.addEventListener('click', (e) => {
    const item = e.target.closest('.history-item');
    if (!item) return;
    const city = item.dataset.city;
    const lat = item.dataset.lat;
    const lon = item.dataset.lon;
    onHistoryClick({ city, lat, lon });
  });

  elements.clearHistoryBtn.addEventListener('click', onClearHistory);
};

const createDebouncedSearch = (delay = 300) => {
  let timeout;
  return (searchFn) => {
    clearTimeout(timeout);
    timeout = setTimeout(searchFn, delay);
  };
};

export const debouncedSearch = createDebouncedSearch();
