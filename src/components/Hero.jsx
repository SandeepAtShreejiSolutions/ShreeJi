import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const Hero = () => {
  const { testimonials = [] } = useSiteContent();
  const stories = testimonials.filter((item) => item.story_before || item.story_difference);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (stories.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % stories.length), 2000);
    return () => window.clearInterval(timer);
  }, [stories.length]);

  const move = (step) => setActiveIndex((current) => (current + step + stories.length) % stories.length);

  return (
    <section className="hero-section" id="home">
      <div className="hero-glow hero-glow-blue" />
      <div className="hero-glow hero-glow-orange" />
      <div className="container hero-content">
        <div className="animate-fade-in flex-center hero-badge-wrap">
          <span className="glass-panel hero-badge"><Sparkles size={16} /> AI-enabled software for business</span>
        </div>
      </div>
      {stories.length > 0 && <section className="container hero-story-carousel" aria-label="AI transformation stories">
        <div className="hero-story-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {stories.map((story) => <article className={`hero-story-slide${story.image_url ? ' has-image' : ' no-image'}`} key={story.id || story.slug}>
            {story.image_url && <img className="hero-story-image" src={story.image_url} alt={story.image_alt || 'Illustrative AI software concept'} />}
            <div className="hero-story-main">
              <div className="hero-story-topline"><span className="hero-story-eyebrow"><Sparkles size={14} /> AI transformation story</span></div>
              <p className="hero-story-persona">{story.author}{story.company ? ` · ${story.company}` : ''}</p>
              <h2>{story.title}</h2>
              <div className="hero-story-comparison">
                <div className="hero-story-before"><span>BEFORE</span><p>{story.story_before}</p></div>
                <div className="hero-story-after"><span>WITH AI</span><p>{story.story_difference}</p></div>
              </div>
              <a href={`/stories/${story.slug}`} className="hero-story-link">See the full story <ArrowRight size={15} /></a>
            </div>
          </article>)}
        </div>
        {stories.length > 1 && <div className="hero-story-controls">
          <span className="hero-story-counter">{String(activeIndex + 1).padStart(2, '0')} <i /> {String(stories.length).padStart(2, '0')}</span>
          <div className="hero-story-buttons"><button type="button" onClick={() => move(-1)} aria-label="Previous testimonial"><ChevronLeft size={17} /></button><button type="button" onClick={() => move(1)} aria-label="Next testimonial"><ChevronRight size={17} /></button></div>
        </div>}
      </section>}

      <div className="container hero-content hero-title-content">
        <h1 className="animate-fade-in delay-100 hero-title">Put AI to work across <br /><span className="text-gradient">your business</span></h1>
        <div className="flex-center animate-fade-in delay-300 hero-actions">
          <a href="#contact" className="btn btn-primary">Start Your Journey <ArrowRight size={18} /></a>
          <a href="#services" className="btn btn-secondary">Explore Services</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
