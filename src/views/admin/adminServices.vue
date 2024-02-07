<script setup>
import { firestoreDb } from '@/firebase/config'
import { doc, collection, addDoc, serverTimestamp , updateDoc, deleteDoc } from 'firebase/firestore'
import useStorage from '@/composables/useStorage'
import getCollection from '@/composables/getCollection'
import { Icon } from '@iconify/vue'
import {ref} from 'vue'


//fetch the data
const { documents : services } = getCollection('services')

const { uploadImage,deleteImage, url, filePath } = useStorage()

// Solution v-model
const title = ref('')
const description = ref('')
const iconname =ref('')

const file = ref(null)
const fileError = ref(null)
const seid =ref('') //for updating the data

const isPending = ref(false)
const isEdit = ref(false)
const error = ref(null)


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

const handleSubmit = async (col) => {
    if(!title.value || !description.value || !iconname.value){
        error.value =  'Please fill in title, description and icon fields.'
        return
    }
    
    const colRef = collection(firestoreDb, col)
      try {
        isPending.value = true

        if(file.value){
            await uploadImage(file.value, col)            
            addDoc(colRef, {
            title: title.value,
            description: description.value,
            icon : iconname.value,
            serviceImageUrl: url.value,
            filePath: filePath.value,
            createdAt: serverTimestamp(),
            })
        }
        else{
            await addDoc(colRef, {
            title: title.value,
            description: description.value,
            icon : iconname.value,
            createdAt: serverTimestamp(),
            })
        } 

        console.log('Service added')
        isPending.value = false
        handleReset()

      } catch (err) {
        console.error('Error during upload:', err.message)
      }

  }

const handleUpdate = async (col,id) => {
    if(!title.value || !description.value || !iconname.value){
        error.value =  'Please fill in title, description and icon fields.'
        return
    }

    const docRef = doc(firestoreDb, col, id)
    
    try{
        isPending.value = true
        isEdit.value = false

        if(file.value){
            await uploadImage(file.value, col)
                    updateDoc(docRef, { 
            title: title.value,
            description: description.value,
            icon : iconname.value,
            serviceImageUrl: url.value,
            filePath: filePath.value,
            createdAt: serverTimestamp(),
            })
        }
        else{
            await  updateDoc(docRef, { 
            title: title.value,
            description: description.value,
            icon : iconname.value,
            createdAt: serverTimestamp(),
            })
        } 
        console.log('Service Info Updated')
        isPending.value = false
        handleReset()
    }
    catch (err) {
        console.error('Error during updating data !', err.message)
    }
    finally{
        isPending.value = false
        handleReset()
    }

    handleReset()
}

// Delete function
const handleDelete = async (col, id, filePath) => {
    try {
        // Delete the document from Firestore
        await deleteDoc(doc(firestoreDb, col, id))

        // Delete the image from Firebase Storage
        if (filePath) {
            
            await deleteImage(filePath)
            
        }

        console.error(`Deleted ${col}`)
    } catch (error) {
        console.error('Error deleting product:', error.message)
    }
    handleReset()
}

//Send Data to Form
const handleEdit = (service) => {
    seid.value = service.id
    title.value = service.title
    iconname.value = service.icon
    description.value = service.description
    isEdit.value=true      
    // Scroll to the top of the vform section
    window.scrollTo({
            top: 0,
            behavior: 'smooth',
    })
}

//Send Data to Form
const handleCancel = () => {
    seid.value = null
    title.value = ''
    description.value = ''
    iconname.value =''
    file.value = ''
    isEdit.value=false

}

  // reset form
const handleReset = () =>{
    seid.value = null
    title.value=''
    description.value = ''
    iconname.value = ''
    file.value = null
    error.value=''
}

services, Icon

</script>

<template>

<!-- services Section -->
<div >
<form id="sformSection" @submit.prevent="" class="my-4 max-w-xl mx-auto rounded-lg shadow-md border border-gray-300 bg-white p-4 place-items-center items-center text-center">
    <h3 class="text-2xl text-center">Services Section</h3>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="text" placeholder="Solution Title" v-model="title">
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="text" placeholder="Icon name" v-model="iconname">
    <span>Get an icon name from >>> <a href="https://icones.js.org/">icones.js.org</a></span>
    <textarea class="border-b border-gray-300 p-2 h-20 outline-none block w-full box-border mx-auto" placeholder="Description..." v-model="description"></textarea>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="file" @change="handleChange">

    
    <div  class="text-xl text-red-600 my-4 mx-auto text-center">{{ error }} {{ fileError }}</div>
    <button class="mybutton text-center"  v-if="!isPending && !isEdit" :disabled="isPending && isEdit" @click="handleSubmit('services')">Create</button>
    <button class="mybutton text-center" v-if="isEdit" @click="handleUpdate('services',seid)">Update</button>
    <button class="mybutton text-center ml-4" v-if="isEdit" @click="handleCancel">Cancel</button>
    <button class="mybutton text-center " v-if="isPending" disabled>Loading</button>
    <input class="hidden" v-model="seid">
</form>
</div>

<div v-for="service in services" :key="service.id" class="!pt-2">
    <div class="flex flex-col md:flex-row py-8 px-10 bgcoralwhitepink m-4">
        <div class="w-auto md:w-10/12 lg:w-11/12 flex flex-col md:flex-row">
            <div class="w-full md:w-1/2">
                
                <div class=" md:pr-6">
                    <img  class=" h-96 rounded-lg mx-auto" :src="service.serviceImageUrl" alt="Solution Image"/>
                </div>
            </div>

            <div class="w-full md:w-1/2">
                
                <div class="font-semibold text-2xl mb-4"><Icon class="text-4xl mr-2" :icon="service.icon"/>{{ service.title }}</div>
                <p>{{ service.description }}</p>
            </div>
        </div>

        <div class="w-auto md:w-2/12 lg:w-1/12 text-center">
            <NuxtLink class="mybutton !w-full"  @click="handleEdit(service)">Edit</NuxtLink>
            <NuxtLink class="mybutton !w-full"  @click="handleDelete('services',service.id,service.filePath)">Delete</NuxtLink>
        </div>
    </div>
</div>



</template>