# Editado Studio - Next.js

An editorial studio website built with Next.js, crafting meaning, beauty, and long-lasting narratives.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📦 Deployment on Vercel

This project is optimized for Vercel deployment:

1. **Connect to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy to Vercel
   vercel
   ```

2. **Auto-deployment:**
   - Push to main branch for automatic deployment
   - Pull requests create preview deployments

3. **Environment Variables:**
   - Configure any needed environment variables in Vercel dashboard
   - Add `NEXT_PUBLIC_` prefix for client-side variables

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4.0
- **Animations:** Motion (formerly Framer Motion)
- **Typography:** Custom fonts + IBM Plex Mono
- **Deployment:** Vercel (optimized)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/page.tsx     # About page
│   ├── manifesto/page.tsx # Manifesto page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── HeaderNext.tsx     # Navigation header
│   ├── AboutPageNext.tsx  # About page content
│   ├── ManifestoPageNext.tsx # Manifesto content
│   ├── HomePage.tsx       # Home page content
│   ├── ContactModal.tsx   # Contact modal
│   └── ui/               # UI components
├── styles/               # Additional styles & fonts
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies
```

## ✨ Features

- **Responsive Design:** Mobile-first approach with desktop enhancements
- **Smooth Animations:** Motion-powered transitions and micro-interactions
- **Editorial Typography:** Custom font system with IBM Plex Mono
- **Performance Optimized:** Next.js optimizations for Vercel
- **SEO Ready:** Meta tags, Open Graph, and structured data
- **Accessibility:** WCAG compliant navigation and interactions

## 🎨 Design System

### Typography
- **Primary:** Opening Hours Sans (editorial content)
- **Monospace:** IBM Plex Mono (functional elements)
- **Hierarchy:** Consistent sizing and spacing

### Colors
- **Background:** Warm beige tones for different pages
- **Functional Gray:** `#666666` for mono typography
- **Adaptive:** Light/dark mode support

### Animations
- **Transitions:** Editorial-quality easing curves
- **Hover States:** Subtle lift and blur effects
- **Page Transitions:** Unified blur and fade system

## 🔧 Configuration

### Next.js Optimizations
- **Font Loading:** Preloaded custom fonts
- **Image Optimization:** WebP/AVIF support
- **Bundle Optimization:** Optimized imports and tree-shaking

### Vercel Specific
- **Headers:** Optimized caching for fonts
- **Analytics:** Built-in support for Vercel Analytics
- **Edge Runtime:** Compatible with Edge functions

## 📝 Development

### Adding New Pages
1. Create new directory in `app/`
2. Add `page.tsx` with component
3. Update navigation in `HeaderNext.tsx`

### Styling Guidelines
- Use Tailwind utility classes
- Custom utilities defined in `globals.css`
- Maintain typography hierarchy
- Follow animation system patterns

### Performance
- Components are optimized for Core Web Vitals
- Lazy loading for non-critical content
- Efficient bundle splitting

## 🌐 Live Site

Visit the live site: [https://editado-studio.vercel.app](https://editado-studio.vercel.app)

## 📧 Contact

For inquiries about this project or working with Editado Studio, use the contact form on the website.

---

Built with ❤️ using Next.js and deployed on Vercel.