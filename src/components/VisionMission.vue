<script lang="ts" setup>
import getCollection from '@/composables/getCollection'

const { documents : vismis } = getCollection('vismis')
vismis
</script>

<template>
<section class="!p-0 !m-0">
    <div class="grid grid-1 md:grid-cols-2 bgcoralwhitepink">
        <div v-for="vmis in vismis" :key="vmis.title" class="p-6">
            <h3 class="pb-2 font-light !text-center">{{vmis.title}}</h3>
            <p >{{vmis.description}}</p>
        </div>
    </div>
</section>
</template>

<style>


</style>