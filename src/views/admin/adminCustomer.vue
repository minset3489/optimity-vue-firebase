<script setup>
import { firestoreDb } from '@/firebase/config'
import { doc, collection, addDoc, serverTimestamp , updateDoc, deleteDoc } from 'firebase/firestore'
import useStorage from '@/composables/useStorage'
import getCollection from '@/composables/getCollection'

import {ref} from 'vue'

//fetch the data
const { documents : users } = getCollection('users')

const { uploadImage,deleteImage, url, filePath } = useStorage()

// User v-model
const name = ref('')
const company = ref('')
const title = ref('')
const review =ref('')

const file = ref(null)
const fileError = ref(null)
const userid =ref('') //for updating the data

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
    if(!name.value || !review.value){
        error.value =  'Please fill in both name and review fields.'
        return
    }
    const colRef = collection(firestoreDb, col)
      try {
        isPending.value = true

        if(file.value){
            await uploadImage(file.value, col)            
            addDoc(colRef, {
            name: name.value,
            company: company.value,
            title: title.value,
            review : review.value,
            userImageUrl: url.value,
            filePath: filePath.value,
            createdAt: serverTimestamp(),
            })
        }
        else{
            await addDoc(colRef, {
            name: name.value,
            company: company.value,
            title: title.value,
            review : review.value,
            createdAt: serverTimestamp(),
            })
        } 

        console.log('user added')
        isPending.value = false
        handleReset()

      } catch (err) {
        console.error('Error during upload:', err.message)
      }

  }

const handleUpdate = async (col,id) => {
    if(!name.value || !review.value){
        error.value =  'Please fill in both name and review fields.'
        return
    }
    const docRef = doc(firestoreDb, col, id)

    try{
        isPending.value = true
        isEdit.value = false

        if(file.value){
            await uploadImage(file.value, col)
                    updateDoc(docRef, { 
            name: name.value,
            company: company.value,
            title: title.value,
            review : review.value,
            userImageUrl: url.value,
            filePath: filePath.value,
            createdAt: serverTimestamp(),
            })
        }
        else{
            await  updateDoc(docRef, { 
            name: name.value,
            company: company.value,
            title: title.value,
            review : review.value,
            createdAt: serverTimestamp(),
            })
        } 
        console.log('user Info Updated')
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
const handleEdit = (user) => {
    userid.value = user.id
    name.value = user.name
    company.value = user.company
    title.value = user.title
    review.value = user.review
    isEdit.value=true      
    error.value=''
    // Scroll to the top of the vform section
    window.scrollTo({
            top: 0,
            behavior: 'smooth',
    })
}

//Send Data to Form
const handleCancel = () => {
    userid.value = null
    name.value = ''
    company.value = ''
    title.value = ''
    review.value = ''
    isEdit.value=false

}

  // reset form
const handleReset = () =>{
    userid.value = null
    name.value = ''
    company.value = ''
    title.value = ''
    review.value = ''
    file.value = null
    error.value =''
}

users
</script>

<template>

<!-- users Section -->
<div >
<form id="sformSection" @submit.prevent="" class="my-4 max-w-xl mx-auto rounded-lg shadow-md border border-gray-300 bg-white p-4 place-items-center items-center text-center">
    <h3 class="text-2xl text-center">User Section</h3>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="text" placeholder="Name" v-model="name">
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="text" placeholder="Company" v-model="company">
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="text" placeholder="Title" v-model="title">
    <textarea class="border-b border-gray-300 p-2 h-20 outline-none block w-full box-border mx-auto" placeholder="Review Comment" v-model="review"></textarea>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="file" @change="handleChange">

    
    <div  class="text-xl text-red-600 my-4 mx-auto text-center">{{ error }} {{ fileError }}</div>
    <button class="mybutton text-center"  v-if="!isPending && !isEdit" :disabled="isPending && isEdit" @click="handleSubmit('users')">Create</button>
    <button class="mybutton text-center" v-if="isEdit" @click="handleUpdate('users',userid)">Update</button>
    <button class="mybutton text-center ml-4" v-if="isEdit" @click="handleCancel">Cancel</button>
    <button class="mybutton text-center " v-if="isPending" disabled>Loading</button>
    <input class="hidden" v-model="userid">
</form>
</div>

<div v-for="user in users" :key="user.id" class="!pt-2">
    <div class="flex flex-col max-w-5xl md:flex-row py-8 px-10 bgcoralwhitepink m-4 mx-auto">
        <div class="w-auto md:w-10/12 flex flex-col md:flex-row">
            <div class="w-full md:w-1/2">
                <img  class=" h-64 w-64 rounded-full object-cover mx-auto" :src="user.userImageUrl" alt="Solution Image"/>
            </div>
            <div class="text-center md:text-left w-full md:w-1/2 m-2">
                <div class="font-semibold text-2xl mb-4">{{ user.name }}</div>
                <p class="font-bold">{{ user.title }} ( {{ user.company }}  )</p>
                <p class="mt-2">{{ user.review }}</p>
            </div>
        </div>

        <div class="w-auto md:w-2/12 text-center place-items-center flex flex-col">
            <button class="mybutton !w-full"  @click="handleEdit(user)">Edit</button>
            <button class="mybutton !w-full"  @click="handleDelete('users',user.id,user.filePath)">Delete</button>
        </div>
    </div>
</div>



</template>