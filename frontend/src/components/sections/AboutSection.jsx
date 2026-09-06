import React from 'react';
import { PERSONAL_INFO, STATS_CARDS } from '../../data/portfolioData';

export function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="card section-card" id="about">
      <div className="section-inner">
        <div className="section-label">About</div>
        <h2 className="section-title" id="about-title">
          <span className="section-number">01</span>
          A little about me
        </h2>

        <div className="about-grid">
          {/* Left column: bio terminal */}
          <div className="about-left">
            <div className="terminal about-terminal">
              <div className="terminal-bar">
                <span className="dot r" />
                <span className="dot y" />
                <span className="dot g" />
              </div>
              <div className="terminal-body">
                <div>
                  <span className="prompt">$</span> cat about-me.md
                </div>
                <br />
                <p style={{ color: '#D8D5C8', lineHeight: '1.7' }}>
                  Versatile Software Developer skilled in Python, SQL, and modern web
                  technologies, with experience building scalable applications and managing
                  databases.
                </p>
                <br />
                <p style={{ color: '#D8D5C8', lineHeight: '1.7' }}>
                  Proficient in both frontend and backend development, with strong
                  problem-solving, debugging, and collaboration skills. Passionate about
                  delivering efficient, maintainable software and continuously learning
                  emerging technologies.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: stat cards grid */}
          <div className="about-right stats-grid">
            {STATS_CARDS.map((card, idx) => (
              <div
                key={idx}
                className={`stat-card${card.isWide ? ' stat-card-wide' : ''}`}
              >
                {card.isWide ? (
                  <>
                    <span className="stat-key">{card.label}</span>
                    <span className={`stat-value${card.isSmallVal ? ' stat-value-small' : ''}`}>
                      {card.value}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="stat-value">{card.value}</span>
                    <span className="stat-key">{card.label}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
