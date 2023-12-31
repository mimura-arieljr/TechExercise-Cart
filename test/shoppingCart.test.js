/*
Code Analysis

Objective:
The code snippet defines a ShoppingCart class that allows users to add products to a cart, apply promo codes, and compute the total price for checkout. The objective is to provide a simple shopping cart functionality with promo code discounts.

Inputs:
- Products array of objects containing name and price
- Promo code string

Flow:
- The ShoppingCart class constructor initializes promo code, input promo code, and items in cart.
- The add() method adds a product to the cart and updates the quantity and total price. If the product is "Unli2GB", it adds a free 1GB data-pack to the cart.
- The total() method computes the total price for checkout.
- The items() method displays the items in the cart.
- The renderCartItems() method displays the cart items with their quantity and total price.
- The computeTotalPrice() method computes the total price for checkout, applies promo discounts if eligible, and applies a 10% discount if the promo code is valid.
- The isEligibleForPromo() method checks if the cart is eligible for promo discounts and returns the discount price.
- The clearCart() method clears the cart.
- The hideCartList() method hides the cart list if it is empty.
- The showPromoApplied() method displays a message when a promo code is applied.

Outputs:
- Display of cart items with their quantity and total price
- Display of total price for checkout
- Display of promo code applied message
- Display of cart is empty message

Additional aspects:
- The code uses ES6 syntax and array methods such as find(), forEach(), and reduce().
- The code implements a simple promo discount logic based on the number of "Unli1GB" and "Unli5GB" products in the cart.
- The code applies a 10% discount if the promo code is valid.
- The code does not handle invalid inputs or edge cases.
*/

const ShoppingCart = require("./shoppingCart");

describe("ShoppingCart", () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe("add()", () => {
    // Initial test case, add one item to the cart
    it("should add an item to the cart", () => {
      const item = { name: "Unli1GB", price: 24.9 };
      cart.add(item, "");
      expect(cart.itemsIncart.length).toBe(1);
      expect(cart.itemsIncart[0].item).toBe(item);
      expect(cart.itemsIncart[0].quantityOfItem).toBe(1);
      expect(cart.itemsIncart[0].totalPrice).toBe(item.price);
    });

    // Scenario 1
    it("should calculate the correct cart total after adding multiple items - Scenario 1", () => {
      const item1 = { name: "Unli1GB", price: 24.9 };
      const item2 = { name: "Unli5GB", price: 44.9 };

      cart.add(item1, "");
      cart.add(item1, "");
      cart.add(item1, "");
      cart.add(item2, "");

      // Calculate the expected cart total
      const expectedTotal = 94.7;

      expect(cart.checkOutPrice).toBeCloseTo(expectedTotal, 2);
    });

    // Scenario 2
    it("should calculate the correct cart total after adding multiple items - Scenario 2", () => {
      const item1 = { name: "Unli1GB", price: 24.9 };
      const item2 = { name: "Unli5GB", price: 44.9 };

      cart.add(item1, "");
      cart.add(item1, "");
      cart.add(item2, "");
      cart.add(item2, "");
      cart.add(item2, "");
      cart.add(item2, "");

      // Calculate the expected cart total
      const expectedTotal = 209.40;

      expect(parseFloat(cart.checkOutPrice)).toBeCloseTo(expectedTotal, 2);
    });

    // Scenario 3
    it("should calculate the correct cart total after adding multiple items - Scenario 3", () => {
      const item1 = { name: "Unli1GB", price: 24.9 };
      const item2 = { name: "Unli2GB", price: 29.9 };

      cart.add(item1, "");
      cart.add(item2, "");
      cart.add(item2, "");

      // Calculate the expected cart total
      const expectedTotal = 84.70;

      expect(parseFloat(cart.checkOutPrice)).toBeCloseTo(expectedTotal, 2);

      // Verify the cart items and free 1GBDataPack
      expect(cart.itemsIncart.length).toBe(3);

      const freeDataPackItem = cart.itemsIncart.find(
        (cartItem) => cartItem.item.name === "Free 1GB Data-pack"
      );
      expect(freeDataPackItem).toBeDefined();
      expect(freeDataPackItem.quantityOfItem).toBe(2);
    });

    // Scenario 4
    it("should calculate the correct cart total after adding multiple items - Scenario 4", () => {
      const item1 = { name: "Unli1GB", price: 24.9 };
      const item2 = { name: "1GBDataPack", price: 9.9 };

      cart.add(item1, "");
      cart.add(item2, "I<3AMAYSIM");

      // Calculate the expected cart total
      const expectedTotal = 31.32;

      expect(parseFloat(cart.checkOutPrice)).toBeCloseTo(expectedTotal, 2);

      // Verify the promo code applied
      expect(cart.inputPromoCode).toBe("I<3AMAYSIM");


      // Add more tests here if needed.
    });
  });
});
