<template>
    <PeopleList />
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import PeopleList from '../components/PeopleList.vue'
export default defineComponent({
    name: "/people/:page",
    components: {
        PeopleList,
    },
});
</script>