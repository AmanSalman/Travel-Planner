# Webpack Project with Service Worker

This project is a simple Webpack setup that includes SCSS for styling, Babel for JavaScript transpilation, and a service worker for offline functionality.

## Project Description

A simple website for analyzing news articles with NLP. Built with Webpack, SCSS, and Node.js. Features include real-time analysis and offline support.

## How to Run the App

1. **Clone the repository**:
    ```bash
    git clone https://github.com/AmanSalman/EvaluateNewsArticleWithNLP.git
    ```
   
2. **Navigate to the project directory**:
    ```bash
    cd EvaluateNewsArticleWithNLP
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```
4. **Set Up Environment Variables**
   ```bash
   Create a .env file in the root of your project directory with the following content:
    API_KEY=your_api_key
    ```
6. **Start Development Server**:
    ```bash
    npm start
    ```
7.  **Build for Production**:
    ```bash
    npm run build
    ```
8. **Run the server**:
    ```bash 
    npm run server
    ```
9. **Run Tests**:
    ```bash 
    npm test
    ``` 
## Project Structure
├── src/
│ ├── client/
│ │ ├── js/
│ │ │ ├── app.js
│ │ │ └── index.js
│ │ ├── styles/
│ │ │ ├── base.scss
│ │ │ ├── header.scss
│ │ │ ├── footer.scss
│ │ │ ├── form.scss
│ │ │ └── resets.scss
│ │ ├── views/
│ │ │ └── index.html
│ │ └── service-worker.js
│ ├── server/
│ │ └── index.js
├── dist/
├── node_modules/
├── .gitignore
├── webpack.dev.js
├── webpack.prod.js
├── package.json
└── README.md


## Dependencies

- **Webpack**: Module bundler.
- **Babel**: JavaScript compiler.
- **Sass**: CSS preprocessor.
- **Axios**: Promise-based HTTP client.
- **Service Worker**: For offline functionality.

## Offline Functionality

The project includes a service worker that gets registered when the app loads, enabling offline support.

```html
		<script>
			if ('serviceWorker' in navigator) {
				window.addEventListener('load', () => {
					navigator.serviceWorker.register('/service-worker.js').then(registration => {
						console.log('Service Worker registered with scope:', registration.scope);
					}).catch(error => {
						console.error('Service Worker registration failed:', error);
					});
				});
			}
		</script>
```

## Test the Service Worker Registration

1. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000).
2. **Open Developer Tools**:
   - Press `F12` on your keyboard, or right-click on the page and select "Inspect".
3. Go to the **"Console" tab** in Developer Tools.
4. Check for any logs related to the service worker registration.
   ```plaintext
   Service Worker registered with scope: /
