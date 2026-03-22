import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// get HTML element where products will go
const listElement = document.querySelector(".product-list");

// create data source
const dataSource = new ProductData("tents");

// create product list instance
const productList = new ProductList("tents", dataSource, listElement);

// initialize
productList.init();