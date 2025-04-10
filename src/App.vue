<template>
  <div id="app">
    <header>
      <div class="logo-container">
        <router-link to="/" class="logo">ddgotobuy</router-link>
      </div>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/products">Products</router-link> |
        <router-link to="/cart">Cart</router-link> |
        <router-link to="/contact">Contact Us</router-link>
      </nav>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <div class="footer-content">
        <div class="footer-payment-methods">
          <div class="payment-title">Accepted Payment Methods</div>
          <div class="payment-icons">
            <div class="payment-icon easypaisa">
              <img src="./assets/easypaisa.png" alt="">
            </div>
            <div class="payment-icon jazzcash">
              <img src="./assets/jazzcash.png" alt="">
            </div>
          </div>
        </div>
        <p>Copyright © 2025 | Powered by Data Network Solutions (SMC-Private) Limited</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-container {
  padding: 15px 0;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.logo {
  font-size: 28px;
  font-weight: bold;
  color: #42b983;
  text-decoration: none;
  letter-spacing: 1px;
  text-transform: uppercase;
}

nav {
  padding: 15px 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

footer {
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  margin-top: 30px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-size: 14px;
}

.footer-payment-methods {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.payment-title {
  margin-bottom: 10px;
  font-weight: bold;
}

.payment-icons {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.payment-icon {
  padding: 6px 10px;
  border-radius: 4px;
  background-color: white;
  height: 35px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.payment-icon.easypaisa img {
  width: auto;
  height: 25px;
}

.payment-icon.jazzcash img {
  width: auto;
  height: 25px;
}
</style>
