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
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--container-padding, 20px) 3rem;
  min-height: calc(100vh - 240px);
}

.loading, .not-found {
  text-align: center;
  padding: 5rem 0;
}

.spinner {
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 5px solid rgba(147, 112, 219, 0.1);
  border-top: 5px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1.2s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.breadcrumbs {
  margin: 1rem 0 2rem;
  color: #666;
  font-size: 0.95rem;
}

.breadcrumbs a {
  color: var(--primary-color);
  text-decoration: none;
  transition: all 0.3s ease;
}

.breadcrumbs a:hover {
  color: var(--primary-dark);
  text-decoration: none;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  margin-bottom: 3rem;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
}

.product-image {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.5s ease;
  padding: 1rem;
}

.product-info h1 {
  margin: 0 0 1.2rem;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
}

.product-rating {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}

.star {
  color: #ddd;
  font-size: 1.3rem;
  margin-right: 2px;
}

.star.filled {
  color: #FFD700;
}

.rating-count {
  color: #666;
  font-size: 0.95rem;
  margin-left: 0.8rem;
  opacity: 0.8;
}

.product-price {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.product-status {
  font-weight: bold;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
}

.in-stock {
  color: #2ecc71;
  background-color: rgba(46, 204, 113, 0.1);
  display: inline-block;
  padding: 5px 12px;
  border-radius: 6px;
}

.out-of-stock {
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
  display: inline-block;
  padding: 5px 12px;
  border-radius: 6px;
}

.product-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #444;
}

.quantity-control {
  margin-bottom: 2rem;
}

.quantity-control label {
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: #333;
}

.quantity-buttons {
  display: flex;
  align-items: center;
  width: 120px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.quantity-btn {
  width: 40px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--secondary-color);
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  color: var(--primary-dark);
  transition: all 0.3s ease;
}

.quantity-btn:hover {
  background: var(--primary-light);
  color: white;
}

.quantity-buttons input {
  width: 60px;
  height: 44px;
  text-align: center;
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  -moz-appearance: textfield;
  appearance: textfield;
  -webkit-appearance: textfield;
}

.quantity-buttons input::-webkit-outer-spin-button,
.quantity-buttons input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.product-actions {
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.btn {
  padding: 0.9rem 0.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn:disabled {
  background-color: #d1d1d1;
  color: #888;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn:not(:disabled):hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.btn-block {
  display: block;
  width: 100%;
}

.btn-primary {
  background: var(--primary-gradient);
  color: white;
}

.btn-primary:not(:disabled):hover {
  background: linear-gradient(135deg, var(--primary-light), var(--primary-dark));
}

.btn-secondary {
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-light);
}

.btn-secondary:hover {
  background-color: var(--secondary-color);
  color: var(--primary-dark);
  border-color: var(--primary-dark);
}

.product-details, .product-shipping {
  margin-bottom: 2.5rem;
  background: var(--secondary-color);
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.product-details::before, .product-shipping::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(147, 112, 219, 0.05), rgba(115, 103, 240, 0.1));
  z-index: 0;
}

.product-details h3, .product-shipping h3 {
  font-size: 1.3rem;
  margin-bottom: 1.2rem;
  color: var(--primary-dark);
  padding-bottom: 0.8rem;
  border-bottom: 2px solid rgba(147, 112, 219, 0.2);
  position: relative;
  z-index: 1;
}

.product-details ul {
  padding-left: 1.5rem;
  line-height: 1.8;
  position: relative;
  z-index: 1;
  margin-bottom: 0;
}

.product-shipping p {
  line-height: 1.6;
  position: relative;
  z-index: 1;
  margin-bottom: 0;
}

.similar-products h2 {
  font-size: 1.8rem;
  margin: 1rem 0 2.5rem;
  color: var(--primary-dark);
  text-align: center;
  position: relative;
  padding-bottom: 15px;
}

.similar-products h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: var(--primary-gradient);
  border-radius: 3px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.product-card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  background: white;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.product-card .product-image {
  height: 200px;
  box-shadow: none;
  border-radius: 0;
}

.product-card .product-info {
  padding: 1.2rem;
}

.product-card h3 {
  margin: 0 0 0.8rem;
  font-size: 1.1rem;
  font-weight: 600;
  height: 2.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
}

@media (max-width: 768px) {
  .product-detail {
    padding: 0 var(--container-padding, 20px) 2rem;
    overflow-x: hidden;
  }
  
  .product-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.2rem;
  }

  .product-actions {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .product-image {
    height: 400px;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  
  .similar-products h2 {
    font-size: 1.6rem;
  }
}

@media (max-width: 576px) {
  .breadcrumbs {
    font-size: 0.85rem;
    margin: 0.8rem 0 1.5rem;
  }
  
  .product-image {
    height: 250px;
  }
  
  .product-info h1 {
    font-size: 1.5rem;
  }
  
  .product-price {
    font-size: 1.8rem;
  }
  
  .product-card .product-image {
    height: 180px;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
  
  .similar-products h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .similar-products h2::after {
    width: 60px;
  }
}
</style>
