<template>
  <div>
    <p>hello man</p>
    <p>hello dude naja</p>

    <p data-testid="text-props">{{ text }}</p>

    <button @click="clickMe" data-testid="btn-test-naja">myBtn</button>
  </div>
</template>

<script setup lang="ts">
type Props = {
  text: string
  clickMe: () => void
}

const { text, clickMe } = defineProps<Props>()
</script>

<style scoped></style>
