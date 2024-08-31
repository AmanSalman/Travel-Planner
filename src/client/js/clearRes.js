export function clearResults() {
    document.getElementById('weather-results').innerHTML = '';
    const locationImage = document.getElementById('location-image');
    locationImage.src = '';
    locationImage.style.display = 'none';
    document.getElementById('trip-length').textContent = '';
    document.getElementById('travel-form').reset();
    const additionalDestinationFields = document.querySelectorAll('#destinations .destination:not(:first-child)');
    additionalDestinationFields.forEach(field => field.remove());
}
