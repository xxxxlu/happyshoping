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
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--container-padding, 20px) 3rem;
  min-height: calc(100vh - 240px);
  box-sizing: border-box;
  overflow-x: hidden;
}

.checkout h1 {
  text-align: center;
  margin: 1.5rem 0 2rem;
  color: var(--primary-dark);
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 0.8rem;
}

.checkout h1:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: var(--primary-gradient);
  border-radius: 2px;
}

.checkout-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
}

.shipping-info, .order-summary {
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
}

.shipping-info::before, .order-summary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(147, 112, 219, 0.03), rgba(115, 103, 240, 0.06));
  z-index: 0;
}

.shipping-info h2, .order-summary h2 {
  font-size: 1.4rem;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid rgba(147, 112, 219, 0.15);
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(147, 112, 219, 0.1);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.payment-methods {
  display: flex;
  gap: 1rem;
  margin-top: 0.8rem;
}

.payment-method {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.8rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  background-color: white;
}

.payment-method:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-color: var(--primary-light);
}

.payment-method.active {
  border-color: var(--primary-color);
  background-color: rgba(147, 112, 219, 0.1);
  box-shadow: 0 5px 15px rgba(147, 112, 219, 0.15);
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
  color: var(--primary-color);
  font-size: 1.3em;
  font-weight: bold;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
}

.item-info h3 {
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.item-info p {
  color: #666;
  font-size: 0.95rem;
}

.item-total {
  font-weight: 600;
  color: var(--primary-dark);
  font-size: 1.05rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin: 0.8rem 0;
  font-size: 1.05rem;
  color: #666;
  position: relative;
  z-index: 1;
}

.summary-total {
  margin-top: 1.8rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(147, 112, 219, 0.15);
  position: relative;
  z-index: 1;
}

.total {
  font-weight: 700;
  font-size: 1.3em;
  margin-top: 1rem;
  color: var(--primary-dark);
}

.checkout-button {
  display: block;
  width: 100%;
  padding: 0.9rem;
  margin-top: 1.5rem;
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.checkout-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(94, 59, 164, 0.3);
}

.cart-empty {
  text-align: center;
  padding: 2rem 0;
  color: #666;
  font-size: 1.1rem;
  position: relative;
  z-index: 1;
}
@media (max-width: 992px) {
  .checkout-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .checkout {
    padding: 0 var(--container-padding, 20px) 2rem;
  }
  
  .checkout h1 {
    margin: 1rem 0 1.5rem;
    font-size: 1.7rem;
  }
  
  .shipping-info, .order-summary {
    padding: 1.2rem;
  }
  
  .payment-methods {
    flex-direction: column;
    gap: 0.7rem;
  }

  .checkout-container {
    gap: 1.2rem;
  }
}

@media (max-width: 480px) {
  .checkout h1 {
    font-size: 1.5rem;
  }
  
  .shipping-info h2, .order-summary h2 {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group input,
  .form-group textarea {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
  
  .checkout-button {
    font-size: 0.95rem;
    padding: 0.7rem;
    margin-top: 1.2rem;
  }
  
  .total {
    font-size: 1.1rem;
  }

  .summary-line {
    font-size: 0.95rem;
    margin: 0.6rem 0;
  }
}
</style>
