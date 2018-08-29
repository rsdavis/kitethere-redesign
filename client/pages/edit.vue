<template>
  <div class="edit">
    <div class="accordion">
      <div class="accordion__panel" v-for="(panel, ndx) in panels" :key="ndx">
        <div class="accordion__header" @click="onClick(panel)">
          {{ panel.header }}
        </div>
        <div class="accordion__body" v-if="panel.visible">
          {{ panel.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      panels: [{
        visible: true,
        header: "header1",
        body: "body1"
      },{
        visible: true,
        header: "header2",
        body: "body2"
      }]
    }
  },

  methods: {
    onClick: (panel) => { panel.visible = !panel.visible }
  }
}
</script>


<style>

.accordion__panel {
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-columns: 500px;
}

.accordion__header {
  line-height: 50px;
  border: 1px solid black;
}

.accordion__header:hover {
  cursor: pointer;
}

.accordion__body {
  min-height: 50px;
}
</style>
