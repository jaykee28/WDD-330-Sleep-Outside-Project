import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// load header and footer
loadHeaderFooter();

// get category from URL
const category = getParam('category') || 'tents';

// update page title
const titleElement = document.querySelector('h2');
if (titleElement) {
  titleElement.textContent = `Top Products: ${category.replace('-', ' ')}`;
}

// setup data + list
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);

// render products
myList.init();