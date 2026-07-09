<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { allPhotos, photoLocations, type LocationPhoto } from '../data/photoLocations'

const props = defineProps<{
  activeLocationId?: string | null
}>()

const emit = defineEmits<{
  clear: []
}>()

const activeLocationName = computed(
  () => photoLocations.find((l) => l.id === props.activeLocationId)?.name ?? null,
)

const photos = computed(() =>
  props.activeLocationId ? allPhotos.filter((p) => p.locationId === props.activeLocationId) : allPhotos,
)

type Photo = (typeof allPhotos)[number]

const lightboxPhoto = ref<Photo | null>(null)

function openLightbox(photo: Photo) {
  lightboxPhoto.value = photo
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxPhoto.value = null
  document.body.style.overflow = ''
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeLightbox()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

function captionFor(photo: LocationPhoto & { locationName: string }) {
  return photo.caption ?? photo.locationName
}
</script>

<template>
  <div class="scroll-wrap">
    <div v-if="activeLocationId" class="scroll-filter">
      <span>Showing <strong>{{ activeLocationName }}</strong></span>
      <button type="button" class="clear-filter" @click="emit('clear')">show all</button>
    </div>

    <p v-if="!photos.length" class="empty-state">
      {{ activeLocationId ? `no photos yet from ${activeLocationName}` : 'no photos yet' }}
    </p>
    <div v-else class="scroll">
      <figure
        v-for="(photo, i) in photos"
        :key="`${photo.locationId}-${i}`"
        class="photo"
        tabindex="0"
        role="button"
        :aria-label="`View larger photo: ${captionFor(photo)}`"
        @click="openLightbox(photo)"
        @keydown.enter="openLightbox(photo)"
      >
        <img :src="photo.src" :alt="photo.alt" loading="lazy" />
        <figcaption>{{ captionFor(photo) }}</figcaption>
      </figure>
    </div>

    <Teleport to="body">
      <div v-if="lightboxPhoto" class="lightbox" role="dialog" aria-modal="true" @click.self="closeLightbox">
        <button type="button" class="lightbox-close" aria-label="Close" @click="closeLightbox">×</button>
        <img :src="lightboxPhoto.src" :alt="lightboxPhoto.alt" class="lightbox-img" />
        <p class="lightbox-caption">{{ captionFor(lightboxPhoto) }}</p>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.scroll-wrap {
  margin-top: 1.5rem;
}

.scroll-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-family: var(--sys-mono);
  font-size: 0.78rem;
  color: var(--sys-text-soft);
}

.scroll-filter strong {
  color: var(--sys-amber);
  font-weight: 600;
}

.clear-filter {
  border: 1px solid var(--sys-panel-border);
  border-radius: 4px;
  background: var(--sys-ground);
  color: var(--sys-text);
  font-family: var(--sys-mono);
  font-size: 0.72rem;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}

.clear-filter:hover,
.clear-filter:focus-visible {
  border-color: var(--sys-amber);
  color: var(--sys-amber);
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
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.photo:hover,
.photo:focus-visible {
  border-color: var(--sys-amber);
  outline: none;
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

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(6, 10, 14, 0.92);
}

.lightbox-img {
  max-width: 100%;
  max-height: 82vh;
  object-fit: contain;
  border-radius: 4px;
}

.lightbox-caption {
  margin: 0;
  font-family: var(--sys-mono);
  font-size: 0.8rem;
  color: var(--sys-text-soft);
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--sys-panel-border);
  background: var(--sys-ground);
  color: var(--sys-text);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.lightbox-close:hover,
.lightbox-close:focus-visible {
  border-color: var(--sys-amber);
  color: var(--sys-amber);
}
</style>
