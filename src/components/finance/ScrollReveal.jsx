import React, { useEffect, useRef, useState } from 'react';

/**
 * Lightweight CSS-only-ish reveal without extra deps.
 * Adds `wf-in` once element is in viewport.
 */
// @ts-ignore
export default function ScrollReveal({ children, className = '', delayMs = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`wf-reveal ${inView ? 'wf-in' : ''} ${className}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

