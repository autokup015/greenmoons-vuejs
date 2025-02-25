<template>
  <div>
    <h1>Welcome about pages !</h1>

    <h5>count : {{ countStore.count }}</h5>
    <h5>double count : {{ countStore.doubleCount }}</h5>

    <button @click="goBackHomePage">go home</button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useCounterStore } from '@/stores/counter'

const countStore = useCounterStore()

const goBackHomePage = () => {
  router.push({ path: '/' })
}
</script>

<style scoped></style>
