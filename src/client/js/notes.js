export const saveNote = () => {
   
    const clearAllBtn = document.getElementById('clear');
    const saveBtn = document.getElementById('save');
    const list = document.getElementById('note-list');
    const userNote = document.getElementById('userNote');
    const deleteBtn = document.getElementById('delete-single');
    let noteItem;
    let noteId;

    //Create note and display in UI
    function entry(input, id) {

        const errorNote = document.getElementById('error-note');
        if(input === '') {
            errorNote.innerHTML = 'No note to post';
            
        } else {
            noteItem = document.createElement('li');
            noteItem.innerHTML = input;
            //clear error note
            errorNote.textContent = '';
            //Add noteId as id attribute to each entry
            noteItem.setAttribute('id', `note-${id}`);
            //Add note to the list
            list.appendChild(noteItem);
            // console.log(noteItem);

        }
        
        //select note to delete
        noteItem.addEventListener('click', function(e) {
            $(this).addClass('select-item');
            $(this).siblings().removeClass('select-item');
            
        });
        
        //Delete selected note
        deleteBtn.addEventListener('click', function() {
            localStorage.removeItem($('.select-item').attr('id'));
            $('.select-item').remove();
        
        });

    };

    const getLastIndex = () => {
        if (localStorage.length !== 0) {
            // noteId = localStorage.length + 1;
            let changeToInt
            let lastIndexToInt;
            let newArr = [];
            let noteArr = [];
            
            for(let i = 0; i < localStorage.length; i++) {
                let noteStr = localStorage.key(i);
                let noteIndex = noteStr.match(/(\d+)/);
                if(noteIndex !== null ) {
                    noteArr.push(noteIndex);
                } 
                if(typeof noteArr[i] !== 'undefined'){
                    changeToInt = parseInt(noteArr[i][1]);
                    newArr.push(changeToInt);
                    // console.log(newArr);
                }
            } 
            lastIndexToInt = Math.max(...newArr);
            // console.log(lastIndexToInt);

            noteId = lastIndexToInt + 1;

        } else {
            noteId = 0;
        }
    }

    //Save note
    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        //
        if(localStorage.key(0)) {
            if(!localStorage.key(0).match(/(\d+)/)) {
                localStorage.clear(); 
            } else {
                console.log('Local storage is empty');
            }
        }
        
        getLastIndex();
        
        //Add note to localStorage and assign note id 
        localStorage.setItem(`note-${noteId}`, userNote.value);
        
        entry(userNote.value, noteId);
        userNote.value = '';
    });
    
    function loadPrevs() {
        if(localStorage) {
            getLastIndex();
            for(let i = 0; i <= noteId; i++) {
                const lsKeys = localStorage.getItem(`note-${i}`); 
                if(lsKeys) {
                    entry(lsKeys, i);
                } 
            }
        }
    }

    loadPrevs();
    
    //Clear All notes
    clearAllBtn.addEventListener('click', function() {
        //Reset noteId when all list is cleared
        localStorage.clear();
        while (list.firstChild) {
          list.removeChild(list.firstChild);
        }
        noteId = 0;
    });

};