const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const getCityLocation = require('./CityLocation.js');
const fetchWeatherForecast = require('./WeatherForecast.js');
const getImageForCity = require('./GetImage.js'); // Import the getImage function
const dotenv = require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist')));

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.get('/coordinates', async (req, res) => {
    const location = req.query.location;
    if (!location) {
        return res.status(400).json({ message: 'Location is required' });
    }

    try {
        const coordinates = await getCityLocation(location);
        console.log(coordinates)
        res.json(coordinates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/weather', async (req, res) => {
    const { lat, lng, date } = req.query;
    
    if (!lat || !lng || !date) {
        return res.status(400).json({ message: 'Latitude, Longitude, and Date are required' });
    }

    try {
        const weatherForecast = await fetchWeatherForecast(lat, lng, date);
        console.log(weatherForecast)
        res.json(weatherForecast);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/image', async (req, res) => {
    const location = req.query.location;
    if (!location) {
        return res.status(400).json({ message: 'Location is required' });
    }

    try {
        // const imageUrl = await getImageForCity(location);
        // console.log(imageUrl)
        res.json({ imageUrl:'https://pixabay.com/get/g39d70e0625139b403b486d8888c7ed0331a8b82044eaa4692a04c35bfbb9a25261afa888ac2643d4a63b0700390f6270e631dca4acfd120b9a5abaa127cdac81_640.jpg' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
