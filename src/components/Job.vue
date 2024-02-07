<script lang="ts" setup>

import getCollection from '@/composables/getCollection'

const { documents : vacancies } = getCollection('vacancies')

vacancies
</script>

<template>
<section class="text-center max-w-4xl mx-auto bgcoralwhitepink mt-8">
    <h3 class="pb-4 font-light">Vacancy Announcement!</h3>
    <div v-if="vacancies && vacancies.length" :class="{ '!grid-cols-1': vacancies.length === 1 }" class="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
        <div v-for="vacancy in vacancies" :key="vacancy.title" class="text-center md:text-left px-4 py-6 bgtransparent">
            <h4 class="!text-center md:text-3xl">{{vacancy.title}}</h4>
            <div>
            <p class=" text-center pt-2 underline">Education Qualification</p>
            <p>{{ vacancy.education }}</p>
            </div>
            <div>
            <p class=" text-center pt-2 underline">Experience</p>
            <p>{{vacancy.experience}}</p>
            </div>
            <div class="text-center"><button class="mybutton">Apply</button></div>
        </div>
    </div>
    <div v-else>
        <p>No vacancies available at the moment.</p>
    </div>
</section>
</template>
  