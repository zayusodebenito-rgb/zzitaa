# Zita Ayuso — Portfolio de Diseño Gráfico

Portfolio personal para Zita Ayuso, diseñadora gráfica especializada en branding, identidad visual, diseño para redes sociales y comunicación visual.

## Tecnologías

- **Framework**: TanStack Start (React + Vite)
- **Estilos**: CSS custom (sin framework CSS externo) con variables CSS y animaciones nativas
- **Tipografías**: Inter (body) + Syne (display) desde Google Fonts
- **Enrutamiento**: TanStack Router (file-based)
- **Deploy**: Netlify

## Paleta de color

| Rol | Valor |
|---|---|
| Fondo | `#0B0B0F` |
| Texto principal | `#F5F2F0` |
| Acento rosa | `#f700ff` |
| Rosa claro | `#FF6FB5` |
| Tarjetas | `#111116` |

## Estructura

La landing page es una única ruta (`/`) que incluye:
- Hero con tagline, CTAs y glow decorativo rosa
- Highlights (4 especialidades)
- Proyectos destacados (4 tarjetas grandes con placeholders SVG)
- Galería visual (grid masonry con placeholders SVG)
- Servicios (6 tarjetas)
- Sobre mí
- Contacto con botones de email e Instagram
- Footer

## Cómo ejecutar localmente

```bash
npm install
npm run dev
```

El sitio estará disponible en `http://localhost:3000`.
