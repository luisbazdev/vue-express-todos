<script setup lang="ts">
    import { ref } from 'vue'
    import axios from 'axios'

    let name = ref('')
    let email = ref('')
    let password = ref('')

    function submitRegister(){
        axios.post('http://localhost:8181/api/register', {
            name: name.value,
            email: email.value,
            password: password.value
        })
        .then((res) => console.log(res))
    }
</script>

<template>
    <input type='text' v-model='name' placeholder='Name'/>
    <input type='text' v-model='email' placeholder='Email'/>
    <input type='text' v-model='password' placeholder='Password'/>
    <button @click="submitRegister">Register</button>
</template>