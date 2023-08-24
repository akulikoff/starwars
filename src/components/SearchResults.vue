<template>
    <div>
        <input class="search-input" v-model="searchTerm" @input="getResults" placeholder="Введите запрос" />

        <p class="search-results" v-for="(result, index) in results" :key="index">
            <router-link :to="{ name: 'Person', params: { id: result.id } }">
                {{ result.name }}
            </router-link>
        </p>

    </div>
</template>
  
<script lang="ts">
import { ref, watch } from 'vue';
import { usePeopleStore } from '../store/people';
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
        const getResults = async (query: string) => {
            try {
                const response = await fetch(`https://swapi.dev/api/people/?search=${query}`);
                const data = await response.json();
                results.value = data.results.map((apiItem: any) => peopleStore.mapApiDataToPerson(apiItem));
            } catch (error) {
                console.error(error);
            }
        };

        return {
            searchTerm,
            results,
        };
    },
};
</script>
<style scoped></style>