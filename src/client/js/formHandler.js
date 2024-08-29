const axios = require('axios');
const { removeNullValues } = require('./removeNullValues.js');
const { isValidUrl } = require('./isValidUrl.js');
const { showLoader, hideLoader } = require('./loader.js');

const serverURL = 'http://localhost:4000/analyze';

async function handleSubmit(event) {
  event.preventDefault();
  const url = document.getElementById('article-url').value;
  if (isValidUrl(url)) {
    showLoader()
    try {
      const response = await axios.post(serverURL, { url });
      const data = response.data;
      console.log('Response Data:', data);

      updateResults(data);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      document.getElementById('results-section').innerHTML = `<p>Error: ${errorMessage}</p>`;
    }finally {
      hideLoader()
    }
  } else {
    document.getElementById('results-section').innerHTML = `<p>Please enter a valid URL.</p>`;
  }
}

function updateResults(data) {
  const cleanedData = removeNullValues(data);
  for (const [key, value] of Object.entries(cleanedData)) {
    const element = document.getElementById(key);
    if (element) {
      const readableKey = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      element.textContent = `${readableKey}: ${value || 'N/A'}`;
    }
  }
}

module.exports = { handleSubmit, updateResults };
