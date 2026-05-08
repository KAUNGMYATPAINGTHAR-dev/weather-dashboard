const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const errorBox = document.getElementById('errorBox');
const errorMsg = document.getElementById('errorMsg');
const loading = document.getElementById('loading');

// Search function
async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) return;

    // Reset UI
    weatherCard.style.display = 'none';
    errorBox.style.display = 'none';
    loading.style.display = 'flex';

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        loading.style.display = 'none';

        if (response.ok) {
            updateWeatherCard(data);
        } else {
            showError(data.error || 'City not found');
        }

    } catch (error) {
        loading.style.display = 'none';
        showError('Something went wrong. Try again!');
    }
}

// Update weather card
function updateWeatherCard(data) {
    document.getElementById('cityName').textContent = data.city;
    document.getElementById('countryName').textContent = data.country;
    document.getElementById('temperature').textContent = `${data.temp}°C`;
    document.getElementById('description').textContent = data.description;
    document.getElementById('feelsLike').textContent = `${data.feels_like}°C`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind_speed} m/s`;
    document.getElementById('weatherIcon').src = 
        `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

    weatherCard.style.display = 'block';
}

// Show error
function showError(message) {
    errorMsg.textContent = message;
    errorBox.style.display = 'flex';
}

// Event listeners
searchBtn.addEventListener('click', getWeather);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});