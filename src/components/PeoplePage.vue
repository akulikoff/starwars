<script setup lang="ts">
import { usePeopleStore } from "../store/people"
import { useRoute } from "vue-router"
import AppLoader from "./AppLoader.vue"
const peopleStore = usePeopleStore()
const route = useRoute()
const personId = Number(route.params.id)
peopleStore.loadPersonById(personId)


</script>
<template>
    <AppLoader v-if="peopleStore.loading" />
    <table class="mytable">
        <tbody>
            <tr class="table-header">
                <td>name</td>
                <td>height</td>
                <td>mass</td>
                <td>hair_color</td>
                <td>Add favorite/Remove favorite</td>
            </tr>
            <tr>
                <td v-if="peopleStore.person.id === 0">Person loading....</td>
                <td>{{ peopleStore.person.name }}</td>
                <td>{{ peopleStore.person.height }}</td>
                <td>{{ peopleStore.person.mass }}</td>
                <td>{{ peopleStore.person.hair_color }}</td>
                <td>
                    <button @click="peopleStore.addToFavorites(peopleStore.person)"
                        v-if="!peopleStore.person.isFavorite">Add</button>
                    <button @click="peopleStore.removeFromFavorites(peopleStore.person)"
                        v-if="peopleStore.person.isFavorite">Remove</button>
                </td>
            </tr>

        </tbody>
    </table>
</template>
<style scoped>
.table-header {
    font-size: 2.5rem;
}
</style>