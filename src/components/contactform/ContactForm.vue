<script setup>
import { ref } from 'vue'
import { firestoreDb } from '../../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const name = ref('')
const email = ref('')
const phnumber = ref('')
const region = ref('')
const company = ref('')
const message = ref('')

const isPending = ref(false)
const error = ref(null)

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
};

const validatePhoneNumber = (phnumber) => {
  const phoneRegex = /^[0-9]+$/;
  return phoneRegex.test(phnumber)
};

const handleSubmit = async (col) => {
  if (
    !name.value ||
    !email.value ||
    !phnumber.value ||
    !region.value ||
    !company.value ||
    !message.value
  ) {
    error.value = 'Please input all fields'
    return
  }

  if (!validateEmail(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }

  if (!validatePhoneNumber(phnumber.value)) {
    error.value = 'Enter numbers without space for ph no.'
    return
  }

  const colRef = collection(firestoreDb, col)

  try {
    isPending.value = true

    await addDoc(colRef, {
      name: name.value,
      email: email.value,
      phnumber: phnumber.value,
      region: region.value,
      company: company.value,
      message: message.value,
      createdAt: serverTimestamp(),
    })

    console.log('Message Sent')
    isPending.value = false
    handleReset()
    error.value = null
  } catch (err) {
    console.error('Error during upload:', err.message);
  }
};

// reset form
const handleReset = () => {
  name.value = ''
  email.value = ''
  phnumber.value = ''
  region.value = ''
  company.value = ''
  message.value = ''
  error.value = null
}


</script>


<template>
<form id="sformSection" @submit.prevent="" class="place-items-center items-center text-center md:text-left text-slate-400 mx-auto">
<div class="flex flex-col md:flex-row gap-8 pb-8">
    <div >
        <label class=""  >Full Name</label>
        <input  type="text" v-model="name"/>
    </div>
    <div class="">
        <label class=""  >Email</label>
        <input type="email" v-model="email"/>
    </div>
</div>
<div class="flex gap-8 pb-8">
    <div class="">
        <label class=""  >Phone number</label>
        <input type="text" v-model="phnumber"/>
    </div>
    <div class="">
        <label class=""  >Region / Country</label>
        <input  type="text" v-model="region"/>
    </div>
</div>
<div class="flex pb-8">
    <div class=" w-full">
        <label class=""  >Company</label>
        <input  type="text" v-model="company"/>
    </div>
</div>
<div class="flex pb-6">
    <div class=" w-full">
        <label class=""  >Message</label>
        <textarea  type="text" v-model="message"></textarea>
    </div>
</div>



<div class="flex">
    <button class="mybutton mx-auto" v-if="!isPending" :disabled="isPending" @click="handleSubmit('contact')">Send Message</button> 
    <button class="mybutton mx-auto" v-if="isPending" disabled>Loading</button>  
</div>
<div  v-if="error" class="text-xl bg-white rounded-xl text-red-400 my-4 w-auto mx-auto text-center">{{ error }}</div>
</form>
</template>

<style scoped>

input, textarea {
    @apply border-b border-gray-300 bg-transparent outline-none block w-full box-border mx-auto;
}

</style>
