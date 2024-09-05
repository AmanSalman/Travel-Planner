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

  // Clear any existing images
  imageContainer.innerHTML = '';

  // Create and append an img element for each URL
  imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.style.display = 'block'; // Ensure images are displayed as block-level elements
      imageContainer.appendChild(img);
  });
};



const showError = (message) => {
  alert(message);
};

export { updateWeatherInfo, updateImageInfo, showError };
