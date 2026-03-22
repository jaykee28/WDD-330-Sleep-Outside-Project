import ProductData from "./ProductData.mjs";
import ProductData from "./ProductList.mjs";
const productData = new ProductData();

async function init() {
  const products = await productData.getData("tents");

  console.log(products);
}

init();

// get HTML element where products will go
const listElement = document.querySelector(".product-list");

// create data source
const dataSource = new ProductData("tents");

// create product list instance
const productList = new ProductList("tents", dataSource, listElement);

// initialize
productList.init();