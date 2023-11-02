
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

