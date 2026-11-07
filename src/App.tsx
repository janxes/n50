import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DiagnosticTech } from './components/DiagnosticTech';
import { ManometerSimulator } from './components/ManometerSimulator';
import { ServicesGrid } from './components/ServicesGrid';
import { BlowerdoorCalculator } from './components/BlowerdoorCalculator';
import { GeographicCoverage } from './components/GeographicCoverage';
import { AeoKnowledgeBase } from './components/AeoKnowledgeBase';
import { BlogPosts } from './components/BlogPosts';
import { BlogPostDetail } from './components/BlogPostDetail';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { CloudflareExportModal } from './components/CloudflareExportModal';
import { QuoteFormData, WordPressPost } from './types';

export default function App() {
  const [cloudflareModalOpen, setCloudflareModalOpen] = useState(false);
  const [formDataState, setFormDataState] = useState<Partial<QuoteFormData>>({});
  const [selectedPost, setSelectedPost] = useState<WordPressPost | null>(null);

  const scrollToSection = (id: string) => {
    if (selectedPost) {
      setSelectedPost(null);
      window.history.pushState(null, '', '/');
    }

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setTimeout(() => {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleApplyCalculatorRecommendation = (data: Partial<QuoteFormData>) => {
    setFormDataState(data);
    scrollToSection('contacto');
  };

  const handleSelectService = (serviceName: string) => {
    setFormDataState((prev) => ({
      ...prev,
      detalles: `Interés específico en: ${serviceName}`,
    }));
    scrollToSection('contacto');
  };

  const handleSelectPost = (post: WordPressPost) => {
    setSelectedPost(post);
    const cleanSlug = post.slug.replace(/^\/+/, '');
    window.history.pushState({ slug: cleanSlug }, '', `/${cleanSlug}`);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    window.history.pushState(null, '', '/');
    setTimeout(() => {
      const blogElem = document.getElementById('blog');
      if (blogElem) {
        blogElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Manejo de navegación del navegador (botón Atrás / Adelante)
  useEffect(() => {
    const handlePopState = () => {
      const pathSlug = window.location.pathname.replace(/^\/+/, '');
      if (!pathSlug) {
        setSelectedPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#E30613] selection:text-white">
      {/* Top Header Navigation */}
      <Navbar
        onOpenCloudflareModal={() => setCloudflareModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {selectedPost ? (
          /* Vista de Artículo Completo con SEO Canónico unificado a https://n50.es */
          <BlogPostDetail
            post={selectedPost}
            onBack={handleClosePost}
            onGoToContact={() => {
              setSelectedPost(null);
              window.history.pushState(null, '', '/');
              setTimeout(() => {
                const elem = document.getElementById('contacto');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }, 80);
            }}
          />
        ) : (
          /* Vista Principal de la Landing Page */
          <>
            {/* Hero Section */}
            <Hero
              onStartCalculator={() => scrollToSection('calculador')}
              onGoToContact={() => scrollToSection('contacto')}
            />

            {/* Diagnostic Instrumentation Quartet (Minneapolis, Termografía, Humo, Anemómetro) */}
            <DiagnosticTech />

            {/* Interactive 50 Pa Digital Manometer Simulator & Leakage Visualizer */}
            <ManometerSimulator
              onGoToContact={() => scrollToSection('contacto')}
            />

            {/* Specialized Services Grid */}
            <ServicesGrid
              onSelectService={handleSelectService}
            />

            {/* Interactive "Calcula qué ensayo necesitas" Wizard */}
            <BlowerdoorCalculator
              onApplyRecommendation={handleApplyCalculatorRecommendation}
            />

            {/* Regional Coverage (Madrid, CyL, Asturias, Cantabria, Euskadi) */}
            <GeographicCoverage />

            {/* AEO / GEO Knowledge Base and Structured Technical FAQ */}
            <AeoKnowledgeBase />

            {/* Technical Blog & WordPress REST API Integration (Permite abrir artículo completo) */}
            <BlogPosts onSelectPost={handleSelectPost} />

            {/* Validated Quote Request Form to hola@n50.es */}
            <ContactForm initialData={formDataState} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onOpenCloudflareModal={() => setCloudflareModalOpen(true)}
      />

      {/* Cloudflare Pages Static Bundle Exporter & Code Viewer */}
      <CloudflareExportModal
        isOpen={cloudflareModalOpen}
        onClose={() => setCloudflareModalOpen(false)}
      />
    </div>
  );
}
