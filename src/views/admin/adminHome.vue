<script setup>
import { firestoreDb } from '@/firebase/config'
import { doc, serverTimestamp , updateDoc } from 'firebase/firestore'
import useStorage from '@/composables/useStorage'
import getCollection from '@/composables/getCollection'

import Welcome from '@/components/Welcome.vue'

import {ref} from 'vue'

//fetch the data

const { documents: homedatas } = getCollection('homeData')

const { uploadImage, url, filePath } = useStorage()

const title = ref('')
const description = ref('')
const file = ref(null)
const fileError = ref(null)
const isPending = ref(false)
const isEdit = ref(false)
const error = ref(null);


//allowed file types
const types = ['image/png', 'image/jpeg']
const handleChange = (e) =>{
    const selected = e.target.files[0]
    console.log(selected)

    if(selected && types.includes(selected.type)){
        file.value = selected
        fileError.value = null
    }
    else{
        file.value = null
        fileError.value = 'Please select an image file (png or jpeg)'
    }

}

const handleUpdate = async () => {

    if (!title.value || !description.value) {
        error.value = 'Please fill in both title and description fields.'
        return
    }

    const docRef = doc(firestoreDb, 'homeData', '6REkCc8GOTYRI0TeT2FX')
 
    try{
        isPending.value = true;
        isEdit.value = false;

        if(file.value){
            await uploadImage(file.value, 'homeData')
                    updateDoc(docRef, { 
            title: title.value,
            description: description.value,
            homeImageUrl: url.value,
            filePath: filePath.value,
            createdAt: serverTimestamp(),
            })
        }
        else{
            await  updateDoc(docRef, { 
            title: title.value,
            description: description.value,
            createdAt: serverTimestamp(),
            })
        } 
        console.log('Welcome Info Updated')
        isPending.value = false
        handleReset()
    }

    catch (err) {
        console.error('Error during updating data !', err.message);
    }
    finally{
        isPending.value = false
        handleReset()
    }

    handleReset()
}

  // reset form
const handleReset = () =>{
    title.value=''
    description.value=''
    error.value=''
}


homedatas
</script>

<template>

<div>
<form id="form" @submit.prevent="" class="my-4 max-w-xl mx-auto rounded-lg shadow-md border border-gray-300 bg-white p-4 place-items-center items-center text-center">
    <h3 class="text-2xl text-center">Wecome Section</h3>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="text" placeholder="Welcome Title" v-model="title">
    <textarea class="border-b border-gray-300 p-2 h-20 outline-none block w-full box-border mx-auto" placeholder="Description..." v-model="description"></textarea>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="file" @change="handleChange">
    <div  class="text-xl text-red-600 my-4 mx-auto text-center" v-if="error">{{ error }} {{ fileError }}</div>
    <button class="mybutton text-center" v-if="!isPending" @click="handleUpdate()">Update</button>
    <button class="mybutton text-center" v-if="isPending" disabled>Loading</button>
</form>
</div>

<section class="!pt-2">

    <Welcome :homedatas="homedatas" />

</section>

</template>

<style scoped>

</style>