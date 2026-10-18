import React from 'react';
import { ArrowUpRight, Globe, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-column">
            <a className="footer-brand" href="#home" aria-label="ShreeG Solutions home">
              <img src="/shreeg-circular-logo.png" alt="" />
              <span>Shree<span>G</span> Solutions</span>
            </a>
            <p>AI-enabled software for business workflows, products, e-commerce, and digital experiences.</p>
            <a className="footer-cta" href="#contact">Let’s talk about your project <ArrowUpRight size={18} /></a>
          </div>

          <div className="footer-column">
            <h2>Explore</h2>
            <nav className="footer-nav" aria-label="Footer navigation">
              <a href="#about">About us</a>
              <a href="#services">Our services</a>
              <a href="#portfolio">Projects</a>
              <a href="#blogs">Insights</a>
              <a href="#testimonials">Testimonials</a>
            </nav>
          </div>

          <div className="footer-column footer-contact-column">
            <h2>Reach us</h2>
            <a href="tel:+918208342346"><Phone size={17} /> +91 8208342346</a>
            <a href="mailto:support.shreegsolutions@gmail.com"><Mail size={17} /> support.shreegsolutions@gmail.com</a>
            <a href="https://maps.google.com/?q=Dongarpada%2C+Pelhar%2C+Vasai+East%2C+Palghar+401208" target="_blank" rel="noreferrer"><MapPin size={17} /> Dongarpada, Pelhar, Vasai East,<br /> Palghar 401208</a>
            <a href="https://shreegsolution.com" target="_blank" rel="noreferrer"><Globe size={17} /> shreegsolution.com</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ShreeG Solutions. All rights reserved.</span>
          <div className="footer-legal"><a href="#">Privacy policy</a><a href="#">Terms of service</a></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
