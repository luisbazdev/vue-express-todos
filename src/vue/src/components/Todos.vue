<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios'

let task = ref('')
let description = ref('')

onMounted(() => {
    axios.get('http://localhost:8181/api/todos', {
        withCredentials: true
    })
    .then((res) => console.log(res))
})

function createTask(){
    console.log(task.value)

    axios.post('http://localhost:8181/api/todos', {
        task: task.value,
        description: description.value
    }, {
        withCredentials: true
    })
    .then((res) => {
        console.log(res)
    })
}
</script>

<template>
    <h1>Todos page!</h1>

    <input type='text' v-model='task' placeholder='Task'/>
    <input type='text' v-model='description' placeholder='Description'/>
    <button @click="createTask">Create</button>
</template>