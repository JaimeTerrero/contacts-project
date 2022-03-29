import { showAlert } from './functions.js';

(function(){
    let DB;
    let idPersona;

    const InputfirstName = document.querySelector('#first-name');
    const InputlastName = document.querySelector('#last-name');
    const InputEmail = document.querySelector('#email');
    const InputTelephoneNumber = document.querySelector('#phone-number');

    const form = document.querySelector('#form');

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        // Update the user information
        form.addEventListener('submit', actualizarCliente);

        // Verifying URL's ID
        const parametrosURL = new URLSearchParams(window.location.search);
        idPersona = parametrosURL.get('id');
        if(idPersona){
            setTimeout(() => {
                obtenerCliente(idPersona);
            }, 100);
        }
    });

    function actualizarCliente(e){
        e.preventDefault();

        if(InputfirstName.value === '' || InputlastName.value === '' || InputEmail.value === '' || InputTelephoneNumber.value === ''){
            showAlert('Todos los campos son obligatorios', 'error');

            return;
        }

        // Update user's information 
        const updatedInformation = {
            nombre : InputfirstName.value,
            apellido : InputlastName.value,
            email : InputEmail.value,
            telefono : InputTelephoneNumber.value,
            id : Number(idPersona)
        }

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.put(updatedInformation);

        transaction.oncomplete = function(){
            showAlert('Editado Correctamente');

            setTimeout(() => {
                window.location.href = 'contacts.html';
            }, 3000);
        }

        transaction.onerror = function(){
            showAlert('Hubo un error', 'error');
        }
    }

    function obtenerCliente(id){
        const transaction = DB.transaction(['crm'], 'readonly');
        const objectStore = transaction.objectStore('crm');

        const persona = objectStore.openCursor();
        persona.onsuccess = function(e){
            const cursor = e.target.result;

            if(cursor){
                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    function llenarFormulario(datosPersona){
        const { nombre, apellido, email, telefono } = datosPersona;

        InputfirstName.value = nombre;
        InputlastName.value = apellido;
        InputEmail.value = email;
        InputTelephoneNumber.value = telefono;
    }

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function(){
            console.log('Hubo un error');
        };

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        }
    }
})();