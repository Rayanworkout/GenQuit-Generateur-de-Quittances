
////////////////// FUNCTIONS //////////////////////

// Initializing autocomplete for address fields

const proprioAddress = document.querySelector('#proprio-address');
const locataireAddress = document.querySelector('#locataire-address');


initFrenchAutocomplete(proprioAddress);
initFrenchAutocomplete(locataireAddress);



// Function to split address in case it is too long
function splitAddress(address) {
    if (typeof address !== 'string') {
        throw new Error('Address should be a string');
    }

    const maxLength = 25;
    if (address.length > maxLength) {
        const firstHalf = address.substring(0, maxLength);
        const indexOfLastSpace = firstHalf.lastIndexOf(' ');

        let splitIndex = maxLength;
        if (indexOfLastSpace !== -1) {
            splitIndex = indexOfLastSpace;
        }

        const firstPart = address.substring(0, splitIndex);
        const secondPart = address.substring(splitIndex).trim();

        return `${firstPart}\n${secondPart}`;
    } else {
        return address;
    }
}


// Fonction to get today's date

function getDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear()

    const formattedToday = `${day}/${month}/${year}`

    return formattedToday
}

// Function to convert datetime object to full month name

function getMonthAndYear(dateObject) {

    const months = {
        0: 'Janvier',
        1: 'Février',
        2: 'Mars',
        3: 'Avril',
        4: 'Mai',
        5: 'Juin',
        6: 'Juillet',
        7: 'Août',
        8: 'Septembre',
        9: 'Octobre',
        10: 'Novembre',
        11: 'Décembre'
    }

    const month = dateObject.getMonth();
    const fullMonth = months[month]
    const year = dateObject.getFullYear()

    if ([3, 7, 9].includes(month)) {
        return `d'${fullMonth} ${year}`
    } else {
        return `de ${fullMonth} ${year}`

    }


}


// Fonction to apply the formatted month to the preview

function applyFormattedMonth(dateObject) {
    const fullMonth = getMonthAndYear(dateObject)
    const monthPreview = document.querySelector('#preview-month')

    monthPreview.textContent = fullMonth

    return fullMonth

}


// Customizing date picker fields with flatpicker

dateFields = document.querySelectorAll('.date-picker');

dateFields.forEach((element, index) =>
    flatpickr(element, {
        dateFormat: "d/m/Y",
        onChange: function (selectedDates) {
            if (index == 0) {
                applyFormattedMonth(selectedDates[0]);
            }
        }
    }
    ));


// Adding the download button when preview box is not visible under 768px

const screenWidth = window.innerWidth;

if (screenWidth < 768) {
    const btnContainer = document.querySelector('#form-container');

    const downloadBtnDiv = document.createElement('div');
    downloadBtnDiv.classList.add('btn-container');

    const downloadBtn = document.createElement('button');
    downloadBtn.classList.add('btn', 'my-btn', 'download-btn');
    downloadBtn.textContent = "Télécharger";

    downloadBtnDiv.appendChild(downloadBtn);

    btnContainer.appendChild(downloadBtnDiv);

};


////////////////// PREVIEW //////////////////////////

// Assigning the date value to my preview

const previewDate = document.querySelector('#date-today')
previewDate.textContent = getDate()


// Get all input fields + preview fields of the page


const inputFields = document.querySelectorAll('input, input[id$="charges-input"], input[id$="loyer-ht-input"]');
const previewElements = document.querySelectorAll('p[id$="-preview"], span[id$="-preview"], [id$="charges"], [id$="loyer-ht"]');


// add an event listener for each to mirror the content

inputFields.forEach((input, index) => {
    input.addEventListener('input', function () {
        const inputValue = input.value;
        previewElements[index].textContent = inputValue;
    });
});


// Adding event listener to auto-calculate total and fill preview

const loyerField = document.querySelector('#loyer-ht-input');

const chargesField = document.querySelector('#charges-input');


// Using global variable with totalField because the script is short


function updateTotal() {
    const loyerValue = parseInt(loyerField.value) || 0;
    const chargesValue = parseInt(chargesField.value) || 0;
    const totalValue = loyerValue + chargesValue;


    const totalField = document.querySelector('#total-input')

    const totalPreview = document.querySelector('#total');

    // Updating the total
    totalField.textContent = totalValue;

    // And then the Preview
    totalPreview.textContent = totalValue;

}

// Check when one of these fields is updated
loyerField.addEventListener('input', updateTotal);
chargesField.addEventListener('input', updateTotal);



///////////////// DOWNLOAD /////////////////////////

// Monitoring when download button is clicked
const downloadBtn = document.querySelector('.download-btn')

downloadBtn.addEventListener('click', function () {

    // Getting the values of the fields
    const proprioName = document.querySelector('#proprio-name').value;
    const proprioAddress = document.querySelector('#proprio-address').value;
    const locataireName = document.querySelector('#locataire-name').value;
    const locataireAddress = document.querySelector('#locataire-address').value;
    const month = document.querySelector('#preview-month').textContent;
    const date = getDate();
    const periodeFrom = document.querySelector('#date-from').value;
    const periodeTo = document.querySelector('#date-to').value;
    const loyerHc = document.querySelector('#loyer-ht-input').value;
    const charges = document.querySelector('#charges-input').value;
    const total = +loyerHc + +charges;


    // Checking if all fields are filled
    if (!proprioName || !proprioAddress || !locataireName || !locataireAddress || !month || !periodeFrom || !periodeTo || !loyerHc || !charges) {
        window.alert("Veuillez remplir tous les champs.")
    } else {

        // Calling the function to create the quittance
        const result = createQuittance(proprioName,
            proprioAddress,
            locataireName,
            locataireAddress,
            month,
            date,
            periodeFrom,
            periodeTo,
            loyerHc,
            charges,
            total.toString()
        )
        if (!result) {
            window.alert("Une erreur est survenue. Veuillez réessayer.")
        }
    }

})
