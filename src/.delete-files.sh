#!/bin/bash
# Script para eliminar archivos legacy después de migración a Next.js

echo "🗑️ Eliminando archivos legacy de Vite..."

# Archivos principales de Vite (ya no necesarios)
rm -f App.tsx
rm -f main.tsx  
rm -f index.html
rm -f vite.config.ts

# Configuración legacy
rm -f tailwind.config.js

# Componentes experimentales/duplicados
rm -f components/AboutPageAlternatives.tsx
rm -f components/AboutPageNext.tsx
rm -f components/ContactModalAlternatives.tsx
rm -f components/HeaderNext.tsx
rm -f components/ManifestoPageNext.tsx

# Videos experimentales
rm -f components/HomePageVideo.tsx
rm -f components/EditorialVideo.tsx
rm -f components/MidjourneyVideo.tsx
rm -f components/VideoBackground.tsx
rm -f components/VideoExamples.tsx
rm -f components/VideoTransitions.tsx

# ScrollFade experimentales
rm -f components/ManifestoScrollFadeDynamic.tsx
rm -f components/ManifestoScrollFadeFixed.tsx
rm -f components/ScrollFade.tsx

# Archivos temporales
rm -f temp-delete-scrollfade.txt
rm -f temp-scroll-fade.css
rm -f texture-options.md

# Fuente no utilizada
rm -f styles/fonts/Eiko-Light.woff2

echo "✅ Limpieza completada - proyecto Next.js optimizado"