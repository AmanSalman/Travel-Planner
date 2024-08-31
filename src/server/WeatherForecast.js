const axios = require("axios");
const dotenv = require('dotenv').config();

const calculateRemainingDays = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const timeDiff = target - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
};

const weatherbit_ApiKey = process.env.weatherbit_ApiKey;
const fetchWeatherForecast = async (lat, lng, date) => {
    try {
        const remainingDays = calculateRemainingDays(date);
        // console.log(`Remaining days until ${date}: ${remainingDays}`);
        
        const response = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${weatherbit_ApiKey}&days=${remainingDays > 0 ? remainingDays : 1}`)

        const data = response.data;
        return {
            temp: data.data[0].temp,
            description: data.data[0].weather.description,
            icon: data.data[0].weather.icon,
        };

        // return { temp: 20.6, description: 'Broken clouds', icon: 'c03d' };
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        throw error;
    }
};

module.exports = fetchWeatherForecast;
