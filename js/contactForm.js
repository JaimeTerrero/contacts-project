import { showAlert, Spinner } from './functions.js';

(function(){
    let DB;
    const form = document.querySelector('#form');
    const result = document.querySelector('#result');

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        form.addEventListener('submit', validarCliente);
    });

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function(){
            console.log('Hubo un error');
        };

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        }
    }

    function validarCliente(e){
        e.preventDefault();

        // Read all the inputs
        const nombre = document.querySelector('#first-name').value;
        const apellido = document.querySelector('#last-name').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#phone-number').value;

        Spinner();

        if(nombre === '' || apellido === '' | email === '' | telefono === ''){
            showAlert('Todos los campos son obligatorios', 'error');
            return;
        }

        // Crear un objeto con la información

        const cliente = {
            nombre,
            apellido,
            email,
            telefono,
            id : Date.now()
        }

        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.add(cliente);

        transaction.oncomplete = () => {
            console.log('Contacto Agregado');

            // Showing a message to know that everything is all right
            showAlert('Se agregó correctamente');

            setTimeout(() => {
                window.location.href = 'contacts.html';
            }, 3000);
        };

    }

})();