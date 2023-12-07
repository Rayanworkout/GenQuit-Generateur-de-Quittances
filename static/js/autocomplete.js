
// Handling the styling of elements to encapsulate the autocomplete feature
function addAutocompleteStyles() {
  const style = document.createElement('style');
  style.textContent = `
  .dropdown {
    background-color: #fff;
    position: absolute !important;
    z-index: 1000;
    border-radius: 10px;
    border-top: 1px solid #d9d9d9;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden; 
    max-width: 90%;
}

.list-item {
    cursor: pointer;
    padding: 0 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 30px;
    text-align: left;
    border-top: 1px solid #e6e6e6;
    font-size: 14px;
    color: #353535
}

.list-item:hover {
    background-color: #b3b3b3
}

.list-item.selected {
    background-color: #b3b3b3
}

.icon {
    width: 20px;
    margin-right: 7px;
    margin-top: 6px;
    display: inline-block;
    vertical-align: top;
    background-size: 34px
}
    }
  `;
  document.head.appendChild(style);
}

// Waiting for the DOM to be loaded before adding the styles
document.addEventListener('DOMContentLoaded', function () {
  addAutocompleteStyles();
});

const initFrenchAutocomplete = (input) => {

  // Creating a dropdown container for the suggestions
  const dropdownList = document.createElement('div');
  dropdownList.classList.add('dropdown');

  // Insert the dropdown container after the input field
  input.parentNode.insertBefore(dropdownList, input.nextSibling);


  // Function to update the visual selection of suggestions
  function updateSelection(selectedSuggestionIndex) {
    const suggestions = dropdownList.children;
    for (let i = 0; i < suggestions.length; i++) {
      // Adding the selected class to the suggestion to hover it
      if (i === selectedSuggestionIndex) {
        suggestions[i].classList.add('selected');
      } else {
        suggestions[i].classList.remove('selected');
      }
    }
  }


  // Function to make async request to the API and return the address suggestions
  const getSuggestions = async (userInput, limit = 5) => {
    // with lat and lon parameters we can give a priority to the suggestions
    // "https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&lat=48.789&lon=2.789"

    // API URL (q represents the query string)
    const apiUrl = "https://api-adresse.data.gouv.fr/search/?q=";

    const response = await fetch(apiUrl + userInput.toLowerCase() + '&limit=' + limit);
    const data = await response.json();
    return data.features.map(feature => feature.properties.label)
  }

  // Function to display the suggestion under the input field
  const displaySuggestions = (data) => {
    dropdownList.innerHTML = '';

    // For each element we create a suggestion element
    data.forEach(element => {
      const suggestion = document.createElement('p');

      // and we populate it with the element value
      suggestion.classList.add('list-item');
      suggestion.textContent = element;

      // We also add a logo before the address
      const img = document.createElement('img');
      img.src = 'https://cdn.jsdelivr.net/gh/rayanworkout/French-Address-Autocomplete@master/icon.svg';
      img.classList.add('icon');
      suggestion.insertBefore(img, suggestion.firstChild);

      // If a suggestion is clicked, we update the input field value
      // and empty the dropdown list
      suggestion.addEventListener('click', function () {
        input.value = element;
        dropdownList.innerHTML = '';
      });

      // We finally add the suggestion to the dropdown list
      dropdownList.appendChild(suggestion);
    });
  };


  // Event listener for the input field
  input.addEventListener('input', async (e) => {
    const userInput = e.currentTarget.value.toLowerCase();

    if (userInput === '') {
      // I empty the dropdown list if the input field is empty
      dropdownList.innerHTML = '';
      return;
    } else if (userInput.length > 4) {
      // And I start to fetch suggestions only if the user
      // has typed at least 5 characters
      const suggestions = await getSuggestions(userInput);
      displaySuggestions(suggestions);

      // I also add a keyboard event listener to the input field
      let selectedSuggestionIndex = -1;

      input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          // If arrow down, we select the next suggestion by incrementing the index
          if (selectedSuggestionIndex < dropdownList.children.length - 1) {
            selectedSuggestionIndex++;
            // And we call updateSelection to update the visual selection
            updateSelection(selectedSuggestionIndex);
          }
        } else if (e.key === 'ArrowUp') {
          // If arrow up, we select the previous suggestion by decrementing the index
          e.preventDefault();
          if (selectedSuggestionIndex > 0) {
            selectedSuggestionIndex--;
            updateSelection(selectedSuggestionIndex);
          }
        } else if (e.key === 'Enter' && selectedSuggestionIndex !== -1) {
          // if enter key is pressed, we update the input field value
          e.preventDefault(); // Prevent submitting the form
          // only if a suggestion is selected and has a valid index
          if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < dropdownList.children.length) {

            input.value = dropdownList.children[selectedSuggestionIndex].textContent;
            // and we empty the dropdown list
            dropdownList.innerHTML = '';
          }
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function (event) {
        const isClickInsideInput = input.contains(event.target);
        const isClickInsideDropdown = dropdownList.contains(event.target);

        if (!isClickInsideInput && !isClickInsideDropdown) {
          // Click was outside both input and dropdown, close dropdown
          dropdownList.innerHTML = '';
        }
      });
    }
  });

};

