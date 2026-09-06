import React, { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useActiveSection } from './hooks/useActiveSection';
import { trackEvent } from './utils/analytics';
import { Header } from './components/layout/Header';
import { GlowTrailNav } from './components/layout/GlowTrailNav';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { ContactSection } from './components/sections/ContactSection';

// Section order: About → Stack → Projects → Experience → Philosophy → Contact
const SECTION_IDS = ['about', 'stack', 'projects', 'experience', 'philosophy', 'contact'];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);

  // Track initial page view
  useEffect(() => {
    trackEvent('page_view');
  }, []);

  // Track section changes
  useEffect(() => {
    if (activeSection) {
      trackEvent('section_view', { section: activeSection }, null, `/#${activeSection}`);
    }
  }, [activeSection]);

  // Scroll progress bar + back-to-top visibility + section reveal
  useEffect(() => {
    const progressBar = document.getElementById('scrollProgress');
    const backToTopBtn = document.getElementById('backToTop');

    function updateScrollUI() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (backToTopBtn) backToTopBtn.classList.toggle('visible', window.scrollY > 500);
    }

    updateScrollUI();
    window.addEventListener('scroll', updateScrollUI, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
      });
    }

    // Section reveal animation — observe all .section-card elements
    document.documentElement.classList.add('reveal-enabled');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06 }
      );
      document.querySelectorAll('.section-card').forEach((el) => obs.observe(el));
    } else {
      document.querySelectorAll('.section-card').forEach((el) => el.classList.add('revealed'));
    }

    return () => window.removeEventListener('scroll', updateScrollUI);
  }, []);

  return (
    <>
      {/* Skip link for accessibility */}
      <a className="skip-link" href="#main-content">Skip to main content</a>

      {/* Scroll progress bar — fixed at viewport top */}
      <div aria-hidden="true" className="scroll-progress" id="scrollProgress" />

      {/* Back to top button — fixed at viewport bottom-right */}
      <button
        aria-label="Back to top"
        className="back-to-top"
        id="backToTop"
        type="button"
      >
        ↑<span className="back-to-top-label">TOP</span>
      </button>

      <div className="page-shell">
        {/* Single unified page column */}
        <div className="page">

          {/* Hero card — wraps site header + hero section */}
          <div aria-labelledby="hero-title" className="card" id="home">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <HeroSection />
          </div>

          {/* Main content — skip link target, wraps all section cards */}
          <main
            className="sections-wrapper"
            id="main-content"
            tabIndex={-1}
          >
            <AboutSection />
            <TechStackSection />
            <ProjectsSection />
            <ExperienceSection />
            <PhilosophySection />
            <ContactSection />
          </main>

          <Footer />
        </div>

        {/* GlowTrail fixed vertical navigation rail */}
        <GlowTrailNav activeSection={activeSection} />
      </div>
    </>
  );
}
