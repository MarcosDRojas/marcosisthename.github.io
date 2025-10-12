# My Vue.js Web App

A lightweight, single-page Vue.js application built with Vite and optimized for GitHub Pages deployment.

## 🚀 Features

- **Vue 3** with Composition API
- **Vue Router** for single-page navigation
- **Vite** for fast development and optimized builds
- **Responsive Design** that works on all devices
- **GitHub Pages** ready with automatic deployment
- **Modern UI** with clean, professional styling

## 🛠️ Development

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Getting Started

1. Clone this repository:
```bash
git clone <your-repo-url>
cd MeWebApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages (manual)

## 📦 Project Structure

```
src/
├── components/          # Reusable Vue components
├── views/              # Page components (Home, About)
├── router/             # Vue Router configuration
├── assets/             # Static assets
├── App.vue             # Root component
├── main.js             # Application entry point
└── style.css           # Global styles
```

## 🌐 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at `https://yourusername.github.io/MeWebApp/`

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. Your site will be deployed automatically on each push to main

## 🎨 Customization

### Updating the Base URL

If your repository name is different from "MeWebApp", update the base URL in `vite.config.js`:

```javascript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/'
```

### Adding New Pages

1. Create a new component in `src/views/`
2. Add the route to `src/router/index.js`
3. Add navigation link in `src/App.vue`

### Styling

- Global styles are in `src/style.css`
- Component-specific styles use scoped CSS in each `.vue` file
- The design is fully responsive and uses modern CSS features

## 🔧 Built With

- [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework
- [Vue Router](https://router.vuejs.org/) - Official router for Vue.js
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [GitHub Pages](https://pages.github.com/) - Free static site hosting

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

Built with ❤️ using Vue.js and deployed on GitHub Pages
