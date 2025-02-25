<template>
  <div>
    <h1>Header : {{ text }}</h1>
    <hr />
  </div>
</template>

<script setup lang="ts">
// --------------------------- type ---------------------------

type Props = {
  text: string
}

// --------------------------- Props ---------------------------

const { text = 'kuy' } = defineProps<Props>()
</script>

<style scoped></style>
