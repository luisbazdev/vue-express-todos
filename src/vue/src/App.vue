<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="todos_app">
    <RouterView></RouterView>
  </div>
</template>

<style>
html, body{
  margin: 0;
  padding: 0;
}

#todos_app{
  color: #ffffff;
  background-color: rgb(27, 27, 27);
  height: 100vh;
}

p, h1, h2, h3, h4, h5, h6{
  margin: 0;
  padding: 0;
}

input, button{
  border: none;
  padding: 5px;
}

input{
  border-bottom: 1px solid #bcbcbc;
}

input:focus{
    outline: none;
}

button{
  padding: 10px 5px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  background-color: #327aff;
  border-radius: 3px;
}
</style>