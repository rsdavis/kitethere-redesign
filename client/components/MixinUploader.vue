<script>
import axios from 'axios'

export default {

  data () {
    return {
      mixinUploader_images: [],
      mixinUploader_uploading: false
    }
  },

  methods: {

    mixinUploader_getRequest (file) {
      this.mixinUploader_uploading = true
      
      axios({
        url: '/api/sign-s3?file-type=' + file.type,
        method: 'get'
      }).then(response => {
        var {signedRequest, url, name} = response.data
        this.mixinUploader_uploadFile(file, signedRequest, url, name)
      }).catch(error => {
        alert('Error uploading image: ' + error)
        this.mixinUploader_uploading = false
      })

    },

    mixinUploader_uploadFile (file, signedRequest, url, name) {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', signedRequest)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var img = { 'name': name, 'url': url }
            this.mixinUploader_images.push(img)
            this.mixinUploader_uploading = false
          } else {
            alert('Error uploading image: Could not upload file.')
            this.mixinUploader_uploading = false
          }
        }
      }
      xhr.send(file)
    }
  }
}
</script>