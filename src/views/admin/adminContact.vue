<script setup>
import { firestoreDb } from '@/firebase/config'
import { doc, serverTimestamp , updateDoc, deleteDoc } from 'firebase/firestore'

import getCollection from '@/composables/getCollection'
import { Icon } from '@iconify/vue'

import {ref} from 'vue'

//fetch the data
const { documents : contact } = getCollection('contact')
const { documents : optimity } = getCollection('optimity')

const isPending = ref(false)

const addValue = (target) => {
  target.push('');
}

const deleteValue = (target, index) => {
  // Check if there is at least one item in the array
  if (target.length > 1) {
    target.splice(index, 1);
  }
}

const handleUpdate = async (col) => {
  const docRef = doc(firestoreDb, 'optimity', col.id);
  try {
    isPending.value = true;

    await updateDoc(docRef, { 
      address: col.address,
      phone: col.phone,
      email: col.email
    });

    console.log('Company Information Updated');
    isPending.value = false;
  } catch (err) {
    console.error('Error during updating data!', err.message);
    isPending.value = false;
  }
}

// Function to format the timestamp to dd-mm-yy
const formatDate = (timestamp) => {
const date = new Date(timestamp.seconds * 1000);
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear().toString().slice(-2);

return `${day}-${month}-${year}`;
}

contact, optimity, Icon
</script>

<template>
 <!-- Company Info Section -->
 <section class="max-w-5xl m-auto bgcoralwhitepink mt-10">
    <div v-for="op in optimity" :key="op.id" class="">
      <h3 class="text-5xl text-center py-6">Company Infomation</h3>
      <div>
        <label class="text-2xl">Address</label>
        <textarea class="bg-transparent border-b border-gray-300 p-2 h-20 md:h-14 outline-none block w-full box-border mx-auto" v-model="op.address"></textarea>
      </div>

      <div class="mt-4">
        <label class="text-2xl">Phone</label>
        <div v-for="(phone, index) in op.phone" :key="index" class="flex items-center">
          <input
            class="bg-transparent border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto"
            type="text"
            v-model="op.phone[index]"
            :placeholder="op.phone[index] ? '' : 'Put phone here'"
          />
          <Icon v-if="index > 0" @click="deleteValue(op.phone, index)" class="text-2xl ml-2 cursor-pointer hover:text-red-500" icon="mingcute:minus-circle-line" />
          <Icon @click="addValue(op.phone)" class="text-2xl ml-2 cursor-pointer hover:text-green-500" icon="material-symbols:add-circle-outline" />
        </div>
      </div>

      <div class="mt-4">
        <label class="text-2xl">Email</label>
        <div v-for="(email, index) in op.email" :key="index" class="flex items-center">
          <input
            class="bg-transparent border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto"
            type="text"
            v-model="op.email[index]"
            :placeholder="op.email[index] ? '' : 'Put email here'"
          />
          
          <Icon v-if="index > 0" @click="deleteValue(op.email, index)" class="text-2xl ml-2 cursor-pointer hover:text-red-500" icon="mingcute:minus-circle-line" />
          <Icon @click="addValue(op.email)" class="text-2xl ml-2 cursor-pointer hover:text-green-500" icon="material-symbols:add-circle-outline" />
        </div>
      </div>

      <div class="text-center">
        <button v-if="!isPending" class="mybutton" @click="handleUpdate(op)">Update Info.</button>
        <button class="mybutton text-center" v-if="isPending" disabled>Updating...</button>
      </div>
    </div>
  </section>
     
<div class=" py-8 px-10 bgcoralwhitepink m-4 mx-12">
    <div>
        <h3 class="  text-4xl text-center mb-4">Contact List</h3>
    </div>
    <div>
        <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead class="bg-gray-100">
                <tr>
                    <th class=" p-2  w-24 border-b">Date</th>
                    <th class=" p-2  w-36 border-b">Customer Name</th>
                    <th class=" p-2 border-b">Email</th>
                    <th class=" p-2 border-b">Phone</th>
                    <th class=" p-2 border-b">Region</th>
                    <th class=" p-2 border-b">Company</th>
                    <th class=" p-2 border-b">Message</th>
                    <th class=" p-2 border-b">Edit / Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="co in contact" :key="co.id" class="hover:bg-gray-50 text-center">
                    <td class=" p-2  w-24 border-b">{{ formatDate(co.createdAt) }}</td>
                    <td class=" w-36 border-b">{{ co.name }}</td>
                    <td class=" p-2 border-b">{{ co.email }}</td>
                    <td class=" p-2 border-b">{{ co.phnumber }}</td>
                    <td class=" p-2 border-b">{{ co.region }}</td>
                    <td class=" p-2 border-b">{{ co.company }}</td>
                    <td class=" p-2 border-b w-96 text-justify">{{ co.message }}</td>
                    <td class=" p-2 border-b">
                    <button class="text-blue-500 hover:underline mr-2">Edit</button>
                    <button class="text-red-500 hover:underline">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
</div>
</div>
</template>