import { loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const container = document.getElementById('favorites');

// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// If no favorites
if (favorites.length === 0) {
  container.innerHTML = '<p>No favorites yet 😔</p>';
} else {
  favorites.forEach(meal => {
    const div = document.createElement('div');
    div.classList.add('favorite-card');

    div.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}" />
      <h3>${meal.name}</h3>
      <button class="remove-btn" data-id="${meal.idMeal}">❌ Remove</button>
    `;

    // Remove button
    div.querySelector('.remove-btn').addEventListener('click', (e) => {
      e.stopPropagation(); // prevent card click

      removeFavorite(meal.idMeal);

      div.remove(); // remove from UI instantly
    });

    container.appendChild(div);
  });
}


// REMOVE FUNCTION
function removeFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites = favorites.filter(item => item.idMeal !== id);

  localStorage.setItem('favorites', JSON.stringify(favorites));
}