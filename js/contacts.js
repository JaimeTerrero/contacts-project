(function(){

    let DB;
    const listadoClientes = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if(window.indexedDB.open('crm', 1)){
            obtenerClientes();
        }

        listadoClientes.addEventListener('click', eliminarRegistro);
    });

    function eliminarRegistro(e){
        if(e.target.classList.contains('eliminar')){
            const idEliminar = Number(e.target.dataset.cliente);

            const confirmar = confirm('¿Deseas eliminar este contacto? ');

            if(confirmar){
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.oncomplete = function(){
                    console.log('Eliminado....');

                    e.target.parentElement.parentElement.remove();
                };

                transaction.onerror = function(){
                    console.log('Hubo un error');
                }
            }
        }
    }

    // Creating IndexDB database
    function crearDB(){
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = function(){
            console.log('Hubo un error');
        };

        crearDB.onsuccess = function(){
            DB = crearDB.result;
        };

        crearDB.onupgradeneeded = function(e){
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('apellido', 'apellido', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: true });
            objectStore.createIndex('id', 'id', { unique: true });

            console.log('DB Lista y Creada');
        }
    }

    function obtenerClientes(){
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function(){
            console.log('Hubo un error');
        };

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            objectStore.openCursor().onsuccess = function(e){
                const cursor = e.target.result;

                if(cursor){
                    const {	nombre, apellido, email,telefono, id } = cursor.value;

                    
                    listadoClientes.innerHTML += `
                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700 font-bold">${apellido} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-700 font-bold">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-700 font-bold">${email}</p>
                            </td>
                            <td class="p-4 leading-5 ">
                                <a href="editContactForm.html?id=${id}" class="p-2 text-white font-bold bg-green-500 hover:bg-green-600 border-none rounded uppercase mr-5">Editar</a>
                                <a href="email.html?id=${id}" class="p-2 text-white font-bold bg-blue-600 hover:bg-blue-700 border-none rounded uppercase mr-5">Enviar Correo</a>
                                <a href="#" data-cliente="${id}" class="p-2 text-white font-bold bg-red-600 hover:bg-red-700 border-none rounded uppercase mr-5 eliminar">Eliminar</a>
                            </td>
                        </tr>
                        `;


                    cursor.continue();
                }else{
                    console.log('No hay más registros');
                }
            }
        }
    }
})();