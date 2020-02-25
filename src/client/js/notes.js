export const saveNote = () => {
   
    const deleteBtn = document.getElementById('clear');
    const saveBtn = document.getElementById('save');
    const list = document.getElementById('list');
    const userNote = document.getElementById('userNote');

    //Check for saved notes
    let notesArr = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []
    
    localStorage.setItem('notes', JSON.stringify(notesArr));
    const data = JSON.parse(localStorage.getItem('notes'));

    //Create note and display in UI
    const entry = (input) => {
        const liElement = document.createElement('li');
        liElement.textContent = input;
        list.appendChild(liElement);
    };

    //Save note
    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();

        notesArr.push(userNote.value);
        localStorage.setItem('notes', JSON.stringify(notesArr));

        entry(userNote.value);
        userNote.value = '';

    });

    data.forEach((note) => {
        entry(note);
    });

    //Delete notes
    deleteBtn.addEventListener('click', function() {
        localStorage.clear();
        while (list.firstChild) {
          list.removeChild(list.firstChild);
        }
    });

};