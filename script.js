// Function to fetch weather data
async function fetchWeather(city) {
    const key = apiKey; 	// Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } 
    catch (error) {
        alert(error.message);
    }
}

// Function to display weather data
function displayWeather(data) {
	document.querySelector('.weather h3').innerHTML = `<i class="fa-solid fa-location-dot"></i> <strong>${data.name}</strong>`;
    document.querySelector('#temperature').innerHTML = `<i class="fa-solid fa-temperature-high"></i> <strong>${data.main.temp} °C</strong>`;
    document.querySelector('#humidity').innerHTML = `<i class="fa-solid fa-water"> <strong>${data.main.humidity} %</strong>`;
    document.querySelector('#windspeed').innerHTML = `<i class="fa-solid fa-wind"></i> <strong>${data.wind.speed} m/s</strong>`;
    
    let condition = document.querySelector('#condition');
    let weatherCondition = data.weather[0].description;
    condition.innerHTML = `<i class="fa-solid fa-cloud"></i> <strong>${weatherCondition}</strong>`;

    if (data.weather[0].main === 'Clear') {
        condition.innerHTML = `<i class="fa-solid fa-sun"></i> <strong>${weatherCondition}</strong>`;
    } 
    else if (data.weather[0].main === 'Rain') {
        condition.innerHTML = `<i class="fa-solid fa-cloud-rain"></i> <strong>${weatherCondition}</strong>`;
    } 
    else if (data.weather[0].main === 'Snow') {
        condition.innerHTML = `<i class="fa-solid fa-snowflake"></i> <strong>${weatherCondition}</strong>`;
    }
    
    document.querySelector('.weather').style.display = 'flex';
}

document.querySelector('#search-btn').addEventListener('click', () => {
    let city = document.querySelector('#search-input').value;

    if (city) {
        fetchWeather(city);
    } 
    else {
        alert('Please enter a city name');
    }
});

document.querySelector('#search-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.querySelector('#search-btn').click();
    }
});