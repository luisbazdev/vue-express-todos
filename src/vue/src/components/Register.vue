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
        res.data.success === true ? router.push('/register') : false
    })
}

function goToLogin(){
    router.push('/login')
}
</script>

<template>
    <div class="main">
        <h1>Sign Up</h1>
        <div class="form">
            <form>
                <input type='text' v-model='name' placeholder='Name'/>
                <input type='text' v-model='email' placeholder='Email'/>
                <input type='password' v-model='password' placeholder='Password'/>
            </form>
            <div class="register_buttons">
                <button @click="submitRegister">Sign Up</button>
                <button @click="goToLogin">Go to Log In page</button>
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
        justify-content: center;
        row-gap: 50px;
    }

    .form{
        width: 400px;
        display: flex;
        flex-direction: column;
        /* row-gap: 5px; */
    }

    .register_buttons{
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 10px;
    }
</style>