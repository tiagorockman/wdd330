import { cartCounter, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {

    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);

    // Message that will be displayed when the user adds a product to the Cart
    const message = document.querySelector(".message-to-cart");
    message.textContent = "Added to the Cart";
    message.style.opacity = "1";
    message.style.transform = "translateY(0)";
    // Set a timeout for the message to disappear
    setTimeout(() => {
      message.style.opacity = "0";
      message.style.transform = "translateY(20px)";
    },3000);
    // Update the cart Counter
    cartCounter(cartItems.length);
  }

  renderProductDetails() {
    document.querySelector("main").innerHTML = productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  const discount = product.SuggestedRetailPrice - product.FinalPrice;
  const hasDiscount = discount > 0;
  return `
  <section class="product-detail">
    <h3>${product.Brand.Name}</h3>

    <h2 class="divider">${product.NameWithoutBrand}</h2>

    <img
      src="${product.Images.PrimaryMedium}"
      id="productImage"
      alt="${product.Name}"
    />

    <div class="divider"></div>

    <p id="productPrice" class="product-card__price">
    <span class="final-price">$${product.FinalPrice.toFixed(2)}</span>
    ${
      hasDiscount
        ? `<span class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
    <span class="discount-badge">Save $${discount.toFixed(2)}</span>`
        : `$${product.FinalPrice}`
    }
    </p>

    <p id="productColor" class="product__color">
      ${product.Colors[0].ColorName}
    </p>

    <p id="productDescription" class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>

    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">
        Add to Cart
      </button>
    </div>
    
    <div class="message-added-to-cart">
        <span class="message-to-cart"></span>
    </div>
  </section>`;
}
