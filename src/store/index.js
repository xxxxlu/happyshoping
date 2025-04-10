import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    products: [],
    user: null,
    loading: false
  },
  getters: {
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    cartItemCount(state) {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    }
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_TO_CART(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.push({
          ...product,
          quantity: 1
        })
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    },
    UPDATE_CART_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    CLEAR_CART(state) {
      state.cart = []
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    fetchProducts({ commit }) {
      commit('SET_LOADING', true)
      // Simulate API call with products data
      setTimeout(() => {
        commit('SET_PRODUCTS', generateRandomProducts())
        commit('SET_LOADING', false)
      }, 500)
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },
    updateCartQuantity({ commit }, payload) {
      commit('UPDATE_CART_QUANTITY', payload)
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    },
    saveUser({ commit }, user) {
      commit('SET_USER', user)
    }
  }
})

// Helper function to generate random Pakistani products
function generateRandomProducts() {
  const categories = [
    'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Personal Care',
    'Sports & Outdoors', 'Toys & Games', 'Food & Grocery', 'Jewelry'
  ]

  const products = []

  const electronicsItems = [
    { name: 'Smartphone', basePrice: 15000, maxPrice: 45000, image: 'https://m.media-amazon.com/images/I/71CxUvG46rL._AC_UY436_FMwebp_QL65_.jpg' },
    { name: 'Headphones', basePrice: 1500, maxPrice: 12000, image: 'https://m.media-amazon.com/images/I/61FUX7QmifS._AC_UY436_FMwebp_QL65_.jpg' },
    { name: 'Power Bank', basePrice: 800, maxPrice: 5000, image: 'https://m.media-amazon.com/images/I/516tnauVb+L._AC_UY436_FMwebp_QL65_.jpg' },
    { name: 'Bluetooth Speaker', basePrice: 1200, maxPrice: 8000, image: 'https://m.media-amazon.com/images/I/614l20nEhmL._AC_UY436_FMwebp_QL65_.jpg' },
    { name: 'Smart Watch', basePrice: 2500, maxPrice: 25000, image: 'https://m.media-amazon.com/images/I/71QA9CUvpzL._AC_UY436_FMwebp_QL65_.jpg' }
  ]

  const clothingItems = [
    { name: 'Traditional Kurta', basePrice: 1500, maxPrice: 8000, image: 'https://m.media-amazon.com/images/I/71eLPKVGaTL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Shalwar Kameez', basePrice: 2000, maxPrice: 15000, image: 'https://m.media-amazon.com/images/I/61jQJkXlRhL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Embroidered Shawl', basePrice: 1200, maxPrice: 12000, image: 'https://m.media-amazon.com/images/I/6146VPqq0bL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Traditional Cap', basePrice: 500, maxPrice: 3000, image: 'https://m.media-amazon.com/images/I/71bMNEuQAkL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Designer Dupatta', basePrice: 800, maxPrice: 5000, image: 'https://m.media-amazon.com/images/I/71DnT6bds+L._AC_UL640_FMwebp_QL65_.jpg' }
  ]

  const homeItems = [
    { name: 'Traditional Tea Set', basePrice: 2500, maxPrice: 15000, image: 'https://m.media-amazon.com/images/I/71BcZaGRYRL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Handmade Carpet', basePrice: 5000, maxPrice: 45000, image: 'https://m.media-amazon.com/images/I/81ZuntssZwL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Cushion Covers (Set of 4)', basePrice: 1200, maxPrice: 8000, image: 'https://m.media-amazon.com/images/I/61vkCf3+zeL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Table Runner', basePrice: 800, maxPrice: 5000, image: 'https://m.media-amazon.com/images/I/61Ud4Xq+u2L._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Wall Hanging', basePrice: 1500, maxPrice: 12000, image: 'https://m.media-amazon.com/images/I/8172RgAY+DL._AC_UL640_FMwebp_QL65_.jpg' }
  ]

  const beautyItems = [
    { name: 'Henna Kit', basePrice: 500, maxPrice: 3000, image: 'https://m.media-amazon.com/images/I/71nlK3wLNYL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Traditional Perfume Set', basePrice: 1500, maxPrice: 12000, image: 'https://m.media-amazon.com/images/I/41LruIHspoL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Kohl Eyeliner', basePrice: 300, maxPrice: 2000, image: 'https://m.media-amazon.com/images/I/41BGfrwwSwL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Hair Oil Set', basePrice: 800, maxPrice: 5000, image: 'https://m.media-amazon.com/images/I/71akInfGzJL._AC_UL640_FMwebp_QL65_.jpg' }
  ]

  const sportsItems = [
    { name: 'Cricket Bat', basePrice: 2000, maxPrice: 25000, image: 'https://m.media-amazon.com/images/I/71f0YCwN3sL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Cricket Ball Set', basePrice: 800, maxPrice: 5000, image: 'https://m.media-amazon.com/images/I/61IxsaI4dqL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Sports Jersey', basePrice: 1500, maxPrice: 8000, image: 'https://m.media-amazon.com/images/I/91rKXc6vGzL._AC_UL640_FMwebp_QL65_.jpg' }
  ]

  const toysItems = [
    { name: 'Traditional Doll', basePrice: 1000, maxPrice: 8000, image: 'https://m.media-amazon.com/images/I/91kDv+a7UVL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Wooden Puzzle', basePrice: 800, maxPrice: 5000, image: 'https://m.media-amazon.com/images/I/81wILxVekmL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Board Game', basePrice: 1200, maxPrice: 8000, image: 'https://m.media-amazon.com/images/I/81CA3GV9sXL._AC_UL640_FMwebp_QL65_.jpg' }
  ]

  const foodItems = [
    { name: 'Spice Collection', basePrice: 1500, maxPrice: 12000, image: 'https://m.media-amazon.com/images/I/71pvhsDVYJL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Premium Tea Assortment', basePrice: 1200, maxPrice: 8000, image: 'https://m.media-amazon.com/images/I/912A4x7uUYL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Dry Fruit Gift Box', basePrice: 2500, maxPrice: 15000, image: 'https://m.media-amazon.com/images/I/81TRZn27d0L._AC_UL640_FMwebp_QL65_.jpg' }
  ]

  const jewelryItems = [
    { name: 'Traditional Necklace', basePrice: 5000, maxPrice: 45000, image: 'https://m.media-amazon.com/images/I/81xt17gEPzL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Bangles Set', basePrice: 1200, maxPrice: 12000, image: 'https://m.media-amazon.com/images/I/61UyMgmyAnL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Earrings', basePrice: 1500, maxPrice: 15000, image: 'https://m.media-amazon.com/images/I/71r5OfkwXeL._AC_UL640_FMwebp_QL65_.jpg' },
    { name: 'Ring', basePrice: 2000, maxPrice: 25000, image: 'https://m.media-amazon.com/images/I/61npoHPNLHL._AC_UL640_FMwebp_QL65_.jpg' }
  ]

  const allItems = [
    ...electronicsItems.map(item => ({ ...item, category: 'Electronics' })),
    ...clothingItems.map(item => ({ ...item, category: 'Clothing' })),
    ...homeItems.map(item => ({ ...item, category: 'Home & Kitchen' })),
    ...beautyItems.map(item => ({ ...item, category: 'Beauty & Personal Care' })),
    ...sportsItems.map(item => ({ ...item, category: 'Sports & Outdoors' })),
    ...toysItems.map(item => ({ ...item, category: 'Toys & Games' })),
    ...foodItems.map(item => ({ ...item, category: 'Food & Grocery' })),
    ...jewelryItems.map(item => ({ ...item, category: 'Jewelry' }))
  ]

  // Generate 30-35 products
  const productCount = Math.floor(Math.random() * 6) + 30 // 30-35 products

  for (let i = 0; i < productCount; i++) {
    const itemIndex = Math.floor(Math.random() * allItems.length)
    const item = allItems[itemIndex]

    // Generate a price between basePrice and maxPrice
    const price = Math.floor(Math.random() * (item.maxPrice - item.basePrice + 1)) + item.basePrice

    // Make sure price is not over 50000 Rs
    const finalPrice = Math.min(price, 50000)

    products.push({
      id: i + 1,
      name: item.name,
      price: finalPrice,
      category: item.category,
      image: item.image,
      description: `High quality ${item.name.toLowerCase()} made in Pakistan. Perfect for everyday use and special occasions.`,
      rating: Math.floor(Math.random() * 5) + 1,
      inStock: Math.random() > 0.1 // 90% chance of being in stock
    })
  }

  return products
}
