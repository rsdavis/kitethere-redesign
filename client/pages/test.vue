<template>
  <div>test</div>
</template>


<script>
import axios from 'axios'

export default {
  asyncData(context) {
    console.log('hello')
    axios({
      method: 'get',
      url: 'http://api:8000'
    }).then(response => {
      console.log(response.data)
    }).catch(err => console.log(err))
  }
}
</script>
