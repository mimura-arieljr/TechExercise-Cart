// Store products in an array of objects
const products = [
  { name: "Unli1GB", price: 24.9 },
  { name: "Unli2GB", price: 29.9 },
  { name: "Unli5GB", price: 44.9 },
  { name: "1GBDataPack", price: 9.9 },
];

// Class definition for ShoppingCart
class ShoppingCart {
  constructor(pricingRules) {
    this.pricingRules = pricingRules;
    this.promoCode = "I<3AMAYSIM";
    this.inputPromoCode = "";
    this.itemsIncart = [];
  }

  add(item, promoCode) {
    this.inputPromoCode = promoCode;
    const existingCartItem = this.itemsIncart.find(
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
      this.itemsIncart.push(newCartItem);
    }

    if (item.name === "Unli2GB") {
      const dataPackItem = { name: "Free 1GB Data-pack", price: 0 };

      const existingDataPackItem = this.itemsIncart.find(
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
        this.itemsIncart.push(newDataPackItem);
      }
    }

    this.renderCartItems();
  }

  total() {
    this.computeTotalPrice();
  }

  items() {
    if (this.itemsIncart.length === 0) {
      console.log("\nCart is empty!");
    } else {
      console.log(this.itemsIncart);
    }
    console.log("\nEnter a command: ");
  }

  renderCartItems() {
    this.itemsIncart.forEach((cartItem) => {
      const totalPrice = `$${cartItem.totalPrice.toFixed(2)}`;
      console.log(`\n\n${cartItem.item.name} - Qty: ${cartItem.quantityOfItem} - ${totalPrice}`);
    });

    this.computeTotalPrice();
  }

  computeTotalPrice() {
    // Compute the total price for checkout
    let checkOutPrice = this.itemsIncart.reduce((total, cartItem) => {
      return total + cartItem.totalPrice;
    }, 0);

    // Apply promo discounts if eligible
    let discountPrice = this.isEligibleForPromo();
    checkOutPrice -= discountPrice;
    if (discountPrice>0){
      this.showPromoApplied();
    }

    // Applies 10% discount if promo code is valid
    if (this.promoCode === this.inputPromoCode) {
      checkOutPrice *= 0.9;
      this.showPromoApplied();
    } 
    console.log(`Total Price: $${checkOutPrice.toFixed(2)}\n`);
    console.log("Enter a command: ");
  }

  isEligibleForPromo() {
    let unli1GBCount = 0;
    let unli5GBCount = 0;
    let discountPrice = 0;

    this.itemsIncart.forEach((cartItem) => {
      if (cartItem.item.name === "Unli1GB") {
        unli1GBCount += cartItem.quantityOfItem;
      } else if (cartItem.item.name === "Unli5GB") {
        unli5GBCount += cartItem.quantityOfItem;
      }
    });

    const qtyOf1GBDiscount = Math.floor(unli1GBCount / 3);
    const qtyOf5GBDiscount = unli5GBCount > 3 ? unli5GBCount : 0;
    discountPrice = qtyOf1GBDiscount * 24.9 + qtyOf5GBDiscount * 5;

    return discountPrice;
  }

  clearCart() {
    this.itemsIncart.length = 0;
    this.hideCartList();
    this.renderCartItems();
  }

  hideCartList() {
    console.log(this.itemsIncart.length === 0 ? "Cart is empty" : "Cart is not empty");
  }

  showPromoApplied() {
    console.log("Promo code applied");
  }
}

// Create a new instance of ShoppingCart
const cart = new ShoppingCart();

// Function to handle user input
function handleInput(input) {
  const [command, ...args] = input.split(" ");

  if (command === "add") {
    const [itemName, promoCode] = args;
    const item = products.find((product) => product.name === itemName);
    if (item) {
      cart.add(item, promoCode);
    } else {
      console.log("Invalid item name");
    }
  } else if (command === "total") {
    cart.total();
  } else if (command === "items") {
    cart.items();
  } else if (command === "clear") {
    cart.clearCart();
  } else if (command === "exit") {
    process.exit();
  } else {
    console.log("Invalid command");
  }
}

// Function to start the program
function startProgram() {
  console.log("\nHi! Kindly refer below for instructions.");
  console.log("To add an item, use the 'add' command followed by the item name and promo code (if any).");
  console.log("To get the total price, use the 'total' command.");
  console.log("To view the items in the cart, use the 'items' command.");
  console.log("To clear the cart, use the 'clear' command.");
  console.log("To exit the program, use the 'exit' command.");
  console.log('\nPurchase our amaySIMS!');
  console.log(products);

  process.stdin.on("data", (data) => {
    const input = data.toString().trim();
    handleInput(input);
  });
}

// Start the program
startProgram();
