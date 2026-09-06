import React from 'react';
import { PHILOSOPHY_DATA } from '../../data/portfolioData';

export function PhilosophySection() {
  return (
    <section aria-labelledby="philosophy-title" className="card section-card philosophy-card" id="philosophy">
      <div className="section-inner">
        <div className="section-label">Philosophy</div>
        <h2 className="section-title" id="philosophy-title">
          <span className="section-number">05</span>
          How I approach software
        </h2>

        <div className="philosophy-grid">
          <p className="philosophy-lead">{PHILOSOPHY_DATA.lead}</p>
          <div className="philosophy-copy">
            {PHILOSOPHY_DATA.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
