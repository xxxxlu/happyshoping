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

// Handicraft Items
const handicraftItems = [
  { name: 'Onyx Marble Pear Clock', basePrice: 950, maxPrice: 1500, image: 'https://m.media-amazon.com/images/I/71QesHsV-PL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Wooden Carved Matka', basePrice: 1800, maxPrice: 4500, image: 'https://m.media-amazon.com/images/I/61eu6Zu96VL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Blue Pottery Vase', basePrice: 1200, maxPrice: 3000, image: 'https://m.media-amazon.com/images/I/81G2nglD3vL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Brass Engraved Plate', basePrice: 1500, maxPrice: 4000, image: 'https://m.media-amazon.com/images/I/810NzRh3uwL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Camel Skin Lamp', basePrice: 3500, maxPrice: 12000, image: 'https://m.media-amazon.com/images/I/61gCOHSGt2L._AC_UL640_FMwebp_QL65_.jpg' }
];

// Textile Items
const textileItems = [
  { name: 'Traditional Sindhi Ajrak', basePrice: 1200, maxPrice: 3500, image: 'https://m.media-amazon.com/images/I/81AfuZiltVL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Embroidered Pashmina Shawl', basePrice: 2500, maxPrice: 15000, image: 'https://m.media-amazon.com/images/I/81WTOT5Pe5L._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Sozni Work Pashmina Shawl', basePrice: 3000, maxPrice: 18000, image: 'https://m.media-amazon.com/images/I/61vp1xn0ToL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Plain Pashmina Shawl', basePrice: 1800, maxPrice: 6000, image: 'https://m.media-amazon.com/images/I/81aBQnDRbzL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Ajrak Pattern Cushion Cover', basePrice: 800, maxPrice: 2500, image: 'https://m.media-amazon.com/images/I/81GAuXWHwJL._AC_UL640_FMwebp_QL65_.jpg' }
];

// Clothing Items
const clothingItems = [
  { name: 'Traditional Kurta', basePrice: 1500, maxPrice: 8000, image: 'https://m.media-amazon.com/images/I/71eLPKVGaTL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Shalwar Kameez', basePrice: 2000, maxPrice: 15000, image: 'https://m.media-amazon.com/images/I/61qIfsjn5WL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Embroidered Shawl', basePrice: 1200, maxPrice: 12000, image: 'https://m.media-amazon.com/images/I/6146VPqq0bL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Traditional Cap', basePrice: 500, maxPrice: 3000, image: 'https://m.media-amazon.com/images/I/71bMNEuQAkL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Designer Dupatta', basePrice: 800, maxPrice: 5000, image: 'https://m.media-amazon.com/images/I/71DnT6bds+L._AC_UL640_FMwebp_QL65_.jpg' }
];

// Leather Goods
const leatherItems = [
  { name: 'Handcrafted Leather Wallet', basePrice: 1200, maxPrice: 3500, image: 'https://m.media-amazon.com/images/I/81ZNoGhb+GL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Leather Sandals', basePrice: 1500, maxPrice: 4500, image: 'https://m.media-amazon.com/images/I/71ZWmV-gGNL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Embossed Leather Journal', basePrice: 1800, maxPrice: 4000, image: 'https://m.media-amazon.com/images/I/81CwYoA0mqL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Traditional Leather Pouf', basePrice: 4500, maxPrice: 12000, image: 'https://m.media-amazon.com/images/I/61q6LsjOkCL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Leather Belt with Brass Buckle', basePrice: 1000, maxPrice: 2500, image: 'https://m.media-amazon.com/images/I/71QTUucV5mL._AC_UL640_FMwebp_QL65_.jpg' }
];

// Home Decor Items
const homeDecorItems = [
  { name: 'Truck Art Miniature', basePrice: 1800, maxPrice: 5000, image: 'https://m.media-amazon.com/images/I/51S0vX-ZYvL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Copper Water Pot', basePrice: 2500, maxPrice: 6000, image: 'https://m.media-amazon.com/images/I/51vbehGrZQL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Brass Door Knocker', basePrice: 1200, maxPrice: 3500, image: 'https://m.media-amazon.com/images/I/51vbehGrZQL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Hand-Knotted Wool Carpet', basePrice: 8000, maxPrice: 45000, image: 'https://m.media-amazon.com/images/I/A1qS4R68xGL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Wooden Carved Wall Panel', basePrice: 3500, maxPrice: 12000, image: 'https://m.media-amazon.com/images/I/81ryITO2J8L._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Brass Engraved Tray', basePrice: 2200, maxPrice: 5500, image: 'https://m.media-amazon.com/images/I/919eLZ2rArL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Handmade Ceramic Plates', basePrice: 1800, maxPrice: 4500, image: 'https://m.media-amazon.com/images/I/81mXhi6C6VL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Traditional Wooden Jewelry Box', basePrice: 2500, maxPrice: 7000, image: 'https://m.media-amazon.com/images/I/81R8LJeu6GL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Marble Inlay Coaster Set', basePrice: 1200, maxPrice: 3000, image: 'https://m.media-amazon.com/images/I/71EmMnt+ilL._AC_UL640_FMwebp_QL65_.jpg' },
  { name: 'Handwoven Jute Rug', basePrice: 2800, maxPrice: 9000, image: 'https://m.media-amazon.com/images/I/81NYjzUG6WL._AC_UL640_FMwebp_QL65_.jpg' }
];



  const allItems = [
    ...handicraftItems.map(item => ({ ...item, category: 'Handicraft' })),
    ...textileItems.map(item => ({ ...item, category: 'Textile' })),
    ...leatherItems.map(item => ({ ...item, category: 'Leather' })),
    ...homeDecorItems.map(item => ({ ...item, category: 'Home Decor' })),
    ...clothingItems.map(item => ({ ...item, category: 'Clothing' }))
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
