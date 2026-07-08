<script setup lang="ts">
const tabs = [
  { to: '/', label: 'home' },
  { to: '/resume', label: 'resume' },
  { to: '/projects', label: 'projects' },
  { to: '/photography', label: 'photography' },
]
</script>

<template>
  <nav class="tabbar">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      class="tab"
      active-class="is-active"
      exact-active-class="is-active"
    >
      {{ tab.label }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.tabbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  gap: 1.5rem;
  padding: 0.85rem 1.5rem;
  background: var(--sys-ground);
  border-bottom: 1px solid var(--sys-panel-border);
  font-family: var(--sys-mono);
  font-size: 0.8rem;
}

.tab {
  color: var(--sys-text-soft);
  text-decoration: none;
}

.tab::before {
  content: '[';
  color: var(--sys-panel-border);
}

.tab::after {
  content: ']';
  color: var(--sys-panel-border);
}

.tab:hover {
  color: var(--sys-text);
}

.tab.is-active {
  color: var(--sys-amber);
}
</style>
