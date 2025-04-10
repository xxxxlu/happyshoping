<template>
  <div class="home">
    <div class="hero-banner">
      <div class="hero-content">
        <img src="/images/logo.png" alt="ddgotobuy Logo" class="logo">
        <h1>Welcome to ddgotobuy</h1>
        <p>Your One-Stop Shop for Quality Products in Pakistan</p>
        <router-link to="/products" class="btn btn-primary">Shop Now</router-link>
      </div>
    </div>

    <div class="featured-categories">
      <h2>Popular Categories</h2>
      <div class="categories-grid">
        <div v-for="category in categories" :key="category.name" class="category-card">
          <img :src="category.image" :alt="category.name">
          <h3>{{ category.name }}</h3>
          <router-link :to="'/products?category=' + category.name" class="btn btn-secondary">View Products</router-link>
        </div>
      </div>
    </div>

    <div class="featured-products">
      <h2>Featured Products</h2>
      <div class="products-grid">
        <div v-for="product in featuredProducts" :key="product.id" class="product-card">
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-price">Rs. {{ product.price.toLocaleString() }}</p>
            <div class="product-actions">
              <router-link :to="'/product/' + product.id" class="btn btn-secondary">View Details</router-link>
              <button @click="addToCart(product)" class="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div class="view-all">
        <router-link to="/products" class="btn btn-secondary">View All Products</router-link>
      </div>
    </div>

    <div class="benefits-section">
      <h2>Why Choose Us?</h2>
      <div class="benefits-grid">
        <div class="benefit-card">
          <i class="icon fas fa-truck"></i>
          <h3>Fast Delivery</h3>
          <p>Across Pakistan</p>
        </div>
        <div class="benefit-card">
          <i class="icon fas fa-check-circle"></i>
          <h3>Quality Products</h3>
          <p>Trusted Brands</p>
        </div>
        <div class="benefit-card">
          <i class="icon fas fa-undo"></i>
          <h3>Easy Returns</h3>
          <p>7-Day Return Policy</p>
        </div>
        <div class="benefit-card">
          <i class="icon fas fa-lock"></i>
          <h3>Secure Payment</h3>
          <p>Multiple Options</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      categories: [
        { name: 'Electronics', image: 'https://m.media-amazon.com/images/I/71CxUvG46rL._AC_UY436_FMwebp_QL65_.jpg' },
        { name: 'Clothing', image: 'https://m.media-amazon.com/images/I/71eLPKVGaTL._AC_UL640_FMwebp_QL65_.jpg' },
        { name: 'Home & Kitchen', image: 'https://m.media-amazon.com/images/I/71BcZaGRYRL._AC_UL640_FMwebp_QL65_.jpg' },
        { name: 'Beauty & Personal Care', image: 'https://m.media-amazon.com/images/I/81xt17gEPzL._AC_UL640_FMwebp_QL65_.jpg' }
      ]
    }
  },
  computed: {
    ...mapState(['products']),
    featuredProducts() {
      return this.products.slice(0, 4) // Show first 4 products
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'addToCart'])
  },
  created() {
    if (this.products.length === 0) {
      this.fetchProducts()
    }
  }
}
</script>

<style scoped>
.home {
  padding-bottom: 2rem;
}

.hero-banner {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/images/hero-banner.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 4rem 1rem;
  margin-bottom: 2rem;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.logo {
  max-width: 200px;
  margin-bottom: 1rem;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.featured-categories,
.featured-products,
.benefits-section {
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 1rem;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.category-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.category-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.category-card h3 {
  padding: 1rem;
  margin: 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

.product-image {
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 1rem;
}

.product-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.product-price {
  color: #e63946;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
}

.view-all {
  text-align: center;
  margin-top: 2rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.benefit-card {
  padding: 2rem 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: transform 0.3s;
}

.benefit-card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 2rem;
  color: #28a745;
  margin-bottom: 1rem;
}

.benefit-card h3 {
  margin: 0 0 0.5rem;
}

.benefit-card p {
  margin: 0;
  color: #666;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
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

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .categories-grid,
  .products-grid,
  .benefits-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .categories-grid,
  .products-grid,
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .product-actions {
    flex-direction: column;
  }
}
</style>
