let travelData = null;

fetch('travel_recommendation_api.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Travel Recommendations:', data);
    travelData = data; // Store data globally
  })
  .catch(error => {
    console.error('Error loading travel data:', error);
  });

// Function to display recommendations
function displayRecommend(keyword) {
  const container = document.getElementById('recommendations');
  container.innerHTML = ''; // Clear previous results

  if (!travelData) {
    container.innerHTML = '<p>Data is still loading...</p>';
    return;
  }

  const searchTerm = keyword.toLowerCase();
  let resultsFound = false;

  // Search in countries/cities
  if (searchTerm.includes('country') || searchTerm.includes('countries') || searchTerm.includes('city') || searchTerm.includes('cities')) {
    travelData.countries.forEach(country => {
      country.cities.forEach(city => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${city.name}</h3>
          <img src="${city.imageUrl}" alt="${city.name}" />
          <p>${city.description}</p>
        `;
        container.appendChild(card);
        resultsFound = true;
      });
    });
  }

  // Search in temples
  if (searchTerm.includes('temple') || searchTerm.includes('temples')) {
    travelData.temples.forEach(temple => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${temple.name}</h3>
        <img src="${temple.imageUrl}" alt="${temple.name}" />
        <p>${temple.description}</p>
      `;
      container.appendChild(card);
      resultsFound = true;
    });
  }

  // Search in beaches
  if (searchTerm.includes('beach') || searchTerm.includes('beaches')) {
    travelData.beaches.forEach(beach => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${beach.name}</h3>
        <img src="${beach.imageUrl}" alt="${beach.name}" />
        <p>${beach.description}</p>
      `;
      container.appendChild(card);
      resultsFound = true;
    });
  }

  if (!resultsFound) {
    container.innerHTML = '<p>No recommendations found. Try searching for "beaches", "temples", or "countries".</p>';
  }
}

// Add event listener to search form
document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page reload
  const searchValue = document.getElementById('conditionInput').value;
  if (searchValue.trim() !== '') {
    displayRecommend(searchValue);
  } else {
    alert('Please enter a search term');
  }
});

// Add event listener to clear button
document.getElementById('btnClear').addEventListener('click', function() {
  document.getElementById('conditionInput').value = '';
  document.getElementById('recommendations').innerHTML = '';
});