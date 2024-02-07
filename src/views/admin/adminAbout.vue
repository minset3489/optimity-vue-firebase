<script setup>
import { firestoreDb } from '@/firebase/config'
import { doc, serverTimestamp , updateDoc, deleteDoc } from 'firebase/firestore'
import useStorage from '@/composables/useStorage'
import getCollection from '@/composables/getCollection'

import CoreValue from '@/components/CoreValue.vue'

import AboutUs from '@/components/AboutUs.vue'
import {ref} from 'vue'

//fetch the data

const { documents : about } = getCollection('about')
const { documents : vismis } = getCollection('vismis')

const { uploadImage, url, filePath } = useStorage()

// About v-model
const title = ref('')
const description = ref('')
const file = ref(null)
const fileError = ref(null)

//Vision Mission v-model
const vmdescription =ref('')
const vmisid =ref('') //for updating the data
const vmformSection = ref('') //for scrolling


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



const handleUpdate = async (col,id) => {
    const docRef = doc(firestoreDb, col, id)
    if(col==='about'){
        if(!title.value || !description.value)
        {
            error.value = 'Please fill in both title and description fields.'
            return
        }
        try{
            isPending.value = true
            isEdit.value = false

            if(file.value){
                await uploadImage(file.value, col)
                        updateDoc(docRef, { 
                title: title.value,
                description: description.value,
                aboutImageUrl: url.value,
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
            console.log('about Info Updated')
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
    }

    if(col==='vismis'){
        try{
            isPending.value = true
            isEdit.value = false

            await  updateDoc(docRef, { 
            description: vmdescription.value,
            createdAt: serverTimestamp(),
            })

            console.log('Vision / Mission Info Updated')
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
    }

    handleReset()
}

// Delete function
const handleDelete = async (col,vid) => {
    try {
        // Delete the document from Firestore
        await deleteDoc(doc(firestoreDb, col, vid))
        console.error(`Deleted ${col}`)
    } catch (error) {
        console.error('Error deleting product:', error.message)
    }
    handleReset()
}

//Send Data to Form
const handleEdit = (vmis) => {
        vmisid.value = vmis.id
        vmdescription.value = vmis.description
        isEdit.value=true

        // Calculate the offset to scroll to the center
        const windowHeight = window.innerHeight
        const vmformOffset = vmformSection.value.offsetTop
        const scrollToPosition = vmformOffset - (windowHeight / 3)

        // Scroll to the center of the vform section
        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth',
        })
}

//Send Data to Form
const handleCancel = () => {
        vmisid.value = null
        vmdescription.value = ''
        isEdit.value=false
}

  // reset form
const handleReset = () =>{
    title.value=''
    description.value=''
    vmdescription.value=''
    error.value=''
}

about, vismis
</script>

<template>

<!-- About Section -->
<div >
<form id="nform" @submit.prevent="" class="my-4 max-w-xl mx-auto rounded-lg shadow-md border border-gray-300 bg-white p-4 place-items-center items-center text-center">
    <h3 class="text-2xl text-center">About Section</h3>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="text" placeholder="Home Page About Title" v-model="title">
    <textarea class="border-b border-gray-300 p-2 h-20 outline-none block w-full box-border mx-auto" placeholder="Description..." v-model="description"></textarea>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="file" @change="handleChange">
    <div  class="text-xl text-red-600 my-4 mx-auto text-center">{{ error }} {{ fileError }}</div>
    <button class="mybutton text-center" v-if="!isPending" @click="handleUpdate('about','E88Mht8TJpbKE7XL55EV')">Update</button>
    <button class="mybutton text-center " v-if="isPending" disabled>Loading</button>
</form>
</div>
<section>
    <div v-for="ab in about" :key="ab.id" class="text-center text-white text-3xl mb-4">{{ ab.title }}</div>
    <AboutUs />
</section>

<!-- Vision Mission Section -->
<section>
    <form ref="vmformSection" id="vform" @submit.prevent="" class="my-4 max-w-xl mx-auto rounded-lg shadow-md border border-gray-300 bg-white p-4 place-items-center items-center text-center">
        <h3 class="text-2xl text-center">Vision / Mission  Section</h3>
        <textarea class="border-b border-gray-300 p-2 h-20 outline-none block w-full box-border mx-auto" placeholder="Description..." v-model="vmdescription"></textarea>
        <div  class="text-xl text-red-600 my-4 mx-auto text-center">{{ error }} {{ fileError }}</div>
        <button class="mybutton text-center" v-if="isEdit" @click="handleUpdate('vismis',vmisid)">Update</button>
        <button class="mybutton text-center ml-4" v-if="isEdit" @click="handleCancel">Cancel</button>
        <button class="mybutton text-center " v-if="isPending" disabled>Loading</button>
        <input class="hidden"  v-model="vmisid">
    </form>

    <div class="max-w-5xl m-auto md:px-12 px-6 py-8 grid grid-1 md:grid-cols-2 bgcoralwhitepink">
        <div v-for="vmis in vismis" :key="vmis.title" class="p-6 text-center">
            <h3 class="text-3xl mb-6 text-center">{{vmis.title}}</h3>
            <p class="text-center md:text-justify">{{vmis.description}}</p>
            <div class="text-center">
                <NuxtLink class="mybutton"  @click="handleEdit(vmis)">Edit</NuxtLink>
            </div>
        </div>
    </div>
</section>

<!-- Core Values Section -->
<CoreValue/>

</template>