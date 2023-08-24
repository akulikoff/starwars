<template>
    <h1>This is a Favorite List</h1>
    <FavoriteList />
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

import FavoriteList from '../components/FavoriteList.vue'

export default defineComponent({
    name: "Favorites",
    components: {
        FavoriteList,
    },
});
</script>