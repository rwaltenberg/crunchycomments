<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div class="card">
    <p>Sample text with <a href="/">link</a>.</p>
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>
