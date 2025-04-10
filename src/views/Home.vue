<template>
  <div class="home">
    <div class="hero-banner">
      <div class="hero-content">
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
        { name: 'Handicraft', image: 'https://m.media-amazon.com/images/I/71QesHsV-PL._AC_UL640_FMwebp_QL65_.jpg' },
        { name: 'Textile', image: 'https://m.media-amazon.com/images/I/81GAuXWHwJL._AC_UL640_FMwebp_QL65_.jpg' },
        { name: 'Leather', image: 'https://m.media-amazon.com/images/I/71bMNEuQAkL._AC_UL640_FMwebp_QL65_.jpg' },
        { name: 'Clothing', image: 'https://m.media-amazon.com/images/I/A1qS4R68xGL._AC_UL640_FMwebp_QL65_.jpg' }
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
  padding-bottom: 0;
  width: 100%;
  min-height: calc(100vh - 240px); /* 减去头部和尾部高度 */
}

.hero-banner {
  background-image: linear-gradient(rgba(115, 103, 240, 0.7), rgba(115, 103, 240, 0.4)), url('/images/hero-banner.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 5rem 1rem;
  margin-bottom: 3rem;
  width: 100%;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
}

.logo {
  max-width: 220px;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1.2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 800;
}

.hero-content p {
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  font-weight: 500;
}

.featured-categories,
.featured-products,
.benefits-section {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 4rem;
  padding: 0 var(--container-padding, 20px);
}

h2 {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.2rem;
  color: var(--primary-dark);
  position: relative;
  padding-bottom: 15px;
}

h2::after {
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

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
}

.category-card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s ease;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  background: white;
  position: relative;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.category-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: all 0.5s ease;
}

.category-card:hover img {
  transform: scale(1.08);
}

.category-card h3 {
  padding: 1.2rem;
  margin: 0;
  color: var(--primary-dark);
  font-weight: 600;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

.product-image {
  height: 220px;
  overflow: hidden;
  position: relative;
}

.product-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.05));
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

.product-info {
  padding: 1.2rem;
  background: white;
}

.product-info h3 {
  margin: 0 0 0.8rem;
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
  height: 3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; /* 标准属性 */
  -webkit-box-orient: vertical;
  box-orient: vertical; /* 标准属性 */
}

.product-price {
  color: var(--primary-dark);
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 1.2rem;
}

.product-actions {
  display: flex;
  gap: 0.8rem;
}

.view-all {
  text-align: center;
  margin-top: 3rem;
}

.benefits-section {
  background: var(--secondary-color);
  width: 100%;
  padding: 4rem var(--container-padding, 20px);
  margin-bottom: 0;
  position: relative;
  overflow: hidden;
}

.benefits-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(147, 112, 219, 0.05), rgba(115, 103, 240, 0.1));
  z-index: 0;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.benefit-card {
  padding: 2.5rem 1.5rem;
  border-radius: 12px;
  background-color: white;
  transition: all 0.4s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.benefit-card:hover .icon {
  transform: scale(1.2);
  color: var(--primary-dark);
}

.benefit-card h3 {
  margin: 0 0 0.8rem;
  color: #333;
  font-weight: 600;
}

.benefit-card p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.btn {
  display: inline-block;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: var(--primary-gradient);
  color: white;
}

.btn-primary:hover {
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

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    padding: 4rem 1rem;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-content p {
    font-size: 1.2rem;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .benefits-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  .product-image {
    height: 180px;
  }
}

@media (max-width: 576px) {
  .hero-banner {
    padding: 3rem 1rem;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1rem;
  }
  
  .categories-grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .benefits-grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
  }

  .product-actions {
    flex-direction: column;
  }
  
  .view-all {
    margin-top: 2rem;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  
  h2::after {
    width: 60px;
  }
  
  .benefit-card {
    padding: 2rem 1rem;
  }
  
  .btn {
    width: 100%;
  }
  
  .product-image {
    height: 140px;
  }
  
  .product-info {
    padding: 10px;
  }
  
  .product-info h3 {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    height: 2.5rem;
  }
  
  .product-price {
    font-size: 0.95rem;
    margin-bottom: 0.8rem;
  }
}
</style>
