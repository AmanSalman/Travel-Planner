// src/js/main.js

import { fetchCoordinates, fetchWeather, fetchImage } from './api.js';
import { updateWeatherInfo, updateImageInfo, showError } from './updateWeatherInfo.js';

export const handleSubmit = async (event)=> {
    event.preventDefault();

    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    try {
        const coordinates = await fetchCoordinates(destination);
        const { lat, lng } = coordinates;

        const weatherData = await fetchWeather(lat, lng, date);
        updateWeatherInfo(weatherData);

        const imageData = await fetchImage(destination);
        updateImageInfo(imageData.imageUrl);

    } catch (error) {
        console.error('Error:', error);
        showError('Failed to fetch data. Please try again.');
    }
}
