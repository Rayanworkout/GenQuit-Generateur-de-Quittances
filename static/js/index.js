
////////////////// FUNCTIONS //////////////////////


// Monitoring when download button is clicked
const downloadBtn = document.querySelector('.download-btn')

downloadBtn.addEventListener('click', function () {

    // Getting the values of the fields
    const proprioName = document.getElementById('proprio-name').value;
    const proprioAddress = document.getElementById('proprio-address').value;
    const locataireName = document.getElementById('locataire-name').value;
    const locataireAddress = document.getElementById('locataire-address').value;
    const month = document.getElementById('preview-month').value;
    const date = getDate();
    const periodeFrom = document.getElementById('date-from').value;
    const periodeTo = document.getElementById('date-to').value;
    const loyerHc = document.getElementById('loyer-ht-input').value;
    const charges = document.getElementById('charges-input').value;
    const total = +loyerHc + +charges;

    console.log(proprioName, proprioAddress, locataireName, locataireAddress, month, date, periodeFrom, periodeTo, loyerHc, charges, total)

    // Checking if all fields are filled
    if (!proprioName || !proprioAddress || !locataireName || !locataireAddress || !month || !periodeFrom || !periodeTo || !loyerHc || !charges) {
        window.alert("Veuillez remplir tous les champs")
    } else {

        // Calling the function to create the quittance
        createQuittance(proprioName,
            proprioAddress,
            locataireName,
            locataireAddress,
            month,
            date,
            periodeFrom,
            periodeTo,
            loyerHc,
            charges,
            total
        )
    }

})



// Fonction to get today's date

function getDate() {
    const today = new Date();
    const day = today.getDay();
    const month = today.getMonth();
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
    return `${fullMonth} ${year}`
}


// Fonction to apply the formatted month to the preview

function applyFormattedMonth(dateObject) {
    const fullMonth = getMonthAndYear(dateObject)
    const monthPreview = document.getElementById('preview-month')

    monthPreview.textContent = fullMonth

    return fullMonth

}


////////////////// PREVIEW //////////////////////////

// Assigning the date value to my preview

const previewDate = document.getElementById('date-today')
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

const loyerField = document.getElementById('loyer-ht-input');

const chargesField = document.getElementById('charges-input');


// Using global variable with totalField because the script is short


function updateTotal() {
    const loyerValue = parseInt(loyerField.value) || 0;
    const chargesValue = parseInt(chargesField.value) || 0;
    const totalValue = loyerValue + chargesValue;


    const totalField = document.getElementById('total-input')

    const totalPreview = document.getElementById('total');

    // Updating the total
    totalField.textContent = totalValue;

    // And then the Preview
    totalPreview.textContent = totalValue;

}

// Check when one of these fields is updated
loyerField.addEventListener('input', updateTotal);
chargesField.addEventListener('input', updateTotal);


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




