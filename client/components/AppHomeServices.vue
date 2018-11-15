<template>
  <div class="services">
    <div class="services__content">

      <div class="services__item">
        <div class="services__icon">
          <font-awesome-icon class="services__icon-bg" :icon="faSquare" size="8x"/>
          <font-awesome-icon class="services__icon-fg" :icon="faGlobe" size="5x"/>
        </div>
        <div class="services__message">
          <h2>Find A Location</h2>
          <p>Search the map to find locations near you or destinations for you next trip. Click on a marker to get more detailed information about the spot.</p>
        </div>
      </div>

      <div class="services__item">
        <div class="services__icon">
          <font-awesome-icon class="services__icon-bg" :icon="faSquare" size="8x"/>
          <font-awesome-icon class="services__icon-fg" :icon="faMapMarkerAlt" size="5x"/>
        </div>
        <div class="services__message">
          <h2>Add A Spot</h2>
          <p>Search the map to find locations near you or destinations for you next trip. Click on a marker to get more detailed information about the spot.</p>
        </div>
      </div>

      <div class="services__item">
        <div class="services__icon">
          <font-awesome-icon class="services__icon-bg" :icon="faSquare" size="8x"/>
          <font-awesome-icon class="services__icon-fg" :icon="faPencilAlt" size="5x"/>
        </div>
        <div class="services__message">
          <h2>Edit Content</h2>
          <p>Search the map to find locations near you or destinations for you next trip. Click on a marker to get more detailed information about the spot.</p>
        </div>
      </div>

      <div class="services__item">
        <div class="services__icon">
          <font-awesome-icon class="services__icon-bg" :icon="faSquare" size="8x"/>
          <font-awesome-icon class="services__icon-fg" :icon="faImage" size="5x"/>
        </div>
        <div class="services__message">
          <h2>Upload Images</h2>
          <p>Search the map to find locations near you or destinations for you next trip. Click on a marker to get more detailed information about the spot.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import faSquare from '@fortawesome/fontawesome-free-solid/faSquare'
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt'
import faGlobe from '@fortawesome/fontawesome-free-solid/faGlobe'
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import faImage from '@fortawesome/fontawesome-free-solid/faImage'
export default {
  components: { FontAwesomeIcon, FontAwesomeLayers },
  computed: {
    faSquare () { return faSquare },
    faMapMarkerAlt () { return faMapMarkerAlt },
    faGlobe () { return faGlobe },
    faPencilAlt () { return faPencilAlt },
    faImage () { return faImage }
  }
}
</script>

<style>
.services {
  display: grid;
  grid-template-columns: var(--layout);
}
.services__content {
  grid-column: 2;
  padding: 100px 0 100px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
.services__item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 30px;
  align-items: center;
}
.services__icon {
  color: rgb(116, 190, 170);
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: 1;
  justify-items: center;
  align-items: center;
}
.services__icon > * {
  grid-column: 1;
  grid-row: 1;
}
.services__icon-fg {
  color: white;
}
.services__message {
  color: rgb(36, 50, 67);
}
@media only screen and (max-width: 800px) {
  .services__content {
    grid-template-columns: 1fr;
  }
}
</style>