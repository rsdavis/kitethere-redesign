let mapPromise = null

export default function () {
  if (mapPromise) return mapPromise

  mapPromise = new Promise(function (resolve, reject) {
    if (window.google && window.google.maps) resolve()

    window['googleMapsApiCallback'] = resolve

    if (!document.getElementById('google-maps-api-script')) {
      const googleMapsApiScript = document.createElement('script')
      const base = 'https://maps.googleapis.com/maps/api/js'
      const key = 'AIzaSyBS53xtPUY8qBBDbQdBQXJ_AytS0Kiuww0'
      const callback = 'googleMapsApiCallback'
      const url = base + '?' + 'key=' + key + '&' + 'callback=' + callback

      googleMapsApiScript.setAttribute('id', 'google-maps-api-script')
      googleMapsApiScript.setAttribute('src', url)
      googleMapsApiScript.setAttribute('async', '')
      googleMapsApiScript.setAttribute('defer', '')

      document.head.appendChild(googleMapsApiScript)
    }
  })

  return mapPromise
}