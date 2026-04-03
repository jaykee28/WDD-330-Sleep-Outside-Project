import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // load header + footer
  loadHeaderFooter();

  const listElement = document.querySelector('.product-list');

  if (listElement) {
    const category =
      new URLSearchParams(window.location.search).get('category') || 'tents';

    const dataSource = new ProductData(category);
    const productList = new ProductList(category, dataSource, listElement);

    productList.init();
  }
});