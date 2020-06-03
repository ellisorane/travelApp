import { deleteItems } from './deleteItems'

export const saveNote = () => {

    const saveBtn = document.getElementById('save')
    const list = document.getElementById('note-list')
    const userNote = document.getElementById('userNote')
    const errorNote = document.getElementById('error-note');

    let noteItem
    let noteId


    const entry = (input, id) => {
        deleteItems()
        errorNote.textContent = ''
        noteItem = document.createElement('li')
        noteItem.setAttribute('class', 'note-item')
        noteItem.setAttribute('id', `note-${id}`)
        noteItem.innerHTML = `<div class="row note-row"><div class="col-11 saved-info"><p>${input}</p></div><div class="col-1"><button class="btn btn-danger delete-btn fa fa-trash"></button></div></div>`
        list.appendChild(noteItem)
        // console.log(noteItem)
    }

    const getLastIndex = () => {
        if (localStorage.length !== 0) {
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

    
    saveBtn.addEventListener('click', () => {
        if(userNote.value === '') {
            errorNote.textContent = 'No note to post'
            throw Error('No note to post');
        }
        if(localStorage.key(0)) {
            if(!localStorage.key(0).match(/(\d+)/)) {
                localStorage.clear(); 
            }
        }
        getLastIndex();
                
        //Add note to localStorage and assign note id 
        localStorage.setItem(`note-${noteId}`, userNote.value);
        
        entry(userNote.value, noteId);
        deleteItems()
        //Clear input 
        userNote.value = ''
    })

    const loadPrevs = () => {
        if(localStorage) {
            getLastIndex();
            for(let i = 0; i <= noteId; i++) {
                const lsKeys = localStorage.getItem(`note-${i}`)
                if(lsKeys) {
                    entry(lsKeys, i)
                    deleteItems()
                } 
            }
        }
    }

    loadPrevs()
};