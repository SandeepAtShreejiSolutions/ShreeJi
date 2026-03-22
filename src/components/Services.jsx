import React from 'react';
import { Search, Share2, Code, Megaphone, Smartphone, BarChart } from 'lucide-react';

const services = [
  {
    title: "Search Engine Optimization",
    description: "Dominate search results and drive organic, high-intent traffic to your website.",
    icon: <Search size={28} color="var(--color-primary)" />
  },
  {
    title: "Social Media Marketing",
    description: "Build a loyal community and boost brand awareness across all major social platforms.",
    icon: <Share2 size={28} color="var(--color-secondary)" />
  },
  {
    title: "Web Development",
    description: "Custom, high-performance websites built with modern technologies like React and Vite.",
    icon: <Code size={28} color="var(--color-accent)" />
  },
  {
    title: "Pay-Per-Click Advertising",
    description: "Maximize your ROI with targeted ad campaigns on Google, Facebook, and Instagram.",
    icon: <Megaphone size={28} color="var(--color-primary)" />
  },
  {
    title: "Mobile App Solutions",
    description: "Extend your reach with intuitive and engaging mobile applications for iOS and Android.",
    icon: <Smartphone size={28} color="var(--color-secondary)" />
  },
  {
    title: "Data Analytics",
    description: "Make informed decisions based on comprehensive tracking and actionable performance reporting.",
    icon: <BarChart size={28} color="var(--color-accent)" />
  }
];

const Services = () => {
  return (
    <section id="services" className="section container" style={{ position: 'relative' }}>
      <h2 className="section-title animate-fade-in">Our Digital Solutions</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {services.map((service, index) => (
          <div key={index} className="glass-panel animate-fade-in delay-100" style={{ padding: '2rem', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '12px' }}>
                {service.icon}
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
