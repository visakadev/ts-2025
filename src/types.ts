import { restaurantStatusList, dietList } from '@/constants'
export type Restaurant = {
  id: string
  name: string
  status: string
  address: string
  website: string
}

export type diet = (typeof dietList)[number]
export type status = (typeof restaurantStatusList)[number]
