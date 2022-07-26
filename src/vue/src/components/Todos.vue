<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios'
import router from '@/router';

import Todo from './Todo.vue'

let task = ref('')

interface Todo{
    id: string,
    finished: boolean,
    task: string,
    uid: string,
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
<div id="todos_main">
    <h1>Welcome, foo!</h1>
    <!-- <button @click="logOut">Logout</button> -->


    <input type='text' v-model='task' placeholder='Task'/>
    <button @click="createTask">Create</button>

    <div id="todos_container">
        <Todo v-for="todo in todos" :key="todo.id" v-bind="todo"/>
    </div>

</div>
</template>

<style>
#todos_app{
    display: flex;
    /* align-items: center; */
    justify-content: center;
}

#todos_container{
    display: flex;
    flex-direction: column;
    row-gap: 5px;
}
</style>