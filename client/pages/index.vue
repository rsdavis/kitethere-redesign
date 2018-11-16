<template>

    <div class="home">
        <AppHomeHero></AppHomeHero>
        <AppHomeAbout></AppHomeAbout>
        <AppHomeServices></AppHomeServices>
        <AppHomeFooter></AppHomeFooter>
    </div>

</template>

<script>
import AppHomeHero from '@/components/AppHomeHero.vue'
import AppHomeAbout from '@/components/AppHomeAbout.vue'
import AppHomeServices from '@/components/AppHomeServices.vue'
import AppHomeFooter from '@/components/AppHomeFooter.vue'

export default {
    components: { 
        AppHomeHero, 
        AppHomeAbout, 
        AppHomeServices, 
        AppHomeFooter 
    },

    head() {
      return {
        title: 'KiteThere',
        meta: [
          { hid: 'description', name: 'description', content: 'Kite Spot Repository' },
          { hid: 'google-site-verification', name: 'google-site-verification', content: '9g6fsjaBmN7zTKTZqEiX6iSNA6whdwTT7MfB5fzblEk'}
        ]
      }
    }
}
</script>

