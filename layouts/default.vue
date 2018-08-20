<template>
  <div class="container">
    <header>
      header
      <nuxt-link to="/">top</nuxt-link>
      <nuxt-link to="/wave">wave</nuxt-link>
    </header>
    <nuxt />
    <footer>
      footer
    </footer>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
}
header {
  position: fixed;
  background: rgba(255,255,255,0.8);
  box-shadow: 0 0 1px rgba(0,0,0,0.5);
  padding: 10px;
  width: 100%;
  z-index: 1;
}
footer {
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
