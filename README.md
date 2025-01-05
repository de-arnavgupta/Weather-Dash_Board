# Weather Dashboard

A modern, responsive weather dashboard that provides real-time weather information and 5-day forecasts for any city worldwide. Built using vanilla JavaScript and the OpenWeatherMap API.

## Features

- 🔍 Search weather by city name
- 📍 Get weather for current location
- 🌡️ Real-time weather data including:
  - Temperature
  - "Feels like" temperature
  - Humidity
  - Wind speed
  - Atmospheric pressure
- 📅 5-day weather forecast
- 🌍 Support for global cities
- 🎨 Dynamic weather icons
- 📱 Responsive design

## Demo

Live demo: [Weather Dashboard](https://de-arnavgupta.github.io/Weather-Dash_Board/)

## Getting Started

### Prerequisites

- A modern web browser
- An API key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/de-arnavgupta/Weather-Dash_Board.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Weather-Dash_Board
   ```

3. Replace the API key in the JavaScript file:
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```

4. Open `index.html` in your web browser.

## Usage

1. **Search by City**:
   - Type a city name in the search box
   - Press Enter or click the search button

2. **Get Current Location Weather**:
   - Click the location button to get weather for your current location
   - Allow location access when prompted

3. **View Forecast**:
   - Scroll through the 5-day forecast cards below the current weather display
   - Each card shows the date, temperature range, and weather conditions

## API Reference

This project uses the OpenWeatherMap API:
- Current Weather Data endpoint: `/data/2.5/weather`
- 5-day Forecast endpoint: `/data/2.5/forecast`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

Arnav Gupta - [GitHub Profile](https://github.com/de-arnavgupta)
