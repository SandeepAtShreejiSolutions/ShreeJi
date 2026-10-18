import React from 'react';
import { Search, Share2, Code, Megaphone, Smartphone, BarChart, Sparkles, Zap, ShoppingBag, Brain, Lightbulb } from 'lucide-react';
import { useContentStatus, useSiteContent } from '../context/ContentContext';

const iconMap = { Search, Share2, Code, Megaphone, Smartphone, BarChart, Sparkles, Zap, ShoppingBag, Brain, Lightbulb };

const Services = () => {
  const content = useSiteContent();
  const { contentError, isLoading, refresh } = useContentStatus();
  const services = content.services || [];
  return (
    <section id="services" className="section container" style={{ position: 'relative' }}>
      <h2 className="section-title animate-fade-in">AI-enabled software solutions</h2>

      {contentError && <div className="content-load-error" role="status">
        <span>Couldn’t load the latest published content from Supabase: {contentError}</span>
        <button type="button" onClick={refresh}>Retry</button>
      </div>}
      {!contentError && isLoading && <p className="content-load-status" role="status">Loading the latest published services…</p>}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {services.map((service, index) => (
          <div key={service.id || service.slug || service.title || index} className="glass-panel animate-fade-in delay-100" style={{ padding: '2rem', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: '#eaf2ff', padding: '0.75rem', borderRadius: '12px' }}>
                {React.createElement(iconMap[service.icon] || Sparkles, { size: 28, color: 'var(--color-primary)' })}
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>{service.title}</h3>
            </div>
            <p className="text-muted" style={{ lineHeight: '1.7' }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
