<script setup>
const { newsdatas } = defineProps(['newsdatas'])

newsdatas
</script>

<template>
<section class="!pt-0">
<div v-for="newsdata in newsdatas" :key="newsdatas.id"  class="grid grid-cols-1 md:grid-cols-2 place-items-center" >
    <div class="flex flex-col text-white">
        <h4 class="md:text-3xl">{{newsdata.title}}</h4>
        <p class="">{{ newsdata.description }}</p>
        <a :to="newsdata.link" class="mybutton !w-full md:!w-fit !text-center"> See details </a>
    </div>
    <img :src="newsdata.newsImageUrl" class="rounded-lg drop-shadow-xl max-w-4xl w-full mt-6 md:my-auto md:ml-6"/>
</div>
</section>
</template>

