<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const router = useRouter()


const handleSubmit = async () => {
    await auth.logIn(email.value, password.value)

    if (!auth.error) 
    {
    router.push('/')
    }
}


</script>

<template>
<section>
    <form @submit.prevent="handleSubmit" class="my-4 max-w-xl mx-auto rounded-lg shadow-md border border-gray-300 bg-white p-4 place-items-center items-center text-center">
    <h3 class="text-2xl text-center">Login</h3>
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto" type="email" placeholder="Email" v-model="email">
    <input class="border-b border-gray-300 p-2 outline-none block w-full box-border mx-auto"  type="password" placeholder="Password" v-model="password">
    <div class="text-xl text-red-600 my-4 mx-auto text-center" v-if="auth.error">{{ auth.error }}</div>
    <button class="mybutton text-center" v-if="!auth.isPending">Log in</button>
    <button class="mybutton text-center" v-if="auth.isPending" disabled>Loading...</button>
    </form>
</section>
</template>
