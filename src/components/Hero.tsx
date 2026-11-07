import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, MapPin, Gauge } from 'lucide-react';

interface HeroProps {
  onStartCalculator: () => void;
  onGoToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCalculator, onGoToContact }) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle architectural grid pattern in background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Regional trust kicker with no-pill discipline */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
                Base operativa en Madrid
              </span>
              <span aria-hidden="true">·</span>
              <span>Castilla y León</span>
              <span aria-hidden="true">·</span>
              <span>Asturias</span>
              <span aria-hidden="true">·</span>
              <span>Cantabria</span>
              <span aria-hidden="true">·</span>
              <span>Euskadi</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              La hermeticidad de un edificio se mide.{' '}
              <span className="text-[#E30613]">No se supone.</span>
            </h1>

            {/* Concrete value proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Ensayos oficiales <strong>Blowerdoor</strong> según norma{' '}
              <span className="text-white font-semibold">UNE-EN ISO 9972</span> y estándar{' '}
              <span className="text-white font-semibold">Passivhaus</span>. Diagnosticamos con precisión
              la estanqueidad al aire en viviendas y edificios, detectando infiltraciones ocultas antes
              de que causen sobrecostes energéticos o problemas de confort.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0" />
                <span>Equipo oficial Minneapolis BlowerDoor</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0" />
                <span>Ensayos intermedios y finales en obra</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0" />
                <span>Detección con termografía y humo trazador</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0" />
                <span>Informe técnico visable para certificación</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onGoToContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#E30613] hover:bg-[#c30510] active:scale-[0.98] transition-all rounded-xl shadow-lg shadow-red-950/40 cursor-pointer"
              >
                <span>Solicitar ensayo Blowerdoor</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartCalculator}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 transition-colors rounded-xl cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-slate-400" />
                <span>Calcula qué ensayo necesitas</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero High-Impact Real Photography */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800 group">
              <img
                src="/src/assets/images/blowerdoor_fan_door_1794009396727.jpg"
                alt="Montaje de equipo Minneapolis Blowerdoor en puerta exterior para ensayo de hermeticidad"
                className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">Minneapolis BlowerDoor System</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#E30613] font-mono font-medium">ΔP = 50 Pa</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                    <Gauge className="w-3.5 h-3.5 text-slate-400" />
                    <span>DG-1000 Precision</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Ensayo en vivienda unifamiliar de alta eficiencia. Verificación de renovación horaria n50.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-metric strip below hero */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              UNE-EN ISO 9972
            </div>
            <p className="text-xs text-slate-400">
              Métodos normalizados A, B y C para determinación de permeabilidad al aire.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#E30613] font-mono tabular-nums">
              n50 ≤ 0.60 h⁻¹
            </div>
            <p className="text-xs text-slate-400">
              Exigencia estricta para certificación Passivhaus en obra nueva residencial.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              4 Tecnologías
            </div>
            <p className="text-xs text-slate-400">
              BlowerDoor + Termografía FLIR + Humo trazador + Anemometría puntual.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              5 Territorios
            </div>
            <p className="text-xs text-slate-400">
              Madrid (sede), Castilla y León, Asturias, Cantabria y País Vasco.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
