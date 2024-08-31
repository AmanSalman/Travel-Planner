

// import { fetchCoordinates, fetchWeather, fetchImage } from './api.js';
// import { calculateTripLength } from './calculateTripLength.js';
// import { updateWeatherInfo, updateImageInfo, showError } from './updateWeatherInfo.js';

// export const handleSubmit = async (event)=> {
//     event.preventDefault();

//     const destination = document.getElementById('destination').value;
//     const startDate = document.getElementById('date').value;
//     const endDate = document.getElementById('end-date').value;

//     if (!destination || !startDate || !endDate) {
//         alert('Please fill in all fields.');
//         return;
//     }

//     const tripLength = calculateTripLength(startDate, endDate);
//     if (tripLength < 0) {
//         alert('End date must be after start date.');
//         return;
//     }

//     document.getElementById('trip-length').textContent = `Length of trip: ${tripLength} days`;

//     try {
//         const coordinates = await fetchCoordinates(destination);
//         const { lat, lng } = coordinates;

//         const weatherData = await fetchWeather(lat, lng, date);
//         updateWeatherInfo(weatherData);

//         const imageData = await fetchImage(destination);
//         updateImageInfo(imageData.imageUrl);

//     } catch (error) {
//         console.error('Error:', error);
//         showError('Failed to fetch data. Please try again.');
//     }
// }

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

    const destinationInputs = Array.from(document.getElementsByName('destination'));
    const destinations = Array.from(document.getElementsByName('destination')).map(input => input.value);
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const results = document.getElementById('results');

    if (!destinations.length || !startDate || !endDate) {
        alert('Please fill in all fields.');
        return;
    }

    const tripLength = calculateTripLength(startDate, endDate);
    if (tripLength < 0) {
        alert('End date must be after start date.');
        return;
    }

    document.getElementById('trip-length').textContent = `Length of trip: ${tripLength} days`;

    const tripData = { destinations: [], startDate, endDate, tripLength, imageUrl:'' };
    showLoader()
    try {
        for (const destination of destinations) {
            const coordinates = await fetchCoordinates(destination);
            const { lat, lng } = coordinates;

            const weatherData = await fetchWeather(lat, lng, startDate);
            tripData.destinations.push({ destination, weatherData });

            updateWeatherInfo(weatherData, destination);
        }

        const imageData = await fetchImage(destinations[0]);
        updateImageInfo(imageData.imageUrl);

        tripData.imageUrl = imageData.imageUrl;
        saveTrip(tripData);
        
        // Clear the main destination field
        destinationInputs[0].value = '';
        
        // Remove all dynamically added destination fields
        const additionalDestinationFields = document.querySelectorAll('#destinations .destination:not(:first-child)');
        additionalDestinationFields.forEach(field => field.remove());

        // Clear date fields
        document.getElementById('start-date').value = '';
        document.getElementById('end-date').value = '';
        results.style.display = 'flex';
        hideLoader()
        
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to fetch data. Please try again.');
    } finally {
        hideLoader()
    }
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
            if (window.scrollY > 200) { // Show the button after scrolling 200px down
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });
    });
});

