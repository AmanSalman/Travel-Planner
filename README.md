# Travel Planner App

The **Travel Planner App** is a project developed as part of the Udacity Nanodegree program. This application allows users to add, store, and manage their trips, providing features to view weather forecasts for specific departure dates and display images of destinations.

## **Introduction**

The Travel Planner App helps users organize and plan their trips with ease. It allows users to manage their trips, whether they are scheduled for today, upcoming, or in the past. Users can also view the weather forecast for their travel dates using the Weatherbit API and fetch images of their destinations using the Pixabay API. The app stores trip data in the browser's local storage, providing data persistence across sessions.

## **Features**

- **Add and Manage Trips**: Users can add, view, and delete trips.
- **Weather Forecast**: Displays weather forecasts for specific departure dates using the Weatherbit API.
- **Destination Images**: Fetches images of destinations or countries using the Pixabay API.
- **Local Storage**: Trips data is stored in the browser's local storage, allowing data persistence across sessions, so users don’t lose their data when they refresh or close the browser.
- **Offline Support**: Service Worker for caching assets and providing offline functionality.
- **Responsive Design**: Optimized for various devices, ensuring a seamless experience across desktops, tablets, and smartphones.
- **Testing**: Includes both client-side and server-side testing to ensure robustness and reliability.

## **Technologies Used**

### **Frontend:**

- **Sass**: For styling the application with modular and maintainable CSS.
- **Webpack**: Bundles JavaScript files and manages frontend assets.
- **Babel**: Transpiles modern JavaScript (ES6+) for compatibility across browsers.
- **Service Worker**: Provides offline functionality and caches assets for improved performance.

### **Backend:**

- **Express**: A lightweight web framework for setting up the server and handling API requests.
- **dotenv**: Manages environment variables securely.
- **cors**: Enables Cross-Origin Resource Sharing, allowing the API to be accessible from different domains.

### **Testing:**

- **Jest**: A testing framework for unit and integration tests.
- **Supertest**: A library for testing HTTP requests, particularly useful for API endpoints.

### **APIs:**

- **Weatherbit API**: Fetches weather data based on latitude and longitude obtained from the Geonames API.
- **Pixabay API**: Provides high-quality images for destinations or countries.
- **Geonames API**: Retrieves latitude and longitude for specified locations, supporting the weather data fetch.

## **Installation**

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AmanSalman/Travel-Planner.git
   ```
2. **Navigate to the project directory**:
    ```bash
    cd Travel-Planner
    ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set Up Environment Variables**
- Create a .env file in the root of your project directory with the following content:
   ```bash
     weatherbit_ApiKey = your_weatherbit_key
     username_ApiKey = your-Geaonnames-username
     pixabay_ApiKey = your_pixabay_key
     PORT = 4002
   ```
## Scripts
1. **Start Development**:
    ```bash
    npm start
    ```
2.  **Build for Production**:
    ```bash
    npm run build
    ```
3. **Run the server**:
    ```bash 
    npm run server
    ```
4. **Run Tests**:
    ```bash 
    npm test
    ``` 
## **Prerequisites**

- **Node.js**: Ensure you have Node.js version `v22.3.0` installed.

You can check your Node.js version by running:

```bash
node -v
```