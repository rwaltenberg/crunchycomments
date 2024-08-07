<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <v-card class="pa-4 text-body-2">
    <p>Sample text with <a href="/">link</a>.</p>
    <p>
      <v-btn @click="count++">
        count is {{ count }}
      </v-btn>
    </p>
  </v-card>
</template>
