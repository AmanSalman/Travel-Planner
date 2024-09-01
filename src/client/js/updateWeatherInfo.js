const updateWeatherInfo = (weatherData, destination) => {
  const weatherInfoElement = document.getElementById('weather-results');

  const weatherInfo = `
      <div>
          <strong>${destination}</strong><br>
          Temperature: ${weatherData.temp}<br>
          Description: ${weatherData.description}<br>
          Icon: <p>${weatherData.icon}</p><br>
      </div>
  `;
  
  weatherInfoElement.innerHTML += weatherInfo;
};

const updateImageInfo = (imageUrls) => {
  const imageContainer = document.getElementById('image-container');

  imageContainer.innerHTML = '';
  imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.style.display = 'block';
      imageContainer.appendChild(img);
  });
};


const showError = (message) => {
  alert(message);
};

export { updateWeatherInfo, updateImageInfo, showError };
