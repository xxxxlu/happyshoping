<template>
  <div class="checkout">
    <h1>Checkout</h1>
    <div class="checkout-container">
      <div class="shipping-info">
        <h2>Shipping Information</h2>
        <form @submit.prevent="placeOrder">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="shippingInfo.name" required>
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" v-model="shippingInfo.phone" required>
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <textarea id="address" v-model="shippingInfo.address" required></textarea>
          </div>
          <div class="form-group">
            <label for="note">Note (Optional)</label>
            <textarea id="note" v-model="shippingInfo.note"></textarea>
          </div>
          
          <div class="form-group">
            <label>Payment Method</label>
            <div class="payment-methods">
              <div class="payment-method" :class="{ active: paymentMethod === 'easypaisa' }" @click="paymentMethod = 'easypaisa'">
                <div class="payment-logo easypaisa">
                  <img src="../assets/easypaisa.png" alt="EasyPaisa">
                </div>
                <div class="check-mark" v-if="paymentMethod === 'easypaisa'">✓</div>
              </div>
              <div class="payment-method" :class="{ active: paymentMethod === 'jazzcash' }" @click="paymentMethod = 'jazzcash'">
                <div class="payment-logo jazzcash">
                  <img src="../assets/jazzcash.png" alt="JazzCash">
                </div>
                <div class="check-mark" v-if="paymentMethod === 'jazzcash'">✓</div>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="cart-items" v-if="cartItems.length > 0">
          <div class="cart-item" v-for="(item, index) in cartItems" :key="index">
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p>${{ item.price.toFixed(2) }} × {{ item.quantity }}</p>
            </div>
            <div class="item-total">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>
        <div class="cart-empty" v-else>
          <p>Your cart is empty</p>
        </div>
        
        <div class="summary-total">
          <div class="summary-line">
            <span>Subtotal:</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-line">
            <span>Shipping:</span>
            <span>${{ shipping.toFixed(2) }}</span>
          </div>
          <div class="summary-line total">
            <span>Total:</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>
        
        <button class="checkout-button" @click="placeOrder">Place Order</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  data() {
    return {
      cartItems: [],
      shippingInfo: {
        name: '',
        phone: '',
        address: '',
        note: ''
      },
      paymentMethod: '',
      shipping: 0
    }
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    total() {
      return this.subtotal + this.shipping
    }
  },
  mounted() {
    // Load cart data from local storage or Vuex
    this.fetchCartItems()
  },
  methods: {
    fetchCartItems() {
      // Example: get cart items from local storage
      const cartItems = localStorage.getItem('cartItems')
      if (cartItems) {
        this.cartItems = JSON.parse(cartItems)
      }
    },
    placeOrder() {
      // Handle order placement
      if (this.validateForm()) {
        const order = {
          items: this.cartItems,
          shipping: this.shippingInfo,
          paymentMethod: this.paymentMethod,
          total: this.total,
          date: new Date().toISOString()
        }
        
        // Here you would call an API to save the order or process payment
        console.log('Order submitted:', order)
        
        // Redirect to payment success page after order is submitted
        this.$router.push('/payment-success')
      }
    },
    validateForm() {
      // Simple form validation
      return this.shippingInfo.name && 
             this.shippingInfo.phone && 
             this.shippingInfo.address &&
             this.paymentMethod
    }
  }
}
</script>

<style scoped>
.checkout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.checkout h1 {
  text-align: center;
  margin-bottom: 30px;
}

.checkout-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.shipping-info, .order-summary {
  flex: 1;
  min-width: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  min-height: 80px;
}

.payment-methods {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.payment-method {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.payment-method.active {
  border-color: #42b983;
  background-color: rgba(66, 185, 131, 0.05);
}

.payment-logo {
  display: flex;
  align-items: center;
  width: 85%;
}

.payment-logo img {
  width: 100%;
  height: auto;
  max-height: 40px;
  object-fit: contain;
}

.payment-logo.easypaisa img {
  max-height: 38px;
}

.payment-logo.jazzcash img {
  max-height: 38px;
}

.check-mark {
  color: #42b983;
  font-size: 1.2em;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.summary-total {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.total {
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 10px;
}

.checkout-button {
  display: block;
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-button:hover {
  background-color: #45a049;
}
</style>
