import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

document.addEventListener('DOMContentLoaded', () => {
  //console.log('MAIN IS RUNNING');

  const listElement = document.querySelector('.product-list');

  //  ONLY run on product listing page
  if (listElement) {
    //console.log('LIST PAGE DETECTED');

    const category =
      new URLSearchParams(window.location.search).get('category') || 'tents';

    const dataSource = new ProductData(category);
    const productList = new ProductList(category, dataSource, listElement);

    productList.init();
  }
});
