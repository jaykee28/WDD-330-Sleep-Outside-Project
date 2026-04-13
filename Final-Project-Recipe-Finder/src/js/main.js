const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', searchRecipes);

async function searchRecipes() {
  const ingredient = document.getElementById('searchInput').value;

  if (!ingredient) {
    alert('Please enter an ingredient');
    return;
  }

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    const data = await response.json();

    displayRecipes(data.meals);

  } catch (error) {
    console.error(error);
  }
}

function displayRecipes(meals) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  if (!meals) {
    results.innerHTML = '<p>No recipes found</p>';
    return;
  }

  meals.forEach(meal => {
    const div = document.createElement('div');

    div.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" />
    `;

    results.appendChild(div);
  });
}