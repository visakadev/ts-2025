<script setup lang="ts">
import { computed } from 'vue'
import type { Restaurant } from '@/types'

const {
  restaurant = {
    id: '',
    name: '',
    address: '',
    website: '',
    status: 'Want to Try',
  },
} = defineProps<{
  restaurant: Restaurant
}>()

const emit = defineEmits(['delete-restaurant'])

const statusColor = computed(() => {
  switch (restaurant.status) {
    case 'Want to Try':
      return 'is-warning'
    case 'Recommended':
      return 'is-success'
    case 'Do Not Recommend':
      return 'is-danger'
    default:
      return ''
  }
})

const deleteRestaurant = () => {
  emit('delete-restaurant', restaurant)
}
</script>

<template>
  <article class="box">
    <div class="media">
      <aside class="media-left">
        <img src="https://placehold.jp/150x150.png" alt="" />
      </aside>
      <div class="media-content">
        <p class="title is-4 is-spaced mb-1">
          {{ restaurant.name }}
        </p>
        <p class="subtitle mb-2">
          <span class="tag" :class="statusColor">{{ restaurant.status }}</span>
        </p>
        <div class="content mb-2">
          {{ restaurant.address }}
        </div>
        <div>
          <button @click="deleteRestaurant" class="button is-small is-danger is-light">
            Delete
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>
