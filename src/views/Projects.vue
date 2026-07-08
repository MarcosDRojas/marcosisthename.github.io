<script setup lang="ts">
import { projects } from '../data/projects'
</script>

<template>
  <main class="page">
    <h1 class="page-head">&lt;<span>projects</span>&gt;</h1>
    <p class="page-intro">Things I've built outside of day-to-day work.</p>

    <div class="projects">
      <article v-for="project in projects" :key="project.name" class="project">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
      </article>
    </div>
  </main>
</template>

<style scoped>
.page {
  max-width: 720px;
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

.projects {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project {
  background: var(--sys-panel);
  border: 1px solid var(--sys-panel-border);
  border-left: 2px solid var(--sys-amber);
  border-radius: 4px;
  padding: 1rem 1.1rem;
}

.project h3 {
  font-family: var(--sys-mono);
  font-size: 0.92rem;
  font-weight: 600;
  margin: 0 0 0.4rem;
}

.project p {
  margin: 0;
  font-size: 0.88rem;
  color: var(--sys-text-soft);
  line-height: 1.6;
}
</style>
