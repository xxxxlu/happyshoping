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
  margin: 60px auto;
  padding: 20px;
  min-height: calc(100vh - 220px);
}

.success-container {
  text-align: center;
  background-color: #fff;
  border-radius: 16px;
  padding: 50px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.success-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(135deg, var(--primary-light, #02a7a7), var(--primary-dark, #017e7e));
}

.success-icon {
  margin-bottom: 20px;
}

h1 {
  color: var(--primary-color, #017e7e);
  margin-bottom: 20px;
  font-size: 2.2rem;
}

.success-message {
  font-size: 18px;
  margin-bottom: 30px;
  color: #555;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.order-info {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 25px;
  margin: 30px 0;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  border-left: 4px solid var(--primary-color, #017e7e);
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
  gap: 20px;
  margin-top: 40px;
}

.button {
  display: inline-block;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.primary {
  background: linear-gradient(135deg, var(--primary-light, #02a7a7), var(--primary-dark, #017e7e));
  color: white;
}

.primary:hover {
  background: linear-gradient(135deg, var(--primary-dark, #017e7e), var(--primary-light, #02a7a7));
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.secondary {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #e0e0e0;
}

.secondary:hover {
  background-color: #e9ecef;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}
</style>
