<template>
  <div>
    <h1>Hello about page : {{ $route.params.id }}</h1>

    <div v-if="!detailTodo">
      <h1>No data</h1>
    </div>

    <div class="card-detail" v-else>
      <h2>{{ detailTodo?.id }} : {{ detailTodo.description }}</h2>

      <h2>
        Status :
        <span :style="`color : ${detailTodo.completed ? 'green' : 'red'}`">
          {{ detailTodo.completed ? 'Done' : 'Not Done' }}
        </span>
      </h2>

      <h2>Create : {{ dayjs(detailTodo.created_at).format('DD / MM / YYYY') }}</h2>

      <h2>Update : {{ dayjs(detailTodo.updated_at).format('DD / MM / YYYY') }}</h2>
    </div>

    <button @click="router.push('/')">Go Home pages</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import axios from 'axios'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// --------------------------- Type ---------------------------

type TTodoData = {
  completed: boolean
  created_at: string
  description: string
  id: number
  updated_at: string
}

type TTodoDetailResponse = {
  data: TTodoData
  success: boolean
}

// --------------------------- State ---------------------------

const { ENDPOINT } = useCounterStore()

const { params } = useRoute()

const router = useRouter()

const detailTodo = ref<TTodoData | null>(null)

// --------------------------- Same like Use effect ---------------------------

onMounted(() => {
  fetchDetailTodoList()
})

// --------------------------- Function ---------------------------

const fetchDetailTodoList = async () => {
  const { data } = await axios.get<TTodoDetailResponse>(`${ENDPOINT}/api/todos/${params.id}`)

  detailTodo.value = data.data
}
</script>

<style scoped>
.card-detail {
  padding: 15px;
  border: 1px solid white;
  border-radius: 10px;
}
</style>
