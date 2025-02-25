<template>
  <div>
    <h1>Welcome to State management !</h1>

    <p>pinia count : {{ countStore.count }}</p>
    <p>pinia doubleCount : {{ countStore.doubleCount }}</p>

    <button @click="countStore.increment()">add count pinia</button>

    <button @click="countStore.$reset">reset</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

// const { count, doubleCount, increment } = useCounterStore()

const countStore = useCounterStore()
</script>

<style scoped></style>
