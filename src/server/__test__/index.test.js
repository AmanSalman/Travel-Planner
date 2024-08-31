const request = require('supertest');
const express = require('express');
const path = require('path');
const cors = require('cors');

jest.mock('../CityLocation.js');
jest.mock('../WeatherForecast.js');
jest.mock('../GetImage.js');

const getCityLocation = require('../CityLocation.js');
const fetchWeatherForecast = require('../WeatherForecast.js');
const getImageForCity = require('../GetImage.js');
const dotenv = require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist')));

const port = process.env.PORT || 3000; // Fallback port for testing

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
    const imageUrl = await getImageForCity(location);
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


getCityLocation.mockResolvedValue({ lat: 40.7128, lng: -74.0060 });
fetchWeatherForecast.mockResolvedValue({ forecast: 'Sunny', temperature: 25 });
getImageForCity.mockResolvedValue('https://pixabay.com/get/example-image.jpg');

describe('Express Server', () => {
  it('should return 400 if location is missing for /coordinates route', async () => {
    const response = await request(app).get('/coordinates');
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Location is required');
  });

  it('should return 400 if lat, lng, or date is missing for /weather route', async () => {
    const response = await request(app).get('/weather?lat=40.7128&lng=-74.0060');
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Latitude, Longitude, and Date are required');
  });

  it('should return an image URL for a valid location', async () => {
    const response = await request(app).get('/image?location=New York');
    expect(response.status).toBe(200);
    expect(response.body.imageUrl).toContain('https://pixabay.com');
  });

  it('should return 400 if location is missing for /image route', async () => {
    const response = await request(app).get('/image');
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Location is required');
  });
});
