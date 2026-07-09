import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/Landing.vue'),
      meta: {
        title: 'Marcos Rojas — Software Engineer II',
        description:
          'Marcos Rojas is a back end software engineer with 6+ years of experience building C#/.NET applications in the financial industry. Based in Durham, NC.',
      },
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('../views/Resume.vue'),
      meta: {
        title: 'Resume — Marcos Rojas, Software Engineer II',
        description:
          'Back end software engineer with 6+ years of experience in C#/.NET, building services that have served millions of users during market hours in the financial industry.',
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Projects.vue'),
      meta: {
        title: 'Projects — Marcos Rojas',
        description:
          'Side projects by Marcos Rojas: a blockchain-inspired ledger, an internal permissions tool, and a Java/Spring Boot fitness tracking API.',
      },
    },
    {
      path: '/photography',
      name: 'photography',
      component: () => import('../views/Photography.vue'),
      meta: {
        title: 'Photography — Marcos Rojas',
        description: "Places I've been, and what I saw there — a photo map from Marcos Rojas.",
      },
    },
  ],
})

router.afterEach((to) => {
  const title = (to.meta.title as string | undefined) ?? 'Marcos Rojas'
  document.title = title

  const description = to.meta.description as string | undefined
  if (description) {
    document
      .querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]')
      .forEach((el) => el.setAttribute('content', description))
  }

  document
    .querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]')
    .forEach((el) => el.setAttribute('content', title))

  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    canonical.setAttribute('href', `https://marcosdrojas.github.io/marcosisthename.github.io${to.path}`)
  }
})

export default router
