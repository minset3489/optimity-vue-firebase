<script setup>

import getCollection from '@/composables/getCollection'
import { Icon } from '@iconify/vue'

const { documents :services } = getCollection('services')

services, Icon

</script>
<template>

<section class="text-center">
    
    <h3 class="mb-4">Our Services</h3>
    <div class="grid grid-cols-auto-fit gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-center">
    <div v-for="service in services" :key="service.id" >
        <RouterLink :to="{name : 'servicedetails', params : { id : service.id }}" >  
        <div class="text-center px-4 py-6 bgtransparent">        
            <Icon class="text-5xl mb-4 mx-auto" :icon="service.icon"/>
            <h4 class="!text-center mb-4 line-clamp-2">{{service.title}}</h4>
            <p class="text-left line-clamp-5">{{service.description}}</p>        
        </div>
        </RouterLink>
    </div>
   
</div>
</section>

</template>

<style>

</style>