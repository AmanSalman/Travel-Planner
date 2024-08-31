import { handleSubmit } from './js/main.js';
import { clearResults } from './js/clearRes.js';
import './styles/styles.scss'

document.getElementById('travel-form')
.addEventListener('submit', handleSubmit);

document.getElementById('clear-results')
.addEventListener('click', clearResults);
