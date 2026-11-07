import React, { useState, useEffect } from 'react';
import { Calendar, ArrowUpRight, RefreshCw, AlertCircle, Globe, CheckCircle } from 'lucide-react';

interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  featured_media_url?: string;
  category_name?: string;
}

// 3 artículos reales de https://laprueba28.wordpress.com precargados para visualización instantánea sin latencia
const INITIAL_WORDPRESS_POSTS: WordPressPost[] = [
  {
    id: 19,
    date: '2026-11-07T13:07:38',
    title: { rendered: 'Predecir el gasto' },
    excerpt: {
      rendered:
        'Añade la ciudad de Gijón a la lista. Cambia también el nombre de la empresa por N50 Blowerdoor Test y optimiza el presupuesto energético de tu vivienda.',
    },
    link: 'https://laprueba28.wordpress.com/2026/11/07/predecir-el-gasto/',
    featured_media_url: 'https://laprueba28.wordpress.com/wp-content/uploads/2026/11/comparar-2-presupuestos.jpg',
    category_name: 'Eficiencia',
  },
  {
    id: 16,
    date: '2026-11-07T13:05:53',
    title: { rendered: 'Cómo ahorrar en energía' },
    excerpt: {
      rendered:
        'Elimina las corrientes de aire involuntarias y las infiltraciones parásitas para reducir la factura energética y optimizar la climatización en obra nueva y reformas.',
    },
    link: 'https://laprueba28.wordpress.com/2026/11/07/como-ahorrar-en-energia/',
    featured_media_url: 'https://laprueba28.wordpress.com/wp-content/uploads/2026/11/3-infografia-no-elijas.jpg',
    category_name: 'Ahorro',
  },
  {
    id: 7,
    date: '2026-11-07T13:04:35',
    title: { rendered: 'Medir frente a intuir' },
    excerpt: {
      rendered:
        'El ensayo Blowerdoor permite cuantificar con exactitud matemática las infiltraciones reales de la envolvente en lugar de basarse en estimaciones teóricas.',
    },
    link: 'https://laprueba28.wordpress.com/2026/11/07/medir-frente-a-intuir/',
    featured_media_url: 'https://laprueba28.wordpress.com/wp-content/uploads/2026/11/blower_door_model3_web_optimizada.webp',
    category_name: 'Técnica',
  },
];

const DEFAULT_WP_SITE = 'https://laprueba28.wordpress.com';

export const BlogPosts: React.FC = () => {
  const [wpUrl, setWpUrl] = useState<string>(DEFAULT_WP_SITE);
  const [posts, setPosts] = useState<WordPressPost[]>(INITIAL_WORDPRESS_POSTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);

  // Convierte cualquier URL de WordPress a su endpoint REST JSON válido
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
      setPosts(INITIAL_WORDPRESS_POSTS);
      setFetchError('');
      setIsLiveConnected(false);
      return;
    }

    setIsLoading(true);
    setFetchError('');

    try {
      const targetApiUrl = resolveWpEndpoint(urlToFetch);

      // Consulta directa a la API REST pública de WordPress (con soporte nativo para CORS)
      const res = await fetch(targetApiUrl);
      
      if (!res.ok) {
        throw new Error(`WordPress respondió con código ${res.status}`);
      }

      // Verificamos que la respuesta sea realmente JSON para evitar errores por páginas HTML de error
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('La respuesta del servidor no es un JSON válido');
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No se encontraron artículos en este sitio de WordPress');
      }

      // Mapeamos los campos del API de WordPress
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
      setIsLiveConnected(true);
      setFetchError('');
    } catch (err: any) {
      console.warn('[N50.es] Error consultando WordPress API:', err.message);
      // Mantenemos los artículos precargados si hay fallo de conexión puntual
      setFetchError(`No se pudieron sincronizar los artículos en vivo: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Sincronización en segundo plano al montar el componente
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
      return (doc.body.textContent || '').replace(/\[&hellip;\]/g, '...').trim();
    } catch {
      return htmlStr.replace(/<[^>]*>?/gm, '').replace(/\[&hellip;\]/g, '...').trim();
    }
  };

  return (
    <section id="blog" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E30613] uppercase">
              <span>Blog Técnico & Actualidad</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 font-semibold normal-case font-sans text-[11px]">
                Sincronizado con laprueba28.wordpress.com
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Últimos artículos del blog
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Publicaciones técnicas sobre hermeticidad, ahorro energético y ensayos Blowerdoor sincronizadas
              en tiempo real desde tu blog de WordPress.
            </p>
          </div>

          {/* WordPress Connector Toolbar */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs max-w-md w-full">
            <div className="text-[11px] font-semibold text-slate-700 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#142E43]" />
                <span>Origen WordPress:</span>
              </span>
              {isLiveConnected && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Conectado en vivo
                </span>
              )}
            </div>

            <form onSubmit={handleTestSubmit} className="flex gap-2">
              <input
                type="url"
                value={wpUrl}
                onChange={(e) => setWpUrl(e.target.value)}
                placeholder="https://laprueba28.wordpress.com"
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#E30613] bg-slate-50 font-mono text-slate-700"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#142E43] hover:bg-slate-800 rounded-lg transition-colors shrink-0 flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>Actualizar</span>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
              <a
                href="https://laprueba28.wordpress.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E30613] hover:underline flex items-center gap-1"
              >
                <span>Visitar blog completo en laprueba28.wordpress.com</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {fetchError && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">{fetchError}</span>
              <p className="text-[11px] text-amber-700">
                Se siguen mostrando los artículos más recientes almacenados en caché.
              </p>
            </div>
          </div>
        )}

        {/* 3 Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Featured Image */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#142E43] group-hover:text-[#E30613] transition-colors pt-4"
                >
                  <span>Leer artículo en el blog</span>
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
