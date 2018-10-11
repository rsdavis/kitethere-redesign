<template>
  <div class="lightbox" v-if="active">
    <div class="lightbox__modal"></div>
    <span class="lightbox__close-button" @click="onClickClose">&times;</span>
    <span class="lightbox__prev-button" v-if="index>0" @click="onClickPrev">&#10094;</span>
    <img class="lightbox__img" :src="urls[index]">
    <span class="lightbox__next-button" v-if="current!==length" @click="onClickNext">&#10095;</span>
    <div class="lightbox__number" v-if="length>1"> {{ current }} / {{ length }}</div>
  </div>
</template>

<script>

// urls: list of urls
// init: the initial image to show
// active: bool if the lightbox is showing or closed

export default {
  props: [ 'urls', 'init', 'active' ],

  data () {
    return {
      index: this.init
    }
  },

  computed: {
    current () { return this.index + 1 },
    length () { return this.urls.length }
  },

  methods: {
    onClickPrev () { this.index -= 1 },
    onClickNext () { this.index += 1 },
    onClickClose () { this.$emit('update:active', false) }
  },

  watch: {
    'init' (value) { this.index = value }
  }
}
</script>

<style>
.lightbox { 
  z-index: 11;
  font-size: 40px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: calc(8vw) calc(84vw) calc(8vw);
  grid-template-rows: calc(8vh) calc(84vh) calc(8vh);
}

.lightbox__modal {
  z-index: 12;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: rgba(0, 0, 0, 0.8);
}

.lightbox__close-button {
  z-index: 13;
  color: white;
  font-size: 50px;
  font-weight: bold;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  align-self: center;
  justify-self: center;
}

.lightbox__close-button:hover,
.lightbox__close-button:focus {
  cursor: pointer;
}

.lightbox__next-button,
.lightbox__prev-button {
  z-index: 13;
  color: white;
  font-weight: bold;
  align-self: center;
  justify-self: center;
}

.lightbox__prev-button {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.lightbox__next-button {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}

.lightbox__prev-button:hover,
.lightbox__next-button:hover {
  cursor: pointer;
}

.lightbox__prev-button:disabled,
.lightbox__next-button:disabled {
  display: none;
}

.lightbox__number {
  z-index: 13;
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  color: white;
  align-self: center;
  justify-self: center;
}

.lightbox__img {
  z-index: 12;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
