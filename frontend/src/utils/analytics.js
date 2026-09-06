export async function trackEvent(eventName, metadata = {}, project = null, path = null) {
  try {
    // Keep payloads small and privacy-conscious
    const payload = {
      event_name: eventName,
      project: project,
      path: path || window.location.pathname,
      metadata: metadata,
    };

    // Fire and forget using keepalive so it works even if navigating away
    await fetch('/api/events/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (error) {
    // Analytics failure must NEVER break the portfolio. Fail silently.
    console.debug('Analytics event dropped (ad-blocker or network error)');
  }
}
