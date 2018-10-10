<template>
  <div class="hero">

    <img class="hero__swoosh" src="@/assets/content-swoosh.svg">
    <img class="hero__img" src="@/assets/cropped.jpg" alt="">

    <div class="hero__content">

      <div class="hero__message">
        <h1 class="hero__title">Kite Spot Repository</h1>
        <p>KiteThere is mapping out the globe, one spot at a time.</p>

        <div class="hero__controls">
          <nuxt-link to="/map">
            <AppHomeHeroButton :icon="faGlobe" :text="'Go To Map'"></AppHomeHeroButton>
          </nuxt-link>

          <AppHomeHeroButton :icon="faMapMarkerAlt" :text="'Add A Spot'"></AppHomeHeroButton>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import AppHomeHeroButton from '@/components/AppHomeHeroButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import faGlobe from '@fortawesome/fontawesome-free-solid/faGlobe'
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt'
export default {
  components: { FontAwesomeIcon, AppHomeHeroButton },
  computed: {
    faGlobe () { return faGlobe },
    faMapMarkerAlt () { return faMapMarkerAlt }
  }
}
</script>

<style>
.hero {
  --hero-height: 700px;
  display: grid;
  grid-template-columns: var(--layout);
  grid-template-rows: var(--hero-height);
}
.hero__content {
  z-index: 2;
  grid-column: 2;
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: var(--hero-height);
}
.hero__message {
  color: rgb(36, 50, 67);
  align-self: center;
  z-index: 2;
  font-size: 24px;
  width: 35%;
}
.hero__title {
  font-size: 44px;
}
.hero__swoosh {
  z-index: 1;
}
.hero__img {
  z-index: 0;
  height: var(--hero-height);
  object-fit: cover;
  object-position: 30% top;
}
.hero__controls {
  margin-top: 20px;
  display: grid;
  grid-gap: 20px;
}
@media only screen and (min-width: 1000px) {
  .hero__swoosh {
    transform: scaleY(-1);
    height: var(--hero-height);
    position: absolute;
    left: 25%;
  }
  .hero__img {
    position: absolute;
    left: 25%;
    width: 80%;
  }
}
@media only screen and (max-width: 1000px) {
  .hero__swoosh {
    transform: rotate(-90deg) scaleX(1) scaleY(1);
    transform-origin: 0 0;
    position: absolute;
    left: 00%;
    top: calc(80px + var(--hero-height));
    height: 100vw;
    width: 500px;
  }
  .hero__img {
    position: absolute;
    width: 100%;
    left: 0;
    object-position: 50% top;
  }
  .hero__message {
    align-self: end;
    width: 100%;
  }
  .hero__controls {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
  }
  .hero__controls a {
    text-decoration: none;
  }

}
</style>