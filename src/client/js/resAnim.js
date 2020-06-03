//results animation
export const resAnim = () => {
    const tripTitle = document.getElementById('tripTitle');
    const tripDate = document.getElementById('tripDate');
    const tripDays = document.getElementById('tripDays');
    const highTemp = document.getElementById('highTemp');
    const lowTemp = document.getElementById('lowTemp');
    const imageRes = document.getElementById('image');

    const arr = [tripTitle, tripDate, tripDays, highTemp, lowTemp, imageRes]
    
    for(let i = 0; i < arr.length; i++) {
        
        if(arr[i].style.animationName === 'resultsAnim') {
        arr[i].style.animationName = 'none';
        setTimeout(function(){ arr[i].style.animationName = 'resultsAnim'; }, 500);
       } else {
        arr[i].style.animationName = 'resultsAnim';
       }
    }
    
}