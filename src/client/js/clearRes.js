export function clearResults() {
    // Clear weather results
    document.getElementById('weather-results').innerHTML = '';

    // Clear all images in the container
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = ''; // Remove all images

    // Clear trip length
    document.getElementById('trip-length').textContent = '';

    // Reset the form
    document.getElementById('travel-form').reset();

    // Remove all dynamically added destination fields
    const additionalDestinationFields = document.querySelectorAll('#destinations .destination:not(:first-child)');
    additionalDestinationFields.forEach(field => field.remove());
}

