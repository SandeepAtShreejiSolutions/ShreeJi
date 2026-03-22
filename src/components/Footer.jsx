import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '4rem 0 2rem', marginTop: '4rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles color="var(--color-primary)" /> Shree Ji
          </div>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>
            Transforming businesses through innovative digital marketing and superior technical solutions.
          </p>
        </div>

        <div>
           <h4 style={{ marginBottom: '1.5rem', color: 'white' }}>Company</h4>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--color-text-muted)' }}>
             <a href="#about" style={{ transition: 'color 0.3s ease' }}>About Us</a>
             <a href="#services" style={{ transition: 'color 0.3s ease' }}>Services</a>
             <a href="#portfolio" style={{ transition: 'color 0.3s ease' }}>Portfolio</a>
             <a href="#contact" style={{ transition: 'color 0.3s ease' }}>Contact</a>
           </div>
        </div>

        <div>
           <h4 style={{ marginBottom: '1.5rem', color: 'white' }}>Follow Us</h4>
           <div style={{ display: 'flex', gap: '1rem' }}>
             <a href="#" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '50%', color: 'white', transition: 'all 0.3s ease' }}>
               <Facebook size={20} />
             </a>
             <a href="#" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '50%', color: 'white', transition: 'all 0.3s ease' }}>
               <Twitter size={20} />
             </a>
             <a href="#" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '50%', color: 'white', transition: 'all 0.3s ease' }}>
               <Instagram size={20} />
             </a>
             <a href="#" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '50%', color: 'white', transition: 'all 0.3s ease' }}>
               <Linkedin size={20} />
             </a>
           </div>
        </div>
      </div>
      
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
        <div>&copy; {new Date().getFullYear()} Shree Ji Solution. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
