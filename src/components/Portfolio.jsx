import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "E-Commerce Growth",
    category: "SEO & Digital Marketing",
    metrics: "+150% Organic Traffic",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "SaaS Launch Platform",
    category: "Web Development",
    metrics: "2x Conversion Rate",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "App Install Campaign",
    category: "PPC & Social Media",
    metrics: "10k+ New Users",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const Portfolio = () => {
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
          <div key={index} className="glass-panel animate-fade-in delay-200" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--color-secondary)', zIndex: 1 }}>
                {project.metrics}
              </div>
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="text-gradient" style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{project.category}</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>{project.title}</h3>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s ease' }} className="project-link">
                <ExternalLink size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
