<script setup lang="ts">
import { ref, computed } from 'vue'
import NewDishForm from '../components/NewDishForm.vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'

interface Dish {
  id: string
  name: string
  status: string
}

const filterText = ref<string>('')
const dishList = ref<Dish[]>([
  {
    id: '7d9f3f17-964a-4e82-98e5-ecbba4d709a1',
    name: 'Ghost Pepper Poppers',
    status: 'Want to Try',
  },
  {
    id: '5c986b74-fa02-4a22-98f2-b1ff3559e85e',
    name: 'A Little More Chowder Now',
    status: 'Recommended',
  },
  {
    id: 'c113411d-1589-414f-a283-daf7eedb631e',
    name: 'Full Laptop Battery',
    status: 'Do Not Recommend',
  },
])
const showNewForm = ref(false)

const filteredDishList = computed(() => {
  return dishList.value.filter((dish) => {
    if (dish.name) {
      return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return dishList.value
    }
  })
})

const numberOfDishes = computed(() => {
  return filteredDishList.value.length
})

const addDish = (newDish: Dish) => {
  dishList.value.push(newDish)
  showNewForm.value = false
}

const deleteDish = (dishToDelete: Dish) => {
  dishList.value = dishList.value.filter((dish) => dish.id !== dishToDelete.id)
}
</script>

<template>
  <div class="columns is-desktop">
    <div class="column is-one-fifth">
      <SideMenu />
    </div>
    <div class="column">
      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <h1 class="title">My Dishes ({{ numberOfDishes }})</h1>
        <button class="button is-primary" @click="showNewForm = true">Add New</button>
      </div>

      <input class="input" type="text" placeholder="Filter" v-model="filterText" />

      <NewDishForm v-if="showNewForm" @dish-form-submitted="addDish" />

      <DishCard
        v-for="dish in filteredDishList"
        :key="dish.id"
        :dish="dish"
        @delete-dish="deleteDish"
      />
    </div>
  </div>
</template>
