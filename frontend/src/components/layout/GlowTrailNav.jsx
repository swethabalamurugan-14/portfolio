import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

// Section order matches reference: About → Stack → Projects → Experience → Philosophy → Contact
const SECTIONS = [
  { id: 'about',      label: 'About',      number: '01' },
  { id: 'stack',      label: 'Stack',      number: '02' },
  { id: 'projects',   label: 'Projects',   number: '03' },
  { id: 'experience', label: 'Journey',    number: '04' },
  { id: 'philosophy', label: 'Philosophy', number: '05' },
  { id: 'contact',    label: 'Contact',    number: '06' },
];

export function GlowTrailNav({ activeSection }) {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <aside aria-label="Portfolio section navigation" className="nav-rail">
      <div className="nav-rail-inner">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Go to ${sec.label} section`}
              className={`nav-dot${isActive ? ' active' : ''}`}
              data-section={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => scrollToSection(e, sec.id)}
            >
              <span className="nav-number">{sec.number}</span>
              <span className="nav-label">{sec.label}</span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
