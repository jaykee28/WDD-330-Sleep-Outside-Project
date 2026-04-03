import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// load header + footer
loadHeaderFooter();

// get product id from URL
const productId = getParam('product');

// create data source
const dataSource = new ProductData('tents');

// create product details instance
const product = new ProductDetails(productId, dataSource);

// initialize page
product.init();
