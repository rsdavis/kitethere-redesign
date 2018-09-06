<template>
  <div class="panel">
    <nuxt-link class="panel__link" v-for="spot in ordered" :key="spot.id" :to="'/spots/' + spot.id">
      <AppSearchPanelItem :spot="spot"/>
    </nuxt-link>
  </div>
</template>

<script>
import AppSearchPanelItem from '@/components/AppSearchPanelItem.vue'
export default {

  components: { AppSearchPanelItem },

  computed: {
    selectedSpot () { return this.$store.getters['search/selectedSpot'] },
    spotsInBounds () { return this.$store.getters['search/spotsInBounds'] },
    ordered () {
      let arr = JSON.parse(JSON.stringify(this.spotsInBounds))
      arr.sort((a,b) => { 
        const aa = a.images.length * a.sections.length
        const bb = b.images.length * b.sections.length
        return (bb - aa)
      })
      return arr
    }
  },

  watch: {

    // whenever a spot is selected, scroll the panel to its location
    'selectedSpot' () {
      this.$nextTick(() => {
        var div = document.getElementsByClassName('panel__item--selected')[0]
        var rect = div.getBoundingClientRect()
        window.scrollBy(0, rect.top - 80)
      })
    }

  }

}
</script>

<style>
.panel {
  display: grid;
  grid-gap: 5px;
  align-content: start;
}
.panel__link {
  text-decoration: none;
}

</style>
