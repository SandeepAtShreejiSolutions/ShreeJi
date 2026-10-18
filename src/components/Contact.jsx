import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const formData = new FormData(e.target);
    // Ensure form data can be easily read by FormSubmit
    formData.append('_subject', 'New Contact from Shree Ji Solution Website!');
    formData.append('_captcha', 'false');

    try {
      const response = await fetch("https://formsubmit.co/ajax/9e278056816124eb2470e2f563dd0525", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        setStatus('Message sent successfully!');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('Failed to send. Please try again.');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred. Please try again later.');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="section container" style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '20%', right: '-10%', width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(244, 119, 22, 0.12) 0%, rgba(245, 248, 252, 0) 70%)',
        filter: 'blur(80px)', zIndex: 0
      }}></div>

      <div className="glass-panel animate-fade-in" style={{ padding: 'clamp(1.5rem, 5vw, 4rem)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>Let's Build an AI Solution for Your Business</h2>
            <p className="text-muted" style={{ marginBottom: '2.5rem', fontSize: '1.125rem' }}>
              Tell us about the workflow, product, or customer experience you want to improve with AI-enabled software.
            </p>
            
            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-icon"><Mail size={24} /></div>
                <div><div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Email Us</div>
                  <a href="mailto:support.shreegsolutions@gmail.com" style={{ fontWeight: '600' }}>support.shreegsolutions@gmail.com</a></div>
              </div>
              <div className="contact-detail">
                <div className="contact-icon"><Phone size={24} /></div>
                <div><div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Call Us</div>
                  <a href="tel:+918208342346" style={{ fontWeight: '600' }}>+91 8208342346</a></div>
              </div>
              <div className="contact-detail">
                <div className="contact-icon"><MapPin size={24} /></div>
                <div><div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Location</div>
                  <div style={{ fontWeight: '600' }}>Dongarpada, Pelhar, Vasai East, Palghar 401208</div></div>
              </div>
              <div className="contact-detail">
                <div className="contact-icon"><Globe size={24} /></div>
                <div><div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Website</div>
                  <a href="https://shreegsolution.com" target="_blank" rel="noreferrer" style={{ fontWeight: '600' }}>shreegsolution.com</a></div>
              </div>
            </div>
          </div>

          <div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <input className="contact-input" type="text" name="First Name" required placeholder="First Name" style={{ flex: '1 1 120px' }} />
                <input className="contact-input" type="text" name="Last Name" required placeholder="Last Name" style={{ flex: '1 1 120px' }} />
              </div>
              <input className="contact-input" type="email" name="Email Address" required placeholder="Email Address" />
              <textarea className="contact-input" name="Message" required placeholder="Tell us about your project" rows="4" style={{ resize: 'vertical' }}></textarea>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', opacity: status === 'Sending...' ? 0.7 : 1 }} disabled={status === 'Sending...'}>
                {status === 'Sending...' ? 'Sending...' : 'Send Message'} {status !== 'Sending...' && <Send size={18} />}
              </button>
              
              {status && status !== 'Sending...' && (
                <div className="animate-fade-in" style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.875rem', color: status.includes('successfully') ? 'var(--color-secondary)' : 'var(--color-accent)' }}>
                  {status}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
