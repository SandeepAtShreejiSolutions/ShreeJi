import React from 'react';
import { BrainCircuit, Workflow, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="text-gradient" size={32} />,
    title: "AI shaped around your work",
    description: "We connect AI to your business knowledge, customers, and processes so each solution addresses a specific need."
  },
  {
    icon: <Workflow className="text-gradient" size={32} />,
    title: "Software built for real workflows",
    description: "From e-commerce and mobile apps to web platforms and integrations, we build practical software with AI where it adds value."
  },
  {
    icon: <Lightbulb className="text-gradient" size={32} />,
    title: "Human-led, responsibly applied",
    description: "We pair automation with clear review, privacy-aware design, and human support for decisions that need judgment."
  }
];

const About = () => {
  return (
    <section id="about" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="section-title animate-fade-in" style={{ marginBottom: '1.5rem' }}>Who We Are</h2>
        <p className="text-muted animate-fade-in delay-100" style={{ fontSize: '1.125rem' }}>
          ShreeG Solutions helps businesses apply AI throughout software development and digital operations. We plan, design, and build solutions such as AI-enabled e-commerce, business-specific AI fine-tuning, marketing tools, mobile apps, and custom products—always starting with the problem the software should solve.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {features.map((feature, index) => (
          <div key={index} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '12px' }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>{feature.title}</h3>
            <p className="text-muted">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
