<script setup lang="ts">
    import { onBeforeMount, ref } from 'vue'
    import axios from 'axios'
    import router from '@/router';

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
            if(res.data.authenticated === true)
                router.push('/todos')
        })
    }
</script>

<template>
    <input type='text' v-model='email' placeholder='Email'/>
    <input type='text' v-model='password' placeholder='Password'/>
    <button @click="submitLogin">Login</button>
</template>