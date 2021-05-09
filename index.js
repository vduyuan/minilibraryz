require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const axios = require('axios'); 

const app = express(); 

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors()); 


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.js'));
})

const port = process.env.PORT || 5000;
app.listen(5000); 

mongoose.connect(process.env.MONGO_URI,  {useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("Server running on port " + port));


const userRoutes = require('./routes/users');
const collageRoutes = require('./routes/collages');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use('/users', userRoutes);
app.use('/collages', collageRoutes);

/* app.get('/', (req, res) => {
    res.send("Hello"); 
}) */
