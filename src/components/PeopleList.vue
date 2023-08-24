<script setup lang="ts">
import { usePeopleStore } from "../store/people"
import { ref, onMounted } from "vue"
import SearchResults from "./SearchResults.vue"
const peopleStore = usePeopleStore()
peopleStore.fetchPeople()
const searchPeople = ref("")
onMounted(() => {

})
</script>
<template>
    <div>
        <h1>People List</h1>
        <SearchResults :searchTerm="searchPeople" />
        <table class="mytable" v-if="peopleStore.list.length > 0">
            <tbody>
                <tr class="table-header">
                    <td>name</td>
                    <td>height</td>
                    <td>mass</td>
                    <td>hair_color</td>
                    <td>Add favorite/Remove favorite</td>
                </tr>
                <tr v-for="person in peopleStore.list" :key="person.id">
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
    </div>
</template>

<style scoped></style>
