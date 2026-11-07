// /functions/api/posts.js - Cloudflare Pages Function (Worker)
// Integra artículos de WordPress mediante su REST API con caché en el CDN de Cloudflare
// Esto resuelve CORS automáticamente y asegura una carga instantánea (<30ms).

export async function onRequestGet(context) {
  // Configura aquí la URL de WordPress (o defínela en variables de Cloudflare: WP_API_URL)
  const wpBaseUrl = context.env.WP_API_URL || 'https://laprueba28.wordpress.com';
  
  // Soporte tanto para sitios alojados en WordPress.com como para instalaciones auto-alojadas (self-hosted)
  let targetUrl = '';
  try {
    const parsedUrl = new URL(wpBaseUrl.startsWith('http') ? wpBaseUrl : `https://${wpBaseUrl}`);
    if (parsedUrl.hostname.endsWith('wordpress.com')) {
      targetUrl = `https://public-api.wordpress.com/wp/v2/sites/${parsedUrl.hostname}/posts?per_page=3&_embed=true`;
    } else {
      targetUrl = `${parsedUrl.origin}/wp-json/wp/v2/posts?per_page=3&_embed=true`;
    }
  } catch {
    targetUrl = 'https://public-api.wordpress.com/wp/v2/sites/laprueba28.wordpress.com/posts?per_page=3&_embed=true';
  }

  try {
    const cache = caches.default;
    const cacheKey = new Request(context.request.url, context.request);
    let response = await cache.match(cacheKey);

    if (!response) {
      // Consulta a la REST API de WordPress
      const wpResponse = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'CloudflarePages-N50-Bot/1.0',
          'Accept': 'application/json',
        },
      });

      if (!wpResponse.ok) {
        return new Response(
          JSON.stringify({ error: `Error en WordPress: ${wpResponse.status}` }),
          {
            status: wpResponse.status,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      const posts = await wpResponse.json();

      response = new Response(JSON.stringify(posts), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          // Caché en borde durante 1 hora (3600s), con stale-while-revalidate de 24h
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          'Access-Control-Allow-Origin': '*',
        },
      });

      // Guardar en caché de Cloudflare
      context.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || 'Error de conexión con WordPress' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
