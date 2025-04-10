<template>
  <div class="product-detail">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading product...</p>
    </div>

    <div v-else-if="!product" class="not-found">
      <h2>Product Not Found</h2>
      <p>Sorry, the product you're looking for doesn't exist or has been removed.</p>
      <router-link to="/products" class="btn btn-primary">Back to Products</router-link>
    </div>

    <div v-else class="product-container">
      <div class="breadcrumbs">
        <router-link to="/">Home</router-link> &gt;
        <router-link to="/products">Products</router-link> &gt;
        <router-link :to="`/products?category=${product.category}`">{{ product.category }}</router-link> &gt;
        <span>{{ product.name }}</span>
      </div>

      <div class="product-grid">
        <div class="product-image">
          <img :src="product.image" :alt="product.name">
        </div>

        <div class="product-info">
          <h1>{{ product.name }}</h1>

          <div class="product-rating">
            <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= product.rating }">★</span>
            <span class="rating-count">({{ Math.floor(Math.random() * 100) + 5 }} Reviews)</span>
          </div>

          <div class="product-price">Rs. {{ product.price.toLocaleString() }}</div>

          <div class="product-status" :class="{ 'in-stock': product.inStock, 'out-of-stock': !product.inStock }">
            {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
          </div>

          <div class="product-description">
            <p>{{ product.description }}</p>
          </div>

          <div class="quantity-control" v-if="product.inStock">
            <label for="quantity">Quantity:</label>
            <div class="quantity-buttons">
              <button @click="decrementQuantity" class="quantity-btn">-</button>
              <input
                type="number"
                id="quantity"
                v-model.number="quantity"
                min="1"
                max="10"
              >
              <button @click="incrementQuantity" class="quantity-btn">+</button>
            </div>
          </div>

          <div class="product-actions">
            <button
              @click="addToCartWithQuantity"
              class="btn btn-primary btn-block"
              :disabled="!product.inStock"
            >
              Add to Cart
            </button>

            <button @click="buyNow" class="btn btn-secondary btn-block" :disabled="!product.inStock">
              Buy Now
            </button>
          </div>

          <div class="product-details">
            <h3>Product Details</h3>
            <ul>
              <li><strong>Category:</strong> {{ product.category }}</li>
              <li><strong>ID:</strong> #{{ product.id }}</li>
              <li><strong>Condition:</strong> New</li>
              <li><strong>Warranty:</strong> 6 Months</li>
              <li><strong>Return Policy:</strong> 7 Days</li>
            </ul>
          </div>

          <div class="product-shipping">
            <h3>Shipping Information</h3>
            <p>Free shipping to all major cities in Pakistan. Delivery within 3-5 business days.</p>
          </div>
        </div>
      </div>

      <div class="similar-products">
        <h2>You May Also Like</h2>
        <div class="products-grid">
          <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" class="product-card">
            <div class="product-image">
              <img :src="relatedProduct.image" :alt="relatedProduct.name">
            </div>
            <div class="product-info">
              <h3>{{ relatedProduct.name }}</h3>
              <p class="product-price">Rs. {{ relatedProduct.price.toLocaleString() }}</p>
              <router-link :to="'/product/' + relatedProduct.id" class="btn btn-secondary btn-block">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductDetail',
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    ...mapState({
      products: state => state.products,
      loading: state => state.loading
    }),
    productId() {
      return parseInt(this.$route.params.id)
    },
    product() {
      return this.products.find(p => p.id === this.productId)
    },
    relatedProducts() {
      if (!this.product) return []

      // Get products in the same category, excluding current product
      return this.products
        .filter(p => p.category === this.product.category && p.id !== this.productId)
        .slice(0, 4) // Limit to 4 related products
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'addToCart']),
    incrementQuantity() {
      if (this.quantity < 10) {
        this.quantity++
      }
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCartWithQuantity() {
      for (let i = 0; i < this.quantity; i++) {
        this.addToCart(this.product)
      }
      this.$router.push('/cart')
    },
    buyNow() {
      this.addToCartWithQuantity()
      this.$router.push('/checkout')
    }
  },
  created() {
    if (this.products.length === 0) {
      this.fetchProducts()
    }

    // Reset quantity when product changes
    this.quantity = 1
  }
}
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.loading, .not-found {
  text-align: center;
  padding: 3rem 0;
}

.spinner {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #017e7e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.breadcrumbs {
  margin-bottom: 1.5rem;
  color: #666;
}

.breadcrumbs a {
  color: #017e7e;
  text-decoration: none;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.product-image {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
}

.product-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.product-info h1 {
  margin: 0 0 1rem;
  color: #333;
  font-size: 1.8rem;
}

.product-rating {
  margin-bottom: 1rem;
}

.star {
  color: #ddd;
  font-size: 1.2rem;
}

.star.filled {
  color: #ffc107;
}

.rating-count {
  color: #666;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.product-price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #e63946;
  margin-bottom: 1rem;
}

.product-status {
  font-weight: bold;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
}

.in-stock {
  color: #28a745;
}

.out-of-stock {
  color: #e63946;
}

.product-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #444;
}

.quantity-control {
  margin-bottom: 1.5rem;
}

.quantity-control label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.quantity-buttons {
  display: flex;
  align-items: center;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  font-size: 1.2rem;
  cursor: pointer;
}

.quantity-btn:first-child {
  border-radius: 4px 0 0 4px;
}

.quantity-btn:last-child {
  border-radius: 0 4px 4px 0;
}

.quantity-buttons input {
  width: 60px;
  height: 40px;
  text-align: center;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}

.product-actions {
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.btn:not(:disabled):hover {
  transform: translateY(-2px);
}

.btn-block {
  display: block;
  width: 100%;
}

.btn-primary {
  background-color: #017e7e;
  color: white;
}

.btn-primary:not(:disabled):hover {
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

.product-details, .product-shipping {
  margin-bottom: 2rem;
}

.product-details h3, .product-shipping h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.product-details ul {
  padding-left: 1.5rem;
  line-height: 1.6;
}

.similar-products h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-card .product-image {
  height: 180px;
}

.product-card .product-info {
  padding: 1rem;
}

.product-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }

  .product-actions {
    grid-template-columns: 1fr;
  }
}
</style>
