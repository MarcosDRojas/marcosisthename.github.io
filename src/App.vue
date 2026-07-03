<script setup lang="ts">
const github = 'https://github.com/MarcosDRojas'
const linkedin = 'https://www.linkedin.com/in/marcosdanielrojas/'
const email = 'marcos.rojas24@gmail.com'

const experience = [
  {
    role: 'Software Engineer II',
    company: 'Charles Schwab',
    location: 'Raleigh, NC',
    period: 'April 2023 — Present',
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
    period: 'June 2020 — April 2023',
    bullets: [],
  },
]

const skills = [
  { label: 'Languages', items: 'C#, .NET, SQL' },
  { label: 'Databases', items: 'MongoDB, Aerospike, PostgreSQL' },
  { label: 'Cloud & DevOps', items: 'PCF, GitHub CI/CD, Splunk' },
  { label: 'Tools', items: 'Visual Studio, Rider, VS Code, Git' },
  { label: 'Frameworks', items: 'Blazor' },
  { label: 'AI / Dev Productivity', items: 'MCP Servers, AI Agents, GitHub Copilot' },
]

const projects = [
  {
    name: 'Blockchain Ledger',
    description:
      'Built a blockchain-inspired ledger system to track peer-to-peer money transfers, focusing on immutability, hashing, and transaction validation.',
  },
  {
    name: 'Lineage UI',
    description:
      'Developed a Blazor-based internal tool to manage service account permissions across lower and production environments, improving access visibility and security auditing.',
  },
]
</script>

<template>
  <main class="page">
    <section class="hero">
      <img class="avatar" src="/images/profile.jpg" alt="Marcos Rojas" width="112" height="112" />
      <h1>Marcos Rojas</h1>
      <p class="title">Software Engineer II</p>
      <p class="bio">
        Back end software engineer with 5+ years of experience designing, implementing, and
        testing applications across the stack. Expertise in C#/.NET development in the financial
        space.
      </p>

      <nav class="socials">
        <a :href="github" target="_blank" rel="noopener">GitHub</a>
        <a :href="linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <a :href="`mailto:${email}`">Email</a>
      </nav>
    </section>

    <section class="section">
      <h2>Experience</h2>
      <div v-for="job in experience" :key="job.period" class="job">
        <div class="job-header">
          <div>
            <span class="job-role">{{ job.role }}</span>
            <span class="job-company"> · {{ job.company }}</span>
          </div>
          <span class="job-period">{{ job.period }}</span>
        </div>
        <p class="job-location">{{ job.location }}</p>
        <ul v-if="job.bullets.length" class="job-bullets">
          <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <h2>Skills</h2>
      <dl class="skills">
        <template v-for="skill in skills" :key="skill.label">
          <dt>{{ skill.label }}</dt>
          <dd>{{ skill.items }}</dd>
        </template>
      </dl>
    </section>

    <section class="section">
      <h2>Projects</h2>
      <div class="projects">
        <article v-for="project in projects" :key="project.name" class="project">
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>Education</h2>
      <p class="edu-school">North Carolina State University, Raleigh NC</p>
      <p class="edu-detail">Bachelor of Science in Computer Science · 2017 — 2020 · GPA 3.7/4.0</p>
    </section>

    <footer class="footer">
      <nav class="socials">
        <a :href="github" target="_blank" rel="noopener">GitHub</a>
        <a :href="linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <a :href="`mailto:${email}`">Email</a>
      </nav>
      <p class="copyright">Marcos Rojas · Durham, NC</p>
    </footer>
  </main>
</template>

<style scoped>
.page {
  max-width: 640px;
  margin: 0 auto;
  padding: 4rem 1.5rem 3rem;
}

.hero {
  text-align: center;
  margin-bottom: 3.5rem;
}

.avatar {
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.25rem;
}

.hero h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.25rem;
}

.title {
  font-size: 1rem;
  color: var(--color-text-soft);
  margin-bottom: 1rem;
}

.bio {
  max-width: 480px;
  margin: 0 auto 1.5rem;
  color: var(--color-text);
}

.socials {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
}

.socials a {
  color: var(--color-heading);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1px;
  transition: border-color 0.2s;
}

.socials a:hover {
  border-color: var(--color-heading);
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-soft);
  margin-bottom: 1.25rem;
}

.job {
  margin-bottom: 2rem;
}

.job:last-child {
  margin-bottom: 0;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.job-role {
  font-weight: 600;
  color: var(--color-heading);
}

.job-company {
  color: var(--color-text-soft);
}

.job-period {
  font-size: 0.85rem;
  color: var(--color-text-soft);
  white-space: nowrap;
}

.job-location {
  font-size: 0.85rem;
  color: var(--color-text-soft);
  margin-bottom: 0.5rem;
}

.job-bullets {
  padding-left: 1.1rem;
}

.job-bullets li {
  margin-bottom: 0.4rem;
}

.job-bullets li:last-child {
  margin-bottom: 0;
}

.skills {
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 1.5rem;
  row-gap: 0.6rem;
}

.skills dt {
  font-weight: 600;
  color: var(--color-heading);
  white-space: nowrap;
}

.skills dd {
  margin: 0;
  color: var(--color-text);
}

.projects {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.project h3 {
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.25rem;
}

.edu-school {
  font-weight: 600;
  color: var(--color-heading);
}

.edu-detail {
  font-size: 0.9rem;
  color: var(--color-text-soft);
}

.footer {
  text-align: center;
  padding-top: 2.5rem;
  border-top: 1px solid var(--color-border);
}

.copyright {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--color-text-soft);
}
</style>
