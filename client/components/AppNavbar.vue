<template>
  <div class="nav">
    <div class="nav__content">
      <nuxt-link class="nav__logo" to="/">KiteThere</nuxt-link>
      <nuxt-link class="nav__link" to="/">home</nuxt-link>
      <div class="nav__link">about</div>
      <nuxt-link class="nav__link" to="/map">map</nuxt-link>
    </div>
  </div>
</template>

<style>
.nav {
  border-bottom: 1px solid rgb(220, 220, 220);
  height: 80px;
  display: grid;
  grid-template-columns: var(--layout);
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
}
.nav__content {
  grid-column: 2;
  display: grid;
  grid-template-columns: 1fr 100px 100px 100px;
  align-items: center;
}
.nav__logo {
  text-decoration: none;
  font-size: 32px;
  font-weight: bold;
  color: rgb(30, 40, 50);
}
.nav__link {
  justify-self: right;
  color: rgb(36, 50, 67);
  text-decoration: none;
}
@media only screen and (max-width: 1000px) {
  .nav__link {
    display: none;
  }
}
</style>