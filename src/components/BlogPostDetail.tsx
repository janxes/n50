import React, { useEffect, useState } from 'react';
import { WordPressPost } from '../types';
import { ArrowLeft, Calendar, Clock, Share2, Check, ArrowRight, ShieldCheck, Bookmark, ExternalLink } from 'lucide-react';

interface BlogPostDetailProps {
  post: WordPressPost;
  onBack: () => void;
  onGoToContact: () => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack, onGoToContact }) => {
  const [copiedCanonical, setCopiedCanonical] = useState(false);

  const cleanSlug = post.slug.replace(/^\/+/, '');
  const canonicalUrl = `https://n50.es/${cleanSlug}`;

  const cleanHtml = (htmlStr: string) => {
    if (!htmlStr) return '';
    try {
      const doc = new DOMParser().parseFromString(htmlStr, 'text/html');
      return (doc.body.textContent || '').replace(/\[&hellip;\]/g, '...').trim();
    } catch {
      return htmlStr.replace(/<[^>]*>?/gm, '').replace(/\[&hellip;\]/g, '...').trim();
    }
  };

  const decodedTitle = cleanHtml(post.title?.rendered || '');
  const decodedExcerpt = cleanHtml(post.excerpt?.rendered || '').slice(0, 160);

  // Inyección estricta de SEO y Canonical Tag en <head>
  useEffect(() => {
    // 1. Canonical Link: <link rel="canonical" href="https://n50.es[slug-del-post]" />
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const originalCanonical = canonicalLink ? canonicalLink.getAttribute('href') : 'https://n50.es/';

    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 2. Título de la página
    const originalTitle = document.title;
    document.title = `${decodedTitle} | N50.es Blowerdoor Test`;

    // 3. Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute('content', decodedExcerpt);
    }

    // 4. OpenGraph tags
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', decodedTitle);

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    let ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (ogImage && post.featured_media_url) {
      ogImage.setAttribute('content', post.featured_media_url);
    }

    // 5. Schema.org Article / BlogPosting para motores de búsqueda
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'article-structured-data';
    schemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: decodedTitle,
      description: decodedExcerpt,
      image: post.featured_media_url || 'https://n50.es/images/blower_door_model3_web_optimizada.webp',
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      author: {
        '@type': 'Organization',
        name: 'N50.es Blowerdoor Test',
        url: 'https://n50.es',
      },
      publisher: {
        '@type': 'Organization',
        name: 'N50.es Blowerdoor Test',
        logo: {
          '@type': 'ImageObject',
          url: 'https://n50.es/logo-n50.png',
        },
      },
    });
    document.head.appendChild(schemaScript);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      // Restauración de SEO al salir del artículo
      if (canonicalLink) {
        canonicalLink.setAttribute('href', originalCanonical || 'https://n50.es/');
      }
      document.title = originalTitle || 'N50.es Blowerdoor Test - Ensayos de Hermeticidad';
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
      if (ogUrl) ogUrl.setAttribute('content', 'https://n50.es/');
      schemaScript.remove();
    };
  }, [canonicalUrl, decodedTitle, decodedExcerpt, post.date, post.featured_media_url]);

  const handleCopyCanonical = () => {
    navigator.clipboard.writeText(canonicalUrl);
    setCopiedCanonical(true);
    setTimeout(() => setCopiedCanonical(false), 2500);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const readingMinutes = Math.max(
    1,
    Math.round(cleanHtml(post.content?.rendered || '').split(/\s+/).length / 180)
  );

  return (
    <article className="min-h-screen bg-slate-50 py-12 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumbs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-[#E30613] bg-white rounded-lg border border-slate-200 shadow-xs hover:border-[#E30613] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a todos los artículos</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Inicio</span>
            <span>/</span>
            <button onClick={onBack} className="hover:text-slate-800 cursor-pointer">
              Blog
            </button>
            <span>/</span>
            <span className="text-[#E30613] font-semibold truncate max-w-[200px]">
              {post.slug}
            </span>
          </div>
        </div>

        {/* Article Header Card */}
        <header className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="bg-[#142E43] text-white font-mono text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                {post.category_name || 'Ingeniería Passivhaus'}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SEO Canónico Oficial n50.es</span>
              </span>
            </div>

            <button
              onClick={handleCopyCanonical}
              title="Copiar URL canónica oficial"
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer"
            >
              {copiedCanonical ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">¡Canónica copiada!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copiar enlace canónico</span>
                </>
              )}
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {decodedTitle}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Publicado el {formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Lectura estimada: ~{readingMinutes} min</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Canónica: {canonicalUrl}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_media_url && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md">
            <img
              src={post.featured_media_url}
              alt={decodedTitle}
              className="w-full max-h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Full Article Content from post.content.rendered */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-12 shadow-xs mb-12">
          <div
            className="article-html-content"
            dangerouslySetInnerHTML={{ __html: post.content?.rendered || post.excerpt?.rendered || '' }}
          />

          {/* WordPress Reference Footnote */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-2xl">
            <div>
              <span className="font-semibold text-slate-700">Identificador canónico:</span>{' '}
              <code className="text-[#E30613] font-mono">{canonicalUrl}</code>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Publicación sincronizada con el gestor de contenidos WordPress ({post.URL || 'laprueba28.wordpress.com'})
              </p>
            </div>
            {post.URL && (
              <a
                href={post.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#142E43] hover:text-[#E30613] font-semibold transition-colors shrink-0"
              >
                <span>Ver entrada en WordPress original</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* CTA Conversion Banner at End of Article */}
        <section className="bg-gradient-to-r from-[#142E43] to-slate-900 rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-l-8 border-[#E30613]">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#E30613]">
              Asegura tu envolvente térmica y Passivhaus
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              ¿Quieres comprobar la estanqueidad real de tu proyecto?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Realizamos ensayos Blowerdoor oficiales UNE-EN ISO 9972 y detección termográfica de fugas
              en Madrid, Castilla y León, Asturias, Cantabria y Euskadi.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onBack();
                setTimeout(() => {
                  const elem = document.getElementById('contacto');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#E30613] hover:bg-[#c30510] active:scale-[0.98] transition-all rounded-xl shadow-md cursor-pointer"
            >
              <span>Pedir Presupuesto</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-bold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all cursor-pointer"
            >
              <span>Más Artículos</span>
            </button>
          </div>
        </section>
      </div>
    </article>
  );
};
