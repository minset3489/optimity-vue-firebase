<script setup>

import {ref} from 'vue'
import getCollection from '@/composables/getCollection'
import { Icon } from '@iconify/vue'

const { documents: users } = getCollection('users')
const currentIndex = ref(0)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % users.value.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + users.value.length) % users.value.length
}


users, Icon

</script>


<template>
<section>

<div class="flex flex-col lg:flex-row items-center place-items-center gap-8 text-white">

<div>
    <h4 class="md:!text-3xl text-pink-50">What Our Clients Says 🙂</h4>
    <p class="text-xl pb-2 text-pink-100">We are proud of contributing to the success of our customers.</p>
    <div class="mt-2 flex gap-4">
        <Icon @click="prev" class="h-14 w-14 text-white rounded-md bg-[#ffffff1a] bg-opacity-10 backdrop-blur-30 shadow-lg text-center cursor-pointer hover:bg-gradient-to-r hover:from-[#ff1493] hover:to-[#ff7f50]" icon="ei:arrow-left"/>
        <Icon @click="next" class="h-14 w-14 text-white rounded-md bg-[#ffffff1a] bg-opacity-10 backdrop-blur-30 shadow-lg text-center cursor-pointer hover:bg-gradient-to-r hover:from-[#ff7f50]  hover:to-[#ff1493]" icon="ei:arrow-right"/>
    </div>
</div>

<div>
    <div
        :class="{ 'slide p-6 md:p-10 max-w-[800px] transform-style-preserve-3d rounded-md bgtransparent hidden': true, '!block': idx === currentIndex }"
        v-for="(user, idx) in users"
        :key="user.id"
    >
        <p class="text-xl">{{ user.review }}</p>
        <div class="mt-6 flex items-center gap-6 pt-6 border-t border-white border-opacity-20">
        <img class="h-28 w-28 rounded-full object-cover" :src="user.userImageUrl" alt="">
        <div>
            <h4>{{ user.name }}</h4>
            <div class="text-mydarkbg text-xl flex">
            <Icon icon="jam:star-f"  />
            <Icon icon="jam:star-f"  />
            <Icon icon="jam:star-f"  />
            <Icon icon="jam:star-f" />
            <Icon icon="jam:star-f" />
            </div>
        </div>
        <Icon class="text-7xl text-white ml-auto mb-auto" icon="fa6-solid:quote-right" />
        </div>
    </div>
</div>

</div>

</section>

</template>

<style scoped>
.slide{
    animation:slide .3s linear;
}

@keyframes slide{
    0%{
        transform: rotateX(180deg);
    }
}

.slide > *{
    animation: slideContent .2s linear .2s backwards;
}

@keyframes slideContent{
    0%{
        opacity: 0;
        transform: scale(.9);
    }
}
</style>