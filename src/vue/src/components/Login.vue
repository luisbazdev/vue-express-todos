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

function goToRegister(){
    router.push('/register')
}
</script>

<template>
    <div class="login_main">
        <h1>Log In</h1>
        <div class="login_form">
            <input type='text' v-model='email' placeholder='Email'/>
            <input type='password' v-model='password' placeholder='Password'/>
            <div class="login_buttons">
                <button @click="submitLogin">Log In</button>
                <button @click="goToRegister">Create New Account</button>
            </div>
        </div>
    </div>
</template>

<style>
    .login_main{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 20px;
    }

    .login_form{
        width: 400px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .login_buttons{
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 10px;
    }
</style>