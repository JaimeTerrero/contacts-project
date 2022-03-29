(function(){
    const btnSend = document.querySelector('#button');

    btnSend.addEventListener('click', function(e) {
        e.preventDefault();

        
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;

        if(name === '' || email === '' || message === ''){
            showAlert('Todos los campos son obligatorios', 'error');
        }else{
            btnSend.value = 'Sending...';
            window.location.href = `mailto:${email}?subject=EnviadoDesdeFormulario
            &body=Nombre%3A ${name}%0AMensaje%3A ${message}`;

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    });

    function showAlert(message, tipo){
        const existingAlert = document.querySelector('.alert');
    
        if(!existingAlert){
            // Creating alert
            const divMessage = document.createElement('div');
            divMessage.classList.add('px-4', 'py-2', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alert');
    
            if(tipo === 'error'){
                divMessage.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            }else{
                divMessage.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
            }
    
            divMessage.textContent = message;
    
            form.appendChild(divMessage);
    
            setTimeout(() => {
                divMessage.remove();
            }, 3000);
        }
    }
})();