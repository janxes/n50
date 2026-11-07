import React from 'react';
import { Gauge, Flame, Wind, Eye, Check } from 'lucide-react';

export const DiagnosticTech: React.FC = () => {
  return (
    <section id="tecnologia" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-bold tracking-widest text-[#E30613] uppercase">
            Tecnología y rigor de diagnóstico
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            No solo obtenemos un número: localizamos exactamente dónde fuga tu edificio
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Un ensayo Blowerdoor riguroso no termina al encender el ventilador. En <strong>N50.es</strong>{' '}
            combinamos el equipo de referencia mundial <strong>Minneapolis BlowerDoor</strong> con
            técnicas avanzadas de inspección termográfica, visualización por humo trazador y
            anemometría puntual.
          </p>
        </div>

        {/* 4 Diagnostic Pillars in Bento-Style Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 01. Minneapolis Blowerdoor - Marquee Feature (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-8 flex flex-col justify-between border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#E30613] tracking-wider uppercase">
                  Instrumento Principal
                </span>
                <span className="text-xs font-mono text-slate-400">DG-1000 Digital Pressure Gauge</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                01. Minneapolis BlowerDoor System
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                El estándar de oro en ensayos de hermeticidad a nivel internacional. Consta de un bastidor
                expandible de aluminio anodizado con lona hermética de alta resistencia, un ventilador
                calibrado de gran caudal con anillos de estrangulación para medir desde pequeños caudales
                hasta grandes edificios, y manómetro digital diferencial con compensación barométrica.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E30613] shrink-0" />
                  <span>Ensayos de presurización y despresurización multipunto (10 a 60 Pa).</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E30613] shrink-0" />
                  <span>Cálculo automático de coeficiente de flujo (C) y exponente de fuga (n).</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E30613] shrink-0" />
                  <span>Calibraciones periódicas oficiales según norma UNE-EN ISO 9972.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#E30613]" />
                <span className="font-semibold text-slate-200">Precisión ±1% de lectura</span>
              </div>
              <span className="font-mono text-slate-300">Software TECTITE certificado</span>
            </div>
          </div>

          {/* 02. Termografía Infrarroja (5 cols with real photo) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs">
            <div className="relative h-52 overflow-hidden bg-slate-900">
              <img
                src="/src/assets/images/technician_thermal_test_1794009397135.jpg"
                alt="Inspección con cámara termográfica durante ensayo Blowerdoor"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-1 rounded-md">
                Gradiente Térmico a 50 Pa
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="text-xs font-mono font-semibold text-slate-500 uppercase">
                Termovisión en Depresión
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                02. Termografía Infrarroja
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Al despresurizar el edificio a 50 Pa, el aire exterior penetra por cualquier discontinuidad
                del sellado. Con la cámara termográfica de alta resolución detectamos inmediatamente
                el enfriamiento de la superficie interior en rodapiés, marcos, persianas y pasos de tubos.
              </p>
            </div>
          </div>

          {/* 03. Máquinas de Humo Trazador (5 cols with real photo) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs">
            <div className="relative h-52 overflow-hidden bg-slate-900">
              <img
                src="/src/assets/images/building_smoke_detection_1794009397884.jpg"
                alt="Detección de vías de infiltración con lápiz de humo trazador"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-1 rounded-md">
                Humo Trazador Inocuo
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="text-xs font-mono font-semibold text-slate-500 uppercase">
                Visualización Cinemática
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                03. Generadores y Lápices de Humo
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                El humo hace visible lo invisible. Al aproximar un filamento de humo a la carpintería o
                la lámina hermética en sobrepresión o depresión, el chorro de aire desvía el humo al
                instante, señalando el punto milimétrico exacto a subsanar antes del ensayo final.
              </p>
            </div>
          </div>

          {/* 04. Anemometría Digital (7 cols) */}
          <div className="lg:col-span-7 bg-[#142E43] text-white rounded-2xl p-8 flex flex-col justify-between border border-slate-800 shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-amber-400 tracking-wider uppercase">
                  Cuantificación Puntual
                </span>
                <span className="text-xs font-mono text-slate-300">Hot-wire Microanemometry</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                04. Anemometría de Hilo Caliente
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                Cuando es necesario medir la velocidad puntual de una corriente parásita en una rendija
                o conducto, empleamos un anemómetro de hilo caliente de altísima sensibilidad (capaz de
                registrar velocidades desde 0.05 m/s). Permite discriminar si una infiltración es leve o
                crítica para el balance térmico de la estancia.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
                <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-700/60">
                  <div className="font-semibold text-white mb-1">Detección de microrrendijas</div>
                  <div>Diagnóstico preciso en cajones de persiana, uniones solera-muro y pasos de cables.</div>
                </div>
                <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-700/60">
                  <div className="font-semibold text-white mb-1">Verificación pre y post sellado</div>
                  <div>Comprobamos la efectividad del sellado con encintado antes de dar por buena la junta.</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700 flex items-center gap-2 text-xs text-slate-300">
              <Wind className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Diagnóstico integral de la envolvente sin ensayos ciegos.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
