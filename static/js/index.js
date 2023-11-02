
// Cours OpenClassroom CSS

// import { jsPDF } from "jspdf";


// Fonction to get date
// id="date-today
// id = current-month





// Get all input fields + preview fields of the page and add an
// event listener to mirror the content

const inputFields = document.querySelectorAll('input, input[id$="charges-input"], input[id$="loyer-ht-input"]');
const previewElements = document.querySelectorAll('p[id$="-preview"], span[id$="-preview"], [id$="charges"], [id$="loyer-ht"]');


inputFields.forEach((input, index) => {
    input.addEventListener('input', function () {
        const inputValue = input.value;
        previewElements[index].textContent = inputValue;
    });
});


// Adding event listener to auto-calculate total and fill preview

const loyerField = document.getElementById('loyer-ht-input');

const chargesField = document.getElementById('charges-input');

const totalField = document.getElementById('total-input')

const totalPreview = document.getElementById('total');


// Using global variable with totalField because the script is short


function updateTotal() {
    const loyerValue = parseInt(loyerField.value) || 0;
    const chargesValue = parseInt(chargesField.value) || 0;
    const totalValue = loyerValue + chargesValue;

    totalField.textContent = totalValue;

    // Updating the Preview
    totalPreview.textContent = totalValue

}


loyerField.addEventListener('input', updateTotal);
chargesField.addEventListener('input', updateTotal);
