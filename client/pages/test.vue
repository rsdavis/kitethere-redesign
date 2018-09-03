<template>
  <div>test</div>
</template>


<script>
import axios from 'axios'

export default {
  fetch({ context, params }) {
    axios({
      method: 'get',
      url: 'http://172.18.0.2:8000/spots'
    }).then(data => {
      console.log(data)
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>
