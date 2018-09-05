<template>
  <div class="search">
    <div class="search__content">

      <div class="search__map" id="search__map">
        <AppSearchMap></AppSearchMap>
      </div>

    </div>
  </div>
</template>

<script>

import axios from 'axios'

import AppSearchMap from '@/components/AppSearchMap.vue'

export default {

  components: { AppSearchMap },

  // the fetch function is called before loading the page
  // its used to fetch data and fill the store
  async fetch ({ store, params }) {
    
    let response = await axios.get(process.env.API_URL + '/spots')
    let spots = response.data

    await store.commit('search/setSpots', spots)

  },

  data () {
    return {
      mobile: false
    }
  },

  computed: {
    spotSelected () { return this.$store.getters['search/spotSelected'] },
    mapSqueezed () { return this.mobile && this.spotSelected }
  },

  mounted () {

    // add media query listener and call immediately
    var mediaQuery = window.matchMedia("(max-width: 1000px)")
    mediaQuery.addListener(this.mediaListener)
    this.mediaListener(mediaQuery)

  },

  watch: {
    'mapSqueezed' (squeezed) { this.switchSqueezed(squeezed) }
  },

  methods: {

    mediaListener (query) {
      if (query.matches) this.mobile = true
      else this.mobile = false
    },

    switchSqueezed (squeezed) {
      console.log('switch squeezed')
      var element = document.getElementById("search__map")
      if (squeezed) element.classList.add("search__map--squeezed")
      else element.classList.remove("search__map--squeezed")
    }

  }

}
</script>


<style>

.search {
  display: grid;
  grid-template-columns: var(--layout);
}

.search__content {
  grid-column: 2;
}

.search__map {
  position: sticky;
  top: 80px;
  width: 100%;
  height: calc(100vh - 80px);
}

.search__map--squeezed {
  height: calc(100vh - 80px - 150px);
}

@media only screen and (min-width: 1000px) {
  .search__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  .search__item {
    display: none;
  }
}

@media only screen and (max-width: 1000px) {
  .search__content {
    display: grid;
    grid-template-rows: calc(100vh - 80px - 150px) 150px;
  }
  .search__panel {
    display: none;
  }
}

</style>
