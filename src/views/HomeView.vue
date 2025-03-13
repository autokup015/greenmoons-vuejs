<template>
  <div>
    <h1>Home pages</h1>

    <hr />

    <!-- ! Create todo list -->

    <div>
      <h1>Create todo list</h1>

      <div class="flex-box">
        <input type="text" v-model="inputValue" @keydown.enter="createTodoList" />

        <button @click="createTodoList">Create</button>
      </div>
    </div>

    <!-- ! Loading -->

    <div class="box-loading-blank" v-if="isLoading">
      <h1>Loading ...</h1>
    </div>

    <!-- ! No data -->

    <div class="box-loading-blank" v-if="!isLoading && !stateTodo.data.length">
      <h1>No data Naja nong nong !</h1>
    </div>

    <!-- ! Render item -->

    <div class="box-card">
      <div class="card" v-for="(item, index) in stateTodo.data" :key="item.id">
        <!-- ! No edit case -->
        <div class="data" v-if="selectedData?.id !== item.id">
          <p>{{ index + 1 }} : {{ item.description }}</p>

          <div class="flex-box">
            <p :style="`color : ${item.completed ? 'green' : 'red'}`">
              {{ item.completed ? 'Done' : 'Not Done' }}
            </p>

            <button @click="goDetail(item.id)">Go Detail</button>

            <button @click="onEditData(item)">Edit</button>

            <button @click="deleteTodoList(item.id)">Delete</button>
          </div>
        </div>

        <!-- ! Edit case -->
        <div class="data" v-else>
          <div class="flex-box flex-1">
            <p>{{ index + 1 }} :</p>
            <input class="input-text" type="text" v-model="selectedData.description" />
            <input type="checkbox" v-model="selectedData.completed" />
          </div>

          <div class="flex-box">
            <div class="flex-box">
              <button @click="cancelSelected">Cancel</button>
              <button @click="updateTodoList">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// --------------------------- Type ---------------------------

type TTodoData = {
  completed: boolean
  created_at: string
  description: string
  id: number
  updated_at: string
}

type TTodoState = {
  data: Array<TTodoData>
}

type TTodoResponse = {
  data: Array<TTodoData>
  success: boolean
}

type TUpdateTodoResponse = {
  description: string
  completed: boolean
}

type TDeleteResponse = {
  data: number
  success: boolean
}

import { useCounterStore } from '@/stores/counter'
// --------------------------- Import ---------------------------

import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

// --------------------------- State ---------------------------

const router = useRouter()

const { ENDPOINT } = useCounterStore()

const isLoading = ref(false)

const stateTodo = reactive<TTodoState>({
  data: [],
})

const selectedData = ref<TTodoData | null>(null)

const inputValue = ref('')

// --------------------------- Same like Use Effect ---------------------------

onMounted(() => {
  fetchTodoList()
})

// --------------------------- Api ---------------------------

const fetchTodoList = async () => {
  isLoading.value = true

  const { data } = await axios.get<TTodoResponse>(`${ENDPOINT}/api/todos`)

  stateTodo.data = data.data

  isLoading.value = false
}

const createTodoList = async () => {
  const paylaod = {
    description: inputValue.value || 'มึงอย่าปล่อยว่างอิสัส',
  }

  await axios.post(`${ENDPOINT}/api/todos`, paylaod)

  inputValue.value = ''
  fetchTodoList()
}

const updateTodoList = async () => {
  if (!selectedData.value) {
    return
  }

  const payload: TUpdateTodoResponse = {
    description: selectedData.value.description || 'เอาอีกละ มึงอย่าปล่อยว่างอิสัส',
    completed: selectedData.value.completed,
  }

  await axios.put(`${ENDPOINT}/api/todos/${selectedData.value.id}`, payload)

  selectedData.value = null

  fetchTodoList()
}

const deleteTodoList = async (id: number) => {
  const { data } = await axios.delete<TDeleteResponse>(`${ENDPOINT}/api/todos/${id}`)

  stateTodo.data = stateTodo.data.filter((item) => item.id !== data.data)
}

// --------------------------- Function ---------------------------

const onEditData = (data: TTodoData) => {
  selectedData.value = { ...data }
}

const cancelSelected = () => {
  selectedData.value = null
}

const goDetail = (id: number) => {
  router.push(`/about/${id}`)
}
</script>

<style scoped>
.box-card {
  max-width: 800px;
  margin: auto;

  .card {
    padding: 15px;
    border: 1px solid white;
    border-radius: 10px;
    margin: 10px 0px;

    .data {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.flex-box {
  display: flex;
  gap: 10px;

  .input-text {
    width: 100%;
    max-width: 300px;
  }
}

.flex-1 {
  flex-grow: 1;
}

/* --------------------------- Loading --------------------------- */

.box-loading-blank {
  padding: 200px;
  text-align: center;
}
</style>
