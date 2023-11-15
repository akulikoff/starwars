<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { usePeopleStore } from './store/people'
const peopleStore = usePeopleStore()

</script>

<template>
  <div class="container">
    <header class="navbar">
      <nav>
        <RouterLink to="/people">People List</RouterLink> -
        <RouterLink to="/favorites">Favorites - {{ peopleStore.favorites.length }}</RouterLink>
      </nav>
    </header>
  </div>
  <RouterView :key="$route.fullPath" />
</template>

<style>
@font-face {
  font-family: 'Sfgalaxy';
  src: url('./assets/fonts/SfDistantGalaxyAlternate-OE4d.ttf');
}

* {
  margin: 0 auto;
  font-family: 'Sfgalaxy';
  letter-spacing: .1em;
}




button {
  font-family: Sfgalaxy;
  padding: 0.5rem;
}

.container {
  display: flex;
  justify-content: center;

}

tr.table-header {
  font-family: 'Sfgalaxy';
  font-weight: 600;


}

.search-input {
  display: flex;
  justify-self: center;
  border: 1px solid #e7e7e7;
  width: 50%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}



.search-results {
  display: flex;
  text-align: center;
  justify-content: center;
  list-style-type: none;
  padding: .7rem;
  width: 50%;
  margin: 0 auto;
  border: 1px solid #e7e7e7;
  background-color: #e9e9e9;
  cursor: pointer;
}

.search-results:last-child {
  margin-bottom: 20px;
}

.search-results:hover {
  background-color: #f9fafb;
}

ul {
  list-style-type: none;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

li {
  text-align: center;
}

.navbar {
  background-color: lightgreen;
  padding: 1.2rem;
}

a {
  text-decoration: none;
  color: #2c3e50;
}

a:hover {
  text-decoration: none;

}

nav a {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 0 1rem;
}

nav a.router-link-exact-active {
  color: #fefffe;
}


h1 {
  text-align: center;
}

/* Стили таблицы (mytable) */
table.mytable {

  text-decoration: none;
  border-collapse: collapse;
  width: 80%;
  text-align: center;
  border: #2c3e50;

}

table.mytable th {
  font-weight: normal;
  font-size: 14px;
  color: #ffffff;
  background-color: #757575;
}

table.mytable td {
  font-size: 13px;
  color: #757575;
}

table.mytable td,
table.mytable th {
  white-space: pre-wrap;
  padding: 10px 5px;
  line-height: 13px;
  vertical-align: middle;
  border: 1px solid #757575;

}

table.mytable tr:hover {
  background-color: #f9fafb
}

table.mytable tr:hover td {
  color: #757575;
  cursor: default;
}
</style>
