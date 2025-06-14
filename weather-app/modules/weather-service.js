import { MOCK_DATA } from './config.js';

export const getCurrentWeather = async (city) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!city || city.length < 2) {
    throw new Error('Nume de oraș invalid');
  }
  return {
    ...MOCK_DATA,
    name: city
  };
};

export const getWeatherByCoords = async (lat, lon) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    ...MOCK_DATA,
    name: `Lat: ${lat}, Lon: ${lon}`
  };
};
