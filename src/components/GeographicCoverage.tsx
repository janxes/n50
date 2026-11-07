import React, { useState } from 'react';
import { MapPin, ThermometerSnowflake, Wind, Navigation, CheckCircle2 } from 'lucide-react';
import { RegionalZone } from '../types';

export const GeographicCoverage: React.FC = () => {
  const zones: RegionalZone[] = [
    {
      id: 'madrid',
      nombre: 'Madrid y Alrededores',
      subtitulo: 'Base Operativa y Sede Central',
      ciudades: ['Madrid Capital', 'Sierra de Guadarrama', 'Corredor del Henares', 'Zona Sur y Oeste'],
      zonaClimaticaCTE: 'D3 (Continental templado con inviernos fríos y veranos cálidos)',
      vientoPredominante: 'Cargas térmicas extremas verano/invierno',
      particularidadTecnica:
        'Respuesta inmediata en obra para viviendas unifamiliares de diseño y promociones Passivhaus. Desplazamientos directos sin costes de pernocta en toda la Comunidad.',
      disponibilidad: 'Servicio continuo en 24-48 horas',
    },
    {
      id: 'cyl',
      nombre: 'Castilla y León',
      subtitulo: 'Valladolid, Burgos, León, Salamanca, Palencia, Zamora, Segovia, Soria, Ávila',
      ciudades: ['Valladolid', 'Burgos', 'León', 'Salamanca', 'Palencia', 'Segovia', 'Ávila', 'Zamora', 'Soria'],
      zonaClimaticaCTE: 'D3 y E1 (Clima continental severo, heladas recurrentes)',
      vientoPredominante: 'Fuertes diferenciales de presión barométrica en invierno',
      particularidadTecnica:
        'En zonas E1 y D3, una infiltración descontrolada arruina el rendimiento térmico de cualquier bomba de calor o aerotermia. La hermeticidad es el mayor factor de amortización energética en la meseta norte.',
      disponibilidad: 'Rutas técnicas semanales programadas',
    },
    {
      id: 'asturias',
      nombre: 'Principado de Asturias',
      subtitulo: 'Oviedo, Gijón, Avilés y comarcas interiores',
      ciudades: ['Oviedo', 'Gijón', 'Avilés', 'Siero', 'Llanes', 'Cangas de Onís', 'Cuencas'],
      zonaClimaticaCTE: 'C1 / D1 (Clima oceánico templado y húmedo)',
      vientoPredominante: 'Vientos atlánticos constantes y alta pluviometría',
      particularidadTecnica:
        'En clima atlántico, las infiltraciones de aire introducen vapor de agua en el cerramiento, provocando condensaciones ocultas en aislamientos de lana y moho. La barrera estanca protege la vida útil de la estructura.',
      disponibilidad: 'Desplazamiento directo coordinado',
    },
    {
      id: 'cantabria',
      nombre: 'Cantabria',
      subtitulo: 'Santander, Torrelavega, Castro Urdiales y valles',
      ciudades: ['Santander', 'Torrelavega', 'Castro Urdiales', 'Camargo', 'Laredo', 'Valles Pasiegos'],
      zonaClimaticaCTE: 'C1 (Clima húmedo costero con temporales de viento)',
      vientoPredominante: 'Vientos dominantes del noroeste y efecto sur',
      particularidadTecnica:
        'La exposición marítima y los episodios de viento sur generan presiones dinámicas severas sobre la fachada. El test Blowerdoor a 50 Pa garantiza que los cajones de persiana y carpinterías no silben ni filtren aire.',
      disponibilidad: 'Desplazamiento directo coordinado',
    },
    {
      id: 'euskadi',
      nombre: 'Euskadi (País Vasco)',
      subtitulo: 'Bilbao (Bizkaia), San Sebastián (Gipuzkoa) y Vitoria-Gasteiz (Álava)',
      ciudades: ['Bilbao', 'Donostia-San Sebastián', 'Vitoria-Gasteiz', 'Getxo', 'Barakaldo', 'Irun', 'Durangaldea'],
      zonaClimaticaCTE: 'C1 (Costa Bizkaia/Gipuzkoa) y D1/D2 (Llanada Alavesa)',
      vientoPredominante: 'Alta exigencia en arquitectura de madera contralaminada (CLT)',
      particularidadTecnica:
        'Territorio pionero en estándar Passivhaus y construcción industrializada en madera técnica. Exigencia habitual de sellado intermedio exhaustivo antes de certificar la envolvente.',
      disponibilidad: 'Desplazamiento directo coordinado',
    },
  ];

  const [activeZone, setActiveZone] = useState<RegionalZone>(zones[0]);

  return (
    <section id="cobertura" className="py-20 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-bold tracking-widest text-[#E30613] uppercase">
            Cobertura operativa y presencia local
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Ensayos Blowerdoor en Madrid y todo el Norte de España
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Con base operativa en Madrid, nuestro equipo técnico se desplaza regularmente con furgón
            equipado a Castilla y León, Asturias, Cantabria y País Vasco. Adaptamos la inspección
            a la severidad climática específica de cada zona geográfica.
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {zones.map((z) => (
            <button
              key={z.id}
              onClick={() => setActiveZone(z)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeZone.id === z.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {z.nombre}
            </button>
          ))}
        </div>

        {/* Zone Detail Box with Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#E30613]">
                  <MapPin className="w-4 h-4" />
                  <span>{activeZone.subtitulo}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Ensayos Blowerdoor en {activeZone.nombre}
                </h3>
              </div>

              {/* Technical Climate Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                    <ThermometerSnowflake className="w-4 h-4 text-sky-600" />
                    <span>Zona Climática CTE</span>
                  </div>
                  <div className="font-semibold text-slate-900">{activeZone.zonaClimaticaCTE}</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                    <Wind className="w-4 h-4 text-amber-600" />
                    <span>Comportamiento de viento</span>
                  </div>
                  <div className="font-semibold text-slate-900">{activeZone.vientoPredominante}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase text-slate-500">
                  Importancia de la hermeticidad en esta zona
                </div>
                <p className="text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                  {activeZone.particularidadTecnica}
                </p>
              </div>

              {/* Towns served */}
              <div>
                <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-2">
                  Poblaciones y núcleos con servicio habitual
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeZone.ciudades.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 text-xs bg-slate-100 text-slate-700 rounded-md font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{activeZone.disponibilidad}</span>
              </div>
              <span className="text-slate-500 font-mono">Traslado con equipo completo</span>
            </div>
          </div>

          {/* Regional Architecture Photo (5 cols) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 flex flex-col justify-end">
            <img
              src="/src/assets/images/passivhaus_architecture_1794009398351.jpg"
              alt="Arquitectura Passivhaus de alta eficiencia en el norte de España"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="relative z-10 p-6 sm:p-8 text-white space-y-2">
              <div className="text-xs font-mono text-[#E30613] font-bold uppercase">
                Edificación de Alta Eficiencia
              </div>
              <h4 className="text-xl font-bold">
                Passivhaus y Viviendas NZEB en Clima Montañoso y Atlántico
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vivienda certificada con carpinterías de triple vidrio y envolvente estanca testada por N50.es a 50 Pa. Ausencia total de puentes de infiltración térmica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
