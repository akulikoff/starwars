<script setup lang="ts">
import { usePeopleStore } from "../store/people"
import { ref, computed, onMounted, watch } from "vue"
import { useRoute } from 'vue-router'
import SearchResults from "./SearchResults.vue"
import AppLoader from "./AppLoader.vue"
const peopleStore = usePeopleStore()
const searchPeople = ref("")
const route = useRoute()
const currentPage = computed(() => Number(route.params.page) || 1)
const prevPage = computed(() => currentPage.value - 1)
const nextPage = computed(() => currentPage.value + 1)
const itemsPerPage = 10
const start = (currentPage.value - 1) * itemsPerPage;
const end = start + itemsPerPage;

const displayedItems = computed(() => {
    return peopleStore.list.slice(start, end)
})

onMounted(() => {
    fetchPeoplePage()
})
function fetchPeoplePage() {
    peopleStore.fetchPeoplePage(currentPage.value);
}

watch(currentPage, async (nextPage, prevPage) => {
    try {
        const res = await fetch(`https://swapi.dev/api/people/?page=${nextPage}`)
        route.params.page = nextPage.value
    } catch (error) {
        console.log(error)
    }

})
</script>
<template>
    <div>
        <h1>People List</h1>
        <SearchResults :searchTerm="searchPeople" />
        <AppLoader v-if="peopleStore.loading" />
        <table class="mytable" v-if="peopleStore.loading == false && peopleStore.list.length > 0">
            <tbody>
                <tr class="table-header">
                    <td>name</td>
                    <td>height</td>
                    <td>mass</td>
                    <td>hair_color</td>
                    <td>Add favorite/Remove favorite</td>
                </tr>
                <tr v-for="person in displayedItems" :key="person.id">
                    <td>
                        <router-link :to="{ name: 'Person', params: { id: person.id } }">
                            <a @click="peopleStore.loadPersonById(person.id)"> {{ person.name }}</a>
                        </router-link>

                    </td>
                    <td>{{ person.height }}</td>
                    <td>{{ person.mass }}</td>
                    <td>{{ person.hair_color }}</td>
                    <td>
                        <button @click="peopleStore.addToFavorites(person)" v-if="!person.isFavorite">Add</button>
                        <button @click="peopleStore.removeFromFavorites(person)" v-if="person.isFavorite">Remove</button>
                    </td>
                </tr>

            </tbody>
        </table>
        <p v-else>No people found</p>
        <div class="pagination">
            <router-link v-if="prevPage !== null" :to="`/people/page/${prevPage}`"><button class="pagination-el"
                    :key="prevPage" :disabled="prevPage === 0">Previous</button>
            </router-link>

            <span class="pagination-el">{{ currentPage }}</span>
            <router-link v-if="nextPage !== null" :to="`/people/page/${nextPage}`"><button class="pagination-el"
                    :key="nextPage" :disabled="peopleStore.hasNextPage == false">Next</button>
            </router-link>
        </div>
    </div>
</template>

<style>
.pagination {
    width: min-content;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: stretch;
    align-items: flex-start;
    margin-top: 20px;
}

.pagination-el {
    order: 0;
    flex: 0 1 auto;
    align-self: center;
    padding: .5rem;
}
</style>
