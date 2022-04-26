export function showAlert(message, tipo){
    const existingAlert = document.querySelector('.alert');

    if(!existingAlert){
        // Creating alert
        const divMessage = document.createElement('div');
        divMessage.classList.add('px-4', 'py-3', 'mt-8','rounded', 'max-w-lg', 'mx-auto',  'text-center', 'border', 'alert');

        if(tipo === 'error'){
            divMessage.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        }else{
            divMessage.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        }

        divMessage.textContent = message;

        result.appendChild(divMessage);

        setTimeout(() => {
            divMessage.remove();
        }, 3000);
    }
}

export function cleanHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}

export function Spinner(){
    // Cleaning the HMTL
    cleanHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;

    result.appendChild(divSpinner);

    setTimeout(() => {
        divSpinner.remove();
    }, 500);
}