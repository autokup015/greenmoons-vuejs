<template>
  <div>
    <!-- --------------------------- Todo list --------------------------- -->

    <TodoList />

    <!-- --------------------------- State management --------------------------- -->

    <!-- <div>
      <h1>Welcome to State management !</h1>

      <p>pinia count : {{ countStore.count }}</p>

      <p>pinia doubleCount : {{ countStore.doubleCount }}</p>

      <button @click="countStore.increment()">add count pinia</button>

      <button @click="countStore.$reset">reset</button>

      <br />

      <hr />

      <button @click="goAboutPage">go about page</button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import TodoList from '@/components/todolist/TodoList.vue'

// ---------------------------------------------------------------------------------

import router from '@/router'
import { useCounterStore } from '@/stores/counter'

// --------------------------- Pinia ---------------------------

const countStore = useCounterStore()

// --------------------------- Function ---------------------------

const goAboutPage = () => {
  router.push({ path: '/about' })
}
</script>

<style scoped></style>
