<template>
  <div class="spot">
    <div class="spot__content">
      <div class="spot__map">
        <div id="spot-map"></div>
      </div>
      <div class="spot__text">
        <div class="spot__hero">
          <div class="spot__name">{{ spot.current.name }}</div>
          <div class="spot__description">{{ spot.current.description }}</div>
        </div>

        <div class="spot__section" v-for="(sec, ndx) in spot.current.sections" :key="ndx">
          <div class="spot__section-heading">{{ sec.heading }}</div>
          <div class="spot__section-body">{{ sec.body }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import googleMapsApi from '@/assets/google-maps-load.js'

export default {

  async asyncData ({ params, env }) {

    try {

      let url = 'http://localhost:3000/api/spots/' + params.id
      let response = await axios.get(url)
      return { spot: response.data }

    } catch (e) {
      console.log(e)
    }

  },

  mounted () {
    googleMapsApi().then(this.initMap)
  },

  methods: {

    initMap () {

      const lat = this.spot.current.lat
      const lng = this.spot.current.lng

      const options = {
        zoom: 12,
        center: { 'lat': lat, 'lng': lng },
        mapTypeId: 'hybrid',
        gestureHandling: 'greedy'
      }
      
      var element = document.getElementById('spot-map')
      this.map = new window.google.maps.Map(element, options)
      // this.map.addListener('bounds_changed', this.boundsChanged)

      let markerOptions = {
        'position': { 'lat': lat, 'lng': lng },
        'map': this.map
      }
      
      let marker = new window.google.maps.Marker(markerOptions)

    }

  }
}
</script>

<style>
.spot {
  display: grid;
  grid-template-columns: var(--layout);
}
.spot__content {
  grid-column: 2;
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-gap: 20px;
}
.spot__map {
  position: sticky;
  top: 80px;
  width: 100%;
  height: calc(100vh - 80px);
  background-color: rgba(36, 50, 67, 0.1);
}
#spot-map {
  margin: 25px auto 0 auto;
  height: 300px;
  width: 350px;
}
.spot__text {
  color: var(--dark-blue);
  display: grid;
  grid-gap: 25px;
  align-content: start;
  padding-top: 15px;
}
.spot__hero {
}
.spot__name {
  font-size: 42px;
}
.spot__description{
  font-size: 20px;
}
.spot__section-heading {
  font-size: 26px;
  border-bottom: 1px solid var(--dark-blue);
}
.spot__section-body {
  margin: 10px 0 0 15px;
  font-size: 20px;
}
</style>