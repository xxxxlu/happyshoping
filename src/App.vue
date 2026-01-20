<template>
  <div id="app">
    <header>
      <div class="logo-container">
        <router-link to="/" class="logo">
          <img src="/images/logo-header.svg" alt="ddgotobuy" class="logo-image">
        </router-link>
      </div>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/cart">Cart</router-link>
        <router-link to="/contact">Contact Us</router-link>
      </nav>
    </header>
    <main>
      <div class="container">
        <router-view/>
      </div>
    </main>
    <footer>
      <div class="footer-content">
        <div class="footer-logo">
          <img src="/images/logo-footer.svg" alt="ddgotobuy" class="footer-logo-image">
        </div>
        <div class="footer-payment-methods">
          <div class="payment-title">Accepted Payment Methods</div>
          <div class="payment-icons">
            <div class="payment-icon easypaisa">
              <img src="./assets/easypaisa.png" alt="Easypaisa">
            </div>
            <div class="payment-icon jazzcash">
              <img src="./assets/jazzcash.png" alt="JazzCash">
            </div>
          </div>
        </div>
        <p>Copyright © {{ new Date().getFullYear() }} happyshopping Store. Powered by NTN # G115295</p>
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
  color: #333;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
}

main {
  flex: 1;
  width: 100%;
  max-width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  width: 100%;
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo-container {
  padding: 15px 0;
  background: var(--primary-gradient);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.logo {
  display: inline-block;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo-image {
  height: 50px;
  width: auto;
  transition: all 0.3s ease;
}

.logo:hover .logo-image {
  transform: scale(1.05);
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
}

nav {
  padding: 15px 0;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

nav a {
  font-weight: bold;
  color: #333;
  text-decoration: none;
  margin: 0 15px;
  padding: 8px 0;
  position: relative;
  transition: all 0.3s ease;
}

nav a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background: var(--primary-gradient);
  transition: width 0.3s ease;
}

nav a:hover::after {
  width: 100%;
}

nav a.router-link-exact-active {
  color: var(--primary-color);
}

nav a.router-link-exact-active::after {
  width: 100%;
}

footer {
  width: 100%;
  background: linear-gradient(to right, #2c3e50, #4a5568);
  color: white;
  padding: 30px 0 20px;
  margin-top: auto;
}

.footer-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--container-padding, 20px);
  font-size: 14px;
}

.footer-logo {
  margin-bottom: 25px;
  text-align: center;
}

.footer-logo-image {
  height: 50px;
  width: auto;
  margin-bottom: 15px;
}

.footer-payment-methods {
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.payment-title {
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 16px;
  color: var(--secondary-color);
}

.payment-icons {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.payment-icon {
  padding: 8px 12px;
  border-radius: 8px;
  background-color: white;
  height: 40px;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.payment-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.payment-icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.payment-icon.easypaisa img {
  width: auto;
  height: 28px;
}

.payment-icon.jazzcash img {
  width: auto;
  height: 28px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  nav {
    padding: 10px 0;
  }
  
  nav a {
    margin: 0 10px;
    font-size: 14px;
  }
  
  .logo-image {
    height: 42px;
  }

  .footer-logo-image {
    height: 40px;
  }
  
  .payment-icon {
    width: 90px;
    height: 35px;
  }
}

@media (max-width: 480px) {
  nav a {
    margin: 0 5px;
    font-size: 13px;
  }
  
  .logo-image {
    height: 36px;
  }

  .footer-logo-image {
    height: 35px;
  }
}
</style>
