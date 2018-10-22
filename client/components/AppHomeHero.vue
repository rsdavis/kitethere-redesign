<template>
  <div class="hero">
    <div class="hero__image">
      <img class="hero__img" :src="kitethere_hero_image">
    </div>

    <img class="hero__content-swoosh" src="@/assets/content-swoosh.svg">

    <div class="hero__message">
      <div class="hero__title">Kite Spot Repository</div>
      <div class="hero__body">Don't get caught on the beach with your lines down. Check out the map and read up on the spot before you go. Add your favorite spot to the site.</div>
      <AppHomeHeroButton :icon="faGlobe" :text="'Map'"></AppHomeHeroButton>
      <AppHomeHeroButton :icon="faMapMarkerAlt" :text="'Add Spot'"></AppHomeHeroButton>
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
  },
  data () {
    return {
      kitethere_hero_image: 'https://res.cloudinary.com/docvozwpw/image/upload/kitethere-hero-image.jpg'
    }
  }
}
</script>

<style>

.hero {
  display: grid;
  grid-template-columns: var(--layout);
  grid-template-rows: 700px;
}

.hero__image {
  grid-row: 1;
  grid-column: 2 / -1;
  overflow: hidden;
}

@media (min-width: 2000px) {
  .hero__img {
    width: 100%;
  }
}

@media (min-width: 600px) and (max-width: 2000px) {
  .hero__img {
    position: relative;
    width: 1600px;
    left: calc((100vw - 2000px) * 0.4)
  }
}

@media (max-width: 600px) {
  .hero {
    grid-template-rows: calc( 6/6 * 100vw) auto;
  }
  .hero__image {
    grid-column: 1 / -1; 
  }
  .hero__img {
    position: relative;
    width: 266vw;
    left: calc(-0.3375 * 266vw);
  }
}

.hero__content-swoosh {
    grid-column: 2;
    grid-row: 1;
}

@media (min-width: 600px) {
  .hero__content-swoosh {
    transform: scaleY(-1);
    height: 700px;
  }
}

@media (max-width: 600px) {
  .hero__content-swoosh {
    grid-column: 1;
    transform-origin: 0 50%;
    height: 100vw;
    transform: rotate(-90deg)  translate(-50vw, 50vw);
    justify-self: left;
    align-self: end;
  }
}

.hero__message {
  display: grid;
  grid-gap: 10px;
  grid-column: 2;
  align-content: start;
  grid-template-columns: 1fr 1fr;
}

.hero__title {
  grid-column: 1 / -1;
  font-size: 32px;
}

.hero__body {
    font-size: 18px;
    grid-column: 1 / -1;
}

@media (min-width: 600px) {
  .hero__message {
    grid-row: 1;
    grid-column: 2;
    width: 500px;
    z-index: 3;
    align-self: end;
    margin-bottom: 40px;
    background-color: rgba(255, 255, 255, 1);
    padding: 20px;
    border-radius: 10px;
  }

  .hero__title {
  grid-column: 1 / -1;
  font-size: 50px;
}
.hero__body {
    font-size: 24px;

}
}

@media (max-width: 600px) {
  .hero__message {
        grid-template-columns: 1fr;
  }
}
</style>