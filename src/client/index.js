import {submit} from './js/app';
import { checkInput } from './js/checkInput'
import { saveNote } from './js/notes';
import './styles/styles.scss';
import logo from './media/airplane.png';


saveNote(); 

const img = document.getElementById('airplane');
img.src = logo; 