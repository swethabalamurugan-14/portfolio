import React, { useState } from 'react';
import {
  TECH_STACK_CATEGORIES,
  TECH_DETAILS_MAP,
  PROJECTS_DATA,
} from '../../data/portfolioData';

export function TechStackSection() {
  const [selectedTech, setSelectedTech] = useState('Python');

  const currentDetails = TECH_DETAILS_MAP[selectedTech] || TECH_DETAILS_MAP['Python'];

  const mappedProjects = PROJECTS_DATA.filter((proj) =>
    (currentDetails.mappedProjects || []).includes(proj.slug)
  );

  const handleProofClick = (e, targetSlug) => {
    e.preventDefault();
    const cardEl = document.getElementById(targetSlug);
    if (cardEl) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      cardEl.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'center',
      });
      cardEl.classList.add('proof-highlight');
      setTimeout(() => cardEl.classList.remove('proof-highlight'), 1400);
    }
  };

  return (
    <section aria-labelledby="stack-title" className="card section-card" id="stack">
      <div className="section-inner">
        <div className="section-label">Tech stack</div>
        <h2 className="section-title" id="stack-title">
          <span className="section-number">02</span>
          Tools I use to build
        </h2>

        <p className="stack-intro">
          A practical stack I use to build responsive interfaces, full-stack applications,
          and database-driven software.
        </p>

        <div className="stack-layout">
          {/* Left: accordion folder groups */}
          <div className="stack-groups">
            {TECH_STACK_CATEGORIES.map((cat) => (
              <details
                key={cat.category}
                className="stack-folder"
                open={cat.category === 'Languages'}
              >
                <summary>
                  <span>{cat.category}</span>
                  <span className="folder-count">{cat.count}</span>
                </summary>
                <div className="stack-folder-body">
                  {cat.technologies.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      aria-pressed={selectedTech === tech}
                      className={`tech-pill${selectedTech === tech ? ' selected' : ''}`}
                      onClick={() => setSelectedTech(tech)}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </details>
            ))}
          </div>

          {/* Right: sticky proof panel */}
          <aside aria-live="polite" className="tech-detail">
            <div className="tech-detail-kicker">Selected technology / proof</div>
            <div className="tech-detail-content">
              <div>
                <div className="tech-detail-title">{selectedTech}</div>
                <p>{currentDetails.description}</p>
              </div>
              <div className="tech-detail-meta">{currentDetails.usageMeta}</div>
            </div>

            <span className="tech-proof-heading">Used in projects</span>
            <div className="tech-proof">
              {mappedProjects.length > 0 ? (
                mappedProjects.map((proj) => (
                  <a
                    key={proj.slug}
                    href={`#${proj.slug}`}
                    className="tech-proof-link"
                    onClick={(e) => handleProofClick(e, proj.slug)}
                  >
                    <span>{proj.title}</span>
                    <span>View proof →</span>
                  </a>
                ))
              ) : (
                <span className="tech-proof-empty">
                  No project mapped to this technology yet.
                </span>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
