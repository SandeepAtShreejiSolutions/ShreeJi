import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CmsAdmin from './components/CmsAdmin';
import ManagedContent from './components/ManagedContent';
import ContentDetail from './components/ContentDetail';
import { ContentProvider } from './context/ContentContext';

function App() {
  if (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')) return <CmsAdmin />;
  const routeParts = window.location.pathname.split('/').filter(Boolean);
  const detailType = routeParts[0] === 'blogs' ? 'blogs' : routeParts[0] === 'stories' ? 'testimonials' : null;
  const detailSlug = detailType ? decodeURIComponent(routeParts.slice(1).join('/')) : null;

  return (
    <ContentProvider>
    {detailType ? <ContentDetail type={detailType} slug={detailSlug} /> : <>
      <nav className="site-nav">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <a href="#home" className="brand-link" aria-label="ShreeG Solutions home">
            <img src="/shreeg-circular-logo.png" alt="ShreeG Solutions logo" />
            <span>Shree<span style={{ color: 'var(--color-primary)' }}>G</span> Solutions</span>
          </a>
          <div className="nav-links">
            <a href="#about" style={{ fontSize: '0.875rem', fontWeight: '500' }}>About</a>
            <a href="#services" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Services</a>
            <a href="#portfolio" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Work</a>
            <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Get in Touch</a>
          </div>
          <style>{`.project-link:hover { background: var(--color-primary) !important; color: white; transform: rotate(45deg); }`}</style>
        </div>
      </nav>
      
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <ManagedContent />
        <Contact />
      </main>

      <Footer />
    </>}
    </ContentProvider>
  );
}

export default App;
