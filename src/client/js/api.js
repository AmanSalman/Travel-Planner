import axios from "axios";

const BASE_URL = 'http://localhost:4000';

const fetchCoordinates = async (location) => {
    try {
        const response = await axios.get(`${BASE_URL}/coordinates`, {
            params: { location: location }
        });
        console.log(response)
        return response.data;

    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};

const fetchWeather = async (lat, lng, date) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: { lat, lng, date }
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};

const fetchImage = async (location) => {
    try {
        const response = await axios.get(`${BASE_URL}/image`, {
            params: { location: location }
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
};

export { fetchCoordinates, fetchWeather, fetchImage };
