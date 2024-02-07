<script setup>
import getCollection from '@/composables/getCollection'
import { Icon } from '@iconify/vue';

const { documents : solutions } = getCollection('solutions')


solutions, Icon

</script>

<template>
  <section class="text-white items-center place-items-center">
    <div class="text-center">
      <h3 class="text-4xl lg:text-5xl font-semibold capitalize pb-2 md:pb-4 ">Our Solutions</h3>
    </div>
    <div  class="grid grid-cols-auto-fit gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-center">
    <div v-for="solution in solutions" :key="solution.id" class="text-center p-8 rounded-md bg-mydarkbg shadow-md mb-4">
        <h4 class="!text-center font-semibold text-mycoral border-b border-white border-opacity-20  line-clamp-1">{{ solution.title }}</h4>
        <div class="mt-4">
          <div v-for="services in solution.services" :key="services" class="text-left flex">
            <div><Icon class="text-green-500 mr-1 mt-1  " icon="pajamas:check-circle"/></div>
            <div>{{ services }}</div>
          </div>
        </div>
        <RouterLink :to="{name : 'soldetails', params : { id : solution.id }}" class="mybutton !w-full md:w-auto">Details...</RouterLink>
    </div>
    </div>
  </section>
</template>


<style>

</style>