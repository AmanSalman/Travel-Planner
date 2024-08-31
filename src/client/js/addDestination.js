export function addDestinationField() {
  const newDestination = document.createElement('div');
  newDestination.classList.add('destination');
  newDestination.innerHTML = `
      <label for="destination">Destination</label>
      <input type="text" name="destination" placeholder="Enter city or country" required>
  `;
  document.getElementById('destinations').appendChild(newDestination);
}