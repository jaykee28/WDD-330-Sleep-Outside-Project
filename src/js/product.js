import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

// load header + footer
loadHeaderFooter();

// get product id from URL
const productId = getParam('product');

// create data source (FIXED)
const dataSource = new ExternalServices();

// create product details instance
const product = new ProductDetails(productId, dataSource);

// initialize page
product.init();