import { addDestinationField } from './addDestination.js';
import { fetchCoordinates, fetchWeather, fetchImage } from './api.js';
import { calculateTripLength } from './calculateTripLength.js';
import { hideLoader, showLoader } from './loader.js';
import { displaySavedTrips, saveTrip } from './Trips.js';
import { updateWeatherInfo, updateImageInfo, showError } from './updateWeatherInfo.js';

document.getElementById('add-destination').addEventListener('click', addDestinationField);
document.getElementById('display-trips').addEventListener('click', displaySavedTrips);
document.getElementById('go-to-saved-trips').addEventListener('click', () => {
    document.getElementById('saved-trips').scrollIntoView({ behavior: 'smooth' });
    displaySavedTrips()
});


export async function handleSubmit(event) {
    event.preventDefault();

    const destinationInputs = Array.from(document.querySelectorAll('input[name="destination"]'));
    const destinations = destinationInputs.map(input => input.value.trim()).filter(value => value);
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const results = document.getElementById('results');

    // Validate form input
    if (!destinations.length || !startDate || !endDate) {
        alert('Please fill in all fields.');
        return;
    }

    // Calculate the trip length
    const tripLength = calculateTripLength(startDate, endDate);
    if (tripLength < 0) {
        alert('End date must be after start date.');
        return;
    }

    // Display trip length
    document.getElementById('trip-length').textContent = `Length of trip: ${tripLength} days`;

    const tripData = {
        destinations: [], 
        startDate, 
        endDate, 
        tripLength, 
        imageUrls: []
    };

    showLoader();

    try {
        for (const destination of destinations) {
            try {
                // Fetch coordinates for the destination
                const { lat, lng } = await fetchCoordinates(destination);

                // Fetch weather data for the destination
                const weatherData = await fetchWeather(lat, lng, startDate);
                tripData.destinations.push({ destination, weatherData });

                // Update the weather information in the UI
                updateWeatherInfo(weatherData, destination);

                // Fetch image for the destination
                const imageData = await fetchImage(destination);
                tripData.imageUrls.push(imageData.imageUrl);
            } catch (err) {
                console.error(`Error fetching data for ${destination}:`, err);
                showError(`Failed to fetch data for ${destination}.`);
            }
        }

        // Display fetched images for destinations
        updateImageInfo(tripData.imageUrls);

        saveTrip(tripData);

        resetForm(destinationInputs);

        results.style.display = 'flex';
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to fetch data. Please try again.');
    } finally {
        hideLoader();
    }
}

function resetForm(destinationInputs) {
    destinationInputs.forEach(input => input.value = '');

    const additionalDestinationFields = document.querySelectorAll('#destinations .destination:not(:first-child)');
    additionalDestinationFields.forEach(field => field.remove());
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
}


document.addEventListener('DOMContentLoaded', () => {
    loadLists();

    document.getElementById('addTodo').addEventListener('click', () => {
        addItem('todo');
    });

    document.getElementById('addPacking').addEventListener('click', () => {
        addItem('packing');
    });
});

function addItem(type) {
    const input = document.getElementById(`${type}-input`);
    const value = input.value.trim();
    const list = document.getElementById(`${type}-list`);

    if (value) {
        const li = document.createElement('li');
        li.textContent = value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => {
            li.remove();
            saveLists();
        };

        li.appendChild(deleteButton);
        list.appendChild(li);
        input.value = '';

        saveLists();
    }
}

function saveLists() {
    const todoList = Array.from(document.getElementById('todo-list').children)
        .map(li => li.firstChild.textContent);
    const packingList = Array.from(document.getElementById('packing-list').children)
        .map(li => li.firstChild.textContent);

    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('packingList', JSON.stringify(packingList));
}

function loadLists() {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const packingList = JSON.parse(localStorage.getItem('packingList')) || [];

    todoList.forEach(item => addItemToList('todo', item));
    packingList.forEach(item => addItemToList('packing', item));
}

function addItemToList(type, value) {
    const list = document.getElementById(`${type}-list`);

    if (value) {
        const li = document.createElement('li');
        li.textContent = value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => {
            li.remove();
            saveLists();
        };

        li.appendChild(deleteButton);
        list.appendChild(li);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const scrollUpButtons = document.querySelectorAll('.scroll-button');

    scrollUpButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', () => {
        scrollUpButtons.forEach(button => {
            if (window.scrollY > 200) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });
    });
});

