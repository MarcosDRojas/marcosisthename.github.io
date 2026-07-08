<script setup lang="ts">
import { nextTick, watch } from 'vue'
import { allPhotos } from '../data/photoLocations'

const props = defineProps<{
  activeLocationId?: string | null
}>()

watch(
  () => props.activeLocationId,
  async (id) => {
    if (!id) return
    await nextTick()
    document.getElementById(`photo-loc-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  },
)
</script>

<template>
  <div class="scroll-wrap">
    <p v-if="!allPhotos.length" class="empty-state">no photos yet</p>
    <div v-else class="scroll">
      <figure
        v-for="(photo, i) in allPhotos"
        :id="`photo-loc-${photo.locationId}`"
        :key="`${photo.locationId}-${i}`"
        class="photo"
        :class="{ 'is-active': photo.locationId === activeLocationId }"
      >
        <img :src="photo.src" :alt="photo.alt" loading="lazy" />
        <figcaption>{{ photo.caption ?? photo.locationName }}</figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.scroll-wrap {
  margin-top: 1.5rem;
}

.empty-state {
  font-family: var(--sys-mono);
  font-size: 0.82rem;
  color: var(--sys-text-soft);
}

.scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x proximity;
}

.photo {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 220px;
  margin: 0;
  border: 1px solid var(--sys-panel-border);
  border-radius: 4px;
  overflow: hidden;
  background: var(--sys-panel);
  transition: border-color 0.15s ease;
}

.photo.is-active {
  border-color: var(--sys-amber);
}

.photo img {
  width: 100%;
  height: 165px;
  object-fit: cover;
  display: block;
}

.photo figcaption {
  padding: 0.5rem 0.7rem;
  font-family: var(--sys-mono);
  font-size: 0.72rem;
  color: var(--sys-text-soft);
}
</style>
