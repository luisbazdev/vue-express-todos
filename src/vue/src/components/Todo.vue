<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

import axios from 'axios'

const props = defineProps({
    id: String,
    finished: Boolean,
    task: String,
    uid: String,
    createdAt: Date
})

let changed: Ref<Boolean> = ref(false)

// save the first values
let _task = props.task
let _finished = props.finished

/**
 * When either checkbox or text input change,
 * set 'changed' variable to true.
 * 
 * If both 'task' and 'finished' props hold 
 * the same value as '_task' and '_finished'
 * set 'changed' variable to false.
 */
function onChange(){
    _task === props.task && _finished === props.finished ? changed.value = false : changed.value = true
}

function saveTodo(){
    axios.patch(`http://localhost:8181/api/todos/${props.id}`, {
        finished: props.finished,
        task: props.task,
    }, {
        withCredentials: true
    })
    .then((res) => {
        changed.value = false
    })
}

function deleteTodo(){
    axios.delete(`http://localhost:8181/api/todos/${props.id}`, {
        withCredentials: true
    }).then((res) => console.log('Todo deleted'))
}
</script>

<template>
<div class="todo">
    <div class="todo_info">
        <form @change="onChange">
            <input type='checkbox' v-model="finished"/>
            <input type='text' v-model="task"/>
        </form>
    </div>
    <div class="todo_buttons">
        <button v-if="changed" @click="saveTodo" class="todos_buttons_save">Save</button>
        <button class="todos_buttons_remove" @click="deleteTodo">Remove</button>
    </div>
</div>
</template>

<style>
.todo{
    padding: 10px;
    display: flex;
    flex-direction: column;
    column-gap: 5px;
}

.todo_info{
    display: flex;
}

.todo_buttons{
    display: flex;
    column-gap: 5px;
}

.todos_buttons_save, .todos_buttons_remove{
    padding: 5px;
}

.todos_buttons_save{
    background-color: green;
}

.todos_buttons_remove{
    background-color: red;
}
</style>