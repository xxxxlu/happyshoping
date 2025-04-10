<template>
  <div class="payment-success">
    <div class="success-container">
      <div class="success-icon">
        <svg viewBox="0 0 24 24" width="100" height="100">
          <circle cx="12" cy="12" r="11" fill="#4CAF50" />
          <path d="M7 13l3 3 7-7" stroke="#fff" stroke-width="2" fill="none" />
        </svg>
      </div>
      <h1>Payment Successful!</h1>
      <p class="success-message">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <div class="order-info">
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> #{{ orderId }}</p>
        <p><strong>Date:</strong> {{ orderDate }}</p>
        <p><strong>Total Amount:</strong> ${{ orderTotal.toFixed(2) }}</p>
      </div>
      <p class="email-message">
        A confirmation email has been sent to your registered email address.
      </p>
      <div class="action-buttons">
        <router-link to="/products" class="button secondary">Continue Shopping</router-link>
        <router-link to="/" class="button primary">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentSuccess',
  data() {
    return {
      orderId: this.generateOrderId(),
      orderDate: new Date().toLocaleDateString(),
      orderTotal: 0
    }
  },
  mounted() {
    // You could retrieve order information from localStorage or state management
    const orderInfo = localStorage.getItem('lastOrder')
    if (orderInfo) {
      const order = JSON.parse(orderInfo)
      this.orderTotal = order.total || 0
    }
  },
  methods: {
    generateOrderId() {
      // Generate a random order ID for demonstration purposes
      return Math.floor(100000 + Math.random() * 900000)
    }
  }
}
</script>

<style scoped>
.payment-success {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

.success-container {
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.success-icon {
  margin-bottom: 20px;
}

h1 {
  color: #4CAF50;
  margin-bottom: 20px;
}

.success-message {
  font-size: 18px;
  margin-bottom: 30px;
}

.order-info {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  text-align: left;
}

.order-info h2 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.email-message {
  margin-bottom: 30px;
  color: #666;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.button {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.primary {
  background-color: #4CAF50;
  color: white;
}

.primary:hover {
  background-color: #45a049;
}

.secondary {
  background-color: #f1f1f1;
  color: #333;
}

.secondary:hover {
  background-color: #e7e7e7;
}
</style>
