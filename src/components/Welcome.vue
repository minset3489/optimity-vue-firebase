<script setup>
import { defineProps } from 'vue';

const props = defineProps(['homedatas']);

</script>

<template>


<section>
<div v-for="homedata in homedatas" :key="homedata.id" class="flex flex-col md:flex-row place-items-center text-white gap-4">
    <div  class="md:w-3/5 md:mr-4  text-center md:text-justify drop-shadow-lg">
        <h3 class="mb-3">{{ homedata.title }}</h3>
        <p>{{homedata.description}}</p> 
        <RouterLink to="/contact" class="mybutton !w-full md:!w-fit !text-center">Contact Us</RouterLink>
    </div>
    <div class="w-auto md:w-2/5 ">
        <div class="imageback">
            <img class="z-50" :src="homedata.homeImageUrl" alt="">
        </div>
    </div>
</div>
</section>

</template>

<style scoped>

    
.imageback{
    position: relative;
    object-fit: contain;
    background: repeating-conic-gradient(from var(--a),deeppink 0%, transparent 5%, transparent 40%, deeppink 50%);
    animation: inimate360 4s linear infinite;
    border-radius: 20px;
}

.imageback::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: repeating-conic-gradient(from var(--a), coral 0%, transparent 5%, transparent 40%, coral 50%);
    animation: inimate360 4s linear infinite;
    animation-delay: 1s;
    border-radius: 20px;
}

.imageback img{
    border-radius: 20px;
    box-shadow: 0 .5rem 1rem rgb(12, 3, 3);
    padding: 8px;
    width:100%;
    position: relative;
    z-index: 0;
}

@property --a{
    syntax:'<angle>';
    inherits: false;
    initial-value: 0deg;
}

@keyframes inimate360{
    0%{
        --a :0deg;
    }
    100%{
        --a: 360deg;
    }
}

</style>
