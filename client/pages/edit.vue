<template>
  <div class="edit">

    <div  class="edit__panels">
        <Panel header="Location">
          <div class="edit-location">
            <div id="edit-gmap"></div>
            <div class="edit-location__coordinates">
              
              <div class="edit-info__label">Spot Coordinates</div>
              
              <div class="edit-location__inline">Latitude</div>
              <input type="text" disabled="disabled" class="edit-location__coord edit__input" v-model="spot.lat">
              
              <div class="edit-location__inline">Longitude</div>
              <input type="text" disabled="disabled" class="edit-location__coord edit__input" v-model="spot.lng">
              
              <div class="edit-info__hint">Drop a pin on the map at the location of the spot.</div>
            </div>
          </div>
        </Panel>

        <Panel header="Basic Info">
          <div class="edit-info">

            <div class="edit-info__label">Spot Name</div>
            <input class="edit-info__name edit__input" v-model="spot.name">
            <div class="edit-info__hint">How do locals refer to this spot?</div>

            <div class="edit-info__label">Description</div>
            <textarea class="edit-info__description edit__textarea" v-model="spot.description"></textarea>
            <div class="edit-info__hint">A brief description of what to expect.</div>

          </div>
        </Panel>

        <Panel header="Content">

          Consider adding some sections with more specific information about the spot.
        
          <div class="edit-sections__suggested">
            <div class="edit-sections__suggested-button" 
              v-for="(s, ndx) in suggested"
              :key="ndx"
              @click="() => onClickSuggested(s)">
              {{ s }}
            </div>
          </div>

          <div class="edit-sections__section" v-for="(sec, ndx) in spot.sections" :key="ndx">

            <div class="edit-sections__section-icon">
              <font-awesome-icon :icon="faEdit" size="4x"></font-awesome-icon>
            </div>
            <input class="edit-sections__section-header edit__input" placeholder="Section Heading" v-model="sec.heading">
            <button class="edit-sections__section-control" @click="() => onClickSwap(ndx, ndx-1)" :disabled="ndx===0">
              <font-awesome-icon :icon="faArrowUp" size="lg"></font-awesome-icon>
            </button>
            <button class="edit-sections__section-control" @click="() => onClickSwap(ndx, ndx+1)" :disabled="ndx===spot.sections.length-1">
              <font-awesome-icon :icon="faArrowDown" size="lg"></font-awesome-icon>
            </button>
            <div class="edit-sections__section-control" @click="() => onClickTrash(ndx)">
              <font-awesome-icon :icon="faTrashAlt" size="lg"></font-awesome-icon>
            </div>
            <textarea class="edit-sections__section-body edit__textarea" placeholder="Section Body"></textarea>
          </div>

        </Panel>

        <Panel header="Images">
          <input id="uploader__input" type="file" @change="onChangeInput($event)">

          <div class="uploader" :class="{'uploader--uploading': mixinUploader_uploading}">
            <div class="uploader__item" v-for="(img,ndx) in mixinUploader_images" :key="ndx" @click="onClickItem(ndx)">
              <img class="uploader__image" v-bind:src="cloudify(img.url)">
              <div class="uploader__overlay">Remove</div>
            </div>

            <div class="btn" @click="onClickLabel" :disabled="mixinUploader_uploading">
              <font-awesome-icon v-if="mixinUploader_uploading" :icon="faSpinner" spin size='2x'/>
              <span v-if="!mixinUploader_uploading">Upload Photo</span>
            </div>
          </div>

        </Panel>

    </div>

  </div>
</template>

<script>
import googleMapsAPI from '@/assets/google-maps-load.js'
import Panel from '@/components/AppPanel.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp'
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

import mixinUploader from '@/components/MixinUploader.vue'

import Vue from 'vue'

export default {
  components: { Panel, FontAwesomeIcon },
  mixins: [ mixinUploader ],
  data () {
    return {

      spot: {
        name: '',
        description: '',
        lat: null,
        lng: null,
        sections: []
      },

      suggestedSections: [ "Getting There", "Launching", "Wind", "Precautions", "Custom" ],
      map: null,
      marker: null
    }
  },

  computed: {

    suggested () { 
      let headings = this.spot.sections.map(s => s.heading)
      let suggested = this.suggestedSections.filter(s => !headings.includes(s))
      return suggested
    },

    faArrowUp () { return faArrowUp },
    faArrowDown () { return faArrowDown },
    faTrashAlt () { return faTrashAlt },
    faEdit () { return faEdit },
    faSpinner () { return faSpinner }

  },

  mounted () {

    googleMapsAPI().then(() => {
      this.initMap()
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
      var element = document.getElementById('edit-gmap')
      this.map = new window.google.maps.Map(element, options)
      this.map.addListener('click', this.onClickMap)

    },

    onClickMap (event) {
      this.spot.lat = event.latLng.lat()
      this.spot.lng = event.latLng.lng()

      let markerOptions = {
        'position': { 'lat': this.spot.lat, 'lng': this.spot.lng },
        'map': this.map
      }

      if (this.marker === null) {
        this.marker = new window.google.maps.Marker(markerOptions)
      } else {
        this.marker.setPosition(event.latLng)
      }
    },

    onClickSuggested (item) {
      if (item == "Custom") item = ""
      this.spot.sections.push({heading: item, body: ''})
    },

    onClickSwap (i, j) {
      let temp = this.spot.sections[i];
      Vue.set(this.spot.sections, i, this.spot.sections[j])
      Vue.set(this.spot.sections, j, temp)
    },

    onClickTrash(ndx) {
      this.spot.sections.splice(ndx, 1)
    },


    // image uploader 

    onChangeInput () {
      var file = event.target.files[0]
      if (!file) return
      this.mixinUploader_getRequest(file)
    },


    cloudify (url) {
      const fetchURL = 'http://res.cloudinary.com/docvozwpw/image/fetch/'
      const transform = 'h_150,w_150,c_fill/'
      return fetchURL + transform + url
    },

    onClickItem (ndx) {
      this.mixinUploader_images.splice(ndx, 1)
    },

    onClickLabel () {
      if (this.uploading) return
      document.getElementById('uploader__input').click()
    },

  }
}
</script>

<style>

.edit__input {
  border: 1px solid #ccc;
  padding-left: 8px;
  border-radius: 4px;
  line-height: 30px;
  font-size: 14px;
  width: 100%;
}

.edit__textarea {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
}

.edit {
  margin-top: 20px;
  display: grid;
  grid-template-columns: var(--layout);
  font-size: 14px;
}

.edit__panels {
  display: grid;
  grid-gap: 5px;
  grid-column: 2;
}

#edit-gmap {
  width: 100%;
  height: 400px;
}

.edit-location {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
}



.edit-location__coordinates {
  display: grid;
  grid-gap: 10px;
  align-content: start;
  grid-template-columns: 1fr 5fr;
}

.edit-location__inline {
  grid-column: 1;
  font-size: 18px;
  line-height: 30px;
}


.edit-info {
}

.edit-info__label {
  font-size: 18px;
  margin-top: 10px;
  grid-column: 1 / -1;
}

.edit-info__hint {
  font-size: 14px;
  color: #464646;
  margin-bottom: 10px;
  grid-column: 1 / -1;

}


.edit-sections__suggested {
  margin-top: 10px;
  margin-bottom: 10px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: 30px;
}

.edit-sections__suggested-button {
  text-align: center;
  line-height: 30px;
  padding: 0px;
  border-radius: 4px;
  border: 1px solid #c8c8c8;
}

.edit-sections__suggested-button:hover {
  cursor: pointer;
}

.edit-sections__section {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(4, 30px);
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.edit-sections__section-icon {
  grid-column: span 1;
  grid-row: span 4;
  border-right: 4px solid #ccc;
  color: #ccc;
  text-align: center;
  margin-right: 5px;
}

.edit-sections__section-header {
  grid-column: span 6;
}

.edit-sections__section-control {
  grid-column: span 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
}

.edit-sections__section-control:hover {
  cursor: pointer;
}

.edit-sections__section-control:disabled {
  cursor: not-allowed;
}

.edit-sections__section-body {
  grid-column: span 9;
  grid-row: span 3;
}


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

.btn {
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  font-size: 18px;
  border: 1px solid rgb(200, 200, 200);

  height: var(--item-size);
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: 1;
  align-items: center;
  text-align: center;
  justify-items: center;
}

.btn:hover {
  cursor: pointer;
}

</style>
