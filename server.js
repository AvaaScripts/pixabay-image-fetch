import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; 
import axios from 'axios'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/imageGallery2.html');
});


app.post('/search', async (req, res) => {
  const { keyword, number } = req.body;


  if (!keyword || parseInt(number) < 2) {
    return res.status(400).send('Invalid input: Please enter a keyword and a number >= 2.');
  }


  const API_KEY = '37087275-fe41d61c9a83317d8062718f0';
  const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(keyword)}&per_page=${number}`;

  try {

    
    // Using Fetch API
   // const response = await fetch(API_URL);
    //const data = await response.json();

    // Using Axios
     const response = await axios.get(API_URL);
     const data = response.data;

    res.render('imageGallery3', { images: data.hits, keyword });

  } catch (error) {
    res.status(500).send('Error fetching data from Pixabay API.');
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
