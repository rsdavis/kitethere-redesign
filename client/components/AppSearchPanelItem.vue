<template>
  <div class="panel__item" :class="{'panel__item--selected': selected}">
    <div class="panel__item-left">
      <div class="panel__item-name">{{ spot.name }}</div>
      <div class="panel__item-description">{{ trim(spot.description) }}</div>
      <div class="panel__item-sections">
        <div class="panel__item-section" v-for="(sec, ndx) in spot.sections" :key="ndx">{{ sec.heading }}</div>
      </div>
    </div>
    <div class="panel__item-right" v-if="spot.images.length > 0 && spot.images[0].url">
      <img :src="cloudify(spot.images[0].url)" />
    </div>
  </div>
</template>


<script>
export default {
  props: ['spot'],

  computed: {
    selectedSpot () { return this.$store.getters['search/selectedSpot'] },
    selected () { 
      return (this.selectedSpot && this.selectedSpot.id === this.spot.id)
    }
  },

  methods: {

    cloudify (url) {
      var base = 'https://res.cloudinary.com/docvozwpw/image/fetch/'
      var transform = 'h_150,w_150,c_fill/'
      return base + transform + url
    },

    trim (text) {
      if (text) return text.substring(0, 120) + '...'
      else return ''
    }
  },
}
</script>

<style>

.panel__item {
  border: 1px solid rgb(240, 240, 240);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 150px;
  background-color: rgb(250, 250, 250);
  color: rgb(36, 50, 67);
}

.panel__item:hover {
  cursor: pointer;
  background-color: rgb(240, 240, 240);
  border: 1px solid rgb(200, 200, 200);
}

.panel__item-left {
  padding: 5px;
  overflow: hidden;
}

.panel__item-name {
  font-weight: bold;
  font-size: 22px;
}

.panel__item-description {
  padding-top: 5px;
  color: rgb(70, 70, 70);
}

.panel__item-sections {
  padding-top: 5px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, auto));
  grid-gap: 5px;
}

.panel__item-section {
  background-color: rgba(116, 190, 170, 0.4);
  border-radius: 10px;
  padding: 1px 10px 1px 10px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(36, 50, 67);
}

.panel__item--selected  {
  color: rgb(192, 57, 43);
}
</style>
