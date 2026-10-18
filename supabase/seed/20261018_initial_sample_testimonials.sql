-- These are fictional, illustrative examples for layout and service positioning.
-- They are deliberately labeled on the public website and must be replaced
-- with approved client feedback before being presented as real testimonials.
insert into public.site_content (collection, slug, title, data, published, position)
values
  ('testimonials', 'sample-ecommerce-storefront', 'E-commerce storefront and checkout', jsonb_build_object(
    'quote', 'The sample project helped us bring our product range and online ordering into one clearer customer journey. The team kept the storefront simple to browse and easy to manage.',
    'author', 'Sample profile', 'company', 'E-commerce retailer', 'is_sample', true
  ), true, 0),
  ('testimonials', 'sample-ai-product-discovery', 'AI-assisted product discovery', jsonb_build_object(
    'quote', 'We wanted customers to find relevant products without adding more steps. The sample concept made the discovery flow easier to understand and gave us a sensible place to start testing AI features.',
    'author', 'Sample profile', 'company', 'Online marketplace', 'is_sample', true
  ), true, 1),
  ('testimonials', 'sample-business-ai-finetuning', 'AI fine-tuning for business knowledge', jsonb_build_object(
    'quote', 'The sample engagement focused on adapting an AI assistant to our terminology and approved reference material. We appreciated the careful review of answers and the clear human handoff for uncertain cases.',
    'author', 'Sample profile', 'company', 'Business operations team', 'is_sample', true
  ), true, 2),
  ('testimonials', 'sample-digital-marketing-plan', 'Digital marketing strategy', jsonb_build_object(
    'quote', 'The sample marketing plan connected our audience, content, search work, and campaign goals. It gave the team a more organized way to plan activity and decide what to measure next.',
    'author', 'Sample profile', 'company', 'Local service business', 'is_sample', true
  ), true, 3),
  ('testimonials', 'sample-mobile-app-field-work', 'Mobile app for field teams', jsonb_build_object(
    'quote', 'The sample app workflow brought the most common field tasks into one mobile-friendly experience. We valued the attention to clear screens, practical forms, and a straightforward process for staff.',
    'author', 'Sample profile', 'company', 'Field services business', 'is_sample', true
  ), true, 4),
  ('testimonials', 'sample-product-discovery-development', 'Product discovery and development', jsonb_build_object(
    'quote', 'The sample product process helped turn a broad idea into smaller decisions about users, features, and the first release. The prototypes made it easier to discuss priorities before development.',
    'author', 'Sample profile', 'company', 'Early-stage software product', 'is_sample', true
  ), true, 5),
  ('testimonials', 'sample-user-experience-design', 'User experience and interface design', jsonb_build_object(
    'quote', 'The sample redesign brought more consistency to the screens and made the next steps easier to spot. We liked being able to review the experience as a complete flow rather than a set of isolated pages.',
    'author', 'Sample profile', 'company', 'Digital services provider', 'is_sample', true
  ), true, 6),
  ('testimonials', 'sample-workflow-automation', 'AI-enabled business workflow', jsonb_build_object(
    'quote', 'The sample automation work began with a routine process our team wanted to simplify. The proposed checks and staff review points made the AI-supported workflow easier to evaluate responsibly.',
    'author', 'Sample profile', 'company', 'Growing small business', 'is_sample', true
  ), true, 7),
  ('testimonials', 'sample-web-platform-integration', 'Web platform and business integrations', jsonb_build_object(
    'quote', 'The sample web platform brought several parts of the customer journey together in a more coherent experience. The team paid attention to how the pieces would fit into the way we already work.',
    'author', 'Sample profile', 'company', 'B2B technology business', 'is_sample', true
  ), true, 8),
  ('testimonials', 'sample-ai-support-assistant', 'AI-enabled customer support assistant', jsonb_build_object(
    'quote', 'The sample support assistant was designed around our approved help content and clear escalation to a person. That balance made the concept feel more useful and easier for our team to review.',
    'author', 'Sample profile', 'company', 'Customer support team', 'is_sample', true
  ), true, 9)
on conflict (collection, slug) do nothing;
