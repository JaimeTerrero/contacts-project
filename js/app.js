import { showAlert, cleanHTML, Spinner } from './functions.js';

const form = document.querySelector('#form');
const result = document.querySelector('#result');

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', formSubmit);
});

function formSubmit(e){
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    Spinner();

    // Validate form infomation data
    if(email === '' || password === ''){
        setTimeout(() => {
            showAlert('Todos los campos son obligatorios', 'error');
        }, 750);
    }else{
        setTimeout(() => {
            showAlert('Datos correctos');

            setTimeout(() => {
                window.location.href = 'src/contacts.html';
            }, 2000);
        }, 1000);
    }
}