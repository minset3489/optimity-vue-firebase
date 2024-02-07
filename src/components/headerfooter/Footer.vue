<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue'

const footers = ref([
  { title: 'Quick Links', link: [
    { name: 'Home', url: '/', icon: 'ri:links-line' },
    { name: 'About', url: '/about', icon: 'ri:links-line' },
    { name: 'Solutions', url: '/solutions', icon: 'ri:links-line' },
    { name: 'News', url: '/news', icon: 'ri:links-line' },
  ]},
  { title: 'Useful Links', link: [
    { name: 'FAQ', url: '/', icon: 'ic:baseline-contact-support' },
    { name: 'Login / Register', url: '/', icon: 'solar:login-2-bold' },
    { name: 'Privacy Policy', url: '/', icon: 'iconoir:privacy-policy' },
    { name: 'Terms & Conditions', url: '/', icon: 'icon-park-solid:termination-file' },
  ]},
  { title: 'Contact Us', link: [
    { name: '+123-456-789', url: '/', icon: 'material-symbols:call' },
    { name: '+111-222-333', url: '/', icon: 'material-symbols:call' },
    { name: 'info@optimitycomm.com', url: '/', icon: 'material-symbols:mail-outline-rounded' },
  ]},
  { title: 'Follow US', link: [
    { name: 'Facebook', url: '/', icon: 'mdi:facebook-box' },
    { name: 'LinkedIn', url: '/', icon: 'mdi:linkedin-box' },
    { name: 'Whatsapp', url: '/', icon: 'mdi:whatsapp' },
    { name: 'Github', url: '/', icon: 'mdi:github' },
  ]},
]);

footers, Icon
</script>

<template>
<div class="place-items-center items-center mx-auto !pt-0">
    <section class="grid grid-cols-auto-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-black mx-auto gap-8 !pt-0">
    
        <div v-for="footer in footers" :key="footer.title" class="flex flex-col">
            <h3 class="text-xl font-bold mb-4">{{ footer.title }}</h3>
            <a class="text-lg hover:text-white p-1" v-for="link in footer.link" :key="link.name" :href="link.url"> 
            <div class="flex">
              <div class="mr-1 mt-1"><Icon class="text-xl mx-auto" :icon="link.icon"/></div>
              <div>{{ link.name }}</div>
            </div>
            </a>
        </div>

    </section>
    <div class="mx-auto text-center text-2xl text-violet-50 border-t border-white border-opacity-15 pt-4 pb-2 md:pb-0 mt-4 ">
        Created by <span class="text-mydarkbg">Min Set</span> | All rights reserved!
    </div>
</div>
</template>

