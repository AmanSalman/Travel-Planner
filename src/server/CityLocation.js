const { default: axios } = require("axios");
const dotenv = require('dotenv').config();

const API_KEY = process.env.username_ApiKey;
const getCityLocation = async (location) => {
  try {
      const response = await axios.get(`https://secure.geonames.org/searchJSON?q=${location}&maxRows=1&username=${API_KEY}`)
      const data = response.data;
      return {
          lat: data.geonames[0].lat,
          lng: data.geonames[0].lng,
          city: data.geonames[0].name,
          country: data.geonames[0].countryName,
      };
    // return {
    //     lat: '51.50853',
    //     lng: '-0.12574',
    //     city: 'London',
    //     country: 'United Kingdom'
    // }
  } catch (error) {
      console.error('Error fetching Location:', error);
      throw error;
  }
};


module.exports = getCityLocation;