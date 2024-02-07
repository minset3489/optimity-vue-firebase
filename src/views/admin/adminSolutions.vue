<script setup>
import { firestoreDb } from '@/firebase/config'
import { doc, collection, addDoc, serverTimestamp , updateDoc, deleteDoc } from 'firebase/firestore'
import useStorage from '@/composables/useStorage'
import getCollection from '@/composables/getCollection'
import { Icon } from '@iconify/vue'
import {ref} from 'vue'



//fetch the data
const { documents : solutions } = getCollection('solutions')

const { uploadImage,deleteImage, url, filePath } = useStorage()

// Solution v-model
const title = ref('')
const description = ref('')
const services= ref([''])
const file = ref(null)
const fileError = ref(null)
const soid =ref('') //for updating the data

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

    if(!title.value || !description.value || !services.value){
        error.value =  'Please fill in title, description and services fields.'
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
            services: services.value,
            solutionImageUrl: url.value,
            filePath: filePath.value,
            createdAt: serverTimestamp(),
            })
        }
        else{
            await addDoc(colRef, {
            title: title.value,
            description: description.value,
            services: services.value,
            createdAt: serverTimestamp(),
            })
        } 

        console.log('Solution added')
        isPending.value = false
        handleReset()

      } catch (err) {
        console.error('Error during upload:', err.message)
      }

  }

const handleUpdate = async (col,id) => {
    if(!title.value || !description.value || !services.value){
        error.value =  'Please fill in title, description and services fields.'
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
            services: services.value,
            solutionImageUrl: url.value,
            filePath: filePath.value,
            createdAt: serverTimestamp(),
            })
        }
        else{
            await  updateDoc(docRef, { 
            title: title.value,
            description: description.value,
            services: services.value,
            createdAt: serverTimestamp(),
            })
        } 
        console.log('Solution Info Updated')
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
const handleEdit = (solution) => {
    soid.value = solution.id
    title.value = solution.title
    description.value = solution.description
    isEdit.value=true

        // Add services from solution to the services array
    services.value = solution.services.map((service) => service)
        

    // Scroll to the top of the vform section
    window.scrollTo({
            top: 0,
            behavior: 'smooth',
    })
}

//Send Data to Form
const handleCancel = () => {
    soid.value = null
    title.value = ''
    description.value = ''
    file.value = ''
    isEdit.value=false

    // Clear the services array
    services.value = []
}

  // reset form
const handleReset = () =>{
    soid.value = null
    title.value=''
    description.value = ''
    file.value = ''
    services.value = []
    error.value=''
}

const addValue = () => {
    services.value.push('')
}
const deleteValue = (index) => {
    services.value.splice(index, 1)
}

solutions, Icon
</script>

<template>

<!-- Solutions Section -->
<div >
<form id="sformSection" @submit.prevent="" class="my-4 max-w-xl mx-auto rounded-lg shadow-md border border-gray-300 bg-white p-4 place-items-center items-center text-center">
    <h3 class="text-2xl text-center">Solutions Section</h3>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="text" placeholder="Solution Title" v-model="title">
    <textarea class="border-b border-gray-300 p-2 h-20 outline-none block w-full box-border mx-auto" placeholder="Description..." v-model="description"></textarea>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="file" @change="handleChange">
    <p class="text-xl font-normal text-center mt-4 mb-0">Service Support</p>
    <div class="flex place-items-center items-center" v-for="(service, index) in services" :key="index">
        <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" v-model="services[index]"/>
        <Icon @click="deleteValue()"  class="text-2xl cursor-pointer hover:text-red-500" name="mingcute:minus-circle-line"/>
    </div>
    <Icon @click="addValue()"  class="text-3xl cursor-pointer hover:text-green-500" name="material-symbols:add-circle-outline"/>
    <div  class="text-xl text-red-600 my-4 mx-auto text-center">{{ error }} {{ fileError }}</div>
    <button class="mybutton text-center"  v-if="!isPending && !isEdit" :disabled="isPending && isEdit" @click="handleSubmit('solutions')">Create</button>
    <button class="mybutton text-center" v-if="isEdit" @click="handleUpdate('solutions',soid)">Update</button>
    <button class="mybutton text-center ml-4" v-if="isEdit" @click="handleCancel">Cancel</button>
    <button class="mybutton text-center " v-if="isPending" disabled>Loading</button>
    <input class="hidden" v-model="soid">
</form>
</div>

<div v-for="solution in solutions" :key="solution.id" class="!pt-2">
    <div class="flex flex-col md:flex-row py-8 px-10 bgcoralwhitepink m-4">
        <div class=" flex flex-col md:flex-row">
            <div class="w-full md:w-4/12">
                <div class="font-semibold text-2xl mb-4">{{ solution.title }}</div>
                <div class=" md:pr-6">
                    <img class=" h-96rounded-lg mx-auto" :src="solution.solutionImageUrl" alt="Solution Image"/>
                </div>
            </div>

            <div class="w-full md:w-5/12">
                <div class="font-semibold text-2xl mb-4">Description</div>
                <p>{{ solution.description }}</p>
            </div>

            <div class="w-full md:w-3/12">
                <div class="font-semibold text-2xl mb-4">Service Support</div>
                <div v-for="services in solution.services" :key="services" class="text-left mx-auto">
                    <div class="flex text-lg">
                        <div><Icon class="text-green-500 mr-1 mt-1" icon="material-symbols:check-circle-rounded"/></div>
                        <div>{{ services }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class=" text-center">
            <button class="mybutton !w-full"  @click="handleEdit(solution)">Edit</button>
            <button class="mybutton !w-full"  @click="handleDelete('solutions',solution.id,solution.filePath)">Delete</button>
        </div>
    </div>
</div>



</template>