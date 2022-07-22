<script setup lang="ts">
    import { ref } from 'vue'
    import axios from 'axios'

    let email = ref('')
    let password = ref('')

    function submitLogin(){
        axios.post('http://localhost:8181/api/login', {
            email: email.value,
            password: password.value
        }, {
            withCredentials: true
        })
        .then((res) => {
            console.log('logged in!', res.data)
            // if(res.data.authenticated === true)
            //     router.push('/todos')
        })
    }
</script>

<template>
    <input type='text' v-model='email' placeholder='Email'/>
    <input type='text' v-model='password' placeholder='Password'/>
    <button @click="submitLogin">Login</button>
</template>