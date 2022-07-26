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
        <form @change="onChange" class="todo_form">
            <input type='checkbox' v-model="finished"/>
            <input type='text' v-model="task" class="todo_task" :class="{todo_finished: props.finished}" :disabled="props.finished"/>
        </form>
    </div>
    <div class="todo_buttons">
        <button @click="saveTodo" class="todos_buttons_save" :class="{todo_button_disabled: changed == false}" :disabled="changed == false">Save</button>
        <button @click="deleteTodo" class="todos_buttons_remove">Remove</button>
    </div>
</div>
</template>

<style>
.todo{
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    column-gap: 5px;
}

.todo_info{
    display: flex;
}

.todo_form{
    width: 100%;
    display: flex;
    column-gap: 5px;
}

.todo_task{
    width: 100%;
    font-size: 18px;
}

.todo_buttons{
    display: flex;
    column-gap: 10px;
}

.todos_buttons_save, .todos_buttons_remove{
    font-weight: bold;
    padding: 3px 2px;
}

.todos_buttons_save{
    color: rgb(82, 255, 47);
    background-color: transparent;
}

.todos_buttons_remove{
    color: rgb(255, 47, 47);
    background-color: transparent;
}

.todo_finished{
    color: rgb(190, 190, 190);
    text-decoration: line-through;
}

.todo_button_disabled{
    cursor: initial;
    color: rgba(82, 255, 47, 0.534);
}
</style>