<template>
  <div class="edit">

    <div  class="panels">
      <Panel 
        v-for="(panel, ndx) in panels" 
        :key="ndx"
        :header="panel.header">
        
        {{ panel.body }}
        
      </Panel>
    </div>

  </div>
</template>

<script>
import Panel from '@/components/AppPanel.vue'

export default {
  components: { Panel },

  data () {
    return {
      panels: [{
        header: "a",
        body: "body1"
      },{
        header: "b",
        body: "body2"
      },{
        header: "c",
        body: "body3"
      }]
    }
  }

}
</script>

<style>
.panels {
  display: grid;
  grid-gap: 5px;
}
</style>
