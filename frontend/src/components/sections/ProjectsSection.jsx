import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { CaseStudyModal } from '../projects/CaseStudyModal';
import { trackEvent } from '../../utils/analytics';

// GitHub SVG icon (inline to avoid dependency issues)
function GithubIcon({ size = 12 }) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 24 24" width={size}>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5 3.3 9.3 7.9 10.8.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

// Inline mockup previews (CSS art — no screenshot dependencies)
function PgMockup() {
  return (
    <div className="project-mockup pg-mockup" aria-label="PG Management System dashboard preview" role="img">
      <div className="mock-sidebar" />
      <div className="mock-main">
        <div className="mock-topline" />
        <div className="mock-cards"><i /><i /><i /></div>
        <div className="mock-chart" />
        <div className="mock-table"><i /><i /><i /></div>
      </div>
    </div>
  );
}

function MarketMockup() {
  return (
    <div className="project-mockup market-mockup" aria-label="PixelMart digital marketplace preview" role="img">
      <div className="market-head" />
      <div className="market-grid"><i /><i /><i /><i /></div>
    </div>
  );
}

function StudentMockup() {
  return (
    <div className="project-mockup student-mockup" aria-label="Student Management desktop interface preview" role="img">
      <div className="student-toolbar" />
      <div className="student-body"><i /><i /><i /><i /></div>
    </div>
  );
}

function getMockup(type) {
  if (type === 'pg-mockup') return <PgMockup />;
  if (type === 'market-mockup') return <MarketMockup />;
  if (type === 'student-mockup') return <StudentMockup />;
  return null;
}

export function ProjectsSection() {
  const [activeModalCaseStudy, setActiveModalCaseStudy] = useState(null);
  const [projects, setProjects] = useState(PROJECTS_DATA); // Fallback to static initially

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/projects/');
        if (response.data && response.data.length > 0) {
          // Merge API data with static type for mockups
          const apiProjects = response.data.map(apiProj => {
            const staticProj = PROJECTS_DATA.find(p => p.slug === apiProj.slug) || {};
            return {
              id: apiProj.id,
              slug: apiProj.slug,
              title: apiProj.title,
              status: apiProj.status,
              isFeatured: apiProj.is_featured,
              path: apiProj.project_path,
              tagline: apiProj.tagline,
              techs: apiProj.tech_stack || [],
              githubUrl: apiProj.github_url,
              demoUrl: apiProj.demo_url,
              badge: apiProj.badge,
              type: staticProj.type, // keep static mockup type just in case
              caseStudy: apiProj.case_study,
              previewImage: apiProj.preview_image,
              previewSource: apiProj.preview_source,
              github: apiProj.github
            };
          });
          setProjects(apiProjects);
        }
      } catch (err) {
        // Fallback to static data on failure. Errors are tracked in central api.
      }
    };
    fetchProjects();
  }, []);

  const handleProjectInteraction = (eventName, projectSlug) => {
    trackEvent(eventName, { project: projectSlug }, projectSlug);
  };

  const featuredProject = projects.find((p) => p.isFeatured) || projects[0];
  const supportingProjects = projects.filter((p) => !p.isFeatured && p !== featuredProject);

  const renderProjectCard = (proj, isFeatured) => {
    return (
      <div
        key={proj.id || proj.slug}
        id={proj.slug}
        className={`project-card ${isFeatured ? 'featured' : ''}`}
        data-project={proj.slug}
        data-techs={proj.techs.join(',')}
        onMouseEnter={() => trackEvent('project_view', { project: proj.slug }, proj.slug)}
      >
        {/* Path bar */}
        <div className="project-path">
          <span className="dot r" />
          <span className="dot y" />
          <span className="dot g" />
          <span className="path-text">{proj.path}</span>
        </div>

        {/* Mockup preview */}
        <div aria-label={`${proj.title} project preview`} className="project-preview" style={{ padding: proj.previewImage ? 0 : undefined, overflow: 'hidden' }}>
          {proj.previewImage && proj.previewSource !== 'fallback' ? (
             <img src={proj.previewImage} alt={`${proj.title} preview`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          ) : (
             getMockup(proj.type)
          )}
        </div>

        {/* Project body */}
        <div className="project-body">
          <div className="project-title-row">
            <div className="project-title">{proj.title}</div>
            <span className="project-status">● {proj.status}</span>
          </div>
          <p className="project-tagline">{proj.tagline}</p>
          <div className="project-tags">
            {proj.techs.map((t) => (
              <span key={t} className="project-tag">{t}</span>
            ))}
          </div>
          
          {/* GitHub Metadata */}
          {proj.github && (
            <div className="project-github-stats" style={{ fontSize: '11px', color: 'var(--body-quiet-color)', marginTop: '8px', display: 'flex', gap: '12px', fontFamily: "'JetBrains Mono', monospace" }}>
              {proj.github.stars > 0 && <span>★ {proj.github.stars}</span>}
              {proj.github.forks > 0 && <span>⑂ {proj.github.forks}</span>}
              {proj.github.language && <span>{proj.github.language}</span>}
            </div>
          )}

          <div className="project-footer">
            <div className="project-links">
              {proj.githubUrl && (
                <a
                  aria-label={`View ${proj.title} on GitHub`}
                  className="icon-btn"
                  href={proj.githubUrl}
                  rel="noopener noreferrer"
                  style={{ width: 26, height: 26 }}
                  target="_blank"
                  onClick={() => handleProjectInteraction('github_click', proj.slug)}
                >
                  <GithubIcon size={12} />
                </a>
              )}
              {proj.demoUrl && (
                 <a
                 aria-label={`View live demo of ${proj.title}`}
                 className="icon-btn"
                 href={proj.demoUrl}
                 rel="noopener noreferrer"
                 style={{ width: 26, height: 26, fontSize: '11px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                 target="_blank"
                 onClick={() => handleProjectInteraction('live_demo_click', proj.slug)}
               >
                 ↗
               </a>
              )}
            </div>
            {proj.badge && !proj.caseStudy && (
              <span style={{ fontSize: 11, color: 'var(--grey-light)', fontFamily: "'JetBrains Mono', monospace" }}>
                {proj.badge}
              </span>
            )}
            {proj.caseStudy && (
              <button
                className="case-study-btn"
                type="button"
                onClick={() => {
                  handleProjectInteraction('case_study_open', proj.slug);
                  setActiveModalCaseStudy(proj.caseStudy);
                }}
              >
                View case study
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      aria-labelledby="projects-title"
      className="card section-card"
      id="projects"
    >
      <div className="section-inner">
        <div className="section-label">Projects</div>
        <h2 className="section-title" id="projects-title">
          <span className="section-number">03</span>
          Things I've built
        </h2>

        <div className="projects-grid">
          {featuredProject && renderProjectCard(featuredProject, true)}
          {supportingProjects.map((proj) => renderProjectCard(proj, false))}
        </div>
      </div>

      <CaseStudyModal
        isOpen={!!activeModalCaseStudy}
        onClose={() => setActiveModalCaseStudy(null)}
        caseStudy={activeModalCaseStudy}
      />
    </section>
  );
}
