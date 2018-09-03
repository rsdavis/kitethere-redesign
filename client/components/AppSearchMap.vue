<template>
    <div id="gmap"></div>
</template>

<script>
import googleMapsAPI from '@/assets/google-maps-load.js'
export default {
  data () {
    return {
      map: null,
      markers: {},
      mobile: false
    }
  },
  computed: {
    selection () { return this.$store.getters['spots/selection'] },
    collection () { return this.$store.getters['spots/collection'] },
    squeezed () { return this.mobile && this.selection }
  },
  mounted () {
    googleMapsAPI().then(() => {
      this.initMap()
      this.addMarkers()
    })
    var mediaQuery = window.matchMedia("(max-width: 1000px)")
    mediaQuery.addListener((match) => {
      if (match.matches) this.mobile = true
      else this.mobile = false
    })
    this.switchSqueezed(this.squeezed)
  },
  watch: {
    'squeezed' (squeezed) { this.switchSqueezed(squeezed) }
  },
  methods: {
    switchSqueezed (squeezed) {
      var element = document.getElementById("gmap")
      if (squeezed) element.classList.add("gmap--squeezed")
      else element.classList.remove("gmap--squeezed")
    },
    initMap () {
      const options = {
        zoom: 2,
        center: { 'lat': 10, 'lng': -50 },
        mapTypeId: 'hybrid',
        gestureHandling: 'greedy'
      }
      var element = document.getElementById('gmap')
      this.map = new window.google.maps.Map(element, options)
      this.map.addListener('bounds_changed', this.boundsChanged)
    },
    boundsChanged () {
      var mapBounds = this.map.getBounds()
      var mapCenter = this.map.getCenter()
      var center = {
        'lat': mapCenter.lat(),
        'lng': mapCenter.lng()
      }
      var bounds = {
        'northEast': {
          'lat': mapBounds.getNorthEast().lat(),
          'lng': mapBounds.getNorthEast().lng()
        },
        'southWest': {
          'lat': mapBounds.getSouthWest().lat(),
          'lng': mapBounds.getSouthWest().lng()
        }
      }
      this.$store.commit('map/setCenter', center)
      this.$store.commit('map/setBounds', bounds)
    },
    addMarker (map, id, lat, lng, name) {
      var args = {
        'position': { 'lat': lat, 'lng': lng },
        'map': map
      }
      var str = name
      var infoWindow = new google.maps.InfoWindow({
        content: str,
        disableAutoPan: true
      })
      var marker = new window.google.maps.Marker(args)
      var clickEvent = () => { this.$store.dispatch('spots/select', id) }
      var mouseoverEvent = () => { infoWindow.open(this.map, marker) }
      var mouseoutEvent = () => { infoWindow.close() }
      marker.addListener('click', clickEvent)
      marker.addListener('mouseover', mouseoverEvent)
      marker.addListener('mouseout', mouseoutEvent)
      this.markers[id] = marker
    },
    addMarkers () {
      this.collection.forEach(spot => {
        this.addMarker(this.map, spot.spotID, spot.position.lat, spot.position.lng, spot.name)
      })
    }
  }
}
</script>

<style>
#gmap {
  width: 100%;
  height: 100%;
}
.gm-style-iw + div {display: none;}
.gm-style-iw {text-align:center;}
</style>