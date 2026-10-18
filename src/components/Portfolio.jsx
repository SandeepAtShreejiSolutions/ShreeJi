import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const Portfolio = () => {
  const content = useSiteContent();
  const projects = content.projects || [];
  return (
    <section id="portfolio" className="section container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="section-title animate-fade-in" style={{ marginBottom: '0.5rem', textAlign: 'left' }}>Featured Work</h2>
          <p className="text-muted">Explore how we've helped businesses transform digitally.</p>
        </div>
        <a href="#contact" className="btn btn-outline animate-fade-in delay-100">
          View All Projects <ArrowRight size={18} />
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {projects.map((project, index) => (
          <div key={project.id || project.slug || project.title || index} className="glass-panel animate-fade-in delay-200" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
              {(project.metrics || project.is_sample) && <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(8px)', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-primary)', zIndex: 1 }}>
                {project.is_sample ? 'Illustrative concept' : project.metrics}
              </div>}
              {project.image_url && <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />}
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="text-gradient" style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{project.category}</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>{project.title}</h3>
                {project.description && <p className="text-muted" style={{ marginTop: '0.5rem' }}>{project.description}</p>}
              </div>
              <a href={project.website_url || '#contact'} aria-label={`Learn more about ${project.title}`} style={{ background: '#eaf2ff', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s ease' }} className="project-link">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
