import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, RefreshCw, AlertCircle, Globe, CheckCircle, ExternalLink, BookOpen } from 'lucide-react';
import { WordPressPost } from '../types';

interface BlogPostsProps {
  onSelectPost?: (post: WordPressPost) => void;
}

// 3 artículos reales de https://laprueba28.wordpress.com precargados
const INITIAL_WORDPRESS_POSTS: WordPressPost[] = [
  {
    id: 27,
    slug: 'indiferente-es-lo-peor-para-desperdiciar',
    date: '2026-11-07T14:40:00',
    title: { rendered: 'Indiferente es lo peor para desperdiciar' },
    excerpt: {
      rendered:
        'Criterios esenciales de hermeticidad y envolvente térmica en ensayos Blowerdoor: por qué la indiferencia en el sellado de juntas multiplica las pérdidas energéticas y cómo auditar cada infiltración.',
    },
    content: {
      rendered: `
        <p>En edificación Passivhaus y arquitectura de alta eficiencia, la indiferencia frente a las infiltraciones parásitas es el factor de mayor sobrecoste en climatización a lo largo del ciclo de vida del edificio.</p>
        <h2>¿Por qué la estanqueidad al aire no puede ser negociable?</h2>
        <p>Cuando el aire exterior atraviesa la envolvente sin control a través de cajas de persiana no estancas, pasos de tuberías o encuentros entre carpintería y fábrica, no solo se escapa energía calorífica:</p>
        <ul>
          <li><strong>Condensaciones intersticiales:</strong> El aire interior cargado de vapor condensa al contactar con puntos fríos de la estructura, degradando aislamientos térmicos y pudriendo entramados de madera.</li>
          <li><strong>Confort acústico comprometido:</strong> Donde entra el aire, entra el ruido del tráfico y del entorno urbano.</li>
          <li><strong>Ineficacia de la ventilación mecánica:</strong> Los recuperadores de calor de doble flujo pierden drásticamente su rendimiento si la envolvente no alcanza al menos n50 &le; 1,0 h⁻¹ (o &le; 0,60 h⁻¹ en Passivhaus).</li>
        </ul>
        <blockquote>Un ensayo Blowerdoor intermedio ejecutado antes de cerrar los trasdosados permite identificar y sellar el 95% de los puntos críticos a coste prácticamente nulo.</blockquote>
        <p>En N50.es realizamos ensayos con la instrumentación Minneapolis BlowerDoor estándar mundial, garantizando mediciones rigurosas bajo norma UNE-EN ISO 9972.</p>
      `,
    },
    URL: 'https://laprueba28.wordpress.com/2026/11/07/indiferente-es-lo-peor-para-desperdiciar/',
    link: 'https://laprueba28.wordpress.com/2026/11/07/indiferente-es-lo-peor-para-desperdiciar/',
    featured_media_url: 'https://laprueba28.wordpress.com/wp-content/uploads/2026/11/comparar-2-presupuestos.jpg',
    category_name: 'Eficiencia',
  },
  {
    id: 25,
    slug: 'precios-o-viviendas-que-es-lo-que-comparas',
    date: '2026-11-07T14:20:00',
    title: { rendered: 'Precios o viviendas, ¿qué es lo que comparas?' },
    excerpt: {
      rendered:
        'Al comparar presupuestos de construcción o ensayos Blowerdoor, comparar únicamente el precio sin verificar la metodología UNE-EN ISO 9972 y la calibración del equipo puede salir muy caro.',
    },
    content: {
      rendered: `
        <p>Al analizar dos ofertas para certificar o auditar la envolvente térmica de un edificio, a menudo se compara una cifra aislada en euros. Sin embargo, lo que realmente estás comparando es el confort futuro y la durabilidad de tu vivienda.</p>
        <h2>Diferencias críticas en un ensayo de hermeticidad profesional</h2>
        <p>Un ensayo Blowerdoor de bajo coste suele omitir la localización minuciosa de fugas y limitarse a un valor numérico puntual. Por contra, un ensayo integral incluye:</p>
        <ol>
          <li><strong>Presurización y despresurización combinada:</strong> Determinación de la curva exponencial de flujo en un rango de 10 a 60 Pa.</li>
          <li><strong>Inspección termográfica FLIR infrarroja:</strong> Visualización simultánea del patrón de corrientes frías en invierno.</li>
          <li><strong>Generación de humo trazador cinemático:</strong> Identificación milimétrica de puentes de aire en carpinterías y membranas.</li>
        </ol>
        <p>Exige siempre calibración oficial vigente de los manómetros digitales DG-1000 y técnicos acreditados en el estándar Passivhaus y el Código Técnico de la Edificación (CTE DB-HE).</p>
      `,
    },
    URL: 'https://laprueba28.wordpress.com/2026/11/07/precios-o-viviendas-que-es-lo-que-comparas/',
    link: 'https://laprueba28.wordpress.com/2026/11/07/precios-o-viviendas-que-es-lo-que-comparas/',
    featured_media_url: 'https://laprueba28.wordpress.com/wp-content/uploads/2026/11/3-infografia-no-elijas.jpg',
    category_name: 'Guía de Compra',
  },
  {
    id: 19,
    slug: 'predecir-el-gasto',
    date: '2026-11-07T13:07:38',
    title: { rendered: 'Predecir el gasto energético antes de habitar' },
    excerpt: {
      rendered:
        'Cómo el test de hermeticidad a 50 Pascales permite proyectar con precisión milimétrica la factura real de calefacción y refrigeración antes de entregar las llaves de la obra.',
    },
    content: {
      rendered: `
        <p>¿Es posible saber cuánto costará mantener una casa a 21°C en pleno invierno antes de entrar a vivir? La respuesta técnica es sí, siempre que se mida la tasa de renovación de aire a 50 Pascales (n50).</p>
        <h2>El factor oculto en los cálculos energéticos</h2>
        <p>Los programas de simulación energética (como PHPP o HULC) asumen un valor teórico de infiltraciones. Si la obra real tiene una tasa de n50 de 3,5 h⁻¹ en lugar del 0,6 h⁻¹ previsto, la demanda de calefacción se duplica de forma automática.</p>
        <p>Medir con exactitud mediante el ensayo Blowerdoor transforma suposiciones en certezas ingenieriles, asegurando que la hipoteca energética mensual sea tan baja como la proyectada.</p>
      `,
    },
    URL: 'https://laprueba28.wordpress.com/2026/11/07/predecir-el-gasto/',
    link: 'https://laprueba28.wordpress.com/2026/11/07/predecir-el-gasto/',
    featured_media_url: 'https://laprueba28.wordpress.com/wp-content/uploads/2026/11/blower_door_model3_web_optimizada.webp',
    category_name: 'Cálculo Técnico',
  },
];

const DEFAULT_WP_SITE = 'https://laprueba28.wordpress.com';

export const BlogPosts: React.FC<BlogPostsProps> = ({ onSelectPost }) => {
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

      // Consulta directa a la API REST de WordPress.com
      const res = await fetch(targetApiUrl);
      if (!res.ok) {
        throw new Error(`WordPress respondió con código ${res.status}`);
      }

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('La respuesta del servidor no es un JSON válido');
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No se encontraron artículos en este sitio de WordPress');
      }

      // Mapeamos los campos del API incluyendo slug y content completo para lectura nativa en n50.es
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

        const postUrl = item.URL || item.link || item.url || '';
        const postSlug = item.slug || String(item.id);

        return {
          id: item.id,
          slug: postSlug,
          date: item.date,
          title: item.title,
          excerpt: item.excerpt, // Resumen para las tarjetas
          content: item.content || { rendered: item.excerpt?.rendered || '' }, // Contenido íntegro para lectura nativa
          URL: postUrl,
          link: postUrl,
          featured_media_url: mediaUrl || '/images/blower_door_model3_web_optimizada.webp',
          category_name: category,
        };
      });

      setPosts(mappedPosts);
      setIsLiveConnected(true);
      setFetchError('');
    } catch (err: any) {
      console.warn('[N50.es] Error consultando WordPress API:', err.message);
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

  const handleCardClick = (post: WordPressPost) => {
    if (onSelectPost) {
      onSelectPost(post);
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
                Artículos completos en n50.es · SEO Unificado
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Últimos artículos del blog
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Publicaciones técnicas sobre hermeticidad, ahorro energético y ensayos Blowerdoor. Haz clic en
              cualquier artículo para leer el <strong>contenido completo</strong> dentro de N50.es con canónica oficial.
            </p>
          </div>

          {/* WordPress Connector Toolbar */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs max-w-md w-full">
            <div className="text-[11px] font-semibold text-slate-700 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#142E43]" />
                <span>Origen WordPress sincronizado:</span>
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
                <span>Ver blog en laprueba28.wordpress.com</span>
                <ExternalLink className="w-3 h-3" />
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
              onClick={() => handleCardClick(post)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Imagen destacada: Al hacer clic abre el artículo completo dentro de la app */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={post.featured_media_url || '/images/blower_door_model3_web_optimizada.webp'}
                    alt={cleanHtml(post.title.rendered)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {post.category_name && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#142E43] font-bold text-[10px] font-mono px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs pointer-events-none">
                      {post.category_name}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#E30613]" />
                    <span>Leer en n50.es</span>
                  </div>
                </div>

                {/* Contenido de la tarjeta: Título y post.excerpt (resumen corto para la cuadrícula) */}
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

              {/* Botón de acción: Abrir artículo completo en la app */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(post);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#142E43] group-hover:text-[#E30613] transition-colors pt-4 cursor-pointer"
                >
                  <span>Leer artículo completo</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                {post.URL && (
                  <a
                    href={post.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Ver entrada en WordPress original"
                    className="pt-4 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
