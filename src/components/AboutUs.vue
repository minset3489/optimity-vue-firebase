<script lang="ts" setup>
import getCollection from '@/composables/getCollection'
const { documents : about } = getCollection('about')
about
</script>

<template>
<div v-for="ab in about" :key="ab.id" class="flex flex-col lg:flex-row place-items-center gap-4 rounded-lg bg-white p-4 md:p-12">
    <div  class="lg:w-2/5 md:mr-4 text-slate-500 text-center md:text-justify">
        <p>{{ab.description}}</p>
    </div>
    <div class="w-auto lg:w-3/5 ml-0 lg:ml-6 mt-0 md:mt-2 lg:mt-0">
        <div class="rounded-lg shadow-md shadow-slate-600">
            <img class="rounded-lg" :src="ab.aboutImageUrl" alt="">
        </div>
    </div>
</div>
</template>

<style>

</style>

