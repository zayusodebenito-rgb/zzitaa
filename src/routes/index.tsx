import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: ZitaPortfolio,
})

// ── Scroll animation hook ──────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement | null>(null)
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
    if (!vantaRef.current || vantaEffect.current) return

    const VANTA = (window as any).VANTA

    if (!VANTA || !VANTA.NET) return

    vantaEffect.current = VANTA.NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: 0xf700ff,
      backgroundColor: 0x202020,
      points: 10,
      maxDistance: 15,
      spacing: 15,
      showDots: true,
    })

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [])

  return <div ref={vantaRef} className="vanta-background" />
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches

    if (isTouchDevice) return

    const cursor = cursorRef.current
    const dot = dotRef.current

    if (!cursor || !dot) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cursorX = mouseX
    let cursorY = mouseY
    let animationFrameId: number

    const moveCursor = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.16
      cursorY += (mouseY - cursorY) * 0.16

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`

      animationFrameId = requestAnimationFrame(animateCursor)
    }

    const showCursor = () => {
      cursor.classList.remove('is-hidden')
      dot.classList.remove('is-hidden')
    }

    const hideCursor = () => {
      cursor.classList.add('is-hidden')
      dot.classList.add('is-hidden')
    }

    const addHover = () => {
      cursor.classList.add('is-hovering')
    }

    const removeHover = () => {
      cursor.classList.remove('is-hovering')
    }

    const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, .gallery-item, .service-card, input, textarea, select',
    )

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', addHover)
      element.addEventListener('mouseleave', removeHover)
    })

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', showCursor)
    document.addEventListener('mouseleave', hideCursor)

    animateCursor()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', showCursor)
      document.removeEventListener('mouseleave', hideCursor)

      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', addHover)
        element.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  )
}
// ── Data ───────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    category: 'Branding',
    title: 'Identidad visual marca de cosmeticos',
    description: 'Sistema visual con logotipo y fotografía profesional para redes sociales.',
    color: '#1a0d14',
    accent: '#FF4FA3',
    tag: 'BRANDING',
    thumbnail: '/proyectos/identidad-cosmeticos/nebai-logo.jpg',
    images: [
      { title: 'Logotipo', src: '/proyectos/identidad-cosmeticos/nebai-logo.jpg', variant: 'photo' },
      { title: 'Fotografía', src: '/proyectos/identidad-cosmeticos/02-fotografia.jpg', variant: 'photo' },
      { title: 'Fotografía', src: '/proyectos/identidad-cosmeticos/03-fotografia.jpg', variant: 'photo' },
      { title: 'Fotografía', src: '/proyectos/identidad-cosmeticos/04-fotografia.jpg', variant: 'photo' },
      { title: 'Fotografía', src: '/proyectos/identidad-cosmeticos/05-fotografia.jpg', variant: 'photo' },
      { title: 'Fotografía', src: '/proyectos/identidad-cosmeticos/06-fotografia.jpg', variant: 'photo' },
      { title: 'Fotografía', src: '/proyectos/identidad-cosmeticos/07-fotografia.jpg', variant: 'photo' },
      { title: 'Fotografía', src: '/proyectos/identidad-cosmeticos/08-fotografia.jpg', variant: 'photo' },
      { title: 'Fotografía', src: '/proyectos/identidad-cosmeticos/09-fotografia.jpg', variant: 'photo' },
      { title: 'Fotografía', src: '/proyectos/identidad-cosmeticos/10-fotografia.jpg', variant: 'photo' },
      { title: 'Fotografía', src: '/proyectos/identidad-cosmeticos/11-fotografia.jpg', variant: 'photo' },
      { title: 'Fotografía', src: '/proyectos/identidad-cosmeticos/12-fotografia.jpg', variant: 'photo' },
    ],
  },
  {
    id: 2,
    category: 'Social Media Design',
    title: 'Campaña gráfica para redes sociales',
    description: 'Diseño de piezas digitales coherentes para Instagram, stories y contenido promocional.',
    color: '#0d0d1a',
    accent: '#A78BFA',
    tag: 'SOCIAL MEDIA',
    thumbnail: '/proyectos/campana-grafica/Slide_001.jpg',
    images: [
      { title: 'Portada', src: '/proyectos/campana-grafica/Slide_001.jpg' },
      { title: 'Historia', src: '/proyectos/campana-grafica/Slide_002.jpg' },
      { title: 'Historia', src: '/proyectos/campana-grafica/Slide_003.jpg' },
      { title: 'Historia', src: '/proyectos/campana-grafica/Slide_004.jpg' },
    ],
  },
  {
    id: 3,
    category: 'Identidad visual',
    title: 'Rediseño juego de mesa',
    description: 'Dirección visual para un juego de mesa con cambio de identidad y con temática.',
    color: '#0f1a12',
    accent: '#34D399',
    tag: 'IDENTIDAD',
    thumbnail: '/proyectos/redisenio-juego-mesa/portada-racks-city.png',
    images: [
      { title: 'Logotipo', src: '/proyectos/redisenio-juego-mesa/portada-racks-city.png' },
      { title: 'Racks', src: '/proyectos/redisenio-juego-mesa/racks-500.jpg' },
      { title: 'Racks', src: '/proyectos/redisenio-juego-mesa/racks-200.jpg' },
      { title: 'Racks', src: '/proyectos/redisenio-juego-mesa/racks-1.jpg' },
      { title: 'Racks', src: '/proyectos/redisenio-juego-mesa/racks-5.jpg' },
      { title: 'Racks', src: '/proyectos/redisenio-juego-mesa/racks-10.jpg' },
      { title: 'Racks', src: '/proyectos/redisenio-juego-mesa/racks-20.jpg' },
      { title: 'Racks', src: '/proyectos/redisenio-juego-mesa/racks-50.jpg' },
      { title: 'Racks', src: '/proyectos/redisenio-juego-mesa/racks-100.jpg' },
      { title: 'Tablero', src: '/proyectos/redisenio-juego-mesa/tablero-racks-city.jpg', variant: 'square' },
    ],
  },
  {
    id: 4,
    category: 'Diseño editorial',
    title: 'Revista editorial proyecto personal',
    description: 'Composición tipográfica y sistema gráfico para una revista.',
    color: '#1a1400',
    accent: '#FBBF24',
    tag: 'EDITORIAL',
    thumbnail: '/proyectos/revista-editorial/Portada.jpg',
    images: [
      { title: 'Portada y contraportada', src: '/proyectos/revista-editorial/Portada.jpg' },
      { title: 'Indice', src: '/proyectos/revista-editorial/Indice.jpg' },
      { title: 'Contenido', src: '/proyectos/revista-editorial/Contenido.jpg' },
      { title: 'Contenido', src: '/proyectos/revista-editorial/Contenido 2.jpg' },
      { title: 'Contenido', src: '/proyectos/revista-editorial/Contenido 3.jpg' },
      { title: 'Contenido', src: '/proyectos/revista-editorial/Contenido 4.jpg' },
    ],
  },
  {
    id: 5,
    category: 'Diseño interactivo',
    title: 'Diseño aplicación móvil - Hold',
    description: 'Sistema visual completo con logotipo, paleta de colores, tipografías y funcionalidad de la app.',
    color: '#10151f',
    accent: '#60A5FA',
    tag: 'APP',
    thumbnail: '/proyectos/hold/Slide_001.jpg',
    images: [
      { title: 'APP', src: '/proyectos/hold/Slide_001.jpg' },
      { title: 'APP', src: '/proyectos/hold/Slide_002.jpg' },
      { title: 'APP', src: '/proyectos/hold/Slide_003.jpg' },
    ],
  },
]

type Project = (typeof projects)[number]

const services = [
  {
    icon: '◈',
    title: 'Branding e identidad visual',
    desc: 'Creación de sistemas visuales completos: logotipo, paleta, tipografía y guía de estilo.',
  },
  {
    icon: '◉',
    title: 'Diseño para redes sociales',
    desc: 'Piezas gráficas coherentes y atractivas para feed, stories y contenido digital.',
  },
  {
    icon: '▦',
    title: 'Diseño editorial',
    desc: 'Composición tipográfica y visual para publicaciones, catálogos y revistas.',
  },
  {
    icon: '◎',
    title: 'Edición de video',
    desc: 'Edición y creación de videos dinamicos y estrategicos para proyectos.',
  },
  {
    icon: '⬡',
    title: 'Manuales de marca o presentaciones',
    desc: 'Creación de manual creativo de marca y presentaciones de alto impacto.',
  },
  {
    icon: '↺',
    title: 'Rebranding',
    desc: 'Evolución o transformación completa de la identidad visual de una marca.',
  },
]

const highlights = [
  { label: 'Branding', num: '01' },
  { label: 'Identidad visual', num: '02' },
  { label: 'Diseño para redes', num: '03' },
  { label: 'Dirección de arte', num: '04' },
]

// ── Placeholder image SVG ──────────────────────────────────────────────────
const adobeTools = [
  { short: 'Ps', className: 'photoshop' },
  { short: 'Ai', className: 'illustrator' },
  { short: 'Id', className: 'indesign' },
  { short: 'Pr', className: 'premiere' },
]

function PlaceholderImg({
  bg,
  pattern,
  label,
  accent = '#FF4FA3',
}: {
  bg: string
  pattern: string
  label: string
  accent?: string
}) {
  const id = `p-${label.replace(/\s/g, '')}`
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: bg, display: 'block' }}
    >
      <defs>
        {pattern === 'radial' && (
          <radialGradient id={id} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={bg} stopOpacity="0" />
          </radialGradient>
        )}
        {pattern === 'grid' && (
          <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={accent} strokeOpacity="0.12" strokeWidth="0.5" />
          </pattern>
        )}
        {pattern === 'lines' && (
          <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="20" stroke={accent} strokeOpacity="0.1" strokeWidth="1" />
          </pattern>
        )}
        {pattern === 'dots' && (
          <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.5" fill={accent} fillOpacity="0.15" />
          </pattern>
        )}
      </defs>
      <rect width="400" height="400" fill={`url(#${id})`} />
      {pattern === 'radial' && (
        <>
          <circle cx="200" cy="160" r="80" fill="none" stroke={accent} strokeOpacity="0.2" strokeWidth="1" />
          <circle cx="200" cy="160" r="50" fill="none" stroke={accent} strokeOpacity="0.15" strokeWidth="0.5" />
          <circle cx="200" cy="160" r="20" fill={accent} fillOpacity="0.1" />
        </>
      )}
      {pattern === 'grid' && (
        <text x="200" y="215" textAnchor="middle" fontSize="48" fontFamily="serif" fill={accent} fillOpacity="0.3">Aa</text>
      )}
      {pattern === 'lines' && (
        <rect x="140" y="140" width="120" height="120" fill="none" stroke={accent} strokeOpacity="0.25" strokeWidth="1" />
      )}
      <text x="200" y="350" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill={accent} fillOpacity="0.6" letterSpacing="3">{label.toUpperCase()}</text>
    </svg>
  )
}

// ── Project card placeholder ───────────────────────────────────────────────
function ProjectPlaceholder({ color, accent }: { color: string; accent: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: color, display: 'block' }}
    >
      <defs>
        <radialGradient id={`rg-${accent.replace('#', '')}`} cx="30%" cy="40%" r="70%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#rg-${accent.replace('#', '')})`} />
      <circle cx="300" cy="180" r="120" fill="none" stroke={accent} strokeOpacity="0.15" strokeWidth="1" />
      <circle cx="300" cy="180" r="80" fill="none" stroke={accent} strokeOpacity="0.1" strokeWidth="0.5" />
      <rect x="240" y="140" width="120" height="80" fill="none" stroke={accent} strokeOpacity="0.2" strokeWidth="1" />
      <text x="300" y="350" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill={accent} fillOpacity="0.5" letterSpacing="4">PROYECTO · DISEÑO GRÁFICO</text>
    </svg>
  )
}

function ProjectGalleryModal({
  isOpen,
  selectedProject,
  onClose,
  onSelectProject,
}: {
  isOpen: boolean
  selectedProject: Project
  onClose: () => void
  onSelectProject: (project: Project) => void
}) {
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="project-modal-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="project-modal-close" onClick={onClose} aria-label="Cerrar proyectos">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <line x1="5" y1="5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <line x1="17" y1="5" x2="5" y2="17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>

        <aside className="project-modal-sidebar">
          <span className="project-modal-eyebrow">Proyectos</span>
          <h2 id="project-modal-title" className="project-modal-heading">
            Galeria de trabajos
          </h2>
          <div className="project-modal-list">
            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`project-modal-tab ${project.id === selectedProject.id ? 'is-active' : ''}`}
                onClick={() => onSelectProject(project)}
                style={{ '--project-accent': project.accent } as CSSProperties}
              >
                <span>{project.tag}</span>
                {project.title}
              </button>
            ))}
          </div>
        </aside>

        <div className="project-modal-content">
          <div className="project-modal-intro">
            <span style={{ color: selectedProject.accent }}>{selectedProject.category}</span>
            <h3>{selectedProject.title}</h3>
            <p>{selectedProject.description}</p>
          </div>

          <div
            className={`project-modal-images ${
              selectedProject.id === 1
                ? 'project-modal-images-cosmeticos'
                : selectedProject.id === 4 || selectedProject.id === 5
                ? 'project-modal-images-single'
                : selectedProject.id === 3
                  ? 'project-modal-images-racks'
                  : ''
            }`}
          >
            {selectedProject.images.map((image, index) => (
              <figure
                key={`${selectedProject.id}-${image.title}-${index}`}
                className={`project-modal-image ${'variant' in image ? `project-modal-image-${image.variant}` : ''}`}
              >
                {image.src ? (
                  <img src={image.src} alt={`${selectedProject.title} - ${image.title}`} />
                ) : (
                  <ProjectPlaceholder color={selectedProject.color} accent={selectedProject.accent} />
                )}
                <figcaption>{image.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s, border-color 0.3s',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        background: scrolled ? 'rgba(11,11,15,0.92)' : 'transparent',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}>
            <img
              src="/logotipo-portfolio.svg"
              alt="Logotipo Zita"
              style={{ width: '20px', height: '25px', display: 'block' }}
            />
            <span
              className="font-display"
              style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F5F2F0', letterSpacing: '-0.02em' }}
            >
              Zita<span style={{ color: 'var(--pink)' }}>.</span>
            </span>
          </a>

          {/* Desktop menu */}
          <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}
            className="hidden-mobile">
            {['Proyectos', 'Servicios', 'Contacto'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  style={{
                    color: 'rgba(245,242,240,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pink)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,242,240,0.7)')}
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a href="#contacto" className="btn-pink" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>
                Contactar
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F5F2F0', padding: '0.5rem' }}
            className="show-mobile"
            aria-label="Menú"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            padding: '1rem 0 1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {['Proyectos', 'Servicios', 'Contacto'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{ color: 'rgba(245,242,240,0.8)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
      `}</style>
    </nav>
  )
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero({ onOpenProjects }: { onOpenProjects: () => void }) {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '72px',
      }}
    >
      {/* Background glow orbs */}
      <div style={{
        position: 'absolute', top: '15%', right: '-10%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(255,79,163,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-15%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(255,79,163,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem', position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Tag */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            color: 'var(--pink)',
            border: '1px solid rgba(255,79,163,0.3)',
            borderRadius: '100px',
            padding: '0.4rem 1rem',
            background: 'rgba(255,79,163,0.06)',
          }}>
            GRAPHIC DESIGN · PORTFOLIO
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display fade-up"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: '820px',
            marginBottom: '1.5rem',
          }}
        >Cada proyecto tiene una historia.{' '}
        <span className="unlock-text">Poténciala.</span>
        </h1>

        {/* Pink decorative line */}
        <div style={{
          width: '80px', height: '3px',
          background: 'linear-gradient(90deg, var(--pink), var(--pink-light))',
          borderRadius: '2px',
          marginBottom: '1.75rem',
          boxShadow: '0 0 20px rgba(255,79,163,0.5)',
        }} />

        {/* Subtitle */}
        <p
          className="fade-up"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(245,242,240,0.6)',
            maxWidth: '560px',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          Diseño identidades visuales y piezas gráficas que ayudan a comunicar con claridad,
          personalidad y de forma coherente. Combinando estrategia, estética y atención a los
          detalles, para crear soluciones visuales funcionales y creativas.
        </p>

        {/* CTA buttons */}
        <div className="fade-up" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" onClick={onOpenProjects} className="btn-pink">
            Ver proyectos
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <a href="#contacto" className="btn-outline">
            Contactar
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, transparent, var(--pink), transparent)', opacity: 0.6 }} />
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(245,242,240,0.4)', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </div>
    </section>
  )
}

// ── Highlights ─────────────────────────────────────────────────────────────
function Highlights() {
  return (
    <section style={{ padding: '2rem 0', background: '#202020', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0' }}>
          {highlights.map((h, i) => (
            <div
              key={h.num}
              style={{
                padding: '1.75rem 2rem',
                borderRight: i < highlights.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--pink)', letterSpacing: '0.1em' }}>{h.num}</span>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#F5F2F0', letterSpacing: '-0.01em' }}>{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Projects ───────────────────────────────────────────────────────────────
function Projects({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  return (
    <section id="proyectos" className="rose-section" style={{ padding: '8rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Section header */}
        <div className="fade-up" style={{ marginBottom: '4rem' }}>
          <div className="section-divider" />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--pink)', textTransform: 'uppercase' }}>
            Proyectos destacados
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: '0.75rem', letterSpacing: '-0.03em' }}
          >
            Trabajos
          </h2>
        </div>

        {/* Projects grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="project-card fade-up"
              onClick={() => onOpenProject(p)}
              style={{
                background: p.color,
                borderRadius: '1.25rem',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Image area */}
              <div
                style={{
                  aspectRatio: '16/10',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '4px solid rgba(245,242,240,0.2)',
                  borderRadius: '1rem',
                  margin: '0.85rem',
                }}
              >
                {'thumbnail' in p && p.thumbnail ? (
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <ProjectPlaceholder color={p.color} accent={p.accent} />
                )}
                {/* Tag overlay */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: '#fff',
                    border: `1px solid ${p.accent}CC`,
                    background: `${p.accent}78`,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '100px',
                  }}>
                    {p.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <p style={{ fontSize: '0.75rem', color: 'rgba(245,242,240,0.45)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                  {p.category}
                </p>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F5F2F0', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(245,242,240,0.55)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {p.description}
                </p>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    onOpenProject(p)
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: p.accent,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: 0,
                    letterSpacing: '0.02em',
                  }}
                >
                  Ver proyecto
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Gallery ────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="servicios" className="rose-section" style={{ padding: '8rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="fade-up" style={{ marginBottom: '4rem', maxWidth: '600px' }}>
          <div className="section-divider" />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--pink)', textTransform: 'uppercase' }}>
            Que ofrezco
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: '0.75rem', letterSpacing: '-0.03em' }}
          >
            Mis servicios
          </h2>
          <p style={{ color: 'rgba(245,242,240,0.55)', lineHeight: 1.7, marginTop: '1rem' }}>
            Diseño gráfico enfocado en la construcción de piezas visuales coherentes, atractivas y comunicativas.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {services.map((s, i) => (
            <div
              key={s.title}
              className="service-card fade-up"
              style={{ padding: '2rem' }}
            >
              <div style={{
                width: '44px', height: '44px',
                background: 'rgba(255,79,163,0.1)',
                border: '1px solid rgba(255,79,163,0.2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                color: 'var(--pink)',
                marginBottom: '1.25rem',
              }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F5F2F0', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(245,242,240,0.5)', lineHeight: 1.65 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── About ──────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="about-section rose-section" style={{ padding: '8rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Text */}
          <div className="fade-up">
            <div className="section-divider" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--pink)', textTransform: 'uppercase' }}>
              Sobre mí
            </span>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: '0.75rem', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}
            >
              Zita Ayuso
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'rgba(245,242,240,0.7)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Estudiante de diseño gráfico, estoy construyendo mi trayectoria
              profesional a través de proyectos creativos estrategicos y con una 
              intención de comunicación. Me interesa crear identidades visuales creativas,
              cuidando los detalles y transformando mis ideas en soluciones gráficas funcionales
              y llamativas.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['Branding', 'Identidad visual', 'Social Media', 'Editorial'].map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--pink)',
                  border: '1px solid rgba(255,79,163,0.25)',
                  background: 'rgba(255,79,163,0.07)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '100px',
                  letterSpacing: '0.04em',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual block */}
          <div className="about-visual-shell fade-up">
            {adobeTools.map((tool) => (
              <div
                key={tool.short}
                className={`adobe-floating-icon ${tool.className}`}
                aria-hidden="true"
              >
                <span>{tool.short}</span>
              </div>
            ))}
            <div className="about-photo-frame">
              <img
                src="/assets/about-photo.jpg"
                alt="Retrato de Zita Ayuso"
                className="about-photo"
              />
              <div className="about-photo-glow" />
              <div style={{ display: 'none', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div className="font-display" style={{ fontSize: '5rem', fontWeight: 800, color: 'rgba(255,79,163,0.2)', lineHeight: 1 }}>ZA</div>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: 'rgba(245,242,240,0.3)', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                  Diseño gráfico
                </p>
              </div>
              {/* Corner decoration */}
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '40px', height: '40px', border: '1px solid rgba(255,79,163,0.3)', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                <div style={{ width: '3px', height: '40px', background: 'linear-gradient(to bottom, var(--pink), transparent)', borderRadius: '2px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function EmailSpotlightModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const email = 'zayusodebenito@gmail.com'

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="email-modal-overlay" role="presentation" onMouseDown={onClose}>
      <div
        className="email-spotlight"
        role="dialog"
        aria-modal="true"
        aria-label="Correo de contacto"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="email-spotlight-field">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 5h12v8H3V5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M3 6l6 4 6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{email}</span>
        </div>
        <button type="button" className="email-copy-button" onClick={copyEmail} aria-label="Copiar correo">
          {copied ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 9.4l3 3 7-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <rect x="6" y="5" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M4 12.5V4.5A1.5 1.5 0 0 1 5.5 3H12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

// ── Contact ────────────────────────────────────────────────────────────────
function Contact() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  return (
    <>
      <section id="contacto" className="rose-section" style={{ padding: '10rem 0', position: 'relative', overflow: 'hidden' }}>
        {/* Glow bg */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(255,79,163,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="fade-up">
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--pink)', textTransform: 'uppercase' }}>
              Contacto
            </span>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800, marginTop: '1rem', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}
            >
              ¿Creamos algo?{' '}
              <span className="gradient-text">Hablemos.</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'rgba(245,242,240,0.6)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 3rem' }}>
              Si tienes un proyecto o quieres saber más sobre mi trabajo, escríbeme.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" onClick={() => setIsEmailModalOpen(true)} className="btn-pink" style={{ fontSize: '0.9rem', padding: '0.875rem 2rem' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 4h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Enviar email
              </button>
              <a href="https://www.instagram.com/ziitaayuso/" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '0.9rem', padding: '0.875rem 2rem' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="13.5" cy="4.5" r="0.75" fill="currentColor" />
                </svg>
                Ver Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
      <EmailSpotlightModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
    </>
  )
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '2.5rem 0',
      background: '#111116',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Zita<span style={{ color: 'var(--pink)' }}>.</span>
        </span>
        <p style={{ fontSize: '0.8rem', color: 'rgba(245,242,240,0.35)' }}>
          © 2026 Zita Ayuso · Portfolio de diseño gráfico
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Proyectos', 'Servicios', 'Contacto'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontSize: '0.8rem', color: 'rgba(245,242,240,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pink)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,242,240,0.4)')}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ── Main export ────────────────────────────────────────────────────────────
function ZitaPortfolio() {
  useScrollReveal()
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0])
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

  const openProjectModal = (project: Project = projects[0]) => {
    setSelectedProject(project)
    setIsProjectModalOpen(true)
  }

  return (
    <>
      <VantaBackground />
      <CustomCursor />
      <Nav />
      <main>
        <Hero onOpenProjects={() => openProjectModal()} />
        <Highlights />
        <div className="lower-page-surface">
          <Projects onOpenProject={openProjectModal} />
          <Services />
          <About />
          <Contact />
        </div>
      </main>
      <Footer />
      <ProjectGalleryModal
        isOpen={isProjectModalOpen}
        selectedProject={selectedProject}
        onClose={() => setIsProjectModalOpen(false)}
        onSelectProject={setSelectedProject}
      />
    </>
  )
}
