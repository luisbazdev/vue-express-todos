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
    <div class="main">
        <div class="header">
            <p>This is a simple todo management web application built with Express and Vue,</p>
            <p>I made this project to learn a bit more about sessions, you can find the code <a href='https://github.com/luisbazdev/vue-express-todos'>here</a>.</p>
        </div>
        <h1>Log In</h1>
        <div class="form">
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
    .main{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        row-gap: 50px;
    }

    .form{
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