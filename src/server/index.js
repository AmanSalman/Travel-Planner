const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config()


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist')));

const port = process.env.PORT;


const API_KEY = process.env.MEANINGCLOUD_API_KEY;
console.log(API_KEY)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.post('/analyze', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    const response = await axios.post('https://api.meaningcloud.com/sentiment-2.1', null, {
      params: {
        key: API_KEY,
        url: url,
        lang: 'en',
      },
    });

    const { data } = response;

    if (data.status.code === '0') {
      const result = {
        agreement: data.agreement || 'N/A',
        confidence: data.confidence || 'N/A',
        irony: data.irony || 'N/A',
        model: data.model || 'N/A',
        scoreTag: data.score_tag || 'N/A',
        subjectivity: data.subjectivity || 'N/A',
      };

      res.json(result);
    } else {
      res.status(400).json({ message: data.status.msg });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
