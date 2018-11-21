<template>
  <div class="search">
    <div class="search__content">

      <div class="search__map" :class="{'search__map--squeezed': mapSqueezed}">
        <AppSearchMap></AppSearchMap>
      </div>

      <div class="search__panel" v-if="!this.mobile">
        <AppSearchPanel></AppSearchPanel>
      </div>

      <div class="search__item" v-if="this.mapSqueezed">
        <nuxt-link class="panel__link"  :to="'/spots/' + selectedSpot.id  ">
          <AppSearchPanelItem :spot="selectedSpot"></AppSearchPanelItem>
        </nuxt-link>
      </div>

    </div>
  </div>
</template>

<script>

import axios from 'axios'

import AppSearchMap from '@/components/AppSearchMap.vue'
import AppSearchPanel from '@/components/AppSearchPanel.vue'
import AppSearchPanelItem from '@/components/AppSearchPanelItem.vue'

export default {

  components: { AppSearchMap, AppSearchPanel, AppSearchPanelItem },

  head() {
    return {
      title: 'KiteThere - Map',
      meta: [
        { hid: 'description', name: 'description', content: 'KiteThere is a social site focused on gathering local knowledge about kiteboarding spots around the world!' }
      ]
    }
  },

  // the fetch function is called before loading the page
  // its used to fetch data and fill the store
  async fetch ({ store, params, req }) {
    
    try {

      let protocol = req ? req.protocol + ':' : window.location.protocol
      let host = req ? req.headers.host : window.location.host
      let url = protocol + '//' + host + '/api/spots'

      let response = await axios.get(url) 
      await store.commit('search/setSpots', response.data)

  } catch (err) {
      console.error(err)
    }
    
  },

  data () {
    return {
      mobile: false
    }
  },

  computed: {
    selectedSpot () { return this.$store.getters['search/selectedSpot'] },
    spotSelected () { return this.$store.getters['search/spotSelected'] },
    mapSqueezed () { return this.mobile && this.spotSelected }
  },

  mounted () {
    // add media query listener and call immediately
    var mediaQuery = window.matchMedia("(max-width: 1000px)")
    mediaQuery.addListener(this.mediaListener)
    this.mediaListener(mediaQuery)

  },

  methods: {

    mediaListener (query) {
      if (query.matches) this.mobile = true
      else this.mobile = false
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
  height: calc(100vh - 80px - 160px);
}

@media only screen and (min-width: 1000px) {
  .search__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
}

@media only screen and (max-width: 1000px) {
  .search__content {
    display: grid;
    grid-template-rows: calc(100vh - 80px - 160px) 160px;
    align-items: center;
  }
}

</style>
