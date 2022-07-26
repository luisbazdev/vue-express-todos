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

            let todo: Todo = res.data.todo
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
    <h1>Welcome to your todos!</h1>
    <!-- <button @click="logOut">Logout</button> -->

    <div class="todo_create">
        <input type='text' v-model='task' placeholder='Create a new todo' class="todo_create_input"/>
        <button @click="createTask" class="todo_create_button">Create</button>
    </div>

    <div id="todos_container">
        <Todo v-for="todo in todos" :key="todo.id" v-bind="todo"/>
    </div>

</div>
</template>

<style>
#todos_main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#todos_container{
    width: 400px;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
}

.todo_create{
    display: flex;
    column-gap: 10px;
}

.todo_create_button{
    background-color: transparent;
}

.todo_create_input{
    width: 300px;
    padding: 5px 8px;
    color: #000;
    background-color: #FFF;
}
</style>