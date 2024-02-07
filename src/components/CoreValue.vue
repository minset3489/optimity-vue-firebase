<script setup>
import { firestoreDb } from '@/firebase/config'
import getCollection from '@/composables/getCollection'
import { updateDoc, doc } from 'firebase/firestore'
import { Icon } from '@iconify/vue'

import {ref} from 'vue'

const { documents: corevals } = getCollection('corevals')

const isPending = ref(false)

const addValue = (coreval ) => {
  coreval.values.push('')
}

const deleteValue = (coreval, index) => {
  coreval.values.splice(index, 1)
}

const updateValue = async (coreval) => {
  const docRef = doc(firestoreDb, 'corevals', coreval.id)
  try{
        isPending.value = true

        await updateDoc(docRef, { values: coreval.values })

        console.log('Core Values Info Updated')
        isPending.value = false
    }
    catch (err ) {
        console.error('Error during updating data !', err.message)
        isPending.value = false
    }
}

corevals, Icon
</script>

<template>
<section class="max-w-5xl m-auto bgcoralwhitepink mt-10">
<!-- Core Values -->
<div v-for="coreval in corevals" :key="coreval.id" class="">
    <h3 class="text-5xl text-center py-6">Core Values</h3>
    <div v-for="(value, index) in coreval.values" :key="index" class="flex items-center mb-2">
        <textarea class="border-b border-gray-300 p-2 h-20 md:h-14 outline-none block w-full box-border mx-auto" v-model="coreval.values[index]" ></textarea>
        <Icon v-if="index > 0" @click="deleteValue(coreval, index)" class="text-2xl ml-2 cursor-pointer hover:text-red-500" icon="mingcute:minus-circle-line"/>

    </div>
    <div class="text-center mx-auto">
        <Icon @click="addValue(coreval)"  class="text-3xl cursor-pointer mx-auto hover:text-green-500" icon="material-symbols:add-circle-outline"/>
    </div>
    <div class="text-center">
        <button v-if="!isPending" class="mybutton" @click="updateValue(coreval)">Update Values</button>
        <button class="mybutton text-center " v-if="isPending" disabled>Updating...</button>
    </div>  
</div>
</section>
</template>
