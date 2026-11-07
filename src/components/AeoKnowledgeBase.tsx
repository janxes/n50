import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Check, HelpCircle, Layers, ArrowRight } from 'lucide-react';

export const AeoKnowledgeBase: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const definitions = [
    {
      term: 'Valor n50 (h⁻¹)',
      shortDef: 'Tasa de renovación horaria a 50 Pa',
      formula: 'n50 = V50 / Vn',
      explanation:
        'Indica cuántas veces se renueva todo el volumen de aire interior del edificio en una hora cuando existe una diferencia de presión de 50 Pascales con el exterior. En Passivhaus de obra nueva, el límite máximo reglamentario es 0.60 h⁻¹.',
    },
    {
      term: 'Caudal Q50 o V50 (m³/h)',
      shortDef: 'Volumen total de aire filtrado',
      formula: 'V50 = C · (50)^n',
      explanation:
        'Es el volumen de aire que el ventilador Minneapolis BlowerDoor debe extraer o insuflar por hora para sostener de forma continua la presión de 50 Pascales en la envolvente.',
    },
    {
      term: 'Permeabilidad q50 (m³/h·m²)',
      shortDef: 'Caudal por superficie de envolvente',
      formula: 'q50 = V50 / AT',
      explanation:
        'Mide la tasa de fuga referida a los metros cuadrados totales de la envolvente térmica (suelos, fachadas y cubiertas). Es el parámetro comúnmente empleado en el Código Técnico de la Edificación (CTE DB-HE 6).',
    },
    {
      term: 'Área Equivalente de Fuga (ELA cm²)',
      shortDef: 'Tamaño del orificio total combinado',
      formula: 'ELA a 10 o 50 Pa',
      explanation:
        'Suma geométrica aproximada de todas las fisuras, juntas y grietas repartidas por la vivienda. Ayuda a visualizar el fallo (por ejemplo: "todas las rendijas suman una abertura neta de 15 x 15 cm permanente al exterior").',
    },
  ];

  const faqs = [
    {
      q: '¿Cuál es la diferencia entre hermeticidad, aislamiento térmico y ventilación?',
      a: 'Son tres conceptos complementarios que a menudo se confunden:\n\n1. El aislamiento térmico (lana, EPS, corcho) frena la transmisión de calor por conducción a través de los materiales.\n2. La hermeticidad al aire frena el paso convectivo involuntario de aire a través de juntas y rendijas (impide que el viento entre en casa).\n3. La ventilación controlada (con recuperación de calor) aporta aire limpio y filtrado de forma continua y planificada, extrayendo CO₂ y humedad sin abrir ventanas ni perder energía.',
    },
    {
      q: '¿Por qué se ensaya específicamente a 50 Pascales (Pa)?',
      a: '50 Pascales equivale a la presión que ejerce un viento moderado de aproximadamente 32 km/h sobre las fachadas del edificio. A esta presión normalizada, las pequeñas oscilaciones de la presión atmosférica exterior o las corrientes térmicas por efecto chimenea quedan neutralizadas, permitiendo obtener una curva de regresión matemática precisa y reproducible según la norma UNE-EN ISO 9972.',
    },
    {
      q: '¿Qué diferencia hay entre el Método A y el Método B de la norma UNE-EN ISO 9972?',
      a: '• Método A (ensayo del edificio en uso): Se ensaya el edificio tal y como se habita. Las aberturas de ventilación natural se dejan cerradas pero sin precintar, y los sistemas mecánicos apagados. Representa las infiltraciones reales de uso diario.\n• Método B (ensayo de la envolvente del edificio): Se sellan deliberadamente todas las aberturas intencionadas de ventilación, chimeneas y bajantes. Evalúa estrictamente la calidad constructiva del cerramiento exterior (exigido para Passivhaus y comprobación de hermeticidad de obra).',
    },
    {
      q: '¿Por qué es imprescindible hacer un ensayo Blowerdoor intermedio durante la obra?',
      a: 'Porque cuando la obra se entrega y se colocan las placas de cartón-yeso (pladur), alicatados o soleras, la línea hermética queda sepultada e inaccesible. Realizar el ensayo intermedio con la lámina estanca a la vista permite que si el valor n50 no alcanza el objetivo, nuestro técnico detecte la fuga con humo o termografía y los operarios la sellen con cinta hermética en 5 minutos a coste cero.',
    },
    {
      q: '¿Qué ocurre si un edificio no cumple el límite n50 requerido?',
      a: 'Durante nuestros ensayos no nos limitamos a certificar un "no apto". Nuestro protocolo incluye localización activa con termografía infrarroja de alta resolución y generadores de humo trazador. Identificamos cada punto de fuga (pasos de tubos de fontanería, conexiones eléctricas, cajones de persiana, sellado perimetral de marcos) y emitimos una guía gráfica de subsanación.',
    },
    {
      q: '¿Es obligatorio el ensayo Blowerdoor en España?',
      a: 'En España, el ensayo Blowerdoor es obligatorio para toda vivienda o edificio que aspire a la certificación Passivhaus (requisito excluyente n50 ≤ 0.60 h⁻¹). Asimismo, el Código Técnico de la Edificación (DB-HE 6) premia y exige justificar el valor de permeabilidad al aire de la envolvente en edificios residenciales de más de 120 m² de superficie útil mediante ensayo o valor por defecto conservador.',
    },
  ];

  return (
    <section id="aeo-faq" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-bold tracking-widest text-[#E30613] uppercase">
            Base de conocimiento técnico & AEO
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Todo lo que necesitas saber sobre el ensayo Blowerdoor y la hermeticidad
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Respuestas rigurosas a las consultas más frecuentes de arquitectos, promotores y particulares,
            redactadas con base en la normativa <strong>UNE-EN ISO 9972:2019</strong> y el protocolo{' '}
            <strong>Passivhaus</strong>.
          </p>
        </div>

        {/* 4 Technical Metric Cards */}
        <div className="mb-16">
          <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#E30613]" />
            <span>Métricas e indicadores clave de estanqueidad</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {definitions.map((def, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-[#E30613]">{def.term}</div>
                <div className="text-sm font-bold text-slate-900">{def.shortDef}</div>
                <div className="text-xs font-mono bg-white px-2 py-1 rounded-md border border-slate-200 inline-block text-slate-700">
                  {def.formula}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {def.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion FAQ for AEO */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-2 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#142E43]" />
            <span>Preguntas frecuentes con resolución técnica</span>
          </div>

          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left bg-white hover:bg-slate-50 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {faq.q}
                  </span>
                  <div className="shrink-0 text-slate-500">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 bg-slate-50 border-t border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
