<script setup>
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import getCollection from '@/composables/getCollection'

const { error, documents: solutions } = getCollection('solutions')

 solutions, error, Icon, RouterLink
</script>

<template>
<section class="text-white">

    <h1>Benifits We Offer</h1>

    <div  v-for="(solution, index) in solutions" :key="solution.id" class="flex flex-col md:flex-row place-items-center bgcoralwhitepink p-6 md:p-10 mb-12"
    >
    <div class="flex flex-col text-center content-center place-items-center">
        <div class="flex flex-col md:flex-row" :class="{ 'md:flex-row-reverse': index % 2 !== 0 }">
            <div class="w-full md:w-9/12 text-left">
                <h3 class="text-center mb-4">{{solution.title}}</h3>
                <img class="text-center rounded-lg drop-shadow-xl" :src="solution?.solutionImageUrl || ''" />
                <div class="text-center">
                    <RouterLink :to="{name : 'soldetails', params : { id : solution.id }}" class="mybutton !w-full md:!w-auto">Details...</RouterLink>
                </div>
            </div>
            <div class="w-full md:w-3/12 md:mb-auto text-left">
                <div class="font-semibold text-2xl mt-4 underline text-center">Service Support</div>
                <div v-for="services in solution.services" :key="services" class="text-left mt-4 md:mx-4 ">
                    <div class="flex text-lg">
                        <div><Icon class="text-green-500 mt-1" icon="material-symbols:check-circle-rounded"/></div>
                        <div>{{ services }}</div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    </div>
</section>
</template>
