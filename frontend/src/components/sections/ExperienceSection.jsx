import React from 'react';
import { JOURNEY_BLOCKS } from '../../data/portfolioData';

export function ExperienceSection() {
  const experienceBlock = JOURNEY_BLOCKS.find((b) => b.label.includes('Experience'));
  const educationBlock = JOURNEY_BLOCKS.find((b) => b.label.includes('Education'));
  const achievementsBlock = JOURNEY_BLOCKS.find((b) => b.label.includes('Achievements'));

  return (
    <section aria-labelledby="experience-title" className="card section-card" id="experience">
      <div className="section-inner">
        <div className="section-label">Experience · Education</div>
        <h2 className="section-title" id="experience-title">
          <span className="section-number">04</span>
          My journey so far
        </h2>

        <div className="journey-grid">
          {/* Experience block (featured / wider) */}
          {experienceBlock && (
            <article className="journey-block journey-featured">
              <span className="journey-block-label">{experienceBlock.label}</span>
              {experienceBlock.entries.map((entry, idx) => (
                <div key={idx} className="journey-entry">
                  <div className="timeline-date">{entry.date}</div>
                  <h3 className="timeline-title">{entry.title}</h3>
                  {entry.bullets && (
                    <ul className="timeline-list">
                      {entry.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {entry.desc && (
                    <p className="timeline-desc">{entry.desc}</p>
                  )}
                </div>
              ))}
            </article>
          )}

          {/* Education block */}
          {educationBlock && (
            <article className="journey-block">
              <span className="journey-block-label">{educationBlock.label}</span>
              {educationBlock.entries.map((entry, idx) => (
                <div key={idx} className="journey-entry">
                  <div className="timeline-date">{entry.date}</div>
                  <h3 className="timeline-title">{entry.title}</h3>
                  {entry.desc && (
                    <p className="timeline-desc">{entry.desc}</p>
                  )}
                </div>
              ))}
            </article>
          )}

          {/* Achievements block */}
          {achievementsBlock && (
            <article className="journey-block">
              <span className="journey-block-label">{achievementsBlock.label}</span>
              {achievementsBlock.entries.map((entry, idx) => (
                <div key={idx} className="journey-entry">
                  <div className="timeline-date">{entry.date}</div>
                  <h3 className="timeline-title">{entry.title}</h3>
                  {entry.desc && (
                    <p className="timeline-desc">{entry.desc}</p>
                  )}
                </div>
              ))}
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
