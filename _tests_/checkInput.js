import { resAnim } from '../src/client/js/app'
//Check if city is only letters
export const checkPlaceInput = (city, date) => {
    const cityRegex = /^[a-zA-Z,.!? ]*$/;

    if(city.match(cityRegex) && date !== '' && city !== ''){ 
        return true;
    } else {
        document.getElementById('tripTitle').textContent = 'Missing city or date';
        document.getElementById('tripDate').textContent = 'Missing city or date';
        document.getElementById('tripDays').textContent = '';
        document.getElementById('highTemp').innerHTML = '';
        document.getElementById('lowTemp').innerHTML = '';
        document.getElementById('description').innerHTML = '';
        const image = document.getElementById('image');
        if (image.hasChildNodes()) {
            image.removeChild(image.firstChild);
        }
        resAnim();
        throw Error('Fail, Missing city or date');
    }
}