export interface QuoteFormData {
  nombre: string;
  email: string;
  telefono: string;
  comunidad: string;
  localidad: string;
  tipoInmueble: string;
  superficieM2: string;
  faseObra: string;
  objetivo: string;
  detalles: string;
  ensayoRecomendado?: string;
}

export type InspectionMode = 'normal' | 'termografia' | 'humo' | 'anemometro';

export interface RegionalZone {
  id: string;
  nombre: string;
  subtitulo: string;
  ciudades: string[];
  zonaClimaticaCTE: string;
  vientoPredominante: string;
  particularidadTecnica: string;
  disponibilidad: string;
}

export interface WordPressPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  URL: string;
  link?: string;
  featured_media_url?: string;
  category_name?: string;
}
