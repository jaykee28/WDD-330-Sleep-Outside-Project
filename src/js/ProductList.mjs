import { renderWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand}</h2>
        <h3>${product.Name}</h3>
        <p>$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData();
    this.renderList(products);
  }

 renderList(products) {
  console.log("LIST ELEMENT:", this.listElement);

  renderWithTemplate(productCardTemplate, this.listElement, products);
}
}