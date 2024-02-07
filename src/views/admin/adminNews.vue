<script setup>
import { firestoreDb } from '@/firebase/config'
import { doc, collection, addDoc, serverTimestamp , updateDoc, deleteDoc } from 'firebase/firestore'
import useStorage from '@/composables/useStorage'
import getCollection from '@/composables/getCollection'

import {ref} from 'vue'

import News from '@/components/News.vue'

//fetch the data
const { documents : newsdatas } = getCollection('news')
const { documents : vacancies } = getCollection('vacancies')

const { uploadImage, url, filePath } = useStorage()

// News v-model
const title = ref('')
const description = ref('')
const link =ref('')
const file = ref(null)
const fileError = ref(null)

// Vacancy v-modal
const vtitle = ref('')
const veducation = ref('')
const vexperience = ref('')
const vid =ref('') //for updating the data

const isPending = ref(false)
const isEdit = ref(false)
const error = ref(null)

const vformSection = ref(null) //for scrolling


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
    const colRef = collection(firestoreDb, col)
      try {
        isPending.value = true

        await addDoc(colRef, {
            title: vtitle.value,
            education: veducation.value,
            experience: vexperience.value,
            createdAt: serverTimestamp(),
        })
        console.log('Vacancy  added')
        isPending.value = false
        handleReset()

      } catch (err) {
        console.error('Error during upload:', err.message)
        
      }

  }

const handleUpdate = async (col,id) => {
    const docRef = doc(firestoreDb, col, id)
    if(col==='news'){
        if(!title.value || !description.value || !link.value){
            error.value =  'Please fill in title, description and link fields.'
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
                link: link.value,
                newsImageUrl: url.value,
                filePath: filePath.value,
                createdAt: serverTimestamp(),
                })
            }
            else{
                await  updateDoc(docRef, { 
                title: title.value,
                link: link.value,
                description: description.value,
                createdAt: serverTimestamp(),
                })
            } 
            console.log('News Info Updated')
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

    if(col==='vacancies'){
        try{
            isPending.value = true
            isEdit.value = false

            await  updateDoc(docRef, { 
            title: vtitle.value,
            education: veducation.value,
            experience: vexperience.value,
            createdAt: serverTimestamp(),
            })

            console.log('Vacancy  Info Updated')
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
const handleEdit = (vacancy) => {
        vid.value = vacancy.id
        vtitle.value = vacancy.title
        veducation.value = vacancy.education
        vexperience.value = vacancy.experience
        isEdit.value=true
        

        // Calculate the offset to scroll to the center
        const windowHeight = window.innerHeight
        const vformOffset = vformSection.value.offsetTop
        const scrollToPosition = vformOffset - (windowHeight / 3)

        // Scroll to the center of the vform section
        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth',
        })
}

//Send Data to Form
const handleCancel = () => {
        vid.value = null
        vtitle.value = ''
        veducation.value = ''
        vexperience.value = ''
        isEdit.value=false
}

  // reset form
const handleReset = () =>{
    title.value=''
    description.value=''
    link.value=''

    vtitle.value = ''
    veducation.value = ''
    vexperience.value = ''
    error.value=''
}

newsdatas, vacancies
</script>

<template>

<!-- News Section -->
<div >
<form id="nform" @submit.prevent="" class="my-4 max-w-xl mx-auto rounded-lg shadow-md border border-gray-300 bg-white p-4 place-items-center items-center text-center">
    <h3 class="text-2xl text-center">News Section</h3>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="text" placeholder="News Title" v-model="title">
    <textarea class="border-b border-gray-300 p-2 h-20 outline-none block w-full box-border mx-auto" placeholder="Description..." v-model="description"></textarea>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="file" @change="handleChange">
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="text" placeholder="Link..." v-model="link">
    <div  class="text-xl text-red-600 my-4 mx-auto text-center">{{ error }} {{ fileError }}</div>
    <button class="mybutton text-center" v-if="!isPending" @click="handleUpdate('news','JwI4br0fwKBNpaohWrYS')">Update</button>
    <button class="mybutton text-center " v-if="isPending" disabled>Loading</button>
</form>
</div>

<div class="!pt-2">
    <News :newsdatas="newsdatas"/>
</div>


<!-- Vacancy Section -->
<div >
<form ref="vformSection" id="vform" @submit.prevent="" class="my-4 max-w-xl mx-auto rounded-lg shadow-md border border-gray-300 bg-white p-4 place-items-center items-center text-center">
    <h3 class="text-2xl text-center">Vacancy  Section</h3>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="text" placeholder="Title" v-model="vtitle">
    <textarea class="border-b border-gray-300 p-2 h-20 outline-none block w-full box-border mx-auto" placeholder="Education..." v-model="veducation"></textarea>
    <textarea class="border-b border-gray-300 p-2 h-20 outline-none block w-full box-border mx-auto" placeholder="Experience..." v-model="vexperience"></textarea>
    <div  class="text-xl text-red-600 my-4 mx-auto text-center">{{ error }} {{ fileError }}</div>
    <button class="mybutton text-center"  v-if="!isPending && !isEdit" :disabled="isPending && isEdit" @click="handleSubmit('vacancies')">Create</button>
    <button class="mybutton text-center" v-if="isEdit" @click="handleUpdate('vacancies',vid)">Update</button>
    <button class="mybutton text-center ml-4" v-if="isEdit" @click="handleCancel">Cancel</button>
    <button class="mybutton text-center " v-if="isPending" disabled>Loading</button>
    <input class="hidden" v-model=" vid">
</form>
</div>


<section class="text-center max-w-4xl m-auto bgcoralwhitepink my-8">
<h2 class="text-5xl text-center py-6">Vacancy Announcement!</h2>
<div v-if="vacancies && vacancies.length" :class="{ '!grid-cols-1': vacancies.length === 1 }" class="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
    <div v-for="vacancy in vacancies" :key="vacancy.title" class="text-center md:text-left px-4 py-6 bgtransparent">
        <h3 class="text-3xl font-bold text-center py-6">{{vacancy.title}}</h3>
        <div>
        <p class="text-2xl text-center underline">Education Qualification</p>
        <p>{{ vacancy.education }}</p>
        </div>
        <div>
        <p class="text-2xl text-center underline">Experience</p>
        <p>{{vacancy.experience}}</p>
        </div>
        <div class="text-center">
            <button class="mybutton"  @click="handleEdit(vacancy)">Edit</button>
            <button class="mybutton ml-2"  @click="handleDelete('vacancies',vacancy.id)">Delete</button>
        </div>
    </div>
</div>
<div v-else>
    <p>No vacancies available at the moment.</p>
</div>
</section>

</template>