import { checkPlaceInput } from '../../../_tests_/checkInput';

export const submit = document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();
    
    const geoKey = 'oranethecrane';
    const darkKey = 'a66b988c2d66045ea73975831e86648f';
    const pixKey = '15324148-2985f37b999ac9cae0550d3a1';
    const dateVal = document.getElementById('datepicker').value;
    const date = new Date(dateVal);
    const currentTime = new Date();
    const time = date.getTime()/1000;
    const corsFix = 'https://cors-anywhere.herokuapp.com/';
    
    //Calculate number of days until trip
    const daysCalc = ((date - currentTime)/1000)/86400;
    const days = Math.floor(daysCalc);
    const input = document.getElementById('place').value;
    const tripDays = document.getElementById('tripDays');


    //Check for valid city entry
    checkPlaceInput(input);

    //Geonames API address
    let geoUrl = `http://api.geonames.org/searchJSON?q=${input}&maxRows=10&username=${geoKey}`;
    //Call Geonames
    getData(geoUrl)
    .then(function (data) {
        //console.log(data);
        const name = data.geonames[0].name;
        const countryName = data.geonames[0].countryName;
        const lat = data.geonames[0].lat;
        const long = data.geonames[0].lng;
        document.getElementById('tripTitle').innerHTML = name + ', ' + countryName; 
        document.getElementById('tripDate').innerHTML = dateVal;

        //Trip info 
        tripDays.innerHTML = `Days until trip: ${days}`;

        //Darksky API address
        let darkSky =  `${corsFix}https://api.darksky.net/forecast/${darkKey}/${lat},${long},${time}?exclude=currently,flags`;
        //Call DarkSky
        getData(darkSky)
        .then(function(data2) {
            //console.log(data2);
            const summary = data2.daily.data[0].summary;
            const temperatureHigh = data2.daily.data[0].temperatureHigh;
            const temperatureLow = data2.daily.data[0].temperatureLow;
            
            //Post data in server
            postData('/postData', {
                name: data.geonames[0].name, 
                countryName: data.geonames[0].countryName,
                summary: data2.daily.data[0].summary, 
                temperatureHigh: data2.daily.data[0].temperatureHigh, 
                temperatureLow: data2.daily.data[0].temperatureLow
            });
            

            //Update UI 
            updateUI(); 
            
            //Pixabay API address
            let pixabay = `https://pixabay.com/api/?key=${pixKey}&q=${input}&image_type=photo`;
            //Call Pixabay API
            getData(pixabay)
            .then(function(data3) {
                //console.log(data3);
                const picSrc = data3.hits[0].webformatURL;
                const image = document.getElementById('image');
                image.innerHTML = `<img src="${picSrc} alt="Place image">`;   

            });
        });
    });
    //reset input fields
    document.getElementById('place').value = '';
    document.getElementById('datepicker').value = '';

    
    resAnim();
    

    
})


//results animation
export const resAnim = () => {
    const tripTitle = document.getElementById('tripTitle');
    const tripDate = document.getElementById('tripDate');
    const highTemp = document.getElementById('highTemp');
    const lowTemp = document.getElementById('lowTemp');
    const description = document.getElementById('description');
    const imageRes = document.getElementById('image');

    const arr = [tripTitle, tripDate, highTemp, lowTemp, description, imageRes, tripDays]
    
    for(let i = 0; i < arr.length; i++) {
        
        if(arr[i].style.animationName === 'fadeIn') {
        arr[i].style.animationName = 'none';
        setTimeout(function(){ arr[i].style.animationName = 'fadeIn'; }, 500);
       } else {
        arr[i].style.animationName = 'fadeIn';
       }
    }
    
}



//GET route that gets info from weather API
const getData = async(url) => {
    const response = await fetch(url);
    try {
        //Transform data into JSON
        const data = await response.json();
        //console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
};

//POST route
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
        //console.log(postedData);
        return postedData;
    } catch(error) {
        console.log('error', error);
    };
};

//Update the UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const projectArr = await request.json();
            document.getElementById('highTemp').innerHTML = `High temp: ${projectArr[0].highTemp}&#8457`;
            document.getElementById('lowTemp').innerHTML = `Low temp: ${projectArr[0].lowTemp}&#8457`;
            document.getElementById('description').innerHTML = `Description: ${projectArr[0].summ}`;        
    } catch(error) {
        console.log('error', error);
    }
};
