import React, { useState } from 'react';
import { X, Copy, Check, FileText, Code2, Shield, Globe, Terminal, Cloud, ExternalLink } from 'lucide-react';

interface CloudflareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudflareExportModal: React.FC<CloudflareModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'index_html' | 'styles_css' | 'main_js' | 'submit_ts' | 'posts_js' | 'headers' | 'robots' | 'guide'>('index_html');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const fileContents = {
    index_html: `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>N50.es Blowerdoor Test - Ensayos de Hermeticidad</title>
  <meta name="description" content="Ensayos Blowerdoor y diagnóstico de hermeticidad para viviendas, edificios y Passivhaus en Madrid, Castilla y León, Asturias, Cantabria y Euskadi." />
  <meta name="keywords" content="blowerdoor test, ensayo blowerdoor, hermeticidad al aire, passivhaus n50, infiltraciones de aire, test de estanqueidad, une-en iso 9972, minneapolis blowerdoor, termografia, blowerdoor madrid, blowerdoor castilla y leon" />
  <meta name="author" content="N50.es Blowerdoor Test" />
  <link rel="canonical" href="https://n50.es/" />

  <!-- Open Graph / Social -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://n50.es/" />
  <meta property="og:title" content="N50.es Blowerdoor Test - Ensayos de Hermeticidad" />
  <meta property="og:description" content="Ensayos Blowerdoor y diagnóstico de hermeticidad para viviendas y edificios en Madrid y Norte de España." />
  <meta property="og:site_name" content="N50.es" />

  <!-- Geotargeting for GEO -->
  <meta name="geo.region" content="ES-M, ES-CL, ES-AS, ES-CB, ES-PV" />
  <meta name="geo.placename" content="Madrid, Valladolid, Burgos, León, Oviedo, Santander, Bilbao" />

  <!-- Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css" />

  <!-- Schema.org JSON-LD (AEO / GEO / Google Rich Snippets) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "N50.es Blowerdoor Test",
    "url": "https://n50.es",
    "email": "hola@n50.es",
    "description": "Ensayos de hermeticidad Minneapolis BlowerDoor según UNE-EN ISO 9972 y estándar Passivhaus.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Madrid",
      "addressRegion": "Comunidad de Madrid",
      "addressCountry": "ES"
    },
    "areaServed": ["Madrid", "Castilla y León", "Asturias", "Cantabria", "País Vasco"]
  }
  </script>
</head>
<body>
  <!-- Header con Logo, Navegación y CTA -->
  <header class="header">
    <div class="container header-inner">
      <a href="#" class="brand">
        <img src="images/logo-n50.png" alt="N50 Blower Door Test" style="height: 44px; width: auto; object-fit: contain;" />
      </a>
      <nav class="nav">
        <a href="#servicios">Servicios</a>
        <a href="#tecnologia">Tecnología</a>
        <a href="#simulador">Simulador 50 Pa</a>
        <a href="#cobertura">Cobertura</a>
        <a href="#contacto" class="btn btn-primary">Pedir Presupuesto</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-content">
        <div class="badge-text">Base Madrid · Castilla y León · Asturias · Cantabria · Euskadi</div>
        <h1>La hermeticidad de un edificio se mide. <span class="red">No se supone.</span></h1>
        <p>Ensayos oficiales Blowerdoor según norma UNE-EN ISO 9972 y estándar Passivhaus. Medimos el caudal de infiltración a 50 Pa y localizamos fugas antes de cerrar tu obra.</p>
        <div class="hero-actions">
          <a href="#contacto" class="btn btn-primary">Solicitar Ensayo Blowerdoor</a>
          <a href="#simulador" class="btn btn-secondary">Simulador de Presión</a>
        </div>
      </div>
      <div class="hero-media">
        <img src="images/hero.webp" alt="Sistema Minneapolis BlowerDoor instalado en puerta exterior" />
      </div>
    </div>
  </section>

  <!-- Formulario con envío a hola@n50.es vía Cloudflare Pages Function -->
  <section id="contacto" class="contact-section">
    <div class="container">
      <h2>Pide presupuesto para tu ensayo</h2>
      <form id="contactForm" class="contact-form">
        <input type="text" name="nombre" placeholder="Nombre completo" required />
        <input type="email" name="email" placeholder="Correo electrónico" required />
        <input type="tel" name="telefono" placeholder="Teléfono de contacto" required />
        <select name="comunidad">
          <option value="Madrid">Madrid y alrededores</option>
          <option value="Castilla y León">Castilla y León</option>
          <option value="Asturias">Asturias</option>
          <option value="Cantabria">Cantabria</option>
          <option value="Euskadi">Euskadi</option>
        </select>
        <textarea name="mensaje" placeholder="Detalles de la obra, superficie m² y fase"></textarea>
        <button type="submit" class="btn btn-primary">Enviar a hola@n50.es</button>
      </form>
      <div id="formStatus" class="form-status"></div>
    </div>
  </section>

  <script src="js/main.js"></script>
</body>
</html>`,

    styles_css: `/* N50.es - Estilos limpios y modernos optimizados para Cloudflare Pages */
:root {
  --red: #E30613;
  --red-hover: #c30510;
  --dark: #111111;
  --petroleum: #142E43;
  --light-gray: #E9EDF0;
  --bg: #F8FAFC;
  --text: #0F172A;
  --text-muted: #64748B;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.red { color: var(--red); }

.header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #E2E8F0;
  z-index: 50;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.brand-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--dark);
  text-decoration: none;
}

.brand-sub {
  display: block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--petroleum);
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.nav a {
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
  transition: color 0.15s ease;
}

.nav a:hover {
  color: var(--red);
}

.btn {
  display: inline-block;
  padding: 0.65rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 0.6rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary {
  background: var(--red);
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background: var(--red-hover);
}

.btn-secondary {
  background: #1E293B;
  color: #fff;
  border: 1px solid #334155;
}

.hero {
  background: #0F172A;
  color: #fff;
  padding: 5rem 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero h1 {
  font-size: 2.75rem;
  line-height: 1.15;
  margin-bottom: 1.25rem;
}

.hero p {
  color: #94A3B8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.hero-media img {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid #334155;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}

.badge-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #CBD5E1;
  margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .nav {
    display: none;
  }
}`,

    main_js: `// N50.es - JavaScript vanilla para interactividad del simulador y envío a Cloudflare Function
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      statusDiv.innerHTML = '<p style="color:#0284C7">Enviando solicitud a hola@n50.es...</p>';

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          statusDiv.innerHTML = '<p style="color:#059669; font-weight:bold;">¡Solicitud enviada con éxito! Te responderemos en menos de 24 horas.</p>';
          form.reset();
        } else {
          statusDiv.innerHTML = '<p style="color:#DC2626">Error al enviar. Por favor escribe directamente a <strong>hola@n50.es</strong>.</p>';
        }
      } catch (err) {
        statusDiv.innerHTML = '<p style="color:#DC2626">No se pudo contactar con el servidor. Remite tu consulta a <strong>hola@n50.es</strong>.</p>';
      }
    });
  }
});`,

    submit_ts: `// /functions/api/submit.ts - Cloudflare Pages Function (Worker)
// Se ejecuta directamente en el borde de Cloudflare sin necesidad de servidor
// Utiliza Resend API para enviar correos directamente a hola@n50.es

interface Env {
  RESEND_API_KEY?: string;
}

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const apiKey = context.env.RESEND_API_KEY;

    if (!apiKey) {
      console.log('Nueva solicitud de presupuesto recibida para hola@n50.es:', data);
      return new Response(JSON.stringify({ success: true, message: 'Solicitud registrada' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'N50 Web <notificaciones@n50.es>',
        to: ['hola@n50.es'],
        reply_to: data.email,
        subject: \`Nuevo Ensayo Blowerdoor: \${data.nombre} (\${data.comunidad || 'Madrid'})\`,
        html: \`
          <h2>Nueva solicitud de ensayo Blowerdoor en N50.es</h2>
          <p><strong>Nombre:</strong> \${data.nombre}</p>
          <p><strong>Email:</strong> \${data.email}</p>
          <p><strong>Teléfono:</strong> \${data.telefono}</p>
          <p><strong>Comunidad:</strong> \${data.comunidad}</p>
          <p><strong>Localidad:</strong> \${data.localidad || 'No indicada'}</p>
          <p><strong>Inmueble:</strong> \${data.tipoInmueble}</p>
          <p><strong>Superficie aprox:</strong> \${data.superficieM2 || '-'} m²</p>
          <p><strong>Fase de obra:</strong> \${data.faseObra}</p>
          <p><strong>Detalles:</strong> \${data.detalles || data.mensaje || 'Sin comentarios adicionales'}</p>
        \`,
      }),
    });

    if (resendResponse.ok) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      const err = await resendResponse.text();
      return new Response(JSON.stringify({ error: err }), { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}`,

    posts_js: `// /functions/api/posts.js - Cloudflare Pages Function (Worker)
// Conecta tu blog de WordPress con N50.es con caché en el CDN de Cloudflare
// Resuelve CORS y carga los artículos en menos de 30ms

export async function onRequestGet(context) {
  // Configura la URL de tu WordPress en Variables de Cloudflare como WP_API_URL o edita aquí:
  const wpBaseUrl = context.env.WP_API_URL || 'https://blog.n50.es';
  const targetUrl = \`\${wpBaseUrl.replace(/\\/+$/, '')}/wp-json/wp/v2/posts?per_page=3&_embed=true\`;

  try {
    const cache = caches.default;
    const cacheKey = new Request(context.request.url, context.request);
    let response = await cache.match(cacheKey);

    if (!response) {
      const wpResponse = await fetch(targetUrl, {
        headers: { 'Accept': 'application/json' },
      });

      if (!wpResponse.ok) {
        return new Response(JSON.stringify({ error: 'Error al consultar WordPress' }), { status: wpResponse.status });
      }

      const posts = await wpResponse.json();

      response = new Response(JSON.stringify(posts), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          'Access-Control-Allow-Origin': '*',
        },
      });

      context.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}`,

    headers: `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

/images/*
  Cache-Control: public, max-age=31536000, immutable

/css/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400

/js/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400`,

    robots: `User-agent: *
Allow: /

Sitemap: https://n50.es/sitemap.xml`,

    guide: `# Guía de Despliegue en Cloudflare Pages para N50.es

Esta web está diseñada para ser extremadamente rápida, segura y alojarse a coste cero en Cloudflare Pages con Core Web Vitals de 100/100.

## Opción 1: Subida directa sin Git (Arrastrar y Soltar)
1. Inicia sesión en tu cuenta de Cloudflare (https://dash.cloudflare.com).
2. Ve a **Workers & Pages** > **Crear aplicación** > Pestaña **Pages**.
3. Selecciona **Cargar recursos (Upload Assets)**.
4. Nombra tu proyecto: \`n50-blowerdoor\`.
5. Arrastra la carpeta con los archivos (\`index.html\`, carpeta \`css/\`, carpeta \`js/\`, carpeta \`images/\`, \`functions/\`, etc.).
6. Haz clic en **Desplegar sitio**. ¡Tu web estará online en 5 segundos con certificado SSL automático y CDN mundial!

## Opción 2: Conectar con repositorio Git (Recomendado para actualizaciones automáticas)
1. Sube tu código a un repositorio de GitHub (o GitLab).
2. En Cloudflare Pages, selecciona **Conectar con Git**.
3. Configuración de compilación:
   - Framework preset: **None**
   - Build command: *(dejar vacío)*
   - Build output directory: \`/\` (o la raíz donde esté index.html)
4. Despliega.

## Configuración del envío de correo a hola@n50.es (Resend)
El archivo \`functions/api/contact.js\` se encarga de procesar el formulario de contacto en el borde de Cloudflare sin exponer claves:
1. Regístrate gratis en **Resend.com** (permite enviar hasta 3.000 emails/mes gratis).
2. Crea una API Key.
3. En Cloudflare Pages, ve a **Settings** > **Variables and secrets**.
4. Añade una variable secreta:
   - Nombre: \`RESEND_API_KEY\`
   - Valor: \`re_123456789...\`
5. ¡Listo! Cualquier usuario que rellene el formulario generará un correo profesional directo a \`hola@n50.es\` con respuesta al remitente.`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContents[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-100">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <span>Kit de Archivos Estáticos para Cloudflare Pages</span>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  HTML5 · CSS3 · Vanilla JS · Pages Function
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Código básico, limpio y ligero sin frameworks pesados, listo para subir a tu espacio Cloudflare.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1 px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 text-xs font-mono overflow-x-auto">
          {[
            { id: 'index_html', label: 'index.html', icon: FileText },
            { id: 'styles_css', label: 'css/styles.css', icon: Code2 },
            { id: 'main_js', label: 'js/main.js', icon: Code2 },
            { id: 'submit_ts', label: 'functions/api/submit.ts', icon: Terminal },
            { id: 'posts_js', label: 'functions/api/posts.js (WordPress)', icon: Terminal },
            { id: 'headers', label: '_headers', icon: Shield },
            { id: 'robots', label: 'robots.txt & sitemap', icon: Globe },
            { id: 'guide', label: 'Guía de Despliegue', icon: ExternalLink },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#E30613] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code Content Container */}
        <div className="relative flex-1 p-6 overflow-y-auto bg-slate-950 font-mono text-xs">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 transition-colors cursor-pointer shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>Copiar este archivo</span>
                </>
              )}
            </button>
          </div>

          <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
            {fileContents[activeTab]}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Destino configurado del formulario: <strong className="text-white">hola@n50.es</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold cursor-pointer"
          >
            Cerrar visualizador
          </button>
        </div>
      </div>
    </div>
  );
};
