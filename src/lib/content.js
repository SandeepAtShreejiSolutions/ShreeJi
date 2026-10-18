export const COLLECTIONS = [
  { id: 'services', label: 'Businesses & Services', singular: 'Business or service' },
  { id: 'blogs', label: 'Blogs', singular: 'Blog post' },
  { id: 'seo_keywords', label: 'SEO keywords', singular: 'SEO keyword' },
  { id: 'aeo_keywords', label: 'AEO questions', singular: 'Question and answer' },
  { id: 'testimonials', label: 'Testimonials', singular: 'Testimonial' },
  { id: 'reviews', label: 'Reviews', singular: 'Review' },
  { id: 'partners', label: 'Partners', singular: 'Partner' },
  { id: 'clients', label: 'Clients', singular: 'Client' },
  { id: 'projects', label: 'Projects', singular: 'Project' },
];

export const FIELDS = {
  services: [
    ['description', 'Description', 'textarea'], ['icon', 'Icon name', 'text'],
    ['image_url', 'Image URL', 'text'], ['website_url', 'Website URL', 'url'],
    ['seo_keywords', 'SEO keywords (comma separated)', 'text'], ['aeo_keywords', 'AEO questions (comma separated)', 'text'],
  ],
  blogs: [
    ['excerpt', 'Short summary', 'textarea'], ['content', 'Article content', 'textarea'],
    ['author', 'Author', 'text'], ['image_url', 'Cover image URL', 'text'], ['image_alt', 'Image description', 'text'],
    ['seo_title', 'SEO title', 'text'], ['seo_description', 'SEO description', 'textarea'],
    ['seo_keywords', 'SEO keywords (comma separated)', 'text'], ['aeo_question', 'Answer engine question', 'text'],
  ],
  seo_keywords: [['intent', 'Search intent', 'text'], ['target_page', 'Target page', 'text'], ['related_keywords', 'Related keywords (comma separated)', 'text'], ['meta_title', 'Page SEO title', 'text'], ['meta_description', 'Page meta description', 'textarea']],
  aeo_keywords: [['answer', 'Answer', 'textarea'], ['related_questions', 'Related questions (comma separated)', 'text'], ['target_page', 'Target page', 'text']],
  testimonials: [['quote', 'Story reflection', 'textarea'], ['author', 'Persona name', 'text'], ['company', 'Illustrative business type', 'text'], ['story_before', 'Before AI', 'textarea'], ['story_solution', 'AI-enabled solution', 'textarea'], ['story_difference', 'Difference / after', 'textarea'], ['story_tag', 'Story image label', 'text'], ['image_url', 'Illustrative image URL', 'text'], ['image_alt', 'Image description', 'text'], ['is_sample', 'Clearly label this as illustrative sample content', 'checkbox']],
  reviews: [['quote', 'Review', 'textarea'], ['author', 'Reviewer name', 'text'], ['rating', 'Rating (1–5)', 'number'], ['source', 'Review platform', 'text'], ['source_url', 'Review URL', 'url'], ['is_sample', 'Clearly label this as illustrative sample content', 'checkbox']],
  partners: [['description', 'Description', 'textarea'], ['logo_url', 'Logo URL', 'text'], ['website_url', 'Website URL', 'url']],
  clients: [['description', 'Description', 'textarea'], ['logo_url', 'Logo URL', 'text'], ['website_url', 'Website URL', 'url']],
  projects: [['category', 'Category', 'text'], ['description', 'Description', 'textarea'], ['metrics', 'Results / metrics', 'text'], ['image_url', 'Image URL', 'text'], ['website_url', 'Website URL', 'url'], ['is_sample', 'Clearly label this as an illustrative concept', 'checkbox']],
};

export const DEFAULT_CONTENT = {
  services: [
    { id: 'default-service-seo', title: 'AI-Enabled Business Software', description: 'Plan and build secure software that uses AI to reduce repetitive work and improve everyday business processes.', icon: 'Zap', published: true, position: 0 },
    { id: 'default-service-social', title: 'Custom AI Web Applications', description: 'Responsive web apps with practical AI features, business integrations, and clear human review where it matters.', icon: 'Code', published: true, position: 1 },
    { id: 'default-service-web', title: 'AI-Ready E-Commerce', description: 'Build online stores with intelligent product discovery, useful automation, and smoother customer journeys.', icon: 'ShoppingBag', published: true, position: 2 },
    { id: 'default-service-ads', title: 'Business AI & Model Fine-Tuning', description: 'Adapt AI assistants to approved company knowledge, with evaluation, privacy controls, and human handoff.', icon: 'Brain', published: true, position: 3 },
    { id: 'default-service-apps', title: 'AI Mobile App Development', description: 'Create useful iOS and Android experiences with AI features shaped around real user needs.', icon: 'Smartphone', published: true, position: 4 },
    { id: 'default-service-analytics', title: 'AI Product Design & Development', description: 'Move from product discovery and prototypes to reliable software, measurable outcomes, and ongoing improvement.', icon: 'Lightbulb', published: true, position: 5 },
  ],
  projects: [
    { id: 'default-project-ecommerce', title: 'AI Product Discovery Store', category: 'AI E-Commerce', description: 'Illustrative concept for an online store using conversational product discovery and staff-reviewed recommendations.', metrics: 'Illustrative concept', is_sample: true, image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', published: true, position: 0 },
    { id: 'default-project-saas', title: 'Business Knowledge Assistant', category: 'Applied AI', description: 'Illustrative concept for a business assistant grounded in approved company documents with clear escalation paths.', metrics: 'Illustrative concept', is_sample: true, image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', published: true, position: 1 },
    { id: 'default-project-app', title: 'AI-Enabled Mobile Workflow', category: 'AI Mobile App', description: 'Illustrative concept for a mobile app that helps field teams capture information and automate routine follow-up.', metrics: 'Illustrative concept', is_sample: true, image_url: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', published: true, position: 2 },
  ],
  testimonials: [
    { id: 'fallback-story-ecommerce', slug: 'sample-ecommerce-storefront', title: 'AI-assisted ecommerce discovery', author: 'Aditi Mehta', company: 'Illustrative ecommerce retailer', is_sample: true, story_before: 'Shoppers relied on fixed filters and manually curated categories to find products.', story_solution: 'AI-assisted search understands plain-language needs and suggests products from verified catalogue details.', story_difference: 'Product discovery feels more natural while shoppers keep control of filters and final choices.', image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1100&q=80', published: true, position: 0 },
    { id: 'fallback-story-knowledge', slug: 'sample-business-ai-finetuning', title: 'Business knowledge assistant', author: 'Priya Menon', company: 'Illustrative operations team', is_sample: true, story_before: 'Staff searched across documents and repeated the same internal questions.', story_solution: 'An AI assistant retrieves answers from approved company material and escalates unclear requests.', story_difference: 'Teams get a faster starting point while access controls and human decisions stay in place.', image_url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=80', published: true, position: 1 },
    { id: 'fallback-story-mobile', slug: 'sample-mobile-app-field-work', title: 'AI-enabled mobile workflow', author: 'Neha Iyer', company: 'Illustrative field services business', is_sample: true, story_before: 'Field staff entered visit notes later and manually turned them into follow-up tasks.', story_solution: 'A mobile app structures voice or typed notes into draft summaries for staff review.', story_difference: 'Updates enter the workflow sooner, with staff confirming every summary before sharing.', image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=80', published: true, position: 2 },
  ],
};

export function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
