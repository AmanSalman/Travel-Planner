

import { fetchCoordinates, fetchWeather, fetchImage } from './api.js';
import { calculateTripLength } from './calculateTripLength.js';
import { updateWeatherInfo, updateImageInfo, showError } from './updateWeatherInfo.js';

export const handleSubmit = async (event)=> {
    event.preventDefault();

    const destination = document.getElementById('destination').value;
    const startDate = document.getElementById('date').value;
    const endDate = document.getElementById('end-date').value;

    if (!destination || !startDate || !endDate) {
        alert('Please fill in all fields.');
        return;
    }

    const tripLength = calculateTripLength(startDate, endDate);
    if (tripLength < 0) {
        alert('End date must be after start date.');
        return;
    }

    document.getElementById('trip-length').textContent = `Length of trip: ${tripLength} days`;

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
