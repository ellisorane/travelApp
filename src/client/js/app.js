import { checkInput } from './checkInput'
import { resAnim } from './resAnim'
import fetch from 'node-fetch'
import { displayModal } from './displayModal'

export const submit = document.getElementById('submit').addEventListener('click', async (e) => {
    e.preventDefault()
    
    const tripTitle = document.getElementById('tripTitle')
    const tripDate = document.getElementById('tripDate')
    const tripDays = document.getElementById('tripDays')
    const highTempDiv = document.getElementById('highTemp')
    const lowTempDiv = document.getElementById('lowTemp')
    const imageRes = document.getElementById('image')
    
    const input = document.getElementById('place').value
    const dateVal = document.getElementById('datepicker').value
    const date = new Date(dateVal)
    const currentTime = new Date()
    const time = date.getTime()/1000
    let name
    let countryName
    let lat
    let long
    let highTemp
    let lowTemp
    let picSrc

    //  Animate results
    resAnim()
    //Display results
    displayModal()
    

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
        imageRes.innerHTML = `<img src="${picSrc} alt="Place image">`
        } else {
            imageRes.innerHTML = '<h2 id="img-err">No images found</h2>'
            document.getElementById('img-err').style.textDecoration = 'none'
        }
    })

    //Update UI
    tripTitle.textContent = name + ', ' + countryName
    tripDate.textContent = dateVal
    let days = Math.floor(((date - currentTime)/1000)/86400) + 1
    if(days < 0) {
        tripDays.textContent = 'This date has already passed'
    } else if(days === 0) {
        tripDays.textContent = 'Trip is today'
    } else {
        tripDays.innerHTML = `<strong>Days until trip:</strong> ${days}`
    }
    highTempDiv.innerHTML = `<strong>High Temperature:</strong> ${highTemp}`
    lowTempDiv.innerHTML = `<strong>Low Temperature:</strong> ${lowTemp}`
    
    //reset input fields
    document.getElementById('place').value = ''
    document.getElementById('datepicker').value = ''

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
        const postedData = await response.json()
        // console.log(postedData);
        return postedData;
    } catch(error) {
        console.log('error', error)
    };
};