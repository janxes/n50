// /functions/api/submit.ts - Cloudflare Pages Function (Worker)
// Intercepta los envíos del formulario de contacto y los remite a hola@n50.es usando Resend

interface Env {
  RESEND_API_KEY?: string;
  RESEND_TO_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
}

interface ContactPayload {
  nombre: string;
  email: string;
  telefono?: string;
  comunidad?: string;
  localidad?: string;
  tipoInmueble?: string;
  superficieM2?: string;
  faseObra?: string;
  objetivo?: string;
  mensaje?: string;
  detalles?: string;
  ensayoRecomendado?: string;
}

// Soporte para peticiones previas de comprobación de CORS (Preflight)
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Manejador del envío POST
export async function onRequestPost(context: { request: Request; env: Env }) {
  const corsHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const data: ContactPayload = await context.request.json();

    // Validación básica de campos requeridos
    if (!data.nombre?.trim() || !data.email?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Por favor, completa al menos tu nombre y correo electrónico.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const apiKey = context.env.RESEND_API_KEY;

    // Mensaje combinado de detalles/mensaje
    const userMessage = data.mensaje || data.detalles || 'Sin especificaciones adicionales.';

    // Si aún no se ha configurado la variable RESEND_API_KEY en Cloudflare, registramos y devolvemos OK
    if (!apiKey) {
      console.warn(
        '[N50.es] Clave RESEND_API_KEY no detectada. Registro simulado para hola@n50.es:',
        data
      );
      return new Response(
        JSON.stringify({
          success: true,
          simulated: true,
          message: 'Solicitud registrada correctamente en Cloudflare Pages.',
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // Envío del correo mediante la API de Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'N50.es Web <web@n50.es>',
        to: [context.env.RESEND_TO_EMAIL || 'janxes@gmail.com'],
        reply_to: data.email,
        subject: `Nuevo Ensayo Blowerdoor: ${data.nombre} (${data.comunidad || 'Consulta Web'})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #111111; padding: 20px; text-align: center; border-bottom: 3px solid #E30613;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">N50.es · SOLICITUD DE ENSAYO BLOWERDOOR</h1>
            </div>
            <div style="padding: 24px; background-color: #ffffff;">
              <h2 style="color: #142E43; font-size: 16px; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 8px;">Datos de Contacto del Cliente</h2>
              <p style="margin: 6px 0;"><strong>Nombre:</strong> ${data.nombre}</p>
              <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #E30613;">${data.email}</a></p>
              <p style="margin: 6px 0;"><strong>Teléfono:</strong> ${data.telefono || 'No facilitado'}</p>
              <p style="margin: 6px 0;"><strong>Comunidad / Territorio:</strong> ${data.comunidad || 'No especificada'}</p>
              <p style="margin: 6px 0;"><strong>Municipio / Localidad:</strong> ${data.localidad || 'No indicado'}</p>

              <h2 style="color: #142E43; font-size: 16px; margin-top: 20px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Detalles del Inmueble y Ensayo</h2>
              <p style="margin: 6px 0;"><strong>Tipo de inmueble:</strong> ${data.tipoInmueble || 'No especificado'}</p>
              <p style="margin: 6px 0;"><strong>Superficie aproximada:</strong> ${data.superficieM2 ? `${data.superficieM2} m²` : 'No indicada'}</p>
              <p style="margin: 6px 0;"><strong>Fase de obra:</strong> ${data.faseObra || 'No especificada'}</p>
              <p style="margin: 6px 0;"><strong>Objetivo:</strong> ${data.objetivo || 'Estándar'}</p>
              ${data.ensayoRecomendado ? `<p style="margin: 6px 0; color: #E30613;"><strong>Ensayo sugerido por el calculador:</strong> ${data.ensayoRecomendado}</p>` : ''}

              <h2 style="color: #142E43; font-size: 16px; margin-top: 20px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Mensaje o Comentarios del Cliente</h2>
              <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 14px; white-space: pre-wrap;">
                ${userMessage}
              </div>
            </div>
            <div style="background-color: #f1f5f9; padding: 12px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
              Enviado automáticamente desde el formulario web de <a href="https://n50.es" style="color: #142E43; text-decoration: none; font-weight: bold;">N50.es</a>
            </div>
          </div>
        `,
      }),
    });

    if (resendResponse.ok) {
      const resendData = await resendResponse.json();
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Solicitud enviada correctamente',
          id: resendData.id,
        }),
        { status: 200, headers: corsHeaders }
      );
    } else {
      const errorText = await resendResponse.text();
      console.error('[N50.es] Error de Resend API:', errorText);

      // Parseamos el mensaje exacto de Resend para mostrarlo con total transparencia
      let detailedError = 'Error al enviar el correo a través de Resend.';
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          detailedError = errorJson.message;
        }
      } catch {
        detailedError = errorText || detailedError;
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: detailedError,
          raw: errorText,
        }),
        { status: resendResponse.status, headers: corsHeaders }
      );
    }
  } catch (error: any) {
    console.error('[N50.es] Error interno en submit.ts:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Error interno del servidor procesando el formulario.',
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
