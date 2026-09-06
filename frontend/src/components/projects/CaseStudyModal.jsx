import React, { useEffect, useRef } from 'react';
import { trackEvent } from '../../utils/analytics';

export function CaseStudyModal({ isOpen, onClose, caseStudy }) {
  const closeBtnRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      // Focus close button on open
      requestAnimationFrame(() => closeBtnRef.current?.focus());
      if (caseStudy) {
        trackEvent('case_study_open', { title: caseStudy.title }, caseStudy.slug);
      }
    } else {
      document.body.classList.remove('modal-open');
    }

    function handleKeyDown(e) {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Trap focus within modal
      if (e.key === 'Tab' && overlayRef.current) {
        const focusables = [
          ...overlayRef.current.querySelectorAll(
            'button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])'
          ),
        ];
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!caseStudy) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden={!isOpen}
      aria-labelledby="cs-modal-title"
      aria-modal="true"
      className={`modal-overlay${isOpen ? ' open' : ''}`}
      role="dialog"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`modal-card${isOpen ? ' open' : ''}`}>
        {/* Modal title bar */}
        <div className="modal-bar">
          <div className="modal-dots">
            <span className="dot r" />
            <span className="dot y" />
            <span className="dot g" />
          </div>
          <button
            ref={closeBtnRef}
            aria-label="Close case study"
            className="modal-close"
            data-close="cs-modal"
            type="button"
            onClick={onClose}
          >
            close ✕
          </button>
        </div>

        {/* Modal body */}
        <div className="modal-body">
          <h3 id="cs-modal-title">{caseStudy.title}</h3>

          <div className="cs-block">
            <div className="cs-label">problem</div>
            <p className="cs-text">{caseStudy.problem}</p>
          </div>

          <div className="cs-block">
            <div className="cs-label">role</div>
            <p className="cs-text">{caseStudy.role}</p>
          </div>

          <div className="cs-block">
            <div className="cs-label">architecture</div>
            <p className="cs-text">{caseStudy.architecture}</p>
          </div>

          <div className="cs-block">
            <div className="cs-label">outcome</div>
            <p className="cs-text">{caseStudy.outcome}</p>
          </div>

          {caseStudy.gitLog && (
            <div className="cs-block">
              <div className="cs-label">git log</div>
              <div className="git-log">
                {caseStudy.gitLog.map((item, idx) => (
                  <div key={idx} className="commit">
                    <span className="hash">{item.hash}</span>
                    <span>{item.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
