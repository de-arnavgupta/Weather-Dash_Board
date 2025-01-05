const API_KEY = '41a326ae98f42d0344fcd2bcf00b86c6';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temp');
const description = document.getElementById('description');
const cityName = document.getElementById('city');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecast-container');

searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                getWeatherDataByCoords(latitude, longitude);
            },
            error => {
                alert('Unable to get your location. Please search for a city instead.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser');
    }
});

async function getWeatherData(city) {
    try {
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!weatherResponse.ok) throw new Error('City not found');
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        updateUI(weatherData, forecastData);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function getWeatherDataByCoords(lat, lon) {
    try {
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        updateUI(weatherData, forecastData);
    } catch (error) {
        alert('Error fetching weather data');
    }
}

function updateUI(weatherData, forecastData) {
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    temperature.textContent = Math.round(weatherData.main.temp);
    description.textContent = weatherData.weather[0].description;
    cityName.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    feelsLike.textContent = `${Math.round(weatherData.main.feels_like)}°C`;
    humidity.textContent = `${weatherData.main.humidity}%`;
    windSpeed.textContent = `${(weatherData.wind.speed * 3.6).toFixed(1)} km/h`;
    pressure.textContent = `${weatherData.main.pressure} hPa`;

    updateForecast(forecastData);
}

function updateForecast(forecastData) {
    forecastContainer.innerHTML = '';

    const dailyForecasts = forecastData.list.filter(forecast =>
        forecast.dt_txt.includes('12:00:00')
    ).slice(0, 5);

    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="date">${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Weather icon">
            <div class="temp-max">${Math.round(forecast.main.temp_max)}°C</div>
            <div class="temp-min">${Math.round(forecast.main.temp_min)}°C</div>
            <div class="forecast-description">${forecast.weather[0].description}</div>
        `;
        forecastContainer.appendChild(card);
    });
}

window.addEventListener('load', () => {
    getWeatherData('Bangalore');
});