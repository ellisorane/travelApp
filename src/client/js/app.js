import { checkInput } from './checkInput'
import { resAnim } from './resAnim'
import fetch from 'node-fetch'

export const submit = document.getElementById('submit').addEventListener('click', async (e) => {
    e.preventDefault();

    //Divs
    const divs = {
        tripTitle: document.getElementById('tripTitle'),
        tripDate: document.getElementById('tripDate'),
        tripDays: document.getElementById('tripDays'),
        highTemp: document.getElementById('highTemp'),
        lowTemp: document.getElementById('lowTemp'),
        imageRes: document.getElementById('image')
    }

    const input = document.getElementById('place').value
    const dateVal = document.getElementById('datepicker').value
    const date = new Date(dateVal);
    const currentTime = new Date();
    const time = date.getTime()/1000;
    let name
    let countryName
    let lat
    let long
    let highTemp
    let lowTemp
    let picSrc

    console.log('Submitted')

    //Check input
    await checkInput(input, dateVal)

    await postData('/geoApi', { input })
    .then(data => {
        name = data.geonames[0].name
        countryName = data.geonames[0].countryName
        lat = data.geonames[0].lat
        long = data.geonames[0].lng
    })

    await postData('/darkApi', { lat, long, time })
        .then(data => {
            highTemp = data.daily.data[0].temperatureHigh 
            lowTemp = data.daily.data[0].temperatureLow
    })

    await postData('/pixApi', { input })
    .then(data => {
        if (data.total !== 0) {
        picSrc = data.hits[0].webformatURL
        divs.imageRes.innerHTML = `<img src="${picSrc} alt="Place image">`;
        } else {
            divs.imageRes.innerHTML = '<h2 id="img-err">No images found</h2>';
            document.getElementById('img-err').style.textDecoration = 'none';
        }
    })

    //Update UI
    divs.tripTitle.textContent = name + ', ' + countryName
    divs.tripDate.textContent = dateVal
    let days = Math.floor(((date - currentTime)/1000)/86400) + 1
    if(days < 0) {
        divs.tripDays.textContent = 'This date has already passed'
    } else if(days === 0) {
        divs.tripDays.textContent = 'Trip is today'
    } else {
        divs.tripDays.textContent = 'Days until trip: ' + days
    }
    divs.highTemp.textContent = `High Temperature: ${highTemp}`
    divs.lowTemp.textContent = `Low Temperature: ${lowTemp}`

    ////reset input fields
    document.getElementById('place').value = '';
    document.getElementById('datepicker').value = '';

    resAnim();
})


//POST route///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',

    },
    body: JSON.stringify(data)
    });

    try {
        const postedData = await response.json();
        // console.log(postedData);
        return postedData;
    } catch(error) {
        console.log('error', error);
    };
};