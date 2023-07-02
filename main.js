// Store products in an array of objects
const products = [
  { name: "Unlimited 1GB", price: 24.9 },
  { name: "Unlimited 2GB", price: 29.9 },
  { name: "Unlimited 5GB", price: 44.9 },
  { name: "1GB Data-pack", price: 9.9 },
];

const promoCode = "I<3AMAYSIM";

// Initialize an array for cart items
const itemsInCart = [];

// Function to render products
function renderProductList() {
  const productListElement = document.getElementById("product-list");
  productListElement.innerHTML = ""; // Assures inner HTML is clear

  products.forEach((item) => {
    const rowElement = document.createElement("tr");
    const nameHeaderElement = document.createElement("th");
    nameHeaderElement.textContent = item.name;
    rowElement.appendChild(nameHeaderElement);

    const priceHeaderElement = document.createElement("td");
    priceHeaderElement.textContent = `$${item.price.toFixed(2)}`;
    rowElement.appendChild(priceHeaderElement);

    const buttonHeaderElement = document.createElement("td");
    const actionButton = document.createElement("button");
    actionButton.textContent = "Add to Cart";
    actionButton.className = "btn btn-light btn-sm";
    actionButton.style = "background-color: #7700ab; color:white";
    actionButton.addEventListener("click", () => {
      addToCart(item);
    }); // Adds item to cart upon click.
    buttonHeaderElement.appendChild(actionButton);
    rowElement.appendChild(buttonHeaderElement);

    productListElement.appendChild(rowElement);
  });
}

// // Function to add to cart
function addToCart(item) {
  const existingCartItem = itemsInCart.find(
    (cartItem) => cartItem.item.name === item.name
  );

  if (existingCartItem) {
    existingCartItem.quantityOfItem++;
    existingCartItem.totalPrice =
      existingCartItem.item.price * existingCartItem.quantityOfItem;
  } else {
    const newCartItem = {
      item: item,
      quantityOfItem: 1,
      totalPrice: item.price,
    };
    itemsInCart.push(newCartItem);
  }

  if (item.name === "Unlimited 2GB") {
    const dataPackItem = { name: "Free 1GB Data-pack", price: 0 };

    const existingDataPackItem = itemsInCart.find(
      (cartItem) => cartItem.item.name === dataPackItem.name
    );

    if (existingDataPackItem) {
      existingDataPackItem.quantityOfItem++;
      existingDataPackItem.totalPrice =
        existingDataPackItem.item.price * existingDataPackItem.quantityOfItem;
    } else {
      const newDataPackItem = {
        item: dataPackItem,
        quantityOfItem: 1,
        totalPrice: dataPackItem.price,
      };
      itemsInCart.push(newDataPackItem);
    }
  }

  renderCartItems();
  hideCartList();
}

// Function to render cart items
function renderCartItems() {
  const cartListElement = document.getElementById("cart-items");
  cartListElement.innerHTML = "";

  itemsInCart.forEach((cartItem) => {
    const rowElement = document.createElement("tr");
    const nameHeaderElement = document.createElement("td");
    nameHeaderElement.innerText = cartItem.item.name;
    rowElement.appendChild(nameHeaderElement);

    const quantityHeaderElement = document.createElement("td");
    quantityHeaderElement.innerText = cartItem.quantityOfItem;
    rowElement.appendChild(quantityHeaderElement);

    const priceHeaderElement = document.createElement("td");
    const totalPrice = `$${cartItem.totalPrice.toFixed(2)}`;
    priceHeaderElement.innerText = totalPrice;
    rowElement.appendChild(priceHeaderElement);

    cartListElement.appendChild(rowElement);
  });
  computeTotalPrice();
}

// Function to compute and render total price
function computeTotalPrice() {
  const checkOutPriceElement = document.getElementById("total-price");
  checkOutPriceElement.textContent = "";

  // Compute the total price for checkout
  let checkOutPrice = itemsInCart.reduce((total, cartItem) => {
    return total + cartItem.totalPrice;
  }, 0);

  // Apply promo discounts if eligible
  let discountPrice = isEligibleForPromo();
  checkOutPrice -= discountPrice;

  var promoCodeElement = document.getElementById("input-promo-code").value;
  // Applies 10% discount if promo code is valid
  if (promoCodeElement == promoCode) {
    checkOutPrice *= 0.9;
    showPromoApplied();
  } else {
    hidePromoApplied();
  }

  checkOutPriceElement.textContent = `$${checkOutPrice.toFixed(2)}`;
}

// Function to check and apply for promo eligibility
function isEligibleForPromo() {
  let unli1GBCount = 0;
  let unli5GBCount = 0;
  let discountPrice = 0;

  // Check for eligibility for Unli1GB promo
  itemsInCart.forEach((cartItem) => {
    if (cartItem.item.name == "Unlimited 1GB") {
      unli1GBCount += cartItem.quantityOfItem;
    } else if (cartItem.item.name == "Unlimited 5GB") {
      unli5GBCount += cartItem.quantityOfItem;
    }
  });

  const qtyOf1GBDiscount = Math.floor(unli1GBCount / 3);
  const qtyOf5GBDiscount = unli5GBCount > 3 ? unli5GBCount : 0;
  discountPrice = qtyOf1GBDiscount * 24.9 + qtyOf5GBDiscount * 5;
  
  return discountPrice;
}

// Function to clear the cart upon clear cart button click
function clearCart() {
  itemsInCart.length = 0;
  hideCartList();
  renderCartItems();
}

// Function to hide Cart list if its empty
function hideCartList() {
  const cartElement = document.getElementById("cart");
  cartElement.classList.toggle("hide", itemsInCart.length === 0);
}

// Unhides "Promo applied" message
function showPromoApplied() {
  var codeAcceptedElement = document.getElementById("promo-code-success");
  codeAcceptedElement.classList.add("show");
}

// Hides "Promo applied" message
function hidePromoApplied() {
  var codeAcceptedElement = document.getElementById("promo-code-success");
  codeAcceptedElement.classList.remove("show");
}

// Event listener for clear cart button
let clearCartButton = document.getElementById("clear-cart-btn");
clearCartButton.addEventListener("click", clearCart);

hideCartList();
renderProductList();
renderCartItems();
