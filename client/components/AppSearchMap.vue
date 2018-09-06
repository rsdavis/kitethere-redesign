
<template>
    <div id="gmap"></div>
</template>

<script>

// this component controls only whats within the bounds
// of the goolge map on the search page
// the height of the map is set by the parent page 
// the location info should already be loaded into the store

import googleMapsAPI from '@/assets/google-maps-load.js'

export default {

  data () {
    return {
      map: null,
      markers: {}
    }
  },

  computed: {
    locations () { return this.$store.getters['search/locations'] }
  },

  mounted () {

    googleMapsAPI().then(() => {
      this.initMap()
      this.addMarkers()
    })

  },

  methods: {

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

    // this is a map listener event
    boundsChanged () {

      // query the google api
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

      this.$store.commit('search/setCenter', center)
      this.$store.commit('search/setBounds', bounds)
    },

    addMarker (map, id, lat, lng, name) {
      let markerOptions = {
        'position': { 'lat': lat, 'lng': lng },
        'map': map
      }

      let infoWindow = new google.maps.InfoWindow({
        content: name,
        disableAutoPan: true
      })

      let marker = new window.google.maps.Marker(markerOptions)

      let clickEvent      = () => { this.$store.commit('search/selectSpot', id) }
      let mouseoverEvent  = () => { infoWindow.open(this.map, marker) }
      let mouseoutEvent   = () => { infoWindow.close() }

      marker.addListener('click', clickEvent)
      marker.addListener('mouseover', mouseoverEvent)
      marker.addListener('mouseout', mouseoutEvent)

      this.markers[id] = marker
    },

    addMarkers () {
      this.locations.forEach(loc => {
        this.addMarker(this.map, loc.id, loc.lat, loc.lng, loc.name)
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