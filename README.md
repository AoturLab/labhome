# labhome

Personal homepage of Long Chen — developer, creator, and open source enthusiast.

Built with Next.js (App Router), deployed automatically via GitHub Actions to GitHub Pages.

## 🔗 Links

- **Live Site**: https://aoturlab.github.io/labhome
- **GitHub**: https://github.com/AoturLab/labhome

## 🛠️ Projects

### bilibit

A powerful CLI tool for downloading videos and subtitles from Bilibili.

- GitHub: https://github.com/AoturLab/bilibit
- npm: https://www.npmjs.com/package/bilibit

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, Static Export)
- **Animation**: Framer Motion
- **Deployment**: GitHub Actions → GitHub Pages

## 📦 Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔄 CI/CD

Pushes to `main` automatically trigger a GitHub Actions workflow that:

1. Installs dependencies
2. Runs `next build` (static export to `/out`)
3. Deploys to GitHub Pages

## 🌐 Custom Domain

1. Go to repository **Settings → Pages**
2. Set custom domain
3. Add DNS record (CNAME for subdomain or A records for apex domain)
