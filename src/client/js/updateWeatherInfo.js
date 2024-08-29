

const updateWeatherInfo = (weatherData) => {
  const weatherInfoElement = document.getElementById('weather-result');
  
  const weatherInfo = `
      Temperature: ${weatherData.temp}<br>
      Description: ${weatherData.description}<br>
      Icon: ${weatherData.icon}<br>
  `;
  
  weatherInfoElement.innerHTML = weatherInfo;
};

const updateImageInfo = (imageUrl) => {
  const imageElement = document.getElementById('location-image');
  imageElement.src = imageUrl;
  imageElement.style.display = 'block';
};

const showError = (message) => {
  alert(message);
};

export { updateWeatherInfo, updateImageInfo, showError };
