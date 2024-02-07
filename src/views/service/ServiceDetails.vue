<script setup>
import { defineProps } from 'vue'
import getDocument from '@/composables/getDocument'

const props = defineProps(['id'])

// Fetch the data
const { document: service, error } = getDocument('services', props.id)

service, error

</script>

<template>
<section >
    <h3 class="text-white font-medium text-center mb-4">{{ service?.title || 'Loading...' }}</h3>
    <div class="flex flex-col md:flex-row place-items-center text-slate-500 p-6 md:p-12 bgcoralwhitepink" v-if="service">
        
        <div class="w-full md:w-1/2 text-center">
            <h3 class=" font-light mb-4 underline md:no-underline" >We can help you with</h3>
            <p class="md:text-left">{{ service.description }}</p>
            <RouterLink class="mybutton w-full md:w-auto" to="/">Go Back</RouterLink>
        </div>
        <div class="w-full md:w-1/2">               
            <div >
                <img class="rounded-lg" :src="service.serviceImageUrl" alt="Service Image"/>
            </div>
        </div>
    </div>

    <!-- Display an error message if the document doesn't exist -->
    <div v-if="error">
        <p class="text-red-500">Document not found</p>
    </div>
</section>
</template>
