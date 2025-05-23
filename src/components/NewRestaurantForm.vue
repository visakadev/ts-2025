<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

interface Restaurant {
  id: string
  name: string
  address: string
  website: string
  status: string
}

const emit = defineEmits(['restaurant-form-submitted'])

const newRestaurant = ref<Restaurant>({
  id: uuidv4(),
  name: '',
  address: '',
  website: '',
  status: 'Want to Try',
})

const restaurantStatusList = ['Want to Try', 'Recommended', 'Do Not Recommend']

const elNameInput = ref(null)

const updateName = (event: Event) => {
  newRestaurant.value.name = (event.target as HTMLInputElement).value
}

const submitForm = () => {
  emit('restaurant-form-submitted', newRestaurant.value)
  newRestaurant.value = {
    id: uuidv4(),
    name: '',
    address: '',
    website: '',
    status: 'Want to Try',
  }
  if (elNameInput.value) {
    ;(elNameInput.value as HTMLInputElement).focus()
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="field">
      <div class="field">
        <label for="name" class="label">Name</label>
        <div class="control">
          <input
            v-model="newRestaurant.name"
            type="text"
            class="input is-large"
            placeholder="Beignet and the Jets"
            required
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <label for="address" class="label">Address</label>
        <div class="control">
          <input
            v-model="newRestaurant.address"
            type="text"
            class="input"
            placeholder="123 Main St"
          />
        </div>
      </div>
      <div class="field">
        <label for="website" class="label">Website</label>
        <div class="control">
          <input
            v-model="newRestaurant.website"
            type="text"
            class="input"
            placeholder="www.beignetandthejets.com"
          />
        </div>
      </div>
      <div class="field mb-5">
        <label for="status" class="label">Status</label>
        <div class="select">
          <select v-model="newRestaurant.status" id="status">
            <option
              v-for="status in restaurantStatusList"
              :value="status"
              :key="`option-${status}`"
            >
              {{ status }}
            </option>
          </select>
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button type="submit" class="button is-success">Create</button>
          <button type="button" @click="$emit('cancel-new-restaurant')" class="button is-light">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
