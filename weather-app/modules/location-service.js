export const getCoords = () => new Promise((resolve, reject) => {
  // 🌐 Fallback: bazat pe IP, când GPS eșuează
  const fallbackToIp = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      resolve({
        latitude: data.latitude,
        longitude: data.longitude,
        source: 'ip',
        accuracy: 'city',
      });
    } catch (error) {
      reject(new Error('Nu am putut determina locația.'));
    }
  };

  // 📍 Verifică dacă browserul suportă Geolocation API
  if (!navigator.geolocation) {
    return fallbackToIp();
  }

  // 🎯 Încearcă localizarea precisă (GPS)
  navigator.geolocation.getCurrentPosition(
    (position) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        source: 'gps',
        accuracy: 'precise',
      });
    },
    (error) => {
      console.warn('Geolocation failed:', error.message);

      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.warn('Permisiune refuzată.');
          break;
        case error.POSITION_UNAVAILABLE:
          console.warn('Locația nu este disponibilă.');
          break;
        case error.TIMEOUT:
          console.warn('Timpul de așteptare a expirat.');
          break;
        default:
          console.warn('Eroare necunoscută.');
      }

      fallbackToIp();
    },
    {
      timeout: 5000, // 5 secunde
      enableHighAccuracy: true,
      maximumAge: 0,
    }
  );
});
