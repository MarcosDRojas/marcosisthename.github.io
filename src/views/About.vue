<template>
  <div class="about">
    <div class="about-header">
      <h1>About This Project</h1>
      <p class="subtitle">Learn more about this Vue.js web application</p>
    </div>

    <div class="about-content">
      <section class="info-card">
        <h2>🎯 Purpose</h2>
        <p>
          This is a lightweight, single-page Vue.js application designed to showcase 
          modern web development practices. It's built with performance and simplicity in mind, 
          making it perfect for hosting on GitHub Pages.
        </p>
      </section>

      <section class="info-card">
        <h2>🛠️ Tech Stack</h2>
        <ul class="tech-list">
          <li><strong>Vue 3</strong> - The Progressive JavaScript Framework</li>
          <li><strong>Vue Router</strong> - Official router for Vue.js</li>
          <li><strong>Vite</strong> - Next generation frontend tooling</li>
          <li><strong>GitHub Pages</strong> - Free static site hosting</li>
        </ul>
      </section>

      <section class="info-card">
        <h2>⚡ Features</h2>
        <div class="features-list">
          <div class="feature-item">
            <span class="feature-icon">📱</span>
            <span>Fully responsive design</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🚀</span>
            <span>Fast loading and optimized performance</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <span>Modern and clean UI design</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔧</span>
            <span>Easy to customize and extend</span>
          </div>
        </div>
      </section>

      <section class="info-card">
        <h2>🚀 Deployment</h2>
        <p>
          This application is configured for automatic deployment to GitHub Pages. 
          The build process is optimized for static hosting, ensuring fast load times 
          and excellent performance across all devices.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.info-card h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.info-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 0;
}

.tech-list {
  list-style: none;
  padding: 0;
}

.tech-list li {
  padding: 0.5rem 0;
  color: #666;
  border-bottom: 1px solid #eee;
}

.tech-list li:last-child {
  border-bottom: none;
}

.tech-list strong {
  color: #2c3e50;
}

.features-list {
  display: grid;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

.feature-icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .about-header h1 {
    font-size: 2rem;
  }
  
  .info-card {
    padding: 1.5rem;
  }
}
</style>