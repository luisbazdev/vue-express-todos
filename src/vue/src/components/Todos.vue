<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios'
import router from '@/router';

let task = ref('')
let description = ref('')

onMounted(() => {
    axios.get('http://localhost:8181/api/todos', {
        withCredentials: true
    })
    .then((res) => console.log(res))
})

function createTask(){
    axios.post('http://localhost:8181/api/todos', {
        task: task.value,
        description: description.value
    }, {
        withCredentials: true
    })
    .then((res) => {
        res.data.authenticated === false ? router.push('/login') : false
    })
}

function logOut(){
    axios.post('http://localhost:8181/api/logout', {}, {
        withCredentials: true
    })
    .then((res) => {
        res.data.authenticated === false ? router.push('/login') : false
    })
}
</script>

<template>
    <h1>Todos page!</h1>

    <input type='text' v-model='task' placeholder='Task'/>
    <input type='text' v-model='description' placeholder='Description'/>
    <button @click="createTask">Create</button>

    <button @click="logOut">Logout</button>
</template>