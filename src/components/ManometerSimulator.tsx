import React, { useState, useId } from 'react';
import { Gauge, Wind, Thermometer, Flame, ArrowRight, RefreshCw, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import { InspectionMode } from '../types';

interface SimulatorProps {
  onGoToContact: () => void;
}

export const ManometerSimulator: React.FC<SimulatorProps> = ({ onGoToContact }) => {
  const [pressurePa, setPressurePa] = useState<number>(50);
  const [volumeM3, setVolumeM3] = useState<number>(360); // typical 140 m2 house with 2.6m height
  const [airtightnessQuality, setAirtightnessQuality] = useState<'passivhaus' | 'cte' | 'estandar' | 'antiguo'>('passivhaus');
  const [activeMode, setActiveMode] = useState<InspectionMode>('normal');
  const [fanRunning, setFanRunning] = useState<boolean>(true);
  const pressureId = useId();
  const volumeId = useId();

  // Multiplier for base leakage at 50 Pa
  const qualityCoefficients = {
    passivhaus: 0.45, // n50 around 0.45 h-1
    cte: 0.85,       // n50 around 0.85 h-1
    estandar: 2.2,   // n50 around 2.2 h-1
    antiguo: 5.5,    // n50 around 5.5 h-1
  };

  const exponent = 0.65; // typical building envelope flow exponent n
  const targetN50Base = qualityCoefficients[airtightnessQuality];

  // Effective flow at selected pressure: Q = Q50 * (P / 50)^n
  const pressureRatio = pressurePa > 0 ? Math.pow(pressurePa / 50, exponent) : 0;
  const flowM3h = fanRunning ? Math.round(targetN50Base * volumeM3 * pressureRatio) : 0;
  const currentN50 = fanRunning && volumeM3 > 0 ? (flowM3h / volumeM3) : 0;

  // Equivalent Leakage Area (ELA) in cm2 at 50 Pa approx: ELA ~ Q50 / (1.2 * 3600) * 10000 approx
  const approxElaCm2 = Math.round((flowM3h / 2.9) / 10);
  const equivalentSquareSideCm = Math.round(Math.sqrt(approxElaCm2));

  // Passivhaus threshold evaluation
  const isPassivhausCompliant = currentN50 <= 0.60 && fanRunning;
  const isCteCompliant = currentN50 <= 1.0 && fanRunning;

  // Anemometer localized speed simulation (m/s) based on pressure and leakage
  const simulatedWindSpeed = fanRunning && pressurePa > 0 
    ? (Math.sqrt(2 * pressurePa / 1.2) * (airtightnessQuality === 'passivhaus' ? 0.08 : airtightnessQuality === 'cte' ? 0.22 : 0.65)).toFixed(2)
    : '0.00';

  return (
    <section id="simulador" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background technical lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-mono font-bold tracking-widest text-[#E30613] uppercase">
            Laboratorio de Simulación Interactiva
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Simulador de Ensayo a 50 Pascales y Manómetro DG-1000
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Experimenta cómo la presión de ensayo, el volumen del inmueble y la calidad de la envolvente
            determinan el <strong>valor n50</strong> y la estanqueidad según los estándares Passivhaus y CTE.
          </p>
        </div>

        {/* Simulator Cockpit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Digital Manometer Hardware UI (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 rounded-2xl border-2 border-slate-700 p-6 shadow-2xl relative">
            {/* Manometer Top Banner */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E30613] animate-pulse" />
                <span className="font-mono text-xs tracking-wider text-slate-300 uppercase font-semibold">
                  Minneapolis DG-1000
                </span>
              </div>
              <button
                onClick={() => setFanRunning(!fanRunning)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${
                  fanRunning
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-red-900/80 hover:bg-red-800 text-white'
                }`}
              >
                {fanRunning ? 'VENTILADOR ON' : 'VENTILADOR STANDBY'}
              </button>
            </div>

            {/* Manometer LCD Screen Display */}
            <div className="bg-[#0b1619] border-2 border-[#1a383f] rounded-xl p-5 shadow-inner space-y-4">
              {/* Channel A: Differential Pressure */}
              <div className="bg-[#050c0e] p-3.5 rounded-lg border border-[#163036] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#448b94] uppercase tracking-wider">
                    CANAL A — Presión diferencial envolvente
                  </div>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-[#44e5ff] tabular-nums">
                    {fanRunning ? pressurePa : 0} <span className="text-lg font-normal text-[#2b8896]">Pa</span>
                  </div>
                </div>
                <Gauge className="w-8 h-8 text-[#2b8896] opacity-75" />
              </div>

              {/* Channel B: Air Flow Rate */}
              <div className="bg-[#050c0e] p-3.5 rounded-lg border border-[#163036] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#448b94] uppercase tracking-wider">
                    CANAL B — Caudal de aire medido (Q)
                  </div>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-[#ffe066] tabular-nums">
                    {flowM3h} <span className="text-lg font-normal text-[#a68c28]">m³/h</span>
                  </div>
                </div>
                <Wind className="w-8 h-8 text-[#a68c28] opacity-75" />
              </div>

              {/* Key Result: n50 Metric */}
              <div className="pt-2 border-t border-[#163036] flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-400">Tasa n50 calculada:</span>
                  <div className="text-2xl font-mono font-extrabold text-white tabular-nums">
                    {currentN50.toFixed(2)}{' '}
                    <span className="text-sm font-normal text-slate-400">h⁻¹ (renov/h)</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400">Fuga equivalente (ELA):</span>
                  <div className="text-base font-mono font-semibold text-amber-400 tabular-nums">
                    ~{approxElaCm2} cm² <span className="text-xs text-slate-400">({equivalentSquareSideCm}×{equivalentSquareSideCm} cm)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verdict Badge */}
            <div className="mt-5 p-3.5 rounded-xl border flex items-center gap-3 text-xs font-medium transition-all"
              style={{
                backgroundColor: isPassivhausCompliant ? 'rgba(5, 150, 105, 0.15)' : isCteCompliant ? 'rgba(217, 119, 6, 0.15)' : 'rgba(227, 6, 19, 0.15)',
                borderColor: isPassivhausCompliant ? '#059669' : isCteCompliant ? '#d97706' : '#E30613',
              }}
            >
              {isPassivhausCompliant ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-300">CUMPLE ESTÁNDAR PASSIVHAUS (n50 ≤ 0.60 h⁻¹)</span>
                    <p className="text-[11px] text-slate-300 mt-0.5">Envolvente hermética sobresaliente. Sin puentes de aire perceptibles.</p>
                  </div>
                </>
              ) : isCteCompliant ? (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-amber-300">CUMPLE CÓDIGO TÉCNICO (CTE DB-HE)</span>
                    <p className="text-[11px] text-slate-300 mt-0.5">Válido para CTE estándar, pero supera el límite de 0.60 h⁻¹ de Passivhaus.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <div>
                    <span className="font-bold text-red-300">INFILTRACIONES ELEVADAS (n50 &gt; 1.0 h⁻¹)</span>
                    <p className="text-[11px] text-slate-300 mt-0.5">Pérdidas masivas de energía por corrientes. Recomendada localización urgente de fugas.</p>
                  </div>
                </>
              )}
            </div>

            {/* Controls: Pressure slider & Volume */}
            <div className="mt-6 space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1.5 font-mono">
                  <label htmlFor={pressureId}>Presión de ensayo (ΔP):</label>
                  <span className="text-[#44e5ff] font-bold">{pressurePa} Pa</span>
                </div>
                <input
                  id={pressureId}
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={pressurePa}
                  onChange={(e) => setPressurePa(Number(e.target.value))}
                  className="w-full accent-[#E30613] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <button onClick={() => setPressurePa(10)} className="hover:text-slate-300">10 Pa (Base)</button>
                  <button onClick={() => setPressurePa(30)} className="hover:text-slate-300">30 Pa</button>
                  <button onClick={() => setPressurePa(50)} className="text-[#E30613] font-bold hover:underline">50 Pa (Normalizado)</button>
                  <button onClick={() => setPressurePa(60)} className="hover:text-slate-300">60 Pa (Máx)</button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1.5 font-mono">
                  <label htmlFor={volumeId}>Volumen neto interior (Vn):</label>
                  <span className="text-white font-bold">{volumeM3} m³</span>
                </div>
                <input
                  id={volumeId}
                  type="range"
                  min="120"
                  max="1200"
                  step="20"
                  value={volumeM3}
                  onChange={(e) => setVolumeM3(Number(e.target.value))}
                  className="w-full accent-slate-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>150 m³ (Piso 60m²)</span>
                  <span>360 m³ (Chalet 140m²)</span>
                  <span>900 m³ (Chalet grande)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Leakage Diagnostics & Visual Inspection Mode (7 cols) */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-2xl border border-slate-700 p-6 space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                Selecciona la calidad de la envolvente
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Comportamiento comparativo de estanqueidad
              </h3>
            </div>

            {/* Quality selector tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'passivhaus', label: 'Passivhaus', sub: 'n50 ~ 0.45' },
                { id: 'cte', label: 'CTE DB-HE', sub: 'n50 ~ 0.85' },
                { id: 'estandar', label: 'Obra Estándar', sub: 'n50 ~ 2.20' },
                { id: 'antiguo', label: 'Sin Hermeticidad', sub: 'n50 ~ 5.50' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setAirtightnessQuality(item.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    airtightnessQuality === item.id
                      ? 'bg-slate-900 border-[#E30613] text-white shadow-md'
                      : 'bg-slate-900/40 border-slate-700/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-xs">{item.label}</div>
                  <div className="text-[11px] font-mono text-[#E30613] mt-0.5">{item.sub} h⁻¹</div>
                </button>
              ))}
            </div>

            {/* Visualizer Mode selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Visualizar con método de diagnóstico:
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Modo activo: <strong className="text-white capitalize">{activeMode}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setActiveMode('normal')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    activeMode === 'normal'
                      ? 'bg-[#E30613] border-[#E30613] text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Óptico Normal</span>
                </button>

                <button
                  onClick={() => setActiveMode('termografia')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    activeMode === 'termografia'
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>Termografía IR</span>
                </button>

                <button
                  onClick={() => setActiveMode('humo')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    activeMode === 'humo'
                      ? 'bg-amber-600 border-amber-500 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Humo Trazador</span>
                </button>

                <button
                  onClick={() => setActiveMode('anemometro')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    activeMode === 'anemometro'
                      ? 'bg-cyan-600 border-cyan-500 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span>Anemómetro</span>
                </button>
              </div>
            </div>

            {/* Diagnostic Visualization Frame */}
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 h-56 sm:h-64 flex items-center justify-center">
              {activeMode === 'normal' && (
                <div className="relative w-full h-full">
                  <img
                    src="/src/assets/images/blowerdoor_fan_door_1794009396727.jpg"
                    alt="Visión normal del equipo en funcionamiento"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-900/40" />
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-lg text-xs text-slate-200 border border-slate-700">
                    <strong>Vista óptica estándar:</strong> El ventilador genera {pressurePa} Pa de presión negativa. Los manómetros digitales registran el caudal necesario para sostener la diferencia barométrica.
                  </div>
                </div>
              )}

              {activeMode === 'termografia' && (
                <div className="relative w-full h-full bg-gradient-to-br from-indigo-950 via-purple-900 to-amber-900 overflow-hidden">
                  <img
                    src="/src/assets/images/technician_thermal_test_1794009397135.jpg"
                    alt="Simulación termográfica"
                    className="w-full h-full object-cover mix-blend-screen opacity-70"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 font-mono text-[11px] text-purple-300 px-2 py-1 rounded-md">
                    Gradiente IR: Infiltración de aire exterior a 50 Pa
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-lg text-xs text-slate-200 border border-purple-500/40">
                    {airtightnessQuality === 'passivhaus' ? (
                      <span className="text-emerald-400">
                        <strong>Patrón homogéneo:</strong> Sin corrientes frías visibles a través de las juntas perimetrales ni pasamuros.
                      </span>
                    ) : (
                      <span className="text-amber-300">
                        <strong>Fuga detectada:</strong> La entrada de aire frío exterior genera una pluma térmica azul/morada en el encuentro inferior de la carpintería.
                      </span>
                    )}
                  </div>
                </div>
              )}

              {activeMode === 'humo' && (
                <div className="relative w-full h-full bg-slate-950">
                  <img
                    src="/src/assets/images/building_smoke_detection_1794009397884.jpg"
                    alt="Simulación con lápiz de humo trazador"
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 font-mono text-[11px] text-amber-300 px-2 py-1 rounded-md">
                    Trazador de flujo cinemático
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-lg text-xs text-slate-200 border border-amber-500/40">
                    {airtightnessQuality === 'passivhaus' ? (
                      <span><strong>Filamento estable:</strong> El humo permanece vertical sin desviaciones. Sellado perimetral continuo con cinta hermética.</span>
                    ) : (
                      <span className="text-amber-300"><strong>Desviación turbulenta:</strong> El chorro de infiltración parásita arrastra el humo hacia el interior con fuerza.</span>
                    )}
                  </div>
                </div>
              )}

              {activeMode === 'anemometro' && (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-slate-950 text-center">
                  <div className="p-4 rounded-full bg-cyan-950/50 border border-cyan-500/30 mb-3">
                    <Wind className="w-10 h-10 text-cyan-400 animate-pulse" />
                  </div>
                  <div className="text-3xl font-mono font-bold text-cyan-300 tabular-nums">
                    {simulatedWindSpeed} <span className="text-base text-cyan-500 font-normal">m/s</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    Velocidad del flujo puntual en junta de carpintería
                  </div>
                  <div className="text-xs text-slate-300 mt-3 max-w-md">
                    {Number(simulatedWindSpeed) < 0.2 ? (
                      <span className="text-emerald-400 font-medium">Imperceptible (&lt; 0.2 m/s). Excelente confort sin corrientes convectivas.</span>
                    ) : (
                      <span className="text-amber-400 font-medium">Corriente perceptible (&gt; 0.2 m/s). Causa molestia térmica y condensaciones intersticiales.</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-700/80">
              <div className="text-xs text-slate-400">
                ¿Necesitas comprobar los valores reales de tu proyecto?
              </div>
              <button
                onClick={onGoToContact}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#E30613] hover:bg-[#c30510] rounded-lg transition-colors cursor-pointer"
              >
                <span>Solicitar ensayo para tu inmueble</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
