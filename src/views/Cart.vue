<template>
  <div class="cart-page">
    <h1>Shopping Cart</h1>

    <div v-if="cart.length === 0" class="empty-cart">
      <div class="empty-cart-icon">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <h2>Your Cart is Empty</h2>
      <p>Looks like you haven't added any products to your cart yet.</p>
      <router-link to="/products" class="btn btn-primary">Continue Shopping</router-link>
    </div>

    <div v-else class="cart-container">
      <div class="cart-items">
        <div class="cart-header">
          <div class="cart-header-product">Product</div>
          <div class="cart-header-price">Price</div>
          <div class="cart-header-quantity">Quantity</div>
          <div class="cart-header-total">Total</div>
          <div class="cart-header-action">Action</div>
        </div>

        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div class="cart-item-product">
            <div class="cart-item-image">
              <img :src="item.image" :alt="item.name">
            </div>
            <div class="cart-item-details">
              <h3>{{ item.name }}</h3>
              <div class="cart-item-category">{{ item.category }}</div>
            </div>
          </div>

          <div class="cart-item-price">
            Rs. {{ item.price.toLocaleString() }}
          </div>

          <div class="cart-item-quantity">
            <div class="quantity-buttons">
              <button
                @click="updateQuantity(item.id, item.quantity - 1)"
                class="quantity-btn"
                :disabled="item.quantity <= 1"
              >
                -
              </button>
              <span class="quantity-value">{{ item.quantity }}</span>
              <button
                @click="updateQuantity(item.id, item.quantity + 1)"
                class="quantity-btn"
                :disabled="item.quantity >= 10"
              >
                +
              </button>
            </div>
          </div>

          <div class="cart-item-total">
            Rs. {{ (item.price * item.quantity).toLocaleString() }}
          </div>

          <div class="cart-item-action">
            <button @click="removeFromCart(item.id)" class="btn-remove">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Order Summary</h2>

        <div class="summary-row">
          <span>Subtotal:</span>
          <span>Rs. {{ cartTotal.toLocaleString() }}</span>
        </div>

        <div class="summary-row">
          <span>Shipping:</span>
          <span>{{ shippingCost > 0 ? 'Rs. ' + shippingCost.toLocaleString() : 'Free' }}</span>
        </div>

        <div class="summary-row discount" v-if="discount > 0">
          <span>Discount:</span>
          <span>-Rs. {{ discount.toLocaleString() }}</span>
        </div>

        <div class="summary-total">
          <span>Total:</span>
          <span>Rs. {{ orderTotal.toLocaleString() }}</span>
        </div>

        <div class="promo-code">
          <input
            type="text"
            placeholder="Enter Promo Code"
            v-model="promoCode"
          >
          <button @click="applyPromoCode" class="btn btn-secondary">Apply</button>
        </div>

        <div class="cart-actions">
          <router-link to="/products" class="btn btn-secondary">Continue Shopping</router-link>
          <router-link to="/checkout" class="btn btn-primary">Proceed to Checkout</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Cart',
  data() {
    return {
      promoCode: '',
      discount: 0,
      shippingCost: 0,
      promoApplied: false
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal']),
    orderTotal() {
      return this.cartTotal + this.shippingCost - this.discount
    }
  },
  methods: {
    ...mapActions(['removeFromCart', 'updateCartQuantity']),
    updateQuantity(productId, quantity) {
      if (quantity >= 1 && quantity <= 10) {
        this.updateCartQuantity({ productId, quantity })
      }
    },
    applyPromoCode() {
      if (this.promoCode.toLowerCase() === 'ddgotobuy10' && !this.promoApplied) {
        this.discount = Math.round(this.cartTotal * 0.1) // 10% discount
        this.promoApplied = true
      }
    }
  },
  watch: {
    cartTotal: {
      immediate: true,
      handler(newTotal) {
        // Free shipping for orders over Rs. 3000
        this.shippingCost = newTotal > 3000 ? 0 : 200

        // Reset discount if cart changes
        if (!this.promoApplied) {
          this.discount = 0
        }
      }
    }
  }
}
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: calc(100vh - 220px);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-dark, #333);
  font-size: 2.2rem;
  position: relative;
}

h1:after {
  content: '';
  position: absolute;
  width: 80px;
  height: 4px;
  background: var(--primary-color, #017e7e);
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.empty-cart {
  text-align: center;
  padding: 3rem 0;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.empty-cart-icon {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.empty-cart h2 {
  margin-bottom: 1rem;
  color: #333;
}

.empty-cart p {
  margin-bottom: 2rem;
  color: #666;
}

.cart-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.cart-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  padding: 1rem;
  background-color: #f8f9fa;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}

.cart-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-product {
  display: flex;
  align-items: center;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  margin-right: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-details h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.cart-item-category {
  color: #666;
  font-size: 0.9rem;
}

.cart-item-price, .cart-item-total {
  font-weight: bold;
}

.quantity-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  font-size: 1rem;
  cursor: pointer;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-btn:first-child {
  border-radius: 4px 0 0 4px;
}

.quantity-btn:last-child {
  border-radius: 0 4px 4px 0;
}

.quantity-value {
  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}

.btn-remove {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: #e63946;
  cursor: pointer;
  transition: transform 0.3s;
}

.btn-remove:hover {
  transform: scale(1.2);
}

.cart-summary {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  align-self: start;
}

.cart-summary h2 {
  margin: 0 0 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  font-size: 1.2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #666;
}

.summary-row.discount {
  color: #28a745;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
}

.promo-code {
  display: flex;
  margin-bottom: 1.5rem;
}

.promo-code input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.promo-code button {
  border-radius: 0 4px 4px 0;
}

.cart-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background-color: #017e7e;
  color: white;
}

.btn-primary:hover {
  background-color: #015f5f;
}

.btn-secondary {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e9ecef;
}

@media (max-width: 992px) {
  .cart-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .cart-header-product, .cart-item-product {
    grid-column: 1 / -1;
    margin-bottom: 1rem;
  }

  .cart-header {
    display: none;
  }

  .cart-item {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    padding: 1rem;
    gap: 1rem;
  }

  .cart-item-price::before {
    content: 'Price: ';
    font-weight: normal;
    color: #666;
  }

  .cart-item-quantity::before {
    content: 'Qty: ';
    font-weight: normal;
    color: #666;
    display: block;
    margin-bottom: 0.5rem;
  }

  .cart-item-total::before {
    content: 'Total: ';
    font-weight: normal;
    color: #666;
  }

  .cart-item-action {
    justify-self: end;
  }
}

@media (max-width: 480px) {
  .cart-item {
    grid-template-columns: 1fr 1fr;
  }

  .cart-actions {
    grid-template-columns: 1fr;
  }
}
</style>
