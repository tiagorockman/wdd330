//

import { getLocalStorage, setLocalStorage } from "./utils.mjs";

let cartItemsTotal = document.querySelector(".cart-total");

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0]?.ColorName ?? ""}</p>
      <label>
        Qty: 
        <input type="number" class="cart-qty" data-id="${item.Id}" min="1" value="${item.quantity || 1}">
      </label>
      <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
      <button class="remove-item" data-id="${item.Id}" title="Remove from cart">Remove ❌</button>
    </li>
  `;
}
// Add listeners to quantity inputs

function attachQuantityListeners() {
  const qtyInputs = document.querySelectorAll(".cart-qty");
  qtyInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      const newQty = parseInt(e.target.value);
      if (isNaN(newQty) || newQty < 1) return;

      let cart = getLocalStorage("so-cart") || [];
      const itemIndex = cart.findIndex((item) => item.Id === id);
      if (itemIndex > -1) {
        cart[itemIndex].quantity = newQty;
        setLocalStorage("so-cart", cart);
        renderCartContents(); // re-render with new total
        getTotal();
      }
    });
  });
}

// Attach listeners to all ❌ buttons

function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
}

// Remove item and re-render

function removeCartItem(e) {
  const idToRemove = e.target.dataset.id;
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter((item) => item.Id !== idToRemove);
  setLocalStorage("so-cart", cart);
  renderCartContents(); // Re-render cart

  // update the total price after removal
  getTotal();
  displayEmptyCartMessage();
}

// Update renderCartContents to call attachRemoveListeners
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  // Default quantity if not already set
  cartItems.forEach((item) => {
    if (!item.quantity) item.quantity = 1;
  });

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  attachRemoveListeners();
  attachQuantityListeners();
}

function displayEmptyCartMessage() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    document.querySelector(".cart-empty").textContent = "Your cart is empty!";
  }
}

function getTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0
  );
  document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
}


renderCartContents();
getTotal();
displayEmptyCartMessage();
