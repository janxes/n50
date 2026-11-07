import React from 'react';
import { Logo } from './Logo';
import { Mail, MapPin, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
  onOpenCloudflareModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenCloudflareModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Especialistas en ensayos de hermeticidad al aire mediante sistema Minneapolis BlowerDoor,
              termografía infrarroja de alta resolución, detección por humo trazador y microanemometría según
              norma UNE-EN ISO 9972 y estándar Passivhaus.
            </p>
            <div className="flex items-center gap-2 text-white font-mono text-xs">
              <Mail className="w-4 h-4 text-[#E30613]" />
              <a href="mailto:hola@n50.es" className="hover:text-[#E30613] transition-colors font-bold">
                hola@n50.es
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Servicios
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('servicios')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Viviendas Unifamiliares
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('servicios')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Certificación Passivhaus
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('servicios')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Ensayos Intermedios en Obra
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('servicios')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Edificios Colectivos y Terciario
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('servicios')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Localización Quirúrgica de Fugas
                </button>
              </li>
            </ul>
          </div>

          {/* Territorios */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Cobertura
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('cobertura')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Madrid (Sede y Base)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('cobertura')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Castilla y León (9 provincias)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('cobertura')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Principado de Asturias
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('cobertura')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cantabria
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('cobertura')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Euskadi (País Vasco)
                </button>
              </li>
            </ul>
          </div>

          {/* Herramientas y Exportación */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Herramientas
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('simulador')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Simulador de Presión 50 Pa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('calculador')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Calcula tu Ensayo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('aeo-faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Preguntas Frecuentes & Normativa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('blog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Artículos & Casos de Ensayo
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCloudflareModal}
                  className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer text-left"
                >
                  Ver kit de código para Cloudflare Pages
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} N50.es Blowerdoor Test. Todos los derechos reservados.
            <span className="mx-2">·</span>
            Norma UNE-EN ISO 9972:2019
            <span className="mx-2">·</span>
            Estándar Passivhaus
          </div>

          <div className="flex items-center gap-4">
            <span>Privacidad & RGPD</span>
            <span>Aviso Legal</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
