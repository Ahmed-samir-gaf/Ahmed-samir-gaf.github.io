const apiUrl = 'https://api.open-meteo.com/v1/';
const geoApiUrl = 'https://wttr.in/';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const currentWeatherDescription = document.getElementById('current-weather-description');
const currentWeatherTemperature = document.getElementById('current-weather-temperature');
const currentWeatherHumidity = document.getElementById('current-weather-humidity');
const forecastList = document.getElementById('forecast-list');

searchButton.addEventListener('click', async () => {
    const city = searchInput.value.trim();
    if (city) {
        try {
            const response = await fetch(`https://wttr.in/${city}?format=j1`);
            const data = await response.json();
            console.log(data);

            currentWeatherDescription.textContent = data.current_condition[0].weatherDesc[0].value;
            currentWeatherTemperature.textContent = `${data.current_condition[0].temp_C}°C`;
            currentWeatherHumidity.textContent = `Humidity: ${data.current_condition[0].humidity}%`;

            forecastList.innerHTML = '';
            data.weather.forEach((day) => {
                const li = document.createElement('li');
                li.textContent = `${day.date}: ${day.hourly[0].weatherDesc[0].value}, ${day.hourly[0].tempC}°C`;
                forecastList.appendChild(li);
            });
        } catch (error) {
            console.error(error);
        }
    }
});