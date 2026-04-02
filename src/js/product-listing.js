import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category') || "tents";

// Update page title
const titleElement = document.querySelector("h2");
if (titleElement) titleElement.textContent = `Top Products: ${category.replace("-", " ")}`;

// Fetch and render products
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
myList.init();