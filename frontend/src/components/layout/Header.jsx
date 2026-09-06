import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { trackEvent } from '../../utils/analytics';

function SunIcon() {
  return (
    <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
      <path d="M12 5a7 7 0 100 14A7 7 0 0012 5zM1 12a1 1 0 011-1h1a1 1 0 010 2H2a1 1 0 01-1-1zm19 0a1 1 0 011-1h1a1 1 0 010 2h-1a1 1 0 01-1-1zm-8-9a1 1 0 011 1v1a1 1 0 01-2 0V4a1 1 0 011-1zm0 17a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zM5.64 4.22a1 1 0 011.41 0l.71.71a1 1 0 01-1.41 1.41l-.71-.71a1 1 0 010-1.41zm12.02 12.02a1 1 0 011.41 0l.71.71a1 1 0 01-1.41 1.41l-.71-.71a1 1 0 010-1.41zM4.22 18.36a1 1 0 010-1.41l.71-.71a1 1 0 011.41 1.41l-.71.71a1 1 0 01-1.41 0zm12.02-12.02a1 1 0 010-1.41l.71-.71a1 1 0 011.41 1.41l-.71.71a1 1 0 01-1.41 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
      <path d="M12 2a10 10 0 000 20 10 10 0 000-20zm0 2v16a8 8 0 010-16z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5 3.3 9.3 7.9 10.8.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

export function Header({ theme, toggleTheme }) {
  const [clockStr, setClockStr] = useState('GMT / --:--:-- --');
  const [dateStr, setDateStr] = useState('--- --/--/----');

  useEffect(() => {
    function pad(n) {
      return n.toString().padStart(2, '0');
    }
    function updateClock() {
      const now = new Date();
      const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      let h = utc.getHours();
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12;
      setClockStr(`GMT / ${pad(h)}:${pad(utc.getMinutes())}:${pad(utc.getSeconds())} ${ampm}`);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      setDateStr(`${days[utc.getDay()]} ${pad(utc.getDate())}/${pad(utc.getMonth() + 1)}/${utc.getFullYear()}`);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResumeClick = () => {
    trackEvent('resume_download');
  };

  return (
    <header className="site-header">
      {/* Logo */}
      <a className="logo" href="#home">
        swetha<span>/</span>dev
      </a>

      {/* Live clock — hidden on mobile */}
      <div className="header-meta">
        <span id="clock">{clockStr}</span>
        <span>{dateStr}</span>
      </div>

      {/* Action icons */}
      <div className="header-icons">
        <a
          aria-label="Download Swetha Balamurugan résumé PDF"
          className="header-resume"
          download="Swetha-Balamurugan-Resume.pdf"
          href={PERSONAL_INFO.resumePath}
          onClick={handleResumeClick}
        >
          Resume ↓
        </a>

        <button
          aria-label="Toggle dark mode"
          aria-pressed={theme === 'dark'}
          className="icon-btn"
          id="themeToggle"
          type="button"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <a
          aria-label="GitHub profile"
          className="icon-btn"
          href={PERSONAL_INFO.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <GithubIcon />
        </a>
      </div>
    </header>
  );
}
