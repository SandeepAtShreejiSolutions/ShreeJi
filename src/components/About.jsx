import React from 'react';
import { Target, TrendingUp, Zap } from 'lucide-react';

const features = [
  {
    icon: <Target className="text-gradient" size={32} />,
    title: "Precision Targeting",
    description: "We identify and engage your ideal audience using data-driven insights and advanced analytics."
  },
  {
    icon: <Zap className="text-gradient" size={32} />,
    title: "Technical Excellence",
    description: "From blazing-fast websites to robust web applications, we build the foundation for your digital success."
  },
  {
    icon: <TrendingUp className="text-gradient" size={32} />,
    title: "Scalable Growth",
    description: "Our marketing strategies are designed not just for immediate gains, but for sustainable, long-term expansion."
  }
];

const About = () => {
  return (
    <section id="about" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="section-title animate-fade-in" style={{ marginBottom: '1.5rem' }}>Who We Are</h2>
        <p className="text-muted animate-fade-in delay-100" style={{ fontSize: '1.125rem' }}>
          Shree Ji Solution bridges the gap between creative marketing and technical execution. We believe going digital is more than just having a website—it's about creating an entire ecosystem that promotes your brand 24/7.
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
