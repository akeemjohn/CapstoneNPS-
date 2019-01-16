'use strict';

const apiKey = 'ZW2lyeyYqUPrfRBpaDNkqemAD1uHwTGFIjjicR0P';
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  // if there are previous results, remove them
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li>
        <h3>Park: ${responseJson.data[i].fullName}</h3>
        <p>Description: ${responseJson.data[i].description}</p>
        <a target='_blank' href="${responseJson.data[i].url}">Link:${responseJson.data[i].url}</a> 
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(query) {
  const states = []
  const params = {
    api_key: apiKey,
    stateCode: query.split(','),
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

 fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getParks(searchTerm);
  });
}

$(watchForm);