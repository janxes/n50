import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, ArrowUpRight, RefreshCw, AlertCircle, ExternalLink, Globe } from 'lucide-react';

interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  featured_media_url?: string;
  category_name?: string;
}

const SAMPLE_POSTS: WordPressPost[] = [
  {
    id: 1,
    date: '2026-10-15T10:00:00',
    title: { rendered: 'Por qué el valor n50 no debe superar 0,60 h⁻¹ en proyectos Passivhaus' },
    excerpt: {
      rendered:
        'Análisis técnico de cómo las infiltraciones de aire frío disparan la demanda de calefacción y por qué la certificación oficial del Passive House Institute exige este límite estricto.',
    },
    link: '#',
    featured_media_url: '/images/blowerdoor_fan_door.jpg',
    category_name: 'Passivhaus',
  },
  {
    id: 2,
    date: '2026-09-28T12:30:00',
    title: { rendered: 'Caso práctico: Localización de infiltraciones en sellado de ventanas con humo trazador' },
    excerpt: {
      rendered:
        'Revisión en obra de un edificio plurifamiliar donde el uso conjunto de presurización a 50 Pa y lápices de humo detectó fugas invisibles en la cinta de sellado perimetral.',
    },
    link: '#',
    featured_media_url: '/images/building_smoke_detection.jpg',
    category_name: 'Casos Reales',
  },
  {
    id: 3,
    date: '2026-08-10T09:15:00',
    title: { rendered: 'La importancia crítica del ensayo Blowerdoor intermedio antes de cerrar el pladur' },
    excerpt: {
      rendered:
        'Descubre cómo subsanar errores de sellado a coste casi cero durante la fase de estructura, evitando sobrecostes irreversibles tras colocar los acabados interiores.',
    },
    link: '#',
    featured_media_url: '/images/technician_thermal_test.jpg',
    category_name: 'Guía Técnica',
  },
];

const DEFAULT_WP_SITE = 'https://laprueba28.wordpress.com';

export const BlogPosts: React.FC = () => {
  const [wpUrl, setWpUrl] = useState<string>(DEFAULT_WP_SITE);
  const [posts, setPosts] = useState<WordPressPost[]>(SAMPLE_POSTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>('');
  const [isUsingCustomUrl, setIsUsingCustomUrl] = useState<boolean>(true);

  const resolveWpEndpoint = (rawUrl: string): string => {
    let clean = rawUrl.trim().replace(/\/+$/, '');
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = `https://${clean}`;
    }
    try {
      const parsed = new URL(clean);
      if (parsed.hostname.endsWith('wordpress.com')) {
        return `https://public-api.wordpress.com/wp/v2/sites/${parsed.hostname}/posts?per_page=3&_embed=true`;
      }
      return `${parsed.origin}/wp-json/wp/v2/posts?per_page=3&_embed=true`;
    } catch {
      return `https://public-api.wordpress.com/wp/v2/sites/laprueba28.wordpress.com/posts?per_page=3&_embed=true`;
    }
  };

  const fetchWordPressPosts = async (urlToFetch: string) => {
    if (!urlToFetch.trim()) {
      setPosts(SAMPLE_POSTS);
      setIsUsingCustomUrl(false);
      setFetchError('');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setFetchError('');

    try {
      const targetApiUrl = resolveWpEndpoint(urlToFetch);
      
      // Intentamos primero a través del proxy nativo de Cloudflare Pages (/api/posts),
      // y si falla (por ejemplo en previsualización local) consultamos directamente a la API pública de WordPress
      let res: Response | null = null;
      try {
        if (urlToFetch === DEFAULT_WP_SITE) {
          const proxyRes = await fetch('/api/posts');
          if (proxyRes.ok) {
            res = proxyRes;
          }
        }
      } catch {
        // Fallback a API directa
      }

      if (!res) {
        res = await fetch(targetApiUrl);
      }

      if (!res.ok) {
        throw new Error(`Respuesta de WordPress: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No se encontraron artículos publicados en ese sitio de WordPress.');
      }

      // Mapeo estructurado de los artículos de WordPress
      const mappedPosts: WordPressPost[] = data.slice(0, 3).map((item: any) => {
        let mediaUrl = '';
        try {
          mediaUrl = item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
        } catch {
          mediaUrl = '';
        }

        let category = 'Artículo';
        try {
          category = item._embedded?.['wp:term']?.[0]?.[0]?.name || 'Ensayo Blowerdoor';
        } catch {
          category = 'Ensayo Blowerdoor';
        }

        return {
          id: item.id,
          date: item.date,
          title: item.title,
          excerpt: item.excerpt,
          link: item.link,
          featured_media_url: mediaUrl || '/images/blower_door_model3_web_optimizada.webp',
          category_name: category,
        };
      });

      setPosts(mappedPosts);
      setIsUsingCustomUrl(true);
    } catch (err: any) {
      console.warn('[N50.es] Advertencia cargando posts de WordPress:', err.message);
      setFetchError(
        `No se pudieron sincronizar los artículos en vivo (${err.message}). Mostrando artículos técnicos de respaldo.`
      );
      // Mantenemos los artículos de respaldo si hay algún error puntual de red
      setPosts(SAMPLE_POSTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWordPressPosts(DEFAULT_WP_SITE);
  }, []);

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWordPressPosts(wpUrl);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const cleanHtml = (htmlStr: string) => {
    if (!htmlStr) return '';
    try {
      const doc = new DOMParser().parseFromString(htmlStr, 'text/html');
      return doc.body.textContent || htmlStr.replace(/<[^>]*>?/gm, '').trim();
    } catch {
      return htmlStr.replace(/<[^>]*>?/gm, '').trim();
    }
  };

  return (
    <section id="blog" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono font-bold tracking-widest text-[#E30613] uppercase">
              Actualidad técnica & WordPress REST API
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Artículos técnicos, guías y casos de ensayo
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Contenido especializado sobre hermeticidad, estándar Passivhaus y termografía conectado
              directamente con tu gestor de contenidos <strong>WordPress</strong>.
            </p>
          </div>

          {/* WordPress Connector Toolbar */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs max-w-md w-full">
            <div className="text-[11px] font-semibold text-slate-700 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#142E43]" />
                <span>Conectar tu WordPress en vivo:</span>
              </span>
              {isUsingCustomUrl && (
                <span className="text-[10px] font-mono text-emerald-600 font-bold">Conectado</span>
              )}
            </div>

            <form onSubmit={handleTestSubmit} className="flex gap-2">
              <input
                type="url"
                value={wpUrl}
                onChange={(e) => setWpUrl(e.target.value)}
                placeholder="https://tu-wordpress.com"
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#E30613] bg-slate-50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#142E43] hover:bg-slate-800 rounded-lg transition-colors shrink-0 flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>Conectar</span>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
              <span>Usa la REST API nativa: <code>/wp-json/wp/v2/posts</code></span>
              {isUsingCustomUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setWpUrl('');
                    fetchWordPressPosts('');
                  }}
                  className="text-[#E30613] hover:underline"
                >
                  Restablecer
                </button>
              )}
            </div>
          </div>
        </div>

        {fetchError && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">{fetchError}</span>
              <p className="text-[11px] text-amber-700">
                <strong>Solución rápida:</strong> En WordPress, añade la cabecera CORS en <code>functions.php</code> o usa nuestra función de Cloudflare Pages (<code>/functions/api/posts.js</code>) que actúa como proxy y caché automático.
              </p>
            </div>
          </div>
        )}

        {/* 3 Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={post.featured_media_url || '/images/blower_door_model3_web_optimizada.webp'}
                    alt={cleanHtml(post.title.rendered)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {post.category_name && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#142E43] font-bold text-[10px] font-mono px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                      {post.category_name}
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDate(post.date)}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E30613] transition-colors leading-snug line-clamp-2">
                    {cleanHtml(post.title.rendered)}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {cleanHtml(post.excerpt.rendered)}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                <a
                  href={post.link}
                  target={post.link === '#' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#142E43] group-hover:text-[#E30613] transition-colors pt-4"
                >
                  <span>Leer artículo completo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
