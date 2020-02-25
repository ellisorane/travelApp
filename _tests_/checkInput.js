//Check if city is only letters
export const checkPlaceInput = (input) => {
    const letters = /^[A-Za-z]+$/;
        
    if(input.match(letters)){ 
        console.log('City input is valid');
        return true;
    } else {
        document.getElementById('tripTitle').textContent = 'Please enter valid city.';
        document.getElementById('tripDate').textContent = '';
        tripDiv.innerHTML = ''; 
        document.getElementById('highTemp').innerHTML = '';
        document.getElementById('lowTemp').innerHTML = '';
        document.getElementById('description').innerHTML = '';    

        throw Error('Fail, City input in valid');
    }
}