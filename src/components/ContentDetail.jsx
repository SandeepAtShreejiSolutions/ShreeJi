import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useContentStatus, useSiteContent } from '../context/ContentContext';
import { findSeoSettings, setCanonicalUrl } from '../lib/seo';

const ContentDetail = ({ type, slug }) => {
  const content = useSiteContent();
  const { isLoading } = useContentStatus();
  const isBlog = type === 'blogs';
  const entry = (content[type] || []).find((item) => item.slug === slug);
  const seoSettings = findSeoSettings(content.seo_keywords, window.location.pathname);

  useEffect(() => {
    if (!entry) return;
    document.title = seoSettings?.meta_title || entry.seo_title || `${entry.title} | ShreeG Solutions`;
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = seoSettings?.meta_description || (isBlog ? entry.seo_description || entry.excerpt : entry.story_difference);
    if (metaDescription && description) metaDescription.content = description;
    setCanonicalUrl(seoSettings?.canonical_url, window.location.pathname);
    return () => { document.title = 'ShreeG Solutions | AI Software Development'; };
  }, [entry, isBlog, seoSettings]);

  if (!entry) return <main className="content-detail container"><a className="detail-back-link" href="/"><ArrowLeft size={17} /> Back to home</a><div className="glass-panel detail-not-found"><h1>{isLoading ? 'Loading story…' : 'This page is not available'}</h1><p className="text-muted">{isLoading ? 'Getting the latest published content.' : 'It may have been unpublished or moved.'}</p></div></main>;

  return <main className="content-detail container">
    <a className="detail-back-link" href="/#blogs"><ArrowLeft size={17} /> Back to insights and stories</a>
    <article className="glass-panel content-detail-card">
      {entry.image_url && <img className="detail-hero-image" src={entry.image_url} alt={entry.image_alt || (isBlog ? 'AI-enabled software insight illustration' : 'Illustrative AI solution concept')} />}
      <div className="detail-content-body">
        <div className="detail-kicker"><Sparkles size={15} /> {isBlog ? 'AI + SOFTWARE INSIGHT' : 'ILLUSTRATIVE BEFORE & AFTER STORY'}</div>
        {entry.is_sample && <p className="managed-sample-label">Fictional scenario · not a real client review</p>}
        <h1>{entry.title}</h1>
        <p className="detail-author">{isBlog ? entry.author || 'ShreeG Solutions' : `${entry.author || 'Illustrative persona'}${entry.company ? ` · ${entry.company}` : ''}`}</p>
        {isBlog ? <>
          {entry.excerpt && <p className="detail-excerpt">{entry.excerpt}</p>}
          <div className="detail-article-text">{entry.content}</div>
          {entry.aeo_question && <aside className="detail-answer-card"><strong>{entry.aeo_question}</strong><p>{entry.excerpt}</p></aside>}
        </> : <>
          <p className="detail-story-intro">A fictional scenario showing how ShreeG Solutions can rethink familiar software workflows with AI built into the experience.</p>
          <div className="detail-story-timeline">
            {entry.story_before && <section><span>01 · BEFORE AI</span><p>{entry.story_before}</p></section>}
            {entry.story_solution && <section className="detail-story-ai"><span>02 · AI-ENABLED SOLUTION</span><p>{entry.story_solution}</p></section>}
            {entry.story_difference && <section><span>03 · THE DIFFERENCE</span><p>{entry.story_difference}</p></section>}
          </div>
          {entry.quote && <blockquote className="detail-quote">“{entry.quote}”</blockquote>}
        </>}
        <a className="btn btn-primary detail-contact-link" href="/#contact">Discuss an AI solution <ArrowRight size={18} /></a>
      </div>
    </article>
  </main>;
};

export default ContentDetail;
