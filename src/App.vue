<template>
  <div>
    <HeaderCustom text="Props text" />

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import HeaderCustom from './components/layout/HeaderCustom.vue'
</script>

<style scoped></style>
