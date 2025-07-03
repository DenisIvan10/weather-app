// app.js

// 📦 Importuri module existente
import * as ui from './modules/ui-controller.js'
import * as weatherService from './modules/weather-service.js'
import { isValidCity } from './modules/utils.js'

// 🆕 Importuri pentru funcționalități noi
import { logger } from './modules/logger.js'
import { historyService } from './modules/history-service.js'
import {
  renderHistory,
  showHistory,
  addHistoryEventListeners,
} from './modules/ui-controller.js'

// 🚀 Inițializare aplicație
const initializeApp = async () => {
  logger.info('Weather App starting...')

  setupEventListeners()
  loadHistoryOnStart()

  logger.info('Weather App initialized successfully')
}

// 🕒 Încarcă istoricul de la start
const loadHistoryOnStart = () => {
  const history = historyService.getHistory()
  if (history.length > 0) {
    renderHistory(history)
    showHistory()
    logger.info(`Loaded ${history.length} items from history`)
  }
}

// 🔍 Căutare meteo după nume oraș
const handleSearch = async () => {
  const city = ui.getCityInput().trim()
  logger.debug('Search initiated', { city })

  if (!isValidCity(city)) {
    const errorMsg = 'Numele orașului nu este valid'
    ui.showError(errorMsg)
    logger.warn('Invalid city input', { city })
    return
  }

  try {
    ui.showLoading()
    logger.info('Fetching weather data', { city })

    const weatherData = await weatherService.getCurrentWeather(city)

    // 🆕 Salvează în istoric
    historyService.addLocation(weatherData)

    // Actualizează UI
    ui.displayWeather(weatherData)
    ui.clearInput()

    // 🆕 Reîncarcă istoricul
    const updatedHistory = historyService.getHistory()
    renderHistory(updatedHistory)
    showHistory()

    logger.info('Weather data displayed successfully', {
      city: weatherData.name,
      temp: weatherData.main.temp,
    })
  } catch (error) {
    ui.showError('Nu am putut obține vremea. Încearcă din nou.')
    logger.error('Failed to fetch weather data', error)
  } finally {
    ui.hideLoading()
  }
}

// 🕹️ Căutare din element de istoric
const handleHistoryClick = async (event) => {
  const historyItem = event.target.closest('.history-item')
  if (!historyItem) return

  const city = historyItem.dataset.city
  const lat = parseFloat(historyItem.dataset.lat)
  const lon = parseFloat(historyItem.dataset.lon)

  logger.info('History item clicked', { city, lat, lon })

  try {
    ui.showLoading()

    const weatherData = await weatherService.getWeatherByCoords(lat, lon)

    // 🆕 Mută la început în istoric
    historyService.addLocation(weatherData)

    ui.displayWeather(weatherData)

    // 🆕 Reîncarcă istoricul
    const updatedHistory = historyService.getHistory()
    renderHistory(updatedHistory)

    logger.info('Weather loaded from history', { city })
  } catch (error) {
    ui.showError('Nu am putut obține vremea din istoric.')
    logger.error('Failed to load weather from history', error)
  } finally {
    ui.hideLoading()
  }
}

// 🧹 Șterge tot istoricul
const handleClearHistory = () => {
  if (confirm('Sigur vrei să ștergi tot istoricul de căutări?')) {
    historyService.clearHistory()
    renderHistory([])
    logger.info('Search history cleared')
  }
}

// 🎧 Setează toate evenimentele
const setupEventListeners = () => {
  ui.elements.searchBtn.addEventListener('click', handleSearch)

  ui.elements.cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch()
  })

  // 🆕 Istoric
  addHistoryEventListeners(handleHistoryClick, handleClearHistory)

  // Alte event listeners pentru select unit/lang dacă ai...
}

// 🚀 Pornește aplicația
initializeApp()
