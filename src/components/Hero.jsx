import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="section flex-center" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Dynamic Background Elements */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(7, 9, 15, 0) 70%)',
        filter: 'blur(60px)', zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(7, 9, 15, 0) 70%)',
        filter: 'blur(60px)', zIndex: 0
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div className="animate-fade-in flex-center" style={{ marginBottom: '1.5rem' }}>
          <span className="glass-panel" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--color-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderRadius: '999px' }}>
            <Sparkles size={16} /> Welcome to the Future of Digital
          </span>
        </div>
        
        <h1 className="animate-fade-in delay-100" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
          Elevate Your Brand with <br />
          <span className="text-gradient">Shree Ji Solution</span>
        </h1>
        
        <p className="text-muted animate-fade-in delay-200" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.8' }}>
          We are a premium digital marketing agency providing cutting-edge technical solutions to skyrocket your online presence and drive measurable growth.
        </p>
        
        <div className="flex-center animate-fade-in delay-300" style={{ gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#contact" className="btn btn-primary">
            Start Your Journey <ArrowRight size={18} />
          </a>
          <a href="#services" className="btn btn-secondary">
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
