import React, { useState } from 'react';
import api from '../../utils/api';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { trackEvent } from '../../utils/analytics';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const [copyStatus, setCopyStatus] = useState('');

  const [hasTrackedOpen, setHasTrackedOpen] = useState(false);

  const handleChange = (e) => {
    if (!hasTrackedOpen) {
      trackEvent('contact_open');
      setHasTrackedOpen(true);
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      trackEvent('contact_submit');
      const response = await api.post('/api/contact/', formData);

      if (response.status === 201 || response.data?.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(response.data?.message || 'Submission failed');
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Message recorded offline. Please email swethabalamurugan7414@gmail.com directly.';
      setStatus({ submitting: false, success: false, error: errorMsg });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus(''), 1600);
    } catch {
      setCopyStatus('copy');
      setTimeout(() => setCopyStatus(''), 1600);
    }
  };

  return (
    <section aria-labelledby="contact-title" className="card section-card" id="contact">
      <div className="section-inner">
        <div className="section-label">Contact</div>
        <h2 className="section-title" id="contact-title">
          <span className="section-number">06</span>
          Let's build something together
        </h2>

        <div className="contact-grid">
          {/* Left: contact form */}
          <div className="contact-left">
            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label" htmlFor="cName">name</label>
                <input
                  className="field-input"
                  id="cName"
                  name="name"
                  placeholder="Your name"
                  required
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="cEmail">email</label>
                <input
                  className="field-input"
                  id="cEmail"
                  name="email"
                  placeholder="you@email.com"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="cSubject">subject (optional)</label>
                <input
                  className="field-input"
                  id="cSubject"
                  name="subject"
                  placeholder="Project inquiry / Opportunity"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="cMsg">message</label>
                <textarea
                  className="field-textarea"
                  id="cMsg"
                  name="message"
                  placeholder="What are you reaching out about?"
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                className="contact-submit"
                disabled={status.submitting}
                type="submit"
              >
                {status.submitting ? 'Sending…' : 'Send message'}
              </button>

              {status.success && (
                <div
                  className="contact-response show"
                  role="status"
                  style={{ color: '#3FB66F' }}
                >
                  &gt; message sent ✓ — I'll get back to you soon.
                </div>
              )}
              {status.error && (
                <div
                  className="contact-response show"
                  role="status"
                  style={{ color: '#E5544A' }}
                >
                  &gt; {status.error}
                </div>
              )}
            </form>
          </div>

          {/* Right: contact info terminal */}
          <div className="contact-right">
            <div className="terminal">
              <div className="terminal-bar">
                <span className="dot r" />
                <span className="dot y" />
                <span className="dot g" />
              </div>
              <div className="terminal-body" style={{ fontSize: 12, lineHeight: '1.75' }}>
                <div>
                  <span className="prompt">$</span> whois swetha
                </div>
                <div className="out">based_in: {PERSONAL_INFO.location}</div>
                <div className="out">
                  email:{' '}
                  <a
                    className="term-link"
                    href={`mailto:${PERSONAL_INFO.email}`}
                  >
                    {PERSONAL_INFO.email}
                  </a>{' '}
                  <button
                    aria-label="Copy email address"
                    className="copy-email"
                    type="button"
                    onClick={handleCopyEmail}
                  >
                    {copyStatus || 'copy'}
                  </button>
                  <span
                    aria-live="polite"
                    id="copyEmailStatus"
                    role="status"
                    style={{ marginLeft: 8, fontSize: 9, color: '#8FD19E', fontFamily: "'JetBrains Mono', monospace" }}
                  />
                </div>
                <div className="out">
                  phone:{' '}
                  <a
                    className="term-link"
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
                <div className="out">
                  github:{' '}
                  <a
                    className="term-link"
                    href={PERSONAL_INFO.github}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    swethabalamurugan-14
                  </a>
                </div>
                <div className="out">
                  linkedin:{' '}
                  <a
                    className="term-link"
                    href={PERSONAL_INFO.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    swethabalamurugan
                  </a>
                  <span className="cursor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
