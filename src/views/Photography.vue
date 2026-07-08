<script setup lang="ts">
import { ref } from 'vue'
import WorldMap from '../components/WorldMap.vue'
import PhotoScroll from '../components/PhotoScroll.vue'

const activeLocationId = ref<string | null>(null)

function onLocationClick(id: string) {
  activeLocationId.value = id
}
</script>

<template>
  <main class="page">
    <h1 class="page-head">&lt;<span>photography</span>&gt;</h1>
    <p class="page-intro">Places I've been, and what I saw there.</p>

    <WorldMap @location-click="onLocationClick" />
    <PhotoScroll :active-location-id="activeLocationId" />
  </main>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem 3.5rem;
}

.page-head {
  font-family: var(--sys-mono);
  font-size: 0.9rem;
  font-weight: normal;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sys-text-soft);
  margin-bottom: 0.6rem;
}

.page-head span {
  color: var(--sys-amber);
}

.page-intro {
  font-size: 0.95rem;
  color: var(--sys-text-soft);
  margin-bottom: 2rem;
}
</style>
