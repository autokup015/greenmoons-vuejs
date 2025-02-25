<template>
  <div>
    <h1>Welcome todo list !!</h1>

    <!-- --------------------------- Render No item --------------------------- -->

    <div class="nodata" v-if="!arrList.state.length">
      <h1>No data naja i nong !</h1>
    </div>

    <!-- --------------------------- Render Item --------------------------- -->

    <div class="card" v-for="(item, index) in arrList.state" :key="item.id">
      <div class="item">
        {{ index + 1 }} : {{ item.value }}

        <button class="button-del" @click="delItem(item.id)">x</button>
      </div>
    </div>

    <input type="text" v-model="inputValue" @keydown.enter="addTodoList" />

    <button @click="addTodoList">Add</button>
    <button @click="arrList.clearState">clear</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import { v1 as UUID } from 'uuid'

// --------------------------- Type ---------------------------

type TStateArr = {
  state: Array<{ id: string; value: string }>
  clearState: VoidFunction
}

// --------------------------- State ---------------------------

const arrList = reactive<TStateArr>({
  state: [],
  clearState: () => (arrList.state = []),
})

const inputValue = ref('')

// --------------------------- Function ---------------------------

const addTodoList = () => {
  const { value } = inputValue

  if (!value.trim()) {
    return
  }

  const finalValue = {
    id: UUID(),
    value,
  }

  arrList.state.push(finalValue)

  inputValue.value = ''
}

const delItem = (id: string) => {
  const { state } = arrList

  const delArr = state.filter((item) => item.id !== id)

  arrList.state = delArr
}
</script>

<style scoped>
.card {
  padding: 10px;
  border: 1px solid black;
  margin-bottom: 10px;

  .item {
    display: flex;
    justify-content: space-between;
  }

  .button-del {
    height: auto;
  }
}

.nodata {
  padding: 40px;
  border: 1px solid gray;
  border-radius: 8px;
  margin-bottom: 10px;
  text-align: center;
}
</style>
