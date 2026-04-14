// Import header & footer loader
import { loadHeaderFooter } from './utils.js';

// Load header and footer
loadHeaderFooter();

// Load categories from API (second endpoint)
loadCategories();


// 🔍 SEARCH BUTTON EVENT
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', searchRecipes);

const randomBtn = document.getElementById('randomBtn');
randomBtn.addEventListener('click', getRandomMeal);

const drinkBtn = document.getElementById('drinkBtn');
drinkBtn.addEventListener('click', getRandomDrink);

// ⌨️ SEARCH ON ENTER KEY
document.getElementById('searchInput')
  .addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchRecipes();
    }
});


// 📂 LOAD CATEGORIES FROM API
async function loadCategories() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    );

    const data = await response.json();

    const categorySelect = document.getElementById('categoryFilter');

    // Add categories dynamically
    data.categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.strCategory;
      option.textContent = cat.strCategory;

      categorySelect.appendChild(option);
    });

  } catch (error) {
    console.error('Error loading categories:', error);
  }
}


// 🔍 SEARCH RECIPES
async function searchRecipes() {
  const results = document.getElementById('results');

  // Show loading spinner (better UX)
  results.innerHTML = '<div class="loader"></div>';

  const ingredient = document.getElementById('searchInput').value;
  const category = document.getElementById('categoryFilter').value;

  // Validation
  if (!ingredient && !category) {
    results.innerHTML = '<p>⚠️ Enter ingredient or select category</p>';
    return;
  }

  try {
    let url = '';

    // Use ingredient OR category
    if (ingredient) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    displayRecipes(data.meals);

  } catch (error) {
    console.error('Error fetching recipes:', error);
    results.innerHTML = '<p>❌ Failed to load recipes. Try again.</p>';
  }
}

// 🎲 RANDOM RECIPE
async function getRandomMeal() {
  const results = document.getElementById('results');

  results.innerHTML = '<p>Loading random recipe...</p>';

  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    );

    const data = await response.json();
    const meal = data.meals[0];

    showMealDetails(meal); // reuse your existing function

  } catch (error) {
    console.error('Error fetching random meal:', error);
    results.innerHTML = '<p>❌ Failed to load random recipe.</p>';
  }
}

async function getRandomDrink() {
  const results = document.getElementById('results');

  results.innerHTML = '<p>Loading drink...</p>';

  try {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );

    const data = await response.json();
    const drink = data.drinks[0];

    showDrink(drink);

  } catch (error) {
    console.error(error);
    results.innerHTML = '<p>❌ Failed to load drink</p>';
  }
}

function showDrink(drink) {
  const results = document.getElementById('results');

  results.innerHTML = `
    <div class="details-container">
      <h2>${drink.strDrink}</h2>
      <img src="${drink.strDrinkThumb}" />

      <h3>🥤 Instructions</h3>
      <p>${drink.strInstructions}</p>

      <button id="backBtn">⬅ Back</button>
    </div>
  `;

  document.getElementById('backBtn').addEventListener('click', () => {
    results.innerHTML = '';
  });
}


// 🧾 DISPLAY SEARCH RESULTS
function displayRecipes(meals) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  // Handle no results
  if (!meals) {
    results.innerHTML = '<p>😔 No recipes found. Try another search.</p>';
    return;
  }

  // Create cards dynamically
  meals.forEach(meal => {
    const div = document.createElement('div');
    div.classList.add('favorite-card');

    div.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>${meal.strMeal}</h3>
    `;

    // Click to view details
    div.addEventListener('click', () => {
      getMealDetails(meal.idMeal);
    });

    results.appendChild(div);
  });
}


// 📖 GET FULL MEAL DETAILS
async function getMealDetails(id) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const data = await response.json();
    const meal = data.meals[0];

    showMealDetails(meal);

  } catch (error) {
    console.error('Error fetching meal details:', error);
  }
}


// 🍽️ SHOW MEAL DETAILS
function showMealDetails(meal) {
  const results = document.getElementById('results');

  // 🧂 BUILD INGREDIENT LIST
  let ingredientsHTML = '<ul>';

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      ingredientsHTML += `<li>${measure} ${ingredient}</li>`;
    }
  }

  ingredientsHTML += '</ul>';

  // 📖 SPLIT INSTRUCTIONS INTO STEPS
  const steps = meal.strInstructions
    .split(/[\.\n]/)
    .filter(step => step.trim() !== '');

  let instructionsHTML = '<ol>';

  steps.forEach(step => {
    instructionsHTML += `<li>${step.trim()}</li>`;
  });

  instructionsHTML += '</ol>';

  // 🎥 VIDEO EMBED
  let videoHTML = '';
  if (meal.strYoutube) {
    const videoId = meal.strYoutube.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    videoHTML = `
      <h3>🎥 Cooking Video</h3>
      <iframe src="${embedUrl}" allowfullscreen></iframe>
    `;
  }

  // DISPLAY DETAILS
  results.innerHTML = `
    <div class="details-container">

      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

      <button id="saveBtn">❤️ Save to Favorites</button>

      <h3>🧂 Ingredients</h3>
      ${ingredientsHTML}

      <h3>📖 Instructions</h3>
      ${instructionsHTML}

      ${videoHTML}

      <button id="backBtn">⬅ Back</button>
    </div>
  `;

  // Save to favorites
  document.getElementById('saveBtn').addEventListener('click', () => {
    saveToFavorites(meal);
  });

  // Back button
  document.getElementById('backBtn').addEventListener('click', () => {
  searchRecipes(); // reload results properly
});
}


// ⭐ SAVE TO FAVORITES
function saveToFavorites(meal) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Prevent duplicates
  const exists = favorites.find(item => item.idMeal === meal.idMeal);

  if (exists) {
    alert('Already in favorites');
    return;
  }

  // Save object
  favorites.push({
    idMeal: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb
  });

  localStorage.setItem('favorites', JSON.stringify(favorites));

  alert('Saved to favorites ❤️');
}