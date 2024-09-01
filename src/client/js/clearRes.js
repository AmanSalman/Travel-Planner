export function clearResults() {
    document.getElementById('weather-results').innerHTML = '';

    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';

    document.getElementById('trip-length').textContent = '';

    document.getElementById('travel-form').reset();

    const additionalDestinationFields = document.querySelectorAll('#destinations .destination:not(:first-child)');
    additionalDestinationFields.forEach(field => field.remove());
}

