<script setup>
import getCollection from '@/composables/getCollection'
import { Icon } from '@iconify/vue'
import AboutUs from '@/components/AboutUs.vue'
import ClientsReivew from '@/components/ClientsReivew.vue'
import VisionMission from '@/components/VisionMission.vue'

const { documents : corevals } = getCollection('corevals')

corevals, Icon

</script>

<template>
<section class="text-white">

    <h1>About Optimity Team</h1>

    <AboutUs />

    <ClientsReivew />
    
    <VisionMission />

    <!-- Core Values -->
    <div v-for="coreval in corevals" :key="coreval.id" class="max-w-4xl m-auto mt-12 border-y border-white border-opacity-20">
        <h3 class="pb-4 font-light text-center mt-6">Core Values</h3>
        <p v-for="values in coreval.values" :key="values">
            <div class="flex">
            <div class="mt-1 mr-1"><Icon class=" text-slate-600 " icon="material-symbols:check-circle-rounded"/></div>
            <div>{{values}}</div>
            </div>  
        </p>        
        <p class="py-4">These values shape our path and commitment, driving us to provide excellence in all aspects of our work.
        </p>
    </div>

</section>
</template>

<style>


</style>