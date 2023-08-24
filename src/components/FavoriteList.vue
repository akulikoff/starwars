<script setup lang="ts">
import { usePeopleStore } from "../store/people"

const peopleStore = usePeopleStore()
</script>
<template>
    <div>
        <table class="mytable" v-if="peopleStore.favorites.length > 0">
            <tbody>
                <tr class="table-header">
                    <td>name</td>
                    <td>height</td>
                    <td>mass</td>
                    <td>hair_color</td>
                    <td>Add favorite/Remove favorite</td>
                </tr>
                <tr v-for="person in peopleStore.favorites" :key="person.id" v-show="person.isFavorite">
                    <td> <router-link :to="{ name: 'Person', params: { id: person.id } }">
                            <a @click="peopleStore.loadPersonById(person.id)"> {{ person.name }}</a>
                        </router-link></td>
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
        <p v-else>No people in favorites</p>
    </div>
</template>

<style scoped></style>
