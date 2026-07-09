<script setup lang="ts">
const profileImg = `${import.meta.env.BASE_URL}images/profile.jpg`

const github = 'https://github.com/MarcosDRojas'
const linkedin = 'https://www.linkedin.com/in/marcosdanielrojas/'
const email = 'marcos.rojas24@gmail.com'

const destinations = [
  {
    to: '/resume',
    label: 'resume',
    text: 'Experience, skills, and education — the full CV.',
  },
  {
    to: '/projects',
    label: 'projects',
    text: 'Things I build outside of day-to-day work.',
  },
  {
    to: '/photography',
    label: 'photography',
    text: 'A selection of shots I\'ve taken.',
  },
]
</script>

<template>
  <div class="shell">
    <div class="feed">
      <img class="feed-img" :src="profileImg" alt="Marcos Rojas" />
      <div class="feed-vignette"></div>
      <div class="feed-card">
        <p class="feed-prompt"><span class="dot"></span> status: open to opportunities</p>
        <h1 class="feed-name">marcos<span class="caret">@</span>rojas</h1>
        <p class="feed-title">Software Engineer II</p>
        <nav class="feed-socials">
          <a :href="github" target="_blank" rel="noopener">github</a>
          <a :href="linkedin" target="_blank" rel="noopener">linkedin</a>
          <a :href="`mailto:${email}`">email</a>
        </nav>
      </div>
    </div>

    <main class="content">
      <p class="bio">
        I'm a software engineer based in Durham, NC, building applications in the
        financial space. Outside of work I tinker with side projects, take photos and workout — pick a
        section below to dig in.
      </p>

      <div class="destinations">
        <RouterLink v-for="dest in destinations" :key="dest.to" :to="dest.to" class="dest-card">
          <span class="dest-label">&gt; {{ dest.label }}</span>
          <span class="dest-text">{{ dest.text }}</span>
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: minmax(300px, 38%) 1fr;
  min-height: calc(100vh - 52px);
  max-width: 1600px;
  margin: 0 auto;
}

.feed {
  position: sticky;
  top: 52px;
  height: calc(100vh - 52px);
  overflow: hidden;
  background: #000;
  border-right: 1px solid var(--sys-panel-border);
}

.feed-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  filter: grayscale(0.45) contrast(1.08) brightness(0.88) saturate(1.05);
}

.feed-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(6, 10, 14, 0.95) 0%,
    rgba(6, 10, 14, 0.15) 42%,
    rgba(6, 10, 14, 0.35) 100%
  );
  pointer-events: none;
}

.feed-card {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.75rem 1.5rem 1.75rem;
}

.feed-prompt {
  font-family: var(--sys-mono);
  font-size: 0.72rem;
  color: var(--sys-good);
  margin: 0 0 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.feed-prompt .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sys-good);
  flex-shrink: 0;
}

.feed-name {
  font-family: var(--sys-mono);
  font-size: 1.7rem;
  font-weight: 600;
  margin: 0 0 0.3rem;
  text-wrap: balance;
  color: #fff;
}

.feed-name .caret {
  color: var(--sys-amber);
}

.feed-title {
  font-size: 0.92rem;
  color: var(--sys-text-soft);
  margin: 0 0 1.1rem;
}

.feed-socials {
  display: flex;
  gap: 1.1rem;
  font-family: var(--sys-mono);
  font-size: 0.75rem;
}

.feed-socials a {
  color: var(--sys-amber);
  text-decoration: none;
}

.feed-socials a:hover {
  text-decoration: underline;
}

.feed-socials a::before {
  content: '[';
  color: var(--sys-text-soft);
}

.feed-socials a::after {
  content: ']';
  color: var(--sys-text-soft);
}

.content {
  padding: 3rem 2.25rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bio {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--sys-text-soft);
  margin: 0 0 2rem;
  max-width: 520px;
}

.destinations {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  max-width: 520px;
}

.dest-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.1rem;
  background: var(--sys-panel);
  border: 1px solid var(--sys-panel-border);
  border-left: 2px solid var(--sys-amber);
  border-radius: 4px;
  text-decoration: none;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.dest-card:hover {
  border-color: var(--sys-amber);
  background: var(--sys-amber-dim);
}

.dest-label {
  font-family: var(--sys-mono);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--sys-amber);
}

.dest-text {
  font-size: 0.88rem;
  color: var(--sys-text-soft);
}

@media (max-width: 860px) {
  .shell {
    grid-template-columns: 1fr;
  }

  .feed {
    position: relative;
    top: 0;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 4;
    max-height: 70vh;
    border-right: none;
    border-bottom: 1px solid var(--sys-panel-border);
  }

  .content {
    padding: 2.25rem 1.35rem 3rem;
  }
}

@media (max-width: 480px) {
  .feed-name {
    font-size: 1.4rem;
  }
}
</style>
