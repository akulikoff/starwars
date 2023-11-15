<template>
    <div>
        <input class="search-input" v-model.trim="searchTerm" type="text" @input="getResults" placeholder="Type here..." />

        <p v-if="results.length > 0 && searchTerm.length > 0" class="search-results" v-for="(result, index) in results"
            :key="index">
            <router-link :to="{ name: 'Person', params: { id: result.id } }">
                {{ result.name }}
            </router-link>
        </p>
        <p v-else-if="searchTerm.length > 0 && results.length === 0">No results found</p>
    </div>
</template>
  
<script lang="ts">
import { ref, watch } from 'vue';
import { usePeopleStore } from '../store/people';
import axios from 'axios';
import AppLoader from './AppLoader.vue';
const peopleStore = usePeopleStore();
export default {
    name: 'SearchComponent',
    setup() {
        const searchTerm = ref('');
        const results = ref([]);

        // Запрос к API при изменении значения в поле ввода
        watch(searchTerm, () => {
            getResults(searchTerm.value);
        });

        // Функция для получения результатов от API
        const getResults = peopleStore.fetchPeopleByName()
        async (query: string) => {
            try {
                peopleStore.loading = true
                const response = await axios.get(`https://swapi.dev/api/people/?search=${query}`);
                const data = response;
                results.value = data.results.map((apiItem: any) => peopleStore.mapApiDataToPerson(apiItem));
            } catch (error) {
                console.error(error);
            }
            finally {
                peopleStore.loading = false
            }
        };

        return {
            searchTerm,
            results,
        };
    },
};
</script>
<style></style>
