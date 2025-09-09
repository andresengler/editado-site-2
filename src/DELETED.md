# ARCHIVOS ELIMINADOS - MIGRACIÓN NEXT.JS

## ✅ Archivos Legacy de Vite Eliminados:

### Sistema de Routing Manual (reemplazado por Next.js App Router)
- ❌ App.tsx - Sistema de routing manual de Vite
- ❌ main.tsx - Entry point de Vite  
- ❌ index.html - Template de Vite
- ❌ vite.config.ts - Configuración de Vite

### Configuración Legacy
- ❌ tailwind.config.js - Tailwind v4 usa solo CSS

### Componentes Experimentales/Duplicados
- ❌ AboutPageAlternatives.tsx
- ❌ AboutPageNext.tsx  
- ❌ ContactModalAlternatives.tsx
- ❌ HeaderNext.tsx
- ❌ ManifestoPageNext.tsx

### Videos Experimentales (no utilizados)
- ❌ HomePageVideo.tsx
- ❌ EditorialVideo.tsx
- ❌ MidjourneyVideo.tsx
- ❌ VideoBackground.tsx
- ❌ VideoExamples.tsx
- ❌ VideoTransitions.tsx

### ScrollFade Experimentales
- ❌ ManifestoScrollFadeDynamic.tsx
- ❌ ManifestoScrollFadeFixed.tsx
- ❌ ScrollFade.tsx

### Archivos Temporales
- ❌ temp-delete-scrollfade.txt
- ❌ temp-scroll-fade.css
- ❌ texture-options.md

### Fuentes No Utilizadas
- ❌ styles/fonts/Eiko-Light.woff2

## 🎯 PROYECTO FINAL LIMPIO:

### ✅ Estructura Next.js Activa:
- `/app/page.tsx` - Homepage
- `/app/about/page.tsx` - About page  
- `/app/manifesto/page.tsx` - Manifesto page
- `/app/layout.tsx` - Layout principal
- `/app/globals.css` - Duplicado de styles/globals.css

### ✅ Componentes Activos:
- AboutPage.tsx, HomePage.tsx, ManifestoPage.tsx
- Header.tsx, Footer.tsx, ContactModal.tsx
- Componentes funcionales UI y utilidades

### ✅ Sistema Tipográfico Limpio:
- Opening Hours Sans (principal)
- IBM Plex Mono (funcional)
- Variables CSS unificadas

### 📍 NEXT STEPS:
1. Mover OpeningHoursSans-Regular.woff2 a `/public/fonts/`
2. Commit y push a GitHub
3. Deploy en Vercel ✨