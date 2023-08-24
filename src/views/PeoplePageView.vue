<template>
    <PeoplePage />
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import PeoplePage from '../components/PeoplePage.vue'
export default defineComponent({
    name: "/",
    components: {
        PeoplePage,
    },
});
</script>