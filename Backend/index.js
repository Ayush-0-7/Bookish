require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');
const { predict } = require('./api/predict');
const { booknames } = require('./api/booknames');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.post('/predict', predict);
app.get('/booknames',booknames);
app.get('/',(req,res)=>{
  res.send("This is working fine.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});