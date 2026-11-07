import React, { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, CloudDownload } from 'lucide-react';

interface NavbarProps {
  onOpenCloudflareModal: () => void;
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCloudflareModal, onScrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-20">
        {/* Zone 1: Single Brand element */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('top');
          }}
          className="whitespace-nowrap shrink-0 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E30613] rounded-md"
          aria-label="N50.es Blowerdoor Test - Inicio"
        >
          <Logo />
        </a>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          <button
            onClick={() => handleNavClick('servicios')}
            className="hover:text-[#E30613] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Servicios
          </button>
          <button
            onClick={() => handleNavClick('tecnologia')}
            className="hover:text-[#E30613] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Instrumentación
          </button>
          <button
            onClick={() => handleNavClick('simulador')}
            className="hover:text-[#E30613] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Simulador 50 Pa
          </button>
          <button
            onClick={() => handleNavClick('calculador')}
            className="hover:text-[#E30613] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Calcula tu Ensayo
          </button>
          <button
            onClick={() => handleNavClick('cobertura')}
            className="hover:text-[#E30613] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Cobertura Norte
          </button>
          <button
            onClick={() => handleNavClick('aeo-faq')}
            className="hover:text-[#E30613] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            FAQ & Normativa
          </button>
        </nav>

        {/* Zone 3: 1 primary action + Export button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCloudflareModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer border border-slate-200"
            title="Ver y exportar código estático limpio para Cloudflare Pages"
          >
            <CloudDownload className="w-4 h-4 text-[#142E43]" />
            <span>Código Cloudflare</span>
          </button>

          <button
            onClick={() => handleNavClick('contacto')}
            className="inline-flex items-center gap-1 px-4 py-2 text-xs md:text-sm font-semibold text-white bg-[#E30613] hover:bg-[#c30510] active:scale-[0.98] transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Pedir Presupuesto</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-hidden"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-3">
          <div className="flex flex-col space-y-2 text-base font-medium text-slate-800">
            <button
              onClick={() => handleNavClick('servicios')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => handleNavClick('tecnologia')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Instrumentación de Diagnóstico
            </button>
            <button
              onClick={() => handleNavClick('simulador')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Simulador Interactivo a 50 Pa
            </button>
            <button
              onClick={() => handleNavClick('calculador')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors text-[#E30613] font-semibold"
            >
              Asistente: Calcula qué ensayo necesitas
            </button>
            <button
              onClick={() => handleNavClick('cobertura')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Cobertura (Madrid, CyL, Asturias, Cantabria, Euskadi)
            </button>
            <button
              onClick={() => handleNavClick('aeo-faq')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Preguntas Frecuentes & AEO
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCloudflareModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200"
            >
              <CloudDownload className="w-4 h-4 text-[#142E43]" />
              <span>Ver paquete estático para Cloudflare Pages</span>
            </button>
            <button
              onClick={() => handleNavClick('contacto')}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#E30613] rounded-lg"
            >
              <span>Solicitar Ensayo Blowerdoor</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
