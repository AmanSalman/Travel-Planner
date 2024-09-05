export function saveTrip(tripData) {
  const savedTrips = JSON.parse(localStorage.getItem('savedTrips')) || [];
  console.log(tripData)
  savedTrips.push(tripData);
  localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
}


export function displaySavedTrips() {
  const savedTrips = JSON.parse(localStorage.getItem('savedTrips')) || [];
  const tripList = document.getElementById('trip-list');
  tripList.style.display = 'block';
  tripList.innerHTML = '';

  savedTrips.forEach((trip, index) => {
    const tripElement = document.createElement('div');
    tripElement.classList.add('trip');

    let tripDestinations = trip.destinations.map(d => d.destination).join(', ');
    
    // Create a container for images
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    // Append each image to the container
    trip.imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.classList.add('trip-img');
      img.alt = 'Location image';
      imageContainer.appendChild(img);
    });

    tripElement.innerHTML = `
      <h4>Trip ${index + 1}</h4>
      <p>Destinations: ${tripDestinations}</p>
      <p>Start Date: ${trip.startDate}</p>
      <p>End Date: ${trip.endDate}</p>
      <p>Length: ${trip.tripLength} days</p>
    `;

    // Append the image container to the trip element
    tripElement.appendChild(imageContainer);

    // Add the delete button and its functionality
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteTrip');
    deleteButton.textContent = 'Delete Trip';
    deleteButton.addEventListener('click', () => {
      deleteTrip(index);
    });

    tripElement.appendChild(deleteButton);

    // Append the trip element to the trip list
    tripList.appendChild(tripElement);
  });
}

document.getElementById('hide-trips').addEventListener('click', (event)=>{
  HideTrips();
})
function HideTrips (){
  document.getElementById('trip-list').style.display = 'none';
}


function deleteTrip(index) {
  const savedTrips = JSON.parse(localStorage.getItem('savedTrips')) || [];
  savedTrips.splice(index, 1);
  localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
  displaySavedTrips();
}