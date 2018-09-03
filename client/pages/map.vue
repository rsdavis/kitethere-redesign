<template>
  <div class="search">
    <div class="search__content">

      <div class="search__map">
        <AppSearchMap></AppSearchMap>
      </div>

      <div class="search__panel" v-if="!mobile">
        <AppSearchPanel></AppSearchPanel>
      </div>

      <div class="search__item" v-if="mobile">
        Item
      </div>

    </div>
  </div>
</template>

<script>
import AppSearchMap from '@/components/AppSearchMap.vue'
import AppSearchPanel from '@/components/AppSearchPanel.vue'

export default {

  components: { AppSearchMap, AppSearchPanel },

  async fetch ({ store, params, env }) {
    let url = 'http://localhost:8000/spots'
    await store.dispatch('spots/fetch', url)
  },

  data () {
    return {
      mobile: true
    }
  },

  computed: {
    selection () { return this.$store.getters['spots/selection'] },
    squeezed () { return this.mobile && this.selection }
  },

  mounted () {
    var mediaQuery = window.matchMedia("(max-width: 1000px)")
    mediaQuery.addListener(this.onResize)
    this.onResize(mediaQuery)
    // this.switchSqueezed(this.squeezed)
  },
  
  methods: {
    onResize (mq) { this.mobile = mq.matches },
    switchSqueezed (squeezed) {
      var element = document.getElementsByClassName('search__map')[0]
      if (squeezed) element.classList.add('search__map--squeezed')
      else element.classList.remove('search__map--squeezed')
    }
  },

  watch: {
    'squeezed' (squeezed) { this.switchSqueezed(squeezed) }
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