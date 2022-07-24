<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios'
import router from '@/router';

let task = ref('')

interface Todo{
    id: String,
    finished: Boolean,
    task: String,
    uid: String,
    createdAt: Date
}

let todos: Ref<Array<Todo>> = ref([])

onMounted(() => {
    axios.get('http://localhost:8181/api/todos', {
        withCredentials: true
    })
    .then((res) => todos.value = res.data)
})

function createTask(){
    axios.post('http://localhost:8181/api/todos', {
        task: task.value
    }, {
        withCredentials: true
    })
    .then((res) => {
        if(res.data.authenticated === false)
            router.push('/login')
        else{
            task.value = ''

            let todo: Todo = res.data
            todos.value.unshift(todo)
        }
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
    <h1>Welcome, foo!</h1>

    <input type='text' v-model='task' placeholder='Task'/>
    <button @click="createTask">Create</button>

    <div>
        <div v-for="todo in todos">
            <p>{{ todo.task }}</p>
        </div>
    </div>

    <button @click="logOut">Logout</button>
</template>

<style>

</style>