const axios = require('axios');
const dotenv = require('dotenv').config();


const API_KEY = process.env.pixabay_ApiKey
const getImageForCity = async (location) => {
    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: API_KEY,
                q: encodeURIComponent(location),
                image_type: 'photo'
            }
        });

        const data = response.data;
        // return data.hits.length > 0 ? data.hits[0].webformatURL : '';
        return 

    } catch (error) {
        console.error('Error fetching image from Pixabay:', error);
        throw error;
    }
};

module.exports = getImageForCity;
