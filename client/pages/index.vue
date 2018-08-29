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
    }
}
</script>

