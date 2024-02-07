<script setup>
import getCollection from '@/composables/getCollection'
import Services from '@/components/Services.vue'
import PartnerLogo from '@/components/Logos/PartnerLogo.vue'
import Job from '@/components/Job.vue'
import News from '@/components/News.vue'

const { documents : newsdatas } = getCollection('news')

newsdatas
</script>

<template>

    <h1 class="py-8">News</h1>

<News :newsdatas="newsdatas"/>

<Services class="!text-white"/>

<Job/>

<PartnerLogo class="!py-8"/>


</template>

<style>


</style>