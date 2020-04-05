const path = require('path');
const webpack = require('webpack');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

// designates what port the app will listen to for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Example app listening on port 3000!')
    console.log('http://localhost:3000');
});

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

//GET Route
const projectArr = [];

app.get('/all', getProjectArr);

function getProjectArr(req, res) {
    res.send(projectArr);
    console.log(projectArr);
};

//POSt route
app.post('/postData', postData);

function postData(request, response) {
    //console.log(request.body);

    let data = request.body;

    projectData = {
        place: data.name, 
        country: data.countryName,
        highTemp: data.temperatureHigh, 
        lowTemp: data.temperatureLow,
    };

    projectArr.push(projectData);
    response.send(projectArr);
    console.log(projectArr);
};

module.exports = postData;