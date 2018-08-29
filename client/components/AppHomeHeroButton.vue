
<template>
  <nuxt-link class="hero__button" to="/map">
    <div class="hero__button-icon">
      <font-awesome-icon :icon="icon" size="lg"></font-awesome-icon>
    </div>
    <div class="hero__button-text">{{ text }}</div>
  </nuxt-link>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  props: ["icon", "text"],
  components: { FontAwesomeIcon }
}
</script>
<style>
.hero__button {
  border: 2px solid var(--dark-blue);
  border-radius: 0px;
  text-decoration: none;
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 60px;
  box-sizing: border-box;
}
.hero__button-icon {
  background-color: var(--dark-blue);
  color: white;
  text-align: center;
  line-height: 60px;
}
.hero__button-text {
  text-decoration: none;
  color: var(--dark-blue);
  text-align: center;
  line-height: 60px;
  font-size: 36px;
}
.hero__button:hover > .hero__button-text {
  background-color: var(--dark-blue);
  color: white;
  cursor: pointer;
}
</style>