import { resAnim } from '../src/client/js/app'
//Check if city is only letters
export const checkPlaceInput = (city) => {
    const letters = /^[A-Za-z]+$/;
        
    if(city.match(letters)){ 
        return true;
    } else {
        document.getElementById('tripTitle').textContent = 'Missing city';
        document.getElementById('tripDate').textContent = '';
        document.getElementById('tripDays').textContent = '';
        document.getElementById('highTemp').innerHTML = '';
        document.getElementById('lowTemp').innerHTML = '';
        document.getElementById('description').innerHTML = '';
        const image = document.getElementById('image');
        if (image.hasChildNodes()) {
            image.removeChild(image.firstChild);
        }
        resAnim();
        throw Error('Fail, Missing city');
    }
}