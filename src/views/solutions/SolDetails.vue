<script setup>
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue'
import getDocument from '@/composables/getDocument'

const props = defineProps(['id'])

// Fetch the data
const { document: solution, error } = getDocument('solutions', props.id)

 solution, error ,Icon
</script>
<template>
  <section class="text-white">        
    <h1>{{ solution?.title || 'Loading...' }}</h1>
    <div class="mx-auto mb-12">
      <img class="text-center max-h-96 rounded-lg mx-auto drop-shadow-xl" :src="solution?.solutionImageUrl || ''" />
    </div>

    <div class="p-6 md:p-10 bgcoralwhitepink " v-if="solution">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-9/12 mb-4 md:mr-4 md:text-justify">
          <div class="font-semibold text-2xl underline text-center mb-4">Description</div>
          <p>{{ solution.description }}</p> 
        </div>
        <div class="w-full md:w-3/12 md:mb-auto text-left">
            <div class="font-semibold text-2xl underline text-center">Service Support</div>
            <div v-for="services in solution.services" :key="services" class="text-left mt-4 md:mx-4 ">
                <div class="flex text-lg">
                    <div><Icon class="text-green-500 mt-1" icon="material-symbols:check-circle-rounded"/></div>
                    <div>{{ services }}</div>
                </div>
            </div>
        </div>
      </div>
      <div class="text-center">
          <RouterLink to="/solutions" class="mybutton !w-full md:!w-auto">Back...</RouterLink>
      </div>
      
    </div>

    <!-- Display an error message if the document doesn't exist -->
    <div v-if="error">
      <p class="text-red-500">Document not found</p>
    </div>
  </section>
</template>
