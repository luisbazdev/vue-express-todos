<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router';

let name = ref('')
let email = ref('')
let password = ref('')

function submitRegister(){
    axios.post('http://localhost:8181/api/register', {
        name: name.value,
        email: email.value,
        password: password.value
    })
    .then((res: any) => {
        res.data.success === true ? router.push('/login') : false
    })
}

function goToLogin(){
    router.push('/login')
}
</script>

<template>
    <div class="register_main">
        <h1>Sign Up</h1>
        <div class="register_form">
            <input type='text' v-model='name' placeholder='Name'/>
            <input type='text' v-model='email' placeholder='Email'/>
            <input type='password' v-model='password' placeholder='Password'/>
            <div class="register_buttons">
                <button @click="submitRegister">Sign Up</button>
                <button @click="goToLogin">Go to Log In page</button>
            </div>
        </div>
    </div>
</template>

<style>
    .register_main{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 20px;
    }

    .register_form{
        width: 400px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .register_buttons{
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 10px;
    }
</style>