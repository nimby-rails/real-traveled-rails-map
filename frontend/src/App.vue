<script lang="ts" setup>
import { RouterView, RouterLink } from 'vue-router';
</script>
<template>
  <div class="app-container">
    <nav class="navbar">
      <RouterLink :to="{name: 'home'}">Home</RouterLink>
      <RouterLink :to="{name: 'map'}">Map</RouterLink>
    </nav>
    <div class="content">
      <RouterView/>
    </div>
  </div>
</template>
<style lang="scss">
  .app-container {
    min-width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;
    gap: 0px 0px;
    grid-template-areas:
    "Navigation"
    "Content";
  }

  .navbar {
    background: #272727;
    grid-area: Navigation;
    display: flex;
    flex-direction: row;
    gap: .5rem;

    &a {
      color: white;
      font-size: 1.25rem;
      text-display: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .content {
    grid-area: Content;
  }
</style>
