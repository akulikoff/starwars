import { defineStore } from "pinia"
import router from "../router"
import axios from "axios"
const url = "https://swapi.dev/api/people"

const loadFavoritesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("favorites") || "[]") as PersonsInfo[]
}

const loadListFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("people") || "[]") as PersonsInfo[]
}

const extractId = (url: string) => {
  const baseUrl = "https://swapi.dev/api/people/"
  if (url.startsWith(baseUrl)) {
    const numberStr = url.substring(baseUrl.length, url.length - 1)
    const number = parseInt(numberStr)
    return number
  }
  return 0
}

export const usePeopleStore = defineStore("people", {
  state: () => ({
    person: {} as PersonsInfo, // PeoplePage.vue
    list: loadListFromLocalStorage(), // PeopleList.vue
    favorites: loadFavoritesFromLocalStorage(), // FavoriteList.vue
    results: [] as PersonsInfo[],
    hasNextPage: true,
    loading: false,
  }),
  actions: {
    mapApiDataToPerson(apiItem: any) {
      return {
        name: apiItem.name,
        height: apiItem.height,
        mass: apiItem.mass,
        hair_color: apiItem.hair_color,
        isFavorite: this.isFavorite(apiItem),
        url: apiItem.url,
        id: extractId(apiItem.url),
      } as PersonsInfo
    },

    isFavorite(apiItem: any) {
      return this.favorites.find(
        (item: PersonsInfo) => item.url === apiItem.url
      )
        ? true
        : false
    },
    async fetchPeople() {
      try {
        const res = await axios.get(`${url}`)
        const apiData = res.data.results.map((apiItem: any) =>
          this.mapApiDataToPerson(apiItem)
        )

        for (const item of apiData) {
          if (!this.list.some((person) => person.id === item.id)) {
            this.list.push(item)
          }
        }
        localStorage.setItem("people", JSON.stringify(this.list)) // TODO: watch
      } catch (error) {
        console.log("Fetching people error", error)
      }
    },
    async fetchPeoplePage(page: number) {
      try {
        this.loading = true
        const res = await axios.get(`${url}/?page=${page}`)
        if (!res.data.next) {
          this.hasNextPage = false
        }
        if (res.data.next !== null) {
          this.hasNextPage = true
        }
        const apiData = res.data.results.map((apiItem: any) =>
          this.mapApiDataToPerson(apiItem)
        )
        // router.push({ params: { page: page } })
        for (const item of apiData) {
          if (!this.list.some((person) => person.id === item.id)) {
            this.list.push(item)
          }
        }

        // TODO: watch
      } catch (error) {
        console.log("Fetching page error", error)
      } finally {
        localStorage.setItem("people", JSON.stringify(this.list))
        console.log("Fetching page finally", page)
        this.loading = false
      }
    },
    async fetchPeopleByName(query: string) {
      try {
        this.loading = true
        const res = await axios.get(`${url}/?search=${query}`)
        this.results = res.data.results.map((apiItem: any) =>
          this.mapApiDataToPerson(apiItem)
        )
      } catch (error) {
        console.log("Searching name error", error)
      } finally {
        this.loading = false
      }
    },
    async fetchPersonById(id: number) {
      const res = await axios.get(`${url}/${id}`)
      const apiItem = res.data
      const item = this.mapApiDataToPerson(apiItem)
      router.push({ name: "Person", params: { id: id } })
      this.list.push(item)
      localStorage.setItem("people", JSON.stringify(this.list)) // TODO: watch

      return item
    },
    async loadPersonById(id: number) {
      this.person =
        this.list.find((item) => {
          return item.id === id
        }) || ({ id: 0 } as PersonsInfo)
      if (!this.person || !this.person.id) {
        this.person = await this.fetchPersonById(id)
      }
    },
    toggleFavorite(person: PersonsInfo) {
      if (person.isFavorite) {
        this.removeFromFavorites(person)
      } else {
        person
      }
    },
    addToFavorites(person: PersonsInfo) {
      person.isFavorite = true
      if (!this.favorites.some((item: PersonsInfo) => item.id === person.id)) {
        this.favorites.push(person)
        localStorage.setItem("favorites", JSON.stringify(this.favorites))
        localStorage.setItem("people", JSON.stringify(this.list)) // TODO: watch
      }
    },
    removeFromFavorites(person: PersonsInfo) {
      this.favorites = this.favorites.filter(
        (item: PersonsInfo) => item.id !== person.id
      )
      const notFavorite = this.list.find(
        (item: PersonsInfo) => item.id == person.id
      )
      notFavorite.isFavorite = false
      localStorage.setItem("favorites", JSON.stringify(this.favorites))
      localStorage.setItem("people", JSON.stringify(this.list)) // TODO: watch
    },
  },
})

interface PersonsInfo {
  name: string
  height: string
  mass: string
  hair_color: string
  isFavorite: boolean
  id: number
  url: string
}
