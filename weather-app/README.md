# 🌤️ Weather App - Aplicație Meteo Modulară în JavaScript

> O aplicație meteo modernă, construită cu JavaScript modular (ES6+), care oferă o experiență rapidă și intuitivă pentru afișarea vremii în timp real folosind OpenWeatherMap API.

[🌐 Live Demo](https://your-username.github.io/weather-app) | [📦 Cod Sursă](https://github.com/DenisIvan10/weather-app)

---

## 🎯 Despre Proiect

Weather App este o aplicație web simplă, dar scalabilă, care afișează vremea curentă într-un oraș ales de utilizator. Aplicația este construită în mod modular, cu un design responsive și elegant. A fost concepută inițial cu date simulate (mock) pentru dezvoltare rapidă, dar este pregătită pentru integrare completă cu API-ul real de la OpenWeatherMap.

---

## 🚀 Funcționalități

### ✅ Finalizate

- 🔍 Căutare meteo după numele orașului
- 🌡️ Afișare temperatură, umiditate, presiune, vânt, vizibilitate, răsărit și apus
- 🌀 Indicator de încărcare
- ⚠️ Gestionare erori (ex: oraș inexistent)
- 💡 Arhitectură modulară (separate concerns)
- 📱 Design responsive pentru mobil și desktop

### 🔄 În lucru / Planificate

- 📍 Căutare meteo după coordonate geografice
- 🌐 Integrare reală cu OpenWeatherMap API
- 📌 Localizare automată a utilizatorului (Geolocation + IP fallback)
- 💾 Salvarea preferințelor și ultimei căutări în localStorage
- 🔄 Istoric de căutări cu opțiune de reluare rapidă
- 🚀 Hosting pe GitHub Pages / Vercel
- 🔧 Testare completă și validare

---

## 🛠️ Tehnologii Folosite

### Frontend

- **HTML5** – structură semantică și accesibilă
- **CSS3** – responsive design, animații, stilizare curată
- **JavaScript ES6+** – async/await, module, arrow functions

### APIs & Tools

- **OpenWeatherMap API** *(pentru integrare meteo reală)*
- **Geolocation API + IP API** *(pentru detecția locației)*
- **LocalStorage** – persistarea preferințelor
- **VS Code + Live Server** – pentru dezvoltare locală
- **GitHub Pages** – pentru deployment static

---

## 🧪 Testare

Testarea este realizată manual și acoperă scenarii precum:

- ✅ Happy path (căutare cu succes, click pe istoric)
- ❌ Edge cases: rețea lentă, fără conexiune, API rate limit
- 🔁 Error recovery: fallback la cache, retry după eșec
- 📱 Compatibilitate pe dispozitive mobile și browsere moderne

---

## 🗺️ Arhitectura Aplicației

