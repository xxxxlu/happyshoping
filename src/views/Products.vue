<template>
  <div class="products-view">
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
        <input type="range" id="priceRange" v-model="maxPrice" min="0" max="50000" step="1000" @input="filterProducts">
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
            <button @click="addToCart(product)" class="btn btn-primary" :disabled="!product.inStock">
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
.products-view {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--container-padding, 20px) 3rem;
  min-height: calc(100vh - 240px);
  box-sizing: border-box;
  overflow-x: hidden;
}

h1 {
  text-align: center;
  margin: 1rem 0 2.5rem;
  color: var(--primary-dark);
  font-size: 2.2rem;
  position: relative;
  padding-bottom: 15px;
  font-weight: 700;
}

h1::after {
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

.filters {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
}

.filters::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(147, 112, 219, 0.02), rgba(115, 103, 240, 0.05));
  border-radius: 12px;
  z-index: -1;
}

.filter-group {
  flex: 1;
  min-width: 220px;
  margin-bottom: 1.2rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  width: 100%;
}

.filter-group .search-input {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: var(--shadow-light);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.filter-group .search-input input {
  flex-grow: 1;
  padding: 12px 15px;
  border: 1px solid rgba(147, 112, 219, 0.3);
  border-right: none;
  border-radius: var(--border-radius-md) 0 0 var(--border-radius-md);
  font-size: 16px;
  outline: none;
}

.filter-group .search-input button {
  padding: 12px 15px;
  border: none;
  border-radius: 0 var(--border-radius-md) var(--border-radius-md) 0;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
}

.filter-group select {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(147, 112, 219, 0.3);
  border-radius: 8px;
  background-color: white;
  color: #333;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  cursor: pointer;
  background-image: linear-gradient(45deg, transparent 50%, var(--primary-color) 50%),
    linear-gradient(135deg, var(--primary-color) 50%, transparent 50%);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px);
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.filter-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(147, 112, 219, 0.2);
}

.filter-group input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 5px;
  background: linear-gradient(90deg, var(--primary-light), var(--primary-dark));
  outline: none;
  margin-top: 10px;
}

.filter-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.filter-group input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-category {
  color: var(--primary-color);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-info h3 {
  margin: 0 0 0.8rem;
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
  line-height: 1.4;
  height: 3.4rem;
  /* Limit to 2 lines */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  /* Standard property for compatibility */
}

.product-rating {
  margin-bottom: 0.8rem;
}

.star {
  color: #ddd;
  font-size: 1.2rem;
  margin-right: 2px;
}

.star.filled {
  color: #FFD700;
}

.product-price {
  font-weight: bold;
  color: var(--primary-dark);
  margin-top: auto;
  padding-top: 10px;
  font-size: 1.1rem;
}

.out-of-stock {
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 1.2rem;
  padding: 5px 10px;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
  display: inline-block;
}

.product-actions {
  display: flex;
  gap: 0.8rem;
  margin-top: auto;
}

.btn {
  display: inline-block;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  flex: 1;
  text-align: center;
  letter-spacing: 0.5px;
  font-size: 0.95rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
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


.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 992px) {
  .products-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .filter-sidebar {
    position: static;
    margin-bottom: 1.5rem;
    max-height: none;
    padding: 1rem;
  }

  .filter-toggle {
    display: flex;
  }

  .filters-mobile-hidden .filter-sidebar {
    display: none;
  }

  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-view {
    padding: 0 var(--container-padding, 20px) 2rem;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .product-card h3 {
    font-size: 0.9rem;
  }

  .product-price {
    font-size: 0.95rem;
  }

  .product-image {
    height: 150px;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 1.8rem;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }

  .product-actions {
    flex-direction: column;
  }

  .product-image {
    height: 140px;
  }

  .btn {
    padding: 0.7rem 0.8rem;
  }

  .filter-group select,
  .filter-group input {
    font-size: 0.9rem;
  }

  .product-info {
    padding: 10px;
  }

  .product-info h3 {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    height: 2.5rem;
  }

  .product-price {
    font-size: 0.9rem;
  }
}
</style>
