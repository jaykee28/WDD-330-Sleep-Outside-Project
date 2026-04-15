var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function n(){let e=document.querySelector(`header`),t=document.querySelector(`footer`);try{e&&(e.innerHTML=await(await fetch(`/partials/header.html`)).text()),t&&(console.log(`FOOTER ELEMENT:`,t),t.innerHTML=await(await fetch(`/partials/footer.html`)).text())}catch(e){console.error(`Error loading header/footer:`,e)}}var r=e((()=>{}));t((()=>{r(),n(),e(),document.getElementById(`searchBtn`).addEventListener(`click`,t),document.getElementById(`randomBtn`).addEventListener(`click`,i),document.getElementById(`drinkBtn`).addEventListener(`click`,a),document.getElementById(`searchInput`).addEventListener(`keypress`,e=>{e.key===`Enter`&&t()});async function e(){try{let e=await(await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)).json(),t=document.getElementById(`categoryFilter`);e.categories.forEach(e=>{let n=document.createElement(`option`);n.value=e.strCategory,n.textContent=e.strCategory,t.appendChild(n)})}catch(e){console.error(`Error loading categories:`,e)}}async function t(){let e=document.getElementById(`results`);e.innerHTML=`<div class="loader"></div>`;let t=document.getElementById(`searchInput`).value,n=document.getElementById(`categoryFilter`).value;if(!t&&!n){e.innerHTML=`<p>⚠️ Enter ingredient or select category</p>`;return}try{let e=``;e=t?`https://www.themealdb.com/api/json/v1/1/filter.php?i=${t}`:`https://www.themealdb.com/api/json/v1/1/filter.php?c=${n}`,s((await(await fetch(e)).json()).meals)}catch(t){console.error(`Error fetching recipes:`,t),e.innerHTML=`<p>❌ Failed to load recipes. Try again.</p>`}}async function i(){let e=document.getElementById(`results`);e.innerHTML=`<p>Loading random recipe...</p>`;try{let e=(await(await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)).json()).meals[0];l(e)}catch(t){console.error(`Error fetching random meal:`,t),e.innerHTML=`<p>❌ Failed to load random recipe.</p>`}}async function a(){let e=document.getElementById(`results`);e.innerHTML=`<p>Loading drink...</p>`;try{let e=(await(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)).json()).drinks[0];o(e)}catch(t){console.error(t),e.innerHTML=`<p>❌ Failed to load drink</p>`}}function o(e){let t=document.getElementById(`results`);t.innerHTML=`
    <div class="details-container">
      <h2>${e.strDrink}</h2>
      <img src="${e.strDrinkThumb}" />

      <h3>🥤 Instructions</h3>
      <p>${e.strInstructions}</p>

      <button id="backBtn">⬅ Back</button>
    </div>
  `,document.getElementById(`backBtn`).addEventListener(`click`,()=>{t.innerHTML=``})}function s(e){let t=document.getElementById(`results`);if(t.innerHTML=``,!e){t.innerHTML=`<p>😔 No recipes found. Try another search.</p>`;return}e.forEach(e=>{let n=document.createElement(`div`);n.classList.add(`favorite-card`),n.innerHTML=`
      <img src="${e.strMealThumb}" alt="${e.strMeal}" />
      <h3>${e.strMeal}</h3>
    `,n.addEventListener(`click`,()=>{c(e.idMeal)}),t.appendChild(n)})}async function c(e){try{let t=(await(await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)).json()).meals[0];l(t)}catch(e){console.error(`Error fetching meal details:`,e)}}function l(e){let n=document.getElementById(`results`),r=`<ul>`;for(let t=1;t<=20;t++){let n=e[`strIngredient${t}`],i=e[`strMeasure${t}`];n&&n.trim()!==``&&(r+=`<li>${i} ${n}</li>`)}r+=`</ul>`;let i=e.strInstructions.split(/[\.\n]/).filter(e=>e.trim()!==``),a=`<ol>`;i.forEach(e=>{a+=`<li>${e.trim()}</li>`}),a+=`</ol>`;let o=``;e.strYoutube&&(o=`
      <h3>🎥 Cooking Video</h3>
      <iframe src="${`https://www.youtube.com/embed/${e.strYoutube.split(`v=`)[1]}`}" allowfullscreen></iframe>
    `),n.innerHTML=`
    <div class="details-container">

      <h2>${e.strMeal}</h2>
      <img src="${e.strMealThumb}" alt="${e.strMeal}" />

      <button id="saveBtn">❤️ Save to Favorites</button>

      <h3>🧂 Ingredients</h3>
      ${r}

      <h3>📖 Instructions</h3>
      ${a}

      ${o}

      <button id="backBtn">⬅ Back</button>
    </div>
  `,document.getElementById(`saveBtn`).addEventListener(`click`,()=>{u(e)}),document.getElementById(`backBtn`).addEventListener(`click`,()=>{t()})}function u(e){let t=JSON.parse(localStorage.getItem(`favorites`))||[];if(t.find(t=>t.idMeal===e.idMeal)){alert(`Already in favorites`);return}t.push({idMeal:e.idMeal,name:e.strMeal,image:e.strMealThumb}),localStorage.setItem(`favorites`,JSON.stringify(t)),alert(`Saved to favorites ❤️`)}}))();