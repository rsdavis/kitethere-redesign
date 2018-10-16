<template>
  <div>
    <input id="uploader__input" type="file" @change="onChangeInput($event)">

    <div class="uploader" :class="{'uploader--uploading': mixinUploader_uploading}">
      <div class="uploader__item" v-for="(img,ndx) in mixinUploader_images" :key="ndx" @click="onClickItem(ndx)">
        <img class="uploader__image" v-bind:src="cloudify(img.url)">
        <div class="uploader__overlay">Remove</div>
      </div>
    </div>

    <button class="btn" @click="onClickLabel" :disabled="mixinUploader_uploading">
      <font-awesome-icon v-if="mixinUploader_uploading" :icon="faSpinner" spin size='lg'/>
      <span v-if="!mixinUploader_uploading">Upload Photo</span>
    </button>

  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

import mixinUploader from '@/components/MixinUploader.vue'

export default {
  components: { FontAwesomeIcon },

  mixins: [ mixinUploader ],

  methods: {
    onClickLabel () {
      if (this.uploading) return
      document.getElementById('uploader__input').click()
    },

    onChangeInput () {
      var file = event.target.files[0]
      if (!file) return
      this.mixinUploader_uploading = true
      this.mixinUploader_getRequest(file)
    },

    onClickItem (ndx) {
      this.mixinUploader_images.splice(ndx, 1)
    },

    cloudify (url) {
      const fetchURL = 'http://res.cloudinary.com/docvozwpw/image/fetch/'
      const transform = 'h_150,w_150,c_fill/'
      return fetchURL + transform + url
    }
  },

  computed: {
    faSpinner () { return faSpinner }
  },

  mounted () {
    this.mixinUploader_images = this.$store.state.add.images
  },

  watch: {
    'mixinUploader_images' () {
      this.$store.commit('add/updateImages', this.mixinUploader_images)
    }
  }

}
</script>

<style>

.uploader {
  --item-size: 150px;

  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, var(--item-size));
  grid-auto-flow: dense;
}

#uploader__label {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: var(--kt-dark);
  color: white;
}

#uploader__input {
  visibility: hidden;
  grid-column: 2 / -1;
  height: 0;
  padding: 0;
  margin: 0;
}

#uploader__label:hover {
  cursor: pointer;
  color: var(--kt-dark);
  background-color: white;
}

.uploader--uploading > #uploader__label:hover {
  cursor: wait;
  background-color: white;
}

.uploader__item {
  height: var(--item-size);
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: 1;
  border-radius: 5px;
}

.uploader__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  border-radius: inherit;
}

.uploader__overlay {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  z-index: -1;
  background-color: rgba(50, 50, 50, 0.7);
  color: white;
  text-align: center;
  line-height: var(--item-size);
  border-radius: inherit;
}

.uploader__item:hover .uploader__overlay {
  z-index: 1;
  cursor: pointer;
}
</style>
