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
      tripElement.innerHTML = `
          <h4>Trip ${index + 1}</h4>
          <p>Destinations: ${tripDestinations}</p>
          <p>Start Date: ${trip.startDate}</p>
          <p>End Date: ${trip.endDate}</p>
          <p>Length: ${trip.tripLength} days</p>
          <img src="${trip.imageUrl}" class="trip-img" alt="Location image">
          <button class="deleteTrip">Delete Trip</button>
      `;

      tripElement.querySelector('.deleteTrip').addEventListener('click', () => {
        deleteTrip(index);
      });
      
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