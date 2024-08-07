<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue';
import logoIcon from '@/assets/icon.svg';
</script>

<template>
  <v-app theme="light">
    <v-main>
      <v-container class="d-flex align-center justify-center">
        <h1 class="logo d-flex align-center ga-2 cursor-default">
          <v-img :src="logoIcon" height="2em" width="2em" alt="CrunchyComments logo" />
          CrunchyComments
        </h1>
      </v-container>
      <v-container>
        <HelloWorld />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.logo {
  transition: filter .3s;
  will-change: filter;

  &:hover {
    filter: drop-shadow(0 0 1em #ff6b00e0);
  }

  img {
    height: 2em;
  }
}
</style>
