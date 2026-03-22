import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: 'rgba(7, 9, 15, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
             Shree Ji <span style={{ color: 'var(--color-primary)' }}>.</span>
          </div>
          <div style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="nav-links">
            <a href="#about" style={{ fontSize: '0.875rem', fontWeight: '500' }}>About</a>
            <a href="#services" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Services</a>
            <a href="#portfolio" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Work</a>
            <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Get in Touch</a>
          </div>
          <style>{`
            @media (min-width: 768px) { .nav-links { display: flex !important; } }
            input:focus, textarea:focus { border-color: var(--color-primary) !important; outline: none; }
            .project-link:hover { background: var(--color-primary) !important; transform: rotate(45deg); }
          `}</style>
        </div>
      </nav>
      
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
