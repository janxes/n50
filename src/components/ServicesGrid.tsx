import React from 'react';
import { Home, Building2, Award, Construction, FileCheck2, Search, ArrowRight } from 'lucide-react';

interface ServicesGridProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'viviendas',
      title: 'Viviendas Unifamiliares y Autopromoción',
      subtitle: 'Particulares y arquitectos',
      icon: Home,
      description:
        'Asegura que tu vivienda no tire el dinero por rendijas invisibles. Comprobamos la continuidad del sellado de ventanas, pasos de instalaciones y cubierta, eliminando corrientes de aire frío y ruidos molestos.',
      highlights: ['Confort térmico total', 'Ahorro drástico en climatización', 'Prevención de humedades y moho'],
      badge: 'Más solicitado',
    },
    {
      id: 'passivhaus',
      title: 'Certificación Passivhaus y EnerPHit',
      subtitle: 'Estándar de ultra-alta eficiencia',
      icon: Award,
      description:
        'Verificación estricta de la tasa n50 ≤ 0.60 h⁻¹ para edificios Passivhaus Classic, Plus y Premium, o n50 ≤ 1.0 h⁻¹ en rehabilitación EnerPHit. Emitimos el reporte técnico conforme a los requerimientos del Passive House Institute.',
      highlights: ['Protocolo oficial PHI', 'Verificación de volumen neto Vv', 'Curvas de presurización/despresurización'],
      badge: 'Especialistas',
    },
    {
      id: 'intermedios',
      title: 'Ensayos Intermedios en Obra',
      subtitle: 'El seguro de vida de tu proyecto',
      icon: Construction,
      description:
        'Realizado cuando la lámina hermética y las carpinterías están instaladas, pero antes de colocar los trasdosados de cartón-yeso (pladur). Permite corregir cualquier fallo de encintado a coste prácticamente cero.',
      highlights: ['Reparación in situ en minutos', 'Detección con humo y termografía', 'Garantía para el ensayo final'],
      badge: 'Recomendado',
    },
    {
      id: 'edificios',
      title: 'Edificios Colectivos y Terciario',
      subtitle: 'Constructoras, promotoras y sector público',
      icon: Building2,
      description:
        'Ensayos de gran escala en bloques residenciales, colegios, oficinas y centros logísticos. Capacidad de presurizar grandes volúmenes con varios ventiladores sincronizados según norma UNE-EN ISO 9972.',
      highlights: ['Cumplimiento CTE DB-HE 6', 'Sectorización entre viviendas', 'Sistemas de caudal escalable'],
      badge: 'Gran volumen',
    },
    {
      id: 'finales',
      title: 'Ensayos Finales de Recepción y Conformidad',
      subtitle: 'Para licencias, sellos y certificaciones',
      icon: FileCheck2,
      description:
        'Ensayo oficial con el edificio terminado y sellado según el Método A (envolvente en uso) o Método B (envolvente térmica). Emisión de informe técnico completo con trazabilidad de calibración oficial.',
      highlights: ['Válido para CTE, BREEAM, LEED y Verde', 'Informe oficial visable', 'Cálculo de permeabilidad q50'],
      badge: 'Oficial',
    },
    {
      id: 'fugas',
      title: 'Localización y Auditoría de Infiltraciones',
      subtitle: 'Diagnóstico de patologías en edificios existentes',
      icon: Search,
      description:
        'Si sientes corrientes de aire cerca de ventanas, notas frío inexplicable o escuchas silbidos en días de viento, localizamos el origen exacto con termografía infrarroja y anemometría para proponerte el sellado adecuado.',
      highlights: ['Mapeo fotográfico de fugas', 'Dictamen técnico orientativo', 'Auditoría para fondos NextGen'],
      badge: 'Diagnóstico',
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-bold tracking-widest text-[#E30613] uppercase">
            Catálogo técnico de servicios
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Ensayos de hermeticidad adaptados a cada fase y exigencia normativa
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Desde la comprobación preventiva en fase de estructura hasta el certificado final oficial para
            entregar a la dirección facultativa o entidad certificadora.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-[#E30613] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-[#142E43] uppercase tracking-wider">
                      {service.subtitle}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full flex items-center justify-between text-xs font-bold text-[#142E43] group-hover:text-[#E30613] transition-colors cursor-pointer"
                  >
                    <span>Solicitar este ensayo</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative quote box */}
        <div className="mt-12 bg-[#142E43] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h4 className="text-lg font-bold text-white">
              ¿Dudas sobre si necesitas un ensayo Método A o Método B según ISO 9972?
            </h4>
            <p className="text-xs sm:text-sm text-slate-200">
              El <strong>Método A</strong> evalúa el edificio en estado de uso (con sellados funcionales abiertos o cerrados según operativa normal), mientras que el <strong>Método B</strong> evalúa específicamente la envolvente del edificio sellando deliberadamente todas las aberturas intencionadas (ventilación, chimeneas, bajantes).
            </p>
          </div>
          <button
            onClick={() => onSelectService('Consulta Técnica ISO 9972')}
            className="shrink-0 px-5 py-3 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Consultar con un técnico
          </button>
        </div>
      </div>
    </section>
  );
};
