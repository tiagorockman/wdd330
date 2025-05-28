import { renderListWithTemplate } from "./utils.mjs";
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimarySmall}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
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
        const list =  await this.dataSource.getData();
        this.renderList(list);
        document.querySelector(".title").textContent = this.category;
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    async filterProducts(query){
        const list = await this.dataSource.getData();
        const filteredProducts = list.filter(product =>
            product.Name.toLowerCase().includes(query)
        );
        renderListWithTemplate(productCardTemplate, this.listElement, filteredProducts, "afterbegin", true);
    }
}
