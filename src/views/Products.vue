<template>
  <div class="products-page">
    <h1>All Products</h1>

    <div class="filters">
      <div class="filter-group">
        <label for="category">Category:</label>
        <select id="category" v-model="selectedCategory" @change="filterProducts">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="sort">Sort By:</label>
        <select id="sort" v-model="sortOption" @change="filterProducts">
          <option value="default">Featured</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A-Z</option>
          <option value="nameDesc">Name: Z-A</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="priceRange">Max Price: Rs. {{ maxPrice }}</label>
        <input
          type="range"
          id="priceRange"
          v-model="maxPrice"
          min="0"
          max="50000"
          step="1000"
          @input="filterProducts"
        >
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="no-products">
      <p>No products found matching your criteria. Try adjusting your filters.</p>
    </div>

    <div v-else class="products-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <div class="product-image">
          <img :src="product.image" :alt="product.name">
        </div>
        <div class="product-info">
          <div class="product-category">{{ product.category }}</div>
          <h3>{{ product.name }}</h3>
          <div class="product-rating">
            <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= product.rating }">★</span>
          </div>
          <p class="product-price">Rs. {{ product.price.toLocaleString() }}</p>
          <p v-if="!product.inStock" class="out-of-stock">Out of Stock</p>
          <div class="product-actions">
            <router-link :to="'/product/' + product.id" class="btn btn-secondary">View Details</router-link>
            <button
              @click="addToCart(product)"
              class="btn btn-primary"
              :disabled="!product.inStock"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Products',
  data() {
    return {
      selectedCategory: '',
      sortOption: 'default',
      maxPrice: 50000
    }
  },
  computed: {
    ...mapState(['products', 'loading']),
    categories() {
      return [...new Set(this.products.map(product => product.category))].sort()
    },
    filteredProducts() {
      let filtered = [...this.products]

      // Filter by category
      if (this.selectedCategory) {
        filtered = filtered.filter(product => product.category === this.selectedCategory)
      }

      // Filter by price
      filtered = filtered.filter(product => product.price <= this.maxPrice)

      // Sort
      switch (this.sortOption) {
        case 'priceAsc':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'priceDesc':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'nameAsc':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'nameDesc':
          filtered.sort((a, b) => b.name.localeCompare(a.name))
          break
        default:
          // Default sorting (could be based on popularity, etc.)
          break
      }

      return filtered
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'addToCart']),
    filterProducts() {
      // This method is just to trigger reactivity when filters change
      // The actual filtering happens in computed properties
    }
  },
  created() {
    // Parse URL parameters for category filter
    const category = this.$route.query.category
    if (category) {
      this.selectedCategory = category
    }

    // Fetch products if not already loaded
    if (this.products.length === 0) {
      this.fetchProducts()
    }
  }
}
</script>

<style scoped>
.products-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.filters {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.filter-group select,
.filter-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.loading {
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

.no-products {
  text-align: center;
  padding: 3rem 0;
  color: #666;
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
  background-color: white;
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

.product-category {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.product-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.product-rating {
  margin-bottom: 0.5rem;
}

.star {
  color: #ddd;
  font-size: 1.2rem;
}

.star.filled {
  color: #ffc107;
}

.product-price {
  color: #e63946;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.out-of-stock {
  color: #e63946;
  font-weight: bold;
  margin-bottom: 1rem;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
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
  flex: 1;
  text-align: center;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.btn:not(:disabled):hover {
  transform: translateY(-2px);
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

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-group {
    width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .product-actions {
    flex-direction: column;
  }
}
</style>
