import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(7, 9, 15, 0) 70%)',
        filter: 'blur(80px)', zIndex: 0
      }}></div>

      <div className="glass-panel animate-fade-in" style={{ padding: '4rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>Let's Build Something Great</h2>
            <p className="text-muted" style={{ marginBottom: '2.5rem', fontSize: '1.125rem' }}>
              Ready to elevate your brand's digital presence? Get in touch with our team of experts today.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(124, 58, 237, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Email Us</div>
                  <div style={{ fontWeight: '500' }}>support.shreejisolution@gmail.com</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-secondary)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Call Us</div>
                  <div style={{ fontWeight: '500' }}>+91 9503644277</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-accent)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Location</div>
                  <div style={{ fontWeight: '500' }}>Mumbai, India</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <input type="text" name="First Name" required placeholder="First Name" style={{ flex: '1 1 120px', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontFamily: 'inherit' }} />
                <input type="text" name="Last Name" required placeholder="Last Name" style={{ flex: '1 1 120px', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontFamily: 'inherit' }} />
              </div>
              <input type="email" name="Email Address" required placeholder="Email Address" style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontFamily: 'inherit' }} />
              <textarea name="Message" required placeholder="Tell us about your project" rows="4" style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontFamily: 'inherit', resize: 'none' }}></textarea>
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
