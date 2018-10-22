
<template>
  <div class="hero__button">
    <div class="hero__button-icon">
      <font-awesome-icon :icon="icon" size="lg"></font-awesome-icon>
    </div>
    <div class="hero__button-text">{{ text }}</div>
  </div>
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
  --hero-button-height: 60px;
  --hero-button-font-size: 36px;

  border: 2px solid var(--dark-blue);
  border-radius: 0px;
  text-decoration: none;
  display: grid;
  grid-template-columns: var(--hero-button-height) 1fr;
  grid-template-rows: var(10px);
  box-sizing: border-box;
  border-radius: 5px;
}
.hero__button-icon {
  background-color: var(--dark-blue);
  color: white;
  text-align: center;
  line-height: var(--hero-button-height);
  height: var(--hero-button-height);
}
.hero__button-text {
  text-decoration: none;
  color: var(--dark-blue);
  text-align: center;
  line-height: var(--hero-button-height);
  font-size: var(--hero-button-font-size);
}
.hero__button:hover > .hero__button-text {
  background-color: var(--dark-blue);
  color: white;
  cursor: pointer;
}

@media (max-width: 600px) {
  .hero__button {
    --hero-button-height: 40px;
    --hero-button-font-size: 30px;
  }
}
</style>