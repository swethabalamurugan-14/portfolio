import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export function Footer() {
  return (
    <footer aria-label="Portfolio footer" className="site-footer">
      {/* Brand column */}
      <div className="footer-brand">
        <a aria-label="Go to about section" className="about-me" href="#about">
          <span className="footer-avatar">/s</span>
          <div>
            <div className="footer-brand-name">swetha/dev</div>
            <div className="footer-note">{PERSONAL_INFO.role}</div>
          </div>
        </a>
      </div>

      {/* Social links */}
      <nav aria-label="Social links" className="footer-socials">
        <a
          className="footer-link"
          href={PERSONAL_INFO.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub ↗
        </a>
        <a
          className="footer-link"
          href={PERSONAL_INFO.linkedin}
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn ↗
        </a>
        <a className="footer-link" href={`mailto:${PERSONAL_INFO.email}`}>
          Email ↗
        </a>
      </nav>

      {/* Credit */}
      <div className="footer-credit">
        © 2026 · Built with Django &amp; React ·{' '}
        <a className="footer-top-link" href="#home">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
