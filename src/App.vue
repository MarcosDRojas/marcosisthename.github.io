<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const github = 'https://github.com/MarcosDRojas'
const linkedin = 'https://www.linkedin.com/in/marcosdanielrojas/'
const email = 'marcos.rojas24@gmail.com'
const githubUsername = 'MarcosDRojas'

const careerStart = new Date(2020, 5, 1) // Software Engineer I started June 2020

const yearsExperience = computed(() => {
  const now = new Date()
  let years = now.getFullYear() - careerStart.getFullYear()
  const hadAnniversary =
    now.getMonth() > careerStart.getMonth() ||
    (now.getMonth() === careerStart.getMonth() && now.getDate() >= careerStart.getDate())
  if (!hadAnniversary) years -= 1
  return years
})

const stats = computed(() => [
  { value: `${yearsExperience.value}+`, label: 'years experience' },
  { value: '2', label: 'platform migrations led' },
  { value: '1000s', label: 'users served at market hours' },
])

const nowItems = [
  {
    label: 'building',
    text: 'A Time-Weighted Return (TWR) explainer — breaking down how investment performance is measured independent of cash flow timing.',
  },
  {
    label: 'learning',
    text: 'Agentic workflows — chaining AI agents and tools together to automate multi-step engineering tasks.',
  },
  {
    label: 'focus',
    text: 'Applying AI to software engineering — agents, LLM tooling, and where they actually help day-to-day.',
  },
]

interface ContributionDay {
  date: string
  count: number
  level: number
}

const activityLoading = ref(true)
const activityError = ref(false)
const totalContributions = ref(0)
const days = ref<ContributionDay[]>([])

const PAD: ContributionDay = { date: '', count: -1, level: -1 }

const weeks = computed(() => {
  const firstDay = days.value[0]
  if (!firstDay) return []
  const result: ContributionDay[][] = []
  let week: ContributionDay[] = []
  const firstWeekday = new Date(`${firstDay.date}T00:00:00`).getDay()
  for (let i = 0; i < firstWeekday; i++) week.push(PAD)
  for (const day of days.value) {
    week.push(day)
    if (week.length === 7) {
      result.push(week)
      week = []
    }
  }
  if (week.length) result.push(week)
  return result
})

const monthLabels = computed(() =>
  weeks.value.map((week) => {
    const firstReal = week.find((d) => d.count >= 0)
    if (!firstReal) return ''
    const date = new Date(`${firstReal.date}T00:00:00`)
    return date.getDate() <= 7 ? date.toLocaleDateString('en-US', { month: 'short' }) : ''
  }),
)

const heatColors = ['var(--heat-0)', 'var(--heat-1)', 'var(--heat-2)', 'var(--heat-3)', 'var(--heat-4)']
const levelColor = (level: number) => heatColors[level] ?? 'transparent'

function tooltipFor(day: ContributionDay) {
  if (day.count < 0) return ''
  const date = new Date(`${day.date}T00:00:00`)
  const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const contribLabel = day.count === 1 ? '1 contribution' : `${day.count} contributions`
  return `${contribLabel} on ${label}`
}

onMounted(async () => {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`)
    if (!res.ok) throw new Error('request failed')
    const data = await res.json()
    days.value = data.contributions
    totalContributions.value = Object.values(data.total as Record<string, number>).reduce(
      (sum, n) => sum + n,
      0,
    )
  } catch {
    activityError.value = true
  } finally {
    activityLoading.value = false
  }
})

const experience = [
  {
    role: 'Software Engineer II',
    company: 'Charles Schwab',
    location: 'Raleigh, NC',
    period: '2023-04 → present',
    bullets: [
      'Improved code quality by using test-driven development and SOLID principles.',
      'Led migration of multiple repositories from Bitbucket to GitHub, driving adoption of modern CI/CD workflows and improving team collaboration practices.',
      'Increased the scalability of our applications by migrating from Windows to Pivotal Cloud Foundry based applications to help scale our systems for millions of users.',
      'Designed and implemented multiple endpoints in C# used by thousands of users for retrieving financial data during market hours.',
      'Ensured optimal customer experience by addressing bugs in production affecting their experience on the application.',
      'Led design reviews to adhere to API guidelines set by the architecture team.',
      'Contributed to our data migration from MongoDB to Aerospike.',
      'Participated in on-call rotation to validate application releases.',
      'Assessed AI agent use cases and coached team members on effective GitHub Copilot usage, improving development speed, code quality, and accuracy.',
      'Built and maintained Splunk monitoring dashboards and production queries, strengthening observability and reducing operational risk.',
      'Resolved critical UI performance bottlenecks by introducing batch-based scan queries, eliminating inefficient record-by-record fetching and significantly improving response times.',
    ],
  },
  {
    role: 'Software Engineer I',
    company: 'Charles Schwab',
    location: 'Raleigh, NC',
    period: '2020-06 → 2023-04',
    bullets: [],
  },
]

const skillGroups = [
  { label: 'Languages', items: ['C#', '.NET', 'SQL'] },
  { label: 'Databases', items: ['MongoDB', 'Aerospike', 'PostgreSQL'] },
  { label: 'Cloud & DevOps', items: ['PCF', 'GitHub CI/CD', 'Splunk'] },
  { label: 'Tools', items: ['Visual Studio', 'Rider', 'VS Code', 'Git'] },
  { label: 'Frameworks', items: ['Blazor'] },
  { label: 'AI / Dev Productivity', items: ['MCP Servers', 'AI Agents', 'GitHub Copilot'] },
]

const projects = [
  {
    name: 'blockchain-ledger',
    description:
      'Built a blockchain-inspired ledger system to track peer-to-peer money transfers, focusing on immutability, hashing, and transaction validation.',
  },
  {
    name: 'lineage-ui',
    description:
      'Developed a Blazor-based internal tool to manage service account permissions across lower and production environments, improving access visibility and security auditing.',
  },
]
</script>

<template>
  <div class="shell">
    <div class="feed">
      <img class="feed-img" src="/images/profile.jpg" alt="Marcos Rojas" />
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
        Back end software engineer with {{ yearsExperience }}+ years of experience designing,
        implementing, and testing applications across the stack. Expertise in C#/.NET development
        in the financial space.
      </p>

      <div class="stats">
        <div v-for="stat in stats" :key="stat.label" class="stat">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>

      <div class="content-columns">
        <aside class="content-side">
          <section class="section">
            <h2 class="section-head">&lt;<span>now</span>&gt;</h2>
            <ul class="now-list">
              <li v-for="item in nowItems" :key="item.label">
                <span class="now-label">{{ item.label }}</span>
                <span class="now-text">{{ item.text }}</span>
              </li>
            </ul>
          </section>

          <section class="section">
            <h2 class="section-head">&lt;<span>skills</span>&gt;</h2>
            <div v-for="group in skillGroups" :key="group.label" class="chip-group">
              <span class="chip-label">{{ group.label }}</span>
              <div class="chip-row">
                <span v-for="item in group.items" :key="item" class="chip">{{ item }}</span>
              </div>
            </div>
          </section>
        </aside>

        <div class="content-main">
          <section class="section">
            <h2 class="section-head">&lt;<span>experience</span>_log&gt;</h2>
            <div class="log">
              <div v-for="job in experience" :key="job.period" class="entry">
                <p class="timestamp">{{ job.period }}</p>
                <p class="role">{{ job.role }} <span class="company">· {{ job.company }}</span></p>
                <p class="location">{{ job.location }}</p>
                <ul v-if="job.bullets.length" class="bullets">
                  <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="section">
            <h2 class="section-head">&lt;<span>activity</span>_feed&gt;</h2>
            <p v-if="activityLoading" class="activity-status">loading contribution history…</p>
            <p v-else-if="activityError" class="activity-status">activity feed unavailable</p>
            <template v-else>
              <p class="activity-total">{{ totalContributions }} contributions in the last year</p>
              <div class="heatmap">
                <div class="heatmap-months">
                  <span v-for="(label, wi) in monthLabels" :key="wi" class="heatmap-month">{{ label }}</span>
                </div>
                <div
                  class="heatmap-grid"
                  role="img"
                  :aria-label="`GitHub contribution heatmap, ${totalContributions} contributions in the last year`"
                >
                  <div v-for="(week, wi) in weeks" :key="wi" class="heatmap-week">
                    <div
                      v-for="(day, di) in week"
                      :key="di"
                      class="heatmap-cell"
                      :class="{ 'is-pad': day.count < 0 }"
                      :style="{ background: day.count < 0 ? 'transparent' : levelColor(day.level) }"
                      :data-tooltip="tooltipFor(day)"
                      :tabindex="day.count < 0 ? -1 : 0"
                      :aria-hidden="day.count < 0"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="heatmap-legend">
                <span>Less</span>
                <span
                  v-for="level in [0, 1, 2, 3, 4]"
                  :key="level"
                  class="legend-swatch"
                  :style="{ background: levelColor(level) }"
                ></span>
                <span>More</span>
              </div>
            </template>
          </section>

          <section class="section">
            <h2 class="section-head">&lt;<span>projects</span>&gt;</h2>
            <div class="projects">
              <article v-for="project in projects" :key="project.name" class="project">
                <h3>{{ project.name }}</h3>
                <p>{{ project.description }}</p>
              </article>
            </div>
          </section>

          <section class="section">
            <h2 class="section-head">&lt;<span>education</span>&gt;</h2>
            <p class="edu-school">North Carolina State University</p>
            <p class="edu-detail">B.S. Computer Science · 2017 — 2020 · GPA 3.7/4.0</p>
          </section>

          <footer class="footer">
            <nav class="footer-socials">
              <a :href="github" target="_blank" rel="noopener">github</a>
              <a :href="linkedin" target="_blank" rel="noopener">linkedin</a>
              <a :href="`mailto:${email}`">email</a>
            </nav>
            <p class="copy">marcos.rojas24 — durham, nc</p>
          </footer>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: minmax(300px, 38%) 1fr;
  min-height: 100vh;
}

/* ---------------- left: photo / feed panel ---------------- */
.feed {
  position: sticky;
  top: 0;
  height: 100vh;
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

/* ---------------- right: content panel ---------------- */
.content {
  padding: 3rem 2.25rem 3.5rem;
}

.bio {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--sys-text-soft);
  margin: 0 0 1.75rem;
  max-width: 640px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--sys-panel-border);
  border: 1px solid var(--sys-panel-border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  max-width: 640px;
}

/* content-columns: side (now/activity) stacks above main by default;
   becomes a right-hand rail next to main once there's enough width to fit both */
.content-columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  max-width: 640px;
}

.content-side {
  display: contents;
}

@media (min-width: 1320px) {
  .content-columns {
    max-width: 980px;
    grid-template-columns: minmax(0, 640px) minmax(240px, 300px);
    align-items: start;
  }

  .content-main {
    order: 1;
  }

  .content-side {
    display: block;
    order: 2;
  }
}

.stat {
  background: var(--sys-panel);
  padding: 0.9rem 0.9rem 0.8rem;
  border-top: 2px solid var(--sys-amber);
}

.stat-value {
  font-family: var(--sys-mono);
  font-size: 1.3rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--sys-text);
  display: block;
}

.stat-label {
  font-size: 0.68rem;
  letter-spacing: 0.03em;
  color: var(--sys-text-soft);
}

.section {
  margin-bottom: 2.75rem;
}

.section-head {
  font-family: var(--sys-mono);
  font-size: 0.72rem;
  font-weight: normal;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sys-text-soft);
  margin-bottom: 1.4rem;
}

.section-head span {
  color: var(--sys-amber);
}

.log {
  position: relative;
  padding-left: 1.5rem;
}

.log::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 6px;
  bottom: 6px;
  width: 1px;
  background: var(--sys-panel-border);
}

.entry {
  position: relative;
  padding-bottom: 1.75rem;
}

.entry:last-child {
  padding-bottom: 0;
}

.entry::before {
  content: '';
  position: absolute;
  left: -1.5rem;
  top: 4px;
  width: 9px;
  height: 9px;
  background: var(--sys-ground);
  border: 2px solid var(--sys-amber);
  border-radius: 2px;
}

.timestamp {
  font-family: var(--sys-mono);
  font-size: 0.72rem;
  color: var(--sys-amber);
  font-variant-numeric: tabular-nums;
  margin-bottom: 0.3rem;
}

.role {
  font-weight: 600;
  font-size: 0.98rem;
}

.company {
  color: var(--sys-text-soft);
  font-weight: 400;
}

.location {
  font-family: var(--sys-mono);
  font-size: 0.7rem;
  color: var(--sys-text-soft);
  margin: 0.2rem 0 0.7rem;
}

.bullets {
  margin: 0;
  padding-left: 1.1rem;
}

.bullets li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  font-size: 0.9rem;
  color: var(--sys-text);
}

.bullets li::marker {
  color: var(--sys-amber);
}

.bullets li:last-child {
  margin-bottom: 0;
}

.chip-group {
  margin-bottom: 1rem;
}

.chip-group:last-child {
  margin-bottom: 0;
}

.chip-label {
  font-family: var(--sys-mono);
  font-size: 0.66rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--sys-text-soft);
  display: block;
  margin-bottom: 0.5rem;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  font-family: var(--sys-mono);
  font-size: 0.78rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--sys-panel-border);
  border-radius: 4px;
  background: var(--sys-panel);
  color: var(--sys-text);
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

.edu-school {
  font-weight: 600;
  font-size: 0.95rem;
}

.edu-detail {
  font-family: var(--sys-mono);
  font-size: 0.78rem;
  color: var(--sys-text-soft);
  margin-top: 0.25rem;
}

.footer {
  padding-top: 2rem;
  border-top: 1px solid var(--sys-panel-border);
}

.footer-socials {
  display: flex;
  gap: 1.1rem;
  font-family: var(--sys-mono);
  font-size: 0.75rem;
  margin-bottom: 0.9rem;
}

.footer-socials a {
  color: var(--sys-amber);
  text-decoration: none;
}

.footer-socials a::before {
  content: '[';
  color: var(--sys-text-soft);
}

.footer-socials a::after {
  content: ']';
  color: var(--sys-text-soft);
}

.footer p.copy {
  font-family: var(--sys-mono);
  font-size: 0.68rem;
  color: var(--sys-text-soft);
  margin: 0;
}

/* ---------------- responsive: stack on narrow screens ---------------- */
@media (max-width: 860px) {
  .shell {
    grid-template-columns: 1fr;
  }

  .feed {
    position: relative;
    height: 62vh;
    min-height: 420px;
    border-right: none;
    border-bottom: 1px solid var(--sys-panel-border);
  }

  .content {
    padding: 2.25rem 1.35rem 3rem;
    max-width: none;
  }

  .stats {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .feed-name {
    font-size: 1.4rem;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}

/* ---------------- now panel ---------------- */
.now-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.now-list li {
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  background: var(--sys-panel);
  border: 1px solid var(--sys-panel-border);
  border-radius: 4px;
  padding: 0.7rem 0.9rem;
}

.now-label {
  font-family: var(--sys-mono);
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--sys-amber);
  flex-shrink: 0;
  width: 4.5rem;
}

.now-text {
  font-size: 0.88rem;
  color: var(--sys-text-soft);
}

/* ---------------- activity feed ---------------- */
.activity-status {
  font-family: var(--sys-mono);
  font-size: 0.82rem;
  color: var(--sys-text-soft);
}

.activity-total {
  font-size: 0.85rem;
  color: var(--sys-text-soft);
  margin-bottom: 0.85rem;
}

.heatmap {
  width: 100%;
}

.heatmap-months {
  display: flex;
  gap: 2px;
  margin-bottom: 0.3rem;
}

.heatmap-month {
  flex: 1 1 0;
  min-width: 0;
  font-family: var(--sys-mono);
  font-size: 0.6rem;
  color: var(--sys-text-soft);
  overflow: visible;
  white-space: nowrap;
}

.heatmap-grid {
  display: flex;
  gap: 2px;
  width: 100%;
}

.heatmap-week {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 0;
  gap: 2px;
}

.heatmap-cell {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 2px;
  background: var(--heat-0);
  position: relative;
}

.heatmap-cell.is-pad {
  background: transparent !important;
}

.heatmap-cell:not(.is-pad):hover,
.heatmap-cell:not(.is-pad):focus-visible {
  outline: 1px solid var(--sys-text);
  outline-offset: 1px;
}

.heatmap-cell:not(.is-pad)::after {
  content: attr(data-tooltip);
  display: none;
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--sys-panel);
  border: 1px solid var(--sys-panel-border);
  color: var(--sys-text);
  font-family: var(--sys-mono);
  font-size: 0.68rem;
  white-space: nowrap;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  pointer-events: none;
  z-index: 1;
}

.heatmap-cell:not(.is-pad):hover::after,
.heatmap-cell:not(.is-pad):focus-visible::after {
  display: block;
}

.heatmap-legend {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.6rem;
  font-family: var(--sys-mono);
  font-size: 0.68rem;
  color: var(--sys-text-soft);
}

.legend-swatch {
  width: 11px;
  height: 11px;
  border-radius: 2px;
}
</style>
