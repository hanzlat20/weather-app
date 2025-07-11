  
  
  
```
# Weather App
  
A modern weather application built with React.  
It allows users to search for cities, view current weather, 5-day forecasts, and hourly forecasts, with support for light/dark mode and location-based weather.
  
---
  
## Features
  
- 🌤️ **Current Weather:** Displays temperature, humidity, wind speed, pressure, UV index, sunrise/sunset, and weather type.
- 🔍 **City Search with Suggestions:** Autocomplete city names as you type, powered by the OpenWeatherMap Geocoding API.
- 📍 **Current Location:** Fetch weather for your current location using your browser's geolocation.
- 📅 **5-Day Forecast:** See the weather outlook for the next five days.
- 🕒 **Hourly Forecast:** View weather details for the next several hours.
- 🌗 **Light/Dark Mode:** Toggle between light and dark themes for a better user experience.
  
---
  
## Screenshots
  
![Main UI Dark](./Screenshots/main-ui-dark.png)
  
### Main UI (Light Mode)
![Main UI Light](./Screenshots/main-ui-light.png)
  
### Drop Down Search (Dark Mode)
![Drop Down Dark](./Screenshots/drop-down-dark.png)
  
### Drop Down Search (Light Mode)
![Drop Down Light](./Screenshots/drop-down-light.png)
  
---
  
## Getting Started
  
### Prerequisites
  
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
  
### Installation
  
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```
  
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
  
3. **API Key Setup:**
  
   This app uses the [OpenWeatherMap API](https://openweathermap.org/api) and [OpenUV API](https://www.openuv.io/).
  
   - Replace the `apiKey` variable in `NavDark.jsx` and `App.jsx` with your own OpenWeatherMap API key.
   - For UV index, replace the `apiKey` in `Hero.jsx` with your OpenUV API key.
  
   > **Note:** You can sign up for free API keys at [OpenWeatherMap](https://openweathermap.org/appid) and [OpenUV](https://www.openuv.io/).
  
4. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```
  
5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.
  
---
  
## Project Structure
  
```
my-weather-app/
├── src/
│   ├── App.jsx
│   ├── NavDark.jsx
│   ├── Hero.jsx
│   ├── Footer.jsx
│   ├── assets/
│   └── index.css
├── public/
├── package.json
└── README.md
```
  
---
  
## Usage
  
Search for a city: Start typing in the search bar and select a city from the suggestions.
Current location: Click the "Current Location" button to get weather for your location.
Switch theme: Toggle between dark and light mode using the switch at the top.
View forecasts: Scroll down to see 5-day and hourly forecasts.
  
---
  
## Customization
  
Styling: Modify index.css and component-specific CSS for custom themes.
API Endpoints: You can change the default city or API endpoints in App.jsx and NavDark.jsx.
  
---
  
## License
  
This project is open source and available under the [MIT License](LICENSE).
  
---
  
## Credits
  
- [OpenWeatherMap](https://openweathermap.org/)
- [OpenUV](https://www.openuv.io/)
- Weather icons and assets from [your sources here]
  
---
  
## Contact
  
For questions or suggestions, open an issue or contact [hanzlat20@gmail.com].
  
```
  
  
  