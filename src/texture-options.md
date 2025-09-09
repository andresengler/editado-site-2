# 🎨 Opciones de Texturas para ContactModal

## 1. **Paper Grain** - Papel Premium Editorial
```css
/* Textura de papel de alta calidad con fibras */
.texture-paper-grain {
  background: linear-gradient(135deg, #f8f7f5 0%, #f3f2ef 100%);
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(120,119,108,0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(120,119,108,0.02) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120,119,108,0.02) 0%, transparent 50%);
  position: relative;
}

.texture-paper-grain::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(0,0,0,0.008) 1px, rgba(0,0,0,0.008) 2px),
    repeating-linear-gradient(-45deg, transparent, transparent 1px, rgba(0,0,0,0.006) 1px, rgba(0,0,0,0.006) 2px);
  background-size: 8px 8px, 12px 12px;
  pointer-events: none;
}

/* Sombra realista de papel */
.shadow-paper {
  box-shadow: 
    0 8px 32px rgba(0,0,0,0.12),
    0 2px 8px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.6),
    inset 0 -1px 0 rgba(0,0,0,0.04);
}
```

## 2. **Linen Canvas** - Textura Artesanal
```css
/* Textura de lino con entramado visible */
.texture-linen {
  background: #f6f5f2;
  background-image: 
    linear-gradient(90deg, rgba(139,134,122,0.03) 50%, transparent 50%),
    linear-gradient(rgba(139,134,122,0.02) 50%, transparent 50%);
  background-size: 3px 3px;
  position: relative;
}

.texture-linen::after {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 25% 25%, rgba(139,134,122,0.05) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(139,134,122,0.04) 1px, transparent 1px);
  background-size: 16px 16px, 20px 20px;
  pointer-events: none;
}

/* Sombra cálida de tela */
.shadow-linen {
  box-shadow: 
    0 12px 40px rgba(139,134,122,0.15),
    0 4px 12px rgba(139,134,122,0.08),
    inset 0 1px 0 rgba(255,255,255,0.4);
}
```

## 3. **Frosted Glass** - Vidrio Moderno
```css
/* Efecto de vidrio esmerilado */
.texture-glass {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.3);
  position: relative;
}

.texture-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255,255,255,0.6) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4) 0%, transparent 50%);
  pointer-events: none;
  border-radius: inherit;
}

/* Sombra de vidrio */
.shadow-glass {
  box-shadow: 
    0 16px 48px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.04),
    0 0 0 1px rgba(255,255,255,0.1),
    inset 0 1px 0 rgba(255,255,255,0.8);
}
```

## 4. **Vintage Parchment** - Pergamino Histórico
```css
/* Textura de pergamino envejecido */
.texture-parchment {
  background: linear-gradient(135deg, #f4f1e8 0%, #ebe6d6 100%);
  position: relative;
}

.texture-parchment::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 10% 20%, rgba(101,67,33,0.08) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(101,67,33,0.06) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(101,67,33,0.04) 0%, transparent 60%);
  background-size: 200px 200px, 150px 150px, 300px 300px;
  pointer-events: none;
}

/* Sombra vintage */
.shadow-parchment {
  box-shadow: 
    0 10px 35px rgba(101,67,33,0.15),
    0 3px 10px rgba(101,67,33,0.1),
    inset 0 1px 0 rgba(255,255,255,0.6),
    inset 0 -1px 0 rgba(101,67,33,0.05);
}
```

## 5. **Business Card Stock** - Cartón Profesional
```css
/* Textura de cartulina premium */
.texture-cardstock {
  background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
  position: relative;
}

.texture-cardstock::after {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    repeating-linear-gradient(0deg, transparent, transparent 0.5px, rgba(0,0,0,0.008) 0.5px, rgba(0,0,0,0.008) 1px),
    repeating-linear-gradient(90deg, transparent, transparent 0.5px, rgba(0,0,0,0.006) 0.5px, rgba(0,0,0,0.006) 1px);
  background-size: 20px 20px;
  pointer-events: none;
}

/* Sombra corporativa */
.shadow-cardstock {
  box-shadow: 
    0 6px 25px rgba(0,0,0,0.1),
    0 2px 8px rgba(0,0,0,0.06),
    0 0 0 1px rgba(0,0,0,0.04),
    inset 0 1px 0 rgba(255,255,255,0.9);
}
```

## 6. **Concrete Paper** - Minimalismo Contemporáneo
```css
/* Textura de papel concreto */
.texture-concrete {
  background: #f8f8f8;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0);
  background-size: 15px 15px;
  position: relative;
}

.texture-concrete::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(90deg, rgba(0,0,0,0.005) 1px, transparent 1px),
    linear-gradient(rgba(0,0,0,0.005) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

/* Sombra arquitectónica */
.shadow-concrete {
  box-shadow: 
    0 8px 30px rgba(0,0,0,0.06),
    0 3px 12px rgba(0,0,0,0.04),
    inset 0 1px 0 rgba(255,255,255,0.7);
}
```

---

## 🎯 Comparación Rápida:

| Textura | Sensación | Mejor Para | Modernidad |
|---------|-----------|------------|------------|
| Paper Grain | Editorial, refinada | Revistas, portfolios | ⭐⭐⭐⭐ |
| Linen Canvas | Artesanal, cálida | Estudios creativos | ⭐⭐⭐ |
| Frosted Glass | Moderna, tech | Apps, startups | ⭐⭐⭐⭐⭐ |
| Vintage Parchment | Histórica, elegante | Legal, académico | ⭐⭐ |
| Business Card | Corporativa, seria | Empresas, finanzas | ⭐⭐⭐⭐ |
| Concrete Paper | Minimal, limpia | Arquitectura, diseño | ⭐⭐⭐⭐⭐ |

## 💡 Recomendación para Editado Studio:

Para un estudio editorial como Editado, recomiendo **Paper Grain** o **Linen Canvas**:
- Paper Grain: Más refinado y profesional
- Linen Canvas: Más artesanal y personal

¿Cuál te parece más apropiada para la identidad de Editado Studio?