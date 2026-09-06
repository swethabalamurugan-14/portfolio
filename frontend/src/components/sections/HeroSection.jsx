import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export function HeroSection() {
  return (
    <div className="hero-inner">
      {/* Ghost watermark — large background text decoration */}
      <div className="ghost" aria-hidden="true">swetha / dev</div>

      {/* Availability status badge */}
      <div className="status-badge">{PERSONAL_INFO.status}</div>

      {/* Eyebrow greeting */}
      <div className="eyebrow">
        Hello <b>there</b>,
      </div>

      {/* Hero headline */}
      <h1 className="hero-title" id="hero-title">
        I'm Swetha, a <span className="accent">Software</span> developer.
      </h1>

      {/* Sub-headline bio */}
      <p className="hero-sub">{PERSONAL_INFO.bio}</p>

      {/* CTAs */}
      <div className="cta-row">
        <a className="btn-primary" href="#projects">
          View projects
        </a>
        <a className="btn-ghost" href="#contact">
          Get in touch
        </a>
      </div>

      {/* Terminal code preview */}
      <div className="terminal hero-terminal">
        <div className="terminal-bar">
          <span className="dot r" />
          <span className="dot y" />
          <span className="dot g" />
        </div>
        <div className="terminal-body">
          <div>
            <span className="prompt">&gt;&gt;&gt;</span>{' '}
            <span className="py">from</span> swetha{' '}
            <span className="py">import</span> skills
          </div>
          <div>
            <span className="prompt">&gt;&gt;&gt;</span> skills.stack()
          </div>
          <div className="out">
            ['Python', 'Django', 'React.js', 'MySQL', 'JavaScript']
            <span className="cursor" />
          </div>
        </div>
      </div>
    </div>
  );
}
