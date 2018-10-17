<template>
  <div class="panel">
    <div class="panel__header" :class="{'panel__header-open': visible, 'panel__header-closed': !visible}" @click="visible = !visible">
      <h2>{{ header }}</h2>
      <font-awesome-icon v-if="visible" class="panel__icon" :icon="faAngleUp" size="2x"/>
      <font-awesome-icon v-if="!visible" class="panel__icon" :icon="faAngleDown" size="2x"/>
    </div>
    <div class="panel__body" v-show="visible">
      <slot></slot>
    </div>
  </div>
</template>


<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp'
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'

export default {
  props: [ 'header' ],
  components: { FontAwesomeIcon },
  computed: {
    faAngleUp () { return faAngleUp },
    faAngleDown () { return faAngleDown }
  },
  data() {
    return {
      visible: false
    }
  }
}

</script>


<style>
.panel__header {
  background-color: var(--dark-blue);
  color: white;
  line-height: 80px;
  padding-left: 20px;
  display: grid;
  grid-template-columns: auto 50px;
  align-items: center;
}

.panel__header-closed {
  border-radius: 10px;
}

.panel__header-open {
  border-radius: 10px 10px 0 0;
}

.panel__header:hover {
  cursor: pointer;
}

.panel__body {
  border: 2px solid var(--dark-blue);
  border-radius: 0 0 10px 10px;
  padding: 20px;
  width: 100%;
}
</style>
