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

p, h1, h2, h3, h4, h5, h6{
  margin: 0;
  padding: 0;
}

input, button{
  border: none;
  padding: 5px;
}

input{
  color: #FFF;
  border: 0;
  background-color: transparent;
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

#todos_app{
  color: #ffffff;
  background-color: rgb(27, 27, 27);
  height: 100vh;
}

.login_form input, .register_form input{
    color: #000;
    background-color: #FFF;
}
</style>