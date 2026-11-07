import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Calculator, Sparkles, Building, Calendar, Target, MapPin } from 'lucide-react';
import { QuoteFormData } from '../types';

interface CalculatorProps {
  onApplyRecommendation: (data: Partial<QuoteFormData>) => void;
}

export const BlowerdoorCalculator: React.FC<CalculatorProps> = ({ onApplyRecommendation }) => {
  const [step, setStep] = useState<number>(1);
  const [tipoInmueble, setTipoInmueble] = useState<string>('Vivienda unifamiliar aislada');
  const [faseObra, setFaseObra] = useState<string>('Obra en curso (estructura y cerramiento)');
  const [objetivo, setObjetivo] = useState<string>('Certificación Passivhaus / EnerPHit');
  const [comunidad, setComunidad] = useState<string>('Madrid y alrededores');

  // Compute recommendation
  const isPassivhaus = objetivo.includes('Passivhaus');
  const isObraEnCurso = faseObra.includes('en curso');
  const isFinDeObra = faseObra.includes('Fin de obra');

  let recommendationTitle = '';
  let recommendationNorm = '';
  let recommendationAdvice = '';
  let recommendationEquip = 'Minneapolis BlowerDoor + Termografía FLIR + Humo trazador';

  if (isObraEnCurso && isPassivhaus) {
    recommendationTitle = 'Ensayo Intermedio Preventivo Passivhaus';
    recommendationNorm = 'Objetivo exigente: n50 < 0.60 h⁻¹ antes de trasdosados';
    recommendationAdvice =
      'Es el momento idóneo. Realizaremos el ensayo antes de colocar las placas de cartón-yeso (pladur) sobre la lámina de hermeticidad. Si existe alguna fuga en pasos de tubos o ventanas, se sellará in situ con cinta hermética, garantizando el aprobado definitivo.';
  } else if (isFinDeObra && isPassivhaus) {
    recommendationTitle = 'Ensayo Final Oficial Passivhaus (Método 1 / Método A)';
    recommendationNorm = 'Límite reglamentario: n50 ≤ 0.60 h⁻¹ (obra nueva) / n50 ≤ 1.0 h⁻¹ (EnerPHit)';
    recommendationAdvice =
      'Ensayo oficial con el edificio en su estado final de uso. Sellado de aberturas de ventilación controlada según el protocolo PHI y emisión de informe oficial con curvas de correlación r > 0.98.';
  } else if (isObraEnCurso) {
    recommendationTitle = 'Ensayo de Verificación Intermedia de Envolvente';
    recommendationNorm = 'Cumplimiento CTE DB-HE 6 y estanqueidad preventiva';
    recommendationAdvice =
      'Comprobación clave para asegurar que la envolvente cumple holgadamente las exigencias térmicas del Código Técnico antes de que sea inaccesible reparar las juntas.';
  } else if (faseObra.includes('existente')) {
    recommendationTitle = 'Auditoría Termográfica y Ensayo Blowerdoor de Diagnóstico';
    recommendationNorm = 'Localización de patologías térmicas y corrientes parásitas';
    recommendationAdvice =
      'Presurizaremos a 50 Pa para forzar la entrada de aire frío y mapearemos con cámara termográfica todas las infiltraciones en persianas, carpinterías y juntas para darte un informe de sellado correctivo.';
  } else {
    recommendationTitle = 'Asesoramiento y Planificación de Ensayo Blowerdoor';
    recommendationNorm = 'Estrategia de hermeticidad desde fase de proyecto';
    recommendationAdvice =
      'Definiremos la línea continua de hermeticidad en los planos de ejecución y fijaremos las fechas de ensayo intermedio y final para tu dirección facultativa.';
  }

  const handleFinish = () => {
    onApplyRecommendation({
      tipoInmueble,
      faseObra,
      objetivo,
      comunidad,
      ensayoRecomendado: recommendationTitle,
    });
  };

  return (
    <section id="calculador" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E30613] text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Asistente interactivo guiado</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Calcula qué tipo de ensayo Blowerdoor necesitas
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Responde 4 preguntas rápidas para determinar el protocolo adecuado (intermedio, final o diagnóstico) y los requisitos técnicos según tu objetivo.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 text-xs font-mono">
            <span className="text-slate-500 font-semibold uppercase">
              Paso {step} de 4
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    s === step
                      ? 'w-8 bg-[#E30613]'
                      : s < step
                      ? 'w-4 bg-slate-400'
                      : 'w-4 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Tipo de inmueble */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
                <Building className="w-5 h-5 text-[#E30613]" />
                <span>1. ¿Qué tipología de inmueble requiere el ensayo?</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'Vivienda unifamiliar aislada',
                    desc: 'Chalets, casas pasivas, autopromoción',
                  },
                  {
                    title: 'Vivienda adosada / pareada',
                    desc: 'Con medianeras habitadas o garajes comunes',
                  },
                  {
                    title: 'Piso en bloque plurifamiliar',
                    desc: 'Vivienda individual o muestra representativa',
                  },
                  {
                    title: 'Edificio terciario o bloque completo',
                    desc: 'Colegios, oficinas, naves o bloque residencial entero',
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setTipoInmueble(item.title)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      tipoInmueble === item.title
                        ? 'bg-white border-[#E30613] shadow-md ring-1 ring-[#E30613]'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Fase actual */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
                <Calendar className="w-5 h-5 text-[#E30613]" />
                <span>2. ¿En qué estado o fase se encuentra la obra?</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'Obra en curso (estructura y cerramiento)',
                    desc: 'Lámina hermética colocada antes de cerrar pladur (Idóneo)',
                  },
                  {
                    title: 'Fin de obra (terminado para entrar a vivir)',
                    desc: 'Edificio finalizado, carpinterías y acabados listos',
                  },
                  {
                    title: 'En fase de proyecto / redacción técnica',
                    desc: 'Diseño previo, prescripción en pliego o memoria',
                  },
                  {
                    title: 'Edificio existente habitado',
                    desc: 'Diagnóstico por quejas de confort, frío o condensaciones',
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setFaseObra(item.title)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      faseObra === item.title
                        ? 'bg-white border-[#E30613] shadow-md ring-1 ring-[#E30613]'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Objetivo */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
                <Target className="w-5 h-5 text-[#E30613]" />
                <span>3. ¿Cuál es el objetivo prioritario del ensayo?</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'Certificación Passivhaus / EnerPHit',
                    desc: 'Exigencia estricta n50 ≤ 0.60 h⁻¹ con informe oficial PHI',
                  },
                  {
                    title: 'Código Técnico de la Edificación (CTE DB-HE)',
                    desc: 'Justificación de permeabilidad de la envolvente térmica',
                  },
                  {
                    title: 'Calidad de ejecución y confort térmico',
                    desc: 'Garantía del promotor o propietario de ausencia de filtraciones',
                  },
                  {
                    title: 'Sellos ambientales (BREEAM, LEED, VERDE)',
                    desc: 'Créditos de estanqueidad y eficiencia energética',
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setObjetivo(item.title)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      objetivo === item.title
                        ? 'bg-white border-[#E30613] shadow-md ring-1 ring-[#E30613]'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Ubicación geográfica */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
                <MapPin className="w-5 h-5 text-[#E30613]" />
                <span>4. ¿En qué comunidad o provincia se ubica el edificio?</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'Madrid y alrededores',
                    desc: 'Base operativa directa. Respuesta rápida.',
                  },
                  {
                    title: 'Castilla y León',
                    desc: 'Valladolid, Burgos, León, Salamanca, Segovia, Ávila...',
                  },
                  {
                    title: 'Asturias',
                    desc: 'Oviedo, Gijón, Avilés y comarcas',
                  },
                  {
                    title: 'Cantabria',
                    desc: 'Santander, Torrelavega, comarcas costeras',
                  },
                  {
                    title: 'Euskadi (País Vasco)',
                    desc: 'Bilbao/Bizkaia, San Sebastián/Gipuzkoa, Vitoria/Álava',
                  },
                  {
                    title: 'Otras provincias limítrofes',
                    desc: 'Guadalajara, Toledo, La Rioja, Navarra...',
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setComunidad(item.title)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      comunidad === item.title
                        ? 'bg-white border-[#E30613] shadow-md ring-1 ring-[#E30613]'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Result Card */}
          {step === 5 && (
            <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#E30613]">
                <Sparkles className="w-4 h-4" />
                <span>Diagnóstico y propuesta personalizada</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {recommendationTitle}
                </h3>
                <div className="text-xs font-mono text-[#142E43] font-semibold mt-1">
                  {recommendationNorm}
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {recommendationAdvice}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 font-medium">Equipamiento asignado:</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{recommendationEquip}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 font-medium">Zona geográfica:</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{comunidad}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 transition-colors font-semibold"
                >
                  Volver a calcular
                </button>

                <button
                  onClick={handleFinish}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#E30613] hover:bg-[#c30510] rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <span>Trasladar al formulario de presupuesto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {step < 5 && (
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Atrás</span>
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#142E43] hover:bg-slate-800 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <span>{step === 4 ? 'Ver resultado y recomendación' : 'Siguiente paso'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
