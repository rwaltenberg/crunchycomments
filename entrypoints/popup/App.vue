<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
  <h1 class="logo">
    <img src="@/assets/icon.svg" alt="CrunchyComments logo" />
    CrunchyComments
  </h1>
  <HelloWorld />
</template>

<style lang="scss" scoped>
.logo {
  align-items: center;
  cursor: default;
  display: flex;
  font-size: 1.5rem;
  gap: 0.5em;
  padding: 1.5em;
  transition: filter 300ms;
  will-change: filter;

  img {
    height: 2em;
  }
}

.logo:hover {
  filter: drop-shadow(0 0 1em #ff6b00e0);
}
</style>
