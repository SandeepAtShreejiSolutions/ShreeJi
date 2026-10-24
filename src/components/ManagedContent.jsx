import React, { useEffect } from 'react';
import { useSiteContent } from '../context/ContentContext';
import { findSeoSettings, setCanonicalUrl } from '../lib/seo';

function useManagedMetadata(content) {
  useEffect(() => {
    const settings = findSeoSettings(content.seo_keywords, window.location.pathname);
    const keywordValues = settings ? [settings.title, ...(settings.related_keywords || '').split(',')] : [];
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta');
      keywordsTag.name = 'keywords';
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.content = [...new Set(keywordValues.map((value) => value.trim()).filter(Boolean))].join(', ');

    document.title = settings?.meta_title || 'ShreeG Solutions | SEO, Web Development & Digital Marketing';
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag && settings?.meta_description) descriptionTag.content = settings.meta_description;
    setCanonicalUrl(settings?.canonical_url, window.location.pathname);

    const faq = (content.aeo_keywords || []).filter((item) => item.title && item.answer).map((item) => ({
      '@type': 'Question', name: item.title, acceptedAnswer: { '@type': 'Answer', text: item.answer },
    }));
    let schemaTag = document.getElementById('managed-faq-schema');
    if (!schemaTag && faq.length) {
      schemaTag = document.createElement('script');
      schemaTag.id = 'managed-faq-schema';
      schemaTag.type = 'application/ld+json';
      document.head.appendChild(schemaTag);
    }
    if (schemaTag) schemaTag.textContent = faq.length ? JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq }) : '';
  }, [content]);
}

const Section = ({ id, title, children }) => (
  <section id={id} className="section container">
    <h2 className="section-title">{title}</h2>
    {children}
  </section>
);

const ManagedContent = () => {
  const content = useSiteContent();
  useManagedMetadata(content);
  const blogs = content.blogs || [];
  const testimonials = content.testimonials || [];
  const reviews = content.reviews || [];
  const partners = content.partners || [];
  const clients = content.clients || [];
  const faqs = content.aeo_keywords || [];

  return <>
    {blogs.length > 0 && <section id="blogs" className="section container editorial-section">
      <div className="managed-section-heading"><div><span className="managed-eyebrow">Ideas for AI-enabled business</span><h2 className="section-title">From software to smarter workflows</h2><p className="text-muted">Practical notes on building web, mobile, and business products with AI at the core.</p></div></div>
      <div className="managed-blog-grid">
        {blogs.map((blog) => <a className="managed-card-link" href={`/blogs/${blog.slug}`} key={blog.id} aria-label={`Read ${blog.title}`}><article className="glass-panel managed-card">
          {blog.image_url && <div className="managed-blog-image"><img className="managed-cover" src={blog.image_url} alt={blog.image_alt || 'AI-enabled software concept illustration'} loading="lazy" /><span>AI + software</span></div>}
          <div className="managed-blog-body"><p className="managed-byline">INSIGHT <span>·</span> {blog.author || 'ShreeG Solutions'}</p>
            <h3>{blog.title}</h3>
            {blog.excerpt && <p className="text-muted">{blog.excerpt}</p>}
            <span className="managed-details">Read the article <span aria-hidden="true">↗</span></span>
          </div>
        </article></a>)}
      </div>
    </section>}

    {testimonials.length > 0 && <section id="testimonials" className="section container story-section">
      <div className="managed-section-heading"><div><span className="managed-eyebrow">Illustrative client journeys</span><h2 className="section-title">What changes when software gets AI-enabled?</h2><p className="text-muted">Fictional scenarios showing how AI can reshape familiar web, app, and business workflows.</p></div></div>
      <div className="managed-story-grid managed-blog-grid">
        {testimonials.map((item) => <a className="managed-card-link" href={`/stories/${item.slug}`} aria-label={`Read the ${item.title} story`} key={item.id}><article className="glass-panel managed-card">
          {item.image_url && <div className="managed-story-image"><img src={item.image_url} alt={item.image_alt || 'Illustrative AI software concept'} loading="lazy" /><span>{item.story_tag || 'Before → AI-enabled'}</span></div>}
          <div className="managed-story-body">
            <p className="managed-story-persona">{item.author}{item.company ? ` · ${item.company}` : ''}</p>
            <h3>{item.title}</h3>
            {item.story_before && <div className="managed-story-step"><span>BEFORE</span><p>{item.story_before}</p></div>}
            {item.story_solution && <div className="managed-story-step managed-story-ai"><span>AI-ENABLED APPROACH</span><p>{item.story_solution}</p></div>}
            {item.story_difference && <div className="managed-story-step"><span>THE DIFFERENCE</span><p>{item.story_difference}</p></div>}
            <span className="managed-details">Read the full story <span aria-hidden="true">↗</span></span>
          </div>
        </article></a>)}
      </div>
    </section>}

    {reviews.length > 0 && <Section id="reviews" title="Client Reviews">
      <div className="managed-card-grid">
        {reviews.map((item) => <article className="glass-panel managed-card" key={item.id}>
          {item.is_sample && <span className="managed-sample-label">Illustrative sample · not a real client review</span>}
          {item.rating && <p className="managed-rating" aria-label={`${item.rating} out of 5 stars`}>{'★'.repeat(Math.max(0, Math.min(5, Number(item.rating))))}{'☆'.repeat(5 - Math.max(0, Math.min(5, Number(item.rating))))}</p>}
          <p className="managed-quote">“{item.quote || item.title}”</p>
          <p className="managed-byline">{item.author}{item.source ? ` · ${item.source}` : ''}</p>
          {item.source_url && <a className="managed-link" href={item.source_url} target="_blank" rel="noreferrer">View original review</a>}
        </article>)}
      </div>
    </Section>}

    {partners.length > 0 && <Section id="partners" title="Our Partners">
      <div className="managed-logos">{partners.map((item) => <a className="managed-logo-card" key={item.id} href={item.website_url || '#partners'} target={item.website_url ? '_blank' : undefined} rel={item.website_url ? 'noreferrer' : undefined}>
        {item.logo_url && <img src={item.logo_url} alt="" />}{item.title}
      </a>)}</div>
    </Section>}

    {clients.length > 0 && <Section id="clients" title="Our Clients">
      <div className="managed-logos">{clients.map((item) => <a className="managed-logo-card" key={item.id} href={item.website_url || '#clients'} target={item.website_url ? '_blank' : undefined} rel={item.website_url ? 'noreferrer' : undefined}>
        {item.logo_url && <img src={item.logo_url} alt="" />}{item.title}
      </a>)}</div>
    </Section>}

    {faqs.length > 0 && <Section id="faq" title="Frequently Asked Questions">
      <div className="managed-faq-list">{faqs.map((item) => <details className="managed-faq glass-panel" key={item.id}>
        <summary>{item.title}</summary><p className="text-muted">{item.answer}</p>
      </details>)}</div>
    </Section>}
  </>;
};

export default ManagedContent;
