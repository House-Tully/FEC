require('dotenv').config();
// const config = require('../client/dist/config.js');
const axios = require('axios');

const path = require("path")
const express = require("express"); // npm installed

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));
// other configuration...

app.listen(3001);

// get detail of a specific product
app.get('/product', (req, res) => {
  let product = req.query.product_id;
  console.log('PRODUCT', product);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product}`,{headers:{Authorization: `${process.env.TOKEN}`}})
    .then ((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('ERROR', err)
      res.status(500).send('did not obtain data')
    })
})

// get reviews of a specific product
app.get('/review', (req, res) => {
  let product = req.query.product_id;
  // console.log('WHAT IS THE DIFFERENce', config.TOKEN)
  // console.log('HERE IS YOUR TOKEN', process.env.TOKEN)
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?sort=newest&&product_id=${product}`,{headers:{Authorization: `${process.env.TOKEN}`}})
    .then ((response) => {
      // console.log('RESPONSE', response.data)
      res.status(200).send(response.data);
    })
    .catch((err) => {
      // console.log('ERROR', err)
      res.status(500).send('did not obtain data')
    })
})