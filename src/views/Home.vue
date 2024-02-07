<script setup>
import getCollection from '@/composables/getCollection'

import Welcome from '@/components/Welcome.vue'
import PartnerLogo from '@/components/Logos/PartnerLogo.vue'
import Services from '@/components/Services.vue'
import ClientsReivew from '@/components/ClientsReivew.vue'
import Solutions from '@/components/Solutions.vue'
import ContactForm from '@/components/contactform/ContactForm.vue'

const { documents: homedatas } = getCollection('homeData')
const { documents : about } = getCollection('about')
const { documents : optimity } = getCollection('optimity')


homedatas, about, optimity

</script>

<template>
  
<Welcome :homedatas="homedatas" />

<PartnerLogo class="!pt-0"/>

<div class="bg-mydarkbg text-slate-200">
  <Services/>
</div>

<ClientsReivew/>


<div class="bg-mydarkbg text-slate-200"><!-- About US -->
  <section v-for="ab in about" :key="ab.id"  class="place-content-center items-center text-center flex flex-col lg:flex-row">
  
  <div class="w-full lg:w-1/2 lg:mr-4 text-center lg:text-justify">
      <h3>{{ab.title}}</h3>
      <p class=" line-clamp-6">{{ab.description}}</p>
      <RouterLink to="/about" class="mybutton">More...</RouterLink>
  </div>

  <div class="w-full lg:w-1/2 pt-6 lg:pt-0 shadow-lg shadow-slate-500">
      <img class="rounded-lg" :src="ab.aboutImageUrl" alt="">
  </div>

  </section>
</div>

<Solutions/>
<!-- Contact US -->
<div class="bg-mydarkbg text-slate-200 mb-4 md:mb-8">
<section class="text-center">
    <h3 >Contact Us</h3>
    <div class="flex flex-col md:flex-row-reverse place-items-center">
        <div class="w-full md:w-1/2 mx-auto">
            <div class="flex flex-col lg:flex-row place-items-center gap-4 rounded-lg  p-12">
            <ContactForm class="!text-white"/>
            </div>
        </div>
        <div v-for="op in optimity" :key="op.id"  class="w-full md:w-1/2 mx-auto md:mr-2">
            <div class="pb-4">
                <h4 class="underline">Office</h4>
                <p class="text-left pt-2">{{op.address}}</p>
            </div>
            <div  class="pb-4">
                <h4 class="underline">Phone</h4>
                <p v-for="phone in op.phone" :key="op.phone" class="text-left pt-2">{{phone}}</p>
            </div>
            <div class="pb-4">
                <h4 class="underline">Email</h4>
                <p v-for="email in op.email" :key="op.email" class="text-left pt-2">{{email}}</p>
            </div>
        </div>
        
    </div>
</section>
</div>


</template>