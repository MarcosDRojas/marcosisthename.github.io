<script setup lang="ts">
interface Photo {
  src: string
  alt: string
  caption?: string
}

// Add entries here as photos go into public/images/photography/
const photos: Photo[] = []
</script>

<template>
  <main class="page">
    <h1 class="page-head">&lt;<span>photography</span>&gt;</h1>
    <p class="page-intro">A selection of shots I've taken.</p>

    <div v-if="photos.length" class="gallery">
      <figure v-for="photo in photos" :key="photo.src" class="photo">
        <img :src="photo.src" :alt="photo.alt" loading="lazy" />
        <figcaption v-if="photo.caption">{{ photo.caption }}</figcaption>
      </figure>
    </div>
    <p v-else class="empty-state">gallery coming soon…</p>
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

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.photo {
  margin: 0;
  border: 1px solid var(--sys-panel-border);
  border-radius: 4px;
  overflow: hidden;
  background: var(--sys-panel);
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  aspect-ratio: 4 / 3;
}

.photo figcaption {
  padding: 0.5rem 0.7rem;
  font-family: var(--sys-mono);
  font-size: 0.72rem;
  color: var(--sys-text-soft);
}

.empty-state {
  font-family: var(--sys-mono);
  font-size: 0.82rem;
  color: var(--sys-text-soft);
}
</style>
